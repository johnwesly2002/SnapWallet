import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginBottom: 30,
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
  cardType: {
    position: 'absolute',
    top: 10,
    right: 20,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 18,
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 15,
  },
  cardHolderName: {
    fontSize: 16,
    color: '#fff',
  },
  cardExpiry: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: '#ffff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    width: '48%',
  },
  cvcInput: {
    width: '48%',
  },
  cardBack: {
    height: 200,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
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
  AddCardButton: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  AddCardButtonText: {
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
    flex: 1, 
    fontSize: 18,
  },
  Icon: {
    marginLeft: 10,
  },
  
});

export default styles;