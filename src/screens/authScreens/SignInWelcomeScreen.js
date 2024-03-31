import React,{useState,useRef} from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';
import {colors, parameters, title} from "../../global/styles"
import { Button, Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from "react-native-animatable";
import Swiper from 'react-native-swiper';

export default function SignInWelcomeScreen({navigation}){
    return(
        <View style={{flex:1}}>
            <View style={{flex:3, justifyContent:"flex-start", alignItems: "center", paddingTop:20}}>
                <Text style={{fontSize:26, color:colors.buttons, fontWeight: "bold"}}>OTKRIJTE RESTORANE</Text>
                <Text style={{fontSize:26, color:colors.buttons, fontWeight: "bold"}}>U VAŠOJ BLIZINI</Text>
            </View>
            <View style={{flex:4, justifyContent:"center"}}>
            <Swiper autoplay={true}>
                <View style={styles.slide1}>
                    <Image 
                        source={{uri:"https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg"}}
                        style={{height:"100%", width: "100%"}}
                    />
                </View>
                <View style={styles.slide2}>
                    <Image 
                        source={{uri:"https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_1280.jpg"}}
                        style={{height:"100%", width: "100%"}}
                    />
                </View>
                <View style={styles.slide3}>
                    <Image 
                        source={{uri:"https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_1280.jpg"}}
                        style={{height:"100%", width: "100%"}}
                    />
                </View>
            </Swiper>
            </View>
            <View style={{flex:4, justifyContent:"flex-end",marginBottom:20}}>
            <View style={{marginHorizontal: 20, marginTop:20}}>
                <Button 
                    title="PRIJAVA"
                    buttonStyle={parameters.buttonStyle}
                    titleStyle={parameters.buttonTitleStyle}
                    onPress={()=>{
                        navigation.navigate("SignInScreen")
                    }}
                />
            </View>
            <View style={{marginHorizontal:20, marginTop: 20}}>
                <Button 
                    title="Kreirajte račun"
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonTitle}
                />
            </View>
            </View>
        </View>
    
        
    )
}

const styles = StyleSheet.create({
    slide1:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#9dd6eb"
    },
    slide2:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#97cae5"
    },
    slide3:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#92bbd9"
    },
    createButton:{
        backgroundColor: "white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1,
        borderColor:"#ff8c52",
        height:50,
        paddingHorizontal:20,
        borderColor:colors.buttons
    },
    createButtonTitle:{
        color:colors.grey1,
        fontSize: 20,
        fontWeight:"bold",
        alignItems:"center",
        justifyContent:"center",
        marginTop: -3
    }
})