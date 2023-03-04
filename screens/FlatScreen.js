
import { StyleSheet, Text, View, Button, ScrollView, Image, Pressable} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import TimerInput from '../components/TimerInput';
import RoundScreen from './RoundScreen';
import { NavigationContainer } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState, React, forwardRef, useImperativeHandle, useRef} from 'react';


export default function FlatScreen() {

  const[timersArray, setTimersArray] = useState([])
  const[index, setIndex] = useState(0)

  const addTimer = (timerObject) => {
   setTimersArray(timersArray => [...timersArray, {...timerObject, index: index}])
    setIndex(index => index + 1)
    console.log(timersArray)
    const timerColorChosen = timerObject.timerColorChosen
  }

  const removeTimer = (index) => {
    console.log('removing time from timer with index', index)
    setTimersArray(timersArray => timersArray.filter((timer) => timer.index != index))
  }


  return (
   
<View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Timers Page</Text>

  <TimerInput onAddTimer = {addTimer} />



     <ScrollView style = {styles.scroll}>
      { timersArray.map( (timerObject) => {
         return(


            <FlatTimer 
            key = {timerObject.index}
            s = {timerObject.seconds} 
            m = {timerObject.minutes} 
            h ={timerObject.hours} 
            title = {timerObject.title}
            timerColorChosen = {timerObject.timerColorChosen}
            onRemoveTimer = {() => {removeTimer(timerObject.index)}}
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
    paddingTop: 15,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 25,
  },
  scroll: {
    width: '100%'
  },
});
