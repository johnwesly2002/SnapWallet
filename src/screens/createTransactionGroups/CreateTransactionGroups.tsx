import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';
import { Categories } from '../../constants/categories';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { deletetransactionGroups, transactionGroupsAdd } from '../../services/transactionGroupsService';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetailsData } from '../../redux/slices/userSlice';
import { selectActiveTransactionGroups } from '../../redux/slices/transactionGroupsSlice';
import { StackNavigationProp } from '@react-navigation/stack';
type CategoryType = {
  _id: number;
  name: string;
  icon: string;
  Color: string;
  key: boolean;
};

type RootStackParamList = {
  homeScreen: undefined;
};
const Category = React.memo(({ category, onPress, isSelected } : any) => (
  <TouchableOpacity style={[styles.category, { backgroundColor: colors.white }]} onPress={onPress}>
    <MaterialCommunityIcons name={category.icon} size={24} color={colors.black} />
    <Text style={styles.cardText}>{category.name}</Text>
    <View style={styles.badgeContainer}>
      <MaterialIcons name={isSelected ? 'remove-circle' : 'add-circle'} size={20} color={isSelected ? colors.red : colors.green} />
    </View>
  </TouchableOpacity>
));

const CreateTransactionGroups = () => {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const userDetails = useSelector(selectUserDetailsData);
  const transactionGroups = useSelector(selectActiveTransactionGroups);
  const [isModified, setIsModified] = useState(false);
  const isLoading = useSelector((state: any) => state.transactionGroups.isLoading);
  useEffect(() => {
    if (!transactionGroups.length) {
      dispatch({ type: 'FetchTransactionGroupsData' });
    }
  }, [dispatch, transactionGroups]);

  useEffect(() => {
    setSelectedCategories(transactionGroups);
  }, [transactionGroups]);

  const availableCategories = useMemo(
    () => Categories.filter(category => !selectedCategories.some(selected => selected.name === category.name)),
    [selectedCategories]
  );

  const moveToSelected = useCallback((category: any) => {
    if (!selectedCategories.some(item => item.name === category.name)) {
      setSelectedCategories(prev => [...prev, category]);
      setIsModified(true);
    }
  }, [selectedCategories]);
  

  const moveToAll = useCallback((category: { name: any; }) => {
    setSelectedCategories(prev => prev.filter(item => item.name !== category.name));
    setIsModified(true); 
  }, []);

  const handleUpdate = useCallback(() => {
    const newCategories = selectedCategories.filter(
      category => !transactionGroups.some((group: { name: any; }) => group.name === category.name)
    );
    const removedCategories = transactionGroups.filter(
      (      group: { name: any; }) => !selectedCategories.some(category => category.name === group.name)
    );

    if (newCategories.length || removedCategories.length) {
      if (newCategories.length) transactionGroupsAdd(newCategories, userDetails[0]._id);
      if (removedCategories.length) deletetransactionGroups(removedCategories);
      setIsModified(false);
      Snackbar.show({
        text: 'Changes saved successfully',
        backgroundColor: colors.green,
        duration: 1500,
      });

      dispatch({ type: 'FetchTransactionGroupsData' });
    } else {
      Snackbar.show({
        text: 'No changes to save',
        backgroundColor: colors.red,
        duration: 1500,
      });
    }
  }, [selectedCategories, transactionGroups, userDetails, dispatch]);

  const renderCategory = useCallback(({ item }: any) => {
    const isSelected = selectedCategories.some(category => category.name === item.name);
    return (
      <Category
        category={item}
        onPress={() => (isSelected ? moveToAll(item) : moveToSelected(item))}
        isSelected={isSelected}
      />
    );
  }, [selectedCategories, moveToSelected, moveToAll]);
  

  return (
    <>
      <TouchableOpacity style={styles.HeaderContainer} onPress={() => navigation.navigate('homeScreen')}>
        <MaterialIcons name="arrow-back-ios" size={20} color={colors.white} style={styles.headerBackIcon} />
        <Text style={styles.HeadingText}>Quick Transactions</Text>
      </TouchableOpacity>
      <FlatList
        data={[{ key: 'selected' }, { key: 'all' }]}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.column}>
            <Text style={styles.header}>{item.key === 'selected' ? 'Selected Categories' : 'All Categories'}</Text>
            <FlatList
              data={item.key === 'selected' ? selectedCategories : availableCategories}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              showsVerticalScrollIndicator = {false}
              numColumns={4}
              windowSize={5}
              removeClippedSubviews={true}
              renderItem={renderCategory}
            />
          </View>
        )}
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
    borderRadius: 20,
    height: 60,
    width: 60,
    margin: 15,
    padding: 5,
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
