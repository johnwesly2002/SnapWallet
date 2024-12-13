import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Snackbar from "react-native-snackbar";
import Colors from "../../constants/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import colors from "../../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import PaymentsScreenByCard from "../../components/paymentsByCard/paymentsByCard";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../redux/slices/countrynameSlice";

export type CardDetailsProp = RouteProp<
  {
    cardsDetails: {
      cardData: any;
    };
  },
  "cardsDetails"
>;

const CardDetails = () => {
  const route = useRoute<CardDetailsProp>();
  const { cardData } = route.params;
  const currentCurrencySymbol = useSelector(selectCurrencySymbol);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const maskCardNumber = (number: string) => {
    if (showSensitiveInfo) return number;
    return number.slice(0, -4).replace(/\d/g, "X") + number.slice(-4);
  };
  const maskCVC = (cvc: string) => {
    return showSensitiveInfo ? cvc : cvc.replace(/\d/g, 'X');
  };
  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Snackbar.show({
      text: "Copied Successfully",
      backgroundColor: Colors.green,
      duration: 1000,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeadingText}>Card Details</Text>
      </View>
      <ScrollView >
        <View >
        <Text style={styles.BalanceText}>Total Balance</Text>
        <Text style={styles.Balance}>{currentCurrencySymbol} {cardData?.balance}</Text>
        </View>
        <View style={[styles.animatedCard]}>
          <View style={[styles.card]}>
            <LinearGradient
              colors={[cardData.cardColor, "#000"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={styles.cardContent}
            >
              <Image
                style={{ height: 40, width: 40, marginTop: 40, marginLeft: 10 }}
                source={require("../../../assets/creditcardChip1.png")}
              />
              <Text style={styles.cardNumber}>
                {maskCardNumber(cardData.number)}
              </Text>
              <Text style={styles.cardType}>{cardData.type}</Text>
              <Text style={styles.cardExpiry}>{cardData.expiry}</Text>
              <Text style={styles.cardName}>{cardData.name}</Text>
            </LinearGradient>
          </View>

          {/* <View style={[styles.card]}>
            <LinearGradient
              colors={[cardData.cardColor, "#000"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={styles.cardContent}
            >
            <View style={styles.blackStripe}></View>
              <View style={styles.whiteBar}>
                <Text style={styles.cvvLabel}>CVV</Text>
                <Text style={styles.cvv}>{cardData.cvc ? cardData.cvc : '###'}</Text>
              </View>
            </LinearGradient>
        </View> */}
        </View>
      <View style={styles.subSection}>
        <Text style={styles.subHeadingText}>Details</Text>
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowSensitiveInfo(!showSensitiveInfo)}
        >
          <Text style={styles.showText}>
            {showSensitiveInfo ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={maskCardNumber(cardData.number)} editable={false} />
        <TouchableOpacity onPress={() => handleCopy(cardData.number)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={cardData.name} editable={false} />
        <TouchableOpacity onPress={() => handleCopy(cardData.name)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.expixycvcContainer}>
        {/* Expiry Date Input */}
        <View style={styles.ExpiryCvcinputContainer}>
          <TextInput style={styles.input} value={cardData.expiry} editable={false} />
          <TouchableOpacity onPress={() => handleCopy(cardData.expiry)}>
            <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* CVC Input */}
        <View style={styles.ExpiryCvcinputContainer}>
          <TextInput style={styles.input} value={maskCVC(cardData.cvc)} editable={false} />
          <TouchableOpacity onPress={() => handleCopy(cardData.cvc)}>
            <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.SubText}>Payments of Cards</Text>
      <PaymentsScreenByCard cardNumber={cardData._id} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  HeadingText: {
    fontSize: 20,
    marginLeft: 10,
    color: Colors.white,
    fontFamily: "Poppins-SemiBold",
  },
  container: {
    flex: 1,
    position: 'relative',
},
  SubText: {
    fontSize: 15,
    marginLeft: 20,
    color: Colors.darkGray,
    fontFamily: "Poppins-SemiBold",
  },
  subHeadingText: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: -5,
    color: Colors.darkGray,
    fontFamily: "Poppins-SemiBold",
  },
  Balance: {
    fontSize: 30,
    marginLeft: 20,
    color: Colors.white,
    fontFamily: "Poppins-SemiBold",
  },
  BalanceText: {
    fontSize: 14,
    marginLeft: 20,
    marginTop: -5,
    color: Colors.darkGray,
    fontFamily: "Poppins-Medium",
  },
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    position: "absolute",
    backfaceVisibility: "hidden",
    borderRadius: 15,
    height: 200,
    width: "100%",
    padding: 5,
    overflow: "hidden",
  },
  cardContent: {
    height: "100%",
    borderRadius: 15,
    elevation: 20,
  },
  cardCVC: {
    fontSize: 18,
    fontFamily: 'Orbitron-Medium',
    color: "#fff",
    margin: 10,
  },
  cardBackText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    marginTop: 50,
  },
  animatedCard: {
    margin: 15,
    width: "90%",
    borderRadius: 15,
    height: 200,
  },
  cardNumber: {
    fontSize: 14,
    fontFamily: 'Orbitron-Medium',
    color: "#fff",
    letterSpacing: 2,
    margin: 10,
  },
  cardName: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
    fontFamily: 'Orbitron-Medium',
    color: "#fff",
  },
  cardType: {
    fontSize: 16,
    color: "#fff",
    fontFamily: 'Orbitron-Medium',
    position: "absolute",
    top: 5,
    right: 20,
  },
  cardExpiry: {
    fontSize: 16,
    fontFamily: 'Orbitron-Medium',
    color: "#fff",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  subSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showButton: {
    marginRight: 20,
    marginBottom: 20,
  },
  showText: {
    marginLeft: 10,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: Colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blackBackgroundColor,
    padding: 5,
    borderRadius: 15,
    margin: 10,
  },
  ExpiryCvcinputContainer: {
    flexDirection: 'row',
    width: '44%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blackBackgroundColor,
    padding: 5,
    borderRadius: 15,
    margin: 10,
  },
  input: {
    color: Colors.white,
    fontSize: 16,
    flex: 1,
  },
  expixycvcContainer: {
    flexDirection: 'row',
  },
  Copyicon: {
    marginRight: 10,
  },
  blackStripe: {
    backgroundColor: 'black',
    height: 40,
    width: '120%',
    position: 'absolute',
    top: 30,
  },
  whiteBar: {
    backgroundColor: 'white',
    height: 40,
    width: '50%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 60,
    right: 0,
  },
  cvvLabel: {
    color: Colors.black,
    fontSize: 12,
  },
  cvv: {
    fontSize: 18,
    color: Colors.black,
    marginLeft: 'auto',
  },
});

export default CardDetails;
