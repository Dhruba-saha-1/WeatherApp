import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React from "react";
import { colors } from "../utils/Index";
import { FontAwesome5 } from "@expo/vector-icons";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function Weatherinfo({ currentWeatherto }) {
  const {
    main: { temp },
    weather: [detials],
    name,
  } = currentWeatherto;
  const { icon, main, description } = detials;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.Area}>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <View style={styles.tempIcon}>
        <FontAwesome5 name="temperature-high" size={24} color={PRIMARY_COLOR} />
        <Text style={styles.Temperature}>{temp}°</Text>
      </View>

      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.Main}>{main}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    ...Platform.select({
      ios: {
        top: 170,
      },
      android: {
        top: 70,
      },
    }),
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },
  Temperature: {
    fontSize: 30,
    color: PRIMARY_COLOR,
    marginLeft: 10,
  },
  Area: {
    fontSize: 30,
  },
  Main: {
    fontSize: 20,
    fontWeight: "500",
    color: SECONDARY_COLOR,
    marginTop: 10,
  },
  tempIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
