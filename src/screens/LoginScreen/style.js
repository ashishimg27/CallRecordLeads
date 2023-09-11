import {StyleSheet} from 'react-native';
import {Color} from '../../styles/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // paddingHorizontal: 20,
  },
  loginHeader__container: {
    alignItems: 'center',
    // padding: 15,
    justifyContent: 'center',
    width: '100%',
    height: '30%',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  mainHeading__container: {
    // marginTop: 70,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  appHeading: {
    fontSize: 30,
    color: Color.white,
  },
  appSubHeading: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  body__container: {
    // backgroundColor: 'red',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  login__container: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  loginHeading: {
    color: Color.black,
    fontWeight: '600',
    fontSize: 18,
  },
  inputIcon__container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  Icon__container: {
    backgroundColor: Color.primary,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 50,
    // padding: 10,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    // margin: 12,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 10,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  btn__container: {
    marginTop: 40,
    width: '100%',
  },
});
