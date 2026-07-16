import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import ForgotPasswordInitiateScreen from './screens/ForgotPasswordInitiateScreen';
import ForgotPasswordConfirmScreen from './screens/ForgotPasswordConfirmScreen';
import { NavigationContainer } from '@react-navigation/native';



const Stack = createStackNavigator ();
const Navigator = () => {
  return (
    
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Sign In" component={SignIn}/>
          <Stack.Screen name="Sign Up" component={SignUp}/>
          <Stack.Screen name="Bus Mate" component={Home}/>
          <Stack.Screen name="ForgotPasswordInitiate" component={ForgotPasswordInitiateScreen} />
          <Stack.Screen name="ForgotPasswordConfirm" component={ForgotPasswordConfirmScreen} />

      </Stack.Navigator>
      
      
    

    
  )
}

export default Navigator;
