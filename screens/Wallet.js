import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { auth, db } from "../firebase";
import { topUpWallet } from "../Lib/wallet";

const TOP_UP_OPTIONS = [100, 500, 1000];

const Wallet = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const unsubscribeUser = db
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        setBalance(doc.data()?.walletBalance ?? 0);
      });

    const unsubscribeTxns = db
      .collection("transactions")
      .where("userId", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setTransactions(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      });

    return () => {
      unsubscribeUser();
      unsubscribeTxns();
    };
  }, []);

  const handleTopUp = useCallback(async (amount) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    setLoading(true);
    try {
      await topUpWallet(uid, amount);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.walletContainer}>
        <Text style={styles.walletTitle}>Your available balance</Text>
        <Text style={styles.walletBalance}>
          {balance === null ? "..." : `Rs ${balance.toFixed(2)}`}
        </Text>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Top up your wallet</Text>
        <View style={styles.topUpRow}>
          {TOP_UP_OPTIONS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.topUpButton}
              onPress={() => handleTopUp(amount)}
              disabled={loading}
            >
              <Text style={styles.topUpButtonText}>+Rs {amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.paymentTitle}>Recent activity</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.txnRow}>
              <Text style={styles.txnType}>
                {item.type === "topup" ? "Top-up" : "Fare"}
              </Text>
              <Text style={item.amount < 0 ? styles.txnNegative : styles.txnPositive}>
                {item.amount < 0 ? "-" : "+"}Rs {Math.abs(item.amount).toFixed(2)}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No transactions yet</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  walletContainer: {
    padding: 20,
    backgroundColor: "#00FF7F",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  walletTitle: { fontSize: 24, color: "#fff", fontWeight: "bold" },
  walletBalance: { fontSize: 36, fontWeight: "bold", marginTop: 10 },
  paymentContainer: { padding: 20 },
  paymentTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  topUpRow: { flexDirection: "row", justifyContent: "space-between" },
  topUpButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  topUpButtonText: { color: "#fff", fontWeight: "bold" },
  historyContainer: { flex: 1, paddingHorizontal: 20 },
  txnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  txnType: { fontSize: 16 },
  txnPositive: { color: "green", fontWeight: "bold" },
  txnNegative: { color: "red", fontWeight: "bold" },
  emptyText: { color: "#999", marginTop: 10 },
});

export default Wallet;