
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
                <Picker.Item label = "0" value = "0"/>
                <Picker.Item label = "1" value = "1"/>
                <Picker.Item label = "2" value = "2"/>
                <Picker.Item label = "3" value = "3"/>
                <Picker.Item label = "4" value = "4"/>
                <Picker.Item label = "5" value = "5"/>
                <Picker.Item label = "6" value = "6"/>
                <Picker.Item label = "7" value = "7"/>
                <Picker.Item label = "8" value = "8"/>
                <Picker.Item label = "9" value = "9"/>
                <Picker.Item label = "10" value = "10"/>
                <Picker.Item label = "11" value = "11"/>
                <Picker.Item label = "12" value = "12"/>
                <Picker.Item label = "13" value = "13"/>
                <Picker.Item label = "14" value = "14"/>
                <Picker.Item label = "15" value = "15"/>
                <Picker.Item label = "16" value = "16"/>
                <Picker.Item label = "17" value = "17"/>
                <Picker.Item label = "18" value = "18"/>
                <Picker.Item label = "19" value = "19"/>
                <Picker.Item label = "20" value = "20"/>
                <Picker.Item label = "21" value = "21"/>
                <Picker.Item label = "22" value = "22"/>
                <Picker.Item label = "23" value = "23"/>
                <Picker.Item label = "24" value = "24"/>
        </Picker>
            <Text style = {styles.labels}>Hours</Text>
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
                <Picker.Item label = "6" value = "6"/>
                <Picker.Item label = "7" value = "7"/>
                <Picker.Item label = "8" value = "8"/>
                <Picker.Item label = "9" value = "9"/>
                <Picker.Item label = "10" value = "10"/>
                <Picker.Item label = "11" value = "11"/>
                <Picker.Item label = "12" value = "12"/>
                <Picker.Item label = "13" value = "13"/>
                <Picker.Item label = "14" value = "14"/>
                <Picker.Item label = "15" value = "15"/>
                <Picker.Item label = "16" value = "16"/>
                <Picker.Item label = "17" value = "17"/>
                <Picker.Item label = "18" value = "18"/>
                <Picker.Item label = "19" value = "19"/>
                <Picker.Item label = "20" value = "20"/>
                <Picker.Item label = "21" value = "21"/>
                <Picker.Item label = "22" value = "22"/>
                <Picker.Item label = "23" value = "23"/>
                <Picker.Item label = "24" value = "24"/>
                <Picker.Item label = "25" value = "25"/>
                <Picker.Item label = "26" value = "26"/>
                <Picker.Item label = "27" value = "27"/>
                <Picker.Item label = "28" value = "28"/>
                <Picker.Item label = "28" value = "28"/>
                <Picker.Item label = "29" value = "29"/>
                <Picker.Item label = "30" value = "30"/>
                <Picker.Item label = "31" value = "31"/>
                <Picker.Item label = "32" value = "32"/>
                <Picker.Item label = "33" value = "33"/>
                <Picker.Item label = "34" value = "34"/>
                <Picker.Item label = "35" value = "35"/>
                <Picker.Item label = "36" value = "36"/>
                <Picker.Item label = "37" value = "37"/>
                <Picker.Item label = "38" value = "38"/>
                <Picker.Item label = "39" value = "39"/>
                <Picker.Item label = "40" value = "40"/>
                <Picker.Item label = "41" value = "41"/>
                <Picker.Item label = "42" value = "42"/>
                <Picker.Item label = "43" value = "43"/>
                <Picker.Item label = "44" value = "44"/>
                <Picker.Item label = "45" value = "45"/>
                <Picker.Item label = "46" value = "46"/>
                <Picker.Item label = "47" value = "47"/>
                <Picker.Item label = "48" value = "48"/>
                <Picker.Item label = "49" value = "49"/>
                <Picker.Item label = "50" value = "50"/>
                <Picker.Item label = "51" value = "51"/>
                <Picker.Item label = "52" value = "52"/>
                <Picker.Item label = "53" value = "53"/>
                <Picker.Item label = "54" value = "54"/>
                <Picker.Item label = "55" value = "55"/>
                <Picker.Item label = "56" value = "56"/>
                <Picker.Item label = "57" value = "57"/>
                <Picker.Item label = "58" value = "58"/>
                <Picker.Item label = "59" value = "59"/>
            </Picker>
            <Text style = {styles.labels}> Mins</Text>
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
                <Picker.Item label = "6" value = "6"/>
                <Picker.Item label = "7" value = "7"/>
                <Picker.Item label = "8" value = "8"/>
                <Picker.Item label = "9" value = "9"/>
                <Picker.Item label = "10" value = "10"/>
                <Picker.Item label = "11" value = "11"/>
                <Picker.Item label = "12" value = "12"/>
                <Picker.Item label = "13" value = "13"/>
                <Picker.Item label = "14" value = "14"/>
                <Picker.Item label = "15" value = "15"/>
                <Picker.Item label = "16" value = "16"/>
                <Picker.Item label = "17" value = "17"/>
                <Picker.Item label = "18" value = "18"/>
                <Picker.Item label = "19" value = "19"/>
                <Picker.Item label = "20" value = "20"/>
                <Picker.Item label = "21" value = "21"/>
                <Picker.Item label = "22" value = "22"/>
                <Picker.Item label = "23" value = "23"/>
                <Picker.Item label = "24" value = "24"/>
                <Picker.Item label = "25" value = "25"/>
                <Picker.Item label = "26" value = "26"/>
                <Picker.Item label = "27" value = "27"/>
                <Picker.Item label = "28" value = "28"/>
                <Picker.Item label = "28" value = "28"/>
                <Picker.Item label = "29" value = "29"/>
                <Picker.Item label = "30" value = "30"/>
                <Picker.Item label = "31" value = "31"/>
                <Picker.Item label = "32" value = "32"/>
                <Picker.Item label = "33" value = "33"/>
                <Picker.Item label = "34" value = "34"/>
                <Picker.Item label = "35" value = "35"/>
                <Picker.Item label = "36" value = "36"/>
                <Picker.Item label = "37" value = "37"/>
                <Picker.Item label = "38" value = "38"/>
                <Picker.Item label = "39" value = "39"/>
                <Picker.Item label = "40" value = "40"/>
                <Picker.Item label = "41" value = "41"/>
                <Picker.Item label = "42" value = "42"/>
                <Picker.Item label = "43" value = "43"/>
                <Picker.Item label = "44" value = "44"/>
                <Picker.Item label = "45" value = "45"/>
                <Picker.Item label = "46" value = "46"/>
                <Picker.Item label = "47" value = "47"/>
                <Picker.Item label = "48" value = "48"/>
                <Picker.Item label = "49" value = "49"/>
                <Picker.Item label = "50" value = "50"/>
                <Picker.Item label = "51" value = "51"/>
                <Picker.Item label = "52" value = "52"/>
                <Picker.Item label = "53" value = "53"/>
                <Picker.Item label = "54" value = "54"/>
                <Picker.Item label = "55" value = "55"/>
                <Picker.Item label = "56" value = "56"/>
                <Picker.Item label = "57" value = "57"/>
                <Picker.Item label = "58" value = "58"/>
                <Picker.Item label = "59" value = "59"/>
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