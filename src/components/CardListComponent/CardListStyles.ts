import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.lightgray,
    borderRadius: 20,
    margin: 10
  },
  headingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    padding: 8,
    color: colors.white
  },
  scrollViewCard: {
    padding: 10,
  },
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  card: {
    width: "95%",
  },
  topSection: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10, 
  },
  button: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    marginRight: 10,
  },
  AddIcon: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 20,
    marginRight: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    marginRight: 8,
  },
  emptyContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: colors.gray,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  EmptyAnimation: {
    height: 200,
    width: 200
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
