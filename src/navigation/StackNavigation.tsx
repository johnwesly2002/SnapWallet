import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import RootNavigation from './RootNavigation';
import AuthStack from './Stacks/AuthStack';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
            <Stack.Navigator initialRouteName="Register" screenOptions={{headerShown: false,}}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="RootNavigation" component={RootNavigation} />
            </Stack.Navigator>
    );
};

export default AppNavigator;
