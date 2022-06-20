import FlatScreen from './screens/FlatScreen';
import RoundScreen from './screens/RoundScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();


  return (
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FlatScreen" component={FlatScreen} />
        <Stack.Screen name="RoundScreen" component={RoundScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}
