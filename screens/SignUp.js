import { StyleSheet, Text, View,SafeAreaView,TextInput,TouchableOpacity,Image } from 'react-native';
import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



const SignUp = () => {
    const [name, setName]= useState('');
    const [phoneNum, setPhoneNum]= useState('');
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

    // Function to check password strength
  const checkPasswordStrength = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Calculate strength based on conditions
    if (password.length < minLength) {
      setPasswordStrength('Weak');
    } else if (hasUppercase && hasLowercase && hasNumbers && hasSpecialChars) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Medium');
    }
  };

    const handleSignUp = () => {

      // Check if all required fields are filled
      if (!name || !phoneNum || !email || !password ) {
        alert("Please fill in all fields");
        return;
      }
      
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
              placeholder="Phone Number (+94) xxxxxxxxx"
              placeholderTextColor="#003f5c"
              keyboardType="numeric"
              maxLength={9}
              onChangeText={handlePhoneNumChange}
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

        <View style={styles.InputView}>
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