import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useState, useEffect, React, Component} from 'react';

const FlatTimer = (props) => {

const [secs, setSecs] = useState(props.s);
const [mins, setMins] = useState(props.m);
const[hours, setHours] = useState(props.h);
const [isRunning, setIsRunning] = useState(false)

useEffect(() => {

    const interval = setInterval(() => {
        if(isRunning){
            setSecs(secs => secs - 1)
            clearInterval(interval)
        }
    }, 1000)
}, [secs, isRunning])

    return(
        <View style = {styles.container}>
            <Text>{hours} : {mins} : {secs}  {props.title}</Text>
            <Button title ='start' onPress={() => setIsRunning(true)}/>
            <Button title = 'stop' onPress={() => setIsRunning(false)}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
       // backgroundColor: 'green',
        margin: 5
    },
});

export default FlatTimer