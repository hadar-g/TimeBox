
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
    console.log('useEffect hello')

    const fetchData = async() => {
      console.log('info from props is',await props.asyncGetData('timersArray'))
      setTimersArray(await props.asyncGetData('timersArray'))
    }
    fetchData()
    
  }, []);
 

  const addTimer = (timerObject) => {
   setTimersArray(timersArray => [...timersArray, {...timerObject, index: index}])
    setIndex(index => index + 1)
    props.asyncSetData([...timersArray, {...timerObject, index: index}], 'timersArray')
  }

  const removeTimer = (index) => {
    setTimersArray(timersArray => timersArray.filter((timer) => timer.index != index));
   props.asyncSetData(timersArray.filter((timer) => timer.index != index), 'timersArray')
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
            index = {timerObject.index}
            asyncSetData = {props.asyncSetData}
            asyncGetData = {props.asyncGetData}
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
