import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Color} from '../../../styles/Colors';
const LoadingComponent = ({backgroundColor = 'transparent', msg = ''}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        top: '40%',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 6,
        shadowColor: 'transparent',
      }}>
      <ActivityIndicator size="large" color={Color.primary} />
      <Text allowFontScaling={false}>{msg}</Text>
    </TouchableOpacity>
  );
};

export default LoadingComponent;
