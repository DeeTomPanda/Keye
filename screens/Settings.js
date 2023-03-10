import React from 'react';
import {
	Text,
	View
} from 'react-native';
import SettingOptions from './SettingOptions.js';
import styles  from './../App.scss';

const Settings=()=>{
	console.log("At setttings")

	return(
		<View style={styles.settingsContainer}>
		   <SettingOptions/>
		{/*//Switch to change theme
		//Delete acc
		//Put a modal to confirm deletion
		//Change root user name/details*/}
		</View>)
}

export default Settings
