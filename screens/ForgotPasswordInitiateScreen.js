import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import validator from 'validator';
import { auth } from '../firebase';

// Component for initiating the password reset process
const ForgotPasswordInitiateScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
 // Validates the email format
  const validateEmail = () => {
    const isValid = validator.isEmail(email);
    setIsValidEmail(isValid);
    return isValid;
  };
  
// Handles the password reset initiation
  const handleResetPassword = () => {
    setError(''); 
    if (validateEmail()) {
      setLoading(true);
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          navigation.navigate('ForgotPasswordConfirm', { email });
        })
        .catch((error) => {
          setError('Failed to initiate password reset. Please try again.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your email to reset your password</Text>
      <TextInput
        style={[styles.input, !isValidEmail && styles.invalidInput]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setIsValidEmail(true);
        }}
        accessibilityLabel="Enter your email"
      />
      {!isValidEmail && <Text style={styles.errorText}>Please enter a valid email address</Text>}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={handleResetPassword} style={styles.button} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
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
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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

export default ForgotPasswordInitiateScreen;
