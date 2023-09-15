import React,{useState,useRef} from 'react';
import { View, Text, StyleSheet, Dimensions,TextInput } from 'react-native';
import {colors, parameters, title} from "../../global/styles"
import { Button, Icon, SocialIcon } from 'react-native-elements';
import Header from '../../components/header';
import * as Animatable from "react-native-animatable";
import { Formik } from 'formik';

export default function SignInScreen({navigation}){

    const[textInput2Focused, setTextInput2Focused]=useState(false)

    const textInput1=useRef(1)
    const textInput2=useRef(2)



    return(
        <View style={styles.container}>
            <Header title="MOJ PROFIL" type="arrow-left" navigation = {navigation}/>
            <View style={{marginLeft:20, marginTop:10}}>
                <Text style={title}>Prijava</Text>
            </View>
            <View style={{alignItems:"center", marginTop:10}}>
                <Text style={styles.text1}>Molimo unesite E-mail i lozinku</Text>
                <Text style={styles.text1}>Vašeg profila</Text>
            </View>
            <Formik 
            initialValues = {{username:"", password:""}}
            onSubmit = {(values)=>{
                    console.log(values)
            }}
            >
            { <View>
            <View style={{marginTop:10}}>
                <View>
                    <TextInput 
                    style = {styles.textInput1}
                    placeholder="Email"
                    ref={textInput1}
                    />
                </View>
            </View>
            <View style={styles.textInput2}>
            <Animatable.View animation={textInput2Focused?"":"fadeInRight"} duration={400}>
                <Icon 
                    name = "lock"
                    iconStyle={{color:colors.grey3}}
                    type='material'
                />
                </Animatable.View>
                <TextInput 
                    style ={{width:"80%"}}
                    placeholder="Lozinka"
                    ref={textInput2}
                    onFocus={()=>{
                        setTextInput2Focused(false)
                    }}

                    onBlur={()=>{
                        setTextInput2Focused(true)
                    }}
                    />
            
            <Animatable.View animation={textInput2Focused?"":"fadeInLeft"} duration={400}>
            <Icon 
                    name = "visibility-off"
                    iconStyle={{color:colors.grey3}}
                    type='material'
                    style={{marginRight:10}}
                />
            </Animatable.View>
            </View>
            </View>
            }
            </Formik>
            <View style={{marginHorizontal: 20, marginTop:30}}>
                <Button 
                    title="PRIJAVA"
                    buttonStyle={parameters.buttonStyle}
                    titleStyle={parameters.buttonTitleStyle}
                    onPress={()=>{navigation.navigate("DrawerNavigator")}}
                />
            </View>
            <View style={{alignItems:'center', marginTop:15}}>
                <Text style={{...styles.text1,textDecorationLine:"underline"}}>
                Zaboravljena lozinka?
                </Text> 
                
            </View>

            <View style={{alignItems:'center', marginTop:20, marginBottom:20}}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>
                ILI
                </Text> 
                
            </View>
            <View style={{marginHorizontal:10, marginTop:10}}>
                <SocialIcon
                    title='Prijava pomoću Facebook-a'
                    button
                    type='facebook'
                    styles={styles.SocialIcon}
                    onPress={()=>{

                    }}
                />
                
            </View>
            <View style={{marginHorizontal:10, marginTop:10}}>
                <SocialIcon
                    title='Prijava pomoću Google računa'
                    button
                    type='google'
                    styles={styles.SocialIcon}
                    onPress={()=>{
                        
                    }}
                />
                
            </View>
            <View style={{marginTop:15,marginLeft:20}}>
                <Text style={{...styles.text1}}>
                Novi na FoodXpress?
                </Text> 
                
            </View>
            <View style={{alignItems:"flex-end",marginHorizontal:20, marginTop: -20}}>
                <Button 
                    title="Kreirajte račun"
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonTitle}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text1:{
        color: colors.grey3,
        fontSize: 16
    },

    textInput1:{
        borderWidth:1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft:16
    },
    textInput2:{
        borderWidth:1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent:"center",
        alignItems: "center",
        paddingLeft:16
    },
    SocialIcon:{
        borderRadius:12,
        height:50
    },
    createButton:{
        backgroundColor: "white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1,
        borderColor:"#ff8c52",
        height:40,
        paddingHorizontal:20
    },
    createButtonTitle:{
        color:"#ff8c52",
        fontSize: 16,
        fontWeight:"bold",
        alignItems:"center",
        justifyContent:"center",
        marginTop: -3
    }
})