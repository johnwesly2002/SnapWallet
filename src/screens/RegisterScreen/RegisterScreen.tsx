import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import colors from "../../constants/colors";
import { Text } from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextInput from "../../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { createUserRequest } from "../../redux/slices/userSlice";
import { createUser } from "../../services/userService";

const { width } = Dimensions.get('window');
type RootStackParamList = {
    RootNavigation: undefined;
};

// Define the type for the image paths
const imagePaths: { [key: string]: any } = {
    'emoji3': require('../../../assets/emoji3.png'),
    'emoji4': require('../../../assets/emoji4.png'),
    'emoji5': require('../../../assets/emoji5.png'),
    'emoji14': require('../../../assets/emoji14.png'),
    'emoji7': require('../../../assets/emoji7.png'),
    'emoji16': require('../../../assets/emoji16.png'),
    'emoji9': require('../../../assets/emoji9.png'),
    'emoji10': require('../../../assets/emoji10.png'),
    'emoji17': require('../../../assets/emoji17.png'),
    'emoji2': require('../../../assets/emoji2.png'),
};

// Use the keys of the imagePaths as the array for the carousel
const images = Object.keys(imagePaths);

const RegisterScreen = () => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
        try {
            await createUser(username, selectedImage);
            navigation.navigate('RootNavigation'); 
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    
    const handleSkip = async () => {
        try {
            // await createUser('Guest', selectedImage);
            navigation.navigate('RootNavigation');
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
        width: 200,
        height: 200,
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
        marginTop: 120, 
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
        marginTop: 20,
    },
    input: {
        borderRadius: 10,
        padding: 10,
    },
    icon: {
        color: colors.gray,
    },
});
