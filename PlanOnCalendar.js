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
import SummarizePlanningStrategy from "./assets/svg/summarizePlanningStrategy.svg";
import CalendarHeader from "./assets/svg/calendarHeader.svg";
import Indicator from "./assets/svg/indicator.svg";

import { Feather } from "@expo/vector-icons";

import SlidingUpPanel from "rn-sliding-up-panel";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Popover from "react-native-popover-view";

import ChipsList from "react-native-expandable-chips-list";
import SelectableChips from "react-native-chip/SelectableChips";
import RemovableChips from "react-native-chip/RemovableChips";

import Onboarding from "react-native-onboarding-swiper";
import Swiper from "react-native-web-swiper";
import Modal from "react-native-modal";
import moment, { min } from "moment";

import { MonthCalendar } from "./Calendar";
import { generalStyles } from "./styles/GeneralStyling";

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
  { title: "Moderate Exercise", id: 2 },
  { title: "Intensive Exercise", id: 3 },
  { title: "Morning", id: 4 },
  { title: "Afternoon", id: 5 },
  { title: "Home Workout", id: 6 },
  { title: "Outdoor", id: 7 },
  { title: "Gym", id: 8 },
];

let TEST_DATA3 = [
  { title: "Walking", date: "MON 9:30AM-9:50AM", duration: "20 MIN", id: 1 },
  { title: "Walking", date: "MON 9:30AM-9:50AM", duration: "20 MIN", id: 2 },
  { title: "Walking", date: "MON 9:30AM-9:50AM", duration: "20 MIN", id: 3 },
  { title: "Walking", date: "MON 9:30AM-9:50AM", duration: "20 MIN", id: 4 },
  { title: "Walking", date: "MON 9:30AM-9:50AM", duration: "20 MIN", id: 5 },
  { title: "Walking", date: "MON 9:30AM-9:50AM", duration: "20 MIN", id: 6 },
];

export class PlanOnCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.userEmail = this.props.route.params.userEmail;
    console.log("this.userEmail", this.userEmail);
    this.mainContentSwiperRef = React.createRef();
    this.monthCalRef = React.createRef();

    this.weeklyCalendarScrollViewRef = React.createRef();
    this.state = {
      panelHeight: 500,
      isStrategyDetailModalVis: false,
      isMonthCalendarModalVis: false,
    };
  }
  componentDidMount() {
    this.scrollToThisWeek();
    // console.log("componentDidMount");
  }
  scrollToThisWeek = () => {
    setTimeout(() => {
      let currentRow = this.monthCalRef.current.getRowIndex();
      this.weeklyCalendarScrollViewRef.current.scrollTo({
        x: 0,
        y: (currentRow - 1) * 144,
        animated: true,
      }),
        1000;
    });
  };
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
          <TouchableOpacity
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
            onPress={() => this.setState({ isStrategyDetailModalVis: true })}
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
                          fontSize: 8,
                        }}
                      >
                        # {item.title}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </TouchableOpacity>
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
    let planSetUpPage = (
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
              width: "98%",
              height: "90%",
              backgroundColor: "white",
              marginTop: 24,
              borderRadius: 20,
              alignItems: "center",
            },
          ]}
        >
          {/* <TouchableOpacity
            style={{
              backgroundColor: "black",
              borderRadius: 20,
              width: "40%",
              height: "5%",
              justifyContent: "center",
              alignContent: "center",
            }}
            onPress={() => this.weeklyCalendarScrollViewRef.current.scrollTo({ x: 0, y: (3-1)*144, animated: true })}
          >
            <Text
              style={{
                fontSize: 12,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Month Calendar
            </Text>
          </TouchableOpacity> */}
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "RobotoBoldItalic",
                  fontSize: 18,
                  marginRight: 5,
                }}
              >
                My Calendar
              </Text>
              <Popover
                popoverStyle={{ borderRadius: 20 }}
                from={
                  <TouchableOpacity>
                    <AntDesign name="infocirlce" size={18} color="black" />
                  </TouchableOpacity>
                }
              >
                <View
                  style={{
                    height: 30,
                    width: 350,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    transform: [{ scale: 0.8 }],
                  }}
                >
                  <Indicator height={22} width={330} />
                </View>
              </Popover>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: "black", borderRadius: 20, padding: 5 }}
              onPress={() => this.scrollToThisWeek()}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
              >
                Current Week
              </Text>
            </TouchableOpacity>
          </View>
          <CalendarHeader height={15} width={333} />
          <View
            style={{
              height: 145,
              width: "100%",
              padding: 4,
              backgroundColor: "white",
              borderRadius: 0,
              borderColor: "#F0F0F0",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              marginBottom: 5,
            }}
          >
            <ScrollView
              style={{ width: "100%", height: "20%" }}
              ref={this.weeklyCalendarScrollViewRef}
            >
              <MonthCalendar
                ref={this.monthCalRef}
                thisMonthEvents={[]}
                monthCalCurrDate={new Date()}
                weatherThisMonth={[]}
                onPress={(item, monthNum, month) =>
                  this.onPress(item, monthNum, month)
                }
              />
            </ScrollView>
          </View>
          <View
            style={{
              width: "100%",
              padding: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <AntDesign name="leftcircle" size={18} color="black" />

              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                Past Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 12,
                  marginRight: 5,
                }}
              >
                Next Month
              </Text>
              <AntDesign name="rightcircle" size={18} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 0,
              padding: 15,
            }}
          >
            <Text style={{ fontFamily: "RobotoBoldItalic", fontSize: 18 }}>
              Planned Activities
            </Text>
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 13 }}>
              20 minutes remains
            </Text>
          </View>
          <View style={{ width: "100%", height: 250, paddingHorizontal: 15 }}>
            <FlatList
              data={TEST_DATA3}
              renderItem={({ item }) => {
                return (
                  <View
                    style={[
                      {
                        width: "100%",
                        height: 39,
                        borderRadius: 20,
                        borderColor: "#F0F0F0",
                        borderWidth: 1,
                        paddingHorizontal: 6,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 5,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: "RobotoBoldBold",
                        fontSize: 14,
                        paddingLeft: 8,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 14 }}>
                      {item.date}
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 14 }}>
                      {item.duration}
                    </Text>
                    <Ionicons name="md-close-circle" size={24} color="black" />
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    );
    let summaryPage = (
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
          <SummarizePlanningStrategy height={28} width={300} />
        </View>
        {/* Body */}
        <View
          style={[
            generalStyles.shadowStyle,
            {
              width: "98%",
              height: "90%",
              backgroundColor: "white",
              marginTop: 24,
              borderRadius: 20,
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: 15,
            }}
          >
            <Text style={{ fontFamily: "RobotoBoldItalic", fontSize: 18 }}>
              Key Words of My Plans
            </Text>
            <Text
              style={{
                fontFamily: "RobotoBoldItalic",
                fontSize: 14,
                marginTop: 5,
                color: "#676767",
              }}
            >
              Add Keywords in the slide up panel
            </Text>
            {/* <FlatList
            data={TEST_DATA2}
            renderItem={({item}) => {
              return(
                <View style={{height:32, borderRadius:20, backgroundColor:"black", justifyContent:"center", alignSelf:"center", marginBottom:5,paddingHorizontal:10}}>
                  <Text style={{fontFamily:"RobotoBoldBold", color:"white"}}>{item.title}</Text>
                </View>
              )
            }}
            /> */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              {TEST_DATA2.map((item) => {
                return (
                  <View
                    style={{
                      height: 32,
                      borderRadius: 20,
                      backgroundColor: "black",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 5,
                      marginRight: 5,
                      paddingHorizontal: 2,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "RobotoBoldBold",
                        color: "white",
                        paddingHorizontal: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Ionicons name="md-close-circle" size={24} color="white" />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
    let finalConfirmationPage = (
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* Body */}
        <View
          style={[
            generalStyles.shadowStyle,
            {
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              marginTop: 0,
              borderRadius: 0,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Feather name="check-circle" size={32} color="black" />
          <Text
            style={{
              fontFamily: "RobotoBoldItalic",
              fontSize: 24,
              marginTop: "5%",
            }}
          >
            You are all set!
          </Text>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              marginTop: "5%",
              width: "60%",
              textAlign: "center",
            }}
          >
            Click the{" "}
            <Text style={{ fontFamily: "RobotoBoldItalic" }}>Start</Text> below
            to start your first week of tracking
          </Text>
        </View>
      </View>
    );
    let slideUpPanel = (
      <SlidingUpPanel
        draggableRange={{ top: this.state.panelHeight, bottom: 160 }}
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
                this.mainContentSwiperRef.current.goTo(index);
                if (index === 2) {
                  this.setState({ panelHeight: 200 });
                } else {
                  this.setState({ panelHeight: 500 });
                }
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
        {/* Plan Strategy Detail Modal */}
        <Modal
          propagateSwipe={true}
          isVisible={this.state.isStrategyDetailModalVis}
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "50%",
          }}
          hasBackdrop={true}
          backdropOpacity={0}
          onBackdropPress={() =>
            this.setState({ isStrategyDetailModalVis: false })
          }
          onSwipeComplete={() =>
            this.setState({ isStrategyDetailModalVis: false })
          }
          swipeDirection="down"
        >
          <View
            style={[
              generalStyles.shadowStyle,
              {
                width: "98%",
                height: "50%",
                borderRadius: 20,
                backgroundColor: "white",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "RobotoBoldItalic",
                marginTop: "10%",
                marginLeft: "10%",
              }}
            >
              Morning Exercise Plan
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "RobotoRegular",
                marginTop: "2%",
                marginLeft: "10%",
              }}
            >
              Start from
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "RobotoBoldBold",
                marginTop: 0,
                marginLeft: "10%",
              }}
            >
              {moment(new Date()).format("MMM Do YY")}
            </Text>
            <View
              style={{
                height: 5,
                width: "80%",
                backgroundColor: "black",
                marginHorizontal: "10%",
                marginTop: "2%",
              }}
            ></View>
            <ScrollView style={{ marginHorizontal: "10%", marginTop: "2%" }}>
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
                  backgroundColor: "black",
                  borderColor: "black",
                }}
                onChangeChips={(chips) => console.log(chips)}
                alertRequired={false}
              />
            </ScrollView>
          </View>
        </Modal>
        {/* Monthly Calendar View */}
        <Modal
          propagateSwipe={true}
          style={[generalStyles.shadowStyle, { alignItems: "center" }]}
          isVisible={this.state.isMonthCalendarModalVis}
          hasBackdrop={true}
          backdropOpacity={0}
          onBackdropPress={() =>
            this.setState({ isMonthCalendarModalVis: false })
          }
          onSwipeComplete={() =>
            this.setState({ isMonthCalendarModalVis: false })
          }
          swipeDirection="down"
        >
          <ScrollView
            style={{
              padding: "2%",
              width: "100%",
              height: "20%",
              backgroundColor: "white",
              marginTop: 24,
              borderRadius: 20,
            }}
          >
            <MonthCalendar
              thisMonthEvents={[]}
              monthCalCurrDate={new Date()}
              weatherThisMonth={[]}
              onPress={(item, monthNum, month) =>
                this.onPress(item, monthNum, month)
              }
            />
          </ScrollView>
        </Modal>
        {/* Body */}
        <View style={{ height: "100%", width: "100%" }}>
          <Swiper
            gesturesEnabled={() => false}
            ref={this.mainContentSwiperRef}
            onIndexChanged={(index) => {
              console.log("index changed", index);
            }}
          >
            {planSetUpPage}
            {summaryPage}
            {finalConfirmationPage}
          </Swiper>
        </View>
        {/* Slide Up Panel */}
        {slideUpPanel}
      </View>
    );
  }
}
AppRegistry.registerComponent("Planneregy", () => PlanOnCalendar);
