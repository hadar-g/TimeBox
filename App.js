import FlatScreen from './screens/FlatScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import RoundScreen from './screens/RoundScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useState} from 'react'
import {View, StyleSheet, Button, Pressable, Image} from 'react-native'

export default function App() {

  const [showTimers, setShowTimers] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <View style = {isDarkMode ? {...styles.homeScreen, backgroundColor: 'black'}: {...styles.homeScreen, backgroundColor: 'white'}}>

      <View style = {styles.headerButtons} >
        <View style = {styles.toggles}>
          <Pressable 
            style = {showTimers ?styles.toggleButtons : {...styles.toggleButtons, backgroundColor: 'rgb(255,149,0)'}}
            onPress={() => setShowTimers(false)}>
              <Image 
                style = {{height: 30, width: 30, marginRight: 7}}
                source = {require('./Images/stopwatch.png')} />
            </Pressable>
          <Pressable  
            style = {showTimers ?{...styles.toggleButtons, backgroundColor: 'rgb(255,149,0)'} : styles.toggleButtons}
            onPress={() => setShowTimers(true)}>
              <Image 
                style = {{height: 30, width: 30}}
                source = {require('./Images/sand-clock.png')} />
          </Pressable>

        </View>

        <View style = {styles.darkModeContainer}>
        <Pressable style = {styles.darkModeButton}
                    onPress = {() => {setIsDarkMode(!isDarkMode)}} >
        <Image 
        style = {{height: 40, width: 40}}
        source = {isDarkMode ? require('./Images/crescent-moon.png') : require('./Images/moon-icon.png')}/>
        </Pressable>
      </View>
{/* 
        <Button
          title = "dark mode" 
          onPress={() => {setIsDarkMode(!isDarkMode)}}/> */}
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
  marginTop: 50,
  flexDirection: 'row',
  justifyContent: 'space-between'
 },
 toggles:{
  width: 100,
  flexDirection: 'row',
  marginLeft: 5
 // justifyContent: 'space-between'
 },
 toggleButtons: {
   width: 50, 
   height: 50, 
   borderRadius: 30,
   borderColor: 'black',
   borderWidth: 3,
   marginLeft: 20,
   backgroundColor: 'white',
   justifyContent: 'center',
   alignItems: 'center'
 },

 darkModeContainer: {
//  backgroundColor: 'white',
  marginRight: 20
 }
});