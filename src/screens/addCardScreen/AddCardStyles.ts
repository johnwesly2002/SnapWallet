import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.black,
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
  cardSection: {
    marginBottom: 25,
  },
  cardContainer: {
    width: '100%',
  },
  cardFront: {
    height: 200,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardNumbercardType: {
    position: 'absolute',
    top: 10,
    right: 20,
    fontSize: 16,
    color: Colors.lightWhite,
    fontFamily: 'Orbitron-Medium',
  },
  cardType: {
    position: 'absolute',
    top: 10,
    right: 20,
    fontSize: 16,
    color: Colors.lightWhite,
    fontFamily: 'Orbitron-Medium',
  },
  cardNumber: {
    fontSize: 18,
    color: Colors.lightWhite,
    fontFamily: 'Orbitron-Medium',
    marginBottom: 15,
  },
  cardHolderName: {
    fontSize: 16,
    color: Colors.lightWhite,
    fontFamily: 'Orbitron-Medium',
  },
  cardExpiry: {
    fontSize: 16,
    color: Colors.lightWhite,
    fontFamily: 'Orbitron-Medium',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginTop: -20,
  },
  input: {
    backgroundColor: Colors.blackBackgroundColor,
    color: Colors.lightWhite,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 5,
    marginVertical: 5,
  },
  
  expiryInput: {
    width: '100%',
  },
  cvcInput: {
    width: '100%',
  },
  errorContainer: {
    width: '48%',
  },
  cardBack: {
    height: 200,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.darkGray,
    overflow: 'hidden',
  },
  blackStripe: {
    backgroundColor: 'black',
    height: 40,
    width: '120%',
    position: 'absolute',
    top: 30,
  },
  whiteBar: {
    backgroundColor: 'white',
    height: 40,
    width: '50%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 60,
    right: 0,
  },
  cvvLabel: {
    color: Colors.black,
    fontSize: 12,
  },
  cvv: {
    fontSize: 18,
    color: Colors.black,
    marginLeft: 'auto',
  },
  // AddCardButton: {
  //   flexDirection: 'row',
  //   backgroundColor: Colors.white,
  //   borderRadius: 5,
  //   marginTop: '5%',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: 8,
  // },
  AddCardButtonText: {
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
    flex: 1, 
    fontSize: 18,
  },
  Icon: {
    marginLeft: 10,
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ScanoptionButton: {
    backgroundColor: Colors.white,
    borderRadius: 40,
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '20%',
  },
  optionButton: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
  },
  optionText: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '600',
  },
  OrText: {
    fontSize: 18,
    color: Colors.gray,
    fontFamily: 'Poppins-SemiBold',
  },
  scanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scanText: {
    fontSize: 20,
    color: Colors.white,
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  scanButtonText: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scanOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -100 }],
    width: 300,
    height: 200,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    padding: 10,
    backgroundColor: Colors.red,
    borderRadius: 5,
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  AddCardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  
  cardError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorHighlight: {
    color: Colors.darkRed,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  
  BackButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray, // Neutral color for "Back"
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow effect
  },
  
  NextButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary, // Highlighted color for "Next"
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow effect
  },
  
  ButtonText: {
    fontSize: 16,
    color: Colors.white, // Text color
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  navigationButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  navigationButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  
});

export default styles;