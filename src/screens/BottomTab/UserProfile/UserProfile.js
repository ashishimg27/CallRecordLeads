import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Color} from '../../../styles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const UserProfile = () => {
  const navigation = useNavigation();
  const [pathdata, setpathData] = useState();
  const [userDetail, setUserDetail] = useState(null);
  const focus = useIsFocused();
  useEffect(() => {
    getpath();
    getUserDetail();
  }, [focus]);
  const getpath = async () => {
    let path = await AsyncStorage.getItem('path');
    console.log('pathbottom', path);
    setpathData(path);
  };

  const getUserDetail = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    setUserDetail(parsedData[0]);
    console.log(parsedData[0], '..............');
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['white','white']}
        colors={['#FA8661', '#F8325A']}
        style={styles.topCircle__container}
      />

      {/* <View style={styles.topCircle__container} /> */}
      <Text style={styles.Profile_text}>Profile</Text>
      <View style={styles.main__container}>
        <View style={styles.UserDetails__container}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg',
            }}
            style={styles.userProfilePic}
            resizeMode="stretch"
          />
          <Text style={styles.userPosition}>{userDetail?.fname} </Text>
          <View style={styles.aboutUser__container}>
            <View style={styles.userLocation__container}>
              <View style={styles.Icon}>
                <FontAwesome
                  name="map-marker"
                  color={Color.primary}
                  size={15}
                />
              </View>
              <Text>{userDetail?.branch}</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.completedTask__container}>
              <View style={styles.Icon}>
                <FontAwesome name="briefcase" color={Color.primary} size={15} />
              </View>
              <Text>{userDetail?.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.storagePath__container}>
          <Text style={styles.storage__heading}>Storage Path</Text>
          <View style={styles.Editpath__container}>
            <Text style={styles.pathText}>{pathdata}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainHome');
              }}>
              <Feather name="edit" size={30} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['white','white']}
        colors={['#FA8661', '#F8325A']}
        style={styles.BottomCircle__container}
      />
    </View>
  );
};

export default UserProfile;
