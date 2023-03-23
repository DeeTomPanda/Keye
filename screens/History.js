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
import Config from "react-native-config";
import styles from './../App.scss';

const Cards=({list})=>{

	const dispatch=useDispatch()
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
                              <Text style={styles.ListNos}>{`Starts: ${v.starts}`}</Text>
			   </Card.Content>
			</Card>)
		)}
		</View>)
}

const History=({navigation})=>{

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

export default History
