import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Modal, Pressable} from 'react-native';
import { useState, useEffect, React, Component, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';

const TimerInput = (props) => {
    const[secondsInput, setSecondsInput] = useState('0')
    const[minsInput, setMinsInput] = useState('0');
    const[hoursInput, setHoursInput] = useState('0');
    const[timerNameInput, setTimerNameInput] = useState('')
    const[modalVisible, setModalVisible] = useState(false)

    const onTimerSubmit = () => {

        setModalVisible(false)
        console.log("seconds input: ", secondsInput)
        console.log("minutes inout: ", minsInput)
        console.log("hours input:", hoursInput)
        console.log("title input:", timerNameInput)
        props.onAddTimer({
            title: timerNameInput,
            seconds: secondsInput, 
            minutes: minsInput, 
            hours: hoursInput})

        setSecondsInput('0');
        setMinsInput('0');
        setHoursInput('0');
        setTimerNameInput('');
       
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
                console.log(secondsInput)

            }}
            >
                <Picker.Item label = "0" value = "0"/>
                <Picker.Item label = "1" value = "1"/>
                <Picker.Item label = "2" value = "2"/>
                <Picker.Item label = "3" value = "3"/>
                <Picker.Item label = "4" value = "4"/>
                <Picker.Item label = "5" value = "5"/>
        </Picker>
            <Text>Hours</Text>
        <Picker 
        style = {styles.picker}
            selectedValue={minsInput}
            onValueChange={(itemValue) =>setMinsInput(itemValue)}
            >
                <Picker.Item label = "0" value = "0"/>
                <Picker.Item label = "1" value = "1"/>
                <Picker.Item label = "2" value = "2"/>
                <Picker.Item label = "3" value = "3"/>
                <Picker.Item label = "4" value = "4"/>
                <Picker.Item label = "5" value = "5"/>
            </Picker>
            <Text> Mins</Text>
            <Picker 
        style = {styles.picker}
            selectedValue={secondsInput}
            onValueChange={(itemValue) =>setSecondsInput(itemValue)}
            >
                <Picker.Item label = "0" value = "0"/>
                <Picker.Item label = "1" value = "1"/>
                <Picker.Item label = "2" value = "2"/>
                <Picker.Item label = "3" value = "3"/>
                <Picker.Item label = "4" value = "4"/>
                <Picker.Item label = "5" value = "5"/>
            </Picker>
            <Text>Sec</Text>
        </View>
        <View style = {styles.colorPicker}>
            <Pressable style = {{...styles.colorPickBox, backgroundColor: 'red'}} />
            <Pressable style = {{...styles.colorPickBox, backgroundColor: 'green'}} />
            <Pressable style = {{...styles.colorPickBox, backgroundColor: 'blue'}} />
            <Pressable style = {{...styles.colorPickBox, backgroundColor: 'gray'}} />
            <Pressable style = {{...styles.colorPickBox, backgroundColor: 'black'}} />

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
    },
    picker : {
        width:'20%', 
        marginTop: -35
    },
    scroll : {
          flexDirection: 'row',
          alignItems: 'center'
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
        margin: 5
    },
    timerColorText: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica'
    }
});

export default TimerInput