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
      <View
        style={clicked ? styles.textInput_Clicked : styles.textInput_Unclicked}
      >
        <TextInput
          placeholder="Search"
          value={input}
          onChangeText={setInput}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
      {clicked && (
        <TouchableOpacity
          onPress={() => {
            search();
            setClicked(false);
            Keyboard.dismiss();
            setInput("");
          }}
        >
          <Feather name="search" size={24} color="black" />
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
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  totalSearch: {
    width: "95%",
    padding: 10,
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    flexDirection: "row",
    margin: 15,
    justifyContent: "center",
    top: 5,
  },
  textInput_Clicked: {
    justifyContent: "center",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    width: "90%",
   
  },
  textInput_Unclicked: {
    justifyContent: "center",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    
  },
  search_icon: {
    margin: 10,
  },
  cancel_icon: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
