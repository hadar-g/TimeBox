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
const[timerBackgroundColor, setTimerBackgroundColor] = useState('')


const originalSeconds = props.s
const orignalMinutes = props.m
const originalHours = props.h

useEffect(() => {
    switch (props.timerColorChosen) {
    case 'red':
        setTimerBackgroundColor('rgba(255, 0, 0, 0.2)');
      break;
    case 'green':
        setTimerBackgroundColor('rgba(0,255,0, 0.2)');
      break;
    case 'blue':
        setTimerBackgroundColor('rgba(0,0,255, 0.2)');
      break;
    case 'orange':
        setTimerBackgroundColor('rgba(255, 165, 0, 0.2)');
      break;
    case 'gray':
        setTimerBackgroundColor('rgba(100,100,100, 0.2)');
      break;
    default:
      setBackgroundColor('');
      break;
  }
}, [])




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
        <View style = {props.isDarkMode ?   {backgroundColor: 'black'} :{backgroundColor: 'white'}}> 
        <View style = {!timerDone ?{...styles.container, borderColor: props.timerColorChosen, backgroundColor: timerBackgroundColor} : {...styles.container, backgroundColor: 'red'} }>
          
            <View style = {styles.texts}>
                <Text style = {props.isDarkMode ? {...styles.title, color: 'white'}: styles.title}>{props.title}</Text>
                <Text style = {props.isDarkMode ? {...styles.clock, color: 'white'}:styles.clock}> {hours} : {mins} : {secs} </Text>
            </View>
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
        fontSize: 30,
        fontFamily: 'Georgia',
        // color: 'white'
    },
    clock: {
      paddingTop: 10,
        fontSize: 40,
        fontFamily: 'Helvetica',
        marginLeft: -10,
        // color: 'white'
        
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 110,
        alignItems: 'center',
    //    borderTopWidth: 5,
    //    borderBottomWidth: 5,
        padding: 5,
        backgroundColor: 'white',
        marginBottom:0.1,
    },

    startStop: {
        height: 60,
        width: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginLeft: '2%',
        marginTop: 5
    }, 
    buttonText: {
        fontSize: 19,
        fontFamily: 'Georgia',
        color: 'white'
    },
    leftSwipeStyle: {
        backgroundColor: 'red',
        justifyContent: 'center',
        width: '30%',
        height: '100%',
        alignItems: 'center',
      },
      rightSwipeStyle: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        width: '30%',
        height: '100%',
        alignItems: 'center',
    
      },
      texts: {
      //  backgroundColor: 'red'
      padding: 10,
      margin: 10,
      },
    
});

export default FlatTimer