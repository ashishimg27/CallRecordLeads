import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import RenoDemo from './RenoDemo';
import Login from './Login';
import RunoBottomNavigator from './RunoBottomNavigator';
// import RenoDemo from "./"

const Stack = createNativeStackNavigator();
const RunoApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="RunoBottomNavigator"
          component={RunoBottomNavigator}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RenoDemo"
          component={RenoDemo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RunoApp;
