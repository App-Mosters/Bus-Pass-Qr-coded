import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth,db } from '../firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUp = () => {
  // State variables for user input and component state
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [phoneNumError, setPhoneNumError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPasswordNote, setShowPasswordNote] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setPhoneNumber(cleaned);
  };

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Create an array to store the missing criteria
    const missingCriteria = [];

    // Check each criterion and populate the missingCriteria array
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

  // Function to handle sign-up process
  const handleSignUp = async () => {
    try {
      setLoading(true);
  
      // Check if all required fields are filled
      if (!name || !phoneNumber || !email || !password) {
        if (Platform.OS === 'web') {
          throw new Error('Please fill in all fields');
        } else {
          Alert.alert('Missing Information', 'Please fill in all required fields before proceeding.', [
            { text: 'Do not show again' },
            { text: 'Dismiss' },
          ]);
        }
        return;
      }
  
      // Check if passwords match
      if (password !== confirmpassword) {
        if (Platform.OS === 'web') {
          throw new Error('Passwords do not match');
        } else {
          Alert.alert('WARNING', 'Passwords do not match', [
            { text: 'Do not show again' },
            { text: 'Dismiss' },
          ]);
        }
        return;
      }
  
      // Validate email using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (Platform.OS === 'web') {
          throw new Error('Please enter a valid email address');
        } else {
          Alert.alert('Invalid Email', 'Please enter a valid email address', [
            { text: 'Do not show again' },
            { text: 'Dismiss' },
          ]);
        }
        
        return;
      }
  
      // Create a new user account
      const credential = await auth.createUserWithEmailAndPassword(email, password);
  
      // Get the current user
      const user = auth.currentUser;
  
      // Update user profile with name
      await credential.user.updateProfile({
        displayName: name,
      });
  
      // Save additional user information to Firestore
      await db.collection('users').doc(credential.user.uid).set({
        name: name,
        phoneNumber: phoneNumber,
      });
  
      // Display success message to the user
      Alert.alert('Success', 'Your account has been created successfully!', [{ text: 'OK' }]);
    } catch (error) {
      // Handle error (display on web or show alert on mobile)
      if (Platform.OS === 'web') {
        setErrorMessage(error.message);
      } else {
        Alert.alert('Error', error.message, [{ text: 'OK', onPress: () => console.warn('OK Pressed!') }]);
      }
    } finally {
      // Set loading to false after the operation
      setLoading(false);
    };
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../assets/Welcome.gif')} />

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
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Display password strength indicator */}
      {passwordStrength !== '' && (
        <Text style={{ marginTop: 5 }}>Password Strength: {passwordStrength}</Text>
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

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#E6C700" />}
    

      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSignUp} style={styles.SignUpbtn}>
        <Text style={styles.SignUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Render error message for web */}
      {errorMessage && Platform.OS === 'web' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  // Overall container styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  // Welcome image styles
  image: {
    marginBottom: 10,
    marginTop: 20,
    height: '30%',
    width: '80%',
  },

  // Input container styles
  InputView: {
    backgroundColor: '#fff',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    width: '70%',
    height: 45,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  // Text input styles
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },

  // Sign Up button styles
  SignUpbtn: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#E6C700',
  },
  
  // Sign Up button text styles
  SignUpText: {
    fontWeight: 'bold',
  },

  // Icon container styles
  iconContainer: {
    marginRight: 10,
  },

  // Error message container styles
  errorContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },

  // Error message text styles
  errorText: {
    color: 'white',
  },
});

export default SignUp;
