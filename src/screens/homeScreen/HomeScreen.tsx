import React, { useEffect } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { HomeStyle } from "./HomeStyles";
import CardList from "../../components/CardListComponent/CardList";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsData } from "../../redux/slices/userSlice";
import { imagePaths } from "../../constants/emojis";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
type RootStackParamList = {
    addBillsPayments: undefined;
  };

const HomeScreen = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetailsData);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        dispatch({ type: 'fetchUsers' });
    }, [dispatch]);

    const handleBillsPayments = () =>{
        navigation.navigate('addBillsPayments');
    }

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

            <CardList />

            <TouchableOpacity style={HomeStyle.AddTransactionsButton} onPress={handleBillsPayments}>
                <Icon name="card-plus" size={25} style={HomeStyle.AddTransactionsIcon} />
            </TouchableOpacity>

            <Text style={HomeStyle.SubHeading}>Bills & Payments</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;
