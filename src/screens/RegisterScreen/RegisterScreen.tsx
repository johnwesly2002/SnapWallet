import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import colors from "../../constants/colors";
import { Text } from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextInput from "../../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { createUser } from "../../services/userService";
const { width } = Dimensions.get('window');
type RootStackParamList = {
    RootNavigation: undefined;
    countrySelectionScreen: undefined;
};

// Define the type for the image paths
const imagePaths: { [key: string]: any } = {
    'emoji1': require('../../../assets/emoji1.jpg'),
    'emoji2': require('../../../assets/emoji2.jpg'),
    'emoji3': require('../../../assets/emoji3.jpg'),
    'emoji4': require('../../../assets/emoji4.jpg'),
    'emoji5': require('../../../assets/emoji5.jpg'),
    'emoji6': require('../../../assets/emoji6.jpg'),
    'emoji7': require('../../../assets/emoji7.jpg'),
    'emoji8': require('../../../assets/emoji8.jpg'),
    'emoji9': require('../../../assets/emoji9.jpg'),
    'emoji10': require('../../../assets/emoji10.jpg'),
    'emoji11': require('../../../assets/emoji11.jpg'),
    'emoji12': require('../../../assets/emoji12.jpg'),
};

const images = Object.keys(imagePaths);

const RegisterScreen = () => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [username, setUsername] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }: { item: string }) => {
        const isSelected = item === selectedImage;
        return (
            <View style={styles.imageContainer}>
                <Image source={imagePaths[item]} style={[styles.image, isSelected ? styles.selectedImage : null]} />
            </View>
        );
    };

    const handleRegister = async () => {
        // Add form validation before submitting
        if (!username) {
            Alert.alert("Please fill all fields!");
            return;
        }

        try {
            await createUser(username, selectedImage);
            navigation.navigate('countrySelectionScreen');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleSkip = async () => {
        try {
            navigation.navigate('countrySelectionScreen');
        } catch (error) {
            console.error('Error during skip:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
                <Icon name="keyboard-double-arrow-right" size={25} />
            </TouchableOpacity>

            <Text style={styles.HeadingText}>Let's Personalize Your Account</Text>

            <View style={styles.carouselWrapper}>
                <Carousel
                    data={images}
                    renderItem={renderItem}
                    width={width * 0.9}
                    height={width * 0.9}
                    loop={true}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.8,
                        parallaxScrollingOffset: 200,
                    }}
                    onSnapToItem={(index) => setSelectedImage(images[index])}
                />
            </View>

            <CustomTextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                iconName="person"
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                iconStyle={styles.icon}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
                <Text style={styles.continueText}>Continue</Text>
                <Icon name="keyboard-double-arrow-right" size={30} style={styles.continueIcon} />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.black,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    carouselWrapper: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    HeadingText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 35,
        top: 45,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
    },
    selectedImage: {
        transform: [{ scale: 1.2 }],
    },
    image: {
        borderWidth: 2,
        width: 150,
        height: 150,
        borderRadius: 100,
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
    continueButton: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: colors.white,
        marginTop: 200,
    },
    continueText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: colors.black,
    },
    continueIcon: {
        color: colors.black,
    },
    inputContainer: {
        marginTop: -50,

    },
    input: {
        borderRadius: 10,
        padding: 5,
        width: '100%',
    },
    icon: {
        color: colors.gray,
    },
    countryInputContainer: {
        marginTop: 20,
        width: '100%',
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray,
    },
    modalContent: {
        width: '100%',
        backgroundColor: colors.blackBackgroundColor,
        padding: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    modalHeader: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        // marginBottom: 10,
    },
    countryItem: {
        padding: 10,
    },
    countryText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: colors.white
    },
});
