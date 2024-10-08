import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsData } from "../../redux/slices/userSlice";
import { CardAdd } from "../../services/cardService";
import Snackbar from "react-native-snackbar";
import colors from "../../constants/colors";

const useAddCard = () => {
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        type: '',
        cardColor: '',
        balance: '',
        isFlipped: false,
      });
    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetailsData);
    useEffect(() => {
      dispatch({type: 'fetchUsers'});
    },[dispatch])
    
      // Function to format the card number into groups of 4 digits
      const formatCardNumber = (number: any) => {
        const sanitizedNumber = number.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim(); // Insert space every 4 digits
        return sanitizedNumber;
      };
    
      // Function to format expiry date as MM/YY
      const formatExpiryDate = (expiry: any) => {
        let sanitizedExpiry = expiry.replace(/\D/g, '');
        if (sanitizedExpiry.length >= 3) {
          sanitizedExpiry = sanitizedExpiry.slice(0, 2) + '/' + sanitizedExpiry.slice(2, 4); // Insert '/' after MM
        }
        return sanitizedExpiry;
      };
    
      const detectCardType = (number: any) => {
        const sanitizedNumber = number.replace(/\s+/g, '');
        if (/^4/.test(sanitizedNumber)) {
          return 'visa';
        } if (/^5[1-5]/.test(sanitizedNumber)) {
          return 'mastercard';
        }  if (/^3[47]/.test(sanitizedNumber)) {
          return 'american express';
        } if (/^6(011|5|44)/.test(sanitizedNumber)) {
          return 'discover';
        } if (/^22|23|24|27|40/.test(sanitizedNumber)) {
          return 'ICICI Bank';
        } if (/^5081(26|59)/.test(sanitizedNumber)) {
          return 'Axis Bank';
        } if (/^6067|4865/.test(sanitizedNumber)) {
          return 'HDFC Bank';
        } if (/^622018/.test(sanitizedNumber)) {
          return 'SBI';
        } if (/^5458|5460/.test(sanitizedNumber)) {
          return 'CitiBank';
        } if (/^413748|4658/.test(sanitizedNumber)) {
          return 'Standard Chartered';
        } if (/^404411|637/.test(sanitizedNumber)) {
          return 'HSBC';
        } 
        return '';
      };
      const getCardColor = (type: any) => {
        switch (type.toLowerCase()) {
          case 'visa':
            return '#1a1f71'; // Visa blue
          case 'mastercard':
            return '#ff5f00'; // MasterCard orange
          case 'american express':
            return '#4bacc6'; // AMEX blue
          case 'discover':
            return '#f79e1b'; // Discover orange
          case 'icici bank':
            return '#f58220'; // ICICI orange
          case 'axis bank':
            return '#d32f2f'; // Axis Bank red
          case 'hdfc bank':
            return '#0033a0'; // HDFC blue
          case 'sbi':
            return '#1a3e90'; // SBI blue
          case 'citibank':
            return '#003bbd'; // Citibank blue
          case 'standard chartered':
            return '#007a3d'; // Standard Chartered green
          case 'hsbc':
            return '#db0011'; // HSBC red
          default:
            return '#808080'; // Default gray
        }
      };
      
    
      const handleInputChange = (field: any, value: any) => {
        let updatedData = { ...cardData, [field]: value };
        
        if (field === 'number') {
          updatedData.type = detectCardType(value);
          updatedData.number = formatCardNumber(value);
          updatedData.cardColor = getCardColor( updatedData.type); 
        }
        
        if (field === 'expiry') {
          updatedData.expiry = formatExpiryDate(value);
        }
        if(field == 'balance'){
          updatedData.balance = removeCommas(value);
        }
    
        setCardData(updatedData);
      };
      const handleAddCard = () => {
        console.log("cardData: ",cardData);
        CardAdd(cardData, userDetails[0]._id);
        dispatch({type: 'FetchCardData'});
        Snackbar.show({
          text: "Card Successfully Added",
          backgroundColor: colors.green,
          duration: 1500,
        })
      }
      const formatNumber = (num: string) => {
        if (!num) return num;
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    
    const removeCommas = (str: string) => {
        return str.replace(/,/g, '');
    };
    
      const flipCard = () => {
        setCardData((prevData) => ({ ...prevData, isFlipped: !prevData.isFlipped }));
      };
    return {
        cardData,
        handleInputChange,
        handleAddCard,
        flipCard,
        formatNumber,
    };
};
export default useAddCard;
