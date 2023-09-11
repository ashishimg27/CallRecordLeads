import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfile from './UserProfile/UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenoDemo from '../../Runo/RenoDemo';
import {Color} from '../../styles/Colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  // const [pathdata, setpathData] = useState();
  // useEffect(() => {
  //   getpath();
  // }, []);
  // const getpath = async () => {
  //   let path = await AsyncStorage.getItem('path');
  //   console.log('pathbottom', path);
  //   setpathData(path);
  // };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.primary,
        tabBarStyle: {paddingVertical: 10, paddingBottom: 10, height: 65},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="home-outline" color={color} size={30} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="person-outline" color={color} size={30} />
          ),

          tabBarLabel: 'Profile',
        }}
      />
      {/* <Tab.Screen
        name="RenoDemo"
        component={RenoDemo}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="phone" color={color} size={30} />
          ),

          tabBarLabel: '',
        }}
      /> */}
    </Tab.Navigator>
  );
};

const TabBarIcon = ({name, color, size}) => {
  return <Ionicons name={name} color={color} size={size} />;
};

export default BottomNavigator;
