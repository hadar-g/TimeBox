
import { StyleSheet, Text, View, Button} from 'react-native';
import FlatScreen from './FlatScreen';
import RoundScreen from './RoundScreen';


const HomeScreen = ({ navigation }) => {
    return (
            <View>
                <Text>Home Screen</Text>
                
                <Button title = "Go to flat"
                onPress={() =>navigation.navigate(FlatScreen)} />

                <Button title = "Go to round"
                onPress={() =>navigation.navigate(RoundScreen)} />
            </View>
    );
  };

  
export default HomeScreen