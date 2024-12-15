import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
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
const { width } = Dimensions.get('window'); 
const CARD_SIZE = (width - 120) / 4;
const Category = React.memo(({ category, onPress, isSelected }: any) => (
  <TouchableOpacity
    style={[styles.category, { backgroundColor: colors.Lightblack }]}
    onPress={onPress}
  >
    <MaterialCommunityIcons name={category.icon} size={24} color={colors.white} />
    <Text style={styles.cardText}>{category.name}</Text>
    <View style={styles.badgeContainer}>
      <MaterialIcons
        name={isSelected ? 'remove-circle' : 'add-circle'}
        size={20}
        color={isSelected ? colors.red : colors.green}
      />
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
  const [isModalVisible, setIsModalVisible] = useState(isModified);
  const isLoading = useSelector((state: any) => state.transactionGroups.isLoading);

  useEffect(() => {
    if (!transactionGroups.length) {
      dispatch({ type: 'FetchTransactionGroupsData' });
    }
  }, [dispatch]);

  useEffect(() => {
    if (JSON.stringify(transactionGroups) !== JSON.stringify(selectedCategories)) {
      setSelectedCategories(transactionGroups);
    }
  }, [transactionGroups]);

  const availableCategories = useMemo(
    () =>
      Categories.filter(
        (category) =>
          !selectedCategories.some((selected) => selected.name === category.name)
      ),
    [selectedCategories]
  );

  const moveToSelected = useCallback(
    (category: any) => {
      if (!selectedCategories.some((item) => item.name === category.name)) {
        setSelectedCategories((prev) => [...prev, category]);
        setIsModified(true);
      }
    },
    [selectedCategories]
  );

  const moveToAll = useCallback(
    (category: { name: any }) => {
      setSelectedCategories((prev) =>
        prev.filter((item) => item.name !== category.name)
      );
      setIsModified(true);
    },
    []
  );

  const handleUpdate = useCallback(() => {
    const newCategories = selectedCategories.filter(
      (category) =>
        !transactionGroups.some((group: { name: any }) => group.name === category.name)
    );
    const removedCategories = transactionGroups.filter(
      (group: { name: any }) =>
        !selectedCategories.some((category) => category.name === group.name)
    );

    if (newCategories.length || removedCategories.length) {
      if (newCategories.length)
        transactionGroupsAdd(newCategories, userDetails[0]._id);
      if (removedCategories.length) deletetransactionGroups(removedCategories);
      setIsModified(false);
      setIsModalVisible(false);
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

  const renderCategory = useCallback(
    ({ item }: any) => {
      const isSelected = selectedCategories.some(
        (category) => category.name === item.name
      );
      return (
        <Category
          category={item}
          onPress={() => (isSelected ? moveToAll(item) : moveToSelected(item))}
          isSelected={isSelected}
        />
      );
    },
    [selectedCategories, moveToSelected, moveToAll]
  );

  return (
    <>
      <TouchableOpacity
        style={styles.HeaderContainer}
        onPress={() => navigation.navigate('homeScreen')}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={colors.white}
          style={styles.headerBackIcon}
        />
        <Text style={styles.HeadingText}>Quick Transactions</Text>
      </TouchableOpacity>
      <FlatList
        data={[{ key: 'selected' }, { key: 'all' }]}
        showsVerticalScrollIndicator = {false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.column}>
            <Text style={styles.header}>
              {item.key === 'selected' ? 'Selected Categories' : 'All Categories'}
            </Text>
            <FlatList
              data={item.key === 'selected' ? selectedCategories : availableCategories}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              showsVerticalScrollIndicator={false}
              numColumns={4}
              windowSize={5}
              removeClippedSubviews={true}
              renderItem={renderCategory}
            />
          </View>
        )}
      />
      {isModified && (
        <TouchableOpacity style={styles.updateButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      )}
        <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <View style={styles.Modalcontainer}>
          <View style={styles.modalContent}>
            <View style={styles.centeredView}>
              <View
                style={{
                  backgroundColor: colors.white,
                  height: 5,
                  width: 50,
                  borderRadius: 10,
                }}
              ></View>
            </View>
          <Text style={styles.modalText}>Are you sure you want to update Quick Transactions?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.ModalupdateButton}
              onPress={handleUpdate} 
            >
              <Text style={styles.ModalupdateButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.CancelbuttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
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
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
    color: colors.darkGray,
    marginLeft: 20,
  },
  category: {
    borderRadius: 20,
    height: CARD_SIZE, 
    width: CARD_SIZE,
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
    color: colors.white,
    fontSize: 8,
    fontFamily: 'Poppins-Medium',
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
    modalContent: {
        width: '100%',
        height: '25%',
        backgroundColor: colors.blackBackgroundColor,
        padding: 20,
        borderRadius: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
  // updateButton: {
  //   backgroundColor: colors.darkBlue,
  //   padding: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  //   margin: 10,
  // },
  // updateButtonText: {
  //   color: colors.white,
  //   fontSize: 16,
  //   fontFamily: 'Poppins-SemiBold',
  // },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  Modalcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  updateButton: {
    backgroundColor: colors.darkBlue,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  updateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  ModalupdateButton: {
    backgroundColor: colors.darkBlue,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  ModalupdateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  CancelbuttonText: {
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.white,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonText: {
    color: colors.darkBlue,
    fontSize: 16,
  },
});

export default CreateTransactionGroups;
