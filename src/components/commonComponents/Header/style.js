import {StyleSheet} from 'react-native';
import {Color} from '../../../styles/Colors';
export default StyleSheet.create({
  HeaderContainer: {
    backgroundColor: Color.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon__container: {
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  rotatedIcon: {
    transform: [{rotate: '90deg'}],
  },
});
