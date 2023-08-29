import {StyleSheet} from 'react-native';
import {Color} from '../../../styles/Colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 7,
  },

  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    color: Color.primary,
    fontWeight: '500',
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Color.blackish,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
