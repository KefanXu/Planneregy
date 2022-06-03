//This screen is set between App.js and Login.js / PlanOnCalendar.js
//This screen doesn't have any content and is used to determine which screen to jump to between Login.js and PlanOnCalendar.js

import * as React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import moment, { min } from "moment";


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
    let accessToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
    if (emailAddress) {
      //User already exist
      this.setState({ firstScreenName: "PlanOnCalendar" });
      await this.setState({ userEmail: emailAddress });
      console.log("ACCESS_TOKEN", accessToken);

      let [dateMin, dateMax] = this.processDate();
      let calendarsEventList = await this.getUsersCalendarEvents(
        accessToken,
        emailAddress,
        dateMin,
        dateMax
      );
      let calendarEventListJSON = await calendarsEventList.json();
      console.log("calendarEventListJSON",calendarEventListJSON);
    } else {
      //Use not exist, go to login screen
      console.log("No values stored under that key.");
      await this.setState({ firstScreenName: "Login" });
    }
  };

  getUsersCalendarEvents = async (
    accessToken,
    calendarsID,
    timeMin,
    timeMax
  ) => {
    console.log("calendarsID", calendarsID);
    let calendarsEventList;
    calendarsEventList = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/" +
        calendarsID +
        "/events?" +
        timeMax +
        "&" +
        timeMin,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return calendarsEventList;
  };

  processDate = () => {
    let currDate = new Date();
    let month = currDate.getMonth();
    let year = currDate.getFullYear();
    let monthMin = month;
    let monthMax = month + 2;
    if (monthMin < 10) {
      monthMin = "0" + monthMin;
    }
    if (monthMax < 10) {
      monthMax = "0" + monthMax;
    }
    let dateMin = "timeMin=" + year + "-" + monthMin + "-01T10%3A00%3A00Z";
    let monthDays = moment(year + "-" + monthMax, "YYYY-MM").daysInMonth();
    let dateMax =
      "timeMax=" + year + "-" + monthMax + "-" + monthDays + "T23%3A00%3A00Z";
    console.log("dateMin, dateMax", dateMin, dateMax);
    return [dateMin, dateMax];
  };

  async componentDidMount() {
    this.loadFonts();
    await this.checkIfUserExist();
    // console.log(
    //   "this.state.firstScreenName componentDidMount",
    //   this.state.firstScreenName
    // );
    let navToScreen = this.state.firstScreenName;
    this.props.navigation.navigate(navToScreen, {
      userEmail: this.state.userEmail,
    });
  }

  render() {
    return <Text></Text>;
  }
}
