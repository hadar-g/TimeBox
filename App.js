import FlatScreen from './screens/FlatScreen';
import RoundScreen from './screens/RoundScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  return (
    <FlatScreen />
  );
}
