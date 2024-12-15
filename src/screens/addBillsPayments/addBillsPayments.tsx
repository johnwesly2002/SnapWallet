import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveCards } from "../../redux/slices/cardSlice";
import { selectedLoginId } from "../../redux/slices/LoginIdSlice";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";
import { updateCardDetails } from "../../services/cardService";
import Snackbar from "react-native-snackbar";
import moment from "moment";
import { createExpenses, updateExpenseById } from "../../services/expensesService";
import { selectUserDetailsData } from "../../redux/slices/userSlice";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { selectCountryData } from "../../redux/slices/countrySlice";

type RootStackParamList = {
  homeScreen: undefined;
  cardsDetails: { cardData: any };
};

interface BillCategory {
  label: string;
  value: string;
  icon: () => JSX.Element;
}

interface Card {
  id: string;
  _id: Realm.BSON.ObjectId;
  number: string;
  type: string;
  expiry: string;
  name: string;
  cardColor: string;
  balance: string;
}

export type addBillsPaymentsProp = RouteProp<
  {
    addBillsPayments: {
      TransactionGroup: any;
      existingPayment?: any;
    };
  },
  "addBillsPayments"
>;
const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  description: yup.string().required("Description is required"),
  selectedCard: yup.object().nullable().required("Please select a card"),
});
const defaultTransactionGroup = [{
  "_id": 55,
  "name": "Others",
  "icon": "strategy",
  "Color": "#33FF57",
}];

const AddBillPayments = () => {
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const cards: Card[] = useSelector(selectActiveCards);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [date, setDate] = useState(moment().format("YYYY-MM-DDTHH:mm:ss"));
  const [Description, setDescription] = useState("");
  const userId = useSelector(selectedLoginId);
  const amountInputRef = useRef<TextInput>(null); 
  const userDetails = useSelector(selectUserDetailsData);
  const dispatch = useDispatch();
  const route = useRoute<addBillsPaymentsProp>();
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 0,
      description: "",
      selectedCard: {},
    },
    resolver: yupResolver(validationSchema),
  });
  const TransactionGroup = route.params;
  const existingPayment = route.params.existingPayment;
  const transactionGroupsArray =  TransactionGroup.TransactionGroup
  ? [TransactionGroup.TransactionGroup]
  : defaultTransactionGroup;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const countryData = useSelector(selectCountryData);
  useEffect(() => {
    if (userId) {
      dispatch({ type: "FetchCountryData" });
      dispatch({ type: "FetchCardData" });
    }

    if (route.params.existingPayment) {
    setAmount(existingPayment.amount.toString());
    setDescription(existingPayment.Description);
    setSelectedCard(existingPayment.card);
    setSelectedCardId(existingPayment.card._id);

    setValue('amount', existingPayment.amount.toString());
    setValue('description', existingPayment.Description);
    setValue('selectedCard', existingPayment.card);
    }

    amountInputRef.current?.focus();
  }, [userId, dispatch, route.params]);

  const handleAddBill = () => {
    if (!selectedCard) {
      Alert.alert("Please select a card");
      return;
 }
    const numericAmount = parseFloat(amount);
    const numericBalance = parseFloat(selectedCard.balance);

    if (numericBalance < numericAmount) {
      Snackbar.show({
        text: `Insufficient Balance ${selectedCard.balance}`,
        backgroundColor: colors.red,
        duration: 1500,
      });
    } else {
      const updatedBalance = (numericBalance - numericAmount).toFixed(2);
      updateCardDetails(updatedBalance, selectedCard._id);
      console.log(transactionGroupsArray[0]);
      if(route.params.existingPayment){
        updateExpenseById(
        existingPayment._id,
        Description,
        numericAmount,
        transactionGroupsArray[0],
        selectedCard,
        existingPayment.date,
      );
      }else{
      createExpenses(
        userDetails[0]._id,
        Description,
        numericAmount,
        transactionGroupsArray[0],
        selectedCard,
        date
      );
    }
      dispatch({ type: "FetchExpensesData" });
      setAmount("");
      setDescription("");
      setSelectedCard(null);
      Snackbar.show({
        text: `Bill Successfully Added`,
        backgroundColor: colors.green,
        duration: 1500,
      });
      setModalVisible(false); 
    }
  };

  const maskCardNumber = (number: string) => {
    const lastFourDigits = number.slice(-4);
    return "XXXX " + lastFourDigits;
  };

  const handleCardSelect = (creditCard: Card, id: string) => {
    console.log(creditCard);
    setSelectedCard(creditCard);
    setSelectedCardId(id);
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleChange = (text: string) => {
    let rawValue = text.replace(/,/g, '');
    
    let numericValue = parseFloat(rawValue);
    if (numericValue < 0) {
      numericValue = 0;
    }
    const formattedValue = numericValue.toLocaleString('en-IN');
    setAmount(parseAmount(text));
  };
  
  
  

  const formatNumber = (value: string) => {
    if (!value) return '';
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const removeCommas = (str: string) => {
    return str.replace(/,/g, "");
  };
  const parseAmount = (value: string) => {
    return value.replace(/,/g, ''); 
  };

  const renderCard = ({ item }: { item: Card }) => (
    <TouchableOpacity
      style={[
        styles.card,
      ]}
      onPress={() => handleCardSelect(item,item._id.toString())}
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardType}>{item.type}</Text>
          <Text style={styles.cardNumber}>{maskCardNumber(item.number)}</Text>
        </View>
        <Icon
          name={selectedCardId == item._id.toString() ? "radiobox-marked" : "radiobox-blank"}
          size={24}
          color={selectedCardId == item._id.toString() ? "#FFFFFF" : "#CCCCCC"}
        />
      </View>
    </TouchableOpacity>
  );
  

const RenderModal = () => (
  <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleModalClose}>
    <View style={styles.modalContainer}>
      <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: colors.white,
            height: 5,
            width: 50,
            borderRadius: 10,
          }}
        ></View>
      </View>
      <Text style={styles.Modalheading}>Select a Card</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item._id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  </Modal>
);

  const handleNavigation = () => {
    navigation.navigate("homeScreen");
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.HeaderContainer} onPress={handleNavigation}>
          <MaterialIcon name="arrow-back-ios" size={20} color={colors.white} style={styles.headerBackIcon} />
          <Text style={styles.HeadingText}>Bills & Payments</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.tagContainer}>
          {transactionGroupsArray.map((group, index) => (
            <View key={index} style={[styles.tag]}>
              <Icon name={group.icon} size={100} color={colors.white} />
              <Text style={styles.tagText}>{group.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.centeredContainer}>
        <View style={styles.amountContainer}>
    <Text style={[styles.currencySymbol, { left: 100 - amount.length*9 }]}>{countryData[0]?.symbol ? countryData[0]?.symbol : '' }</Text>
    <Controller
      control={control}
      name="amount"
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.AmountInput, { width: `${Math.min(amount.length * 10 + 60, 300)}%`, color: existingPayment ? colors.gray : colors.lightWhite, }]}
          ref={amountInputRef}
          placeholder="0"
          maxLength={7}
          placeholderTextColor={colors.lightWhite}
          keyboardType="numeric"
          onBlur={() => {
            onBlur();
            trigger('amount');
          }}
          value={formatNumber(amount)}
          editable={!existingPayment}
          onChangeText={(text) => {
            setAmount(text);
            onChange(parseAmount(text));
            handleChange(text);
          }}
        />
      )}
    />
  </View>
  {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="Add Description"
            placeholderTextColor={colors.lightWhite}
            onBlur={onBlur}
            value={Description}
            onChangeText={(text) => {
              setDescription(text); 
              onChange(text);
            }}
          />
        )}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

        </View>
        </ScrollView>
        {selectedCard && (
        <TouchableOpacity style={[styles.selectedCardView, {backgroundColor: existingPayment ? colors.loadingcolor : colors.blackBackgroundColor }]} onPress={() => {
          if (!existingPayment) setModalVisible(true);
        }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
           <View
          style={{
            backgroundColor: colors.white,
            justifyContent: 'center',
            height: 5,
            width: 50,
            borderRadius: 10,
          }}
        ></View>
        </View>
          <Text style={styles.selectedCardText}>
            {`${selectedCard.type}`}
          </Text>
          <Text style={styles.selectedCardNumber}>
            {`${selectedCard.number}`}
          </Text>
          <Icon
          name="check-decagram"
          size={24}
          color={colors.green}
          style={{ position: 'absolute', right: 10, top: '65%', transform: [{ translateY: -12 }] }} 
        />
        </TouchableOpacity>
      )}
        <TouchableOpacity style={styles.AddBillbutton} onPress={handleSubmit((data) => {
          if (selectedCard) {
            handleAddBill();
          } else {
            if(cards.length > 0){
            setModalVisible(true);
            }else{
              Snackbar.show({
                text: "No cards Present to make Bills and Payments",
                backgroundColor: colors.red,
                duration: 1000,
            });
            }
          }
        })}
      >
          <Text style={styles.buttonText}>Add Bill</Text>
        </TouchableOpacity>
      </View>
      <RenderModal />
    </>
  );
};

