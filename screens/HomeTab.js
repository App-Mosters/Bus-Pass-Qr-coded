import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Switch,
  Platform,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";

const HomeTab = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/bus.png")} />

      <View style={styles.inputcontainer}>
        <View style={styles.InputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Location"
            placeholderTextColor="#003f5c"
            onChangeText={(location) => setLocation(location)}
          />
        </View>
        <View style={styles.pickDateView}>
          <TouchableOpacity
            style={styles.pickDateButton}
            onPress={() => showMode("date")}
          >
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                //display="default"
                onChange={onChange}
              />
            )}

            <Text>Select Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickDateButton}
            onPress={() => showMode("time")}
          >
            <Text>Select Time</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
        <View>
          <Text>{date.toLocaleString()}</Text>
        </View>

        <TouchableOpacity style={styles.SearchBtn}>
          <Text style={styles.SearchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  image: {
    marginBottom: 2,
    height: "40%",
    width: "80%",
  },

  inputcontainer: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
    borderRadius: 20,
    justifyContent: "center",
  },
  InputView: {
    backgroundColor: "#ECF0F1",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    width: "70%",
    height: 45,
    alignItems: "center",
  },
  TextInput: {
    height: 60,
    flex: 1,
    padding: 10,
    width: "80%",
    alignItems: "center",
    fontSize: 20,
  },
  datePicker: {
    width: "50%",
    marginTop: 20,
    marginBottom: 10,
  },
  pickDateView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pickDateButton: {
    width: "30%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FCF3CF",
  },
  pickDateText: {
    fontWeight: "bold",
  },
  SearchBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: "#E6C700",
  },
  SearchBtnText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
