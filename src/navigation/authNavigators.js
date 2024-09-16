import React from "react";
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import SignInWelcomeScreen from "../screens/authScreens/SignInWelcomeScreen";
import SignInScreen from "../screens/authScreens/SignInScreen";
import RestaurantMapScreen from "../screens/RestaurantsMapScreen";
import SignUpScreen from "../screens/authScreens/SignUpScreen";
import DrawerNavigator from "./DrawerNavigator";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";

const Auth = createStackNavigator();

export default function AuthStack(){
    return(
        <Auth.Navigator>
            <Auth.Screen 
                name="SignInWelcomeScreen"
                component={SignInWelcomeScreen}
                options ={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <Auth.Screen 
                name="SignInScreen"
                component={SignInScreen}
                options ={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <Auth.Screen 
                name="DrawerNavigator"
                component={DrawerNavigator}
                options ={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <Auth.Screen 
                name="RestaurantMapScreen"
                component={RestaurantMapScreen}
                options ={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <Auth.Screen 
                name="RestaurantDetailScreen"
                component={RestaurantDetailScreen}
                options ={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <Auth.Screen 
                name="SignUpScreen" 
                component={SignUpScreen} 
                options={{ headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                 }}
            />    
            
        </Auth.Navigator>
    )
}