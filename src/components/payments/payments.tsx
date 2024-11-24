import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectedExpenses } from "../../redux/slices/expensesSlice";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../constants/colors";
import { selectedLoginId } from "../../redux/slices/LoginIdSlice";
import { Image } from "react-native-animatable";
import { selectCountryData } from "../../redux/slices/countrySlice";
const PaymentsScreen = () => {
    const dispatch = useDispatch();
    const countryData = useSelector(selectCountryData);
    const userId = useSelector(selectedLoginId);
    useEffect(() => {
        if(userId){
        dispatch({ type: "FetchCountryData" });
        dispatch({type: 'FetchExpensesData'});
        }
    },[dispatch,userId]);
    const maskCardNumber = (number: String) => {
        const lastFourDigits = number.slice(-4);
        const maskedNumber = 'XXXX ' + lastFourDigits;
        return maskedNumber;
      };
    const paymentsData = useSelector(selectedExpenses);
    const renderExpenses = ({item}: any) => {
        return(
        <View style={{flexDirection:'row',justifyContent: 'space-between', backgroundColor: colors.blackBackgroundColor,padding: 8, margin: 10, borderRadius: 10}}>
            <View style={{marginTop:3,height: 40,width: 40,backgroundColor: colors.Lightblack, borderRadius: 20,justifyContent: 'center', alignItems: 'center'}}>
            <Icon name={item.transactionGroup?.icon} size={25} color={colors.white} />
            </View>
            <View style={{position: 'absolute',right: 0,left: 54,top: 10,bottom: 0}}>
            <Text style={{fontFamily:'Poppins-Regular', fontSize: 13}}>{item.Description}</Text>
            <Text style={{fontFamily:'Poppins-Regular', fontSize: 10}}>{maskCardNumber(item.card.number)}</Text>
            </View>
            <View style={{marginTop:7}}>
            <Text>{countryData[0]?.symbol ? countryData[0]?.symbol : ''}{item.amount}</Text>
            </View>
        </View>
        );
    };
    return(
        <View>
             {paymentsData.length === 0 ?    (
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderRadius: 25,
                backgroundColor: colors.blackBackgroundColor,
                }}
            >
                <Image
                source={require('../../../assets/empty_Payment.png')}
                style={{ height: 200, width: 200 }}
                />
                <Text
                style={{
                    marginTop: 10,
                    color: colors.gray,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                    fontSize: 16,
                }}
                >
                No Payments available
                </Text>
            </View>
            ): (
            <FlatList
            data={paymentsData}
            renderItem={renderExpenses}
            keyExtractor={(item) => item._id.toString()}
            />
        )}
    </View>
    );
};
export default PaymentsScreen;