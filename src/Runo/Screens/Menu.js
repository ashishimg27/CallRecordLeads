import {
  View,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Width = Dimensions.get('window').width;
export default function Menu() {
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
  ];
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
        <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
          Menu
        </Text>
      </LinearGradient>
      <FlatList
        numColumns={2}
        data={data}
        contentContainerStyle={{
          // alignSelf:'center',
          marginTop: 10,
          justifyContent: 'center',
        }}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              marginHorizontal: 9,
              marginVertical: 7,
              padding: 18,
              elevation: 3,
              alignItems: 'center',
              justifyContent: 'center',
              width: Width / 2.2,
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
            <Text
              style={{
                color: 'black',
                fontWeight: '400',
                fontSize: 16,
                marginBottom: 5,
              }}>
              {item?.name}
            </Text>
            {/* </View> */}
          </View>
        )}
      />
    </ScrollView>
  );
}
