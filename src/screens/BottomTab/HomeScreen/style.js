import {Dimensions, StyleSheet} from 'react-native';
import {Color} from '../../../styles/Colors';

const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    // padding: 10,
    backgroundColor: 'white',
  },
  loadingStyle: {height: height, backgroundColor: 'white'},
  heading__container: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: Color.white,
  },
  user__container: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    color: Color.white,
  },
  greetText: {
    color: '#FFFFF7',
  },
  body__container: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
  },
  body__heading: {
    fontSize: 28,
    fontWeight: '400',
    color: Color.black,
  },
  reports__container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  report_box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'plum',
    // paddingVertical: 15,
    // paddingHorizontal: 7,
    borderRadius: 20,
    width: 100,
    height: 100,
  },
  dailyReport__count: {
    fontSize: 26,
    marginBottom: 10,
  },
});
