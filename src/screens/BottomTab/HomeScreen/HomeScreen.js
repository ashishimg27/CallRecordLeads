import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../../components/commonComponents/LoadingComponent/LoadingComponent';
import LinearGradient from 'react-native-linear-gradient';

// const DailyReportData = [
//   {title: 'Newly Added', count: '1388'},
//   {title: 'Important', count: '5'},
//   {title: 'Followup', count: '5'},
//   {title: 'Closed', count: '3'},
//   {title: 'Not Intrested', count: '2'},
//   {title: 'Raw Leads', count: '2'},
//   {title: 'Not Answered', count: '2'},
//   {title: 'Waiting List', count: '0'},
//   {title: 'Intrested', count: '9'},
//   {title: 'Withdraw', count: '0'},
//   {title: 'Defered', count: '0'},
//   {title: 'Walk in', count: '0'},
//   {title: 'Call', count: '0'},
//   {title: 'Bharat', count: '0'},
//   {title: 'Bharath', count: '0'},
//   {title: '', count: ''},
//   {title: 'call imd', count: ''},
//   {title: 'call me back', count: '0'},
//   {title: 'end', count: '0'},
//   {title: 'CALL ASAP', count: '2'},
//   {title: '', count: ''},
// ];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [statusCountData, setStatusCountData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getStatusCount = async () => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const param = {
      api_service_id: 'customer.api',
      api_command: 'report.by.student.status.api',
      public_api_key: publicApiKey,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
      tag_student: 'lead',
    };

    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service1?api_service_id=${param.api_service_id}&api_command=${param.api_command}&public_api_key=${param.public_api_key}&app_key=${param.app_key}&tag_student=${param.tag_student}`,
      );

      // console.log(response.data, 'leads responsessss');
      setStatusCountData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data, '>>>>>>>>>>Dash Error');
      if (
        error.response &&
        error.response.data &&
        error.response.data.Error ===
          '[403 - ACCESS DENIED] Unable to access this service. Given API key is of no use.'
      ) {
        Alert.alert(
          '[403 - ACCESS DENIED]',
          'Unable to access this service. Given API key is of no use',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('LoginScreen');
                AsyncStorage.removeItem('auth');
              },
            },
          ],
        );
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getStatusCount();
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    setUserDetails(parsedData[0]);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1}}>
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
      {isLoading == true ? (
        <View style={styles.loadingStyle}>
          <LoadingComponent />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              // colors={['white','white']}
              colors={['#FA8661', '#F8325A']}
              style={{
                width: '100%',
                // paddingHorizontal: 10,
                // paddingBottom: 10,
              }}>
              <View style={{padding: 10}}>
                <View style={styles.heading__container}>
                  <Text style={styles.heading}>Recorderr</Text>
                </View>
                <View style={styles.user__container}>
                  <Text style={styles.userName}>
                    WELCOME {userDetails.fname}
                  </Text>
                  <Text style={styles.greetText}>Have a nice day!</Text>
                </View>
              </View>

              <View style={styles.body__container}>
                <Text style={styles.body__heading}>Daily Reports</Text>
                <View style={styles.reports__container}>
                  {statusCountData?.map((statusCount, index) => {
                    const randomColor = `#${Math.floor(
                      Math.random() * 16777215,
                    ).toString(16)}`;

                    let bgColor = randomColor;
                    let textColor = '#ffffff'; // Default text color

                    if (statusCount.color) {
                      const colors = statusCount.color.split('-');
                      if (colors.length === 2) {
                        bgColor = colors[1];
                        textColor = colors[0];
                      }
                    }
                    return (
                      <TouchableOpacity
                        style={[styles.report_box, {backgroundColor: bgColor}]}
                        key={index}
                        onPress={() =>
                          navigation.navigate('LeadsData', {
                            id: statusCount.id,
                          })
                        }>
                        <Text
                          style={[
                            styles.dailyReport__count,
                            {color: textColor},
                          ]}>
                          {statusCount.count}
                        </Text>
                        <Text
                          style={[
                            styles.dailyReport__title,
                            {color: textColor},
                          ]}>
                          {statusCount.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({

// });
