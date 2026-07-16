import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Wallet = () => {
  // State variables for card number, expiry date, and CVV
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Function to handle the addition of a payment method
  const handleAddPaymentMethod = () => {
    // Add payment method logic here
  };

  return (
    <View style={styles.container}>
      {/* Wallet Information Container */}
      <View style={styles.walletContainer}>
        <Text style={styles.walletTitle}>Your available balance</Text>
        <Text style={styles.walletBalance}>Rs 100.00</Text>
      </View>

      {/* Payment Method Container */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Add your Debit/Credit card</Text>

        {/* Input Container for Card Number */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="credit-card-outline"
            color="#aaa"
            size={24}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>

        {/* Input Container for Expiry Date */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="calendar" color="#aaa" size={24} />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date"
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
        </View>

        {/* Input Container for CVV */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" color="#aaa" size={24} />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>

        {/* Button to Add Payment Method */}
        <TouchableOpacity
          style={styles.addPaymentButton}
          onPress={handleAddPaymentMethod}
        >
          <Text style={styles.addPaymentButtonText}>
            Add your payment method
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for various components in the Wallet component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  walletContainer: {
    padding: 20,
    backgroundColor: "#00FF7F",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  walletTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  walletBalance: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 10,
  },
  paymentContainer: {
    padding: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    fontSize: 18,
    paddingVertical: 5,
  },
  addPaymentButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addPaymentButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Wallet;

