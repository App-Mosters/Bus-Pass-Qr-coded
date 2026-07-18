import React,{} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileTab from './ProfileTab';
import HomeTab from './HomeTab';
import QrSCAN from './QrSCAN';
import Wallet from './Wallet';
import MyPass from './MyPass';

// Main navigation component for the Home screen
const Home = () => {
    const Tab = createBottomTabNavigator();

    function HomeScreen() {
        return (
          //Home screen 
          <HomeTab/>

        );
      }
    
  // Component for the Wallet screen      
      function Wallets() {
        return (
          //wallet screen code

          <Wallet/>
         
        );
      }
    
// Component for the QR Scan screen
      function QRScan() {
        return (
          //Qr screen code
                 
          <QrSCAN/>
          
        );
      }


      function Profiletab() {
        return (
          //profile screen code
          //<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            //<Text>Profile!</Text>
          //</View>
          <ProfileTab/>
        );
      }

      function Pass() {
  return <MyPass />;
}


      
  return (


    
      <Tab.Navigator>
        <Tab.Screen 
        name= "Home"
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} />
        <Tab.Screen 
        name="Wallet" 
        component={Wallets} 
        options={{
        tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
            ),
          }}/>

          <Tab.Screen 
        name="Scan your Qr Code" 
        component={QRScan} 
        options={{
        tabBarLabel: 'QR Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
            ),
          }}/>    


        <Tab.Screen 
        name="Profile" 
        component={Profiletab} 
        options={{
          tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="face-man-profile" color={color} size={size} />
              ),
            }}/>

            <Tab.Screen
  name="My Pass"
  component={Pass}
  options={{
    tabBarLabel: 'My Pass',
  }}
/>
      
      </Tab.Navigator>
    
  )
}

export default Home;
