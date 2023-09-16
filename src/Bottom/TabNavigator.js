import {
  Alert,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import Home from '../Runo/Home';
import RenoDemo from '../Runo/RenoDemo';
import Menu from '../Runo/Screens/Menu';
import Allocation from '../Runo/Allocation';

const TabNavigator = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const [hidefooter, sethidefooter] = useState(false);
  return (
    <KeyboardAvoidingView
      style={styles.main__container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      {selectedTab === 'home' ? (
        <Home />
      ) : selectedTab === 'log' ? (
        <RenoDemo />
      ) : selectedTab === 'profile' ? (
        <Allocation  sethidefooter={sethidefooter}/>
      ) : selectedTab === 'menu' ? (
        <Menu />
      ) : null}
      {!hidefooter && (
        <>
          <View style={styles.bottomTab__container}>
            <View style={styles.bottomTab__options}>
              <View
                style={styles.option__container}
                onTouchEnd={() => setSelectedTab('home')}>
                <Feather
                  name="home"
                  size={18}
                  color={selectedTab === 'home' ? '#FA8661' : 'grey'}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: selectedTab === 'home' ? '#FA8661' : 'grey',
                  }}>
                  Home
                </Text>
              </View>
              <View
                style={styles.option__container}
                onTouchEnd={() => setSelectedTab('log')}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={selectedTab === 'log' ? '#FA8661' : 'grey'}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: selectedTab === 'log' ? '#FA8661' : 'grey',
                  }}>
                  Logs
                </Text>
              </View>
            </View>
            <View style={styles.bottomTab__options}>
              <View
                style={styles.option__container}
                onTouchEnd={() => {
                  // Alert.alert('profile');
                  setSelectedTab('profile');
                }}>
                <Feather
                  name="user"
                  size={18}
                  color={selectedTab === 'profile' ? '#FA8661' : 'grey'}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: selectedTab === 'profile' ? '#FA8661' : 'grey',
                  }}>
                  Profile
                </Text>
              </View>
              <View
                style={styles.option__container}
                onTouchEnd={() => setSelectedTab('menu')}>
                <MaterialCommunityIcons
                  name="menu"
                  size={18}
                  color={selectedTab === 'menu' ? '#FA8661' : 'grey'}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: selectedTab === 'menu' ? '#FA8661' : 'grey',
                  }}>
                  Menu
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.middleTab__container}>
            <View style={styles.subOuterMiddleTab__container}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#FA8661', '#F8325A']}
                style={styles.subInnerMiddleTab__container}>
                <FontAwesome5 name="phone-alt" size={30} color={'white'} />
              </LinearGradient>
            </View>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  main__container: {flex: 1, backgroundColor: 'white'},
  bottomTab__container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomTab__options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // flex: 1 / 2,
    width: '40%',
    // backgroundColor: 'green',
  },
  option__container: {
    alignItems: 'center',
  },
  middleTab__container: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  subOuterMiddleTab__container: {
    // backgroundColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 999,
    elevation: 1,
  },
  subInnerMiddleTab__container: {
    borderRadius: 999,
    padding: 15,
  },
});
