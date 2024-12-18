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
import HomeStack from './Stacks/HomeStack';

const Tab = createBottomTabNavigator();

const RootNavigation = ({ route }: { route: Partial<Route<string>> }) => {
  const isFocused = useIsFocused();

  const getTabBarVisibility = (route: Partial<Route<string>>) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName?.includes('createTransactionsGroup') ||
        routeName?.includes('addBillsPayments') || 
        routeName?.includes('cardsDetails')) {
      return 'none';
    }
    return 'flex';
  };

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: Colors.black,
          tabBarActiveTintColor: Colors.white,
          tabBarShowLabel:false,
          swipeEnabled: true,
          tabBarStyle: {
            display: getTabBarVisibility(route),
            height: 60,
            paddingBottom: 10,
            position: 'absolute',
            overflow: 'hidden',
            borderTopWidth: 0,
          },
          tabBarBackground: () => (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              blurType="dark"
              blurRadius={25}
              blurAmount={30}
            />
          ),
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => {
              if (!isFocused) return null;
              return (
                <View style={{ alignItems: 'center' }}>
                {focused && <View style={{
                  width: 50,
                  height: 2, 
                  backgroundColor: Colors.white,
                  marginBottom: 5, 
                  borderRadius: 2,}} />}
                <MaterialCommunityIcon
                  name="home"
                  size={30}
                  color={focused ? Colors.white : Colors.gray}
                />
              </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="addcard"
          component={Addcardscreen}
          options={{
            tabBarIcon: ({ focused }) => {
              if (!isFocused) return null;
              return (
                <View style={{ alignItems: 'center' }}>
                {focused && <View style={{
                   width: 50,
                   height: 2,  
                  backgroundColor: Colors.white,
                  marginBottom: 5, 
                  borderRadius: 2,}} />}
                <MaterialCommunityIcon
                  name="credit-card-plus"
                  size={30}
                  color={focused ? Colors.white : Colors.gray}
                />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              if (!isFocused) return null;
              return (
                <View style={{ alignItems: 'center' }}>
                {focused && <View style={{
                  width: 50,
                  height: 2,  
                  backgroundColor: Colors.white,
                  marginBottom: 5, 
                  borderRadius: 2,}} />}
                <MaterialIcon
                  name="person"
                  size={30}
                  color={focused ? Colors.white : Colors.gray}
                />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default RootNavigation;
