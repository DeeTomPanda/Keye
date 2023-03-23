import React from 'react';
import axios from 'axios';
import { 
	useDispatch,
	useSelector
} from 'react-redux';
import {
	addAdditionalUsers
} from './../reducers/rootReducer.js' 

import {
	Pressable,
	SafeAreaView,
	KeyboardAvoidingView,
	Text,
	View
} from 'react-native';
import { 
	Snackbar,
	TextInput,
	Button 
} from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './../App.scss';
import Config from "react-native-config";

const AddUser=()=>{

	const [visible,setVisible]=React.useState(false)
	const dispatch=useDispatch()
	const state=useSelector((state)=>state)
	const update=(data)=>dispatch(addAdditionalUsers(data))


	const sendData=async (data)=>{
		await axios.patch(`${Config.API}/addreguser`,{
						data,
						CarNO:state.CarNO,
						origDL_no:state.userDetails.DL_no})
		      .then((res)=>{
			      if(res.status==201){
				      update(data)
			      	      setVisible(true)}
		      }
		      ,(err)=>console.log(err))
	}
	
	const validationSchema_=Yup.object().shape({
		name:Yup.string().min(2).required('required'),
		DL_no:Yup.string().min(14).max(14).required('required'),
		})
	

	
	const formik=useFormik({
		initialValues:{
			name:'',
			DL_no:''},
		validationSchema:validationSchema_,
		onSubmit:sendData}
	)
	return(
		<SafeAreaView style={styles.container}>
		   <KeyboardAvoidingView>
		      <Text style={styles.registerText}>{"Add User"}</Text>
		      <View style={styles.registerContainer}>
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
			<Button
				style={styles.addUserSubmitButton}
				onPress={formik.handleSubmit}>
			   {"Submit"}
		       </Button>
		     </View>	
		     <Snackbar
		     	  visible={visible}
		          duration={800}
			  onDismiss={()=>setVisible(false)}>
		     {"Added User"}
		    </Snackbar>
		   </KeyboardAvoidingView>
		</SafeAreaView>)
}

export default AddUser;
