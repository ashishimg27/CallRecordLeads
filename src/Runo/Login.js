import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import PrimaryButton from '../components/commonComponents/PrimaryButton/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Color} from '../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
const Login = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  //
  const [inputText, setinputText] = React.useState('');

  const btnHandle = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('TabNavigator');
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['white','white']}
        colors={['#FA8661', '#F8325A']}
        style={{
          height: 40,
          width: '100%',
        }}>
        <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0.5)'} />
      </LinearGradient>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#FA8661', '#F8325A']}
        style={styles.loginHeader__container}>
        <View style={styles.mainHeading__container}>
          <Text style={styles.appHeading}>Runo</Text>
          <Text style={styles.appSubHeading}>Management App</Text>
        </View>
      </LinearGradient>

      <View style={styles.body__container}>
        <View style={styles.login__container}>
          <Text style={styles.loginHeading}>Login to your account</Text>
          <View style={styles.inputIcon__container}>
            {/* <View style={styles.Icon__container}>
              <FontAwesome5 name="keyboard" size={20} color={'white'} />
            </View> */}
            {/* <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="ENTER API KEY"
            /> */}
            <TextInput
              // placeholder="ENTER API KEY"
              style={styles.input}
              mode="outlined"
              label="API KEY"
              value={inputText}
              onChangeText={txt => setinputText(txt)}
              activeOutlineColor="#FA8661"
            />
          </View>
        </View>

        <View style={styles.btn__container}>
          <TouchableOpacity
            style={[styles.btn__container1]}
            onPress={btnHandle}>
            {isLoading == true ? (
              <ActivityIndicator size="small" color={'white'} />
            ) : (
              <Text style={styles.btn__text}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* {isLoading == true ? (
          <View
            style={{
              // backgroundColor: 'red',
              flex: 1,
              position: 'absolute',
              top: '50%',
            }}>
            <ActivityIndicator size="large" color={'#F8325A'} />
          </View>
        ) : null} */}
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
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
    // borderWidth: 0.5,
    // borderColor: 'gray',
    // padding: 10,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  btn__container: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  btn__container1: {
    backgroundColor: Color.primary,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  btn__text: {
    paddingVertical: 1,
    color: 'white',
  },
});
