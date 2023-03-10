import React from 'react';
import axios from 'axios'

import { 
	useDispatch,
	useSelector
} from 'react-redux';
import {
	registerUser,
	registerAdditionalUsers
} from './../reducers/rootReducer.js' 

import {
	Pressable,
	SafeAreaView,
	KeyboardAvoidingView,
	Text,
	View
} from 'react-native';
import { 
	TextInput,
	Button 
} from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './../App.scss';
import Config from 'react-native-config';

const Register=({navigation})=>{

	const dispatch=useDispatch()
	console.log(useSelector((state)=>state.newUserDetails))
	
	const sendData=async (data)=>{
		await axios.post(`${Config.API}/register`,data)
		     .then((res)=>{
			     if(res.status==201){
			     	dispatch(registerUser(data))
				navigation.navigate("Password",{data})}
			     else
				console.log("Failed registration")}
		     )
		     .catch((err)=>console.log(err))
	}

	const validationSchema=Yup.object().shape({
		email:Yup.string().min(2).email('invalid').required('required'),
		name:Yup.string().min(2).required('required'),
		DL_no:Yup.string().min(15).max(15).required('required'),
		Aadhar_no:Yup.string().required().matches(/^[0-9]+$/,"Must be only digits")
			  .min(12, 'Must be exactly 12 digits').max(12, 'Must be exactly 12 digits')}
	)

	
	const formik=useFormik({
		initialValues:{
			email:'',
			name:'',
			DL_no:'',
			Aadhar_no:''},
		validationSchema:validationSchema,
		onSubmit:sendData}
	)
	
	return(
		<SafeAreaView style={styles.container}>
		   <KeyboardAvoidingView>
		      <Text style={styles.registerText}>{"Register"}</Text>
		      <View style={styles.registerContainer}>
			<View style={styles.subForm}>
		           <TextInput
				placeholder={"Email"}
				style={styles.formfield}
			        onChangeText={(ch)=>formik.setFieldValue('email',ch)}/>
			   <Text style={styles.errorText}>{formik.errors.email}</Text>
			</View>
		        <View style={styles.subForm}>
		           <TextInput
				style={styles.formfield}
				placeholder={"Name"}
				onChangeText={(ch)=>formik.setFieldValue('name',ch)}/>
			   <Text style={styles.errorText}>{formik.errors.name}</Text>
			</View>
			<View style={styles.subForm}>
			   <TextInput  
				style={styles.formfield}
				placeholder={"DLno"}
				onChangeText={(ch)=>formik.setFieldValue('DL_no',ch)}/>
			   <Text style={styles.errorText}>{formik.errors.DL_no}</Text>
		        </View>
			<View style={styles.subForm}>
		           <TextInput
		 		style={styles.formfield}
				placeholder={"AadharNo"}
				onChangeText={(ch)=>formik.setFieldValue('Aadhar_no',ch)}/>
			   <Text style={styles.errorText}>{formik.errors.Aadhar_no}</Text>
			</View>
			<Button
				style={styles.registerSubmitButton}
				onPress={formik.handleSubmit}>
			   {"Submit"}
		       </Button>
		     </View>	
		   </KeyboardAvoidingView>
		</SafeAreaView>)
}

export default Register
