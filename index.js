
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Provider as PaperProvider } from 'react-native-paper';

const RNRedux=()=>{
	return(
		<Provider store={store}>
		<PaperProvider>
		   <App/>
		</PaperProvider>
		</Provider>)
}


AppRegistry.registerComponent(appName, () => RNRedux);
