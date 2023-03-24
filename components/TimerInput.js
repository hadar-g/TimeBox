
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Modal, Pressable, Alert} from 'react-native';
import { useState, React, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const colorValues = require('./Constants/ColorVals.json')

const TimerInput = (props) => {
    
    const[secondsInput, setSecondsInput] = useState('0')
    const[minsInput, setMinsInput] = useState('0');
    const[hoursInput, setHoursInput] = useState('0');
    const[timerNameInput, setTimerNameInput] = useState('')
    const[modalVisible, setModalVisible] = useState(false)
    const[colorChosen, setColorChosen] = useState()
    const[baseColor, setBaseColor] = useState('red')
    const[hueArray, setHueArray] = useState([colorValues.RedOne ,colorValues.RedTwo , colorValues.RedThree, colorValues.RedFour])

    const addTimerPlusSymbolWidth = 5
    const addTimerPlusSymbolHeight = 40
    const addTimerPlusMarginLeftOffset = -1 * ((addTimerPlusSymbolHeight / 2) - (addTimerPlusSymbolWidth / 2))
    const addTimerPlusMarginTopOffset = -1 * ((addTimerPlusSymbolHeight / 2) + (addTimerPlusSymbolWidth / 2))

    const createPickerArray = (max) => {
        const pickerArray =[]
        for(let i = 0; i <= max; i++){
           pickerArray.push( <Picker.Item label = {`${i}`} value = {`${i}`}/> )
        }
        return pickerArray
    }
    
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

    const onTimerSubmit = () => {0
        


        if(timerNameInput === ''){
            Alert.alert("Your Timer Needs a Name")
        }else if (secondsInput == 0 && minsInput == 0 && hoursInput == 0){
            Alert.alert("Your Timer Needs a Duration")
        }else{

            setModalVisible(false)

            props.onAddTimer({
                key: uuidv4(),
                title: timerNameInput,
                seconds: secondsInput, 
                minutes: minsInput, 
                hours: hoursInput,
                timerColorChosen: colorChosen})
    
            setSecondsInput('0');
            setMinsInput('0');
            setHoursInput('0');
            setTimerNameInput('');
            setBaseColor('red')
            setColorChosen(colorValues.RedOne)
        }

       
    }


    return(
    <View style = {styles.inputScreen}>

            <View style = {styles.addTimerButton}>
            <Pressable
                style = {({pressed}) => [((pressed) ? { opacity: 0.4} : {} )]}
                onPress={() => setModalVisible(true)}>
                <View style = {{width: addTimerPlusSymbolWidth, height: addTimerPlusSymbolHeight, backgroundColor: 'rgb(255,149,0)'}}></View>
                <View style = {{width: addTimerPlusSymbolHeight, height: addTimerPlusSymbolWidth, marginTop: addTimerPlusMarginTopOffset, marginLeft: addTimerPlusMarginLeftOffset, backgroundColor: 'rgb(255,149,0)'}}></View>
            </Pressable>
            </View>

            {/* <Button 
                title ="Add Timer" 
                onPress={() => setModalVisible(true)}/> */}
            
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent = {true}>
        <View style = {styles.modal}>
        <TextInput 
            style = {styles.timerNameInputContainer}
            placeholder = "Timer Name"
            value ={timerNameInput}
            onChangeText={setTimerNameInput}
            />
        <View
        style = {styles.scroll}>
        <Picker 
        style = {styles.picker}
            selectedValue={hoursInput}
            onValueChange={(itemValue) =>{
                setHoursInput(itemValue)
            }}
            >
                {createPickerArray(10).map(picker => picker)}
        </Picker>
            <Text style = {styles.labels}>Hours</Text>
        <Picker 
        style = {styles.picker}
            selectedValue={minsInput}
            onValueChange={(itemValue) =>setMinsInput(itemValue)}
            >
             {createPickerArray(11).map(picker => picker)}
            </Picker>
            <Text style = {styles.labels}> Mins</Text>
            <Picker 
        style = {styles.picker}
            selectedValue={secondsInput}
            onValueChange={(itemValue) =>setSecondsInput(itemValue)}
            >
              {createPickerArray(12).map(picker => picker)}
            </Picker>
            <Text style = {styles.labels}>Secs</Text>
        </View>

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
           <Button title = "set timer" onPress={()=>onTimerSubmit()}/>
           <Button title = "Close" onPress ={() => setModalVisible(false)}/>
        </View>
        </Modal>
    </View>
    );
}
const styles = StyleSheet.create({
    timerNameInputContainer:{
        //flexDirection: 'column',
        width: '60%',
        height: '10%',
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
    },
    picker : {
        width:'25%', 
        margin: 3
    },
    scroll : {
          flexDirection: 'row',
          alignItems: 'center',
           marginLeft: -25,
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
    },
    colorPicker: {
       // backgroundColor: 'red',
       marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    colorPickBox: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 15,
        marginTop: -20
        
    },
    huePickerBox:{
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 50
    },
    labels: {
        fontSize: 15,
        margin: -10
    },
    addTimerButton: {
       // backgroundColor: 'red',
        width: 200,
        alignItems: 'flex-end',
        paddingBottom: 30,
        marginBottom: 20,

    },
    secondaryHuePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 15
    }
});

export default TimerInput