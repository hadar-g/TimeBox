
import {  StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import TimerInput from '../components/TimerInput';
import { useState, React} from 'react';
import { v4 as uuidv4 } from 'uuid';
const allColorTestTimers = require('../components/Constants/AllColorTest')
const defaultTimer = require('../components/Constants/DefaultTimer')


export default function FlatScreen(props) {

 // const[timersArray, setTimersArray] = useState(defaultTimer)
//  const[index, setIndex] = useState(1)
   const[timersArray, setTimersArray] = useState(allColorTestTimers)
  const[index, setIndex] = useState(20)


  const addTimer = (timerObject) => {
   setTimersArray(timersArray => [...timersArray, {...timerObject, index: index}])
    setIndex(index => index + 1)
  }

  const removeTimer = (index) => {
   // console.log('removing time from timer with index', index)
   // console.log(allColorTest)
    setTimersArray(timersArray => timersArray.filter((timer) => timer.index != index));
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
    paddingTop: 40,
    alignItems: 'flex-start',
    elevation: 1
  },
  welcome: {
    fontSize: 29,
    padding: 10,
    fontWeight: 'bold',
    fontFamily: "Helvetica Neue",
    marginTop: -20,
    marginBottom: 30
  },
  scroll: {
    width: '100%'
  },
  darkModeButton: {
    height: 40,
    width: 40,
   // backgroundColor: 'black'
  },
  darkModeContainer: {
    //backgroundColor: '',
    width: '100%',
    height : 40,
    alignItems: 'flex-end',
    paddingRight: 10,
    zIndex: 2,
    elevation: 2
    //position: 'absolute'
  }
});
