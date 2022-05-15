import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  AppRegistry,
} from "react-native";
import * as Font from "expo-font";
import PlanActivities from "./assets/svg/planActivities.svg";
import MyPlanningStrategies from "./assets/svg/MyPlanningStrategies.svg";
import SlidingUpPanel from "rn-sliding-up-panel";

import { generalStyles } from "./styles/GeneralStyling";
import Swiper from "react-native-swiper";

export class TrackingPage extends React.Component {
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
      <Swiper activeDotColor="black" bounces={true}>
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
          <SlidingUpPanel
            draggableRange={{ top: 320, bottom: 60 }}
            showBackdrop={false}
            ref={(c) => (this._panel = c)}
          >
            <View
              style={[generalStyles.shadowStyle,{
                height: 370,
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 40,
                backgroundColor: "#BDBDBD",
              }]}
            >
              <Text>Here is the content inside panel</Text>
              <Button title="Hide" onPress={() => this._panel.hide()} />
            </View>
          </SlidingUpPanel>
        </View>
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
            <MyPlanningStrategies height={28} width={242} />
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
      </Swiper>
    );
  }
}
AppRegistry.registerComponent("Planneregy", () => PlanOnCalendar);
