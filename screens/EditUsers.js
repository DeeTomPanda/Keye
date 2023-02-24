import React from 'react';
import styles from './../App.scss';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editAdditionalUsers } from './../reducers/rootReducer.js';
import Cards from './Cards.js';
import { 
	useSelector,
	useDispatch
} from 'react-redux';
import {
	ScrollView,
	View,
 	Text,
	SafeAreaView,
	Modal,
	Keyboard,
	KeyboardAvoidingView
} from 'react-native';
import {
	Snackbar,
	Avatar,
	Card,
	Button,
	TextInput
} from 'react-native-paper';

const EditUsers=({navigation})=>{

	const list=useSelector((state)=>state.userDetails.permittedUsers)
	return(
		<KeyboardAvoidingView style={styles.container}>
		   <ScrollView keyboardShouldPersistTaps={'always'}>
		     <Cards list={list}/>
		   </ScrollView>
	        </KeyboardAvoidingView>)
}

export default EditUsers
