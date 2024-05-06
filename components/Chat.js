import { Bubble, GiftedChat, InputToolbar, Message, MessageText, Send } from "react-native-gifted-chat";
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from "react-native";

import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { userID, name, background } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  }

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
    return <InputToolbar
      {...props}
      containerStyle={styles.chat}
    />
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

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      });
      setMessages(newMessages);
    })

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        textStyle={{ color: '#fff' }}
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