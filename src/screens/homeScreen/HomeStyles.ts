import { StyleSheet } from "react-native";
import Colors  from "../../constants/colors";
export const HomeStyle = StyleSheet.create({
 container: {
    flex: 1
 },
 HeadingText:{
    fontSize: 25,
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
   margin: 5,
   width: 45,
   height: 45,
},
ProfileImageView: {
   width: 55,
   height: 55,
   backgroundColor: Colors.gray,
   borderRadius: 40,
   alignItems: 'center'
}
});