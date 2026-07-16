import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase';

const ForgotPasswordConfirmScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleConfirmReset = () => {
    auth
      .confirmPasswordReset(resetCode, newPassword)
      .then(() => {
        // Password reset successful, navigate to the login screen or any other screen
        navigation.navigate('Sign In');
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Check your email for the reset code</Text>
      <TextInput
        style={styles.input}
        placeholder="Reset Code"
        value={resetCode}
        onChangeText={setResetCode}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity onPress={handleConfirmReset} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#E6C700',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordConfirmScreen;
