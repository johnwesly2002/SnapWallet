import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RegisterScreen from "../../screens/RegisterScreen/RegisterScreen";
import CountrySelectionScreen from '../../screens/countrySelectionScreen/countryselection';

const Stack = createStackNavigator();
const AuthStack = () => {
    return ( 
        <Stack.Navigator screenOptions={{headerShown: false,
            gestureEnabled: true,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 300 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },
            }}
             initialRouteName="Register">
             <Stack.Screen name="Register" component={RegisterScreen} />
             <Stack.Screen name="countrySelectionScreen" component={CountrySelectionScreen} />
        </Stack.Navigator>
    );
};
export default AuthStack;