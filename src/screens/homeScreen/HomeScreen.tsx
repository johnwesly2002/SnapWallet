import React, { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { HomeStyle } from "./HomeStyles";
import CardList from "../../components/CardListComponent/CardList";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsData } from "../../redux/slices/userSlice";
import { imagePaths } from "../../constants/emojis";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Snackbar from "react-native-snackbar";
import colors from "../../constants/colors";
import QuickTransactions from "../../components/quick Transactions/QuickTransactions";

type RootStackParamList = {
    addBillsPayments: undefined;
};

const HomeScreen = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetailsData);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        dispatch({ type: 'fetchUsers' });
        Snackbar.show({
            text: `Welcome Back`,
            backgroundColor: colors.skyBlue,
            duration: 1500,
        });
        dispatch({type: 'FetchExpensesData'});
    }, [dispatch]);

    const handleBillsPayments = () => {
        navigation.navigate('addBillsPayments');
    };

    return (
        <SafeAreaView style={HomeStyle.container}>
            <View style={HomeStyle.HeaderContainer}>
                <Text style={HomeStyle.HeadingText}>
                    {userDetails.length > 0 ? `Hello, ${userDetails[0].username}` : 'Hello, Guest'}
                </Text>
                <View style={HomeStyle.ProfileImageView}>
                    <Image
                        source={userDetails[0] ? imagePaths[userDetails[0].profilePic] : null}
                        style={HomeStyle.ProfileImage}
                    />
                </View>
            </View>
            <View style={HomeStyle.ScrollViewContainer}>
                <ScrollView contentContainerStyle={HomeStyle.scrollContent} showsVerticalScrollIndicator={false}>
                    <CardList />

                    <QuickTransactions />
                    <Text style={HomeStyle.HeadingText}>
                    Payments
                </Text>
                </ScrollView>

                {/* Button stays at the bottom */}
                <TouchableOpacity style={HomeStyle.AddTransactionsButton} onPress={handleBillsPayments}>
                    <Icon name="card-plus" size={25} style={HomeStyle.AddTransactionsIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

