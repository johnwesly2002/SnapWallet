import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { Extrapolation } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

export function Card({ cardData, cardHeight, cardPadding }: any) {
  
  const maskCardNumber = (number: String) => {
    const lastFourDigits = number.slice(-4);
    const maskedNumber = 'XXXX ' + lastFourDigits;
    return maskedNumber;
  };

  return (
    <LinearGradient
    colors={[cardData.cardColor, '#000']}
    start={{ x: 0.0, y: 0.0 }} 
    end={{ x: 1.0, y: 1.0 }}
    style={[styles.card, { height: cardHeight, marginBottom: cardPadding }]}
  >
    <Text style={styles.cardNumber}>{maskCardNumber(cardData.number)}</Text>
    <Text style={styles.cardType}>{cardData.type}</Text>
    <Text style={styles.cardExpiry}>Expiry: {cardData.expiry}</Text>
    <Text style={styles.cardName}>{cardData.name}</Text>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    elevation: 20
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
});
