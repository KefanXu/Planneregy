import * as React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as Font from "expo-font";
import PlanActivities from "./assets/svg/planActivities.svg";
import { generalStyles } from "./styles/GeneralStyling";

export class PlanOnCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.userEmail = this.props.route.params.userEmail;
    console.log("this.userEmail", this.userEmail);
  }
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      RobotoBoldBlack: require("./assets/fonts/Roboto/Roboto-Black.ttf"),
      RobotoBoldItalic: require("./assets/fonts/Roboto/Roboto-BlackItalic.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 44,
          }}
        >
          <PlanActivities height={28} width={150} />
        </View>
        <View
          style={[
            generalStyles.shadowStyle,
            {
              width: "95%",
              height: "90%",
              backgroundColor: "white",
              marginTop: 24,
              borderRadius: 20,
            },
          ]}
        ></View>
      </View>
    );
  }
}
