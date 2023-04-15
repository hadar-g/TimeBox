import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Button, ScrollView, Pressable, Image, AppState} from 'react-native';
import { useState, useEffect, React, Component, forwardRef, useImperativeHandle, useRef} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stopwatch= (props) => {

const [secs, setSecs] = useState(0);
const [mins, setMins] = useState(0);
const[hours, setHours] = useState(0);
const [isRunning, setIsRunning] = useState(false)
const[timerBackgroundColor, setTimerBackgroundColor] = useState('')
const [opacityVal, setOpacityVal] = useState(0.3)
const leavingTime = useRef(Date.now())
const difference = useRef(0)

useEffect(() => {
    {props.isDarkMode ? setOpacityVal(0.5) : setOpacityVal(0.3)}
    const myAdjustedColor = `rgba${props.timerColorChosen.substr(3, props.timerColorChosen.length-4)}, ${opacityVal})`
    setTimerBackgroundColor(myAdjustedColor)
}, [props.isDarkMode, opacityVal])



useEffect(() => {
    setSecs(secs => secs.toString().padStart(2, '0'))
    setMins(mins => mins.toString().padStart(2, '0'))
    setHours(hours => hours.toString().padStart(2, '0'))
    
  //   const handleAppStateChange = (nextAppState) => {
  //     if(nextAppState == 'background' || nextAppState == 'inactive'){
  //       leavingTime.current = Date.now()
  //       console.log("leaving now with app state ", nextAppState, " and time", leavingTime.current)
  //     }
  //     else if(nextAppState == 'active'){
  //       const arrivingTime = Date.now()
  //       console.log('hello coming back to app state ', nextAppState, " and time ", arrivingTime)
  //       difference.current = Math.floor((arrivingTime - leavingTime.current) / 1000)
        
  //     }
  //     //console.log(nextAppState)
  // }
    
  //  const subscripton = AppState.addEventListener('change', handleAppStateChange);
  
 

        const timer = setTimeout(() => {
            if (isRunning) {
                if (secs != '59') {
                    setSecs(secs => (parseInt(secs) + 1).toString().padStart(2, '0'))
                   // console.log('increment seconds: ', secs)
                   //console.log("the difference was ", difference.current)
                }
                if (secs == '59' && mins !== '59') {
                    setSecs('00')
                    setMins(mins => (parseInt(mins) + 1).toString().padStart(2, '0'))
                   // console.log("increment mins")
                }
                if (secs == '59' && mins == '59' && hours != '59') {
                    setSecs('00')
                    setMins('00')
                    setHours(hours => (parseInt(hours) + 1).toString().padStart(2, '0'))
                   // console.log("increment hours")
                }
                // if (secs == '00' && mins == '00' && hours == '00') {
                //     setTimerDone(true)
                //     setIsRunning(false)
                //     console.log("timer is over")
                // }

                const writeNewData = async () => {
                  let stopwatches = await props.asyncGetData('stopwatchArray')
                  const indexOf = stopwatches.findIndex(stopwatch => stopwatch.index === props.index)
                  stopwatches[indexOf] = {...stopwatches[indexOf], seconds: secs, minutes: mins, hours: hours} 
                  //console.log(timers)
                  await props.asyncSetData(stopwatches, 'stopwatchArray')
                  //const updatedTimers = timers.filter()
              }
              writeNewData()

            }
        }, 1000)
        return () => {
       //   subscripton.remove()
          clearTimeout(timer)}

}, [isRunning, secs])


const resetTimer = () => {
            setIsRunning(false)
            setSecs(0)
            setMins(0)
            setHours(0)
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
        <View style = {{...styles.container, backgroundColor: timerBackgroundColor }  }>
          
            <View style = {styles.texts}>
                <Text style = {props.isDarkMode ? {...styles.title, color: 'white'}: styles.title}>{props.name}</Text>
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
        fontFamily: 'Helvetica Neue',
        // color: 'white'
        width: 300
    },
    clock: {
      paddingTop: 10,
        fontSize: 35,
        fontFamily: 'Helvetica Neue',
        marginLeft: -10,
        // color: 'white'
        
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 110,
        alignItems: 'center',
        marginBottom:0.1,
        padding: 5,
    },

    startStop: {
        height: 60,
        width: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginTop: 5,
        marginLeft: -45
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

export default Stopwatch