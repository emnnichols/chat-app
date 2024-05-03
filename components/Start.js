import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { useState } from 'react';

const Start = ({ navigation }) => {
  // State that holds the TextInput value
  const [name, setName] = useState('');
  // State that holds the background color chosen by user
  const [background, setBackground] = useState('');
  // Colors used as background options
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  // Reusable function to create border around the selected color
  const selected = (color) => background === color ? styles.selectedColor : null;

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      resizeMode="cover"
      style={styles.image}
    >
      {/* View that has the app name / title */}
      <View style={styles.appNameView}>
        <Text style={{ color: '#fff' }}>
          WELCOME TO
        </Text>
        <Text style={styles.appName}>
          CHAT
        </Text>
      </View>

      {/* View that has the TextInput and Background Color choices */}
      <View style={styles.startOptions}>
        <TextInput
          accessibilityLabel="Username Field"
          accessibilityHint="Enter your username here"
          accessibilityRole="text"
          style={[styles.textInput, { opacity: 50 }]}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />

        <Text style={[styles.textInput, styles.chooseColorText]}>
          Choose Background Color:
        </Text>
        {/* Renders a TouchableOpacity for each background color option */}
        <View style={styles.colorOptions}>
          {colors.map((color, index) => (
            <TouchableOpacity
              accessibilityLabel="Color buttons"
              accessibilityHint="Choose what color you want as your chat background"
              accessibilityRole="button"
              key={index}
              style={[styles.chooseColor, { backgroundColor: color }, selected(color)]}
              onPress={() => { setBackground(color) }}
            />
          ))}
        </View>

        {/* Navigates to the Chat screen and passes the name and background color */}
        <TouchableOpacity
          accessibilityLabel="Go to chat"
          accessibilityRole="button"
          style={styles.button}
          onPress={() => navigation.navigate('Chat', { name: name, background: background })}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" style={{ marginBottom: 120 }} /> : null}
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appNameView: {
    flex: 1,
    marginBottom: 30,
    marginTop: 110,
    paddingTop: '25%',
    minHeight: 150,
    alignItems: 'center',
  },
  appName: {
    fontSize: 45,
    fontWeight: '600',
    color: "#ffffff",
    letterSpacing: 10
  },
  startOptions: {
    width: '88%',
    minHeight: '35%',
    maxHeight: '40%',
    marginBottom: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 13,
    justifyContent: "space-evenly",
  },
  textInput: {
    width: "88%",
    fontSize: 16,
    fontWeight: '300',
    color: "#757083",
    padding: 15,
    borderWidth: 1,
    marginBottom: '4%',
  },
  colorOptions: {
    flexDirection: 'row',
    width: "88%",
    height: '10%',
    marginBottom: 40
  },
  chooseColorText: {
    borderWidth: 0,
    padding: 0,
    opacity: 100
  },
  chooseColor: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
    marginLeft: 15
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#000"
  },
  button: {
    width: "88%",
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#757083'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Start;