import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Button,
  Text,
  Platform,
  NativeModules,
  Alert,
  PermissionsAndroid,
  Image,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  AppState,
  BackHandler,
  StatusBar,
} from 'react-native';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
const MainHome = props => {
  const PermissionFile = NativeModules.PermissionFileModule;
  const appState = useRef(AppState.currentState);

  const [selectedFolder, setSelectedFolder] = useState([]);
  const [modalVisibal, setmodalVisibal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [currentPath, setcurrentPath] = useState(
    RNFS.ExternalStorageDirectoryPath,
  );
  React.useEffect(() => {
    getLatestFile();
  }, []);
  const getLatestFile = async () => {
    if (Platform.Version >= 30) {
      PermissionFile.checkGrantPermission(
        err => {
          if (err) {
            console.log('Permission Error', err);
          }
        },
        async success => {
          if (success) {
            getallFolder(currentPath);
          }
        },
      );
    } else {
      // For API 29 and below (Android 10 and below)
      checkingWritePermission();
    }
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
        getallFolder(currentPath);
        // You can use RN-fetch-blog to download file and storge into download Manager
        console.log('Access granted!');
      } else {
        console.log('Access to external storage failed.');
      }
    } catch (error) {
      console.log('Access to external storage failed.');
    }
  };
  const getallFolder = path => {
    RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result);
        setSelectedFolder(result);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };
  const isFolder = name => {
    let itsfolder = name.includes('.');
    return itsfolder;
  };
  const createFolder = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permission',
          message: 'swahiliPodcast needs to read storage ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //DO SOMETHING
        console.log(
          "currentPath +'/'+ folderName",
          currentPath + '/' + folderName,
        );
        const OsVer = Platform.constants['Release'];
        let path;
        if (OsVer > 10) {
          path = `/storage/emulated/0/Android/${folderName}`;
        } else {
          path = currentPath + '/' + folderName;
        }
        console.log('pathpathpath', path);
        RNFS.mkdir(path)
          .then(res => {
            setcurrentPath(path);
            getallFolder(path);
            setFolderName('');
          })
          .catch(err => {
            console.log(err);
          });
        //END OF DOING SOMETHINGS
      } else {
        console.log(
          'Permission Denied!',
          'You need to give  permission to see contacts',
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendPath = async () => {
    await AsyncStorage.setItem('path', currentPath);
    props.navigation.navigate('BottomNavigator');
  };
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }
        appState.current = nextAppState;
        if (appState.current == 'active') {
          getallFolder(currentPath);
        }
      },
    );
    return () => {
      subscription.remove();
    };
  }, []);

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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
        }}>
        <View style={{width: '100%', flexDirection: 'row', margin: 20}}>
          {currentPath == RNFS.ExternalStorageDirectoryPath ? null : (
            <Text
              style={{fontWeight: '700'}}
              onPress={() => {
                setcurrentPath(RNFS.ExternalStorageDirectoryPath);
                getallFolder(RNFS.ExternalStorageDirectoryPath);
              }}>
              Back
            </Text>
          )}
          <Text style={{color: 'black', marginLeft: 20}}>{currentPath}</Text>
        </View>
        <View>
          <FlatList
            numColumns={2}
            data={selectedFolder}
            renderItem={({item}, index) => {
              return (
                <>
                  <TouchableOpacity
                    style={{
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 100,
                    }}
                    onPress={() => {
                      if (!isFolder(item.name)) {
                        setcurrentPath(currentPath + '/' + item.name);
                        getallFolder(currentPath + '/' + item.name);
                      }
                    }}>
                    {isFolder(item.name) ? (
                      <Image
                        source={require('../assests/file.png')}
                        style={{height: 50, width: 50}}
                      />
                    ) : (
                      <Image
                        source={require('../assests/folder.png')}
                        style={{height: 50, width: 50}}
                      />
                    )}
                    <Text style={{color: 'black'}}>
                      {item.name.length > 20
                        ? item.name.substring(0, 10) + '...'
                        : item.name}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
        {/* {selectedFolder.map(item => {
        return (
          <View>
            {
                isFolder(item.name) ?
                <View>
                    </View> : <Image  source ={require('./src/folder.png')} style={{height:50,width:50}}/>
            }
            <Text>{item.name}</Text>
          </View>
        );
      })} */}
      </ScrollView>
      <TouchableOpacity
        disabled={
          currentPath == RNFS.ExternalStorageDirectoryPath ? true : false
        }
        style={{
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            currentPath == RNFS.ExternalStorageDirectoryPath
              ? 'grey'
              : '#6CB4EE',
        }}
        onPress={() => {
          sendPath();
        }}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
          Use This Folder
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('djshd');
          setmodalVisibal(true);
        }}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 70,
          backgroundColor: '#000',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#FFF', fontSize: 25}}>+</Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={modalVisibal}
        onRequestClose={() => {
          setmodalVisibal(false);
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              height: 200,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Enter Folder Name"
              onChangeText={text => {
                setFolderName(text);
              }}
              style={{
                width: '90%',
                height: 50,
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 50,
                paddingLeft: 20,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setmodalVisibal(false);
                createFolder();
              }}
              style={{
                marginTop: 20,
                alignSelf: 'center',
                width: '90%',
                height: 50,
                borderRadius: 10,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 18}}>Create Folder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default MainHome;
