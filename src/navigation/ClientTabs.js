import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {colors} from '../global/styles'
import {Icon} from 'react-native-elements'
import HomeScreen from "../screens/HomeScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import MyAccountScreen from "../screens/MyAccountScreen"
import { ClientStack } from './clientStack';
import RestaurantHomeScreen from '../screens/RestaurantHomeScreen';  // Import it here


const ClientTabs = createBottomTabNavigator();


export default function RootClientTabs(){

    return(
        <ClientTabs.Navigator
                    tabBarOptions = {{
                        activeTintColor :colors.buttons
                    }}
                >
                    
            <ClientTabs.Screen 
                name ="HomeScreen"
                component ={HomeScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "Home",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='home'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />


            <ClientTabs.Screen 
                name ="SearchScreen"
                component ={ClientStack}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "Search",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='search'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />

        <ClientTabs.Screen 
                name ="MyOrdersScreen"
                component ={MyOrdersScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "My orders",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='view-list'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />
        

        <ClientTabs.Screen 
                name ="MyAccount"
                component ={MyAccountScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "My profile",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='person'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />
        </ClientTabs.Navigator>
    )
}