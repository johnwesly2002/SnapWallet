import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableHighlight, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import Colors from '../../constants/colors';
import styles from './AddCardStyles';
import useAddCard from './useAddCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const AddCardScreen = () => {
  const {
    cardData,
    handleInputChange,
    handleAddCard,
    flipCard,
  } = useAddCard();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Flip Card Section */}
        <View style={styles.cardSection}>
          <FlipCard
            style={styles.cardContainer}
            flipHorizontal={true}
            flipVertical={false}
            perspective={1000}
            clickable={false}
            flip={cardData.isFlipped}
          >
            {/* Front Side */}
            <View style={[styles.cardFront,{ backgroundColor: cardData.cardColor || '#808080' }]}>
            <Text style={styles.cardType}>
            {cardData.type ? cardData.type.toUpperCase() : ''}
          </Text>
              <Text style={styles.cardNumber}>
                {cardData.number ? cardData.number : '#### #### #### ####'}
              </Text>
              <Text style={styles.cardHolderName}>
                {cardData.name ? cardData.name : 'Card Holder'}
              </Text>
              <Text style={styles.cardExpiry}>
                {cardData.expiry ? cardData.expiry : 'MM/YY'}
              </Text>
            </View>
            <View style={[styles.cardBack,{ backgroundColor: cardData.cardColor || '#808080' }]}>
              <View style={styles.blackStripe}></View>
              <View style={styles.whiteBar}>
                <Text style={styles.cvvLabel}>CVV</Text>
                <Text style={styles.cvv}>{cardData.cvc ? cardData.cvc : '###'}</Text>
              </View>
            </View>
          </FlipCard>
        </View>

        {/* Input Fields Section */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Card Number"
            placeholderTextColor={Colors.white}
            style={styles.input}
            keyboardType="numeric"
            maxLength={16}
            onChangeText={(value) => handleInputChange('number', value)}
          />
          <TextInput
            placeholder="Name on Card"
            placeholderTextColor={Colors.white}
            style={styles.input}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <View style={styles.row}>
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor={Colors.white}
              style={[styles.input, styles.expiryInput]}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('expiry', value)}
            />
            <TextInput
              placeholder="CVV"
              placeholderTextColor={Colors.white}
              style={[styles.input, styles.cvcInput]}
              maxLength={3}
              keyboardType="numeric"
              onFocus={flipCard}
              onBlur={flipCard}
              onChangeText={(value) => handleInputChange('cvc', value)}
            />
          </View>
          <TouchableOpacity style={styles.AddCardButton} onPress={handleAddCard}>
            <Text style={styles.AddCardButtonText}>Add Card</Text>
            <Icon style={styles.Icon} name='arrow-right-thin' size={30} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


export default AddCardScreen;
