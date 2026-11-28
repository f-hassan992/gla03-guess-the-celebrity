// App.js
// Sets up stack navigation between the four screens of the game.

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import FinalScoreScreen from './src/screens/FinalScoreScreen';
import { COLORS } from './src/constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'GLA-03: Guess The Celebrity' }}
        />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Game' }} />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Result', headerBackVisible: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="FinalScore"
          component={FinalScoreScreen}
          options={{ title: 'Final Score', headerBackVisible: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}