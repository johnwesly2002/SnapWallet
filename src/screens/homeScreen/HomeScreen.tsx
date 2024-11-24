import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
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
import PaymentsScreen from "../../components/payments/payments";

type RootStackParamList = {
  addBillsPayments:  any | null;
  createTransactionsGroup: undefined;
};

const HomeScreen = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const userDetails = useSelector(selectUserDetailsData);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollY = useRef(0);
  useEffect(() => {
    dispatch({ type: "fetchUsers" });
    Snackbar.show({
      text: `Welcome Back`,
      backgroundColor: colors.skyBlue,
      duration: 1500,
    });
  }, [dispatch]);

  const handleOptionSelect = (option: string) => {
    setShowOptions(false);
    switch (option) {
      case "Add Payment":
        navigation.navigate("addBillsPayments", {});
        break;
      case "Quick Transaction":
        navigation.navigate("createTransactionsGroup");
        break;
      default:
        break;
    }
  };
  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const threshold = 10;
  
    if (currentOffset - scrollY.current > threshold && isButtonVisible) {
      setIsButtonVisible(false);
    } 
    else if (scrollY.current - currentOffset > threshold && !isButtonVisible) {
      setIsButtonVisible(true);
    }
  
    scrollY.current = currentOffset;
  };

  return (
    <SafeAreaView style={HomeStyle.container}>
      <View style={HomeStyle.HeaderContainer}>
        <Text style={HomeStyle.HeadingText}>
          {userDetails.length > 0
            ? `Hello, ${userDetails[0].username}`
            : "Hello, Guest"}
        </Text>
        <View style={HomeStyle.ProfileImageView}>
          <Image
            source={
              userDetails[0] ? imagePaths[userDetails[0].profilePic] : null
            }
            style={HomeStyle.ProfileImage}
          />
        </View>
      </View>
      <View style={HomeStyle.ScrollViewContainer}>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={HomeStyle.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <CardList />
          <QuickTransactions />
          <Text style={HomeStyle.HeadingText}>Payments</Text>
          <PaymentsScreen />
        </ScrollView>
        {isButtonVisible && (
          <>
            {showOptions && (
              <>
                <TouchableOpacity
                  style={[styles.overlay, { zIndex: showOptions ? 1 : -1 }]}
                  onPress={() => setShowOptions(false)}
                  activeOpacity={1}
                />
                <View style={styles.optionsContainer}>
                  <View
                    style={styles.optionButton}
                  >
                    <Text style={styles.optionText}>Add Payment</Text>
                    <TouchableOpacity style={styles.optionsIconContainer}  onPress={() => handleOptionSelect("Add Payment")}>
                    <Icon name="credit-card-plus" size={30} color={colors.black} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.optionButton}
                  >
                    <Text style={styles.optionText}>Quick Transaction</Text>
                    <TouchableOpacity style={styles.optionsIconContainer} onPress={() => handleOptionSelect("Quick Transaction")}>
                    <Icon name="lightning-bolt" size={30} color={colors.black} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            <View style={styles.fabContainer}>
              <TouchableOpacity
                style={styles.fab}
                onPress={() => setShowOptions(!showOptions)}
              >
                <Icon
                  name={showOptions ? "close" : "plus"}
                  size={30}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 80,
    right: 20,
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.BlurView,
    zIndex: 2,
    elevation: 2,
  },
  optionsIconContainer:{
    height:50,
    width:50,
    backgroundColor:colors.white,
     alignItems: 'center',
     justifyContent:'center',
     borderRadius:40,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.darkRed,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 4,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 150, 
    right: 12, 
    backgroundColor: colors.BlurView2,
    borderRadius: 8,
    padding: 10,
    zIndex: 3,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    left: 10,
    borderRadius: 8,
    marginBottom: 5,
    width: 250, 
  },
  optionText: {
    color: colors.white,
    fontSize: 15,
    marginRight: 5,
    flex: 1,  
    textAlign: 'right',
    fontFamily: 'Poppins-Medium',
  },
});
  