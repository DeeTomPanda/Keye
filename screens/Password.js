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
	Chip
} from 'react-native-paper';

const Password=({headerText="Set Password",navigation,route})=>{
	
	 const dispatch=useDispatch()
	 const {data}=route.params
	 const validationSchema=()=>Yup.object().shape({
		password:Yup.string().required().matches(/^[A-Za-z0-9 ]+$/,"No special characters").min(8).max(12),
                password2:Yup.string().required().matches(/^[A-Za-z0-9 ]+$/,"No special characters").min(8).max(12)
	 })

	const verifyAndSend=async ()=>{
                if(formik.values.password!=formik.values.password2)
			Alert.alert("Passwords don't match")
		else
			await axios.post("https://keye.fly.dev/register",{checked:true,
						data,pass:formik.values.password})
			     .then((res)=>{
				     if(res.status==201){
					     dispatch(registerUser(data))
					     console.log("Updated & dispatched")
				     	     navigation.navigate("Login")}
				     else
				     	console.log(res.body)
			     })
			     .catch((err)=>console.log(err))


          }



	const formik=useFormik({
		initialValues:{
			password:'',
			password2:''},
		validationSchema:validationSchema,
		onSubmit:verifyAndSend
	})



	return(
		<View style={styles.container}>
		   <View style={styles.passwordScreenContainer}>
		      <Chip style={styles.passwordTitle}
			    textStyle={styles.passwordTitleText}>
			    {"Set Password"}
		      </Chip>
		      <View>
		         <TextInput style={styles.passwordbox} 
				    placeholder={headerText}
		                    onChangeText={(ch)=>formik.setFieldValue('password',ch)}>
		         </TextInput>
		         <Text style={styles.passwordsErrorText}>{formik.errors.password}</Text>
		      </View>
		      <View>
		         <TextInput style={styles.passwordbox}
				    placeholder={"Confirm password"}
				    onChangeText={(ch)=>formik.setFieldValue('password2',ch)}>
		         </TextInput>
		         <Text style={styles.passwordsErrorText}>{formik.errors.password2}</Text>
		      </View>
		      <Chip style={styles.passwordScreenSubmitButton} 
			    mode="outlined"
			    onPress={formik.handleSubmit}>
		      {"Press me "}
		      </Chip>
		   </View>
		</View>)
}

export default Password
