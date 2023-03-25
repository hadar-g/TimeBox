
import {  StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import FlatTimer from '../components/FlatTimer';
import StopwatchInput from '../components/StopwatchInput';



export default function StopwatchScreen(props) {

const addStopwatch = (stopwatchObject) => {
    console.log(stopwatchObject)
}


  return (

    <View style = {props.isDarkMode ?{...styles.stopwatchScreen, backgroundColor: 'black'} : styles.stopwatchScreen}>

    <Text style={props.isDarkMode ? {...styles.welcome, color: 'white'} : styles.welcome}>My StopWatches</Text>
    <StopwatchInput 
        onAddStopwatch = {addStopwatch}/>

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
