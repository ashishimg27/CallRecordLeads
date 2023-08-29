import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SelectOptons = ({
  label,
  optionData,
  selectedOption,
  setSelectedOption,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={optionData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={selectedOption}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setSelectedOption(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'grey'}
            name="caretdown"
            size={10}
          />
        )}
      />
    </View>
  );
};

export default SelectOptons;
