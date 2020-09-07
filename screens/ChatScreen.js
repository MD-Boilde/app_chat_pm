import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Dimensions, Animated, KeyboardAvoidingView, Image
} from 'react-native';
import { colors, fonts } from './theme';
import firebase from 'firebase';

const dimension = Dimensions.get('window');

const ChatScreen = ({ route, user }) => {
  const [textMessage, setTextMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref('messages')
      .child(user.phoneNumber)
      .child(route.params.phone)
      .on('child_added', (value) =>
        setMessageList((prevState) => [...prevState, value.val()]),
      );
  }, []);

  const sendMessage = async () => {
    if (textMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(user.phoneNumber)
        .child(route.params.phone)
        .push().key;
      let updates = {};
      let payloadMessage = {
        message: textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: user.phoneNumber,
      };
      updates[
        'messages/' + user.phoneNumber + '/' + route.params.phone + '/' + msgId
      ] = payloadMessage;
      updates[
        'messages/' + route.params.phone + '/' + user.phoneNumber + '/' + msgId
      ] = payloadMessage;
      firebase.database().ref().update(updates);
      setTextMessage('');
    }
  };

  const renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor:
            item.from === user.phoneNumber ? colors.light : colors.secondary,
          width: '60%',
          alignSelf: item.from === user.phoneNumber ? 'flex-end' : 'flex-start',
          marginBottom: 10,
          borderRadius: 10,
        }}>
        <View style={style = {}}>
          <Text style={styles.itemText}>{item.message}</Text>
          <Text style={styles.itemTime}>{convertTime(item.time)}</Text>
        </View>
      </View>
    );
  };

  const convertTime = (time) => {
    let day = new Date(time);
    let current = new Date();
    let result = day.getHours() < 10 ? '0' : '' + day.getHours() + ':';
    result += day.getMinutes() < 10 ? '0' : '' + day.getMinutes();
    if (current.getDay() !== day.getDay()) {
      result = day.getDay() + ' ' + day.getMonth() + ' ' + result;
    }
    return result;
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      
      <View>
        <FlatList
          // inverted={-1}
          data={messageList}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          ref={ref => this.flatlist = ref}
          onContentSizeChange={() => this.flatlist.scrollToEnd({ animated: true })}
          onLayout={() => this.flatlist.scrollToEnd({ animated: true })}
        // ListFooterComponent ={<Animated.View style ={{height : new Animated.Value(60)}}/>}
        />
      </View>
      <View style={styles.sendArea}>
        <TextInput
          style={styles.input}
          value={textMessage}
          onChangeText={(text) => setTextMessage(text)}
          placeholder="Type message..."
        />
        <TouchableHighlight style={styles.btn} onPress={() => sendMessage()}>
          <Text style={styles.btnText}>Send</Text>
          {/* <Image style = {styles.btnSend} source ={require('../assets/sendmes.png')}></Image> */}
        </TouchableHighlight>
      </View>
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  input: {
    borderColor: colors.secondary,
    borderWidth: 1,
    padding: 5,
    width: '75%',
    marginLeft: 5,
    borderRadius: 15,
  },
  btn: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },
  btnSend :{
    // position : 'absolute',
    height :30,
    width : 30,
    borderRadius : 30/2,
    backgroundColor : colors.light
  },
  btnText: {
    color: colors.text,
    letterSpacing: 1.5,
    fontFamily: fonts.bold,
  },
  sendArea: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between',
  },
  itemText: {
    color: colors.text,
    padding: 7,
    fontSize: 18
  },
  itemTime: {
    color: colors.text,
    opacity: 0.8,
    fontSize: 15,
    marginLeft: '70%',
    marginBottom: 5,
    fontFamily: fonts.bold,
  },
  list: {
    padding: 10,
    height: dimension.height * 0.8,
    // height ,
    marginBottom: 10,

  },
});

export default ChatScreen;
