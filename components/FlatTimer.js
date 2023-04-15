import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Button, ScrollView, Pressable, Image, Alert, AppState} from 'react-native';
import { useState, useEffect, React, Component, forwardRef, useImperativeHandle, useRef} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
 import { Audio } from 'expo-av';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import * as BackgroundFetch from 'expo-background-fetch';
 import * as TaskManager from 'expo-task-manager';

//import Sound from "react-native-sound";
// import useSound from 'use-sound';
// import alarmFile from '../Sounds/Alarm1.mp3';



const FlatTimer = (props) => {

const originalSeconds = props.s
const orignalMinutes = props.m
const originalHours = props.h
const [secs, setSecs] = useState(props.s);
const [mins, setMins] = useState(props.m);
const[hours, setHours] = useState(props.h);
const [isRunning, setIsRunning] = useState(false)
const[timerDone, setTimerDone] = useState(false)
const[timerBackgroundColor, setTimerBackgroundColor] = useState('')
const [opacityVal, setOpacityVal] = useState(0.3)
//const appState = useRef(AppState.currentState);
const prevDateTime = useRef(Date.now())
const leavingTime = useRef(Date.now())
const timeDiff = useRef(0)


const[soundFile, setSoundFile] = useState('')
const[imageFile, setImageFile] = useState(require('../Images/close.png'))
const [sound, setSound] = useState();
//const sound = useRef()
const soundOff = useRef(false)
const firstTimePlayingSound = useRef(true)

const loadSound = async (soundFile) => {

//console.log(sound)
/***************************************************** */

console.log('first time playing', firstTimePlayingSound.current)
if(firstTimePlayingSound.current == true){
  console.log("loading sound Input")
  const { sound } =  await Audio.Sound.createAsync( soundFile )
  setSound(sound)
  firstTimePlayingSound.current = false
}

  // sound.current = await Audio.Sound.createAsync( soundFile )
   // sound.current = sound
    console.log('loaded sound')
    await sound.playAsync();
    console.log('playing sound input')
    
  sound.setOnPlaybackStatusUpdate((status) => {
   console.log(status.isPlaying)
   if(soundOff.current == true){
    console.log('stopping and pausing during')
    sound.stopAsync()
    sound.setPositionAsync(0)
    //sound.unloadAsync()
    return
}
   if (!status.didJustFinish) return;
      // sound.unloadAsync();
      console.log('stopping and pausing after')
      sound.stopAsync()
      sound.setPositionAsync(0)
        console.log('sound unloaded after okay')
        soundOff.current = false

   
})

/***************************************************** */

    // while(sound.setOnPlaybackStatusUpdate.isP){
    //     console.log("IN WHILE")
    //     console.log(sound.setOnPlaybackStatusUpdate.isPlaying)
    //     if(soundOff.current == true){
    //         sound.stopAsync()
    //         //rsound.unloadAsync()
    //         return
    //     }
    // }
 //   console.log("after while")
//   sound.setOnPlaybackStatusUpdate((status) => {
//    console.log(status)
//    //ßconsole.log(soundOff)
//    if(soundOff.current == true){
//     sound.stopAsync()
//     //rsound.unloadAsync()
//     return
// }
//    if (!status.didJustFinish) return;
//        sound.unloadAsync();
//         console.log('sound unloaded after okay')
   
// })

}
const cancelSound =() => {
    console.log('stoppong one')
    //console.log(sound.current)
//    sound.stopAsync()
//     sound.unloadAsync()
//     console.log('stopping play and unloading')
}

// const playSound = async () => {
//    // await sound.loadAsync();
//     //setSound(sound)
//     await sound.playAsync();
//     // sound.setOnPlaybackStatusUpdate((status) => {
//     //     console.log(status)
//     //     if (!status.didJustFinish) return;
//     //     sound.unloadAsync();
//     //     console.log('sound unloaded after okay')
//     // });
//     // sound.setOnPlaybackStatusUpdate(status => {
//     //     console.log(status)
//     //   });
//     // console.log('play sound end')
// }

// const loadSound = async () => {
//     console.log("loading sound Timer")
//     const { sound } =  await Audio.Sound.createAsync( require('../Sounds/Alarm.mp3'))
//     setSound(sound)
//     //console.log(sound)
//   //r  console.log(sound)
// }

// const stopPlaying = async() => {
//     await sound.stopAsync()
//     await sound.unloadAsync()
//     console.log('sound unloaded after stop')
// }




useEffect(() => {
    {props.isDarkMode ? setOpacityVal(0.5) : setOpacityVal(0.3)}
    const myAdjustedColor = `rgba${props.timerColorChosen.substr(3, props.timerColorChosen.length-4)}, ${opacityVal})`
    setTimerBackgroundColor(myAdjustedColor)
}, [props.isDarkMode, opacityVal])


 useEffect(() => {

  // const initialLoadSound = async (soundFile) => {
  //   console.log('loading sound')
  //   console.log(soundFile)
  //   try{
  //     const { sound } =  await Audio.Sound.createAsync( soundFile )
  //   } catch (error){
  //     console.log('ERROR LOADING SOUND', error)
  //   }
  
  //   console.log("sound is", sound )
  //  // sound.current = soundAsync
  //   //setSound(soundAsync)
  // }

    switch (props.soundChosen) {
        case 0:
            setImageFile(require('../Images/close.png'))
          break;
        case 1 :
            setSoundFile(require('../Sounds/Alarm.mp3'))
            setImageFile(require('../Images/sound.png'))
           // initialLoadSound(require('../Sounds/Alarm.mp3'))
          break;
        case 2: 
            setSoundFile(require('../Sounds/mechanical-clock.mp3'))
            setImageFile(require('../Images/clock.png'))
          break;
        case 3:
            setSoundFile(require('../Sounds/rock_alarm.mp3'))
            setImageFile(require('../Images/electric-guitar.png'))
          break;
        default:
            setImageFile(require('../Images/close.png'))
          break;
      }
 }, [])

useEffect(() => {
  
    setSecs(secs => secs.toString().padStart(2, '0'))
    setMins(mins => mins.toString().padStart(2, '0'))
    setHours(hours => hours.toString().padStart(2, '0'))

    

        const timer = setTimeout( () => {
           // console.log("my current app state is ", appState.current)

            if (isRunning) {
                if (secs != '00') {
                    setSecs(secs => (secs - 1).toString().padStart(2, '0'))
                   // console.log('increment seconds: ', secs)
                }
                if (secs == '00' && mins !== '00') {
                    setSecs('59')
                    setMins(mins => (mins - 1).toString().padStart(2, '0'))
                 //   console.log("increment mins")
                }
                if (secs == '00' && mins <= '00' && hours != '00') {
                    setSecs('59')
                    setMins('59')
                    setHours(hours => (hours - 1).toString().padStart(2, '0'))
                  //  console.log("increment hours")
                }
                if (secs == '00' && mins == '00' && hours == '00') {
                    loadSound(soundFile)
                    setTimerDone(true)
                    setIsRunning(false)
                    Alert.alert(`${props.title} is Over`, "this timer has elapsed you can remove or reset it", [
                        {text: "Remove",
                        onPress: () => {
                           // setSoundOff(true)
                          // cancelSound()
                           soundOff.current = true
                            props.onRemoveTimer()
                        }},
                        {text: "Reset",
                        onPress: () => {
                            //sound.stopAsync()
                            
                            soundOff.current = true
                          // setSoundOff(true)
                            resetTimer()
                            cancelSound()
                        }}  
                    ])
                }
            }
            const writeNewData = async () => {
                let timers = await props.asyncGetData('timersArray')
                const indexOf = timers.findIndex(timer => timer.index === props.index)
                timers[indexOf] = {...timers[indexOf], seconds: secs, minutes: mins, hours: hours} 
                //console.log(timers)
                await props.asyncSetData(timers, 'timersArray')
                //const updatedTimers = timers.filter()
            }
            writeNewData()

           


        
        }, 1000)
        return () => clearTimeout(timer)

}, [isRunning, secs])

// const performBackgroundTask = async () => {
//     // Increment the count every second
//     setInterval(() => {
//         console.log('counting noowwww')
//     }, 1000);
//   };

useEffect(() => {

    const handleAppStateChange = (nextAppState) => {
        //console.log(nextAppState)
       // let leavingTime = 0
        if((nextAppState === 'inactive' || nextAppState === 'background')){
            // console.log("bye")
            // console.log('leaving when seconds are at ', secs)
             leavingTime.current = Date.now()
        }
        if (nextAppState === 'active' ){
           // console.log('hello')
            const arrivingTime = Date.now()
             timeDiff.current = Math.floor((arrivingTime - leavingTime.current) / 1000)
           // console.log(`leaving time ${leavingTime.current} and arriving time ${arrivingTime} \n with a difference of ${timeDiff.current}`)

            const newMins = Math.floor(timeDiff.current / 60 )
            const newSecs = timeDiff.current % 60

         //   console.log(`seconds are now at ${secs} and i want to reduce them by ${newSecs} and is running is ${isRunning}`)

            
            // setSecs(secs - newSecs)
            // setMins(mins - newMins)
           // console.log(timeDiff)
        }
        // if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        //     prevDateTime.current = (Date.now());
        //     console.log('going into the background now with date time ', prevDateTime.current )
        // } else if (nextAppState === 'active') {
        //   const elapsed = Math.floor((Date.now() - prevDateTime.current) / 1000);
        //   console.log("coming to the foreground now and subtracting now ", Date.now(), " with then ", prevDateTime.current)
        //   console.log(elapsed, " seconds have elapsed")
        // }
        //appState.current = (nextAppState);
      };
  
      const subscripton = AppState.addEventListener('change', handleAppStateChange);
      //console.log("my subscription is ", subscripton)
  
      return () => {
        //AppState.removeEventListener('change', handleAppStateChange);
        subscripton.remove()
      };
}, [])


const resetTimer = async () => {

            setTimerDone(false)
            setIsRunning(false)
            // setSecs(originalSeconds)
            // setMins(orignalMinutes)
            // setHours(originalHours)

            let timers = await props.asyncGetData('timersArray')
            const indexOf = timers.findIndex(timer => timer.index === props.index)
            timers[indexOf] = {...timers[indexOf], seconds: timers[indexOf].ogsec , minutes: timers[indexOf].ogmin, hours: timers[indexOf].oghr} 
            setSecs(timers[indexOf].ogsec)
            setMins(timers[indexOf].ogmin)
            setHours(timers[indexOf].oghr)
            //console.log(timers)
            await props.asyncSetData(timers, 'timersArray')

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
        <View style = {!timerDone ?{...styles.container, backgroundColor: timerBackgroundColor} : {...styles.container, backgroundColor: 'red'} }>
          
            <View style = {styles.texts}>
                <Text style = {props.isDarkMode ? {...styles.title, color: 'white'}: styles.title}>{props.title}</Text>
                <Text style = {props.isDarkMode ? {...styles.clock, color: 'white'}:styles.clock}> {hours} : {mins} : {secs} </Text>
            </View>
            <Image style={styles.imageIcon} source = {imageFile} />
            {/* <Text>{props.soundChosen}</Text> */}
            
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
        width: 300
        // color: 'white'
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
    //    borderTopWidth: 5,
    //    borderBottomWidth: 5,
        padding: 5,
     //   backgroundColor: 'white',
        marginBottom:0.1,
    },

    startStop: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginTop: 5,
       //  marginLeft: -45
       
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
        width: '65%',
       // backgroundColor: 'red',
      padding: 10,
      marginLeft: 10,
      },
      imageIcon: {
        height: 30,
        width: 30,
       // backgroundColor: 'red',
        marginLeft: -10,
        marginRight: 20
      }
    
});

export default FlatTimer