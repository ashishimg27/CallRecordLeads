import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  RefreshControl,
  Dimensions,
  Keyboard,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import font from '../assests/Fonts';
const Width = Dimensions.get('window').width;
export default function Allocation(props) {
  const {sethidefooter} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseSort, setchooseSort] = useState(null);
  const [Assigned, setAssigned] = useState('Me');
  const [selectedStatus, setselectedStatus] = useState([]);
  const [selectedCategory, setselectedCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchbar, setsearchbar] = useState(false);
  const [text, onChangeText] = useState('');
  const sortData = [
    {
      name: 'Name',
      type: 'A-Z',
      id: 1,
    },
    {
      name: 'Date',
      type: 'New to Old',
      id: 2,
    },
    {
      name: 'Date',
      type: 'Old to New',
      id: 3,
    },
    {
      name: 'Priority',
      type: 'Low to High',
      id: 4,
    },
    {
      name: 'Priority',
      type: 'High to Low',
      id: 5,
    },
  ];
  const filterStatus = [
    {
      id: 1,
      name: 'Hot Followup',
    },
    {
      id: 2,
      name: 'Sales Closed',
    },
    {
      id: 3,
      name: 'Cold Followup',
    },
    {
      id: 4,
      name: 'Appointment Fixed',
    },
    {
      id: 5,
      name: 'Not contacted',
    },
    {
      id: 6,
      name: 'Not Interested',
    },
    {
      id: 7,
      name: 'Others',
    },
  ];
  useEffect(() => {
    // Add event listeners for keyboard visibility
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => sethidefooter(true),
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => sethidefooter(false),
    );

    // Clean up the event listeners when the component unmounts
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'rgba(0,0,0,0.06)'}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#FA8661', '#F8325A']}
        />
      }>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['white','white']}
        colors={[
          searchbar ? 'lightgrey' : '#FA8661',
          searchbar ? 'lightgrey' : '#F8325A',
        ]}
        style={{
          height: 40,
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={searchbar ? 'lightgrey' : 'rgba(0,0,0,0.5)'}
        />
      </LinearGradient>
      {searchbar ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 10,
            backgroundColor: 'white',
            paddingHorizontal: 15,
            borderBottomWidth: 0.4,
            borderColor: 'lightgrey',
          }}>
          <TouchableOpacity
            onPress={() => {
              setsearchbar(false);
            }}>
            <Feather
              name="arrow-left"
              size={26}
              color="black"
              style={{marginRight: 15}}
            />
          </TouchableOpacity>

          <TextInput
            style={{height: 50, width: '80%', fontFamily: font.Light}}
            onChangeText={onChangeText}
            value={text}
            placeholderTextColor={'black'}
            autoFocus={true}
            placeholder="Search by Name/Phone/Company"
          />
          <View></View>
        </View>
      ) : (
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
            elevation: 5,
            //   marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: font.SemiBold,
            }}>
            Allocations
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setsearchbar(true);
              }}>
              <Ionicons
                name="search"
                size={26}
                color="white"
                style={{marginRight: 15}}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="filter" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      <View style={{marginBottom: 70}}>
        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 8}}>
          <Ionicons name="arrow-down" size={18} color="#FA8661" />

          <Text
            style={{
              fontSize: 12,
              marginRight: 10,
              color: '#FA8661',
              fontFamily: font.Light,
            }}>
            Swipe down to refresh
          </Text>
        </View>
        <Text style={{color: 'grey', fontSize: 14, margin: 10}}>Total - 0</Text>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            borderStyle: 'dashed',
            borderWidth: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'grey', fontSize: 16, fontFamily: font.Light}}>
            No allocations found
          </Text>
        </View>
      </View>
      {/* Modallllll */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontFamily: font.Regular,
                  }}>
                  Filters
                </Text>
                <Text
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.textStyle}>
                  Done
                </Text>
              </View>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontFamily: font.Light,
                    color: 'black',
                    fontSize: 14,
                  }}>
                  Sort by
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    marginTop: 15,
                  }}>
                  {sortData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setchooseSort(item);
                        }}>
                        <LinearGradient
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 1}}
                          // colors={['white','white']}
                          colors={[
                            chooseSort?.id == item?.id ? '#FA8661' : 'white',
                            chooseSort?.id == item?.id ? '#F8325A' : 'white',
                          ]}
                          style={{
                            width: Width / 4.5,
                            height: Width / 4.5,
                            borderWidth: chooseSort?.id == item?.id ? 0 : 1,
                            borderRadius: 8,
                            borderColor: 'grey',
                            marginHorizontal: index == 0 ? 0 : 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color:
                                chooseSort?.id == item?.id ? 'white' : 'black',
                              fontFamily: font.Light,
                              marginTop: 5,
                            }}>
                            {item?.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              color: 'grey',
                              fontFamily:
                                chooseSort?.id == item?.id
                                  ? font.Bold
                                  : font.Light,
                              marginTop: 5,
                            }}>
                            {item?.type}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontFamily: font.Light,
                    color: 'black',
                    fontSize: 14,
                    marginBottom: 15,
                  }}>
                  Assigned To
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 3,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setAssigned('Me');
                    }}
                    style={{
                      width: '49%',
                    }}>
                    <LinearGradient
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 1}}
                      // colors={['white','white']}
                      colors={[
                        Assigned == 'Me' ? '#FA8661' : 'white',
                        Assigned == 'Me' ? '#F8325A' : 'white',
                      ]}
                      style={{
                        width: '100%',
                        paddingVertical: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Assigned == 'Me' ? 'white' : 'black',
                          fontFamily: font.Light,
                          paddingVertical: 3,
                          // marginTop: 5,
                        }}>
                        Me
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setAssigned('Common');
                    }}
                    style={{
                      width: '49%',
                      // paddingVertical: 4,
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <LinearGradient
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 1}}
                      // colors={['white','white']}
                      colors={[
                        Assigned == 'Common' ? '#FA8661' : 'white',
                        Assigned == 'Common' ? '#F8325A' : 'white',
                      ]}
                      style={{
                        width: '100%',
                        paddingVertical: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Assigned == 'Common' ? 'white' : 'black',
                          fontFamily: font.Light,
                          paddingVertical: 3,

                          // marginTop: 5,
                        }}>
                        Common Pool
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontFamily: font.Light,
                    color: 'black',
                    fontSize: 14,
                    marginBottom: 15,
                  }}>
                  Filter by Status
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}>
                  {filterStatus.map(item => {
                    const isSelected = selectedStatus.includes(item.id);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setselectedStatus(prevIds => {
                            if (isSelected) {
                              // If the item is already selected, remove it
                              return prevIds.filter(id => id !== item.id);
                            } else {
                              // If the item is not selected, add it
                              return [...prevIds, item.id];
                            }
                          });
                        }}>
                        <LinearGradient
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 1}}
                          // colors={['white','white']}
                          colors={[
                            selectedStatus.filter(el => el == item.id).length
                              ? '#FA8661'
                              : 'white',
                            selectedStatus.filter(el => el == item.id).length
                              ? '#F8325A'
                              : 'white',
                          ]}
                          style={{
                            flexDirection: 'row',
                            borderRadius: 20,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'grey',
                            marginHorizontal: 5,
                            marginVertical: 7,
                          }}>
                          <Text
                            style={{
                              fontFamily: font.Light,
                              color: selectedStatus.filter(el => el == item.id)
                                .length
                                ? 'white'
                                : 'black',
                              fontSize: 12,
                            }}>
                            {item?.name}
                          </Text>
                          {selectedStatus.filter(el => el == item.id).length ? (
                            <Ionicons
                              name="close"
                              size={18}
                              color="white"
                              style={{marginLeft: 8}}
                            />
                          ) : null}
                        </LinearGradient>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              {/* filter by  category  */}
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontFamily: font.Light,
                    color: 'black',
                    fontSize: 14,
                    marginBottom: 15,
                  }}>
                  Filter by Category
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}>
                  {filterStatus.map(item => {
                    const isSelected = selectedCategory.includes(item.id);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setselectedCategory(prevIds => {
                            if (isSelected) {
                              // If the item is already selected, remove it
                              return prevIds.filter(id => id !== item.id);
                            } else {
                              // If the item is not selected, add it
                              return [...prevIds, item.id];
                            }
                          });
                        }}>
                        <LinearGradient
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 1}}
                          // colors={['white','white']}
                          colors={[
                            selectedCategory.filter(el => el == item.id).length
                              ? '#FA8661'
                              : 'white',
                            selectedCategory.filter(el => el == item.id).length
                              ? '#F8325A'
                              : 'white',
                          ]}
                          style={{
                            flexDirection: 'row',
                            borderRadius: 20,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'grey',
                            marginHorizontal: 5,
                            marginVertical: 7,
                          }}>
                          <Text
                            style={{
                              fontFamily: font.Light,
                              color: selectedCategory.filter(
                                el => el == item.id,
                              ).length
                                ? 'white'
                                : 'black',
                              fontSize: 12,
                            }}>
                            {item?.name}
                          </Text>
                          {selectedCategory.filter(el => el == item.id)
                            .length ? (
                            <Ionicons
                              name="close"
                              size={18}
                              color="white"
                              style={{marginLeft: 8}}
                            />
                          ) : null}
                        </LinearGradient>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              {/* filter by employmnet  */}
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontFamily: font.Light,
                    color: 'black',
                    fontSize: 14,
                    marginBottom: 15,
                  }}>
                  Filter by Employment
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}>
                  {filterStatus.map(item => {
                    const isSelected = selectedCategory.includes(item.id);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setselectedCategory(prevIds => {
                            if (isSelected) {
                              // If the item is already selected, remove it
                              return prevIds.filter(id => id !== item.id);
                            } else {
                              // If the item is not selected, add it
                              return [...prevIds, item.id];
                            }
                          });
                        }}>
                        <LinearGradient
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 1}}
                          // colors={['white','white']}
                          colors={[
                            selectedCategory.filter(el => el == item.id).length
                              ? '#FA8661'
                              : 'white',
                            selectedCategory.filter(el => el == item.id).length
                              ? '#F8325A'
                              : 'white',
                          ]}
                          style={{
                            flexDirection: 'row',
                            borderRadius: 20,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'grey',
                            marginHorizontal: 5,
                            marginVertical: 7,
                          }}>
                          <Text
                            style={{
                              fontFamily: font.Light,
                              color: selectedCategory.filter(
                                el => el == item.id,
                              ).length
                                ? 'white'
                                : 'black',
                              fontSize: 12,
                            }}>
                            {item?.name}
                          </Text>
                          {selectedCategory.filter(el => el == item.id)
                            .length ? (
                            <Ionicons
                              name="close"
                              size={18}
                              color="white"
                              style={{marginLeft: 8}}
                            />
                          ) : null}
                        </LinearGradient>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modallllll */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '99%',
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#FA8661',
    fontFamily: font.SemiBold,
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
  },
});
