import * as React from 'react';
import Login from './Login.js';
import Home from './Home.js';
import Register from './Register.js';
import AddUser from './AddUser.js';
import Password from './Password.js';
import Track from './Track.js';
import ListUsers from './ListUsers.js';
import EditUsers from './EditUsers.js';
import SettingOptions from './SettingOptions.js';
import { Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector,useDispatch } from 'react-redux';
import { invert } from './../reducers/rootReducer.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackofScreens=()=>{

	const Stack = createNativeStackNavigator()
	const showLogin= useSelector((state)=>state.loggedIn)

	return( 
		<NavigationContainer initialRouteName={"Login"}>
      		   <Stack.Navigator 
		       screenOptions={{headerShown:false}}>
		{
		  showLogin?(
		      <Stack.Group>
        	         <Stack.Screen
          		   name={"Login"}
          		   component={Login}/>
		         <Stack.Screen
			   name={"Register"}
			   component={Register}/>
			<Stack.Screen
			   name={"Password"}
			   component={Password}/>
		      </Stack.Group>)
		:(    <Stack.Group>     
		         <Stack.Screen
			   name={"Home"}
			   component={Home}/>
			 <Stack.Screen
			   name={"AddUser"}
			   component={AddUser}/>
			 <Stack.Screen
			   name={"Track"}
			   component={Track}/>
			<Stack.Screen
			   name={"ListUsers"}
			   component={ListUsers}/>
			<Stack.Screen
			   name={"EditUsers"}
			   component={EditUsers}/>
			<Stack.Screen
			   name={"Settings"}
			   component={SettingOptions}/>
		      </Stack.Group>)
		}
		   </Stack.Navigator>
    		</NavigationContainer>)	
}

export default StackofScreens;
