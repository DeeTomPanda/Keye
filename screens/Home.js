import React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	BackHandler,
	Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './../App.scss';

const Options=({navigation})=>{ 
const options=[ 
	{title:"Add Users",onPress:"AddUser"},
	{title:"Track",onPress:"Track"},
	{title:"List Users",onPress:"ListUsers"},
	{title:"Settings",onPress:"Settings"},
	{title:"Edit Users",onPress:"EditUsers"},
	{title:"History",onPress:""} ]

	return(
		<View style={styles.userOptionsContainer}>
		{
		   options.map((v,i)=>(
		   		<TouchableOpacity 
			   	      key={i+1} 
			   	      style={styles.optionsBox}
			              onPress={() => navigation.navigate(v.onPress)}>
			   	   <Text style={styles.optionsText}>
			              {v.title}
			           </Text>
		   		</TouchableOpacity>))
		}
		</View>
		)
}

const Home=({navigation})=>{

	const userState=useSelector((state)=>state.userDetails)

	React.useEffect(()=>{
		const backEvent=()=>{
			if(navigation.isFocused()){
				Alert.alert("Exit Application?","",
					[
					   {text:"No",onPress:()=>null},
				 	   {text:"Yes",onPress:()=>BackHandler.exitApp()}
					],
					{cancelable:true})
				return true}
		}
		const backHandler=BackHandler.addEventListener('hardwareBackPress',backEvent)
		return () => backHandler.remove()}
		,[])


	return(
		<SafeAreaView style={styles.container}>
		   <View style={styles.homeContainer}>
		      <View style={styles.userDisplayContainer}>
		         <Text style={styles.optionsText}>{`Welcome ${userState.name}`}</Text>
		      </View>
		      <Options navigation={navigation}/>
		   </View>
		 </SafeAreaView>
	)}

export default Home;

