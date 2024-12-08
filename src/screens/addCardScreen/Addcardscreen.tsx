import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors';
import styles from './AddCardStyles';
import useAddCard from './useAddCard';
import { Controller } from 'react-hook-form';
import { Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';
const AddCardScreen = () => {
  const {
    cardData,
    handleInputChange,
    handleAddCard,
    flipCard,
    formatNumber,
    control,
    handleSubmit,
    errors,
    removeCommas,
  } = useAddCard();

  const onSubmit = (data: any) => {
    console.log('Validated Data:', data);
    handleAddCard();
  };

  return (
    <>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeadingText}>Add New Card</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.cardSection}>
            <Animatable.View
                animation={errors.number ? 'shake' : undefined}
                duration={500}
              >
              <FlipCard
                style={[styles.cardContainer]}
                flipHorizontal
                flipVertical={false}
                perspective={1000}
                clickable={false}
                flip={cardData.isFlipped}
              >
                {/* Front of the Card */}
                <View
                  style={[styles.cardFront, { backgroundColor: cardData.cardColor || Colors.Lightblack }]}
                >
                  <Text
                    style={[styles.cardNumbercardType]}
                  >
                    {cardData.type ? cardData.type.toUpperCase() : ''}
                  </Text>
                  <Text
                    style={[styles.cardNumber]}
                  >
                    {cardData.number || 'XXXX XXXX XXXX XXXX'}
                  </Text>
                  <Text
                    style={[styles.cardHolderName]}
                  >
                    {cardData.name || 'Card Holder'}
                  </Text>
                  <Text
                    style={[styles.cardExpiry]}
                  >
                    {cardData.expiry || 'MM/YY'}
                  </Text>
                </View>

                {/* Back of the Card */}
                <View
                  style={[styles.cardBack, { backgroundColor: cardData.cardColor || Colors.Lightblack }]}
                >
                  <View style={styles.blackStripe}></View>
                  <View style={styles.whiteBar}>
                    <Text style={styles.cvvLabel}>CVV</Text>
                    <Text
                      style={[styles.cvv, errors.cvc && styles.errorHighlight]}
                    >
                      {cardData.cvc || '###'}
                    </Text>
                  </View>
                </View>
              </FlipCard>
              </Animatable.View>
            </View>

            <View style={styles.inputContainer}>
              <Controller
                name="number"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Animatable.View
                    animation={errors.number ? 'shake' : undefined}
                    duration={500}
                  >
                    <Input
                      placeholder="Card Number"
                      placeholderTextColor={Colors.gray}
                      style={[styles.input, { width: '100%', borderRadius: 10, borderWidth: 2 }]}
                      keyboardType="numeric"
                      maxLength={16}
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        handleInputChange('number', text);
                      }}
                      errorMessage={errors.number?.message}
                      leftIcon={<Icon name="credit-card" size={24} color={Colors.gray} />}
                    />
                  </Animatable.View>
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Animatable.View
                    animation={errors.name ? 'shake' : undefined}
                    duration={500}
                  >
                    <Input
                      placeholder="Name on Card"
                      placeholderTextColor={Colors.gray}
                      style={[styles.input, { width: '100%', borderRadius: 10, borderWidth: 2 }]}
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        handleInputChange('name', text);
                      }}
                      errorMessage={errors.name?.message}
                      leftIcon={<Icon name="account" size={24} color={Colors.gray} />}
                    />
                  </Animatable.View>
                )}
              />

              <Controller
                name="balance"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Animatable.View
                    animation={errors.balance ? 'shake' : undefined}
                    duration={500}
                  >
                    <Input
                      placeholder="Current Balance"
                      keyboardType="numeric"
                      placeholderTextColor={Colors.gray}
                      style={[styles.input, { width: '100%', borderRadius: 10, borderWidth: 2 }]}
                      value={formatNumber(value)}
                      onChangeText={(text) => {
                        onChange(text);
                        handleInputChange('balance', text);
                      }}
                      errorMessage={errors.balance?.message}
                      leftIcon={<Icon name="currency-usd" size={24} color={Colors.gray} />}
                    />
                  </Animatable.View>
                )}
              />

              <View style={styles.row}>
                <View style={styles.errorContainer}>
                  <Controller
                    name="expiry"
                    control={control}
                    rules={{
                      required: 'Expiry is required',
                      validate: (value) => {
                        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                        if (!regex.test(value)) {
                          return 'Invalid expiry format (MM/YY)';
                        }
                        return true;
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Animatable.View
                        animation={errors.expiry ? 'shake' : undefined}
                        duration={500}
                      >
                        <Input
                          placeholder="MM/YY"
                          placeholderTextColor={Colors.gray}
                          style={[styles.input, { width: '100%', borderRadius: 10, borderWidth: 2 }]}
                          maxLength={5}
                          keyboardType="numeric"
                          value={value}
                          onChangeText={(text) => {
                            let formattedText = text.replace(/[^0-9]/g, '');
                            if (formattedText.length > 2) {
                              formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
                            }
                            onChange(formattedText);
                            handleInputChange('expiry', text);
                          }}
                          errorMessage={errors.expiry?.message}
                          leftIcon={<Icon name="calendar" size={24} color={Colors.gray} />}
                        />
                      </Animatable.View>
                    )}
                  />
                </View>

                <View style={styles.errorContainer}>
                  <Controller
                    name="cvc"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Animatable.View
                        animation={errors.cvc ? 'shake' : undefined}
                        duration={500}
                      >
                        <Input
                          placeholder="CVV"
                          placeholderTextColor={Colors.gray}
                          style={[styles.input, { width: '100%', borderRadius: 10 }]}
                          maxLength={3}
                          keyboardType="numeric"
                          value={value}
                          onFocus={flipCard}
                          onBlur={flipCard}
                          onChangeText={(text) => {
                            onChange(text);
                            handleInputChange('cvc', text);
                          }}
                          errorMessage={errors.cvc?.message}
                          leftIcon={<Icon name="lock" size={24} color={Colors.gray} />}
                        />
                      </Animatable.View>
                    )}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.AddCardButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.AddCardButtonText}>Add Card</Text>
                <MaterialIcon
                  style={styles.Icon}
                  name="arrow-forward-ios"
                  size={23}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

export default AddCardScreen;
