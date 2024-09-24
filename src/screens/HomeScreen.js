import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable, Image, Dimensions, FlatList } from "react-native"; // Import FlatList here
import { colors } from '../global/styles';
import { Icon } from "react-native-elements";
import HomeHeader from "../components/HomeHeader";
import FoodCard from '../components/FoodCard';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database'; // Import Firebase config

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [delivery, setDelivery] = useState(true);
  const [indexCheck, setIndexCheck] = useState("0");
  const [filterData, setFilterData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    const fetchFilterData = () => {
      const filterRef = ref(database, 'filter'); // Adjust the path based on your structure
      onValue(filterRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setFilterData(Object.values(data));
        }
      }, {
        onlyOnce: true // Only fetch the data once
      });
    };

    const fetchRestaurantsData = () => {
      const restaurantsRef = ref(database, 'restaurantDetails'); // Adjust the path based on your structure
      onValue(restaurantsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.values(data);
          setRestaurantsData(data); // Adjust this depending on your data structure 
        }
      }, {
        onlyOnce: true // Only fetch the data once
      });
    };

    fetchFilterData();
    fetchRestaurantsData();
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 5 }}>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => setDelivery(true)}>
              <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.buttons : colors.grey5 }}>
                <Text style={styles.deliveryText}>Delivery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDelivery(false)}>
              <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.grey5 : colors.buttons }}>
                <Text style={styles.deliveryText}>Pickup</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.filterView}>
          <View style={styles.addressView}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
              <Icon type="material-community" name="map-marker" color={colors.grey1} size={26} />
              <Text style={{ marginLeft: 5 }}>Opatijska 45</Text>
            </View>
            <View style={styles.clockView}>
              <Icon type="material-community" name="clock-time-four" color={colors.grey1} size={26} />
              <Text style={{ marginLeft: 5 }}>Now</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
            <Icon type="material-community" name="tune" color={colors.grey1} size={26} />
          </View>
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Categories</Text>
        </View>
        <View>
          <FlatList
            horizontal={true}
            data={filterData}
            keyExtractor={(item) => item.id}
            extraData={indexCheck}
            renderItem={({ item }) => (
              <Pressable onPress={() => setIndexCheck(item.id)}>
                <View style={indexCheck === item.id ? { ...styles.smallCardSelected } : { ...styles.smallCard }}>
                  <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={item.image} />
                  <View>
                    <Text style={indexCheck === item.id ? { ...styles.smallCardTextSelected } : { ...styles.smallCardText }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Free Delivery</Text>
        </View>
        <View>
          <FlatList
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={restaurantsData}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginRight: 5 }}>
                <FoodCard
                  OnPressFoodCard={() => {
                    console.log('Navigating to RestaurantHomeScreen with ID:', item.id);
                    navigation.navigate('RestaurantHomeScreen', { id: item.id });
                  }}
                  screenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  restaurantName={item.restaurantName}
                  farAway={item.farAway}
                  businessAddress={item.businessAddress}
                  averageReview={item.averageReview}
                  numberOfReview={item.numberOfReview}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Available Offers</Text>
        </View>
        <View>
          <FlatList
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={restaurantsData}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginRight: 5 }}>
                <FoodCard
                  OnPressFoodCard={() => navigation.navigate('RestaurantHomeScreen', { id: item.id })}
                  screenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  restaurantName={item.restaurantName}
                  farAway={item.farAway}
                  businessAddress={item.businessAddress}
                  averageReview={item.averageReview}
                  numberOfReview={item.numberOfReview}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Restaurants Near You</Text>
        </View>
        <View style={{ width: SCREEN_WIDTH, paddingTop: 10 }}>
          {restaurantsData.map(item => (
            <View key={item.id} style={{ paddingBottom: 20 }}>
              <FoodCard
                OnPressFoodCard={() => navigation.navigate('RestaurantHomeScreen', { id: item.id })}
                screenWidth={SCREEN_WIDTH * 0.95}
                images={item.images}
                restaurantName={item.restaurantName}
                farAway={item.farAway}
                businessAddress={item.businessAddress}
                averageReview={item.averageReview}
                numberOfReview={item.numberOfReview}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {delivery && (
        <View style={styles.floatButton}>
          <TouchableOpacity onPress={() => navigation.navigate('RestaurantMapScreen')}>
            <Icon name="place" type="material" size={32} color={colors.buttons} />
            <Text style={{ color: colors.grey2 }}>Map</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deliveryButton: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 5
  },
  deliveryText: {
    marginLeft: 5,
    fontSize: 16
  },
  filterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    marginVertical: 10
  },
  clockView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginRight: 20
  },
  addressView: {
    flexDirection: "row",
    backgroundColor: colors.grey5,
    borderRadius: 15,
    paddingVertical: 3,
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  headerText: {
    color: colors.grey2,
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 10
  },
  headerTextView: {
    backgroundColor: colors.grey5,
    paddingVertical: 3
  },
  smallCard: {
    borderRadius: 30,
    backgroundColor: colors.grey5,
    justifyContent: "center",
    alignItems: 'center',
    padding: 5,
    width: 80,
    margin: 10,
    height: 100
  },
  smallCardSelected: {
    borderRadius: 30,
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignItems: 'center',
    padding: 5,
    width: 80,
    margin: 10,
    height: 100
  },
  smallCardTextSelected: {
    fontWeight: "bold",
    color: colors.cardbackground
  },
  smallCardText: {
    fontWeight: "bold",
    color: colors.grey2
  },
  floatButton: {
    position: 'absolute',
    bottom: 10, right: 15,
    backgroundColor: 'white',
    elevation: 10,
    width: 60, height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
