import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import Weatherinfo from "../components/Weatherinfo";
import UnitsPicker from "../components/UnitsPicker";
import WeatherDetails from "../components/WeatherDetails";
import SearchBar from "../components/SearchBar";
import { colors } from "../utils/Index";
import { API_KEY, BASE_WEATHER_URL } from "@env";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function MainPage() {
  const [errorMassage, setErrorMassage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  //Search
  const [location, setLocation] = useState("");

  // pull to Refresh
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (location === "") {
      load();
    } else {
      searched();
    }
  }, [unitSystem, location]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    load();
    setLocation("");
    setErrorMassage(null);
  }, [unitSystem]);

  // @return - A promise which fulfills with an object of type LocationObject
  async function load() {
    setCurrentWeather(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMassage("Access to Location is needed to run the App");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMassage(result.message);
      }
      setRefreshing(false);
    } catch (error) {
      setErrorMassage(error);
      setRefreshing(false);
    }
  }
  async function searched() {
    setCurrentWeather(null);
    try {
      const weatherUrl_searched = `${BASE_WEATHER_URL}q=${location}&units=${unitSystem}&appid=${API_KEY}`;
      const response = await fetch(weatherUrl_searched);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMassage(result.message);
      }
    } catch (error) {
      setErrorMassage(error);
    }
  }

  if (currentWeather) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <SearchBar location={location} setLocation={setLocation} />

            <UnitsPicker
              unitSystem={unitSystem}
              setUnitSystem={setUnitSystem}
            />

            <Weatherinfo currentWeatherto={currentWeather} />

            <StatusBar style="auto" />

            <WeatherDetails
              currentWeather={currentWeather}
              unitSystem={unitSystem}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else if (errorMassage != null) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="auto" />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
          }}
        >
          <Text style={{ color: "red", fontSize: 20 }}>{errorMassage}</Text>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ActivityIndicator
          style={{ top: 400 }}
          size="large"
          color={colors.PRIMARY_COLOR}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 45,
  },
  main: {
    flex: 1,
  },
});
