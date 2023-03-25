import FlatScreen from './screens/FlatScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import RoundScreen from './screens/RoundScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useState} from 'react'
import {View, StyleSheet, Button} from 'react-native'

export default function App() {

  const [showTimers, setShowTimers] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <View style = {styles.homeScreen}>

      <View style = {styles.headerButtons} >
      <Button 
        title={showTimers ? "stopwatches" : "timers"}
        onPress={() => {setShowTimers(!showTimers)}} />

        <Button
          title = "dark mode" 
          onPress={() => {setIsDarkMode(!isDarkMode)}}/>
      </View>

        {
        showTimers 
        ? 
        <FlatScreen 
          isDarkMode = {isDarkMode}/> 
        : 
        <StopwatchScreen 
          isDarkMode = {isDarkMode}/>
        }
    </View>

    
  );
}
const styles = StyleSheet.create({
 homeScreen: {
    flex: 1,
    //backgroundColor: 'red'
 },
 headerButtons: {
  marginTop: 25,
  flexDirection: 'row',
  justifyContent: 'space-between'
 }
});