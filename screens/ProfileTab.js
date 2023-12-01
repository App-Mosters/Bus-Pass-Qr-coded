import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";

const ProfileTab = () => {
  const navigation = useNavigation();

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

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

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      await AsyncStorage.setItem("profileImage", result.uri);
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
        <Text style={styles.name}>User</Text>
        <Text style={styles.location}>Colombo, Sri Lanka </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Email: {auth.currentUser?.email}</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>(+94) </Text>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>Enter Bio</Text>

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
});
