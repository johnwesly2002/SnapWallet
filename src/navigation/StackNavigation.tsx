import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import RootNavigation from './RootNavigation';
import AuthStack from './Stacks/AuthStack';
import { selectIsRegistered, setIsRegister } from '../redux/slices/registerSlice';
import AsyncStorageService from '../services/AsyncService';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const dispatch = useDispatch();
    const isRegister = useSelector(selectIsRegistered);
    const [isLoading, setIsLoading] = useState(true);

    // Check registration status and load from AsyncStorage
    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                const storedIsRegister = await AsyncStorageService.getItem('isRegister');
                if (storedIsRegister) {
                    dispatch(setIsRegister(true));
                } else {
                    dispatch(setIsRegister(false));
                }
            } catch (error) {
                console.error('Error fetching registration status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkRegistrationStatus();
    }, [dispatch]);

    if (isLoading) {
        return null; 
    }

    return (
            <Stack.Navigator
                initialRouteName={isRegister ? 'RootNavigation' : 'AuthStack'}
                screenOptions={{ headerShown: false }}
            >
                {isRegister ? (
                    <Stack.Screen name="RootNavigation" component={RootNavigation} />
                ) : (
                    <Stack.Screen name="AuthStack" component={AuthStack} />
                )}
            </Stack.Navigator>
    );
};

export default AppNavigator;
