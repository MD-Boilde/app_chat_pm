import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {colors, fonts} from './screens/theme';
import React, {useState, useEffect} from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';
import ProfileScreen from './screens/ProfileScreen';
export default function App() {
  const Stack = createStackNavigator();

  const [user, setUser] = useState({
    userName: null,
    phoneNumber: null,
    auth: false,
  });

  useEffect(() => {
    const firebaseConfig = {
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

    const getLogin = async () => {
      await AsyncStorage.getItem('userPhone').then((val) => {
        if (val) {
          setUser({
            ...user,
            phoneNumber: val,
            auth: true,
          });
        } else {
          setUser({
            ...user,
            auth: false,
          });
        }
      });
    };

    getLogin();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.auth === false ? (
         
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setUser={setUser} user={user} />
            )}
          </Stack.Screen>
        ) : (
          
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen {...props} setUser={setUser} user={user} />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={({route}) => ({title: route.params.name})}
              name="Chat">
              {(props) => (
                <ChatScreen {...props} setUser={setUser} user={user} />
              )}
            </Stack.Screen>
            <Stack.Screen
              // options={({route}) => ({title: route.params.name})}
              name="Profile">
              {(props) => (
                <ProfileScreen {...props} setUser={setUser} user={user} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
