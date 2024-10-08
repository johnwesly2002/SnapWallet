import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, FlatList, Image } from "react-native";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveCards } from "../../redux/slices/cardSlice";
import { selectedLoginId } from "../../redux/slices/LoginIdSlice";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";
import { updateCardDetails } from "../../services/cardService";
import Snackbar from "react-native-snackbar";
type RootStackParamList = {
    homeScreen: undefined;
    cardsDetails: {cardData: any};
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

const billCategories: BillCategory[] = [
    { label: 'Shopping', value: 'shopping', icon: () => <Icon name="cart" size={20} color={colors.white} /> },
    { label: 'Travel', value: 'travel', icon: () => <Icon name="airplane" size={20} color={colors.white} /> },
    { label: 'Recharges', value: 'recharges', icon: () => <Icon name="cellphone-wireless" size={20} color={colors.white} /> },
    { label: 'EMI', value: 'emi', icon: () => <Icon name="cash-multiple" size={20} color={colors.white} /> },
    { label: 'Fees', value: 'fees', icon: () => <Icon name="account-cash" size={20} color={colors.white} /> },
    { label: 'Rent', value: 'rent', icon: () => <Icon name="home" size={20} color={colors.white} /> },
];


const AddBillPayments = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(billCategories[0].value);
    const [modalVisible, setModalVisible] = useState(true);
    const cards: Card[] = useSelector(selectActiveCards);
    const [selectedCard, setSelectedCard] = useState<Card>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(category);
    const [items, setItems] = useState(billCategories.map(cat => ({ ...cat, icon: cat.icon })));
    const userId = useSelector(selectedLoginId);
    const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    useEffect(() => {
        if (userId) {
            dispatch({ type: 'FetchCardData' });
        }
    }, [userId, dispatch]);

    const handleAddBill = () => {
        const numericAmount = parseFloat(amount); 
        const numericBalance = parseFloat(selectedCard!.balance);
    
        if (numericBalance < numericAmount) {
            Snackbar.show({
                text: `Insufficient Balance ${selectedCard!.balance} `,
                backgroundColor: colors.red,
                duration: 1500,
              });
        } else {
            const updatedBalance = (numericBalance - numericAmount).toFixed(2); 
            updateCardDetails(updatedBalance,selectedCard!._id);
            setAmount('');
            setCategory(billCategories[0].value);
            Snackbar.show({
                text: `Bill Successfully Added`,
                backgroundColor: colors.green,
                duration: 1500,
              });
        }
    };
    
    const maskCardNumber = (number: string) => {
        const lastFourDigits = number.slice(-4);
        return 'XXXX ' + lastFourDigits;
    };

    const handleCardSelect = (creditCard: Card) => {
        setSelectedCard(creditCard);
        setModalVisible(false);
    };
    const handleModalClose = () => {
        setModalVisible(false)
        navigation.navigate('homeScreen');
    };
    const formatNumber = (num: string) => {
        if (!num) return num;
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    
    const removeCommas = (str: string) => {
        return str.replace(/,/g, '');
    };
    const handleAmountChange = (value: string) => {
        const numericValue = removeCommas(value);
        setAmount(numericValue);
    };
    

    const renderCard = ({ item }: { item: Card }) => (
        <LinearGradient
            key={item.id}
            colors={[item.cardColor, '#000']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.card}
        >
            <TouchableOpacity onPress={() => handleCardSelect(item)}>
                <Text style={styles.cardNumber}>{maskCardNumber(item.number)}</Text>
                <Text style={styles.cardType}>{item.type}</Text>
                <Text style={styles.cardExpiry}>{item.expiry}</Text>
                <Text style={styles.cardName}>{item.name}</Text>
                <Image style={{ height: 40, width: 40, marginTop: 40, marginLeft: 10 }} source={require('../../../assets/creditcardChip1.png')} />
            </TouchableOpacity>
        </LinearGradient>
    );

    const RenderModal = () => {
        return(
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView
            style={styles.blurContainer}
            blurType="dark"
            blurAmount={20}
            >
                <TouchableOpacity onPress={handleModalClose} style={styles.closeBlurArea}>
                </TouchableOpacity>
            </BlurView>
            <View style={styles.modalContainer}>
                <View style={styles.centeredView}>
                <View style={{backgroundColor: colors.white,height: 5, width: 50,borderRadius: 10}}></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.Modalheading}>Select a Card</Text>
                {/* <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
                    <Icon name="close" size={24} color={colors.white} />
                </TouchableOpacity> */}
                </View>
                <View style={styles.cardListContainer}>
                    <FlatList
                        data={cards}
                        renderItem={renderCard}
                        keyExtractor={(item) => item._id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </Modal>
        );
    };
    

    return (
        <>
        <View style={styles.container}>
            <Text style={styles.heading}>Bills & Payments</Text>
            {selectedCard ?
                <LinearGradient
                key={selectedCard.id}
                colors={[selectedCard.cardColor, '#000']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={styles.cardContainer}
            >
            <Text style={styles.cardNumber}>{maskCardNumber(selectedCard.number)}</Text>
            <Text style={styles.cardType}>{selectedCard.type}</Text>
            <Text style={styles.cardExpiry}>{selectedCard.expiry}</Text>
            <Text style={styles.cardName}>{selectedCard.name}</Text>
            <Image style={{ height: 40, width: 40, marginTop: 40, marginLeft: 10 }} source={require('../../../assets/creditcardChip1.png')} />
            </LinearGradient>
            : <View></View>
            }
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    value={formatNumber(amount)}
                    onChangeText={handleAmountChange}
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    modalAnimationType = "fade"
                    placeholder="Select Category"
                    style={styles.dropdown}
                    TickIconComponent = {() => <Icon name="check" size={20} style={{color: colors.white}}/>}
                    textStyle={styles.dropdownText}
                    listItemLabelStyle={styles.dropdownLabel}
                    selectedItemContainerStyle={{backgroundColor: '#333',borderRadius: 8}}
                    dropDownContainerStyle={styles.dropdownContainer}
                    labelStyle = {styles.customItemLabelStyle}
                    arrowIconStyle={{tintColor: colors.white} as any}
                />

            </View>

            <TouchableOpacity style={styles.button} onPress={handleAddBill}>
                <Text style={styles.buttonText}>Add Bill</Text>
            </TouchableOpacity>
        </View>
        <RenderModal />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.black,
    },
    heading: {
        fontSize: 20,
        marginLeft: 10,
        color: colors.white,
        fontFamily: "Poppins-SemiBold",
    },
    Modalheading: {
        fontSize: 20,
        marginLeft: 10,
        color: colors.white,
        fontFamily: "Poppins-SemiBold",
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: colors.white,
        fontFamily: 'Poppins-Medium',
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
        backgroundColor: '#333',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        zIndex: 2,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center', // Centers the view horizontally and vertically
        marginBottom: 20, // Adds some space below the centered view
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        padding: 5,
    },
    cardListContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    card: {
        height: 200,
        width: 300,
        padding: 10,
        borderRadius: 10,
        elevation: 20,
        margin: 5,
    },
    cardContainer: {
        height: 200,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        elevation: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        // marginLeft: 10,
    },
    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    cardNumber: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
        letterSpacing: 2,
        marginBottom: 15,
    },
    cardName: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
    },
    cardType: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        position: 'absolute',
        top: 5,
        right: 20,
    },
    cardExpiry: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    dropdown: {
        backgroundColor: colors.black,
        borderColor: colors.white,
        // margin: 10,
        marginTop: 10,
        // width: 320,
        
    },
    dropdownText: {
        color: colors.white,
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
    },
    dropdownLabel: {
        color: colors.white,
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
    },
    dropdownContainer: {
        backgroundColor: colors.black,
        borderColor: colors.white,
        elevation: 10,
        fontFamily: 'Poppins-Medium',
        borderRadius: 20,
        marginTop: 10,
        
    },
    customItemLabelStyle:{
        color: colors.white
    }
});


export default AddBillPayments;
