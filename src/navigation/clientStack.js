import React,{useLayoutEffect}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import RestaurantHomeScreen from '../screens/RestaurantHomeScreen';
import MenuProductScreen from '../screens/MenuProductScreen';
import PreferenceScreen from '../screens/PreferenceScreen';
import EditOrderScreen from '../screens/EditOrderScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ReviewOrderScreen from '../screens/ReviewOrderScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



const ClientSearch = createStackNavigator()

export  function ClientStack({navigation,route}) {

    useLayoutEffect(()=>{
    
    const routeName = getFocusedRouteNameFromRoute(route);
    if(routeName === "RestaurantHomeScreen" || "MenuProductScreen"){
        navigation.setOptions({tabBarVisible:false})
    }else{
        navigation.setOptions({tabBarVisible:true})
    }
    
    },[navigation,route])
    return (
       <ClientSearch.Navigator>

            <ClientSearch.Screen 
                name ="SearchScreen"
                component ={SearchScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />

            <ClientSearch.Screen 
                name ="SearchResultScreen"
                component ={SearchResultScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />

            <ClientSearch.Screen 
                name ="RestaurantHomeScreen"
                component ={RestaurantHomeScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />

            <ClientSearch.Screen 
                name ="MenuProductScreen"
                component ={MenuProductScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            /> 
            <ClientSearch.Screen 
                name ="PreferenceScreen"
                component ={PreferenceScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />   
             <ClientSearch.Screen 
                name ="CartScreen"
                component ={CartScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />
             <ClientSearch.Screen 
                name ="CheckoutScreen"
                component ={CheckoutScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />
            <ClientSearch.Screen 
                name ="EditOrderScreen"
                component ={EditOrderScreen}
                options = {
                    ()=>({
                        headerShown:false
                    })
                }
            />
            
            <ClientSearch.Screen 
            name ="ReviewOrderScreen"
            component ={ReviewOrderScreen}
            options = {
                ()=>({
                    headerShown:false
                })
            }
        />
       </ClientSearch.Navigator>
    )
}