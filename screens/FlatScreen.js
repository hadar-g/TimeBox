
import {  StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import TimerInput from '../components/TimerInput';
import { useState, React, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
const allColorTestTimers = require('../components/Constants/AllColorTest')
const defaultTimer = require('../components/Constants/DefaultTimer')
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FlatScreen(props) {



 const[timersArray, setTimersArray] = useState(defaultTimer)
 const[index, setIndex] = useState(1)
  //  const[timersArray, setTimersArray] = useState(allColorTestTimers)
  // const[index, setIndex] = useState(20)
  useEffect(() => {

    const fetchAsyncData = async () => {
      const data = await _asyncGetData()
      if(data != '[]'){
        console.log('full')
       setTimersArray(data)
      console.log("in the function the data is ", data)
      }else {
        console.log('empty')
        // await _asyncSetData(defaultTimer)
        // setTimersArray(defaultTimer)
      }
    }

    fetchAsyncData()

   
  }, []);

  const _asyncSetData = async (item) => {

    const currentData = await _asyncGetData()
    const newArray = [...currentData, {...item, index: index}]

    try {
      await AsyncStorage.setItem(
        'timersArray',
         //timersArray
        JSON.stringify(newArray)
       // JSON.stringify(timersArray)
      );
    } catch (error) {
      console.log(error)
    }
  };

  const _asyncGetData = async () => {
    try {
      const value = await AsyncStorage.getItem('timersArray');
      if (value !== null) {
        
        console.log("this value from get" , JSON.parse(value));
        return JSON.parse(value)
      }else{
        return null
      }
    } catch (error) {
      console.log(error)
  };
  }

 const _asyncRemoveSingleTimer = async (index) => {

  const currentData = await _asyncGetData()
  console.log('removing single timer current data', currentData, index)
  const newArray = currentData.filter((timer) => timer.index != index)
  console.log('removing single timer new array', newArray)
  try{

    await AsyncStorage.setItem(
      'timersArray',
       //timersArray
      JSON.stringify(newArray)
     // JSON.stringify(timersArray)
    );

  }catch(error){
    console.log(error)
  }
 } 
 

  const addTimer = (timerObject) => {
   setTimersArray(timersArray => [...timersArray, {...timerObject, index: index}])
    setIndex(index => index + 1)
    //_asyncSetData(timerObject)
    _asyncSetData(timerObject, index)
   // _asyncGetData()
  }

  const removeTimer = (index) => {
   // console.log('removing time from timer with index', index)
   // console.log(allColorTest)
    setTimersArray(timersArray => timersArray.filter((timer) => timer.index != index));
    _asyncRemoveSingleTimer(index)
  }
  



  return (
   
      <View style={props.isDarkMode ? {...styles.container, backgroundColor: 'black'}: styles.container}>
      {/* <View style = {styles.darkModeContainer}>
        <Pressable style = {styles.darkModeButton}
                    onPress = {() => {setIsDarkMode(!isDarkMode)}} >
        <Image 
        style = {{height: 30, width: 30}}
        source = {isDarkMode ? require('../Images/moon-line-icon.jpg') : require('../Images/moon-icon.png')}/>
        </Pressable>
      </View> */}

      <Text style={props.isDarkMode ? {...styles.welcome, color: 'white'} : styles.welcome}>My Timers</Text>

      <TimerInput onAddTimer = {addTimer} />

     <ScrollView style = {styles.scroll}>
      { timersArray.map( (timerObject) => {
         return(

          <FlatTimer 
            key = {timerObject.key}
            s = {timerObject.seconds} 
            m = {timerObject.minutes} 
            h ={timerObject.hours} 
            title = {timerObject.title}
            timerColorChosen = {timerObject.timerColorChosen}
            onRemoveTimer = {() => {removeTimer(timerObject.index)}}
            isDarkMode = {props.isDarkMode}
            soundChosen = {timerObject.soundChosen}
          />
    

         )
      })}
     </ScrollView>


    </View>




   
  );
}

const styles = StyleSheet.create({
  container: {
   //flex: 1,
    flexDirection: 'column',
    justifyContent: 'top',
    paddingTop: 20,
    alignItems: 'flex-start',
    elevation: 1
  },
  welcome: {
    fontSize: 29,
    padding: 10,
    fontWeight: 'bold',
    fontFamily: "Helvetica Neue",
  //  marginTop: -20,
    marginBottom: 30
  },
  scroll: {
    width: '100%',
    marginBottom: 280
  },
  // darkModeButton: {
  //   height: 40,
  //   width: 40,
  //  // backgroundColor: 'black'
  // },
  // darkModeContainer: {
  //   //backgroundColor: '',
  //   width: '100%',
  //   height : 40,
  //   alignItems: 'flex-end',
  //   paddingRight: 10,
  //   zIndex: 2,
  //   elevation: 2
  //   //position: 'absolute'
  // }
});
