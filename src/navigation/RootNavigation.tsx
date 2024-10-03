import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import homeScreen from '../screens/homeScreen/HomeScreen';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { getFocusedRouteNameFromRoute, Route, useIsFocused } from '@react-navigation/native';
import Addcardscreen from '../screens/addCardScreen/Addcardscreen';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import Colors from '../constants/colors';
import { BlurView } from '@react-native-community/blur';
const Tab = createBottomTabNavigator();
const RootNavigation = () => {
    const isFocused = useIsFocused();
    return (
    <>
    <StatusBar backgroundColor="black" barStyle="light-content" />
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          position: 'absolute',
          overflow:'hidden',
          borderTopWidth: 0,
        },
        tabBarBackground: () => <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="dark"
        blurRadius={25}
        blurAmount={30}
      ></BlurView>,
    }}>
        <Tab.Screen name='home' component={homeScreen}
        options={{
            tabBarIcon: ({focused}) => {
            if (!isFocused) return null;
            return <MaterialCommunityIcon name='home' size={30} color={focused ? Colors.primary : Colors.gray} ></MaterialCommunityIcon>
        }}}
        ></Tab.Screen>
        <Tab.Screen name='addcard' component={Addcardscreen}
        options={{tabBarIcon: ({focused}) => {
            if (!isFocused) return null;
            return <MaterialCommunityIcon name='credit-card-plus' size={30} color={focused ? Colors.primary : Colors.gray} ></MaterialCommunityIcon>
        }}}
        ></Tab.Screen>
        <Tab.Screen name='profile' component={ProfileScreen}
        options={{tabBarIcon: ({focused}) => {
            if (!isFocused) return null;
            return <MaterialIcon name='person' size={30} color={focused ? Colors.primary : Colors.gray} ></MaterialIcon>
        }}}
        ></Tab.Screen>
    </Tab.Navigator>
    </>
    );
};
const getRouteName = (route: Partial<Route<string>>) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName?.includes('HomeScreen')
    ) {
      return 'none';
    }
    return 'flex';
  };
export default RootNavigation;