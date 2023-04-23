
import {  StyleSheet, Text, View, ScrollView, Pressable, Image, Modal, Button} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import StopwatchInput from '../components/StopwatchInput';
import {useState, useEffect} from 'react'
import Stopwatch from '../components/Stopwatch';
import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';
const allColorTestStopwatches = require('../components/Constants/AllColorStopwatches')
const defaultStopwatch = require('../components/Constants/DefaultStopwatch')



export default function StopwatchScreen(props) {


// const [stopwatchArray, setStopwatchArray] = useState([{
//     key: 123456789,
//     name: 'My First Stopwatch',
//     color: 'rgb(255,0,0)'
// }])
//const[stopwatchArray, setStopwatchArray] = useState(allColorTestStopwatches)
const[stopwatchArray, setStopwatchArray] = useState(defaultStopwatch)
const[index, setIndex] = useState(1)
// const[stopwatchArray, setStopwatchArray] = useState(defaultStopwatch)
// const[index, setIndex] = useState(1)



useEffect(() => {
    

  const fetchData = async() => {
    //console.log('info from props is',await props.asyncGetData('timersArray'))
    //setTimersArray(await props.asyncGetData('timersArray'))
    //console.log()
    setStopwatchArray(await props.asyncGetData('stopwatchArray'))
    console.log(stopwatchArray)
  }
  fetchData()

 // setReset(false)
  
}, []);
const addStopwatch = (stopwatchObject) => {
    setStopwatchArray(stopwatchArray => [...stopwatchArray, {...stopwatchObject, index: index}])
    setIndex(index => index + 1)
    props.asyncSetData([...stopwatchArray, {...stopwatchObject, index: index}], 'stopwatchArray')
    console.log(stopwatchObject)
}
const removeStopwatch = (index) => {
    setStopwatchArray(stopwatchArray => stopwatchArray.filter((stopwatch) => stopwatch.index != index));
    props.asyncSetData(stopwatchArray.filter((stopwatch) => stopwatch.index != index), 'stopwatchArray')
}


      return (    <View style = {props.isDarkMode ?{...styles.stopwatchScreen, backgroundColor: 'black'} : styles.stopwatchScreen}>

      <Text style={props.isDarkMode ? {...styles.welcome, color: 'white'} : styles.welcome}>My StopWatches</Text>
      <Modal
         visible={props.isVisibleNow}
         animationType="slide"
         transparent = {true}>
        <View style = {styles.timersModal}>
          <Text style = {{fontSize: 40}}>Countdown Timers Coming Soon...</Text>
          <Button title="Close" onPress={props.toggle}/>

        </View>

      </Modal>
      <StopwatchInput 
          onAddStopwatch = {addStopwatch}/>
          <ScrollView style = {styles.scroll}>
  
          {stopwatchArray.map(stopwatch => {
              return(
                  <Stopwatch 
                      key= {stopwatch.key}
                      timerColorChosen = {stopwatch.color}
                      name = {stopwatch.name}
                      isDarkMode = {props.isDarkMode}
                      onRemoveTimer = {() => removeStopwatch(stopwatch.index)}
                      asyncSetData = {props.asyncSetData}
                      asyncGetData = {props.asyncGetData}
                      index = {stopwatch.index}
                      isRunning = {stopwatch.isRunning}/>
              )
          })}
  
          </ScrollView>
  
  
      </View>)

}

const styles = StyleSheet.create({
    stopwatchScreen: {
        flexDirection: 'column',
        justifyContent: 'top',
        paddingTop: 20,
      //  alignItems: 'flex-start',
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
       // marginBottom: 280,
        height: '60%',
      // marginTop: -6,
      // backgroundColor: 'red'
      },
      timersModal: {
        marginTop:100,
        height: '90%', 
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
        borderColor: 'black',
        borderWidth: 2
      }
});
