import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsData } from "../../redux/slices/userSlice";
import { CardAdd } from "../../services/cardService";
import Snackbar from "react-native-snackbar";
import colors from "../../constants/colors";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFocusEffect } from "@react-navigation/native";

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
      
    const cardSchema = yup.object().shape({
      number: yup
      .string()
      .required('Card number is required')
      .matches(/^\d{16}$/, 'Card number must be 16 digits'),
    name: yup.string().required('Name on card is required'),
    balance: yup
      .string()
      .required('Balance is required')
      .matches(/^\d+$/, 'Balance must be a valid number'),
    expiry: yup
      .string()
      .required('Expiry date is required')
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry format (MM/YY)'),
    cvc: yup
      .string()
      .required('CVV is required')
      .matches(/^\d{3}$/, 'CVV must be 3 digits'),
    });
      const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
      } = useForm({
        mode: 'onChange',
        resolver: yupResolver(cardSchema),
        defaultValues: {
          number: '',
          name: '',
          expiry: '',
          cvc: '',
          balance: '',
        },
      });
    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetailsData);
    useFocusEffect(
      React.useCallback(() => {
        reset({
          number: '',
          name: '',
          balance: '',
          expiry: '',
          cvc: '',
        });
        setCardData({
          number: '',
          name: '',
          expiry: '',
          cvc: '',
          type: '',
          cardColor: '',
          balance: '',
          isFlipped: false,
        });
        dispatch({ type: 'fetchUsers' });
      }, [reset, dispatch])
    );

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
      const formatNumber = (value: string) => {
        if (!value) return '';
        const numericValue = value.replace(/[^0-9]/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        control,
        handleSubmit,
        errors,
        isValid,
        reset,
        removeCommas,
    };
};
export default useAddCard;
