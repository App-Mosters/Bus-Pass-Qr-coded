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

  // State variables for managing location, date, date/time picker visibility and mode
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  
 // Handler for date and time picker changes
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };
  
// Function to show the date/time picker
  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  return (
    <SafeAreaView style={styles.container}>
  
  {/* Image component for displaying a bus image */}
      <Image style={styles.image} source={require("../assets/bus.png")} />
  
 {/* Container for input fields and controls */}
      <View style={styles.inputcontainer}>
  
  {/* Input field for location */}
        <View style={styles.InputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Location"
            placeholderTextColor="#003f5c"
            onChangeText={(location) => setLocation(location)}
          />
        </View>

      {/* Date and time picker buttons */}
        <View style={styles.pickDateView}>
          <TouchableOpacity
            style={styles.pickDateButton}
            onPress={() => showMode("date")}
          >
          {/* Display date/time picker when 'show' is true */}
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

{/* Status bar for displaying app status */}
          <StatusBar style="auto" />
        </View>
        <View>

      {/* Display selected date/time */}
          <Text>{date.toLocaleString()}</Text>
        </View>

{/* Search button */}
        <TouchableOpacity style={styles.SearchBtn}>
          <Text style={styles.SearchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeTab;

// Styles for various components in the HomeTab
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
