import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export const loginStyles = StyleSheet.create({
  loginBtn: {
    borderColor: "black",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "white",
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.0,
  },
});
