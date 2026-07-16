import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { auth, db, storage } from "../firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

// ProfileTab component for the user profile screen
const ProfileTab = () => {
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  
 // Fetch user information from Firestore and set state variables
  useEffect(() => {
    const getUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        
        // Retrieve additional user information from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();

        // Set the retrieved information in the state
        setName(user.displayName);
        setPhoneNum(userDoc.data()?.phoneNumber);

        // Set profile image URL from Firestore
        const profileImageURL = userDoc.data()?.profileImage;
        if (profileImageURL) {
          setImage(profileImageURL);
          await AsyncStorage.setItem("profileImage", profileImageURL);
        }
      }
    };

    getUserInfo();
  }, []);
  
// Request gallery permissions on component mount
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
  
      const user = auth.currentUser;
      const userDoc = await db.collection('users').doc(user.uid).get();
      const profileImageURL = userDoc.data()?.profileImage;
  
      if (profileImageURL) {
        setImage(profileImageURL);
        await AsyncStorage.setItem("profileImage", profileImageURL);
      }
    })();
  }, []);
  
// Pick image from gallery and upload to Firebase Storage
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
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const user = auth.currentUser;
      const imagePath = `profileImages/${user.uid}`;

      const uploadTask = storage.ref().child(imagePath).put(blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          
          // Handle progress if needed
        },
        (error) => {
          console.error("Error uploading image to Firebase Storage:", error);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          setImage(downloadURL);
          await AsyncStorage.setItem("profileImage", downloadURL);

          // Update user document in Firestore with the download URL
          await db.collection('users').doc(user.uid).update({
            profileImage: downloadURL,
          });
        }
      );
    }
  };
  
// Handle user logout
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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>Colombo, Sri Lanka </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Email: {auth.currentUser?.email}</Text>
        <Text style={styles.label}>Phone: (+94) {phoneNum}</Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileTab;

// Styles for the ProfileTab component
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
    backgroundColor: "#fffdaf",
    padding: 10,
    borderRadius: 15,
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
