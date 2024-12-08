import React, { useEffect, useState } from 'react';
import Realm from 'realm';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetailsData } from '../../redux/slices/userSlice';
import Colors from "../../constants/colors";
import { imagePaths } from '../../constants/emojis';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { selectedLoginId } from '../../redux/slices/LoginIdSlice';
import { selectCountryData } from '../../redux/slices/countrySlice';
import { updateUserByUserId } from '../../services/userService';
import Carousel from 'react-native-reanimated-carousel';
import { selectUserName, setUserName } from '../../redux/slices/usernameSlice';
import { selectprofilePic, setprofilePic } from '../../redux/slices/userPictureSlice';
import { updateCountryById } from '../../services/countryService';
import { selectCountry, selectCountryName, selectCurrencyId, selectCurrencySymbol, setcountryData } from '../../redux/slices/countrynameSlice';
import {countryList} from "../../constants/countries";
const ProfileScreen = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUserDetailsData);
    const userId = useSelector(selectedLoginId);
    const userName = useSelector(selectUserName);
    const profilePicture = useSelector(selectprofilePic);
    const currentCountry = useSelector(selectCountry);
    const currentCountryData = useSelector(selectCountryData);
    const currentCurrencySymbol = useSelector(selectCurrencySymbol);
    const currentCurrencyId = useSelector(selectCurrencyId);
    useEffect(() => {
        dispatch({ type: 'fetchUsers' });
        if (userId) {
            dispatch({ type: "FetchCountryData" });
            dispatch({ type: "FetchCardData" });
          }
          console.log("CoountryNames",currentCountry,currentCountryData);
    },[dispatch,userId,userName,profilePicture, currentCountry,currentCurrencyId])
  const countryData = useSelector(selectCountryData);
  const [name, setName] = useState(userName || "");
  const [email, setEmail] = useState(currentUser.email);
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePic, setprofilepic] = useState(profilePicture || 'emoji1');
  const [country, setCountry] = useState(countryData);
  const [selectedCountry, setSelectedCountry] = useState(currentCountryData);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(profilePicture);
  const { width } = Dimensions.get('window');
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Yes, Logout', onPress: () => console.log('User logged out') },
      ],
      { cancelable: false }
    );
  };

  const handleSave = () => {
    setModalVisible(false);
    console.log('Profile Updated:', name, email);
  };
  const handleSaveName = async () => {
    try {
      await updateUserByUserId(currentUser[0]?._id, { username: name });
      dispatch(setUserName(name));
      setModalVisible(false);
      Alert.alert('Success', 'Username updated successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update username.');
    }
  };

  const handleSaveProfilePic = async () => {
    try {
      console.log("profilePicture",selectedImage);
      await updateUserByUserId(currentUser[0]._id, { profilePic: selectedImage });
      setprofilepic(selectedImage);
      setCarouselVisible(false);
      dispatch(setprofilePic(selectedImage));
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile picture.');
    }
  };
  
  const handleSavecountry = async () => {
    try {
      console.log("handleSavecountry",selectedCountry);
      await updateCountryById(  Realm.BSON.ObjectID.createFromHexString(currentCurrencyId), { code: selectedCountry.currency.code,name: selectedCountry.currency.name,symbol: selectedCountry.currency.symbol,country: selectedCountry.country });
      setCountry(selectedCountry);
      setCountryModalVisible(false);
      dispatch(setcountryData(selectedCountry));
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile picture.');
    }
  };
  const filteredImageKeys = Object.keys(imagePaths).filter(
    (key) => key !== selectedImage
  );

  return (
    <>
          <View style={styles.HeaderContainer}>
        <Text style={styles.HeadingText}>Profile</Text>
      </View>

    <View style={styles.container}>
      <View style={styles.profileHeader}>
      <View style={styles.ProfileImageView}>
          <Image
            source={
              profilePicture ? imagePaths[profilePicture] : null
            }
            style={styles.ProfileImage}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileCountry}>{currentCountry}</Text>
        </View>
        <Text style={styles.profileSymbol} numberOfLines={1} ellipsizeMode="tail">
          {currentCurrencySymbol}
        </Text>
      </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Personalization</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}  onPress={() => setModalVisible(true)}>
        <View  style={{flexDirection: 'column'}}>
          <Text style={styles.buttonText}>Change Name</Text>
          <Text style={styles.buttonsubText}>Update your name to  make it </Text>
          <Text style={styles.buttonsubText}>more personal.</Text>
          </View>
          <Text style={styles.buttonText}>{userName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setCarouselVisible(true)}>
          <View  style={{flexDirection: 'column'}}>
          <Text style={styles.buttonText}>Change Picture</Text>
          <Text style={styles.buttonsubText}>Select a new profile picture to personalize</Text>
          <Text style={styles.buttonsubText}> your account.</Text>
          </View>
          <Image
            source={
              currentUser[0] ? imagePaths[currentUser[0].profilePic] : null
            }
            style={styles.EditProfileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setCountryModalVisible(true)}>
          <View style={{flexDirection: 'column'}}>
          <Text style={styles.buttonText}>Change Country</Text>
          <Text style={styles.buttonsubText}> Changing the country will also update </Text>
          <Text style={styles.buttonsubText}> the currency symbol</Text>
          </View>
          <Text style={styles.buttonText}>{currentCurrencySymbol}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Account</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.buttonText}>Logout</Text>
          <Text style={styles.buttonsubText}>This action will delete all the data associated with snapWallet</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.NamemodalContent}>
          <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: Colors.white,
            height: 5,
            width: 50,
            borderRadius: 10,
          }}
        ></View>
        </View>
            <TextInput
              value={name} 
              onChangeText={setName}
              placeholder="UserName"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSaveName} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={carouselVisible} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.carouselModal}>
    <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: Colors.white,
            height: 5,
            width: 50,
            borderRadius: 10,
          }}
        ></View>
        </View>
      <View style={[styles.carouselWrapper]}>
      <Carousel
      data={Object.keys(imagePaths)} 
      renderItem={({ item, index }) => (
      <View
      style={[
          styles.imageContainer,
          selectedImage === Object.keys(imagePaths)[index]
              ? styles.selectedImageContainer
              : styles.unselectedImageContainer,
      ]}
      >
        <Image
          source={imagePaths[item]}
          style={[
              styles.carouselImage,
              selectedImage === Object.keys(imagePaths)[index]
                  ? styles.selectedImage
                  : styles.unselectedImage,
          ]}
        />
        </View>
      )}
      width={width} 
      height={width * 0.6} 
      mode="parallax" 
      modeConfig={{
        parallaxScrollingOffset: 230,
        parallaxScrollingScale: 0.9,
      }}
      onSnapToItem={(index) => setSelectedImage(Object.keys(imagePaths)[index])}
      loop 
      scrollAnimationDuration={20}
      />
      </View>
        <TouchableOpacity onPress={handleSaveProfilePic} style={styles.CarouselsaveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCarouselVisible(false)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
    </View>
  </View>
</Modal>
<Modal visible={countryModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countryList}
              keyExtractor={(item) => item.country}
              renderItem={({ item }) => (
                <View
                  style={styles.countryItem}
                  // Set selected country
                >
                  <TouchableOpacity style={styles.radioContainer} onPress={() => setSelectedCountry(item)} >
                    <View
                      style={[
                        styles.radioButton,
                        item.country == selectedCountry.country && styles.selectedRadioButton
                      ]}
                    />
                    <Text style={styles.countryText}>{item.country}</Text>
                  </TouchableOpacity>
                  <Text style={styles.currencyText}>{item.currency.symbol} - {item.currency.code}</Text>
                </View>
              )}
            />
            <TouchableOpacity onPress={handleSavecountry} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCountryModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>




    </View>
    </>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black,
      padding: 20,
    },
    carouselModal: {
    width: '100%',
    backgroundColor: Colors.blackBackgroundColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  carouselWrapper: {
    width: '100%', 
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
},
imageContainer: {
  width: '100%', 
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
},
selectedImageContainer: {
  transform: [{ scale: 1.2 }],  
},
unselectedImageContainer: {
  transform: [{ scale: 1 }],
},
carouselImage: {
  width: '100%', 
  height: '100%', 
  padding: 0,
  borderRadius: 90,  
},
  selectedImage: {
    width: 150,
    height: 150,
    borderColor: Colors.green,
    borderWidth: 4,
  },
  unselectedImage: {
    width: 100,
    height: 100,
  },
    ProfileImage: {
        width: 65,
        height: 65,
        borderRadius: 10,
    },
    EditProfileImage: {
        width: 35,
        height: 35,
        borderRadius: 40,
    },
    ProfileImageView: {
        // width: 45,
        // height: 45,
        // backgroundColor: Colors.black,
        // borderRadius: 10,
        // alignItems: 'center',
    },
    HeadingText:{
        fontSize: 20,
        marginLeft: 10,
        color: Colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    HeaderContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       padding: 10,
    },
    profileHeader: {
      flexDirection: 'row',
      height: 90,
      padding: 20,
      borderRadius: 10,
      backgroundColor: Colors.blackBackgroundColor,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    profileSymbol: {
      fontSize: 20,
      fontFamily: 'Poppins-Medium',
      color: Colors.white,
      right: 65,
      alignSelf: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 20,
    },
    profileName: {
      fontSize: 15,
      marginLeft: 10,
      fontFamily: 'Poppins-Medium',
      color: Colors.white,
    },
    profileCountry: {
      fontSize: 13,
      marginLeft: 10,
      fontFamily: 'Poppins-Regular',
      color: Colors.gray,
    },
    profileEmail: {
      fontSize: 14,
      color: '#666',
    },
    editButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    editButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    sectionHeader: {
      marginTop: 10,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 12,
      marginLeft: 10,
      fontFamily: 'Poppins-SemiBold',
      color: Colors.gray,
    },
    buttonContainer: {
      marginBottom: 20,
      backgroundColor: Colors.lightgray,
      borderRadius: 10,
    },
    button: {
      borderBottomColor: Colors.lightgray,
      fontFamily: 'Poppins-SemiBold',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
      color: Colors.lightWhite,
    },
    buttonsubText: {
      fontSize: 10,
      fontFamily: 'Poppins-Light',
      color: Colors.gray,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '100%',
      height: '60%',
      backgroundColor: Colors.blackBackgroundColor,
      padding: 20,
      borderRadius: 10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    NamemodalContent: {
      width: '100%',
      height: '30%',
      backgroundColor: Colors.blackBackgroundColor,
      padding: 20,
      borderRadius: 10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    input: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      paddingLeft: 10,
    },
    saveButton: {
      backgroundColor: Colors.white,
      paddingVertical: 12,
      borderRadius: 10,
      marginBottom: 10,
    },
    CarouselsaveButton: {
      backgroundColor: Colors.white,
      width: '100%',
      paddingVertical: 12,
      borderRadius: 10,
    },
    saveButtonText: {
      color: Colors.black,
      fontWeight: 'bold',
      fontFamily: 'Poppins-SemiBold',
      textAlign: 'center',
    },
    cancelButton: {
      paddingVertical: 12,
      borderRadius: 10,
    },
    cancelButtonText: {
      color: Colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    Icon: {
        marginLeft: 10,
      },
      countryItem: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.gray,
        marginRight: 10,
      },
      selectedRadioButton: {
        backgroundColor: Colors.white,
      },
      countryText: {
        fontSize: 16,
      },
      currencyText: {
        fontSize: 14,
        color: Colors.gray,
      },
  });
export default ProfileScreen;
