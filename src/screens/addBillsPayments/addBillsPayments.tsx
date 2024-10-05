import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import colors from "../../constants/colors";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import the icon library

// Define bill categories with labels and values
const billCategories = [
    { label: 'Electricity', value: 'electricity', icon: () => <Icon name="flash" size={20} color={colors.white} /> },
    { label: 'Water', value: 'water', icon: () => <Icon name="water" size={20} color={colors.white} /> },
    { label: 'Internet', value: 'internet', icon: () => <Icon name="wifi" size={20} color={colors.white} /> },
    { label: 'Rent', value: 'rent', icon: () => <Icon name="home" size={20} color={colors.white} /> },
    { label: 'Insurance', value: 'insurance', icon: () => <Icon name="shield" size={20} color={colors.white} /> },
    // Add more categories as needed
];

const AddBillPayments = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(billCategories[0].value); // Default to first category
    const [open, setOpen] = useState(false); // State for dropdown open/close
    const [items, setItems] = useState(billCategories); // State for items in dropdown

    const handleAddBill = () => {
        Alert.alert('Bill Added', `Amount: ${amount}, Category: ${category}`);
        setAmount('');
        setCategory(billCategories[0].value); // Reset to default category
        setOpen(false); // Close dropdown
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Bill / Payment</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <DropDownPicker
                open={open}
                value={category}
                items={items.map(item => ({
                    label: item.label,
                    value: item.value,
                    icon: item.icon
                }))}
                setOpen={setOpen}
                setValue={setCategory}
                containerStyle={{ height: 50, marginBottom: 15 }}
                style={styles.dropdown} 
                placeholder="Select Category"
                placeholderStyle={styles.placeholder}
                labelStyle={styles.label} 
                dropDownContainerStyle={styles.dropdownContainer}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddBill}>
                <Text style={styles.buttonText}>Add Bill</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: colors.black,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: colors.white,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: colors.white,
    },
    dropdown: {
        backgroundColor: '#333', // Background color for dropdown
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    placeholder: {
        color: colors.white,
    },
    label: {
        color: colors.white,
        fontSize: 14,
    },
    dropdownContainer: {
        backgroundColor: colors.black, // Background color for dropdown items
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AddBillPayments;
