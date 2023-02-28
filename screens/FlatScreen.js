
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { useState } from 'react';
import FlatTimer from '../components/FlatTimer';
import TimerInput from '../components/TimerInput';
import RoundScreen from './RoundScreen';
import { NavigationContainer } from '@react-navigation/native';

export default function FlatScreen({navigation}) {

  const[timersArray, setTimersArray] = useState([])
  const[index, setIndex] = useState(0)

  const addTimer = (timerObject) => {
   setTimersArray(timersArray => [...timersArray, {...timerObject, index: index}])
    setIndex(index => index + 1)
    console.log(timersArray)
  }

  return (

<View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Timers Page</Text>
      <TimerInput onAddTimer = {addTimer} />
      <ScrollView>
      { timersArray.map( (timerObject) => {
         return(
          <FlatTimer 
            key = {timerObject.index}
            s = {timerObject.seconds} 
            m = {timerObject.minutes} 
            h ={timerObject.hours} 
            title = {timerObject.title} />
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
    alignItems: 'center'

  },
  welcome: {
    fontSize: 25,
  }
});
