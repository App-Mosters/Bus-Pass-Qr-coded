import { StyleSheet, Text, View,SafeAreaView ,Image,useState} from 'react-native';
import React from 'react';

const ProfileTab = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageView}>
        <Image style={styles.image} source={require("../assets/istockphoto-1300845620-612x612.jpg")} />
      </View>  
      
      <Text>ProfileTab</Text>
    </SafeAreaView>
  )
}

export default ProfileTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  imageView:{
    height:"40%",
    width:"60%",
    marginLeft:"20%",
  },
  image:{
    marginTop:1,
    height:"100%",
    width:"100%",
    //marginLeft:"20%",
  },
})