import React from 'react'
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
    <StatusBar translucent barStyle={'dark-content'} />
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='index' />
    </Stack>
    </>
  )
}