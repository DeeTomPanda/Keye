import React from 'react';
import styles from './../App.scss';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editAdditionalUsers } from './../reducers/rootReducer.js';
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
import Config from 'react-native-config';

const Cards=({list})=>{

	const dispatch=useDispatch()
	const primeDL=useSelector((state)=>state.userDetails.DL_no)
	const editUser=async(item)=>{
		Keyboard.dismiss()
		setShowModal(false)
		item["primeDL"]=primeDL		//root user's DL_no
		item["orig_DL"]=user.DL_no	//non-root user's old DL_no
		await axios.patch(`${Config.API}/edituser`,item)
		.then((res)=>console.log(res.status),
			(err)=>console.log(err))
		formik.resetForm()
		dispatch(editAdditionalUsers(item))}

	 const validationSchema_=Yup.object().shape({
                  name:Yup.string().min(2).required('required'),
                  DL_no:Yup.string().min(15).max(15).required('required'),
                  Aadhar_no:Yup.string().min(12).max(12).required('required')
                  })


	const [showModal,setShowModal]=React.useState(false)
	const [user,setUser]=React.useState('')

	const formik=useFormik({
		enableReinitialize:true,
		initialValues:{
			name:user.name,
			Aadhar_no:user.Aadhar_no,
			DL_no:user.DL_no},
		onSubmit:editUser,
		validationSchema:validationSchema_
	})

	return(<>
		<View style={styles.editCards}>
		{list.map((v,i)=>(
		    <Card key={i}>
			<Card.Title 
			    title={v.name}
			    titleStyle={styles.editListTitle}
			    right={()=> <Avatar.Icon size={40} icon={"account"}/>}
			    rightStyle={{marginRight:8}}>
		        </Card.Title>
			<Card.Content>
			   <Text style={styles.EditNos}>{`DL_NO: ${v.DL_no}`}</Text>
			   <Text style={styles.EditNos}>{`Aadhar_No: ${v.Aadhar_no}`}</Text>
			</Card.Content>
			<Card.Actions>
			   <Button
			      mode={"text"}
			      onPress={()=>{
				      setUser(v)
				      setShowModal(true)}
			      }>
			      {"Edit"}
			   </Button>
			</Card.Actions>
		    </Card>)
		   )
		}
		</View>
		<Modal
		   animationType={'slide'}
		   onRequestClose={()=>{
		           formik.resetForm()
			   setShowModal(false)}
		   }
		   visible={showModal}>
		   <View style={styles.editUserModal}>
		      <Snackbar 
			 onDismiss={()=>setShowModal(false)}
			 duration={300000}
		         visible={showModal}>
		         {"Edit fields by clicking on em!"}
		      </Snackbar>
		      <View style={styles.editDetailsScreen}>
		         <Text style={styles.editUserTitle}>{"Edit User"}</Text>
		         <View style={styles.editSubForm}>
		            <TextInput
		                style={styles.editUserFields}
				value={formik.values.name}
				onChangeText={(ch)=>formik.setFieldValue('name',ch)}/>
			    <Text style={styles.errorText}>{formik.errors.name}</Text>
		         </View>
		         <View style={styles.editSubForm}>
		     	    <TextInput
				style={styles.editUserFields}
				value={formik.values.DL_no}
				onChangeText={(ch)=>formik.setFieldValue('DL_no',ch)}/>
			    <Text style={styles.errorText}>{formik.errors.DL_no}</Text>
		         </View>
		         <View style={styles.editSubForm}>
			    <TextInput
				style={styles.editUserFields}
				value={String(formik.values.Aadhar_no)}
				onChangeText={(ch)=>formik.setFieldValue('Aadhar_no',Number(ch))}/>
			    <Text style={styles.errorText}>{formik.errors.Aadhar_no}</Text>
		         </View>
		         <Button
		  	    onPress={formik.handleSubmit}>
		            <Text>{"Save"}</Text>
		         </Button>
		      </View>
		   </View>
		</Modal>
		</>
	)
}

export default Cards;
