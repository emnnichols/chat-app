import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTkyZ0jLd9p9W6BChwDtB1ZnM5gEO1zhk",
  authDomain: "chat-app-5dd3a.firebaseapp.com",
  projectId: "chat-app-5dd3a",
  storageBucket: "chat-app-5dd3a.appspot.com",
  messagingSenderId: "404765821691",
  appId: "1:404765821691:web:1e5d0d592ca9016f2cfe5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, getApp, getAuth };