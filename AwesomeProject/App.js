import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RegistrationScreen } from './screens/RegistrationScreen.js';
import { LogInScreen } from './screens/LogInScreen.js';

export default function App() {

  const LogIn = true;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {!LogIn ? <LogInScreen /> : <RegistrationScreen />}
    </SafeAreaView>
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