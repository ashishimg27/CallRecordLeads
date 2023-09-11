import {StyleSheet} from 'react-native';
import {Color} from '../../styles/Colors';
export default StyleSheet.create({
  loadingStyle: {
    marginTop: 30,
  },
  mainContainer: {
    margin: 5,
    marginHorizontal: 10,
  },
  topHeading__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topHeading: {
    color: '#FA8661',
    fontSize: 18,
    fontWeight: '500',
  },
  date__container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  smallText: {
    color: Color.black,
    fontSize: 12,
  },
  callLogs__container: {
    marginTop: 10,
    // backgroundColor: 'red',
  },
  callDetail__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
  },
  callerDetail__container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callerName_phone: {
    marginLeft: 10,
  },
  CallerName: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 5,
  },
  typeLabel: {
    alignItems: 'center',
  },

  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.blackOpacity,
    paddingHorizontal: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },

  modalHeading: {
    marginBottom: 15,
    fontSize: 16,
    color: Color.black,
    fontWeight: '500',
  },

  input: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    width: '97%',
    marginLeft: 10,
    marginVertical: 5,
  },

  modalBottom__container: {
    // marginVertical: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },

  //modal
});
