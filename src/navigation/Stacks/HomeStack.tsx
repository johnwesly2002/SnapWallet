import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../../screens/homeScreen/HomeScreen";
import CardList from "../../components/CardListComponent/CardList";
import CardDetails from "../../screens/carddetailsScreen/CardDetails";
import AddBillPayments from "../../screens/addBillsPayments/addBillsPayments";
import CreateTransactionGroups from "../../screens/createTransactionGroups/CreateTransactionGroups";
import PaymentsScreen from "../../components/payments/payments";
import PaymentsScreenByCard from "../../components/paymentsByCard/paymentsByCard";

const Stack = createStackNavigator();
const HomeStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false,
        gestureEnabled: true,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
        }}
         initialRouteName="home">
        <Stack.Screen name="homeScreen" component={HomeScreen} />
        <Stack.Screen name="cardList" component={CardList} />
        <Stack.Screen name="cardsDetails" component={CardDetails} />
        <Stack.Screen name="paymentsScreenByCard" component={PaymentsScreenByCard} />
        <Stack.Screen name="addBillsPayments" component={AddBillPayments} />
        <Stack.Screen name="createTransactionsGroup" component={CreateTransactionGroups} />
        <Stack.Screen name="payments" component={PaymentsScreen} />

        </Stack.Navigator>
    );
}
export default HomeStack;