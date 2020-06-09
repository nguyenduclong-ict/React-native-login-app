import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import AccountService from '@/services/AccountService';

export default function HomeScreen() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AccountService.logout();
    navigation.dispatch(StackActions.replace('Login'));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button title="Profile" onPress={() => navigation.push('Profile')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({});
