import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { useState, useEffect, React, Component} from 'react';

const FlatTimer = (props) => {

const [secs, setSecs] = useState(props.s);
const [mins, setMins] = useState(props.m);
const[hours, setHours] = useState(props.h);
const[totalSeconds, setTotalSeconds] = useState(0)
const [isRunning, setIsRunning] = useState(false)
const[timerDone, setTimerDone] = useState(false)

// useEffect(()=> {
//     setTotalSeconds( ( Math.floor((parseInt(hours)*3600) + (parseInt(mins)*60) + parseInt(secs) )))
// }, [])

useEffect(() => {

    setSecs(secs => secs.toString().padStart(2, '0'))
    setMins(mins => mins.toString().padStart(2, '0'))
    setHours(hours => hours.toString().padStart(2, '0'))
    
    const interval = setInterval(() => {
        if(isRunning){

            if(secs != '00'){
                setSecs(secs => (secs - 1).toString().padStart(2, '0'))
            }
            if(secs == '00' && mins != '00'){
                setSecs('59')
                setMins(mins => (mins - 1).toString().padStart(2, '0'))
            }
            if(secs == '00' && mins == '00' && hours != '00'){
                setSecs('59')
                setMins('59')
                setHours(hours => (hours - 1).toString().padStart(2, '0'))
            }
            if(secs == '00' && mins == '00' && hours == '00'){
                setTimerDone(true)
                setIsRunning(false)
                console.log("timer is over")
            }

        }

        clearInterval(interval)
    }, 1000)
}, [totalSeconds, isRunning, secs])

    return(
        <View style = {!timerDone ?styles.container : {...styles.container, backgroundColor: 'red'} }>
            <Text style = {styles.title}>{props.title}</Text>
            <Text style = {styles.clock}> {hours} : {mins} : {secs} </Text>
            <View style = {styles.buttons}>
                <Button title ='start' onPress={() => setIsRunning(true)}/>
                <Button title = 'stop' onPress={() => setIsRunning(false)}/>
            </View>
            <Button title = "Remove" /* TODO add code to remove timer */ />
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontFamily: 'Georgia'
    },
    clock: {
      paddingTop: 10,
        fontSize: 45,
        fontFamily: 'Helvetica'
        
    },
    container: {
        flexDirection: 'column',
        width: '95%',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 5,
        borderRadius: 25,
        padding: 2,
        margin: 10,
        marginRight: 5,
    },
    buttons: {
        flexDirection: 'row'
        
    }
});

export default FlatTimer