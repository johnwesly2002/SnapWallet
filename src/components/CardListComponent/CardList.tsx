import React from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from "../Card";
import colors from "../../constants/colors";
import styles from './CardListStyles';
import useCardList from "./useCardList";
import Lottie from 'lottie-react-native';
export default function CardList() {

  const {
    rotateIcon,
    cardsToShow,
    toggleView,
    cardOverlap,
    viewAll,
    cardHeight,
    cardPadding,
    AddCard
  } = useCardList();
  return (
    <View style={[styles.root, {height: viewAll ? 'auto' : 440} ]}>
    <View style={styles.topSection}>
      <Text style={styles.headingText}>Your Cards</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.AddIcon} onPress={AddCard}>
        <Icon name="wallet-plus" size={15} color={colors.white} />
      </TouchableOpacity>
      {cardsToShow.length > 0 && (
      <TouchableOpacity style={styles.button} onPress={toggleView}>
        <Text style={styles.buttonText}>{viewAll ? "View Less" : "View All"}</Text>
        <Icon name={viewAll ? "chevron-up" : "chevron-down"} size={15} color={colors.white} />
      </TouchableOpacity>

      )}
      </View>
    </View>
    {cardsToShow.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Lottie
          style = {styles.EmptyAnimation}
          autoPlay
          source={require('../../../assets/EmptyCards.json')} />
          <Text style={styles.emptyText}>No cards available</Text>
        </View>
      ) : (
    viewAll ? (
      <ScrollView  showsVerticalScrollIndicator={false}>
        {cardsToShow.map((card, i) => (
          <View style= {styles.scrollViewCard} key={card.id}>
            <Card cardData={card} cardHeight={cardHeight} cardPadding={cardPadding} />
          </View>
        ))}
      </ScrollView>
    ) : (
      <View style={styles.container}>
        {cardsToShow.map((card, i) => (
          <View key={card.id} style={[styles.card, {top: cardOverlap * i }]}>
            <Card cardData={card} cardHeight={cardHeight} cardPadding={cardPadding} />
          </View>
        ))}
      </View>
    )
  )}
  </View>
  );
}
