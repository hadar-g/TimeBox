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

            if(secs % 60 == 0){
                setSecs(59)
                setMins(mins => mins - 1)
                if(mins %60 == 0){
                    setHours(hours => hours - 1)
                    setMins(59)
                }
            }
        }
        clearInterval(interval)
    }, 1000)
}, [secs, isRunning])

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