import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Color} from '../../../styles/Colors';

const UserProfile = () => {
  const [path, setPath] = useState('../../../styles/Colors');
  return (
    <View style={styles.container}>
      <View style={styles.topCircle__container} />
      <Text style={styles.Profile_text}>Profile</Text>
      <View style={styles.main__container}>
        <View style={styles.UserDetails__container}>
          <Image
            source={{uri: 'https://www.computerhope.com/jargon/b/black.jpg'}}
            style={styles.userProfilePic}
          />
          <Text style={styles.userPosition}>UI/UX Designer </Text>
          <View style={styles.aboutUser__container}>
            <View style={styles.userLocation__container}>
              <View style={styles.Icon}>
                <FontAwesome
                  name="map-marker"
                  color={Color.primary}
                  size={15}
                />
              </View>
              <Text>Malang, Indonesia</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.completedTask__container}>
              <View style={styles.Icon}>
                <FontAwesome name="briefcase" color={Color.primary} size={15} />
              </View>
              <Text>2653 Task Completed</Text>
            </View>
          </View>
        </View>
        <View style={styles.storagePath__container}>
          <Text style={styles.storage__heading}>Storage Path</Text>
          <View style={styles.Editpath__container}>
            <Text style={styles.pathText}>{path}</Text>
            <View>
              <Feather name="edit" size={30} color={'black'} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
