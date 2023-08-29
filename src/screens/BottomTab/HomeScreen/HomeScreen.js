import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './style';

const DailyReportData = [
  {title: 'Newly Added', count: '1388'},
  {title: 'Important', count: '5'},
  {title: 'Followup', count: '5'},
  {title: 'Closed', count: '3'},
  {title: 'Not Intrested', count: '2'},
  {title: 'Raw Leads', count: '2'},
  {title: 'Not Answered', count: '2'},
  {title: 'Waiting List', count: '0'},
  {title: 'Intrested', count: '9'},
  {title: 'Withdraw', count: '0'},
  {title: 'Defered', count: '0'},
  {title: 'Walk in', count: '0'},
  {title: 'Call', count: '0'},
  {title: 'Bharat', count: '0'},
  {title: 'Bharath', count: '0'},
  {title: '', count: ''},
  {title: 'call imd', count: ''},
  {title: 'call me back', count: '0'},
  {title: 'end', count: '0'},
  {title: 'CALL ASAP', count: '2'},
  {title: '', count: ''},
];
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.heading__container}>
          <Text style={styles.heading}>Recorderr</Text>
        </View>
        <View style={styles.user__container}>
          <Text style={styles.userName}>WELCOME ROHIT</Text>
          <Text style={styles.greetText}>Have a nice day!</Text>
        </View>
        <View style={styles.body__container}>
          <Text style={styles.body__heading}>Daily Reports</Text>
          <View style={styles.reports__container}>
            {DailyReportData?.map((Dailyreport, index) => {
              const randomColor = `#${Math.floor(
                Math.random() * 16777215,
              ).toString(16)}`;
              return (
                <TouchableOpacity
                  style={[styles.report_box, {backgroundColor: randomColor}]}
                  key={index}
                  onPress={() => navigation.navigate('LeadsData')}>
                  <Text style={styles.dailyReport__count}>
                    {Dailyreport.count}
                  </Text>
                  <Text style={styles.dailyReport__title}>
                    {Dailyreport.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({

// });
