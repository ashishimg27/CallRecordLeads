import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';

const PrimaryButton = ({btnLabel, btnHandle, customStyle}) => {
  return (
    <View style={[styles.btn__container, {customStyle}]} onTouchEnd={btnHandle}>
      <Text style={styles.btn__text}>{btnLabel}</Text>
    </View>
  );
};

export default PrimaryButton;
