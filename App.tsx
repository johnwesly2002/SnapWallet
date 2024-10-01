import React from "react";
import RootNavigation from './src/navigation/RootNavigation';
import {
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import AppNavigator from "./src/navigation/StackNavigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer theme={DarkTheme} >
      <AppNavigator />
    </NavigationContainer>
    </Provider>
    // <RegisterScreen />
  );
}
export default App;