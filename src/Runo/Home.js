import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';

const tabData = [
  {title: 'Today', id: '1'},
  {title: 'Last 7 days', id: '2'},
  {title: 'Last 30 days', id: '3'},
  {title: 'Last 6 months', id: '4 '},
];

const inBoundData = [
  {id: '1', count: '26', callType: 'RECEIVED', iconName: 'arrow-bottom-left'},
  {id: '2', count: '14', callType: 'MISSED', iconName: 'call-missed'},
  {id: '3', count: '12', callType: 'ANSWERED', iconName: 'phone'},
  {
    id: '4',
    count: '8',
    callType: 'INCOMING PERSONAL',
    iconName: 'account-outline',
  },
];
const callData = [
  {id: '1', title: 'Avg. Talktime', duration: '1m 11s'},
  {id: '2', title: 'Total Talktime', duration: '1hrs 31m 14s'},
  {id: '3', title: 'Break Time', duration: ' 0m 0s'},
  {id: '4', title: 'Idle Time', duration: 'N/A'},
  {id: '5', title: 'Wrapup Time', duration: '1hrs 31m 14s'},
  {id: '6', title: 'Avg. Login Time', duration: 'N/A'},
];
const Home = () => {
  const [selectedTab, setSelectedTab] = useState('Today');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FA8661', '#F8325A']}
          style={styles.headerLiner}>
          <StatusBar
            translucent={true}
            backgroundColor={'rgba(0, 0, 0, 0.5)'}
          />
          <View style={styles.headerTop__container}>
            <Text style={styles.logo}>RUNO</Text>
            <View style={styles.headerTopLeft__container}>
              <Fontisto name="arrow-swap" size={20} color={'white'} />
              <Ionicons name="people" size={20} color={'white'} />
            </View>
          </View>
          <View style={styles.profileMain__container}>
            <View style={styles.profile__container}>
              <Text style={styles.profileName}>Rutakshi Technologies</Text>
              <Text style={styles.subProfile}>Vamsi</Text>
              <View style={styles.callingType__container}>
                <View style={styles.callingTypeIcon__container}>
                  <Fontisto name="arrow-swap" size={12} color={'white'} />
                </View>
                <Text style={styles.callingType__text}>Calling process</Text>
              </View>
            </View>
            <View style={styles.profileRightIcons__container}>
              <MaterialCommunityIcons
                name="tea-outline"
                size={25}
                color={'white'}
              />
              <View onTouchEnd={() => navigation.navigate('RenoDemo')}>
                <FontAwesome6 name="power-off" size={25} color={'white'} />
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.body__container}>
          <ScrollView
            contentContainerStyle={styles.tabs__container}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {tabData?.map((tab, index) => {
              return selectedTab === tab.title ? (
                <View key={index}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#FA8661', '#F8325A']}
                    style={styles.selectedTab__container}>
                    <View style={styles.tabTextIcon__container}>
                      <Text style={[styles.tabText, styles.selectedText]}>
                        {tab.title}
                      </Text>
                      <EvilIcons name="close" size={17} color={'white'} />
                    </View>
                  </LinearGradient>
                </View>
              ) : (
                <View
                  style={styles.unselectedTab__container}
                  key={index}
                  onTouchEnd={() => setSelectedTab(tab.title)}>
                  <Text style={styles.tabText}>{tab.title}</Text>
                </View>
              );
            })}

            {/* <View style={styles.unselectedTab__container}>
            <Text>Today</Text>
          </View> */}
          </ScrollView>
          <View style={styles.Inbond__container}>
            <View style={styles.inboundHeadingIcon__container}>
              <Text style={styles.inbound__text}>INBOND</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={25}
                color={'#FA8661'}
              />
            </View>
            <ScrollView
              style={styles.inboundTop__container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {inBoundData.map((el, id) => (
                <View style={styles.inbondBox__container} key={id}>
                  <MaterialCommunityIcons
                    name={el.iconName}
                    size={20}
                    color={'#FA8661'}
                  />
                  <Text style={styles.boxCount}>{el.count}</Text>
                  <Text style={styles.boxCallType}>{el.callType}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.callTime__container}>
            {callData.map((item, ind) => (
              <View key={ind}>
                <View style={styles.callTime__subContainer}>
                  <Text
                    style={{fontSize: 18, color: 'black', fontWeight: '400'}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{fontSize: 18, color: 'black', fontWeight: '400'}}>
                    {item.duration}
                  </Text>
                </View>
                {ind < callData.length - 1 ? (
                  <View style={{backgroundColor: 'lightgrey', height: 1}} />
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLiner: {
    // height: '25%',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTop__container: {
    marginTop: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: 'white',
    fontSize: 18,
  },
  headerTopLeft__container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '20%',
  },
  profileMain__container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile__container: {flex: 1},
  profileName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  subProfile: {
    color: 'white',
    marginVertical: 5,
    fontSize: 18,
  },
  callingType__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '55%',
  },
  callingTypeIcon__container: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 999,
    padding: 5,
    transform: [{rotate: '90deg'}],
  },
  callingType__text: {
    color: 'white',
    fontSize: 16,
  },
  profileRightIcons__container: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  body__container: {
    margin: 15,
    alignItems: 'center',
  },
  tabs__container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTab__container: {
    paddingHorizontal: 15,
    borderRadius: 999,
    paddingVertical: 7,
    marginRight: 10,
    alignItems: 'center',
  },
  tabTextIcon__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    marginRight: 5,
    color: 'white',
  },
  unselectedTab__container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 15,
    borderRadius: 999,
    paddingVertical: 7,
    marginRight: 10,
    alignItems: 'center',
  },
  Inbond__container: {
    marginTop: 30,
    width: '100%',
  },

  inboundHeadingIcon__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inbound__text: {
    fontSize: 18,
  },
  inboundTop__container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  inbondBox__container: {
    backgroundColor: 'white',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3.9,
    height: height / 7.5,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 5,
    marginVertical: 3,
    marginLeft: 3,
  },
  boxCount: {
    color: 'black',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
  },
  boxCallType: {
    fontSize: 12,
  },
  callTime__container: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 5,
    // paddingVertical: 10,
    elevation: 5,
  },
  callTime__subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgrey',
  },
});
