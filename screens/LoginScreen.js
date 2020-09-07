import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {colors, fonts} from './theme';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
const LoginScreen: () => React$Node = ({setUser, user}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  const submitForm = async () => {
    if (phoneNumber.length > 15 || phoneNumber.length < 10) {
      Alert.alert('Error', 'Phone Number is wrong.');
    } else if (username.length < 3) {
      Alert.alert('Error', 'Your name can not be less than 3 characters');
    } else {
      await AsyncStorage.setItem('userPhone', phoneNumber);
      firebase
        .database()
        .ref('users/' + phoneNumber)
        .set({name: username});
      setUser({
        ...user,
        userName: username,
        phoneNumber: phoneNumber,
        auth: true,
      });
      Alert.alert('Login Success', 'You are chatting!');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ChatApp</Text>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          placeholderTextColor={colors.primary}
          keyboardType="number-pad"
          textContentType="telephoneNumber"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          placeholder="Your Name"
          value={username}
          style={styles.input}
          placeholderTextColor={colors.primary}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableHighlight style={styles.btn} onPress={() => submitForm()}>
          <Text style={styles.btnText}>Start Chat</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 50,
    fontSize: 30,
    color: colors.secondary,
    letterSpacing: 2,
    fontFamily: fonts.semiBold,
  },

  input: {
    borderWidth: 1,
    backgroundColor: colors.text,
    color: 'black',
    borderRadius: 15,
    borderColor: '#d3d3d3',
    width: '90%',
    padding: 15,
    marginBottom: 20,
    fontFamily: fonts.bold,
  },
  btn: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: colors.text,
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: fonts.bold,
  },
});

export default LoginScreen;
