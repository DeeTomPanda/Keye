import React from 'react';
import axios from 'axios';
import { 
	useSelector,
	useDispatch
} from 'react-redux';
import { 
	Alert,
	ScrollView,
	View,
	Text
} from 'react-native';
import { 
	Card,
	Avatar,
	Button
} from 'react-native-paper';
import { delAdditionalUsers } from './../reducers/rootReducer.js';
import styles from './../App.scss';

const Cards=({list})=>{

	const dispatch=useDispatch()
	const DLno=useSelector((state)=>state.userDetails.DL_no)
	const delUser=async (item)=>{
		let item_={...item}
		item_["DLno"]=DLno
		await axios.delete("https://keye.fly.dev/deleteuser",{data:item_})
		.then((res)=>{
			if(res.status==201)
			   dispatch(delAdditionalUsers(item))}
			,(err)=>console.log(err))}
	return(
		<View style={{gap:5}}>
		{list.map((v,i)=>(
			<Card style={{margin:2}} key={i}>
			   <Card.Title 
			      title={v.name}
			      titleStyle={styles.userListTitle}
			      right={()=> <Avatar.Icon size={40} icon={"account"}/>}
			      rightStyle={{marginRight:8}}>
			   </Card.Title>
			   <Card.Content>
			      <Text style={styles.ListNos}>{`DL_NO: ${v.DL_no}`}</Text>
                              <Text style={styles.ListNos}>{`Aadhar_NO: ${v.Aadhar_no}`}</Text>
			   </Card.Content>
			   <Card.Actions>
			      <Button 
			         mode={"text"}
			         onPress={()=>Alert.alert("Delete User?",
					 	  `Delete ${v.name} ?`,
				 		   [
							{text:"OK",
							 onPress:()=>delUser(v)}
						   ],
				 		   {cancelable:true}
				 		   )
				 }>
			         {`Delete`}
			      </Button>
			   </Card.Actions>
			</Card>)
		)}
		</View>)
}

const ListUsers=({navigation})=>{

	const list=useSelector((state)=>state.userDetails.permittedUsers)
	return(
		<View style={styles.container}>
		<ScrollView 
		   style={styles.scrollView} 
		   contentContainerStyle={styles.innerScrollView}>
		   <Cards list={list}/>
		</ScrollView>
		</View>)
}

export default ListUsers
