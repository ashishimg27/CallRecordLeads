import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const Test2 = () => {
  const [selectedFolderPath, setSelectedFolderPath] = useState(null);
  const [latestFile, setLatestFile] = useState(null);
  const [filesInFolder, setFilesInFolder] = useState([]);

  const openFolderPicker = async () => {
    // try {
    //   RNFS.readDir(RNFS.ExternalStorageDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //     .then(result => {
    //       console.log('GOT RESULT', result[16].path);
    //       if (result[16].path) {
    //         // Set the selected folder path
    //         setSelectedFolderPath(result[16].path);
    //         // Get the list of files in the selected folder

    //         loadFilesFromFolder(result.uri);
    //         RNFS.readdir(result[16].path)
    //           .then(result => {
    //             console.log('resultyy', result);
    //             // Sort the files by modification date in descending order
    //             result.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    //             // Get the latest file
    //             const latest = result[0];
    //             setLatestFile(latest);
    //             // Open the latest file using the device's file manager
    //             RNFS.openDocument(latest.path);
    //           })
    //           .catch(error => {
    //             console.error('Error reading directory:', error);
    //           });
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err.message, err.code);
    //     });
    //   //   if (result[7].path) {
    //   //     // Set the selected folder path
    //   //     setSelectedFolderPath(result.uri);
    //   //     // Get the list of files in the selected folder
    //   //     RNFS.readDir(result.uri)
    //   //       .then(result => {
    //   //         // Sort the files by modification date in descending order
    //   //         result.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    //   //         // Get the latest file
    //   //         const latest = result[0];
    //   //         setLatestFile(latest);
    //   //         // Open the latest file using the device's file manager
    //   //         RNFS.openDocument(latest.path);
    //   //       })
    //   //       .catch(error => {
    //   //         console.error('Error reading directory:', error);
    //   //       });
    //   //   }
    // } catch (error) {
    //   if (DocumentPicker.isCancel(error)) {
    //     // User cancelled the picker
    //     console.log('User cancelled');
    //   } else {
    //     // Handle other errors
    //     console.error('Error:', error);
    //   }
    // }

    RNFS.readDir(RNFS.ExternalStorageDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result[7].path);
        loadFilesFromFolder(result[7].path);
        // setSelectedFolder(result);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  const loadFilesFromFolder = async folderPath => {
    try {
      const files = await RNFS.readdir(folderPath);
      const filesWithPath = files.map(file => ({
        name: file,
        path: `${folderPath}/${file}`,
      }));
      console.log(filesWithPath, 'fileeeeeeeee');
      setFilesInFolder(filesWithPath);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  return (
    <View>
      <Button title="Open Folder Picker" onPress={openFolderPicker} />
      <FlatList
        data={filesInFolder}
        keyExtractor={item => item.path}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => RNFS.openDocument(item.path)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Test2;

const styles = StyleSheet.create({});
