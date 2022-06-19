import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useState, useEffect, React, Component} from 'react';

const FlatTimer = (props) => {

const [secs, setSecs] = useState(props.s);
const [mins, setMins] = useState(props.m);
const[hours, setHours] = useState(props.h);
const[totalSeconds, setTotalSeconds] = useState(0)
const [isRunning, setIsRunning] = useState(false)

useEffect(()=> {
    setTotalSeconds(totalSeconds => (hours*3600) + (mins*60) + (secs))
    console.log(hours)
    console.log(mins)
    console.log(secs)
    console.log(totalSeconds)
}, [])

useEffect(() => {

    setSecs(secs => ('0' + secs).slice(-2))
    setMins(mins => ('0' + mins).slice(-2))
    setHours(hours => ('0' + hours).slice(-2))
    
    const interval = setInterval(() => {

        if(isRunning){

            
            setTotalSeconds(totalSeconds => totalSeconds - 1);
            console.log(totalSeconds)

            setHours(('0' + (Math.floor(totalSeconds / 3600))).toString().slice(-2))

            setMins(('0' + (Math.floor(totalSeconds % 3600 / 60))).toString().slice(-2) )

            setSecs(('0' + (Math.floor(totalSeconds %3600 % 60))).toString().slice(-2) )


          //  setSecs(secs => totalSeconds % 60)
        //     setSecs(secs => ('0' + (secs - 1)).slice(-2));
        //     if(secs %60 == 0 && mins != 0 && hours != 0){
        //         setMins(mins => ('0' + (mins - 1)).slice(-2))
        //         setSecs(59)
        //         clearInterval(interval)
        //     };
           
        //     if(mins == 0 && hours != 0 && secs == 0){
        //         setHours(hours => ('0' + (hours - 1)).slice(-2))
        //         setMins(59)
        //         clearInterval(interval)
        //     };

        //     if(secs == 0 && mins == 0 && hours == 0){
        //         console.log("timer done")
        //     }
        // }
        }

        clearInterval(interval)
    }, 1000)
}, [totalSeconds, isRunning])

    return(
        <View style = {styles.container}>
            <Text>{props.title} {hours} : {mins} : {secs} </Text>
            <Button title ='start' onPress={() => setIsRunning(true)}/>
            <Button title = 'stop' onPress={() => setIsRunning(false)}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        //justifyContent: 'center',
        justifyContent: 'left',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
       // backgroundColor: 'green',
       padding: 2,
        margin: 10
    },
});

export default FlatTimer