import {View, Text, TextInput, Alert, StatusBar} from 'react-native';
import React from 'react';
import styles from './style';
import PrimaryButton from '../../components/commonComponents/PrimaryButton/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const OtpScreen = ({route}) => {
  const {token} = route.params;
  console.log(token, 'token received');

  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState('');

  const checkOtp = async () => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const param = {
      api_service_id: 'customer.api',
      api_command: 'fetch.api',
      public_api_key: publicApiKey,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
      request_access: '1',
      data_access_token: token,
      data_access_code: number.toString(),
      check_key_authentication: '1',
    };
    console.log(param, 'OTP PPPPPPP');
    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=${param.api_service_id}&api_command=${param.api_command}&public_api_key=${param.public_api_key}&app_key=${param.app_key}&request_access=${param.request_access}&data_access_token=${param.data_access_token}&data_access_code=${param.data_access_code}&check_key_authentication=${param.check_key_authentication}`,
      );

      console.log(response?.data[0], 'otp response');
      if (response?.data[0].public_api_key == publicApiKey) {
        await AsyncStorage.setItem('auth', '1');
        navigation.navigate('MainHome');
      }
    } catch (error) {
      console.log(error.response.data, '>>>>>>>>>> Error');
      if (error.response.data.Error == 2) {
        Alert.alert('ALert!', 'Invalid OTP');
      }
    }
  };
  const handleOtpVerify = () => {
    if (number.length !== 6) {
      Alert.alert('Invalid Input', 'Please enter a 6-digit OTP.');
      return;
    }
    checkOtp();

    console.log('Submit button clicked with valid input:', number);
  };
  return (
    <>
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
          // height: '50%',fl
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 30, color: 'white'}}>Verification</Text>
          <Text style={{color: '#FFFFFF'}}>
            We Have sent OTP on your register mobile number
          </Text>
        </View>

        <View style={styles.container}>
          {/* <View style={styles.otpHeading__container}>
            <Text>OTP VERIFICATION</Text>
          </View> */}
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="ENTER OTP"
            keyboardType="numeric"
            maxLength={6}
          />
          <View style={styles.btn__container}>
            <PrimaryButton
              btnLabel={'VERIFY OTP'}
              customStyle={{width: '100%'}}
              btnHandle={handleOtpVerify}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default OtpScreen;
