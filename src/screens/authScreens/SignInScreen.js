import React,{useState,useRef} from 'react';
import { View, Text, StyleSheet, Dimensions,TextInput } from 'react-native';
import {colors, parameters, title} from "../../global/styles"
import { Button, Icon, SocialIcon } from 'react-native-elements';
import Header from '../../components/header';
import * as Animatable from "react-native-animatable";
import { auth, database } from '../../../firebase';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen({ navigation }) {
    const [textInput2Focused, setTextInput2Focused] = useState(false);

    const handleSignIn = async (values) => {
        const { email, password } = values;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);
            navigation.navigate("DrawerNavigator");  // Navigate to home screen or main app
        } catch (error) {
            console.error('Error signing in:', error.message);
            Alert.alert('Login Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="MOJ PROFIL" type="arrow-left" navigation={navigation} />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={title}>Prijava</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.text1}>Molimo unesite E-mail i lozinku</Text>
                <Text style={styles.text1}>Vašeg profila</Text>
            </View>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => handleSignIn(values)}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                style={styles.textInput1}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={styles.textInput2}>
                            <Animatable.View animation={textInput2Focused ? "" : "fadeInRight"} duration={400}>
                                <Icon
                                    name="lock"
                                    iconStyle={{ color: colors.grey3 }}
                                    type='material'
                                />
                            </Animatable.View>
                            <TextInput
                                style={{ width: "80%" }}
                                placeholder="Lozinka"
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                value={values.password}
                                onFocus={() => setTextInput2Focused(false)}
                                onBlur={() => setTextInput2Focused(true)}
                            />
                            <Animatable.View animation={textInput2Focused ? "" : "fadeInLeft"} duration={400}>
                                <Icon
                                    name="visibility-off"
                                    iconStyle={{ color: colors.grey3 }}
                                    type='material'
                                    style={{ marginRight: 10 }}
                                />
                            </Animatable.View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                            <Button
                                title="PRIJAVA"
                                buttonStyle={parameters.buttonStyle}
                                titleStyle={parameters.buttonTitleStyle}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                )}
            </Formik>
            {/* Rest of your UI */}
        </View>
    );
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