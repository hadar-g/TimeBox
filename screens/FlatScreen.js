
import {  StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import TimerInput from '../components/TimerInput';
import { useState, React} from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function FlatScreen() {

  const[timersArray, setTimersArray] = useState([])
  const[index, setIndex] = useState(0)
  const[isDarkMode, setIsDarkMode] = useState(false)

  const addTimer = (timerObject) => {
   setTimersArray(timersArray => [...timersArray, {...timerObject, index: index}])
    setIndex(index => index + 1)
    //console.log(timersArray)
   // const timerColorChosen = timerObject.timerColorChosen
  }

  const removeTimer = (index) => {
    console.log('removing time from timer with index', index)
    setTimersArray(timersArray => timersArray.filter((timer) => timer.index != index));
  }
  



  return (
   
      <View style={isDarkMode ? {...styles.container, backgroundColor: 'black'}: styles.container}>
      <View style = {styles.darkModeContainer}>
        <Pressable style = {styles.darkModeButton}
                    onPress = {() => {setIsDarkMode(!isDarkMode)}} >
        <Image 
        style = {{height: 30, width: 30}}
        source = {isDarkMode ? require('../Images/moon-line-icon.jpg') : require('../Images/moon-icon.png')}/>
        </Pressable>
      </View>

      <Text style={isDarkMode ? {...styles.welcome, color: 'white'} : styles.welcome}>My Timers</Text>

      <TimerInput onAddTimer = {addTimer} />

     <ScrollView style = {styles.scroll}>
      { timersArray.map( (timerObject) => {
         return(

          <FlatTimer 
            key = {timerObject.id}
            s = {timerObject.seconds} 
            m = {timerObject.minutes} 
            h ={timerObject.hours} 
            title = {timerObject.title}
            timerColorChosen = {timerObject.timerColorChosen}
            onRemoveTimer = {() => {removeTimer(timerObject.index)}}
            isDarkMode = {isDarkMode}
          />
    

         )
      })}
     </ScrollView>


    </View>




   
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
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
