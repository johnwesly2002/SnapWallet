
import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    HeadingText: {
        fontSize: 20,
        marginLeft: 10,
        color: Colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    SubHeading: {
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
    ProfileImage: {
        width: 45,
        height: 45,
        borderRadius: 40,
    },
    ProfileImageView: {
        width: 45,
        height: 45,
        backgroundColor: Colors.gray,
        borderRadius: 40,
        alignItems: 'center',
    },
    ScrollViewContainer: {
        flex: 1,
        position: 'relative',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    AddTransactionsButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: Colors.darkRed,
        borderRadius: 15,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        zIndex: 1,
    },
    AddTransactionsIcon: {
        color: '#fff',
    },
});