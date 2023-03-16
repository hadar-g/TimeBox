import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Button, ScrollView, Pressable, Image} from 'react-native';
import { useState, useEffect, React, Component, forwardRef, useImperativeHandle, useRef} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FlatTimer = (props) => {

const [secs, setSecs] = useState(props.s);
const [mins, setMins] = useState(props.m);
const[hours, setHours] = useState(props.h);
const [isRunning, setIsRunning] = useState(false)
const[timerDone, setTimerDone] = useState(false)

const originalSeconds = props.s
const orignalMinutes = props.m
const originalHours = props.h



useEffect(() => {
    setSecs(secs => secs.toString().padStart(2, '0'))
    setMins(mins => mins.toString().padStart(2, '0'))
    setHours(hours => hours.toString().padStart(2, '0'))

        const timer = setTimeout(() => {
            if (isRunning) {
                if (secs != '00') {
                    setSecs(secs => (secs - 1).toString().padStart(2, '0'))
                    console.log('increment seconds: ', secs)
                }
                if (secs == '00' && mins !== '00') {
                    setSecs('59')
                    setMins(mins => (mins - 1).toString().padStart(2, '0'))
                    console.log("increment mins")
                }
                if (secs == '00' && mins <= '00' && hours != '00') {
                    setSecs('59')
                    setMins('59')
                    setHours(hours => (hours - 1).toString().padStart(2, '0'))
                    console.log("increment hours")
                }
                if (secs == '00' && mins == '00' && hours == '00') {
                    setTimerDone(true)
                    setIsRunning(false)
                    console.log("timer is over")
                }
            }
        }, 1000)
        return () => clearTimeout(timer)

}, [isRunning, secs])


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
        style = {({pressed}) => [pressed ? {...styles.leftSwipeStyle, opacity: 0.4} : styles.leftSwipeStyle]}
        onPress = {props.onRemoveTimer}>
        <Image 
        style = {{height: 40, width: 35}}
        source = {require('../Images/clipart1120803.png')}/>
      </Pressable>
    )
  }
  const onRenderRightActions = () => {
    return (
      <Pressable 
      style = {({pressed}) => [pressed ? {...styles.rightSwipeStyle, opacity: 0.4} : styles.rightSwipeStyle]}
          onPress = {resetTimer}>
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
            <Pressable 
                style = {({pressed}) => [isRunning ? ((pressed) ? {...styles.startStop, backgroundColor: 'red', opacity: 0.4} : {...styles.startStop, backgroundColor: 'red'} ): ((pressed) ? {...styles.startStop, backgroundColor: 'green', opacity: 0.4} : {...styles.startStop, backgroundColor: 'green'})]}
                onPress = {() => {setIsRunning(!isRunning)}}>
                <Text style = {styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
            </Pressable>
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