
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Modal, Pressable, Alert} from 'react-native';
import { useState, React, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const colorValues = require('./Constants/ColorVals.json')

const StopwatchInput = (props) => {
    const[modalVisible, setModalVisible] = useState(false)
    const[stopwatchNameInput, setStopwatchNameInput] = useState('')
    const[baseColor, setBaseColor] = useState('red')
    const[colorChosen, setColorChosen] = useState()
    const[hueArray, setHueArray] = useState([colorValues.RedOne ,colorValues.RedTwo , colorValues.RedThree, colorValues.RedFour])

    const addTimerPlusSymbolWidth = 5
    const addTimerPlusSymbolHeight = 40
    const addTimerPlusMarginLeftOffset = -1 * ((addTimerPlusSymbolHeight / 2) - (addTimerPlusSymbolWidth / 2))
    const addTimerPlusMarginTopOffset = -1 * ((addTimerPlusSymbolHeight / 2) + (addTimerPlusSymbolWidth / 2))

    useEffect(() => {
        
        switch (baseColor) {
            case 'red':
                setHueArray([colorValues.RedOne ,colorValues.RedTwo , colorValues.RedThree, colorValues.RedFour]);
                setColorChosen(colorValues.RedOne);
              break;
            case 'green':
                setHueArray([colorValues.GreenOne, colorValues.GreenTwo, colorValues.GreenThree, colorValues.GreenFour]);
                setColorChosen(colorValues.GreenOne);
              break;
            case 'blue':
                setHueArray([colorValues.BlueOne, colorValues.BlueTwo, colorValues.BlueThree, colorValues.BlueFour]);
                setColorChosen(colorValues.BlueOne)
              break;
            case 'gray':
                setHueArray([colorValues.GrayOne, colorValues.GrayTwo, colorValues.GrayThree, colorValues.GrayFour]);
                setColorChosen(colorValues.GrayOne)
              break;
            case 'orange':
                setHueArray([colorValues.OrangeOne, colorValues.OrangeTwo, colorValues.OrangeThree, colorValues.OrangeFour]);
                setColorChosen(colorValues.OrangeOne)
              break;
            default:
                setHueArray([colorValues.RedOne ,colorValues.RedTwo , colorValues.RedThree, colorValues.RedFour]);
                setColorChosen(colorValues.RedOne)
              break;
          }
        
    }, [baseColor])

    const setStopwatch = () => {
       

        if(stopwatchNameInput === ''){
            Alert.alert("Your Stopwatch Needs a Name")
        }else{
            props.onAddStopwatch({
                key: uuidv4(),
                name: stopwatchNameInput,
                color: colorChosen
            })

            setStopwatchNameInput('')
            setModalVisible(false)
            setBaseColor('red')
            setColorChosen()
        }


    }

    return(
        <View style = {styles.container}>


        <View style = {styles.addStopwatchButton}>
            <Pressable
                style = {({pressed}) => [((pressed) ? { opacity: 0.4} : {} )]}
                onPress={() => setModalVisible(true)}>
                <View style = {{width: addTimerPlusSymbolWidth, height: addTimerPlusSymbolHeight, backgroundColor: 'rgb(255,149,0)'}}></View>
                <View style = {{width: addTimerPlusSymbolHeight, height: addTimerPlusSymbolWidth, marginTop: addTimerPlusMarginTopOffset, marginLeft: addTimerPlusMarginLeftOffset, backgroundColor: 'rgb(255,149,0)'}}></View>
            </Pressable>
        </View>

        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent = {true}>

           <View style = {styles.modal}>

           <TextInput 
            style = {styles.stopwatchNameInputContainer}
            placeholder = "Stopwatch Name"
            value ={stopwatchNameInput}
            onChangeText={setStopwatchNameInput}
            maxLength={16}
            />

        <View style = {styles.colorPicker}>
            <Pressable 
                style = {(baseColor == 'red') ? {...styles.colorPickBox, backgroundColor: 'red', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'red'} }
                onPress={()=>{setBaseColor('red')}} />
            <Pressable 
                style = {(baseColor == 'green') ? {...styles.colorPickBox, backgroundColor: 'green', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'green'}}
                onPress={()=>{setBaseColor('green')}} />
            <Pressable 
                style = {(baseColor == 'blue') ? {...styles.colorPickBox, backgroundColor: 'blue', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'blue'}}
                onPress={()=>{setBaseColor('blue')}} />
            <Pressable 
                style = {(baseColor == 'gray') ? {...styles.colorPickBox, backgroundColor: 'gray', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'gray'}} 
                onPress={()=>{setBaseColor('gray')}}/>
            <Pressable 
                style = {(baseColor == 'orange') ? {...styles.colorPickBox, backgroundColor: 'orange', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'orange'}} 
                onPress={()=>{setBaseColor('orange')}}/>
        </View>
        <View style = {styles.secondaryHuePicker}>
                <Pressable
                    style = {(colorChosen === hueArray[0]) ? {...styles.huePickerBox, backgroundColor: hueArray[0], borderWidth: 5, height: 50, width: 50} : {...styles.huePickerBox, backgroundColor: hueArray[0]}}
                    onPress = {() => {setColorChosen(hueArray[0])}}
                    />
                <Pressable
                    style = {(colorChosen === hueArray[1]) ? {...styles.huePickerBox, backgroundColor: hueArray[1], borderWidth: 5, height: 50, width: 50} : {...styles.huePickerBox, backgroundColor: hueArray[1]}}
                    onPress = {() => {setColorChosen(hueArray[1])}}
                    />
                <Pressable
                    style = {(colorChosen === hueArray[2]) ? {...styles.huePickerBox, backgroundColor: hueArray[2], borderWidth: 5, height: 50, width: 50} : {...styles.huePickerBox, backgroundColor: hueArray[2]}}
                    onPress = {() => {setColorChosen(hueArray[2])}}
                    />
                <Pressable
                    style = {(colorChosen === hueArray[3]) ? {...styles.huePickerBox, backgroundColor: hueArray[3], borderWidth: 5, height: 50, width: 50} : {...styles.huePickerBox, backgroundColor: hueArray[3]}}
                    onPress = {() => {setColorChosen(hueArray[3])}}
                    />

            </View>

            <Button title = "set stopwatch"
                onPress={setStopwatch}/>

            <Button title ="close"
                onPress={() => {setModalVisible(false)}} />
           </View>
        </Modal>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      //  backgroundColor: 'red',
        height: '10%',
    },
    addStopwatchButton: {
       // backgroundColor: 'red',
         width: 200,
         alignItems: 'flex-end',
         paddingBottom: 30,
         marginBottom: 25,
 
     },
     modal: {
        borderWidth: 2,
        borderRadius: 20,
        margin: '3%',
        marginTop: '30%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 350,
    },
    stopwatchNameInputContainer:{
        width: '60%',
        height: '15%',
      //  marginTop: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
    },
    colorPicker: {
        // backgroundColor: 'red',
        marginTop: 30,
         flexDirection: 'row',
         alignItems: 'center'
     },
     colorPickBox: {
         width: 30,
         height: 30,
         marginLeft: 15,
         marginRight: 15,
        // marginTop: -20
         
     },
     huePickerBox:{
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 50
    },
    secondaryHuePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 15
    }


})

export default StopwatchInput