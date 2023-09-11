import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from './src/screens/BottomTab/BottomNavigator';
import LeadsData from './src/screens/LeadsData/LeadsData';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import OtpScreen from './src/screens/OtpScreen/OtpScreen';
import Test from './src/Test';
import Test2 from './src/Test2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainHome from './src/screens/MainHome';

const Stack = createNativeStackNavigator();

const App = () => {
  const [data, setData] = useState('Loading');
  const [checkpath, setCheckpath] = useState(null);
  useEffect(() => {
    getuserData();
  }, []);
  const getuserData = async () => {
    let userData = await AsyncStorage.getItem('auth');
    let path = await AsyncStorage.getItem('path');
    setCheckpath(path);
    console.log('userData', userData, path);
    setData(userData);
  };
  console.log('dataaaaaaaaa', data);
  return (
    <>
      {data !== 'Loading' ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              !!data
                ? checkpath
                  ? 'BottomNavigator'
                  : 'MainHome'
                : 'LoginScreen'
            }>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BottomNavigator"
              component={BottomNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MainHome"
              component={MainHome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LeadsData"
              component={LeadsData}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : null}
    </>
    // <Test />
    // <Test2 />
  );
};

export default App;
