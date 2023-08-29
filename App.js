import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from './src/screens/BottomTab/BottomNavigator';
import LeadsData from './src/screens/LeadsData/LeadsData';

const Stack = createNativeStackNavigator();
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LeadsData"
          component={LeadsData}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
