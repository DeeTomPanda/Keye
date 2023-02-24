import React from 'react';
import axios from 'axios'
import styles from './../App.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { 
	useDispatch,
	useSelector,
} from 'react-redux';
import { 
	invert,
	signINUser
} from './../reducers/rootReducer.js';
import {
	View,
	Text,
	SafeAreaView,
	KeyboardAvoidingView,
	Alert,
	Keyboard
} from 'react-native';
import { 
	ActivityIndicator,
	Snackbar,
	TextInput,
	Button
} from 'react-native-paper';


const Login=({navigation})=>{

	const [isLoading,setIsLoading]=React.useState(false)
	const [visible,setVisible]=React.useState(false)
	const [msg,setMsg]=React.useState('')

	const dispatch=useDispatch()
	const stateObj=useSelector((state)=>state)

	const verifyUser=async(loginDetails)=>{
		setIsLoading(true)
		await axios.post("https://keye.fly.dev/login",loginDetails).
			then((res)=>{
				setIsLoading(false)
				if(res.status==201){   ///Send data to store
					const {AadharNo,DLno,name,addlUsers}=res.data
					const dataObj={AadharNo,DLno,name,addlUsers}
					dispatch(signINUser(dataObj))
					dispatch(invert())}
				else{
					setMsg("Error with server")
					setVisible(true)
					console.log("There seems to be a problem,please try later")}
				},
			     (err)=>{
				     setVisible(true)
				     setIsLoading(false)
				     if(err.response.data)
				        setMsg(err.response.data)
				     else
					setMsg("Please Try Again!")
				     if(err.response){
					console.log(err.response,'err')}
				     else{
					console.log(err)}
			     }
			)
	}

	const validationSchema_=Yup.object().shape({
		DL_no:Yup.string().min(15).max(15).required('Required'),
		password:Yup.string().required('Required')})

	const formik=useFormik({
		initialValues:{
			password:'',
			DL_no:''},
		validationSchema:validationSchema_,
		onSubmit:verifyUser})


	return(
		<SafeAreaView style={styles.container}>
		   <KeyboardAvoidingView behavior={"height"}>
		   {!isLoading?(
	              <View style={styles.loginContainer}>
		         <View style={styles.loginTitle}>
		           <Text style={styles.loginText}>{"Login"}</Text>
		         </View>
		         <View style={styles.userpasscontainer}>
		            <View style={styles.subLoginContainer}>
		            <TextInput style={styles.usernamebox} 
		                       underlineColor={"white"}
				       placeholder={"DLno"} 
				       onChangeText={(ch)=>formik.setFieldValue('DL_no',ch)}/>
			    <Text style={styles.errorText}>{formik.errors.DL_no}</Text>
			    </View>
		            <View style={styles.subLoginContainer}>
		            <TextInput style={styles.passwordbox} 
			               underlineColor={'white'}
				       placeholder={"Password"}
				       secureTextEntry={true}
				       onChangeText={(ch)=>formik.setFieldValue('password',ch)}/>
			    <Text style={styles.errorText}>{formik.errors.password}</Text>
			    </View>
		        </View>
		        <View style={styles.registersignincontainer}>
		           <Button style={styles.btnColor}
				   onPress={()=>navigation.navigate("Register")}>
				   {"Register"}
		           </Button>
			   <Button style={styles.btnColor}
				   onPress={()=>{
					   Keyboard.dismiss()
					   formik.handleSubmit()}
				   }>
				   {"Sign-in"}

			   </Button>
		        </View>
			   <Button mode={'Text'}>{'Forgot Pass?'}</Button>
			<Snackbar visible={visible}
                                  duration={1200}
                                  onDismiss={()=>setVisible(false)}>
                           {msg}   
                        </Snackbar>
		      </View>)
		   :(
		      <ActivityIndicator size={"large"} 
			   color={'white'}
			   animating={isLoading}/>
		   )}
		   </KeyboardAvoidingView>
		 </SafeAreaView>
	)
}

export default Login;
