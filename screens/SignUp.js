import { StyleSheet, Text, View,SafeAreaView,TextInput,TouchableOpacity,Image } from 'react-native';
import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';



const SignUp = () => {
    const [name, setName]= useState('');
    const [phoneNum, setPhoneNum]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const navigation = useNavigation();

    const handleSignUp = () => {
      if (password !== confirmpassword) {
        alert("Passwords do not match");
        return;
      }
    
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Successfully created a new account:',user.email);
        })
        .catch((error) => alert(error.message));
    };
    

  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require("../assets/Welcome.gif")} />
        <View style={styles.InputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              placeholderTextColor="#003f5c"
              onChangeText={(name) => setName(name)}
            /> 
        </View>
        <View style={styles.InputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone Number"
              placeholderTextColor="#003f5c"
              keyboardType="numeric"
              onChangeText={(phoneNum) => setPhoneNum(phoneNum)}
            /> 
        </View>

        <View style={styles.InputView}>

        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
        </View>

        <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
        </View>

        <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(confirmpassword) => setConfirmpassword(confirmpassword)}
        /> 
        </View>

        <TouchableOpacity onPress={handleSignUp}style={styles.SignUpbtn}>
          <Text style={styles.SignUpText}>Sign Up</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

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
        marginTop:20,
        height:"30%",
        width:"80%",
        
      },    
    InputView:{
        backgroundColor: "#fff",
        borderBottomStyle:'solid',
        borderBottomWidth:1,
        //borderRadius: 30,
        width: "70%",
        height: 45,
        marginTop: 10,
        //marginLeft:"15%",
        alignItems: "center",
    },
    TextInput:{
        height: 50,
        flex: 1,
        padding: 10,
        //marginLeft: 20,
        width:"80%",
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
    SignUpText:{
        fontWeight:'bold',
      },  
    

});