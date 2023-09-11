import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  Linking,
  Alert,
  FlatList,
  NativeModules,
  PermissionsAndroid,
  Platform,
  AppState,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, memo, useRef} from 'react';
import Header from '../../components/commonComponents/Header/Header';
import styles from './style';
import CallDetectorManager from 'react-native-call-detection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../styles/Colors';
import SelectOptons from '../../components/commonComponents/SelectOptions/SelectOptons';
import PrimaryButton from '../../components/commonComponents/PrimaryButton/PrimaryButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../components/commonComponents/LoadingComponent/LoadingComponent';
import RNFS from 'react-native-fs';

import {request, PERMISSIONS} from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
// const callData = [
//   {
//     name: 'Abdul',
//     number: '7007153446',
//     type: 'Important',
//     label: '',
//   },
//   {
//     name: 'Suhas Redd',
//     number: '9652036899',
//     type: 'Important',
//     label: '',
//   },
//   {
//     name: 'Riya A',
//     number: '123456789',
//     type: 'Important',
//     label: 'High Priority',
//   },
//   {
//     name: 'Pawan Mend',
//     number: '987654321',
//     type: 'Important',
//     label: '',
//   },
//   {
//     name: 'Abhinav th',
//     number: '8765434567',
//     type: 'Important',
//     label: 'Label two',
//   },
//   {
//     name: 'Krish M',
//     number: '676545678',
//     type: 'Important',
//     label: 'Intrested',
//   },
// ];

// const LeadsOptionData = [
//   {label: 'Item 1', value: '1'},
//   {label: 'Item 2', value: '2'},
//   {label: 'Item 3', value: '3'},
//   {label: 'Item 4', value: '4'},
//   {label: 'Item 5', value: '5'},
//   {label: 'Item 6', value: '6'},
//   {label: 'Item 7', value: '7'},
//   {label: 'Item 8', value: '8'},
// ];
// const LabalOptionData = [
//   {label: 'Value 1', value: '1'},
//   {label: 'Value 2', value: '2'},
//   {label: 'Value 3', value: '3'},
//   {label: 'Value 4', value: '4'},
//   {label: 'Value 5', value: '5'},
//   {label: 'Value 6', value: '6'},
//   {label: 'Value 7', value: '7'},
//   {label: 'Value 8', value: '8'},
// ];
const PermissionFile = NativeModules.PermissionFileModule;

