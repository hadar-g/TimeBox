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
    setTotalSeconds( ( Math.floor((parseInt(hours)*3600) + (parseInt(mins)*60) + parseInt(secs) )))
}, [])

useEffect(() => {

    setSecs(secs => secs.toString().padStart(2, '0'))
    setMins(mins => mins.toString().padStart(2, '0'))
    setHours(hours => hours.toString().padStart(2, '0'))
    
    const interval = setInterval(() => {

        if(isRunning){

            
            setTotalSeconds(totalSeconds => totalSeconds - 1);
            console.log(totalSeconds)
            console.log(hours)
            console.log(mins)
            console.log(secs)

            setHours( Math.floor(totalSeconds / 3600) );
            setMins( Math.floor( (totalSeconds % 3600) / 60) );
            setSecs( Math.floor( (totalSeconds % 3600) % 60) );

            setSecs(secs => secs.toString().padStart(2, '0'))
            setMins(mins => mins.toString().padStart(2, '0'))
            setHours(hours => hours.toString().padStart(2, '0'))

        }

        clearInterval(interval)
    }, 1000)
}, [totalSeconds, isRunning])

    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>{props.title}</Text>
            <Text style = {styles.clock}> {hours} : {mins} : {secs} </Text>
            <Button title ='start' onPress={() => setIsRunning(true)}/>
            <Button title = 'stop' onPress={() => setIsRunning(false)}/>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
       // backgroundColor: 'red',
        flex: 1,
        fontSize: 18,

    },
    clock: {
       // backgroundColor: 'green',
        flex: 1,
        fontSize: 18
    },
    container: {
        flexDirection: 'row',
        width: '95%',
        //justifyContent: 'center',
        justifyContent: 'left',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
       // backgroundColor: 'green',
        padding: 2,
        margin: 10,
        marginRight: 5
    },
});

export default FlatTimer