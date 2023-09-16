// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Home from './Home';
// import RunoApp from './RunoApp';
// import First from './Screens/first';
// import Second from './Screens/second';
// import Third from './Screens/Third';

// const Tab = createBottomTabNavigator();

// const tabs = [
//   {name: 'Dashboard'},
//   {name: 'Calendar'},
//   {name: 'RequestModal'},
//   {name: 'Panel'},
//   {name: 'Chat'},
// ];
// const RunoBottomNavigator = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Tab.Navigator tabBar={props => <TabsUi {...{tabs, ...props}} />}>
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="RunoApp" component={RunoApp} />
//         <Tab.Screen name="First" component={First} />
//         <Tab.Screen name="Second" component={Second} />
//         <Tab.Screen name="Third" component={Third} />
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// };

// export default RunoBottomNavigator;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });
