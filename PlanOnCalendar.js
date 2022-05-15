import * as React from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button,
  AppRegistry,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import * as Font from "expo-font";

import PlanActivities from "./assets/svg/planActivities.svg";
import SlidingUpPanelTxt from "./assets/svg/slideUpPanelTxt.svg";
import SlidingUpPanelTxt2 from "./assets/svg/slideUpPanelTxt2.svg";
import AddActivityBtn from "./assets/svg/addActivityBtn.svg";

import SlidingUpPanel from "rn-sliding-up-panel";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { generalStyles } from "./styles/GeneralStyling";
import ChipsList from "react-native-expandable-chips-list";
import SelectableChips from "react-native-chip/SelectableChips";
import Onboarding from "react-native-onboarding-swiper";
import Swiper from "react-native-web-swiper";
// import Swiper from "react-native-swiper";

let TEST_DATA = [
  "Light Exercise",
  "Moderate Exercise",
  "Intensive Exercise",
  "Morning",
  "Afternoon",
  "Home Workout",
  "Outdoor",
  "Gym",
];

let TEST_DATA2 = [
  { title: "Light Exercise", id: 1 },
  { title: "Light Exercise", id: 2 },
  { title: "Light Exercise", id: 3 },
  { title: "Light Exercise", id: 4 },
  { title: "Light Exercise", id: 5 },
];

export class PlanOnCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.userEmail = this.props.route.params.userEmail;
    console.log("this.userEmail", this.userEmail);
    this.state = {};
  }

  render() {
    let firstSlidePanelPage = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <SlidingUpPanelTxt height={108} width={335} marginTop={15} />
        {/* First Row of Activity Selection */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "5%",
            paddingVertical: "2%",
            height: "20%",
            width: "90%",
            borderColor: "#DADADA",
            borderWidth: 2,
            borderRadius: 20,
            marginTop: "5%",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              width: "50%",
              paddingVertical: "2%",
              paddingHorizontal: "2%",
            }}
          >
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 14 }}>
              Activity
            </Text>
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 40,
                height: "50%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ModalSelector
                style={{ borderWidth: 0, borderRadius: 20 }}
                // touchableStyle={{ color: "white" }}
                optionContainerStyle={{ borderWidth: 0 }}
                selectStyle={{ borderWidth: 0 }}
                selectTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 20,
                }}
                initValueTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 14,
                }}
                backdropPressToClose={true}
                overlayStyle={{
                  flex: 1,
                  padding: "5%",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  borderRadius: 20,
                }}
                optionTextStyle={{ fontWeight: "bold" }}
                sectionTextStyle={{ fontWeight: "bold" }}
                cancelStyle={{
                  backgroundColor: "black",
                  borderRadius: 15,
                }}
                cancelTextStyle={{ fontWeight: "bold", color: "white" }}
                // data={this.state.activityData}
                initValue={"Select Here"}
                onChange={async (item) => {
                  // this.setState({isActivityTypeSelected: true})
                  // await this.activityFilter(item);
                }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              width: "50%",
              paddingVertical: "2%",
              paddingHorizontal: "2%",
            }}
          >
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 14 }}>
              Add New Activity
            </Text>
            {/* Add New Activity Text Field */}
            <View
              style={{
                backgroundColor: "white",
                height: "50%",
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "black",
                marginRight: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  marginLeft: 5,
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "RobotoBoldItalic",
                }}
                placeholder="new activity"
                value={this.state.userDefinedActivityText}
                onChangeText={(text) =>
                  this.setState({ userDefinedActivityText: text })
                }
              ></TextInput>
              <View
                style={{
                  margin: 1,
                  justifyContent: "center",
                  position: "absolute",
                  marginRight: 1,
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={async () => {}}
                >
                  <Ionicons
                    name="ios-add-circle"
                    size={25}
                    color={"black"}
                    // style={{flex:0.1}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* * TEXT: "Only plan for the upcoming week:  */}
        <Text
          style={{
            marginTop: "2%",
            fontFamily: "RobotoBoldItalic",
            color: "#676767",
          }}
        >
          * Only plan for the upcoming week
        </Text>
        {/* Second Row of Date & Time Selection */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "5%",
            paddingVertical: "2%",
            height: "20%",
            width: "90%",
            borderColor: "#DADADA",
            backgroundColor: "#F0F0F0",
            borderWidth: 2,
            borderRadius: 20,
            marginTop: "2%",
          }}
        >
          <View
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 5,
              borderColor: "#F0F0F0",
              borderRightColor: "#DADADA",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 14 }}>
              Date
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: "100%",
                backgroundColor: "#F0F0F0",
                borderRadius: 5,
              }}
            >
              <DateTimePicker
                value={new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={async (e, date) => {
                  this.setState({ isTimeSelected: true });
                  await this.dateTimeFilter(date);
                }}
                style={{
                  width: 80,
                  height: 40,
                  flex: 1,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 14 }}>
              From
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: "100%",
                backgroundColor: "#F0F0F0",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
            >
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={async (e, date) => {
                  this.setState({ isTimeSelected: true });
                  await this.dateTimeFilter(date);
                }}
                style={{
                  width: 90,
                  height: 40,
                  flex: 1,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 14 }}>
              To
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: "100%",
                backgroundColor: "#F0F0F0",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={async (e, date) => {
                  this.setState({ isTimeSelected: true });
                  await this.dateTimeFilter(date);
                }}
                style={{
                  width: 90,
                  height: 40,
                  flex: 1,
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <AddActivityBtn height={32} width={202} marginTop={"5%"} />
        </TouchableOpacity>
      </View>
    );
    let secondSlidePanelPage = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <SlidingUpPanelTxt2 height={188} width={335} marginTop={15} />
        <View style={{ width: 335, marginTop: "2%" }}>
          <SelectableChips
            initialChips={TEST_DATA}
            chipStyle={{
              backgroundColor: "black",
              borderColor: "black",
              alignItems: "center",
              paddingHorizontal: 15,
              height: 26,
              marginTop: 5,
            }}
            valueStyle={{
              fontSize: 11,
              fontFamily: "RobotoBoldBlack",
              color: "white",
            }}
            chipStyleSelected={{
              backgroundColor: "#1AB700",
              borderColor: "#1AB700",
            }}
            onChangeChips={(chips) => console.log(chips)}
            alertRequired={false}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: 32,
            width: 180,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "black",
            marginRight: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 50,
          }}
        >
          <TextInput
            style={{
              fontSize: 14,
              width: "100%",
              textAlign: "center",
              fontFamily: "RobotoBoldItalic",
            }}
            placeholder="Add Keywords"
            value={this.state.userDefinedActivityText}
            onChangeText={(text) =>
              this.setState({ userDefinedActivityText: text })
            }
          />
          <View
            style={{ margin: 1, width: 25, position: "absolute", right: 1 }}
          >
            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flex: 1,
              }}
              onPress={async () => {}}
            >
              <Ionicons name="ios-add-circle" size={25} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
    let thirdSlidePanelPage = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <Text
          style={{
            fontFamily: "RobotoBoldItalic",
            fontSize: 18,
            marginTop: "5%",
            width: "80%",
            textAlign: "center",
          }}
        >
          Congrats! Here is your first planning strategy
        </Text>
        <View
          style={[
            generalStyles.shadowStyle,
            {
              height: 81,
              width: 335,
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 20,
              marginTop: "5%",
              flexDirection: "row",
            },
          ]}
        >
          <View
            style={{
              height: "100%",
              width: "80%",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderRightColor: "black",
              borderRightWidth: 2,
              paddingLeft: 20,
              paddingVertical: 10,
              justifyContent: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "RobotoBoldBlack",
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                Morning Exercise Plan
              </Text>
              <FlatList
                horizontal={true}
                data={TEST_DATA2}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        borderRadius: 20,
                        backgroundColor: "#E7E7E7",
                        marginRight: 2,
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          color: "#1AB700",
                        }}
                      >
                        # {item.title}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: "100%",
              width: "20%",
              borderBottomRightRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: "black",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBoldItalic",
                fontSize: 18,
                color: "white",
                textAlign: "center",
              }}
            >
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    let slideUpPanel = (
      <SlidingUpPanel
        draggableRange={{ top: 500, bottom: 160 }}
        showBackdrop={false}
        ref={(c) => (this._panel = c)}
      >
        <View
          style={[
            generalStyles.shadowStyle,
            {
              height: 500,
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 40,
              backgroundColor: "white",
            },
          ]}
        >
          {/* Top Sliding Up Indication Bar */}
          <View
            style={{
              width: "30%",
              backgroundColor: "#BDBDBD",
              height: 7,
              borderRadius: 10,
              marginTop: 10,
            }}
          ></View>
          {/* Swipable Body Content */}
          <View style={{ height: 470, width: "100%" }}>
            <Swiper
              onIndexChanged={(index) => {
                console.log("index changed", index);
              }}
            >
              {firstSlidePanelPage}
              {secondSlidePanelPage}
              {thirdSlidePanelPage}
            </Swiper>
          </View>
          {/* {firstSlidePanelPage} */}
          {/* {secondSlidePanelPage} */}
          {/* {thirdSlidePanelPage} */}
        </View>
      </SlidingUpPanel>
    );
    return (
      // <KeyboardAvoidingView
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      // >
      //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* Hearder */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 44,
          }}
        >
          <PlanActivities height={28} width={150} />
        </View>
        {/* Body */}
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
        {/* SlideUpPanel */}
        {slideUpPanel}
      </View>
    );
  }
}
AppRegistry.registerComponent("Planneregy", () => PlanOnCalendar);
