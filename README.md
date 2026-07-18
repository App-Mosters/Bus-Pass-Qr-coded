# 🚌 Bus Pass QR — Digital Bus Pass & Fare Payment System

![React Native](https://img.shields.io/badge/React%20Native-0.72-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK%2049-000020?logo=expo)
![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase)
![Platform](https://img.shields.io/badge/Platform-Android-success)

A cross-platform mobile application built using **React Native**, **Expo**, and **Firebase** that modernizes the traditional bus pass system using QR codes and a digital wallet.

Passengers receive a unique QR-code-based digital bus pass linked to their account. Conductors can scan the QR code to automatically deduct the bus fare from the passenger's wallet, with all transactions synchronized in real time using Firebase.

> Originally developed as a first-year university project and later enhanced with additional features, improved architecture, Firebase integration, and standalone Android builds.

---

# ✨ Features

## 🔐 Authentication
- Email & Password Sign Up
- Secure Sign In
- Password Reset
- Firebase Authentication

## 🎫 Digital Bus Pass
- Unique QR Code generated for every registered user
- Dedicated **My Pass** screen
- QR code represents the passenger's digital bus pass

## 💰 Digital Wallet
- Firestore-backed wallet balance
- Wallet top-up functionality
- Real-time balance updates
- Transaction history

## 📷 QR Fare Payment
- Scan passenger QR code
- Automatically deduct a fixed **Rs. 50** fare
- Atomic Firestore transaction prevents inconsistent balance updates
- Transaction records stored in Firestore

## 👤 Profile Management
- Update personal information
- Profile photo upload
- Firebase Storage integration

## 📱 Standalone Android Application
- Built using **EAS Build**
- Runs independently without Expo Go

---

# 🛠️ Technology Stack

| Layer | Technology |
|--------|------------|
| Mobile Framework | React Native |
| Development Platform | Expo SDK 49 |
| Navigation | React Navigation |
| Backend | Firebase |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| QR Generation | react-native-qrcode-svg |
| QR Scanning | expo-barcode-scanner |
| Build System | EAS Build |
| JavaScript Engine | Hermes |

---

# 📱 Application Screens

| Screen | Description |
|--------|-------------|
| Sign In | User Authentication |
| Sign Up | User Registration |
| Home | Main Dashboard |
| My Pass | Displays personal QR bus pass |
| QR Scan | Scan QR code and deduct fare |
| Wallet | Wallet balance, top-up and transactions |
| Profile | User profile management |

---

# 🏗️ System Architecture

This application uses **Firebase** as a Backend-as-a-Service (BaaS), providing:

- Firebase Authentication
- Cloud Firestore
- Firebase Storage

The fare payment workflow is implemented using Firestore transactions:

1. Passenger displays their QR Code.
2. Conductor scans the QR code.
3. The passenger's document is retrieved from Firestore.
4. Wallet balance is validated.
5. Rs. 50 is deducted atomically.
6. Transaction history is updated.
7. The new balance is synchronized across devices.

This approach ensures consistent updates while demonstrating the use of Firebase transactions in a real-world mobile application.

---

# 🚀 Getting Started

## Prerequisites

- Node.js
- npm
- Expo Account
- Firebase Project
- EAS CLI

Install EAS CLI:

```bash
npm install -g eas-cli
```

---

## Installation

```bash
git clone https://github.com/App-Mosters/Bus-Pass-Qr-coded.git

cd Bus-Pass-Qr-coded

npm install
```

---

## Firebase Setup

1. Create a Firebase Project.
2. Enable:

- Firebase Authentication (Email/Password)
- Cloud Firestore
- Firebase Storage

3. Replace the Firebase configuration inside:

```
firebase.js
```

with your own Firebase project credentials.

---

## Running the Application (Development)

Build the custom development client:

```bash
eas build --profile development --platform android
```

Install the generated APK on your Android device.

Start Metro:

```bash
npx expo start --dev-client
```

---

## Building a Standalone APK

```bash
eas build --profile preview --platform android
```

---

# 📥 Download

The latest Android APK is available under the GitHub **Releases** section.

➡️ https://github.com/App-Mosters/Bus-Pass-Qr-coded/releases/latest

# 📂 Project Structure

```
Bus-Pass-Qr-coded/
│
├── App.js
├── Navigator.js
├── firebase.js
├── eas.json
├── assets/
├── screens/
│   ├── SignIn.js
│   ├── SignUp.js
│   ├── Home.js
│   ├── HomeTab.js
│   ├── Wallet.js
│   ├── MyPass.js
│   ├── QrSCAN.js
│   └── ProfileTab.js
├── components/
└── README.md
```

---

# 📌 Current Functionality

- ✅ User Authentication
- ✅ QR Bus Pass Generation
- ✅ Unique QR Code per User
- ✅ Wallet Management
- ✅ QR-based Fare Deduction
- ✅ Transaction History
- ✅ Firebase Cloud Storage
- ✅ Profile Management
- ✅ Standalone Android APK

---

# 🛣️ Future Improvements

- Cloud Functions for server-side fare processing
- Admin dashboard
- Conductor application
- Real bus route integration
- Distance-based fare calculation
- Push notifications
- Monthly/Daily pass subscriptions
- Payment gateway integration
- Offline QR verification

---


# 📄 License

This project was developed for educational and portfolio purposes. It demonstrates the use of React Native, Expo, Firebase Authentication, Cloud Firestore, and QR-based mobile application development.
