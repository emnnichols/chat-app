import MapView from 'react-native-maps';
import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat, InputToolbar, Message, MessageText, Send } from "react-native-gifted-chat";

import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from "./CustomActions";

const Chat = ({ isConnected, route, navigation, db, storage }) => {
  const { userID, name, background } = route.params;
  const [messages, setMessages] = useState([]);

  // Adds new messages to Firebase
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Customization for message Bubbles
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
          marginBottom: 15,
        },
        left: {
          backgroundColor: "#fff",
          marginBottom: 15
        }
      }}
    />
  }

  // Customization for message composer
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar
      {...props}
      containerStyle={styles.chat}
    />;
    else return null;
  }

  // Changes System Message text color
  const renderMessage = (props) => {
    return <Message
      {...props}
      textStyle={background === '#090C08' || background === '#474056' ? { color: '#fff' } : { color: '#000' }}
    />
  }

  // Customize message text
  const renderMessageText = (props) => {
    return <MessageText
      {...props}
      customTextStyle={{ paddingHorizontal: 10, paddingTop: 5 }}
    />
  }

  // Customize Send button
  const renderSend = (props) => {
    return <Send {...props} textStyle={[styles.sendButton, Platform.OS === 'android' ? { paddingBottom: 0 } : null]} />
  }

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // Unregister current onSnapshot listener
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  // Cache messages to AsyncStoage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages_list', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Load cached messages
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages_list') || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        textStyle={{ color: '#fff' }}
        renderCustomView={renderCustomView}
        renderActions={renderCustomActions}
        renderInputToolbar={renderInputToolbar}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        renderSend={renderSend}
        renderAvatarOnTop={true}
        showUserAvatar={true}
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name,
          avatar: require('../assets/icon.png')
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView style={{ paddingBottom: 10 }} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0
  },
  // Style for Message Composer
  chat: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    paddingHorizontal: 15,
    paddingBottom: 27,
    color: '#000',
    marginBottom: 0,
    marginRight: -10
  }
});

export default Chat;