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
  const [currentNumber, setCurrentNumber] = useState("0");
  const [lastNumber, setLastNumber] = useState("0");

  const styles = getDynamicStyles(darkmode);

  const buttons = [
    "C",
    "DEL",
    "%",
    "1/x",
    "Sin",
    "Cos",
    "Tan",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    ".",
    0,
    ,
    "+/-",
    "=",
  ];

  function calculator() {
    let lastArray = currentNumber[currentNumber.length - 1];

    if (
      lastArray === "*" ||
      lastArray === "/" ||
      lastArray === "+" ||
      lastArray === "-" ||
      lastArray === "+/-"
    ) {
      setCurrentNumber(currentNumber);
      return;
    }

    // checking if the last character is an operator or not
    const operators = ["*", "/", "+", "-", "%", "Sin", "Cos", "Tan", "¹/x"];
    for (let operator of operators) {
      if (currentNumber.includes(operator)) {
        let numbers = currentNumber.split(operator);
        if (operator === "Sin" || operator === "Cos" || operator === "Tan") {
          numbers[1] = numbers[1].slice(1, -1);
        }

        if (operator === "1/x") {
          numbers[1] = numbers[1].slice(3, -1);
        }

        let result;
        switch (operator) {
          case "Sin":
            result = Math.sin(parseFloat(numbers[1]));
            console.log(numbers);
            break;
          case "Cos":
            result = Math.cos(parseFloat(numbers[1]));
            break;
          case "Tan":
            result = Math.tan(parseFloat(numbers[1]));
            break;
          case "1/x":
            result = 1 / parseFloat(numbers[1]);
            console.log(numbers);
            break;
          case "%":
            result = (parseFloat(numbers[0]) / 100);
          default:
            result = eval(
              `${parseFloat(numbers[0])} ${operator} ${parseFloat(numbers[1])}`
            );
        }

        if (result === Infinity) {
          setCurrentNumber("Division by zero");
          return;
        }

        if (result === undefined) {
          setCurrentNumber("Invalid operation");
          return;
        }

        if (result.toString().length > 15) {
          setCurrentNumber(result.toString().slice(0, 15));
          return;
        }

        setCurrentNumber(
          result
            .toString()
            .replace(/\./, ".")
            .replace(/\,/, ",")
            .replace("NaN", "0")
            .replace(/[-+*/]/, result.toString())
        );
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
      if (currentNumber.length < 15) {
        setCurrentNumber(currentNumber + buttonPressed);
      }
      return;
    }

    if (
      currentNumber.split("").length > 1 ||
      currentNumber.split("")[0] == "0"
    ) {
      setCurrentNumber(currentNumber.slice(1));
    }

    switch (buttonPressed) {
      case "DEL":
        Vibration.vibrate(35);
        let string = currentNumber.toString();
        let deletedString = string.slice(0, string.length - 1);
        setCurrentNumber(deletedString);
        return;
      case "C":
        Vibration.vibrate(35);
        setCurrentNumber("0");
        setLastNumber("0");
        return;
      case "=":
        Vibration.vibrate(35);
        setLastNumber(currentNumber + "=");
        calculator();
        return;
      case "+/-":
        Vibration.vibrate(35);
        let lastArray = currentNumber[currentNumber.length - 1];
        if (
          lastArray === "+" ||
          lastArray === "-" ||
          lastArray === "*" ||
          lastArray === "/"
        ) {
          let string = currentNumber.toString();
          let deletedString = string.slice(0, string.length - 1);
          setCurrentNumber(deletedString);
          return;
        }
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;
      case "Sin":
      case "Cos":
      case "Tan":
      case "1/x":
        Vibration.vibrate(35);
        setCurrentNumber(buttonPressed + "(" + currentNumber + ")");
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
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
              onPress={() =>
                button !== undefined && handleInput(button.toString())
              }
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === "number" || button === "."
                      ? darkmode
                        ? "#303946"
                        : "#e0e0e0"
                      : darkmode
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

const getDynamicStyles = (darkmode: boolean) =>
  StyleSheet.create({
    container: {},
    results: {
      backgroundColor: darkmode ? "#282f3b" : "#f5f5f5",
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
      color: darkmode ? "#B5B7BB" : "#7C7C7C",
      fontSize: 20,
      marginRight: 10,
      alignSelf: "flex-end",
    },
    themeButton: {
      alignSelf: "flex-start",
      bottom: "5%",
      margin: 15,
      backgroundColor: darkmode ? "#7b8084" : "#e5e5e5",
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
      borderColor: darkmode ? "#3f4d5b" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "24%",
      minHeight: "54%",
      flex: 2,
    },
    textButton: {
      color: darkmode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 28,
    },
  });
