import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Bus Mate');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successfully signed in:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../assets/bus.png')} />

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an Account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sign Up')}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Email Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email..."
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input with Toggle Icon */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password..."
          placeholderTextColor="#A9A9A9"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />
        {/* Password visibility toggle button */}
        <TouchableOpacity
          style={styles.toggleIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#A9A9A9"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordInitiate')}
      >
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  image: {
    marginBottom: 10,
    height: '40%',
    width: '80%',
  },

  signUpContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  signUpText: {
    fontSize: 14,
    color: '#A9A9A9',
  },

  signUpButton: {
    alignItems: 'center',
  },

  signUpButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E6C700',
  },

  inputView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  toggleIcon: {
    position: 'absolute',
    right: 10,
  },

  forgotButton: {
    height: 30,
    marginBottom: 10,
    color: '#007BFF',
  },

  signInButton: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#E6C700',
  },

  signInButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SignIn;
