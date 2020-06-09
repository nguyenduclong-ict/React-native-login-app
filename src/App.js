import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import AccountService from './services/AccountService';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  const [initRoute, setInitRoute] = useState('login');
  const [initedApp, setInitedApp] = useState(false);
  useEffect(() => {
    initApp();
    return () => {};
  }, []);

  const initApp = async () => {
    await AccountService.initService();
    if (AccountService.loggedIn) {
      setInitRoute('Home');
    } else {
      setInitRoute('Login');
    }
    setInitedApp(true);
  };

  return initedApp ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initRoute}>
        <Stack.Screen
          name="Login"
          options={{ header: () => null, gestureEnabled: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <SplashScreen />
  );
}

const styles = StyleSheet.create({});