const Item = memo(({lead, goToDial, setModalVisible, setCallerId}) => (
  <View style={styles.callDetail__container}>
    <View style={styles.callerDetail__container}>
      <View onTouchEnd={() => goToDial(lead.mobile, lead.id)}>
        <Ionicons name="call" color={'#FA8661'} size={30} />
      </View>
      <View style={styles.callerName_phone}>
        <Text style={styles.CallerName}>{lead?.fname}</Text>
        <Text>{lead?.mobile}</Text>
      </View>
    </View>
    <View style={styles.typeLabel}>
      <Text style={styles.smallText}>
        {lead?.public_student_status
          ? lead?.public_student_status
          : 'No Status'}
      </Text>
      <Text style={styles.smallText}>
        {lead?.student_label_name ? lead?.student_label_name : 'No Label'}
      </Text>
    </View>
    <Pressable
      onPress={() => {
        setModalVisible(true);
        console.log(lead?.id, 'inner');
        setCallerId(lead?.id);
      }}>
      <Entypo name="dots-three-horizontal" color={'#F8325A'} size={30} />
    </Pressable>
  </View>
));
const LeadsData = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [remark, onChangeRemark] = React.useState('');
  const [selectedLeads, setSelectedLeads] = useState(null);
  const [selectedLabal, setSelectedLabal] = useState(null);
  const [leadsData, setLeadsData] = useState([]);
  const [leadsStatus, setLeadsStatus] = useState([]);
  const [labels, setLabels] = useState([]);
  const [callerId, setCallerId] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [callStates, setCallStates] = useState([]);
  const [pathdata, setpathData] = useState();
  console.log(callerId, '??///////////////////////');
  const handleCanel = () => {
    setModalVisible(!modalVisible);
    setSelectedLeads(null);
    setSelectedLabal(null);
  };

  const applyHandle = () => {
    console.log('apply');
    updateLeadStatus();
    // updateStudentLabel();
    setModalVisible(!modalVisible);
    setSelectedLeads(null);
    setSelectedLabal(null);
  };

  const getLeadsData = async () => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const params = {
      api_service_id: 'customer.api',
      api_command: 'fetch.api',
      public_api_key: publicApiKey,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
      tag_student: 'lead',
      filterdata: '1',
      filter_lead_status: id,
      except_pagenation: '1',
    };

    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=${params.api_service_id}&api_command=${params.api_command}&public_api_key=${params.public_api_key}&app_key=${params.app_key}&tag_student=${params.tag_student}&filterdata=${params.filterdata}&filter_lead_status[]=${params.filter_lead_status}&except_pagenation=${params.except_pagenation}`,
      );
      const slicedDataArray = response.data.slice(0, -1);
      // console.log(response.data, 'initial response');
      setLeadsData(slicedDataArray);
      setIsLoading(false);
    } catch (error) {
      console(error.response);
    }
  };

  const getLeadStatus = async () => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const params = {
      api_service_id: 'customer.api',
      api_command: 'fetch.status.api',
      public_api_key: publicApiKey,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
    };

    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=${params.api_service_id}&api_command=${params.api_command}&public_api_key=${params.public_api_key}&app_key=${params.app_key}`,
      );
      // console.log(response.data, '<<<<<<<< LEADS STATUS>>>>>>>>>>');
      setLeadsStatus(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getLabels = async () => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const params = {
      api_service_id: 'customer.labels.api',
      api_command: 'fetch.api',
      public_api_key: publicApiKey,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
    };

    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=${params.api_service_id}&api_command=${params.api_command}&public_api_key=${params.public_api_key}&app_key=${params.app_key}`,
      );
      // console.log(response.data, '<<<<<<<< LABELS  >>>>>>>>>>');
      setLabels(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateLeadStatus = async () => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const params = {
      api_service_id: 'customer.api',
      api_command: 'update.student.status.api',
      public_api_key: publicApiKey,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
      tag_student: 'lead',
      user_id: callerId,
      lead_status: selectedLeads.id,
      addnote: 'Hello World',
    };
    console.log(params, 'Updat Leads param');
    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=${params.api_service_id}&api_command=${params.api_command}&public_api_key=${params.public_api_key}&app_key=${params.app_key}&tag_student=${params.tag_student}&user_id=${params.user_id}&lead_status=${params.lead_status}&addnote=${params.addnote}`,
      );
      console.log(response.data, 'updateLeadsStatus response');
      if (response.status == 200) {
        updateStudentLabel();
        // getLeadsData();
        // Alert.alert('Success!', 'Successfully Leads Update');
      }
    } catch (error) {
      console.log(error.response.data, 'leads update error');
    }
  };

  const updateStudentLabel = async () => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const params = {
      api_service_id: 'customer.api',
      api_command: 'update.student.label.api',
      public_api_key: publicApiKey,
      app_key:
        'b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c',
      tag_student: 'lead',
      user_id: callerId,
      label_id: selectedLabal.id,
      addnote: remark,
    };
    console.log(params, 'Updat label param');
    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=${params.api_service_id}&api_command=${params.api_command}&public_api_key=${params.public_api_key}&app_key=${params.app_key}&tag_student=${params.tag_student}&user_id=${params.user_id}&label_id=${params.label_id}&addnote=${params.addnote}`,
      );
      console.log(response.status, 'update label response');
      if (response.status == 200) {
        getLeadsData();
        Alert.alert('Success!', 'Successfully  Update');
      }
    } catch (error) {
      console.log(error.response.data, 'label update error');
    }
  };

  let callDetector = '';
  const startListener = (num, callid) => {
    console.log('Start');
    callDetector = new CallDetectorManager(
      (event, number) => {
        console.log('event -> ', event + (number ? ' - ' + number : ''));
        var updatedCallStates = callStates;
        updatedCallStates.push(event + (number ? ' - ' + number : ''));
        // setFlatListItems(updatedCallStates);
        setCallStates(updatedCallStates);

        // For iOS event will be either "Connected",
        // "Disconnected","Dialing" and "Incoming"

        // For Android event will be either "Offhook",
        // "Disconnected", "Incoming" or "Missed"
        // phoneNumber should store caller/called number

        if (event === 'Disconnected') {
          console.log('Disconnected     000000000000>>>>>>>>>>>>>>>>>>>>>>>>');
          setTimeout(() => {
            getLatestFile(callid);
          }, 5000);

          // Do something call got disconnected
        } else if (event === 'Connected') {
          console.log('Connected     >>>>>>>>>>>>>>>>>>>>>>>>');
          // Do something call got connected
          // This clause will only be executed for iOS
        } else if (event === 'Incoming') {
          console.log('Incoming     >>>>>>>>>>>>>>>>>>>>>>>>');
          // Do something call got incoming
        } else if (event === 'Dialing') {
          console.log('Dialing     >>>>>>>>>>>>>>>>>>>>>>>>');
          // Do something call got dialing
          // This clause will only be executed for iOS
        } else if (event === 'Offhook') {
          console.log('Offhook     >>>>>>>>>>>>>>>>>>>>>>>>');
          //Device call state: Off-hook.
          // At least one call exists that is dialing,
          // active, or on hold,
          // and no calls are ringing or waiting.
          // This clause will only be executed for Android
        } else if (event === 'Missed') {
          console.log('Missed     >>>>>>>>>>>>>>>>>>>>>>>>');
          // Do something call got missed
          // This clause will only be executed for Android
        }
      },
      // true, // To detect incoming calls [ANDROID]
      // () => {
      //   // If your permission got denied [ANDROID]f
      //   // Only if you want to read incoming number
      //   // Default: console.error
      //   console.log('Permission Denied by User');
      // },
      // {
      //   title: 'Phone State Permission',
      //   message:
      //     'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      // },
    );
    //
  };

  const goToDial = (number, callid) => {
    if (Platform.OS === 'android') {
      // Request the READ_PHONE_STATE permission
      request(PERMISSIONS.ANDROID.READ_PHONE_STATE)
        .then(result => {
          if (result === 'granted') {
            // Permission granted, you can access phone state
            console.log(callid, 'goto console');
            startListener(number, callid);
            // const dialerURL = 'tel:7007153446';
            const dialerURL = `tel:${number}`;
            console.log('dialerURL', dialerURL);
            Linking.openURL(dialerURL).catch(err =>
              console.error('An error occurred', err),
            );
            console.log('READ_PHONE_STATE permission granted');
          } else {
            // Permission denied
            console.log('READ_PHONE_STATE permission denied');
          }
        })
        .catch(error => {
          // Handle error if any
          console.error('Error requesting permission: ', error);
        });
    }
  };

  const getpath = async () => {
    let path = await AsyncStorage.getItem('path');
    console.log('pathbottom', path);
    setpathData(path);
    return path;
  };

  const getLatestFile = async callid => {
    const path = await getpath();

    if (Platform.Version >= 30) {
      PermissionFile.checkGrantPermission(
        err => {
          if (err) {
            console.log('Permission Error', err);
          }
        },
        async success => {
          if (success) {
            console.log('pathdatapathdata', pathdata);
            const files = await RNFS.readDir(path);
            const newData = files.filter(item => {
              return item.path.includes('.mp3');
            });
            console.log('filesfilesfilesfilesfiles', newData);

            // Sort the files by modification time in descending order
            newData.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
            // Get the latest file

            const latestFile = newData[0];
            if (latestFile) {
              console.log('Latest Podcast File:', latestFile);
              console.log('File Path:', latestFile.path);
              fetchServer(latestFile, callid);
            }
          }
        },
      );
    } else {
      // For API 29 and below (Android 10 and below)
      checkingWritePermission();
    }
    // const OsVer = Platform.constants['Release'];
    // if (OsVer < 13) {
    //   console.log('pathdatapathdata', pathdata);
    //   const files = await RNFS.readDir(pathdata);
    //   console.log('filesfilesfilesfilesfiles', files);
    //   // Sort the files by modification time in descending order
    //   files.sort((a, b) => b.mtime - a.mtime);
    //   // Get the latest file
    //   const latestFile = files[0];
    //   if (latestFile) {
    //     console.log('Latest Podcast File:', latestFile);
    //     console.log('File Path:', latestFile.path);
    //     fetchServer(latestFile);
    //   }
    // } else {
    //   try {
    //     const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    //     if (result === 'granted') {
    //       console.log('Read external storage permission granted');
    //       console.log('pathdatapathdata', pathdata);
    //       const files = await RNFS.readDir(pathdata);
    //       console.log('filesfilesfilesfilesfiles', files);
    //       // Sort the files by modification time in descending order
    //       files.sort((a, b) => b.mtime - a.mtime);
    //       // Get the latest file
    //       const latestFile = files[0];
    //       if (latestFile) {
    //         console.log('Latest Podcast File:', latestFile.name);
    //         console.log('File Path:', latestFile.path);
    //         fetchServer(latestFile);
    //         // You can now access external storage
    //       }
    //     } else if (result === 'blocked') {
    //       console.log('Read external storage permission blocked');
    //       // Prompt the user to open app settings
    //       Alert.alert(
    //         'Permission Blocked',
    //         'You have blocked external storage access. Please enable it in your device settings.',
    //         [
    //           {
    //             text: 'Open Settings',
    //             onPress: () => Linking.openSettings(),
    //           },
    //           {
    //             text: 'Cancel',
    //             onPress: () =>
    //               console.log('Permission blocked and user canceled.'),
    //             style: 'cancel',
    //           },
    //         ],
    //       );
    //     } else {
    //       console.log('Read external storage permission denied');
    //       // Handle permission denial
    //     }
    //   } catch (error) {
    //     console.error('Error requesting permission: ', error);
    //     // Handle any errors that occur during the permission request
    //   }
    // }
  };
  const checkingWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
      ) {
        console.log('pathdatapathdata', pathdata);
        const files = await RNFS.readDir(pathdata);
        console.log('filesfilesfilesfilesfiles', files);
        // Sort the files by modification time in descending order
        files.sort((a, b) => b.mtime - a.mtime);
        // Get the latest file
        const latestFile = files[0];
        if (latestFile) {
          console.log('Latest Podcast File:', latestFile);
          console.log('File Path:', latestFile.path);
          fetchServer(latestFile);
        }
        // You can use RN-fetch-blog to download file and storge into download Manager
        console.log('Access granted!');
      } else {
        console.log('Access to external storage failed.');
      }
    } catch (error) {
      console.log('Access to external storage failed.');
    }
  };

  const fetchServer = async (latestFile, callid) => {
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');

    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service?api_service_id=server.api&api_command=fetch.api&public_api_key=${publicApiKey}&app_key=b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c`,
      );
      // console.log(response.data, '<<<<<<<< LABELS  >>>>>>>>>>');
      console.log(response?.data[0]?.server_domain, 'fetch serverrrrrrrrrrr');
      postUploadAudio(response?.data[0]?.server_domain, latestFile, callid);
    } catch (error) {
      console.log(error.response);
    }
  };

  // const postUploadAudio = async (serverDomain, latestFile) => {
  //   // const formData = new FormData();
  //   // formData.append('sendfile', {
  //   //   uri: latestFile?.path,
  //   //   type: 'audio/mp3',
  //   //   name: latestFile?.name, // You can specify any desired name here
  //   // });
  //   // try {
  //   //   const response = await axios.post(
  //   //     `https://${serverDomain}/gallery/receiver?app_key=b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c`,
  //   //     formData,
  //   //     {
  //   //       headers: {
  //   //         Accept: 'application/json',
  //   //         'Content-Type': 'multipart/form-data',
  //   //       },
  //   //     },
  //   //   );
  //   //   console.log(response?.data, 'senddddddddddd');
  //   // } catch (error) {
  //   //   console.log(error, 'eeeeeeeerrrrrrrrr');
  //   // }
  //   let formData = new FormData();
  //   formData.append('sendfile', {
  //     uri: latestFile?.path,
  //     name: latestFile?.path,
  //     type: 'audio/mp3',
  //   });

  //   let options = {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };

  //   const response = await fetch(
  //     `https://${serverDomain}/gallery/receiver?app_key=b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c`,
  //     options,
  //   )
  //     .then(res => {
  //       console.log('ressss', res.data);
  //     })
  //     .catch(error => {
  //       console.log('errorrr', error);
  //     });
  // };

  const postUploadAudio = async (serverDomain, latestFile, callid) => {
    console.log(serverDomain, latestFile, callid, '*******************');
    try {
      let formData = new FormData();
      formData.append('sendfile', {
        uri: `file://${latestFile?.path}`,
        name: latestFile?.path,
        type: 'audio/mp3',
      });

      let options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
      const apiurl = `https://${serverDomain}/gallery/receiver?app_key=b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c`;
      const response = await fetch(apiurl, options);

      // Check for a successful response
      if (response.status === 200) {
        const data = await response.json();
        console.log('Response Data:', data[0].filename);
        getSendAudio(data[0].filename, callid);
      } else {
        console.log('HTTP Error:', response.status);
      }
    } catch (error) {
      console.log('Network Error:', error.message, error?.response);
    }
  };

  const getSendAudio = async (mp3file, callid) => {
    console.log(callid, 'mp3333333');
    const publicApiKey = await AsyncStorage.getItem('publicApiKey');
    const userData = await AsyncStorage.getItem('userData');
    try {
      const response = await axios.get(
        `https://two.areksoft.com/recordrr/auth/check.service1?api_service_id=enquiry.notes.api&api_command=save.api&public_api_key=${publicApiKey}&app_key=b8542e513e0d24063461a85a91692a6c93e61781d2e0e84dd38df1e10ac27c69c6d7a07961b605e1680973edd5f8cdb699cbf893ebc75b38e974db20c2a46d534c14b6b1c&user_id=${callid}&notes=Sample&from_id=${userData.id}&sendfile=${mp3file}&tag_student=lead`,
      );
      console.log(response.data, 'sendAudio response');
    } catch (error) {
      console.log(error, 'send Audio error');
    }
  };

  useEffect(() => {
    getpath();
    setIsLoading(true);
    getLeadsData();
    getLeadStatus();
    getLabels();
  }, []);

  console.log('aaaaaaaaaa', pathdata);

  return (
    <>
      {/* <Header title="All Follow-ups" /> */}

      {/* <View style={styles.mainContainer}> */}
      {isLoading === true ? (
        <View style={styles.loadingStyle}>
          <LoadingComponent />
        </View>
      ) : (
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
              //   marginHorizontal: 20,
            }}>
            <View onTouchEnd={() => navigation.navigate('Home')}>
              <Feather name="arrow-left" size={30} color="white" />
            </View>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
              All Follow-ups
            </Text>
            <Ionicons name="people" size={30} color="white" />
          </LinearGradient>
          <View style={styles.mainContainer}>
            <View style={styles.topHeading__container}>
              <Text style={styles.topHeading}>
                Showing all {leadsData?.length} actions
              </Text>
              <Text style={styles.topHeading}>Actions</Text>
            </View>
            {/* <View style={styles.date__container}>
              <Text style={styles.smallText}>03 Aug 2023, 12:50:35 pm</Text>
            </View> */}
            <View style={styles.callLogs__container}>
              <FlatList
                data={leadsData}
                renderItem={({item}) => (
                  <Item
                    lead={item}
                    setModalVisible={setModalVisible}
                    goToDial={goToDial}
                    setCallerId={setCallerId}
                  />
                )}
                // keyExtractor={item => item.id}
              />
              {/* {leadsData?.map((lead, index) => (
            <View style={styles.callDetail__container} key={index}>
              <View style={styles.callerDetail__container}>
                <View onTouchEnd={() => goToDial(lead.mobile)}>
                  <Ionicons name="call" color={Color.green} size={30} />
                </View>
                <View style={styles.callerName_phone}>
                  <Text>{lead?.fname}</Text>
                  <Text>{lead?.mobile}</Text>
                </View>
              </View>
              <View style={styles.typeLabel}>
                <Text style={styles.smallText}>Important</Text>
                <Text style={styles.smallText}>
                  {lead?.public_student_status
                    ? lead?.public_student_status
                    : 'No Label'}
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(true)}>
                <Entypo
                  name="dots-three-horizontal"
                  color={'lightblue'}
                  size={30}
                />
              </Pressable>
            </View>
          ))} */}
            </View>
          </View>
        </>
      )}
      {/* </View> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>Take an action</Text>
            <SelectOptons
              label={'Leads'}
              optionData={leadsStatus}
              setSelectedOption={setSelectedLeads}
            />
            <SelectOptons
              label={'Labal'}
              optionData={labels}
              setSelectedOption={setSelectedLabal}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeRemark}
              value={remark}
              placeholder="REMARKS"
            />
            <View style={styles.modalBottom__container}>
              <PrimaryButton btnLabel={'Cancel'} btnHandle={handleCanel} />
              <PrimaryButton btnLabel={'Apply'} btnHandle={applyHandle} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LeadsData;
