import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome6';
import { FlatList } from "react-native-gesture-handler";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveTransactionGroups } from "../../redux/slices/transactionGroupsSlice";
import { selectedLoginId } from "../../redux/slices/LoginIdSlice";
import transactionGroups from "../../schemas/transactionGroups";

type RootStackParamList = {
    createTransactionsGroup: undefined;
    addBillsPayments: {TransactionGroup: any};
};

const QuickTransactions = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const TransactionGroups = useSelector(selectActiveTransactionGroups);
    const dispatch = useDispatch();
    const userId = useSelector(selectedLoginId);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [dispatch, userId]);
    const fetchData = () => {
        if (userId) {
            dispatch({ type: 'FetchTransactionGroupsData' });
        } else {
            setLoading(false);
        }
    };

    const handleQuickTransactions = (TransactionGroup: transactionGroups) => {
        navigation.navigate("addBillsPayments", {TransactionGroup: TransactionGroup});
    };

    const handleNavigateToCreateTransactionGroup = () => {
        setLoading(true); // Show loading while navigating
        navigation.navigate("createTransactionsGroup");
    };

    const renderCard = ({ item }: any) => {
        return (
            <TouchableOpacity style={[styles.card, {backgroundColor: colors.Lightblack}]} onPress={() => handleQuickTransactions(item)}>
                <Icon name={item.icon} size={20} color={colors.white} />
                <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headingView}>
                <Text style={styles.Modalheading}>Quick Transactions</Text>
                <TouchableOpacity style={styles.headerPlusButton} onPress={handleNavigateToCreateTransactionGroup}>
                    <FontIcon name="square-arrow-up-right" style={styles.Iconheader} size={15}/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={TransactionGroups}
                style={{marginTop: 10}}
                renderItem={renderCard}
                keyExtractor={(item) => item._id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />

            {/* {loading && (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )} */}
        </View>
    );
};

export default QuickTransactions;

const styles = StyleSheet.create({
    mainContainer: {
        height: 120,
        borderRadius: 20,
        margin: 15,
        backgroundColor: colors.blackBackgroundColor,
        padding: 10,
    },
    headingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Modalheading: {
        fontSize: 15,
        color: colors.white,
        fontFamily: "Poppins-Medium",
    },
    headerPlusButton: {
        height: 30,
        width: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray,
        borderRadius: 20,
    },
    card: {
        backgroundColor: colors.darkGray,
        borderRadius: 20,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cardText: {
        color: colors.white,
        fontSize: 8,
        fontFamily: "Poppins-Medium",
        marginTop: 2,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: "Poppins-Medium",
    },
    Iconheader: {
        // marginRight: 10,
        color: colors.white,
    }
});
