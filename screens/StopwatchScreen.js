
import {  StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import StopwatchInput from '../components/StopwatchInput';
import {useState} from 'react'
import Stopwatch from '../components/Stopwatch';



export default function StopwatchScreen(props) {

const [stopwatchArray, setStopwatchArray] = useState([{
    key: 123456789,
    name: 'My First Stopwatch',
    color: 'rgb(255,0,0)'
}])
const addStopwatch = (stopwatchObject) => {
    setStopwatchArray(stopwatchArray => [...stopwatchArray, stopwatchObject])
    console.log(stopwatchObject)
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
                    timerColorChosen = {stopwatch.color}
                    name = {stopwatch.name}
                    isDarkMode = {props.isDarkMode}/>
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
