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
		DL_no:Yup.string().min(14).max(14).required('required'),
		CarNO:Yup.string().required().min(10).max(12).required('required')}
	)

	
	const formik=useFormik({
		initialValues:{
			email:'',
			name:'',
			DL_no:'',
			CarNO:''},
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
				placeholder={"CarNo"}
				onChangeText={(ch)=>formik.setFieldValue('CarNO',ch)}/>
			   <Text style={styles.errorText}>{formik.errors.CarNO}</Text>
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
