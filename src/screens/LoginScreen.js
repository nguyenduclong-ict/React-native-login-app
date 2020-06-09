import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SIZE, STYLES, COLORS } from '@/constants/THEME';
import { useNavigation, StackActions } from '@react-navigation/native';
import AccountService from '@/services/AccountService';

export default function LoginScreen() {
  const formState = new Animated.Value(0);
  const loginFormPosition = formState.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZE.height / 3 + 100, 0],
  });
  const loginFormOpacity = formState.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const loginPlaceholderPosition = formState.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SIZE.height / 3 + 100],
  });
  const loginPlaceholderOpacity = formState.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const backgroundPosition = formState.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(SIZE.height / 3)],
  });
  const closeButtonRotate = formState.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });
  const closeButtonPosition = formState.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, -25],
  });

  const navigation = useNavigation();

  const changeFormState = state => {
    Animated.timing(formState, {
      toValue: state,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = async () => {
    await AccountService.login();
    navigation.dispatch(StackActions.replace('Home'));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
      <StatusBar barStyle="light-content" hidden={true} />
      <Animated.Image
        source={require('../assets/images/bg-login.jpg')}
        style={[
          StyleSheet.absoluteFill,
          styles.background,
          { top: backgroundPosition, height: SIZE.height },
        ]}
      />
      <View style={{ height: SIZE.height / 3 }}>
        {/* Login container */}
        <Animated.View
          style={[
            styles.loginPlacehoder,
            {
              top: loginPlaceholderPosition,
              opacity: loginPlaceholderOpacity,
              flex: 1,
              backgroundColor: 'transparent',
            },
          ]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'white' }]}
            onPress={() => changeFormState(1)}>
            <Text style={[styles.buttonText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4267B2' }]}>
            <Text style={[styles.buttonText, { color: 'white' }]}>
              Login with facebook
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Close button */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              width: 50,
              height: 50,
              zIndex: 2,
              left: SIZE.width / 2 - 25,
              top: closeButtonPosition,
              opacity: loginFormOpacity,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.closeButton}
            onPress={() => changeFormState(0)}>
            <Animated.View
              style={[
                styles.buttonText,
                {
                  transform: [{ rotate: closeButtonRotate }],
                },
              ]}>
              <Text style={{ fontWeight: 'bold' }}>X</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Login form */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.loginForm,
            {
              top: loginFormPosition,
              opacity: loginFormOpacity,
            },
          ]}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor={COLORS.placeholder}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            placeholderTextColor={COLORS.placeholder}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'white' }]}
            onPress={handleLogin}>
            <Text style={[styles.buttonText]}>LOGIN</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SIZE.height,
  },
  background: {
    flex: 1,
  },
  loginPlacehoder: {
    ...StyleSheet.absoluteFillObject,
    padding: 24,
    justifyContent: 'center',
  },
  loginForm: {
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    marginVertical: 12,
    borderWidth: 0.5,
    paddingLeft: 12.5,
    fontSize: 16,
    borderColor: 'rgba(0,0,0,0.2)',
    color: 'black',
  },
  button: {
    ...STYLES.boxShadow,
    shadowRadius: 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    ...STYLES.boxShadow,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