const styles = StyleSheet.create({
  headerBackIcon: {
    margin: 5,
  },
  selectedCardView: {
    padding: 15,
    marginVertical: -10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  selectedCardText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: colors.white,
  },
  selectedCardNumber: {
    fontSize: 10,
    color: colors.gray,
  },
  HeadingText: {
    fontSize: 20,
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.black,
    justifyContent: "space-between",
  },
  Modalheading: {
    fontSize: 20,
    marginLeft: 10,
    color: colors.white,
    fontFamily: "Poppins-SemiBold",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 16, 
    backgroundColor: colors.black, 
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  tag: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
    margin: 4,
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  input: {
    height: 80,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    paddingHorizontal: 10,
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  currencySymbol: {
    fontSize: 25,
    color: '#333',
  },
  AmountInput: {
    flex: 1, 
    height: 80,
    textAlign: 'center',
    color: colors.lightWhite,
    fontSize: 40,
    paddingVertical: 5,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  closeBlurArea: {
    flex: 1,
    zIndex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.blackBackgroundColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    zIndex: 2,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardListContainer: {
    marginTop: 40,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  AddBillbutton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.white, 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 16, 
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  card: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: colors.lightgray,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  cardNumber: {
    fontSize: 14,
    color: colors.gray,
  },
  radioButton: {
    marginLeft: 10,
  },
  errorInput: { 
    borderColor: "red"
   },
  errorText: { 
    color: "red",
     marginBottom: 10,
     fontSize: 12,
     textAlign: 'center',
     },
});

export default AddBillPayments;