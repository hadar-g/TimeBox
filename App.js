import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useState, useEffect } from 'react';
import FlatTimer from './components/FlatTimer';
import TimerInput from './components/TimerInput';


export default function App() {
  
  return (
    <View style={styles.container}>

      <TimerInput />

      <FlatTimer s={15} m={2} h = {1} title = 'title number 1'/>

      <FlatTimer s = {20} m = {30} h ={1} title ="title number 2" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'top',
   // backgroundColor: 'red',
    paddingTop: 150

  },
});
