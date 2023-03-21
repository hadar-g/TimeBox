
import {  StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import TimerInput from '../components/TimerInput';
import { useState, React} from 'react';


export default function FlatScreen() {

  const[timersArray, setTimersArray] = useState([])
  const[index, setIndex] = useState(0)
  const[isDarkMode, setIsDarkMode] = useState(false)

  const addTimer = (timerObject) => {
   setTimersArray(timersArray => [...timersArray, {...timerObject, index: index}])
    setIndex(index => index + 1)
    console.log(timersArray)
    const timerColorChosen = timerObject.timerColorChosen
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

      <Text style={isDarkMode ? {...styles.welcome, color: 'white'} : styles.welcome}>Welcome to the Timers Page</Text>

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
    zIndex: 1,
    elevation: 1
   // backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  welcome: {
    fontSize: 25,
    padding: 10
    // color: 'white'
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
