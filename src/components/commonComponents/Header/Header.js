import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Color} from '../../../styles/Colors';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.HeaderContainer}>
      <View
        style={styles.backIcon__container}
        onTouchEnd={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left-long" color={Color.black} size={20} />
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      <FontAwesome6
        name="sliders"
        color={Color.white}
        size={25}
        style={styles.rotatedIcon}
      />
    </View>
  );
};

export default Header;
