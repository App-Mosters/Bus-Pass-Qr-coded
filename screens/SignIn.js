import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() =>  {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user){
        navigation.replace("Bus Mate")

      }
    })

    return unsubscribe
  }, [])


  const handleSignIn = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Successfully signed in:',user.email);
    })
    .catch((error) => alert(error.message));
  }

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

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordInitiate")}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignIn} style={styles.SignInbtn}>
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
