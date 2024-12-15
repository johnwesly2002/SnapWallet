import React, { useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectedExpenses } from "../../redux/slices/expensesSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EditIcon from "react-native-vector-icons/MaterialIcons";
import colors from "../../constants/colors";
import { selectedLoginId } from "../../redux/slices/LoginIdSlice";
import { Image } from "react-native-animatable";
import { selectCountryData } from "../../redux/slices/countrySlice";
import { selectCurrencySymbol } from "../../redux/slices/countrynameSlice";
import moment from "moment";
import { SwipeListView } from "react-native-swipe-list-view";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
type RootStackParamList = {
  createTransactionsGroup: undefined;
  addBillsPayments: {TransactionGroup: any,existingPayment: any};
};
const PaymentsScreen = () => {
  const dispatch = useDispatch();
  const countryData = useSelector(selectCountryData);
  const userId = useSelector(selectedLoginId);
  const currentSymbol = useSelector(selectCurrencySymbol);
 const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    if (userId) {
      dispatch({ type: "FetchCountryData" });
      dispatch({ type: "FetchExpensesData" });
    }
  }, [dispatch, userId, currentSymbol]);

  const paymentsData = useSelector(selectedExpenses);

  const groupedExpenses = paymentsData.reduce((groups: any, item: any) => {
    const date = moment(item.date).format("YYYY-MM-DD");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const groupedData = Object.keys(groupedExpenses)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map(date => ({
      date,
      data: groupedExpenses[date],
    }));

  const maskCardNumber = (number: String) => {
    const lastFourDigits = number.slice(-4);
    const maskedNumber = "XXXX " + lastFourDigits;
    return maskedNumber;
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "..";
    } else {
      return description;
    }
  };

  const handleEditPress = (item: any) => {
    navigation.navigate("addBillsPayments",{TransactionGroup: item.transactionGroup,  existingPayment: item});
  };

  const renderExpenseItem = ({ item }: any) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.blackBackgroundColor,
        padding: 8,
        margin: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          marginTop: 3,
          height: 40,
          width: 40,
          backgroundColor: colors.Lightblack,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name={item.transactionGroup?.icon} size={25} color={colors.white} />
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
          left: 54,
          top: 10,
          bottom: 0,
        }}
      >
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 13, color: colors.lightWhite }}>
          {truncateDescription(item.Description, 15)}
        </Text>
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 10, color: colors.lightWhite }}>
          {maskCardNumber(item.card.number)} -{" "}
          {moment(item.date).format("DD MMM YYYY")}
        </Text>
      </View>
      <View style={{ marginTop: 7 }}>
        <Text style={{ color: colors.lightWhite}}>
          {currentSymbol ? currentSymbol : ""}
          {item.amount}
        </Text>
      </View>
    </View>
  );

  const renderDateSection = ({ item }: any) => (
    <View>
      <Text
        style={{
          color: colors.white,
          fontFamily: "Poppins-Medium",
          fontSize: 9,
          marginLeft: 25,
          marginTop: 10,
        }}
      >
        {moment(item.date).calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "DD MMM YYYY",
        })}
      </Text>

      <SwipeListView
        data={item.data}
        renderItem={renderExpenseItem}
        keyExtractor={(expense: any) => expense._id.toString()}
        renderHiddenItem={(data, rowMap) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.highlightcolor,
                height: 50,
                width: 70,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              onPress={() => handleEditPress(data.item)}
            >
              <EditIcon name="edit" size={24} color={Colors.black} />
              <Text style={{ color: colors.black, fontFamily: "Poppins-Medium", fontSize: 10 }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
      />
    </View>
  );

  return (
    <View>
      {paymentsData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            borderRadius: 25,
            backgroundColor: colors.blackBackgroundColor,
          }}
        >
          <Image
            source={require("../../../assets/empty_Payment.png")}
            style={{ height: 200, width: 200 }}
          />
          <Text
            style={{
              marginTop: 10,
              color: colors.gray,
              fontFamily: "Poppins-Medium",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            No Payments available
          </Text>
        </View>
      ) : (
        <FlatList
          data={groupedData}
          renderItem={renderDateSection}
          keyExtractor={item => item.date}
        />
      )}
    </View>
  );
};

export default PaymentsScreen;
