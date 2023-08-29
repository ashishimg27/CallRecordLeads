import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen/HomeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UserProfile from './UserProfile/UserProfile';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="headphones" color={color} size={30} />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="user" color={color} size={30} />
          ),

          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarIcon = ({name, color, size}) => {
  return <FontAwesome5 name={name} color={color} size={size} />;
};

export default BottomNavigator;
