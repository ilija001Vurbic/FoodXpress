import { createStackNavigator } from '@react-navigation/stack';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import EditOrderScreen from '../screens/EditOrderScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import HomeHeader from '../components/HomeHeader'; // Import HomeHeader
import HomeScreen from '../screens/HomeScreen';
import RestaurantHomeScreen from '../screens/RestaurantHomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{
        header: (props) => <HomeHeader {...props} />, // Custom header
      }}
    >
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="EditOrderScreen" component={EditOrderScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RestaurantHomeScreen" component={RestaurantHomeScreen} /> 
    </Stack.Navigator>
  );
}
