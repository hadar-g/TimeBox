import FlatScreen from './screens/FlatScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import RoundScreen from './screens/RoundScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useState, useEffect} from 'react'
import {View, StyleSheet, Button, Pressable, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const defaultTimer = require('./components/Constants/DefaultTimer')
const defaultStopwatch = require('./components/Constants/DefaultStopwatch')
import * as TaskManager from 'expo-task-manager';

export default function App() {

  const [showTimers, setShowTimers] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // TaskManager.defineTask('background-fetch', async () => {
  //   const now = Date.now();
  
  //   console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  
  //   // Be sure to return the successful result type!
  //   return BackgroundFetch.BackgroundFetchResult.NewData;
  // });

  useEffect(() => {
    console.log('app use effect')
    _asyncSetData(defaultTimer, 'timersArray')
    _asyncSetData(defaultStopwatch, 'stopwatchArray')
  }, [])

  const _asyncSetData = async (array, dataKey) => {
    // const currentData = await _asyncGetData('timersArray')
    // const newArray = [...currentData, {...item, index: index}]
    try {
      await AsyncStorage.setItem(
        dataKey,
         //timersArray
        JSON.stringify(array)
       // JSON.stringify(timersArray)
      );
    } catch (error) {
      console.log(error)
    }
  };

  const _asyncGetData = async (dataKey) => {
    try {
      const value = await AsyncStorage.getItem(dataKey);
      if (value !== null) {
        
       // console.log("this value from get" , JSON.parse(value));
        return JSON.parse(value)
      }else{
        return null
      }
    } catch (error) {
      console.log(error)
  };
  }

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
{/* 
      <StopwatchScreen 
          asyncSetData = {_asyncSetData}
          asyncGetData = {_asyncGetData}
          isDarkMode = {isDarkMode}
          isVisibleNow = {showTimers}/>

    <FlatScreen 
          asyncSetData = {_asyncSetData}
          asyncGetData = {_asyncGetData}
          isDarkMode = {isDarkMode}
          isVisibleNow = {showTimers}/>    */}

          <StopwatchScreen 
          asyncSetData = {_asyncSetData}
          asyncGetData = {_asyncGetData}
          isDarkMode = {isDarkMode}
          isVisibleNow = {showTimers}
          toggle = {() => setShowTimers(false)}/>
{/* 
        {
        showTimers 
        ? 
        <FlatScreen 
          asyncSetData = {_asyncSetData}
          asyncGetData = {_asyncGetData}
          isDarkMode = {isDarkMode}
          isVisibleNow = {showTimers}/> 
        : 
        <StopwatchScreen 
          asyncSetData = {_asyncSetData}
          asyncGetData = {_asyncGetData}
          isDarkMode = {isDarkMode}
          isVisibleNow = {showTimers}/>
        } */}
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