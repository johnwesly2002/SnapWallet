import React from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from '../Card';
import colors from '../../constants/colors';
import styles from './CardListStyles';
import useCardList from './useCardList';
import Lottie from 'lottie-react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function CardList() {
  const {
    rotateIcon,
    cardsToShow,
    toggleView,
    cardOverlap,
    viewAll,
    cardHeight,
    cardPadding,
    AddCard,
    deleteCard,
    showDetails
  } = useCardList();

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.hiddenItem}>
      <TouchableOpacity 
      style={[styles.detailsButton, { height: cardHeight }]} 
      onPress={() => showDetails(data.item.id)} 
    >
      <Icon name='credit-card-lock-outline' size={30}></Icon>
      <Text style={styles.detailsText}>Details</Text>
    </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteCard(data.item._id)}
      >
        <Icon name='delete' size={30}></Icon>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.root, { height: viewAll ? 'auto' : 440 }]}>
      <View style={styles.topSection}>
        <Text style={styles.headingText}>Your Cards</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.AddIcon} onPress={AddCard}>
            <Icon name="wallet-plus" size={15} color={colors.white} />
          </TouchableOpacity>
          {cardsToShow.length > 0 && (
            <TouchableOpacity style={styles.button} onPress={toggleView}>
              <Text style={styles.buttonText}>
                {viewAll ? 'View Less' : 'View All'}
              </Text>
              <Icon
                name={viewAll ? 'chevron-up' : 'chevron-down'}
                size={15}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {cardsToShow.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Lottie
            style={styles.EmptyAnimation}
            autoPlay
            source={require('../../../assets/EmptyCards.json')}
          />
          <Text style={styles.emptyText}>No cards available</Text>
        </View>
      ) : viewAll ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SwipeListView
            data={cardsToShow}
            renderItem={({ item, index }) => (
              <View style={styles.scrollViewCard} key={index}>
                <Card
                  cardData={item}
                  cardHeight={cardHeight}
                  cardPadding={cardPadding}
                />
              </View>
            )}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            leftOpenValue={75}
            disableRightSwipe={false}
            disableLeftSwipe={false}
            stopRightSwipe={-75}
            stopLeftSwipe={75}
          />
        </ScrollView>
      ) : (
        <View style={styles.container}>
          {cardsToShow.map((card, i) => (
            <View key={i} style={[styles.card, { top: cardOverlap * i }]}>
              <Card
                cardData={card}
                cardHeight={cardHeight}
                cardPadding={cardPadding}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
