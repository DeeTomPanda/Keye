import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const userStateSlice=createSlice({
	name:'redux_main',
	initialState:{
		loggedIn:true,
		CarNO:'',
		starts:'',
		userDetails:{
			name:'',
			DL_no:'',
			Aadhar_No:'',
			permittedUsers:[]}

	},
	reducers:{
		signINUser(state,action){
			const {name,CarNO,DLno,AadharNo,addlUsers}=action.payload
			let addlUsers_=addlUsers.map((v)=>({
					name:v.name,
					DL_no:v.DLno,
					Aadhar_no:v.AadharNo,
					id:v._id,
					starts:v.starts})
			)
			state.CarNO=CarNO
			state.userDetails={
				...state.userDetails,
				name,
				DL_no:DLno,
				Aadhar_No:AadharNo,
				permittedUsers:addlUsers_,
			}
		},
		invert(state,action){
			state.loggedIn=!state.loggedIn
		},
		registerUser(state,action){
			const {email,CarNO,name,DL_no,Aadhar_no}=action.payload
			state.userDetails={name,email,DL_no,Aadhar_no}
			state.CarNO=CarNO
		},
		addAdditionalUsers(state,action){
			const {name,DL_no,Aadhar_no}=action.payload
			const newUser={name,DL_no,Aadhar_no}
			state.userDetails.permittedUsers.push(newUser)
		},
		delAdditionalUsers(state,action){
			const item=action.payload
			state.userDetails.permittedUsers=state.userDetails.permittedUsers
					.filter((v)=>{
						if(item.DL_no!=v.DL_no && item.Aadhar_no!=v.Aadhar_no)
						    return v})
		},
		editAdditionalUsers(state,action){
			const {DL_no,Aadhar_no,name,orig_DL}=action.payload
			let index=state.userDetails.permittedUsers
				.findIndex((v)=>v.DL_no==orig_DL)
			state.userDetails.permittedUsers[index]={DL_no,Aadhar_no,name}

		},
		editRootUser(state,action){
			const {DL_no,Aadhar_no,name}=action.payload
			console.log("Edited root",action.payload)
			state.userDetails={
				...state.userDetails,
				name,
				DL_no,
				Aadhar_No:Aadhar_no
				}
		}
	}
})

export const {signINUser,invert,registerUser,editRootUser,editAdditionalUsers,addAdditionalUsers,delAdditionalUsers}=userStateSlice.actions
export default userStateSlice.reducer
