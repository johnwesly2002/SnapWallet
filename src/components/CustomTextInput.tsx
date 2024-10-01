import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomTextInput = ({ placeholder, value, onChangeText, iconName, containerStyle, inputStyle, iconStyle }: any) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {iconName && <Icon name={iconName} size={24} style={[styles.icon, iconStyle]} />}
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
        color: '#555',
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 5,
    },
});
