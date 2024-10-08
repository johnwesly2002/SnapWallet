import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../../screens/homeScreen/HomeScreen";
import CardList from "../../components/CardListComponent/CardList";
import CardDetails from "../../screens/carddetailsScreen/CardDetails";
import AddBillPayments from "../../screens/addBillsPayments/addBillsPayments";

const Stack = createStackNavigator();
const HomeStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="home">
        <Stack.Screen name="homeScreen" component={HomeScreen} />
        <Stack.Screen name="cardList" component={CardList} />
        <Stack.Screen name="cardsDetails" component={CardDetails} />
        <Stack.Screen name="addBillsPayments" component={AddBillPayments} />

        </Stack.Navigator>
    );
}
export default HomeStack;