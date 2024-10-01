import React, { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { HomeStyle } from "./HomeStyles";
import CardList from "../../components/CardListComponent/CardList";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsData } from "../../redux/slices/userSlice";
const HomeScreen = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetailsData);
    useEffect(() => {
        dispatch({ type: 'fetchUsers' });
        console.log(userDetails);
    },[dispatch])
    return(
        <ScrollView>
        <View style={HomeStyle.HeaderContainer}>
                    <Text style={HomeStyle.HeadingText}>{userDetails.length > 0 ? `Hello, ${userDetails[0].username}` : 'Hello, Guest'}</Text>
                    <View style={HomeStyle.ProfileImageView} >
                    <Image
                        source={require(`../../../assets/${userDetails[0].profilePic}.png`)}
                        style={HomeStyle.ProfileImage}
                    />
                    </View>
                </View>
        <CardList />
        <Text style={HomeStyle.SubHeading}>Your Transactions</Text>
        </ScrollView>
    );
};
export default HomeScreen;