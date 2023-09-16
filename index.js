/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import RunoApp from './src/Runo/RunoApp';
import BottomApp from './src/Bottom/BottomApp';

AppRegistry.registerComponent(appName, () => BottomApp);
