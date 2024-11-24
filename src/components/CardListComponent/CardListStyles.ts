import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.blackBackgroundColor,
    borderRadius: 20,
    margin: 10,
  },
  headingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    padding: 8,
    color: colors.white,
  },
  scrollViewCard: {
    padding: 10,
  },
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  card: {
    width: '95%',
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
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenItem: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  detailsButton: {
    backgroundColor: colors.blacklight,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 95,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    position: 'absolute',
    left: 10,
    top: 10,
    bottom: 0,
    zIndex: 2,
  },
  deleteButton: {
    backgroundColor: colors.darkRed,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 95,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    position: 'absolute',
    right: 10,
    top: 10,
    bottom: 0,
  },
  deleteText: {
    color: colors.lightWhite,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 8,
  },
  detailsText: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 8,
    // textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default styles;