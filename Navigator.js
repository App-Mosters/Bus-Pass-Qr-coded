import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';



const Stack = createStackNavigator ();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignIn}/>
          <Stack.Screen name="Sign Up" component={SignUp}/>
          <Stack.Screen name="Bus Mate" component={Home}/>
          

      </Stack.Navigator>
      
      
    </NavigationContainer>

    
  )
}

export default Navigator;
