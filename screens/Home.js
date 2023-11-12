import React,{} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileTab from './ProfileTab';
import HomeTab from './HomeTab';
import QrSCAN from './QrSCAN';
import Wallet from './Wallet';

const Home = () => {
    const Tab = createBottomTabNavigator();

    function HomeScreen() {
        return (
          //Home screen 
          <HomeTab/>

        );
      }
      
      function Wallets() {
        return (
          //wallet screen code

          <Wallet/>
         
        );
      }

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
      
      </Tab.Navigator>
    
  )
}

export default Home;
