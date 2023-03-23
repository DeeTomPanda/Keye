import React from 'react';
import {
	Text,
	View,
	Modal,
	Alert,
	KeyboardAvoidingView
} from 'react-native';
import { 
	Card,
	TextInput,
	Button,
	Snackbar
} from 'react-native-paper';
import {
	useSelector,
	useDispatch
} from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from './../App.scss';
import Config from  'react-native-config';
import { editRootUser } from './../reducers/rootReducer.js';
import { invert } from './../reducers/rootReducer.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingOptions=()=>{

	const userDetails=useSelector((state)=>({
		name:state.userDetails.name,
		DLno:state.userDetails.DL_no,
		AadharNo:state.userDetails.Aadhar_No,
		CarNO:state.CarNO})
	)

	const dispatch=useDispatch()

	const validationSchema_=Yup.object().shape({
                    name:Yup.string().min(2).required('required'),
                    DL_no:Yup.string().min(14).max(14).required('required'),
                    Aadhar_no:Yup.string().min(12).max(12).required('required')
                    })
  
	const editRoot=async(rootData)=>{
                  console.log("Clicked edituser")
		  rootData['prevDL_no']=userDetails.DLno
		  rootData['CarNO']=userDetails.CarNO
		  console.log(rootData)
		  await axios.patch(`${Config.API}/editrootuser`,rootData)
		  .then((res)=>{
			  if(res.status>=200 && res.status<300)
			  {
				  dispatch(editRootUser(rootData))
				  setSnack(true)}
		  	},
			 (err)=>console.log(err)
		  )
		  setShowModal(false)}


	const formik=useFormik({
                  enableReinitialize:true,
                  initialValues:{
                          name:userDetails.name,
                          Aadhar_no:userDetails.AadharNo,
                          DL_no:userDetails.DLno},
                  onSubmit:editRoot,
                  validationSchema:validationSchema_
          })
  
	function confirm(){
		Alert.alert('Confirmation','Save your changes?',[{
		  	text:"Yes",
		  	onPress:()=>formik.handleSubmit()},
			{
			 text:"No",
			 onPress:()=>{
			 	 setShowModal(false)
				 formik.resetForm()
			 	 return}
			}
		  ],{cancelable:true})
	}

	const [showModal,setShowModal]=React.useState(false)
	const [snack,setSnack]=React.useState(false)

	const delUser=()=>{
		Alert.alert("Confirmation","Delete User?",[{
			text:"Yes",
			onPress:async()=>{
				await axios.delete(`${Config.API}/rootuser`,{data:userDetails})
				.then((res)=>console.log(res.data),
				      (err)=>console.log(err))
				await AsyncStorage.removeItem("kY")
				dispatch(invert())}
			},
			{
			 text:"No",
			 onPress:()=>null}],
			{cancelable:true})
	}

	const logOut=()=>{
 	        console.log("Clicked logOut")
 	        Alert.alert("Confirmation","Log Out?",[{
			text:"Yes",
			onPress:async()=>{
				await AsyncStorage.removeItem("kY")
				dispatch(invert())}
			},
			{
			 text:"No",
			 onPress:()=>null}],
			{cancelable:true})
	}

	const options=[{
		 title:"Edit Root User",
		 action:()=>setShowModal(true),
		 description:"Edit your details"},
		{
		 title:"Log out",
		 action:()=>logOut(),
		 description:"Log out of your account"},
		{
		 title:"Delete Account",
		 action:()=>delUser(),
		 description:"Delete your account permanently"}]
	return(
		<View style={styles.settingsContainer}>
		   <View style={styles.settingOptions}>
		      {
		       options.map((v,i,a)=>{
			       return(
			 	       <Card key={i} onPress={v.action}>
				       <Card.Title title={v.title}/> 
				       <Card.Content>
				          <Text>{v.description}</Text>
				       </Card.Content>
				    </Card>)
		    	})		      
		      }
		      <Modal
		       onRequestClose={()=>{
		    	   formik.resetForm()
		    	   setShowModal(false)}
		       }
		       animationType={"slide"} 
		       visible={showModal}>
		         <KeyboardAvoidingView 
		          behavior={"height"} 
		          style={styles.modal}>
		            <View style={styles.editRootUser}>
		               <View style={styles.editUserForm}>
		                  <Text> {"Name"} </Text>
		                  <TextInput 
		                   value={formik.values.name} 
		                   style={styles.editRootUserFields}
				   onChangeText={(ch)=>formik.setFieldValue('name',ch)}/>
			          <Text style={styles.errorText}>{formik.errors.name}</Text>
		               </View>
		               <View style={styles.editUserForm}>
		            	   <Text> {"DLNo"} </Text>
		            	   <TextInput 
		             	    value={String(formik.values.DL_no)} 
		             	    style={styles.editRootUserFields}
				    onChangeText={(ch)=>formik.setFieldValue('DL_no',ch)}/>
				   <Text style={styles.errorText}>{formik.errors.DL_no}</Text>
		               </View>
		               <View style={styles.editUserForm}>
		            	   <Text> {"AadharNo"} </Text>
		            	   <TextInput keyboardType={'numeric'} 
		             	    value={String(formik.values.Aadhar_no)} 
		             	    style={styles.editRootUserFields}
				    onChangeText={(ch)=>formik.setFieldValue('Aadhar_no',ch)}/>
				   <Text style={styles.errorText}>{formik.errors.Aadhar_no}</Text>
		               </View>
		               <Button onPress={()=>{
				       confirm()}
			       }>
                           	   {"Save"}             
                               </Button>
		            </View>
		         </KeyboardAvoidingView>
		      </Modal>
		   </View>
		   <Snackbar
		       visible={snack}
		       duration={3000}
		       onDismiss={()=>setSnack(false)}>
		         {"Edited and Saved ROOT user"}
		      </Snackbar>
	         </View>)
}

export default SettingOptions
