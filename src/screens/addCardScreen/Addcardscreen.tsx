import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors';
import styles from './AddCardStyles';
import useAddCard from './useAddCard';

const AddCardScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const {
    cardData,
    handleInputChange,
    handleAddCard,
    flipCard,
    formatNumber,
  } = useAddCard();

  const handleScanCardOption = () => {
    Alert.alert(
      'Choose Option',
      'How do you want to add your card?',
      [
        { text: 'Pick from Gallery', onPress: handlePickFromGallery },
        { text: 'Scan Card', onPress: handleCaptureCard },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handlePickFromGallery = useCallback(() => {
    ImagePicker.openPicker({
      cropping: false,
    })
      .then((image) => {
        console.log('Image selected:', image);
        const scannedCardData = {
          number: '1234 5678 9876 5432', // example
          name: 'John Doe',
          expiry: '12/25',
          cvc: '123',
        };
        handleInputChange('number', scannedCardData.number);
        handleInputChange('name', scannedCardData.name);
        handleInputChange('expiry', scannedCardData.expiry);
        handleInputChange('cvc', scannedCardData.cvc);
      })
      .catch((error) => {
        console.error('Error picking image:', error);
      });
  }, []);

  const handleCaptureCard = useCallback(async () => {
    try {
      console.log('Capturing front side of the card...');
      const frontImage = await ImagePicker.openCamera({
        cropping: false,
      });
      console.log('Front side image captured:', frontImage);
  
      const frontCardData = {
        number: '5678 1234 4321 8765',
        name: 'Jane Doe',
        expiry: '11/24',
      };
  
      handleInputChange('number', frontCardData.number);
      handleInputChange('name', frontCardData.name);
      handleInputChange('expiry', frontCardData.expiry);
  
      console.log('Prompting user to capture back side...');
      const backImage = await ImagePicker.openCamera({
        cropping: false,
      });
      console.log('Back side image captured:', backImage);
      const backCardData = {
        cvc: '456',
      };
      handleInputChange('cvc', backCardData.cvc);
  
      console.log('Card details captured successfully!');
    } catch (error) {
      console.error('Error capturing card:', error);
    }
  }, []);
  

  return (
    <>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeadingText}>Add New Card</Text>
      </View>

      {!selectedOption ? (
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.ScanoptionButton}
            onPress={handleScanCardOption}
          >
            <Icon name="credit-card-scan-outline" size={30} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.OrText}>Or</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setSelectedOption('manual')}
          >
            <Text style={styles.optionText}>Add Manually</Text>
          </TouchableOpacity>
        </View>
      ) : selectedOption === 'manual' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Manual Card Entry Section */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/* FlipCard Section */}
              <View style={styles.cardSection}>
                <FlipCard
                  style={styles.cardContainer}
                  flipHorizontal
                  flipVertical={false}
                  perspective={1000}
                  clickable={false}
                  flip={cardData.isFlipped}
                >
                  <View style={[styles.cardFront, { backgroundColor: cardData.cardColor || '#808080' }]}>
                    <Text style={styles.cardType}>
                      {cardData.type ? cardData.type.toUpperCase() : ''}
                    </Text>
                    <Text style={styles.cardNumber}>
                      {cardData.number || '#### #### #### ####'}
                    </Text>
                    <Text style={styles.cardHolderName}>
                      {cardData.name || 'Card Holder'}
                    </Text>
                    <Text style={styles.cardExpiry}>
                      {cardData.expiry || 'MM/YY'}
                    </Text>
                  </View>
                  <View style={[styles.cardBack, { backgroundColor: cardData.cardColor || '#808080' }]}>
                    <View style={styles.blackStripe}></View>
                    <View style={styles.whiteBar}>
                      <Text style={styles.cvvLabel}>CVV</Text>
                      <Text style={styles.cvv}>{cardData.cvc || '###'}</Text>
                    </View>
                  </View>
                </FlipCard>
              </View>

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
                <TextInput
                  placeholder="Current Balance"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.white}
                  style={styles.input}
                  value={formatNumber(cardData.balance)}
                  onChangeText={(value) => handleInputChange('balance', value)}
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
                  <Icon style={styles.Icon} name="arrow-right-thin" size={30} color={Colors.black} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      ) : null}
    </>
  );
};

export default AddCardScreen;
