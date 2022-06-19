import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Keyboard} from 'react-native';
import { useState, useEffect, React, Component} from 'react';

const TimerInput = (props) => {
    const[secondsInput, setSecondsInput] = useState('00')
    const[minsInput, setMinsInput] = useState('00');
    const[hoursInput, setHoursInput] = useState('00');
    const[timerNameInput, setTimerNameInput] = useState('')

    const onTimerSubmit = () => {

        Keyboard.dismiss()

        props.onAddTimer({
            title: timerNameInput,
            seconds: secondsInput, 
            minutes: minsInput, 
            hours: hoursInput})

        setSecondsInput(null);
        setMinsInput(null);
        setHoursInput(null);
        setTimerNameInput('');
       
    }

    return(
        <View style = {styles.FieldContainer} >
            <TextInput 
                style = {styles.textInputContainer}
                placeholder = "Timer Name"
                value ={timerNameInput}
                onChangeText={setTimerNameInput}
            />
            <TextInput
            keyboardType='numeric'
            placeholder = "hr"
            value ={hoursInput}
            onChangeText={setHoursInput}
            maxLength = {2}
            style = {styles.inputContainer}/>

            <Text style = {styles.textContainer}>:</Text>

            <TextInput
            keyboardType='numeric'
            placeholder = "min"
            value ={minsInput}
            onChangeText={setMinsInput}
            maxLength = {2}
            style = {styles.inputContainer}/>

            <Text style = {styles.textContainer}>:</Text>

            <TextInput
            keyboardType='numeric'
            placeholder = "sec"
            value ={secondsInput}
            onChangeText={setSecondsInput}
            maxLength = {2}
            style = {styles.inputContainer}/>

            <Button title = 'Add' onPress={onTimerSubmit}/>
        </View>
    );
}
const styles = StyleSheet.create({
    FieldContainer:{
        justifyContent: 'left',
      //  backgroundColor: 'red',
        flexDirection: 'row',
        margin: 3
    },
    inputContainer: {
        width: '10%',
        padding: 0,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    textContainer: {
        fontSize: 35
    },
    textInputContainer:{
        flex: 1,
        marginRight: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    }
});

export default TimerInput