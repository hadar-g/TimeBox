
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Modal, Pressable} from 'react-native';
import { useState, React} from 'react';
import {Picker} from '@react-native-picker/picker';

const TimerInput = (props) => {
    const[secondsInput, setSecondsInput] = useState('0')
    const[minsInput, setMinsInput] = useState('0');
    const[hoursInput, setHoursInput] = useState('0');
    const[timerNameInput, setTimerNameInput] = useState('')
    const[modalVisible, setModalVisible] = useState(false)
    const[colorChosen, setColorChosen] = useState('red')

    const createPickerArray = (max) => {
        const pickerArray =[]
        for(let i = 0; i <= max; i++){
           pickerArray.push( <Picker.Item label = {`${i}`} value = {`${i}`}/> )
        }
        return pickerArray
    }
    

    const onTimerSubmit = () => {0

        setModalVisible(false)
        console.log("seconds input: ", secondsInput)
        console.log("minutes inout: ", minsInput)
        console.log("hours input:", hoursInput)
        console.log("title input:", timerNameInput)
        props.onAddTimer({
            title: timerNameInput,
            seconds: secondsInput, 
            minutes: minsInput, 
            hours: hoursInput,
            timerColorChosen: colorChosen})

        setSecondsInput('0');
        setMinsInput('0');
        setHoursInput('0');
        setTimerNameInput('');
        setColorChosen('red');
       
    }


    return(
    <View style = {styles.inputScreen}>
            <Button title ="Add Timer" onPress={() => setModalVisible(true)}/>
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
                style = {(colorChosen == 'red') ? {...styles.colorPickBox, backgroundColor: 'red', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'red'} }
                onPress={()=>{setColorChosen('red')}} />
            <Pressable 
                style = {(colorChosen == 'green') ? {...styles.colorPickBox, backgroundColor: 'green', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'green'}}
                onPress={()=>{setColorChosen('green')}} />
            <Pressable 
                style = {(colorChosen == 'blue') ? {...styles.colorPickBox, backgroundColor: 'blue', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'blue'}}
                onPress={()=>{setColorChosen('blue')}} />
            <Pressable 
                style = {(colorChosen == 'gray') ? {...styles.colorPickBox, backgroundColor: 'gray', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'gray'}} 
                onPress={()=>{setColorChosen('gray')}}/>
            <Pressable 
                style = {(colorChosen == 'orange') ? {...styles.colorPickBox, backgroundColor: 'orange', borderWidth: 5} : {...styles.colorPickBox, backgroundColor: 'orange'}} 
                onPress={()=>{setColorChosen('orange')}}/>

            <Text style = {styles.timerColorText}>Timer Color</Text>
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    colorPickBox: {
        width: 20,
        height: 20,
        margin: 5,
        
    },
    timerColorText: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica'
    },
    labels: {
        fontSize: 15,
        margin: -10
    }
});

export default TimerInput