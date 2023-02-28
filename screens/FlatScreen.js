
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
<ScrollView>
<View style={styles.container}>
    <TimerInput />
      <TimerInput onAddTimer = {addTimer} />

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

    </View>
</ScrollView>

   
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
