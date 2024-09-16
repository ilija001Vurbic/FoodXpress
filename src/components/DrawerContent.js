import React, { useState, useEffect } from 'react';
import { View, Text, Linking, Pressable, Alert, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Button, Icon } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { colors } from '../global/styles';
import { CommonActions } from '@react-navigation/native';

export default function DrawerContent(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
        photoURL: currentUser.photoURL || "https://bukasapics.s3.us-east-2.amazonaws.com/plate5.png"
      });
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setLoading(false);
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
          })
        );
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error signing out: ", error);
        Alert.alert("Logout Error", "Failed to logout. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: colors.buttons }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingVertical: 10 }}>
            <Avatar
              rounded
              avatarStyle={styles.avatar}
              size={75}
              source={{ uri: user?.photoURL }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: 'bold', color: colors.cardBackground, fontSize: 18 }}>
                {user?.name}
              </Text>
              <Text style={{ color: colors.cardBackground, fontSize: 14 }}>
                {user?.email}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: "space-evenly", paddingBottom: 5 }}>
            <View style={{ flexDirection: 'row', marginTop: 0 }}>
              <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontWeight: 'bold', color: colors.cardBackground, fontSize: 18 }}>1</Text>
                <Text style={{ color: colors.cardBackground, fontSize: 14 }}>Favorites</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 0 }}>
              <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontWeight: 'bold', color: colors.cardBackground, fontSize: 18 }}>0</Text>
                <Text style={{ color: colors.cardBackground, fontSize: 14 }}>My Cart</Text>
              </View>
            </View>
          </View>
        </View>

        <DrawerItemList {...props} />

        <DrawerItem
          label="Payment Methods"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="credit-card-outline"
              color={color}
              size={size}
            />
          )}
        />

        <DrawerItem
          label="Promotions"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="tag-heart"
              color={color}
              size={size}
            />
          )}
        />

        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="cog-outline"
              color={color}
              size={size}
            />
          )}
        />

        <DrawerItem
          label="Support"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="lifebuoy"
              color={color}
              size={size}
            />
          )}
        />

        <View style={{ borderTopWidth: 1, borderTopColor: colors.grey5 }}>
          <Text style={styles.preferences}>Preferences</Text>

          <View style={styles.switchText}>
            <Text style={styles.darkThemeText}>Dark Theme</Text>
            <View style={{ paddingRight: 10 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor="#f4f3f4"
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        label="Log Out"
        icon={({ color, size }) => (
          <Icon
            type="material-community"
            name="logout-variant"
            color={color}
            size={size}
          />
        )}
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    borderWidth: 4,
    borderColor: colors.pageBackground,
  },
  preferences: {
    fontSize: 16,
    color: colors.grey2,
    paddingTop: 10,
    paddingLeft: 20,
  },
  switchText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingVertical: 5,
    paddingRight: 10,
  },
  darkThemeText: {
    fontSize: 16,
    color: colors.grey2,
    paddingTop: 10,
    paddingLeft: 0,
    fontWeight: "bold",
  },
});
