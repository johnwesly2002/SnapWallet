import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';
import { Categories } from '../../constants/categories';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';
import { deletetransactionGroups, transactionGroupsAdd } from '../../services/transactionGroupsService';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetailsData } from '../../redux/slices/userSlice';
import { selectActiveTransactionGroups } from '../../redux/slices/transactionGroupsSlice';

type CategoryType = {
  _id: number;
  name: string;
  icon: string;
  Color: string;
};

type RootStackParamList = {
  homeScreen: undefined;
};

const Category = React.memo(({ category, onPress, isSelected }: any) => (
  <TouchableOpacity style={[styles.category, { backgroundColor: colors.white }]} onPress={onPress}>
    <MaterialCommunityIcons name={category.icon} size={24} color={colors.black} />
    <Text style={styles.cardText}>{category.name}</Text>
    {isSelected ? (
      <View style={styles.badgeContainer}>
        <MaterialIcons name="remove-circle" size={20} color={colors.red} />
      </View>
    ) : (
      <View style={styles.badgeContainer}>
        <MaterialIcons name="add-circle" size={20} color={colors.green} />
      </View>
    )}
  </TouchableOpacity>
));


const CreateTransactionGroups = () => {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [allCategories, setAllCategories] = useState(Categories);
  const [isModified, setIsModified] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetailsData);
  const TransactionGroups = useSelector(selectActiveTransactionGroups);

  useEffect(() => {
    dispatch({ type: 'fetchUsers' });
    dispatch({ type: 'FetchTransactionGroupsData' });
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategories(TransactionGroups);
  }, [TransactionGroups]);

  const availableCategories = useMemo(() =>
    Categories.filter(category => !selectedCategories.some(selected => selected.name === category.name)),
    [selectedCategories]
  );

  const moveToSelected = useCallback((category: CategoryType) => {
    setSelectedCategories((prev) => [...prev, category]);
    setAllCategories((prev) => prev.filter(item => item.name !== category.name));
    setIsModified(true);
  }, []);

  const moveToAll = useCallback((category: CategoryType) => {
    setAllCategories((prev) => [...prev, category]);
    setSelectedCategories((prev) => prev.filter(item => item.name !== category.name));
    setIsModified(true); 
  }, []);

  const handleUpdate = useCallback(() => {
    const newlySelectedCategories = selectedCategories.filter(
      category => !TransactionGroups.some((transactionGroup: { name: string; }) => transactionGroup.name === category.name)
    );
  
    const removedCategories = TransactionGroups.filter(
      (transactionGroup: { name: string }) => !selectedCategories.some(category => category.name === transactionGroup.name)
    );
  
    if (newlySelectedCategories.length > 0) {
      console.log("new Transactions", newlySelectedCategories);
      transactionGroupsAdd(newlySelectedCategories, userDetails[0]._id);
    }
  
    if (removedCategories.length > 0) {
      console.log("removed Transactions", removedCategories);
      deletetransactionGroups(removedCategories);

    }
  
    if (newlySelectedCategories.length > 0 || removedCategories.length > 0) {
      dispatch({ type: "FetchTransactionGroupsData" });
      setIsModified(false);
  
      Snackbar.show({
        text: `Changes saved successfully`,
        backgroundColor: colors.green,
        duration: 1500,
      });
    } else {
      Snackbar.show({
        text: `No changes to save`,
        backgroundColor: colors.red,
        duration: 1500,
      });
    }
  }, [selectedCategories, TransactionGroups, userDetails, dispatch]);
  
  

  const handleNavigation = useCallback(() => {
    navigation.navigate('homeScreen');
  }, [navigation]);

  return (
    <>
      <TouchableOpacity style={styles.HeaderContainer} onPress={handleNavigation}>
        <MaterialIcons name='arrow-back-ios' size={20} color={colors.white} style={styles.headerBackIcon} />
        <Text style={styles.HeadingText}>Transaction Groups</Text>
      </TouchableOpacity>
      <FlatList
        data={[{ key: 'selected' }, { key: 'all' }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          if (item.key === 'selected') {
            return (
              <View style={styles.column}>
                <Text style={styles.header}>Selected Categories</Text>
                {selectedCategories.length === 0 ? (
                  <View style={styles.emptyView}>
                    <Text style={styles.emptyText}>No categories selected.</Text>
                  </View>
                ) : (
                  <FlatList
                    data={selectedCategories}
                    contentContainerStyle={styles.listContent}
                    numColumns={4}
                    keyExtractor={(item) => item.name}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => (
                      <Category category={item} onPress={() => moveToAll(item)} isSelected={true} />
                    )}
                  />
                )}
              </View>
            );
          } else {
            return (
              <View style={styles.column}>
                <Text style={styles.header}>All Categories</Text>
                <FlatList
                  data={availableCategories}
                  contentContainerStyle={styles.listContent}
                  numColumns={4}
                  keyExtractor={(item) => item.name}
                  nestedScrollEnabled={true}
                  renderItem={({ item }) => (
                    <Category category={item} onPress={() => moveToSelected(item)} isSelected={false} />
                  )}
                />
              </View>
            );
          }
        }}
        keyExtractor={(item) => item.key}
      />

      {isModified && (
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Groups</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  column: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
    marginLeft: 20,
  },
  category: {
    borderRadius: 30,
    height: 55,
    width: 55,
    margin: 15,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  cardText: {
    color: colors.black,
    fontSize: 6,
    fontFamily: 'Poppins-Regular',
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
  },
  headerBackIcon: {
    margin: 5,
  },
  HeadingText: {
    fontSize: 20,
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  updateButton: {
    backgroundColor: colors.white,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 20,
  },
  updateButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});

export default CreateTransactionGroups;
