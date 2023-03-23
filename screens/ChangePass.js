import React from 'react';
import styles from './../App.scss';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
	useDispatch,
	useSelector
} from 'react-redux';
import { registerUser } from './../reducers/rootReducer.js';
import {
	Text,
	View,
	Alert
} from 'react-native';
import { 
	TextInput,
	Button,
	Chip,
	Snackbar
} from 'react-native-paper';
import Config from "react-native-config";

const ChangePass=()=>{

	const [msg,setMsg]=React.useState('')
	const [bar,setBar]=React.useState(false)

	const user=useSelector(state=>state)
	const validationSchema=()=>Yup.object().shape({
		DL_no:Yup.string().min(14).max(14).required('Required'),
		password:Yup.string().required().matches(/^[A-Za-z0-9 ]+$/,"No special characters").min(8).max(14),
                password2:Yup.string().required().matches(/^[A-Za-z0-9 ]+$/,"No special characters").min(8).max(12)
	 })

	const changePass=async (passes)=>{
			axios.post("http://10.0.2.2:8080/changepass",passes)
			.then((res)=>{
				if(res.status>200 && res.status<300){
					setMsg("Password Changed!")
					console.log(msg)}
				else{
					setMsg("Wrong Password entered")
					console.log(msg)}
				setBar(true)
			},
				(err)=>{
					console.log(err)
					setMsg("Invalid password or Invalid User")
					setBar(true)}
			)
			//axios.post(`{$Config.API}/changepass`,{Pass:formik.values.password})
	}


	const formik=useFormik({
		initialValues:{
			DL_no:'',
			password:'',
			password2:''},
		validationSchema:validationSchema,
		onSubmit:changePass
	})

	return(
		<View style={styles.container}>
		   <View style={styles.passwordScreenContainer}>
		      <Chip style={styles.passwordTitle}>
			    {"Change Password"}
		      </Chip>
		      <View style={styles.subLoginContainer}>
		         <TextInput style={styles.usernamebox} 
		                       underlineColor={"white"}
				       placeholder={"DLno"} 
				       onChangeText={(ch)=>formik.setFieldValue('DL_no',ch)}/>
			 <Text style={styles.errorText}>{formik.errors.DL_no}</Text>
		      </View>
		      <View style={styles.subLoginContainer}>
		         <TextInput style={styles.passwordbox} 
				    placeholder={"Enter Old password"}
		                    onChangeText={(ch)=>formik.setFieldValue('password',ch)}>
		         </TextInput>
		         <Text style={styles.passwordsErrorText}>{formik.errors.password}</Text>
		      </View>
		      <View style={styles.subLoginContainer}>
		         <TextInput style={styles.passwordbox}
				    placeholder={"Enter New password"}
				    onChangeText={(ch)=>formik.setFieldValue('password2',ch)}>
		         </TextInput>
		         <Text style={styles.passwordsErrorText}>{formik.errors.password2}</Text>
		      </View>
		      <Chip textStyle={{textJustify:"center"}}
			    style={styles.passwordScreenSubmitButton} 
			    mode="outlined"
			    onPress={formik.handleSubmit}>
		         <Text>{"Submit"}</Text>
		      </Chip>
		   </View>
		   <Snackbar visible={bar}
		   	     duration={2000}
		             onDismiss={()=>setBar(false)}>
		     {msg}
		  </Snackbar>
		</View>)
}

export default ChangePass
