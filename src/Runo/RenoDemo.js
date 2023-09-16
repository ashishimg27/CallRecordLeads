import {View, Text, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import font from '../assests/Fonts';
export default function RenoDemo() {
  const data = [
    {
      name: 'Rahul Sharma',
      status: 'On Call',
      time: '15m 28s',
      post: 'Telecaller',
      iconName: 'customerservice',
      provider: 'AntDesign',
    },
    {
      name: 'Kumar',
      status: 'Logged Out',
      time: '10m 28s',
      post: 'Territory Manager',
      iconName: 'logout',
      provider: 'AntDesign',
    },
    {
      name: 'Kunal Bahl',
      status: 'Hasn"t loggedin',
      time: '',
      post: 'Telecaller',
      iconName: 'user',
      provider: 'AntDesign',
    },
    {
      name: 'Susheel, K',
      status: 'Idle',
      time: '13m 48s',
      post: 'Sales Manager',
      iconName: 'human-wheelchair',
      provider: 'MaterialCommunityIcons',
    },
    {
      name: 'Gaurav Kumar',
      status: 'Wrapping up',
      time: '27m 8s',
      post: 'Telecaller',
      iconName: 'keyboard-settings',
      provider: 'MaterialCommunityIcons',
    },
    {
      name: 'Amit shah',
      status: 'Checked Out',
      time: '43m 48s',
      post: 'Telecaller',
      iconName: 'login-variant',
      provider: 'MaterialCommunityIcons',
    },
    {
      name: 'Srinivas',
      status: 'On Break',
      time: '8m 48s',
      post: 'Territory Manager',
      iconName: 'cupcake',
      provider: 'MaterialCommunityIcons',
    },
    {
      name: 'Kumar',
      status: 'Logged Out',
      time: '10m 28s',
      post: 'Territory Manager',
      iconName: 'logout',
      provider: 'AntDesign',
    },
    {
      name: 'Kunal Bahl',
      status: 'Hasn"t loggedin',
      time: '',
      post: 'Telecaller',
      iconName: 'user',
      provider: 'AntDesign',
    },
    {
      name: 'Susheel, K',
      status: 'Idle',
      time: '13m 48s',
      post: 'Sales Manager',
      iconName: 'human-wheelchair',
      provider: 'MaterialCommunityIcons',
    },
    {
      name: 'Kumar',
      status: 'Logged Out',
      time: '10m 28s',
      post: 'Territory Manager',
      iconName: 'logout',
      provider: 'AntDesign',
    },
    {
      name: 'Kunal Bahl',
      status: 'Hasn"t loggedin',
      time: '',
      post: 'Telecaller',
      iconName: 'user',
      provider: 'AntDesign',
    },
    {
      name: 'Susheel, K',
      status: 'Idle',
      time: '13m 48s',
      post: 'Sales Manager',
      iconName: 'human-wheelchair',
      provider: 'MaterialCommunityIcons',
    },
    {
      name: 'Kumar',
      status: 'Logged Out',
      time: '10m 28s',
      post: 'Territory Manager',
      iconName: 'logout',
      provider: 'AntDesign',
    },
    {
      name: 'Kunal Bahl',
      status: 'Hasn"t loggedin',
      time: '',
      post: 'Telecaller',
      iconName: 'user',
      provider: 'AntDesign',
    },
    {
      name: 'Susheel, K',
      status: 'Idle',
      time: '13m 48s',
      post: 'Sales Manager',
      iconName: 'human-wheelchair',
      provider: 'MaterialCommunityIcons',
    },
  ];

  // const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['white','white']}
        colors={['#FA8661', '#F8325A']}
        style={{
          height: 40,
        }}>
        <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0.5)'} />
      </LinearGradient>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['white','white']}
        colors={['#FA8661', '#F8325A']}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
          //   marginHorizontal: 20,
        }}>
        <View>
          <Feather name="arrow-left" size={30} color="white" />
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: font.SemiBold,
          }}>
          Team Live Status
        </Text>
        <Ionicons name="people" size={30} color="white" />
      </LinearGradient>
      <View style={{marginBottom: 70}}>
        {data.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 8,
                marginHorizontal: 10,
                marginVertical: 7,
                padding: 18,
                elevation: 3,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={index}>
              <View style={{flexDirection: 'row', width: '65%'}}>
                <View
                  style={{
                    marginRight: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.provider == 'AntDesign' ? (
                    <AntDesign name={item.iconName} size={30} color="#FA8661" />
                  ) : (
                    <MaterialCommunityIcons
                      name={item.iconName}
                      size={30}
                      color="#FA8661"
                    />
                  )}
                </View>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'black',
                      // fontWeight: '500',
                      fontFamily: font.SemiBold,
                      fontSize: 16,
                      marginBottom: 5,
                    }}>
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 14,
                      fontFamily: font.Regular,
                    }}>
                    {item?.post}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '35%',
                  alignItems: 'flex-end',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    // fontWeight: '700',
                    fontFamily: font.Bold,
                    marginBottom: 5,
                  }}>
                  {item.status}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: font.Bold,
                    fontSize: 14,
                  }}>
                  {item.time}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
