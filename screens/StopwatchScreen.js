
import {  StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import StopwatchInput from '../components/StopwatchInput';
import {useState} from 'react'
import Stopwatch from '../components/Stopwatch';
const allColorTestStopwatches = require('../components/Constants/AllColorStopwatches')



export default function StopwatchScreen(props) {

// const [stopwatchArray, setStopwatchArray] = useState([{
//     key: 123456789,
//     name: 'My First Stopwatch',
//     color: 'rgb(255,0,0)'
// }])
const[stopwatchArray, setStopwatchArray] = useState(allColorTestStopwatches)
const[index, setIndex] = useState(20)
// const[stopwatchArray, setStopwatchArray] = useState(defaultStopwatch)
// const[index, setIndex] = useState(1)

const addStopwatch = (stopwatchObject) => {
    setStopwatchArray(stopwatchArray => [...stopwatchArray, {...stopwatchObject, index: index}])
    setIndex(index => index + 1)
    console.log(stopwatchObject)
}
const removeStopwatch = (index) => {
    setStopwatchArray(stopwatchArray => stopwatchArray.filter((stopwatch) => stopwatch.index != index));
}


  return (

    <View style = {props.isDarkMode ?{...styles.stopwatchScreen, backgroundColor: 'black'} : styles.stopwatchScreen}>

    <Text style={props.isDarkMode ? {...styles.welcome, color: 'white'} : styles.welcome}>My StopWatches</Text>
    <StopwatchInput 
        onAddStopwatch = {addStopwatch}/>
        <ScrollView>

        {stopwatchArray.map(stopwatch => {
            return(
                <Stopwatch 
                    key= {stopwatch.key}
                    timerColorChosen = {stopwatch.color}
                    name = {stopwatch.name}
                    isDarkMode = {props.isDarkMode}
                    onRemoveTimer = {() => removeStopwatch(stopwatch.index)}/>
            )
        })}

        </ScrollView>


    </View>


  );
}

const styles = StyleSheet.create({
    stopwatchScreen: {
        flex: 1,
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 29,
        padding: 10,
        fontWeight: 'bold',
        fontFamily: "Helvetica Neue",
       // marginTop: -20,
        marginBottom: 30
      },
});
