import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignUp = () => {
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [phoneNumError, setPhoneNumError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPasswordNote, setShowPasswordNote] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  // Function to handle phone number input and validation
  const handlePhoneNumChange = (input) => {
    const cleaned = input.replace(/[^0-9]/g, '');

    // Validate if the phone number contains only numbers
    if (cleaned !== input) {
      setPhoneNumError('Phone number should only contain numbers');
      alert('Phone number should only contain numbers');
    } else {
      setPhoneNumError('');
    }
    setPhoneNum(cleaned);
  };

  const checkPasswordStrength = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    // Create an array to store the missing criteria
    const missingCriteria = [];
  
    // Check each criteria and populate the missingCriteria array
    if (password.length < minLength) {
      missingCriteria.push('at least 6 characters');
    }
    if (!hasUppercase) {
      missingCriteria.push('an uppercase letter');
    }
    if (!hasLowercase) {
      missingCriteria.push('a lowercase letter');
    }
    if (!hasNumbers) {
      missingCriteria.push('a number');
    }
    if (!hasSpecialChars) {
      missingCriteria.push('a special character');
    }
  
    // Generate the password strength message based on missing criteria
    if (missingCriteria.length === 0) {
      setPasswordStrength('Strong');
    } else if (missingCriteria.length <= 2) {
      setPasswordStrength('Medium (missing: ' + missingCriteria.join(', ') + ')');
    } else {
      setPasswordStrength('Weak (missing: ' + missingCriteria.join(', ') + ')');
    }
  };
  

  const handleSignUp = () => {
    // Check if all required fields are filled
    if (!name || !phoneNum || !email || !password) {
      Alert.alert('WARNING!',
      'Please fill in all fields',
      [
      {
        text: 'Do not show again',
        onPress: () => console.warn('Do not show Pressed!')
      },
      {
        text: 'Cancel',
        onPress: () => console.warn('Cancel Pressed!')
      },
      {
        text: 'OK',
        onPress: () => console.warn('OK Pressed!')
      },
    ],);
      return;
    }

  
    if (password !== confirmpassword) {
      Alert.alert('WARNING!', 'Passwords do not match',
      [
        {
          text: 'Do not show again',
          onPress: () => console.warn('Do not show Pressed!')
        },
        {
          text: 'Cancel',
          onPress: () => console.warn('Cancel Pressed!')
        },
        {
          text: 'OK',
          onPress: () => console.warn('OK Pressed!')
        },
      ],);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address',
      [
        {
          text: 'Do not show again',
          onPress: () => console.warn('Do not show Pressed!')
        },
        {
          text: 'Cancel',
          onPress: () => console.warn('Cancel Pressed!')
        },
        {
          text: 'OK',
          onPress: () => console.warn('OK Pressed!')
        },
      ],);
      return;
    }
  
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successfully created a new account:', user.email);
      })
      .catch((error) => {

      });
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/Welcome.gif")} />

      {/* Name Input */}
      <View style={styles.InputView}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="account" size={14} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.InputView}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="phone" size={14} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone Number (+94) xxxxxxxxx"
          placeholderTextColor="#003f5c"
          keyboardType="numeric"
          maxLength={9}
          onChangeText={handlePhoneNumChange}
        />
      </View>

      {/* Email Input */}
      <View style={styles.InputView}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="email" size={14} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.InputView}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="lock" size={14} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={!showPassword}
          onChangeText={(password) => {
            setPassword(password);
            checkPasswordStrength(password);
          }}
        />

        {/* Password visibility toggle button */}
        <TouchableOpacity
          style={{ position: 'absolute', right: 10 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Display password strength indicator */}
      {passwordStrength !== '' && (
        <Text style={{ marginTop: 5 }}>
          Password Strength: {passwordStrength}
        </Text>
      )}

      {/* Display password usage note */}
      {showPasswordNote && (
        <Text style={{ color: 'gray', fontSize: 12, marginTop: 5 }}>
          Password should be at least 6 characters long and include
          uppercase, lowercase, numbers, and special characters.
        </Text>
      )}

      {/* Confirm Password Input */}
      <View style={styles.InputView}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="lock" size={14} color="black" />
        </View>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onFocus={() => setShowPasswordNote(true)}
          onBlur={() => setShowPasswordNote(false)}
          onChangeText={(confirmpassword) => setConfirmpassword(confirmpassword)}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSignUp} style={styles.SignUpbtn}>
        <Text style={styles.SignUpText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  image: {
    marginBottom: 10,
    marginTop: 20,
    height: "30%",
    width: "80%",
  },
  InputView: {
    backgroundColor: "#fff",
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    width: "70%",
    height: 45,
    marginTop: 10,
    alignItems: "center",
    flexDirection: 'row',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },

  SignUpbtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#E6C700",
  },
  SignUpText: {
    fontWeight: 'bold',
  },

  iconContainer: {
    marginRight: 10,
  },
});