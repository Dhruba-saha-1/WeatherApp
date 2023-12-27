import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../utils/Index";

export default function SearchBar({ location, setLocation }) {
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);

  const gotLocation = () => {
    setLocation(input);
  };

  const search = () => {
    gotLocation();
  };

  return (
    <View style={styles.totalSearch}>
      {/* <View
        style={clicked ? styles.textInput_Clicked : styles.textInput_Unclicked}
      > */}
      <TextInput
        placeholder="Search By City Name"
        value={input}
        onChangeText={setInput}
        onFocus={() => {
          setClicked(true);
        }}
        style={clicked ? styles.textInput_Clicked : styles.textInput_Unclicked}
      />
      {/* </View> */}
      <View style={styles.icons}>
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              search();
              setClicked(false);
              Keyboard.dismiss();
              setInput("");
            }}
          >
            <Feather name="search" size={24} color="green" />
          </TouchableOpacity>
        )}
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setInput("");
            }}
          >
            <MaterialIcons name="cancel" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  totalSearch: {
    width: "95%",
    // padding: 10,
    // backgroundColor: "#d9dbda",
    // borderRadius: 15,
    flexDirection: "row",
    margin: 15,
    // justifyContent: "center",
    // alignContent: "center",
    top: 5,
  },
  textInput_Clicked: {
    justifyContent: "center",
    backgroundColor: colors.INPUT_CONTAINER,
    borderRadius: 10,
    width: "85%",
    marginRight: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  textInput_Unclicked: {
    justifyContent: "center",
    width: "95%",
    backgroundColor: colors.INPUT_CONTAINER,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
