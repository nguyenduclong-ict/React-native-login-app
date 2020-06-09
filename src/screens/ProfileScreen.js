import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountService from '@/services/AccountService';

export default function ProfileScreen() {
  const [user, setUser] = useState(AccountService.user);

  return (
    <View>
      <Text>Username: {user.username} </Text>
      <Text>Name: {user.profile?.name} </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
