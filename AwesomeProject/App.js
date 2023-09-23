import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from './screens/RegistrationScreen.js';
import { LogInScreen } from './screens/LogInScreen.js';
import { HomeScreen } from './screens/HomeScreen.js';
import { PostScreen } from './screens/PostScreen.js';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import './config.js';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}