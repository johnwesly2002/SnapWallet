import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";
import AddCardScreen from "../../screens/addCardScreen/Addcardscreen";
import { StackNavigationProp } from "@react-navigation/stack";
type RootStackParamList = {
  addcard: undefined;
};

const cardHeight = 200;
const cardOverlap = -170;
const cardPadding = 20;
const cards: any[] = [
    { id: '1', number: '4444 4444 5322 3231', expiry: '12/34', name: 'John Doe', color: '#a9d0b6', type: 'VISA' },
    { id: '2', number: '4444 4444 5322 5531', expiry: '12/34', name: 'Jane Doe', color: '#e9bbd1', type: 'MASTERCARD' },
    { id: '3', number: '4444 4444 5322 2222', expiry: '12/34', name: 'James Smith', color: '#eba65c', type: 'ICICI' },
    { id: '4', number: '4444 4444 5322 9999', expiry: '12/34', name: 'Emily Davis', color: '#95c3e4', type: 'SBI' },
    { id: '5', number: '4444 4444 5322 8888', expiry: '12/34', name: 'Alice Johnson', color: '#f4a261', type: 'AMEX' },
    { id: '6', number: '4444 4444 5322 7777', expiry: '12/34', name: 'Bob Brown', color: '#2a9d8f', type: 'RUPAY' },
  ];

function useCardList() {
    const [viewAll, setViewAll] = useState(false);
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const toggleView = () => {
      setViewAll(!viewAll);
      Animated.timing(rotateAnim, {
        toValue: viewAll ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
    const cardsToShow = cards.length > 0 ? viewAll ?  cards : cards.slice(-4) : [];
  
    const rotateIcon = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const AddCard = ()  => {
      navigation.navigate('addcard');
    }

    return {
        rotateIcon,
        cardsToShow,
        toggleView,
        viewAll,
        cardHeight,
        cardOverlap,
        cardPadding,
        AddCard
    }
}

export default useCardList;