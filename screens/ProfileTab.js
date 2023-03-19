import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/istockphoto-1300845620-612x612.jpg")} style={styles.profilePic} />
        <Text style={styles.name}>User</Text>
        <Text style={styles.location}>Colombo, Sri Lanka </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>User@gmail.com</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>(+94) </Text>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>Enter Bio</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  info: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileTab;
