import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { DarkTheme } from "@react-navigation/native";

export default function App() {
  const [darkmode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  const buttons = [
    "C", "DEL", "%", "/",
    7, 8, 9, "*",
    4, 5, 6, "-",
    1, 2, 3, "+",
    0, ".", "=",
  ];


  function calculator() {
    let lastArray = currentNumber[currentNumber.length - 1];

    if (
      lastArray === "*" ||
      lastArray === "/" ||
      lastArray === "+" ||
      lastArray === "-"
    ) {
      setCurrentNumber(currentNumber);
      return;
    }

    // checking if the last character is an operator or not

    const operators = ["*", "/", "+", "-", "%"];
    for (let operator of operators) {
      if (currentNumber.includes(operator)) {
        let numbers = currentNumber.split(operator);
        let result = eval(
          `${parseFloat(numbers[0])} ${operator} ${parseFloat(numbers[1])}`
        );
        setCurrentNumber(result.toString());
        return;
      }
    }
  }

  function handleInput(buttonPressed: string) {
    if (
      buttonPressed === "+" ||
      buttonPressed === "-" ||
      buttonPressed === "*" ||
      buttonPressed === "/"
    ) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }

    switch (buttonPressed) {
      case "DEL":
        Vibration.vibrate(35);
        let string = currentNumber.toString();
        let deletedString = string.substr(0, string.length - 1);
        setCurrentNumber(deletedString);
        return;
      case "C":
        Vibration.vibrate(35);
        setCurrentNumber("");
        setLastNumber("");
        return;
      case "=":
        Vibration.vibrate(35);
        setLastNumber(currentNumber + "=");
        calculator();
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkmode ? "light-up" : "moon"}
            size={24}
            color={darkmode ? "black" : "white"}
            onPress={() => setDarkMode(!darkmode)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleInput(button.toString())}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === "number" || button === "."
                      ? DarkTheme
                        ? "#303946"
                        : "#e0e0e0"
                      : DarkTheme
                      ? "#414853"
                      : "#f0f0f0",
                },
              ]}
            >
              <Text
                style={[
                  styles.textButton,
                  {
                    color:
                      typeof button === "number" || button === "."
                        ? DarkTheme
                          ? "#b5b7bb"
                          : "#7c7c7c"
                        : DarkTheme
                        ? "#ff9f0a"
                        : "#ff9f0a",
                  },
                ]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  results: {
    backgroundColor: DarkTheme ? "#282f3b" : "#f5f5f5",
    width: "100%",
    minHeight: "35%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  resultText: {
    maxHeight: 45,
    color: "#00b9d6",
    margin: 15,
    fontSize: 35,
  },
  historyText: {
    color: DarkTheme ? "#B5B7BB" : "#7C7C7C",
    fontSize: 20,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  themeButton: {
    alignSelf: "flex-start",
    bottom: "5%",
    margin: 15,
    backgroundColor: DarkTheme ? "#7b8084" : "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttons: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    borderColor: DarkTheme ? "#3f4d5b" : "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "24%",
    minHeight: "54%",
    flex: 2,
  },
  textButton: {
    color: DarkTheme ? "#b5b7bb" : "#7c7c7c",
    fontSize: 28,
  },
});
