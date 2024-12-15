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
import { useDispatch, useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../redux/slices/countrynameSlice";
import { getCardById, updateCardById } from "../../services/cardService";

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
  const [isEditing, setIsEditing] = useState(false);
  const [currentCardData, setCurrentCardData] = useState(cardData);
  const [editableCardData, setEditableCardData] = useState({
    balance: currentCardData.balance,
    name: currentCardData.name,
    expiry: currentCardData.expiry,
  });
  const fetchUpdatedCardData = async () => {
    const updatedCardData = await getCardById(cardData._id);
    if (updatedCardData?.length) {
      setCurrentCardData(updatedCardData[0]);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUpdatedCardData();
  }, []);

  const maskCardNumber = (number: string) => {
    if (showSensitiveInfo) return number;
    return number.slice(0, -4).replace(/\d/g, "X") + number.slice(-4);
  };
  const maskCVC = (cvc: string) => {
    return showSensitiveInfo ? cvc : cvc.replace(/\d/g, 'X');
  };
  const formatNumber = (value: string) => {
    if (!value) return '';
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Snackbar.show({
      text: "Copied Successfully",
      backgroundColor: Colors.green,
      duration: 1000,
    });
  };
  const handleEditChanges = () => {
    updateCardById(editableCardData.name, editableCardData.expiry, editableCardData.balance, cardData._id);
    dispatch({type: 'FetchCardData'});
    fetchUpdatedCardData();
    setIsEditing(false);
    Snackbar.show({
      text: "Card details updated successfully",
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
        <Text style={styles.Balance}>{currentCurrencySymbol} {formatNumber(currentCardData?.balance)}</Text>
        </View>
        <View style={[styles.animatedCard]}>
          <View style={[styles.card]}>
            <LinearGradient
              colors={[currentCardData.cardColor, "#000"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={styles.cardContent}
            >
              <Image
                style={{ height: 40, width: 40, marginTop: 40, marginLeft: 10 }}
                source={require("../../../assets/creditcardChip1.png")}
              />
              <Text style={styles.cardNumber}>
                {maskCardNumber(currentCardData.number)}
              </Text>
              <Text style={styles.cardType}>{currentCardData.type}</Text>
              <Text style={styles.cardExpiry}>{currentCardData.expiry}</Text>
              <Text style={styles.cardName}>{currentCardData.name}</Text>
            </LinearGradient>
          </View>
        </View>
      <View style={styles.subSection}>
        <Text style={styles.subHeadingText}>Details</Text>
        <View style={{flexDirection: 'row', marginRight: 20}}>
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowSensitiveInfo(!showSensitiveInfo)}
        >
          <Icon name="circle-edit-outline" size={20} color={colors.white} />
          <Text style={styles.showText}>
            {showSensitiveInfo ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if(isEditing) {
               handleEditChanges();
              }else{
                  setIsEditing(!isEditing)
          }}}
        >
          <Icon name="content-save-edit" size={20} color={colors.white} />
          <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={maskCardNumber(currentCardData.number)} editable={false} />
        <TouchableOpacity onPress={() => handleCopy(currentCardData.number)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
      {isEditing ? (
          <TextInput
            style={styles.input}
            value={editableCardData.name}
            onChangeText={(text) =>
              setEditableCardData((prev) => ({
                ...prev,
                name: text,
              }))
            }
          />
      ) : (
        <TextInput style={styles.input} value={currentCardData.name} editable={false} />
      )}
        <TouchableOpacity onPress={() => handleCopy(currentCardData.name)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
      {isEditing ? (
          <TextInput
            style={styles.input}
            value={formatNumber(editableCardData.balance)}
            keyboardType="numeric"
            onChangeText={(text) =>
              setEditableCardData((prev) => ({
                ...prev,
                balance: formatNumber(text),
              }))
            }
          />
      ) : (
      <TextInput style={styles.input} value={currentCardData.balance} editable={false} />
      )
    }
        <TouchableOpacity onPress={() => handleCopy(currentCardData.balance)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.expixycvcContainer}>
        {/* Expiry Date Input */}
        <View style={styles.ExpiryCvcinputContainer}>
        {isEditing ? (
          <TextInput
            placeholder="MM/YY"
             maxLength={5}
             keyboardType="numeric"
            style={styles.input}
            value={editableCardData.expiry}
            onChangeText={(text) => {
              let formattedText = text.replace(/[^0-9]/g, '');
              if (formattedText.length > 2) {
                formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
              }
              setEditableCardData((prev) => ({
                ...prev,
                expiry: formattedText,
              }));
            }}
          />
          ) : (
          <TextInput style={styles.input} value={currentCardData.expiry} editable={false} />
          )}
          <TouchableOpacity onPress={() => handleCopy(currentCardData.expiry)}>
            <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* CVC Input */}
        <View style={styles.ExpiryCvcinputContainer}>
          <TextInput style={styles.input} value={maskCVC(currentCardData.cvc)} editable={false} />
          <TouchableOpacity onPress={() => handleCopy(currentCardData.cvc)}>
            <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.SubText}>Payments of Cards</Text>
      <PaymentsScreenByCard cardNumber={currentCardData._id} />
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
  editButton: {
    flexDirection: 'row',
    borderRadius: 5,
  },
  editButtonText: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
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
    flexDirection: 'row',
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
  saveButton: {
    backgroundColor: Colors.green,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default CardDetails;
