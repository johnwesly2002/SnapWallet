import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/colors';
import { Extrapolation } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

export function Card({ cardData, cardHeight, cardPadding, homescreenView }: any) {
  
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
    style={[styles.card, { height: homescreenView ? 180 : cardHeight, marginBottom: 28 }]}
  >
    <Text style={styles.cardNumber}>{maskCardNumber(cardData.number)}</Text>
    <Text style={styles.cardType}>{cardData.type}</Text>
    <Text style={styles.cardExpiry}>{cardData.expiry}</Text>
    <Text style={styles.cardName}>{cardData.name}</Text>
    <Image style={{height:40,width: 40, marginTop: 40, marginLeft: 10}} source={require('../../assets/creditcardChip1.png')} />
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
    fontSize: 15,
    fontFamily: 'Orbitron-Medium',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 15,
  },
  cardName: {
    fontSize: 16,
    fontFamily: 'Orbitron-Regular',
    color: '#fff',
  },
  cardType:{
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Orbitron-ExtraBold',
    position: 'absolute',
    top: 5,
    right: 20,
  },
  cardExpiry: {
    fontSize: 16,
    fontFamily: 'Orbitron-Regular',
    color: '#fff',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
