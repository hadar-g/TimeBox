
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Modal, Pressable, Alert} from 'react-native';
import { useState, React, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const TimerInput = (props) => {
    const[secondsInput, setSecondsInput] = useState('0')
    const[minsInput, setMinsInput] = useState('0');
    const[hoursInput, setHoursInput] = useState('0');
    const[timerNameInput, setTimerNameInput] = useState('')
    const[modalVisible, setModalVisible] = useState(false)
    const[colorChosen, setColorChosen] = useState()
    const[baseColor, setBaseColor] = useState('red')
    const[hueArray, setHueArray] = useState(['rgb(255,0,0)' ,'rgb(192, 0 , 0)' , 'rgb(129, 0, 0)', 'rgb(66, 0, 0)'])

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
                setHueArray(['rgb(255,0,0)' ,'rgb(192,0 ,0)' , 'rgb(129,0,0)', 'rgb(220,20,60)']);
                setColorChosen('rgb(255,0,0)');
              break;
            case 'green':
                setHueArray(['rgb(0,129,0)', 'rgb(0,255,0)' ,'rgb(0,192,0)'  , 'rgb(128,128,0)']);
                setColorChosen('rgb(0,129,0)');
              break;
            case 'blue':
                setHueArray(['rgb(0,0,255)' ,'rgb(0,0,192)' , 'rgb(0,0,129)', 'rgb(70,130,180)']);
                setColorChosen('rgb(0,0,255)')
              break;
            case 'orange':
                setHueArray(['rgb(255,140, 0)' ,'rgb(255,165,0)' , 'rgb(255,127,80)', 'rgb(255,160,122)']);
                setColorChosen('rgb(255,140,0)')
              break;
            case 'gray':
                setHueArray(['rgb(64,64,64)' ,'rgb(128,128,128)' , 'rgb(192, 192,192)', 'rgb(220,220,220)']);
                setColorChosen('rgb(64,64,64)')
              break;
            default:
                setHueArray(['rgb(255,0,0)' ,'rgb(192,0 ,0)' , 'rgb(129,0,0)', 'rgb(66,0,0)']);
                setColorChosen('rgb(255,0,0)')
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
                id: uuidv4(),
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
            setColorChosen('rgb(255,0,0)')
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

            <View style = {styles.secondaryHuePicker}>
                <Pressable
                    style = {(colorChosen === hueArray[0]) ? {...styles.huePickerBox, backgroundColor: hueArray[0], borderWidth: 5} : {...styles.huePickerBox, backgroundColor: hueArray[0]}}
                    onPress = {() => {setColorChosen(hueArray[0])}}
                    />
                <Pressable
                    style = {(colorChosen === hueArray[1]) ? {...styles.huePickerBox, backgroundColor: hueArray[1], borderWidth: 5} : {...styles.huePickerBox, backgroundColor: hueArray[1]}}
                    onPress = {() => {setColorChosen(hueArray[1])}}
                    />
                <Pressable
                    style = {(colorChosen === hueArray[2]) ? {...styles.huePickerBox, backgroundColor: hueArray[2], borderWidth: 5} : {...styles.huePickerBox, backgroundColor: hueArray[2]}}
                    onPress = {() => {setColorChosen(hueArray[2])}}
                    />
                <Pressable
                    style = {(colorChosen === hueArray[3]) ? {...styles.huePickerBox, backgroundColor: hueArray[3], borderWidth: 5} : {...styles.huePickerBox, backgroundColor: hueArray[3]}}
                    onPress = {() => {setColorChosen(hueArray[3])}}
                    />

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
       marginTop: 50,
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
        marginBottom: 20
    },
    secondaryHuePicker: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default TimerInput