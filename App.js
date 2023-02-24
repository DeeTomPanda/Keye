/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import styles from './App.scss';
import React from 'react';
import ScreenPack from './screens/StackofScreens.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App=() => {
   const [loaded,isLoaded]=React.useState([])
   /*React.useEffect(()=>{
   	async function fetchData(){  
   		await axios.get('http://10.0.2.2:8080/')
		.then((res)=>console.log(res.data),
		(err)=>console.log(err))	
	}
	fetchData()
   },[])*/ 
	

   return (
	   <ScreenPack/>
  );
};

export default App;
