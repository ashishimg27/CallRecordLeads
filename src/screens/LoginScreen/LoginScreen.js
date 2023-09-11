import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PrimaryButton from '../../components/commonComponents/PrimaryButton/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color} from '../../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const getLogin = async () => {
    await AsyncStorage.setItem('publicApiKey', text);
    let path = await AsyncStorage.getItem('path');

    const param = {
      api_service_id: 'customer.api',
      api_command: 'fetch.api',
      public_api_key: text,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
      request_access: '1',
      check_key_authentication: '1',
    };
    console.log(param, 'PPPPPPPPP');

    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=${param.api_service_id}&api_command=${param.api_command}&public_api_key=${param.public_api_key}&app_key=${param.app_key}&request_access=${param.request_access}&check_key_authentication=${param.check_key_authentication}`,
      );
      console.log(response?.data, 'login responsesssssssssss');
      const JsonData = JSON.stringify(response?.data);
      onChangeText('');
      if (response?.data[0]?.key_authenticated == 0) {
        setIsLoading(false);
        console.log('0000000000');
        navigation.navigate('OtpScreen', {
          token: response?.data[0]?.onetime_token,
        });
      } else if (response?.data[0]?.key_authenticated == 1) {
        setIsLoading(false);
        console.log('1111111111');
        path
          ? navigation.navigate('BottomNavigator')
          : navigation.navigate('MainHome');
        await AsyncStorage.setItem(
          'auth',
          response?.data[0]?.key_authenticated.toString(),
        );

        await AsyncStorage.setItem('userData', JsonData);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.data, '>>>>>>>>>> Login Error');
      Alert.alert('Alert!', 'This is an Invalid API Key', [
        {text: 'OK', onPress: () => onChangeText('')},
      ]);
    }
  };

  const loginHandle = () => {
    setIsLoading(true);
    if (!text) {
      console.log('enter api key first');
      Alert.alert('Alert', 'Enter Api key');
      setIsLoading(false);
      return;
    } else {
      getLogin();
      //   if (oneTimeToken) {
      //     navigation.navigate('OtpScreen', {
      //       token: oneTimeToken,
      //       public_api_key: text,
      //     });
      //   }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['white','white']}
        colors={['#FA8661', '#F8325A']}
        style={{
          height: 40,
          width: '100%',
        }}>
        <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0.5)'} />
      </LinearGradient>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#FA8661', '#F8325A']}
        style={styles.loginHeader__container}>
        <View style={styles.mainHeading__container}>
          <Text style={styles.appHeading}>Recorderr</Text>
          <Text style={styles.appSubHeading}>Management App</Text>
        </View>
      </LinearGradient>

      <View style={styles.body__container}>
        <View style={styles.login__container}>
          <Text style={styles.loginHeading}>Login to your account</Text>
          <View style={styles.inputIcon__container}>
            <View style={styles.Icon__container}>
              <FontAwesome5 name="keyboard" size={20} color={'white'} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="ENTER API KEY"
            />
          </View>
        </View>

        <View style={styles.btn__container}>
          <PrimaryButton
            btnLabel={'Login'}
            customStyle={{
              width: '100%',
              height: 45,
              alignItem: 'center',
              justifyContent: 'center',
            }}
            btnHandle={loginHandle}
          />
        </View>
        {isLoading == true ? (
          <View
            style={{
              // backgroundColor: 'red',
              flex: 1,
              position: 'absolute',
              top: '50%',
            }}>
            <ActivityIndicator size="large" color={'#F8325A'} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default LoginScreen;
