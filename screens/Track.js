import React from 'react';
import styles from './../App.scss';
import { PermissionsAndroid } from 'react-native';
import {
	View,
	Text
} from 'react-native';
import { Button } from 'react-native-paper';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';

import Config from 'react-native-config';


MapboxGL.setAccessToken(Config.MAP_GL) 
//'pk.eyJ1IjoiZHRvbXBhbmRhIiwiYSI6ImNsZGtpdjFwbDBucjUzdm56dnF6cm4yODUifQ.JKncK_LfPhdHWuDQqGghwQ')

const Track=()=>{

	let camRef=React.useRef(null)
	let mapRef=React.useRef(null)
	const [initialCoords,setInitialCoords]=React.useState({longitude:112.8,latitude:-122.11})
	const [isMapLoad,setIsMapLoad]=React.useState(1)
	React.useEffect(()=>{
		const permissions=async()=>{
			const granted=await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
					title:"Allow Location?",
					message:"Click yes to allow tracking",
					buttonPositive:"Yes",
					buttonNegative:"No"})
			if(granted===PermissionsAndroid.RESULTS.GRANTED)
				console.log("Permitted")
			else
				console.log("No permission")
			getLocation()	
		}
		permissions()
	},[])


	const getLocation=async()=>{
		await Geolocation.getCurrentPosition((position)=>{
					const {latitude,longitude}=position.coords
					setInitialCoords({latitude,longitude})},	
				(err)=>console.log(err))}

	const Move=async()=>{
		if(!PermissionsAndroid.check(PermissionsAndroid.RESULTS.GRANTED))
			camRef.current.setCamera({
				centerCoordinate:[11.1212,-120.32]})	 
		else{
			const {longitude,latitude}=initialCoords
			setIsMapLoad(5)
			camRef.current.flyTo([longitude,latitude])}
			
	}

	const showBounds=async()=>{
		let bounds=await mapRef.current.getCenter()
		console.log(bounds)}
	
	return(
		<View style={styles.mapContainer}>
		<MapboxGL.MapView
		    zoomEnabled={true}
		    ref={mapRef}
		    projection={'globe'}
		    compassEnabled				
		    style={styles.mapMain}>
		   <MapboxGL.UserLocation
		   	renderMode={'native'}  
		        animation={true} 
		        visible={true}/>
		   <MapboxGL.Camera
		 	defaultSettings={{
				centerCoordinate:[30,30]}}	
		        ref={camRef}
		    />
		    <MapboxGL.PointAnnotation coordinate={[initialCoords.longitude,initialCoords.latitude]}/>
		</MapboxGL.MapView>
		<View style={styles.navigationConsole}>
		   <Button
		      onPress={showBounds}
		      textColor={'white'}
		      style={styles.mapButtons}>
		       {"Coords"}
		   </Button>
		   <Button
		      textColor={'white'}
		      style={styles.mapButtons}
		      onPress={()=>Move()}>
		      {"Track me"}
		   </Button>
		</View>

		</View>)
}

export default Track
