import { ImageBackground, Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
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
      <Text style={{ color: '#fff' }}>
        WELCOME TO
      </Text>
      <Text style={styles.appName}>
        CHAT
      </Text>

      <View style={styles.startOptions}>
        <TextInput
          style={[styles.textInput, { opacity: 50, marginBottom: 40 }]}
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
              key={index}
              style={[styles.chooseColor, { backgroundColor: color }, selected(color)]}
              onPress={() => { setBackground(color) }}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          // Navigates to the Chat screen and passes the name and background color
          onPress={() => navigation.navigate('Chat', { name: name, background: background })}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 45,
    fontWeight: '600',
    color: "#ffffff",
    letterSpacing: 10,
    marginBottom: '40%'
  },
  startOptions: {
    width: '88%',
    maxHeight: '44%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  textInput: {
    width: "88%",
    fontSize: 16,
    fontWeight: '300',
    color: "#757083",
    padding: 15,
    borderWidth: 1,
    marginBottom: '5%'
  },
  colorOptions: {
    flexDirection: 'row',
    width: "88%",
    height: '20%',
    marginBottom: '5%'
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