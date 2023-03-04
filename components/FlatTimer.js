import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image} from 'react-native';
import { useState, useEffect, React, Component, forwardRef, useImperativeHandle, useRef} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FlatTimer = (props) => {

const [secs, setSecs] = useState(props.s);
const [mins, setMins] = useState(props.m);
const[hours, setHours] = useState(props.h);
const[totalSeconds, setTotalSeconds] = useState(0)
const [isRunning, setIsRunning] = useState(false)
const[timerDone, setTimerDone] = useState(false)


const originalSeconds = props.s
const orignalMinutes = props.m
const originalHours = props.h
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
}, [totalSeconds, isRunning, secs]);

const resetTimer = () => {

            setTimerDone(false)
            setIsRunning(false)
            setSecs(originalSeconds)
            setMins(orignalMinutes)
            setHours(originalHours)
}

const onRenderLeftAction = () => {
    return(
      <Pressable 
        style = {styles.leftSwipeStyle}
        onPress = {props.onRemoveTimer}>
        {/* <Text style = {{fontSize: 30, color: 'white'}}></Text> */}
        <Image 
        style = {{height: 40, width: 35}}
        source = {require('../Images/clipart1120803.png')}/>
      </Pressable>
    )
  }
  const onRenderRightActions = () => {
    return (
      <Pressable 
          style = {styles.rightSwipeStyle}
          onPress = {resetTimer}>
        {/* <Text style = {{fontSize: 30, color: 'white'}}>Reset</Text> */}
        <Image 
        style = {{height: 50, width: 50}}
        source = {require('../Images/clipart1258763.png')}/>
      </Pressable>
    )
  }

    return(
        <GestureHandlerRootView>
        <Swipeable  
          renderLeftActions = {onRenderLeftAction}
          renderRightActions = {onRenderRightActions} >
        <View style = {!timerDone ?{...styles.container, borderColor: props.timerColorChosen} : {...styles.container, backgroundColor: 'red'} }>
            <Text style = {styles.title}>{props.title}</Text>
            <Text style = {styles.clock}> {hours} : {mins} : {secs} </Text>
            <View style = {styles.buttons}>
            </View>
            <View style = {styles.buttons}>
            {/* <Pressable 
                 style = {({pressed}) => [pressed ? {...styles.removeButton, opacity: 0.4} : styles.removeButton]}
                onPress = {props.onRemoveTimer}>
                <Text style = {styles.buttonText}>Remove</Text>
            </Pressable> */}
            <Pressable 
                style = {({pressed}) => [isRunning ? ((pressed) ? {...styles.startStop, backgroundColor: 'red', opacity: 0.4} : {...styles.startStop, backgroundColor: 'red'} ): ((pressed) ? {...styles.startStop, backgroundColor: 'green', opacity: 0.4} : {...styles.startStop, backgroundColor: 'green'})]}
                onPress = {() => {setIsRunning(!isRunning)}}>
                <Text style = {styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
            </Pressable>
            {/* <Pressable 
                style = {({pressed}) => [pressed ? {...styles.resetButton, opacity: 0.4} : styles.resetButton]}
                // style = {styles.resetButton}
                onPress = {() => {
                    setTimerDone(false)
                    setIsRunning(false)
                    setSecs(originalSeconds)
                    setMins(orignalMinutes)
                    setHours(originalHours)
                }}>
                <Text style = {styles.buttonText}>Reset</Text>
            </Pressable> */}
            </View>
        </View>
             </Swipeable> 
             </GestureHandlerRootView>
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
       // borderColor: {timerBorderColor},
        borderWidth: 5,
        borderRadius: 25,
        padding: 2,
        margin: 10,
        //marginRight: 0,
        backgroundColor: 'white'
    },
    buttons: {
        flexDirection: 'row'
        
    },
    startStop: {
        backgroundColor: 'red',
        height: 75,
        width: 75,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginLeft: '5%'
    }, 
    buttonText: {
        fontSize: 20,
        fontFamily: 'Georgia',
        color: 'white'
    },
    removeButton: {
        backgroundColor: 'red',
        height: 75,
        width: 75,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginRight: '5%',
        marginLeft: '5%'
    },
    resetButton: {
        backgroundColor: 'blue',
        height: 75,
        width: 75,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginRight: '5%',
        marginLeft: '10%'
    },
    buttons: {
        flexDirection: 'row',
        padding: 5

    },
    leftSwipeStyle: {
        backgroundColor: 'red',
        justifyContent: 'center',
        width: '30%',
        height: '90%',
        marginTop: '3.5%',
        alignItems: 'center'
      },
      rightSwipeStyle: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        width: '30%',
        height: '90%',
        marginTop: '3.5%',
        alignItems: 'center'
    
      }
    
});

export default FlatTimer