import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';

export default function SplashScreen({setUser}) {
  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyBygjtzIr7Kvx7i1znFI1EtRVkNq3PZZq8",
      authDomain: "socialapp-88d7b.firebaseapp.com",
      databaseURL: "https://socialapp-88d7b.firebaseio.com",
      projectId: "socialapp-88d7b",
      storageBucket: "socialapp-88d7b.appspot.com",
      messagingSenderId: "680553377304",
      appId: "1: 680553377304: web: 51a99b8557053092ec9d6d",
      // measurementId: 'G-FVPDS1N7B8',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    setUser({
      ...user,
      isLoading: false,
    });
  }, []);
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
