import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth } from '../firebase';

const MyPass = () => {
  const uid = auth.currentUser?.uid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bus Pass</Text>
      <View style={styles.qrBox}>
        {uid ? <QRCode value={uid} size={220} /> : <Text>Not signed in</Text>}
      </View>
      <Text style={styles.hint}>Show this to the conductor to pay your fare</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  qrBox: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  hint: { marginTop: 30, color: '#666', fontSize: 14, textAlign: 'center', paddingHorizontal: 30 },
});

export default MyPass;