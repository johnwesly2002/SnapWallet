import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "../../constants/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { countryList } from "../../constants/countries";
import Evicon from 'react-native-vector-icons/Entypo';
import Icon from "react-native-vector-icons/MaterialIcons";
import { handleCreationCountry } from "../../services/countryService";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsData } from "../../redux/slices/userSlice";
import Country from "../../schemas/countryScehma";
type RootStackParamList = {
  RegistrationScreen: undefined;
  RootNavigation: undefined;
};

const CountrySelectionScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetailsData);
  useEffect(() => {
    dispatch({type: 'fetchUsers'});
  },[dispatch])
  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
  };

  const handleSelectCountry = () => {
    try {
        handleCreationCountry( selectedCountry, userDetails[0]._id);
        navigation.navigate('RootNavigation');
    } catch (error) {
        console.error('Error during handleCountry:', error);
    }
  }
  const handleSkip = async () => {
    try {
        navigation.navigate('RootNavigation');
    } catch (error) {
        console.error('Error during skip:', error);
    }
};

  const renderCountryItem = ({ item }: { item: typeof countryList[0] }) => (
    <View style={styles.countryContainer}>
      <TouchableOpacity
        style={[
          styles.countryItem,
          selectedCountry?.country === item.country && styles.selectedCountryItem,
        ]}
        onPress={() => handleCountrySelect(item)}
      >
        <Text style={styles.currencySymbol}>{item.currency.symbol}</Text>
        {selectedCountry?.country === item.country && (
          <MaterialIcons
            name="check-circle"
            size={20}
            color={colors.green}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.countryText}>{item.country}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
        <Icon name="keyboard-double-arrow-right" size={25} />
    </TouchableOpacity>
      <View style={{flexDirection:'row'}}>
      <Evicon name="language" style={{marginLeft: 7,color:colors.white}} size={30} />
      <Text style={styles.heading}>Select Your Country</Text>
      </View>
      <FlatList
        data={countryList}
        keyExtractor={(item) => item.country}
        renderItem={renderCountryItem}
        contentContainerStyle={styles.listContainer}
        numColumns={4}
      />
      {selectedCountry && (
        <TouchableHighlight
          style={styles.nextButton}
          onPress={handleSelectCountry}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default CountrySelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.blackBackgroundColor,
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
},
skipText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
},
  heading: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: colors.white,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: "left",
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  countryContainer: {
    alignItems: "center",
    margin: 5,
    width: 80,
  },
  countryItem: {
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    position: "relative",
  },
  selectedCountryItem: {
    backgroundColor: colors.lightgray,
    borderColor: colors.green,
    borderWidth: 2,
  },
  currencySymbol: {
    fontSize: 18,
    color: colors.white,
    fontFamily: "Poppins-Bold",
  },
  countryText: {
    fontSize: 12,
    color: colors.white,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "Poppins-Medium",
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  nextButtonText: {
    color: colors.blackBackgroundColor,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});
function dispatch(arg0: { type: string; }) {
    throw new Error("Function not implemented.");
}

