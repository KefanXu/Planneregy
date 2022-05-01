//This screen is set between App.js and Login.js / PlanOnCalendar.js
//This screen doesn't have any content and is used to determine which screen to jump to between Login.js and PlanOnCalendar.js

import * as React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";

export class BeforeLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstScreenName: "",
      fontsLoaded: false,
      userEmail: "",
    };
    this.checkIfUserExist();
  }

  async loadFonts() {
    await Font.loadAsync({
      RobotoBoldBlack: require("./assets/fonts/Roboto/Roboto-Black.ttf"),
      RobotoBoldItalic: require("./assets/fonts/Roboto/Roboto-BlackItalic.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  checkIfUserExist = async () => {
    let emailAddress = await SecureStore.getItemAsync("USER_EMAIL");
    if (emailAddress) {
      this.setState({ firstScreenName: "PlanOnCalendar" });
      await this.setState({userEmail : emailAddress})
      console.log("this.state.userEmail", this.state.userEmail);
    } else {
      console.log("No values stored under that key.");
      await this.setState({ firstScreenName: "Login" });
    }
  };

  async componentDidMount() {
    this.loadFonts();
    await this.checkIfUserExist();
    // console.log(
    //   "this.state.firstScreenName componentDidMount",
    //   this.state.firstScreenName
    // );
    let navToScreen = this.state.firstScreenName;
    this.props.navigation.navigate(navToScreen, {userEmail: this.state.userEmail});
  }

  render() {
    return <Text>""</Text>;
  }
}
