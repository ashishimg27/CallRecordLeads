import {StyleSheet, Dimensions} from 'react-native';
import {Color} from '../../../styles/Colors';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topCircle__container: {
    backgroundColor: Color.primary,
    width: '100%',
    borderRadius: 999,
    padding: 500,
    marginTop: -800,
    margin: -100,
  },
  BottomCircle__container: {
    backgroundColor: Color.primary,
    width: '100%',
    borderRadius: 999,
    padding: 200,
    marginTop: 550,
    marginLeft: 550,
    // margin: -100,
  },
  Profile_text: {
    position: 'absolute',
    top: 35,
    left: 0,
    margin: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  main__container: {position: 'absolute', top: 90, width: '90%'},
  UserDetails__container: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  userProfilePic: {
    height: 90,
    width: 90,
    borderRadius: 999,
    position: 'absolute',
    top: -40,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  userPosition: {
    marginTop: 50,
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  aboutUser__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '90%',
  },
  userLocation__container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    marginRight: 10,
  },

  verticalLine: {
    width: 2,
    backgroundColor: Color.primary,
    height: 20,
  },
  completedTask__container: {flexDirection: 'row', alignItems: 'center'},
  storagePath__container: {
    marginTop: 10,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
  },
  storage__heading: {
    width: '100%',
    color: Color.blackish,
    fontSize: 16,
    fontWeight: '500',
  },
  Editpath__container: {
    marginTop: 10,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathText: {
    fontSize: 16,
  },
});
