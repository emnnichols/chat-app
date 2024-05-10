import { useEffect } from 'react';
import { StyleSheet, Alert, LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNetInfo } from '@react-native-community/netinfo';

import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { app } from './firebase';

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Start"
          component={Start}
        />

        <Stack.Screen
          name="Chat"
        >
          {props =>
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
