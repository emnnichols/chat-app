import { Bubble, GiftedChat, InputToolbar, Message, MessageText, Send } from "react-native-gifted-chat";
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, background } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
    return <Send {...props} textStyle={styles.sendButton} />
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello Developer!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: require('../assets/icon.png'),
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
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
          _id: 1,
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
    paddingTop: 8,
    paddingBottom: 27,
    backgroundColor: '#000',
    color: '#fff',
    marginBottom: 0,
    marginRight: -10
  }
});

export default Chat;