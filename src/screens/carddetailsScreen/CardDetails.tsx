import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert  } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import Colors from "../../constants/colors";
import {RouteProp, useRoute } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from "react-native-snackbar";
import colors from "../../constants/colors";
export type CardDetailsProp = RouteProp<
  {
    cardsDetails: {
      cardData: any,
    };
  },
  'cardsDetails'
>;
const CardDetails = () => {

    const route = useRoute<CardDetailsProp>();
    const {cardData} = route.params;
    const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
    const [copiedText, setCopiedText] = useState('');
    
      const maskCardNumber = (number: string) => {
        if (showSensitiveInfo) return number;
        const maskedNumber = number.slice(0, -4).replace(/\d/g, 'X') + number.slice(-4);
        return maskedNumber;
      };
      const maskCard = (number: String) => {
        const lastFourDigits = number.slice(-4);
        const maskedNumber = 'XXXX ' + lastFourDigits;
        return maskedNumber;
      };
    
      const maskCVC = (cvc: string) => {
        return showSensitiveInfo ? cvc : cvc.replace(/\d/g, 'X');
      };
    
      const handleCopy = (text: string) => {
        Clipboard.setString(text);
        Snackbar.show({
            text: 'Copied Successfully',
            backgroundColor: colors.green,
            duration: 1000,
          });
        setCopiedText(text);
      };
    console.log("cardsDetails in card",cardData);
    return(
        <View>
            <View style={styles.HeaderContainer}>
                    <Text style={styles.HeadingText}>Card Details</Text>
            </View>
            <LinearGradient
            colors={[cardData.cardColor, '#000']}
            start={{ x: 0.0, y: 0.0 }} 
            end={{ x: 1.0, y: 1.0 }}
            style={[styles.card, { height: 200, marginBottom: 20 }]}
        >
            <Image style={{height:40,width: 40, marginTop: 40, marginLeft: 10}} source={require('../../../assets/creditcardChip.png')} />
            <Text style={styles.cardNumber}>{maskCard(cardData.number)}</Text>
            <Text style={styles.cardType}>{cardData.type}</Text>
            <Text style={styles.cardExpiry}>Expiry: {cardData.expiry}</Text>
            <Text style={styles.cardName}>{cardData.name}</Text>
        </LinearGradient>
        <View style={styles.subSection}>
      <Text style={styles.subHeadingText}>Details</Text>
      <TouchableOpacity
        style={styles.showButton}
        onPress={() => setShowSensitiveInfo(!showSensitiveInfo)}
      >
        {/* <Icon name={showSensitiveInfo ? 'eye-off' : 'eye'} size={5} color={Colors.white} /> */}
        <Text style={styles.showText}  >{showSensitiveInfo ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
      </View>
      {/* Card Number Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={maskCardNumber(cardData.number)}
          editable={false}
        />
        <TouchableOpacity onPress={() => handleCopy(cardData.number)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Card Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={cardData.name}
          editable={false}
        />
        <TouchableOpacity onPress={() => handleCopy(cardData.name)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.expixycvcContainer}>
      {/* Expiry Date Input */}
      <View style={styles.ExpiryCvcinputContainer}>
        <TextInput
          style={styles.input}
          value={cardData.expiry}
          editable={false}
        />
        <TouchableOpacity onPress={() => handleCopy(cardData.expiry)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* CVC Input */}
      <View style={styles.ExpiryCvcinputContainer}>
        <TextInput
          style={styles.input}
          value={maskCVC(cardData.cvc)}
          editable={false}
        />
        <TouchableOpacity onPress={() => handleCopy(cardData.cvc)}>
          <Icon style={styles.Copyicon} name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
    HeadingText:{
        fontSize: 20,
        marginLeft: 10,
        color: Colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    subHeadingText:{
        fontSize: 20,
        marginLeft: 10,
        marginTop: -5,
        color: Colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    HeaderContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       padding: 10,
    },
    card: {
        padding: 10,
        borderRadius: 10,
        elevation: 20,
        margin: 15,
      },
      subSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      cardNumber: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
        letterSpacing: 2,
        margin: 10
        // marginBottom: 15,
      },
      cardName: {
        fontSize: 16,
        marginLeft: 10,
        marginTop:2,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
      },
      cardType:{
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
      Copyicon:{
        marginRight: 10,
      },
      showButton: {
        marginRight: 20,
        marginBottom: 20,
      },
      showText: {
        marginLeft: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        color: Colors.white,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        padding: 5,
        borderRadius: 15,
        margin: 10,
      },
      ExpiryCvcinputContainer: {
        flexDirection: 'row',
        width: '44%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        padding: 5,
        borderRadius: 15,
        margin: 10,
      },
      input: {
        color: Colors.white,
        fontSize: 16,
        flex: 1,
      },
      expixycvcContainer:{
        flexDirection: 'row',
      }
});
export default CardDetails;