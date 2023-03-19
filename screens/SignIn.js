import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/bus.png")} />

      <View style={styles.SignUp}>
        <Text style={styles.SignUpQ}>Don't have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")} style={styles.SignUpBtn}>
          <Text style={styles.SignUpTxt}> SignUp</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Bus Mate")} style={styles.SignInbtn}>
        <Text style={styles.SignInText}>Sign In</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  image: {
    marginBottom: 10,
    height: "40%",
    width: "80%",
  },

  SignUp: {
    marginBottom: 20,
  },

  SignUpBtn: {
    alignItems: 'center',
  },

  SignUpTxt: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  inputView: {
    backgroundColor: "#fff",
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    border: "dotted",
  },

  forgot_button: {
    height: 30,
    marginBottom: 10,
    color: "blue",
  },

  SignInbtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#E6C700",
  },

  SignInText: {
    fontWeight: 'bold',
  },

});

export default SignIn;
