import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 30,
  },
  otpHeading__container: {
    marginBottom: 40,
  },
  input: {
    // flex: 1,
    height: 50,
    // margin: 12,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    // borderBottomRightRadius: 10,
    // borderTopRightRadius: 10,
  },
  btn__container: {
    marginTop: 20,
    width: '90%',
  },
});
