import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Modal} from 'react-native';
import { useState, useEffect, React, Component, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';

const TimerInput = (props) => {
    const[secondsInput, setSecondsInput] = useState('0')
    const[minsInput, setMinsInput] = useState('0');
    const[hoursInput, setHoursInput] = useState('0');
    const[timerNameInput, setTimerNameInput] = useState('')
    const[modalVisible, setModalVisible] = useState(false)

    const onTimerSubmit = () => {

        //Keyboard.dismiss()
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


 const openPicker = () =>{
  setModalVisible(true)
 }
 const closePicker = () =>{
    setModalVisible(false)
   }


    return(
    <View>
            <Button title ="Add Timer" onPress={() => openPicker()}/>
        <View>
            
        </View>
        <Modal
            visible={modalVisible}
            animationType="slide">
<View style = {styles.modal}>
               <TextInput 
               style = {styles.textInputContainerTwo}
                //style = {styles.textInputContainer}
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
           // mode = "dropdown"
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
           // mode = "dropdown"
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
           // mode = "dropdown"
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
           <Button title = "set timer" onPress={()=>onTimerSubmit()}/>
           </View>
        </Modal>
        
       
        
            {/* <ScrollPicker
        dataSource={['1', '2', '3', '4', '5', '6']}
        selectedIndex={1}
        renderItem={(data, index) => {
          //
        }}
        onValueChange={(data, selectedIndex) => {
          //
        }}
        wrapperHeight={180}
        wrapperWidth={150}
        wrapperColor='#FFFFFF'
        itemHeight={60}
        highlightColor='#d8d8d8'
        highlightBorderWidth={2}
            /> */}
        </View>
        // <View style = {styles.FieldContainer} >
        //     <TextInput 
        //         style = {styles.textInputContainer}
        //         placeholder = "Timer Name"
        //         value ={timerNameInput}
        //         onChangeText={setTimerNameInput}
        //     />
        //     <TextInput
        //     keyboardType='numeric'
        //     placeholder = "hr"
        //     value ={hoursInput}
        //     onChangeText={setHoursInput}
        //     maxLength = {2}
        //     style = {styles.inputContainer}/>

        //     <Text style = {styles.textContainer}>:</Text>

        //     <TextInput
        //     keyboardType='numeric'
        //     placeholder = "min"
        //     value ={minsInput}
        //     onChangeText={setMinsInput}
        //     maxLength = {2}
        //     style = {styles.inputContainer}/>

        //     <Text style = {styles.textContainer}>:</Text>

        //     <TextInput
        //     keyboardType='numeric'
        //     placeholder = "sec"
        //     value ={secondsInput}
        //     onChangeText={setSecondsInput}
        //     maxLength = {2}
        //     style = {styles.inputContainer}/>

        //     <Button title = 'Add' onPress={onTimerSubmit}/>
        // </View>
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
    },
    textInputContainerTwo:{
        //flex: 1,
        //marginRight: 5,
        //marginTop: 20,
        //padding: 0,
        flexDirection: 'column',
        width: '50%',
        height: '10%',
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        //backgroundColor: 'red'
    },
    picker : {
        //flex: 1,
        width:'20%',
        //backgroundColor: 'red',
      
        
    },
    scroll : {
        padding: 0,
        paddingTop: 0,
          flexDirection: 'row',
          alignItems: 'center'
    },
    modal: {
      //  backgroundColor: 'red',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    }
});

export default TimerInput