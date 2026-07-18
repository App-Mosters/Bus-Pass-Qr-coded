import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, ActivityIndicator, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { deductFare } from "../Lib/wallet";

const FARE_AMOUNT = 50; // flat fare for now

function QrSCAN() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [statusText, setStatusText] = useState("Point camera at a pass QR code");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setProcessing(true);
    setStatusText("Verifying pass...");

    try {
      const newBalance = await deductFare(data, FARE_AMOUNT);
      setStatusText(`Fare deducted. New balance: Rs ${newBalance.toFixed(2)}`);
    } catch (error) {
      setStatusText(`Failed: ${error.message}`);
      Alert.alert("Payment failed", error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={"Allow Camera"} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      {processing && <ActivityIndicator size="large" style={{ marginTop: 10 }} />}
      <Text style={styles.maintext}>{statusText}</Text>

      {scanned && !processing && (
        <Button
          title={"Scan next passenger"}
          onPress={() => {
            setScanned(false);
            setStatusText("Point camera at a pass QR code");
          }}
          color="tomato"
        />
      )}
    </View>
  );
}

export default QrSCAN;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  maintext: { fontSize: 16, margin: 20, textAlign: "center", paddingHorizontal: 20 },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});