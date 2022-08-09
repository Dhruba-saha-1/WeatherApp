import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utils/Index";
import {
  FontAwesome5,
  Ionicons,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails({ currentWeather, unitSystem }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;

  const windspeed =
    unitSystem === "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.row}>
        {/* for Feels Like &  Humidity */}
        <View
          style={{
            ...styles.box,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}
        >
          <View style={styles.row}>
            <FontAwesome5
              name="temperature-high"
              size={24}
              color={PRIMARY_COLOR}
            />
            <View style={styles.items}>
              <Text>Feels Like:</Text>
              <Text style={styles.textSecondery}>{feels_like}°</Text>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.row}>
            <Ionicons name="water-outline" size={30} color={PRIMARY_COLOR} />
            <View style={styles.items}>
              <Text>Humidity:</Text>
              <Text style={styles.textSecondery}>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* for wind speed and pressure */}

      <View
        style={{
          ...styles.row,
          borderTopWidth: 1,
          borderTopColor: BORDER_COLOR,
        }}
      >
        <View
          style={{
            ...styles.box,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}
        >
          <View style={styles.row}>
            <Feather name="wind" size={30} color={PRIMARY_COLOR} />
            <View style={styles.items}>
              <Text>Wind Speed:</Text>
              <Text style={styles.textSecondery}>{windspeed}</Text>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.row}>
            <SimpleLineIcons
              name="speedometer"
              size={25}
              color={PRIMARY_COLOR}
            />
            <View style={styles.items}>
              <Text>Pressure:</Text>
              <Text style={styles.textSecondery}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    ...Platform.select({
      ios: {
        marginTop: 350,
      },
      android: {
        marginTop: 100,
      },
    }),
    margin: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    padding: 20,
  },
  items: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textSecondery: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: "700",
    margin: 5,
  },
});
