import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

export default function UnitsPicker({ unitSystem, setUnitSystem }) {
  return (
    <View style={styles.UnitSystem}>
      <Picker
        selectedValue={unitSystem}
        onValueChange={(item) => {
          setUnitSystem(item);
        }}
        mode="dropdown"
      >
        <Picker.Item label="C°" value="metric" color="#1995cf" />
        <Picker.Item label="F°" value="imperial" color="#f59416" />
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  UnitSystem: {
    ...Platform.select({
      ios: {
        top: 20,
      },
      android: {
        top: 70,
      },
    }),
    height: 50,
    width: 100,

    left: 15,
    position: "absolute",
    borderRadius: 10,
  },
});
