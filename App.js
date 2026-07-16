// Importing necessary components from 'expo-status-bar' and 'react-native'.
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Importing 'NavigationContainer' from '@react-navigation/native'.
import { NavigationContainer } from '@react-navigation/native';

// Importing the main navigator component from './Navigator'.
import Navigator from './Navigator';

// Entry point of the application, rendering the main navigator within a navigation container.
export default function App() {
  return (
    // Wrapping the main navigator with 'NavigationContainer'.
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

// Styles for the 'container' component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

