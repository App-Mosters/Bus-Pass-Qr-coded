import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { auth, db } from "../firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";

const ProfileTab = () => {
  const navigation = useNavigation();

  // State variables to store user information
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Check and request gallery permissions
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

      // Retrieve and set saved profile image
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setImage(savedImage);
      }
    })();
  }, []);

  const pickImage = async () => {
    if (!hasGalleryPermission) {
      alert("Permission required");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    // Update profile image if an image is selected
    if (!result.cancelled) {
      setImage(result.uri);
      await AsyncStorage.setItem("profileImage", result.uri);
    }
  };

  const saveProfile = async () => {
    const userId = auth.currentUser?.uid;

    try {
      // Update Firestore with user profile details
      await db.collection('profiles').doc(userId).set({
        name,
        location,
        bio,
        // Add more fields for other user information
      });

      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("logged out");
        navigation.replace("Sign In");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        {image ? (
          <Image source={{ uri: image }} style={styles.profilePic} />
        ) : (
          <Image
            source={require("../assets/istockphoto-1300845620-612x612.jpg")}
            style={styles.profilePic}
          />
        )}
        <TouchableOpacity
          style={styles.editProfile}
          onPress={() => pickImage()}
        >
          <MaterialCommunityIcons
            name="account-edit"
            color={"#fff"}
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{name || 'User'}</Text>
        <Text style={styles.location}>{location || 'Colombo, Sri Lanka'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Email: {auth.currentUser?.email}</Text>
        
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <Text style={styles.label}>Bio:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Bio"
          value={bio}
          onChangeText={(text) => setBio(text)}
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />

        <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 10,
  },
  editProfile: {
    left: 50,
    bottom: 40,
    backgroundColor: "#000000",
    padding: 5,
    borderRadius: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    bottom: 20,
  },
  location: {
    fontSize: 16,
    color: "#666",
    bottom: 20,
  },
  info: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    bottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#E6C700",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    fontWeight: "bold",
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },

  saveButton: {
    backgroundColor: "#3498db",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
