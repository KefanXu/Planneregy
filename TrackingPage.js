import React, { useState } from "react";
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
  Image,
  Alert,
  // Modal,
} from "react-native";
import { Modal as RNModal } from "react-native";
import * as Font from "expo-font";
// import { TextInput } from 'react-native-paper';

//Load svg files
import PlanActivities from "./assets/svg/planActivities.svg";
import SlidingUpPanelTxt from "./assets/svg/slideUpPanelTxt.svg";
import SlidingUpPanelTxt2 from "./assets/svg/slideUpPanelTxt2.svg";
import AddActivityBtn from "./assets/svg/addActivityBtn.svg";
import SummarizePlanningStrategy from "./assets/svg/Summarize.svg";
import CalendarHeader from "./assets/svg/calendarHeader.svg";
import Indicator from "./assets/svg/indicator.svg";
import Guide from "./assets/svg/Guide.svg";

//Load icon source
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//Load interactive component libraries
import SlidingUpPanel from "rn-sliding-up-panel";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import Popover from "react-native-popover-view";
import Modal from "react-native-modal";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Calendar } from "react-native-big-calendar";
import * as Progress from "react-native-progress";
import SwitchSelector from "react-native-switch-selector";
import RNNumberPicker from "react-native-number-selector";

//Load layout component libraries
import ChipsList from "react-native-expandable-chips-list";
import SelectableChips from "react-native-chip/SelectableChips";
import RemovableChips from "react-native-chip/RemovableChips";
import Onboarding from "react-native-onboarding-swiper";
import Swiper from "react-native-swiper";
import { Badge } from "react-native-ui-lib";

//Load functional libraries
import moment, { min } from "moment";
import * as SecureStore from "expo-secure-store";

//Load from other local components
import { MonthCalendar } from "./Calendar";
import { getDataModel } from "./DataModel";
import { generalStyles } from "./styles/GeneralStyling";
import { timing } from "react-native-reanimated";

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
const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAY_EX = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ICONS = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "🌥",
  "02n": "🌥",
  "03d": "⛅️",
  "03n": "⛅️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧",
  "09n": "🌧",
  "10d": "🌧",
  "10n": "🌧",
  "11d": "⛈",
  "11n": "⛈",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "💨",
  "50n": "💨",
  arrow: "",
  unknown: "",
};
const REPORTSCREEN_ONE = [
  { label: "Yes", value: "1" },
  { label: "I didn't do any activity", value: "2" },
  { label: "I did it differently", value: "3" },
];
const REPORTSCREEN_TWO = [
  { label: 1, value: "1" },
  { label: 2, value: "2" },
  { label: 3, value: "3" },
  { label: 4, value: "4" },
  { label: 5, value: "5" },
  { label: 6, value: "6" },
  { label: 7, value: "7" },
];
const REPORTSCREEN_FOUR = [
  { label: "I did a different activity", value: "Different_Activity" },
  { label: "I did it at a different time", value: "Different_Time" },
];
const REPORTSCREEN_SEVEN = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const REPORT_OPTIONS = [
  { label: "Records", value: "activity" },
  { label: "Reports", value: "daily" },
  // { label: "Both", value: "both" },
];
const GREEN = "#1AB700";
const BLACK = "#393939";
const YELLOW = "#FFB800";

export class TrackingPage extends React.Component {
  constructor(props) {
    super(props);
    //Load users' basic info from BeforeLoginScreen.js
    this.userEmail = this.props.route.params.userEmail;
    this.userKey = this.props.route.params.userInfo.key;
    this.userPlans = this.props.route.params.userInfo.userPlans;
    this.userStrategies = this.props.route.params.userStrategies;
    //Get data model & user strategies
    // this.dataModel = getDataModel();
    // this.dataModel.asyncInit();

    // this.dataModel.loadUserStrategies();
    // this.userStrategies = this.dataModel.getUserStrategies();
    // console.log(" this.userStrategies", this.userStrategies);
    this.currentStrategy;

    this.mainContentSwiperRef = React.createRef();
    this.monthCalRef = React.createRef();
    this.panelSwiperRef = React.createRef();
    this.weeklyCalendarScrollViewRef = React.createRef();
    this.reportModalSwiperRef = React.createRef();
    this.activityData = [];
    this.index;
    //Get today's date
    this.today = new Date();
    this.startTime = this.today.setHours(8, 0, 0);
    this.endTime = this.today.setHours(8, 30, 0);

    //Get event lists
    this.eventsLastMonth = this.props.route.params.eventsLastMonth;
    this.eventsThisMonth = this.props.route.params.eventsThisMonth;
    this.eventsNextMonth = this.props.route.params.eventsNextMonth;
    this.fullEventList = this.props.route.params.fullEventList;

    this.combinedEventListThis = this.eventsThisMonth;
    this.combinedEventListLast = this.eventsLastMonth;
    this.combinedEventListNext = this.eventsNextMonth;
    this.combineEventListFull = this.fullEventList;

    //Process event lists and user defined activities
    this.processUserEvents();
    this.processUserDefinedActivities();

    this.lastMonthWeather = this.props.route.params.lastMonthWeather;
    this.thisMonthWeather = this.props.route.params.thisMonthWeather;
    this.nextMonthWeather = this.props.route.params.nextMonthWeather;

    //For detailed view
    this.selectedWeatherIcon;
    this.selectedWeatherTxt;
    this.selectedTemp;
    this.selectedEventDate;
    this.detailViewCalendar = [];

    //On Report popup:
    this.onReportActivity = { title: "", start: "", end: "", duration: "" };

    // //Mange the activity list in the self-report activity window
    // this.userAddedActivityList = [];

    this.preList = [];
    this.processDailyReports();
    //Determine where the report popup come from
    this.isReportFromPopup = false;
    this.state = {
      date: new Date(),

      title: "Tracking",
      displayTitle: "flex",

      panelHeight: 250,
      isStrategyDetailModalVis: false,
      isMonthCalendarModalVis: false,
      //Calendar event lists
      eventsLastMonth: this.combinedEventListLast,
      eventsThisMonth: this.combinedEventListThis,
      eventsNextMonth: this.combinedEventListNext,
      fullEventList: this.combineEventListFull,
      //Calendar Month states
      currentMonthEvents: this.combinedEventListThis,
      currentWeatherLists: this.thisMonthWeather,
      currentMonthDate: new Date(),
      currentMonth: "THIS_MONTH",
      pastMonthBtnDisabled: false,
      nextMonthBtnDisabled: false,
      //display the calendar view
      displayCalView: "flex",
      //Month name on calendar
      currentMonthName: moment(new Date()).format("MMMM"),
      //Data for the activity types popup window
      activityData: this.activityData,
      //check if the activity type is selected when the user hit the plan btn
      isActivityTypeSelected: false,
      //Selected activity
      selectedActivity: "",
      //Check if user selected the date
      isDateSelected: false,
      //Selected Date
      selectedDate: new Date(),
      //Check if user selected the start time
      isStartTimeSelected: false,
      //Check if user selected the start time
      isEndTimeSelected: false,
      //The date on the date picker
      dateTimePickerDate: new Date(),
      //The date on "From"
      startTime: new Date(this.startTime),
      //The date on "To"
      endTime: new Date(this.endTime),
      //Check if user selected start time is valid
      isStartTimeValid: true,
      //Check if user selected end time is valid
      isEndTimeValid: true,
      //All the plans under this set up
      plansBuddle: [],
      //Visibility of content swiper under calendar view
      mainContentSwiperDisplay: "flex",
      //Visibility of the confirmation page
      conformationPageDisplay: "none",
      //Accumulate planning minutes,
      accumulatedMinutes: 0,
      //Keywords added from examples
      keywordsListFromExample: [],
      //Keywords added from user inout
      keywordsListFromInput: [],
      //User defined keywords:
      keywordsBuddle: [],
      //User defined plan strategy name
      planStrategyName: "",
      //Confirm page icon:
      confirmPageIcon: (
        <FontAwesome5 name="angle-double-right" size={32} color="black" />
      ),
      //Confirm page title
      confirmPageTitle: "You are almost there",
      //Confirm Page confirm btn display
      confirmBtnDisplay: "flex",
      //Confirm page confirm txt display
      confirmTxtDisplay: "none",
      //Panel display
      swipeAblePanelDisplay: "flex",
      //Plan created view visibility
      thirdSlidePanelPageUpdatedDisplay: "none",
      //Event detail modal visibility
      isPlanDetailModalVis: false,
      //Strategy Duration shown on the first panel page
      strategyDuration: "",
      //Report Modal visibility
      isReportModalVis: false,
      //Report Screen Three text input
      reportScreen_THREETxt: "",
      //Current Index of swiper in report modal
      currentSwipeIndex: 0,
      //If the previous btn of report swiper is disabled
      isReportSwipePERVdisabled: true,
      //If Previous btn in the report popup is visible
      isReportSwipePERVvis: "flex",
      //the current page of report swipe
      currentSwipePage: 0,
      //Height of the report modal
      reportModalHeight: "50%",
      //Txt on the report next btn
      reportNEXTbtn: "NEXT",
      //Detail information shown on top of the report window
      reportDetailInfoVis: "flex",
      //The value selected on the first report page
      reportPageONEvalue: "1",
      //user-entered satisfaction score on the second page
      satisfactionScore: "1",
      //The value selected on the 4th report page
      reportPage_FOUR_value: "Different_Activity",
      //Page seven default value
      reportPage_SEVEN_value: "Yes",
      //Activity list on the report popup
      selfReportedActivityList: [],
      //Daily report collections
      preList: this.preList,
      //Daily report collection visibility
      isDailyReportVis: "none",
      //Activity records collection visibility
      isActivityRecordsVis: "flex",
      //report status: check the type of the report user submit
      reportStatus: "default",
      //calendar view height
      calendarViewHeight: 145,
      //hide icon
      hideIcon: <Ionicons name="chevron-down-circle" size={25} color="black" />,
      //The activity detail information view on the detail popup
      isDetailViewActivityInfoListVis:"flex",
      //Display "No activity" on the detail popup  when there is no planned activity 
      isNoActivitySignVis: "none"
    };
    this.processUserStrategies();
    // console.log("this.state.activityData", this.state.activityData);
  }
  componentDidMount() {
    this.scrollToThisWeek();
    this.dataModel = getDataModel();
    this.dataModel.loadUserStrategies();
    // console.log("componentDidMount");
  }
  //Get previous 7-day's daily reports
  processDailyReports = () => {
    let todayDate = new Date();
    let dailyReport = {};
    dailyReport.start = moment(todayDate).format().slice(0, 10);
    dailyReport.end = dailyReport.start;
    dailyReport.key = dailyReport.start;
    dailyReport.title = "Daily Report";
    let isReportExist = false;
    for (let event of this.userPlans) {
      if (event.start && !event.isDeleted) {
        if (event.start.slice(0, 10) === dailyReport.start.slice(0, 10)) {
          isReportExist = true;
        }
      }
    }
    if (!isReportExist) {
      //report.date = date;
      this.preList.push(dailyReport);
    }

    //this.preList.push(dailyReport);
    for (let i = 1; i < 5; i++) {
      let preDate = todayDate.setDate(todayDate.getDate() - 1);
      let report = {};
      let date = moment(preDate).format().slice(0, 10);
      let isReportExist = false;
      for (let event of this.userPlans) {
        if (event.start) {
          if (
            event.start.slice(0, 10) === date.slice(0, 10) &&
            !event.isDeleted
          ) {
            isReportExist = true;
          }
        }
      }
      if (!isReportExist) {
        report.title = "Daily Report";
        report.start = date;
        report.end = report.start;
        report.key = report.start;
        this.preList.push(report);
      }
    }
    // console.log(this.preList);
  };
  //Click the "Current Week" and scroll to the current week
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
  processUserEvents = () => {
    for (let event of this.userPlans) {
      if (event.title && !event.isDeleted) {
        if (
          !this.combineEventListFull.includes(event) &&
          !this.combineEventListFull.some(
            (e) => e.timeStamp === event.timeStamp
          )
        ) {
          this.combineEventListFull.push(event);
        }

        let monthNum = parseInt(event.end.slice(5, 7));
        let currMonth = new Date();
        if (monthNum === currMonth.getMonth() + 1) {
          if (
            !this.combinedEventListThis.includes(event) &&
            !this.combinedEventListThis.some(
              (e) => e.timeStamp === event.timeStamp
            )
          ) {
            this.combinedEventListThis.push(event);
          }
        } else if (monthNum === currMonth.getMonth()) {
          if (
            !this.combinedEventListLast.includes(event) &&
            !this.combinedEventListLast.some(
              (e) => e.timeStamp === event.timeStamp
            )
          ) {
            this.combinedEventListLast.push(event);
          }
        } else if (monthNum === currMonth.getMonth() + 2) {
          if (
            !this.combinedEventListNext.includes(event) &&
            !this.combinedEventListNext.some(
              (e) => e.timeStamp === event.timeStamp
            )
          ) {
            this.combinedEventListNext.push(event);
          }
        }
        //let plannedEvent = Object.assign({}, event);
      }
    }
  };
  //Process user strategies and get the current one
  processUserStrategies = async () => {
    let startDate = await SecureStore.getItemAsync("START_DATE");
    for (let strategy of this.userStrategies) {
      if (strategy.startDate === startDate) {
        this.currentStrategy = strategy;
        this.setState({ planStrategyName: strategy.title });
        this.setState({
          strategyDuration:
            strategy.startDate.slice(5) + " → " + strategy.endDate.slice(5),
        });
        let initKey = 0;
        for (let keyword of strategy.keywords) {
          keyword.key = initKey;
          initKey++;
        }
        this.setState({ keywordsBuddle: strategy.keywords });
        this.setState({ plansBuddle: strategy.plans });
      }
    }
  };
  //Process user defined activities
  processUserDefinedActivities = () => {
    this.activityData = [
      { key: 1, section: true, label: "Physical Activities" },
    ];
    let activityList = this.props.route.params.userActivityList;
    //console.log("activityList", activityList);
    this.index = 1;
    for (let activity of activityList) {
      this.index++;
      let activityObj = {
        key: this.index,
        label: activity,
      };
      this.activityData.push(activityObj);
    }
  };
  //Change calendar when past month btn pressed
  pastMonthBtnPressed = async () => {
    if (this.state.currentMonth === "THIS_MONTH") {
      // console.log("past month pressed");
      await this.setState({ currentMonth: "PAST_MONTH" });
      await this.setState({
        currentMonthEvents: this.combinedEventListLast,
      });
      await this.setState({
        currentWeatherLists: this.lastMonthWeather,
      });
      // await this.setState({ pastMonthBtnDisabled: true });
      await this.setState({
        currentMonthDate: new Date(
          this.state.date.getFullYear(),
          this.state.date.getMonth() - 1,
          15
        ),
      });
      await this.setState({ pastMonthBtnDisabled: true });
      await this.setState({ nextMonthBtnDisabled: false });
      await this.setState({
        currentMonthName: moment().subtract(1, "month").format("MMMM"),
      });
      this.monthCalRef.current.processEvents();
    } else if (this.state.currentMonth === "NEXT_MONTH") {
      this.resetCalendarToCurrentMonth();
    }
  };
  //Change calendar when next month btn pressed
  nextMonthBtnPressed = async () => {
    if (this.state.currentMonth === "THIS_MONTH") {
      // console.log("past month pressed");
      await this.setState({ currentMonth: "NEXT_MONTH" });
      await this.setState({
        currentMonthEvents: this.combinedEventListNext,
      });
      await this.setState({
        currentWeatherLists: this.nextMonthWeather,
      });
      // await this.setState({ pastMonthBtnDisabled: true });
      await this.setState({
        currentMonthDate: new Date(
          this.state.date.getFullYear(),
          this.state.date.getMonth() + 1,
          15
        ),
      });
      await this.setState({ nextMonthBtnDisabled: true });
      await this.setState({ pastMonthBtnDisabled: false });
      await this.setState({
        currentMonthName: moment().add(1, "month").format("MMMM"),
      });

      this.monthCalRef.current.processEvents();
    } else if (this.state.currentMonth === "PAST_MONTH") {
      this.resetCalendarToCurrentMonth();
    }
  };
  //Add new activity to user's activity list
  addNewActivityBtnPressed = async () => {
    let activityList = this.state.activityData;
    if (this.state.userDefinedActivityText) {
    }
    if (
      this.state.userDefinedActivityText === "" ||
      typeof this.state.userDefinedActivityText === "undefined"
    ) {
      showMessage({
        message: "Invalid Name",
        description: "Activity name can't be empty",
        type: "warning",
        icon: "warning",
      });
      return;
    }
    this.index++;
    let newActivity = {
      key: this.index,
      label: this.state.userDefinedActivityText,
    };
    for (let activity of activityList) {
      let activityToLowerCase = activity.label.toLowerCase();
      let newActivityToLowerCase =
        this.state.userDefinedActivityText.toLowerCase();
      if (activityToLowerCase === newActivityToLowerCase) {
        showMessage({
          message: "Activity already existed",
          description: "Please add another activity instead",
          type: "warning",
          icon: "warning",
        });
        this.setState({ userDefinedActivityText: "" });
        this.textInput.clear();
        return;
      }
    }
    activityList.push(newActivity);

    await this.dataModel.updateUserActivities(
      this.userKey,
      this.state.userDefinedActivityText
    );

    showMessage({
      message: "Activity Added",
      description:
        "The new activity " +
        this.state.userDefinedActivityText +
        " has been added to the list",
      type: "success",
      icon: "success",
    });
    await this.setState({ userDefinedActivityText: "" });
    this.textInput.clear();
  };
  //reset calendar to current month
  resetCalendarToCurrentMonth = async () => {
    await this.setState({ currentMonth: "THIS_MONTH" });
    await this.setState({
      currentMonthEvents: this.combinedEventListThis,
    });
    await this.setState({
      currentWeatherLists: this.thisMonthWeather,
    });
    await this.setState({
      currentMonthDate: new Date(),
    });
    await this.setState({ nextMonthBtnDisabled: false });
    await this.setState({ pastMonthBtnDisabled: false });
    await this.setState({ currentMonthName: moment().format("MMMM") });

    this.monthCalRef.current.processEvents();
  };
  //Validate the date user selected
  pickTheDate = async (date) => {
    let selectedDay = new Date(moment(date).format("YYYY-MM-DD"));
    // console.log("selectedDay", selectedDay);
    let today = new Date(moment(new Date()).format("YYYY-MM-DD"));

    let endDay = new Date(moment(today).add(7, "days"));
    // console.log("today", "endDay", today, endDay);
    // if (selectedDay > today && selectedDay <= endDay) {
    await this.setState({ selectedDate: selectedDay });
    // console.log("selectedDate", this.state.selectedDate);
    await this.setState({ isDateSelected: true });
    showMessage({
      message: "Date Selected",
      description:
        "The activity will be planned on " + moment(date).format("YYYY-MM-DD"),
      type: "success",
      icon: "success",
    });
    // } else {
    //   showMessage({
    //     message: "Invalid Date",
    //     description: "Please select a date in the next 7 days",
    //     type: "warning",
    //     icon: "warning",
    //   });
    // }
  };
  //Validate the start time user selected
  pickStartTime = async (date) => {
    this.setState({ isStartTimeSelected: true });
    await this.setState({ endTime: date });

    // await this.dateTimeFilter(date);
    console.log("date", date);
    if (date < this.state.endTime) {
      await this.setState({ startTime: date });
      await this.setState({ isStartTimeValid: true });
      await this.setState({ isEndTimeValid: true });
      showMessage({
        message: "Start Time Confirmed",
        description:
          "The activity will start from " +
          moment(this.state.startTime).format("HH:mm"),
        type: "success",
        icon: "success",
      });
    } else {
      await this.setState({ startTime: date });
      await this.setState({ isStartTimeValid: false });
      showMessage({
        message: "Invalid Time",
        description: "The start time must come before the end time",
        type: "warning",
        icon: "warning",
      });
    }
    console.log("this.state.endTime", this.state.endTime);
  };
  //Validate the end time user selected
  pickEndTime = async (date) => {
    // this.setState({ isTimeSelected: true });
    // await this.dateTimeFilter(date);
    // await this.setState({startTime:date});
    // console.log("end time", date);
    this.setState({ isEndTimeSelected: true });
    if (date > this.state.startTime) {
      await this.setState({ endTime: date });
      await this.setState({ isStartTimeValid: true });
      await this.setState({ isEndTimeValid: true });
      showMessage({
        message: "End Time Confirmed",
        description:
          "The activity will end at " +
          moment(this.state.endTime).format("HH:mm"),
        type: "success",
        icon: "success",
      });
    } else {
      await this.setState({ endTime: date });
      await this.setState({ isEndTimeValid: false });
      showMessage({
        message: "Invalid Time",
        description: "The end time must come after the start time",
        type: "warning",
        icon: "warning",
      });
    }
    // console.log("this.state.startTime",this.state.startTime);
  };
  //Plan the activity and show it on the calendar and the list view, update the new activity on Firebase
  onPlanBtnPressed = async () => {
    // if (!(this.state.isStartTimeSelected && this.state.isEndTimeSelected)) {
    //   showMessage({
    //     message: "Please specify the time",
    //     description: "You didn't pick the start or the end time",
    //     type: "warning",
    //     icon: "warning",
    //   });
    //   return;
    // }
    if (!this.state.isDateSelected) {
      showMessage({
        message: "Please specify the date",
        description: "The date field is empty",
        type: "warning",
        icon: "warning",
      });
      return;
    }
    if (!this.state.isActivityTypeSelected) {
      showMessage({
        message: "Please specify the activity first",
        description: "The activity type field is empty",
        type: "warning",
        icon: "warning",
      });
      return;
    }
    if (!(this.state.isEndTimeValid && this.state.isStartTimeValid)) {
      showMessage({
        message: "Time range is not valid",
        description: "Please reset the time range",
        type: "warning",
        icon: "warning",
      });
      return;
    }
    let selectedDate = this.state.selectedDate;
    // console.log("selectedDate on pressed",selectedDate);
    // let isPlanDuplicated = false;
    // for (let event of this.userPlans) {
    //   if (event.title && event.isDeleted === false) {
    //     let eventDate = new Date(event.start);
    //     if (
    //       eventDate.getMonth() === selectedDate.getMonth() &&
    //       eventDate.getDate() === selectedDate.getDate() + 1
    //     ) {
    //       console.log(
    //         "eventDate.getDate(), selectedDate.getDate()",
    //         eventDate.getDate(),
    //         selectedDate.getDate()
    //       );
    //       console.log("isPlanDuplicated: event.title", event);
    //       isPlanDuplicated = true;
    //     }
    //   }
    // }
    // if (isPlanDuplicated) {
    //   showMessage({
    //     message: "Please pick another day",
    //     description: "Can't plan two activities on the same day",
    //     type: "warning",
    //     icon: "warning",
    //   });
    //   return;
    // }
    let startTimeMinutes = moment(this.state.startTime).format("HH:mm:ss");
    let endTimeMinutes = moment(this.state.endTime).format("HH:mm:ss");
    console.log("selectedDate on pressed", selectedDate);
    let formattedDate = moment(selectedDate)
      .add(1, "days")
      .format()
      .slice(0, 11);
    console.log("formattedDate on pressed", formattedDate);
    let formattedStartTime = formattedDate + startTimeMinutes;
    let formattedEndTime = formattedDate + endTimeMinutes;
    let activityName = this.state.selectedActivity;

    let newEvent = {
      start: formattedStartTime,
      end: formattedEndTime,
      id: formattedStartTime + formattedEndTime,
      isPlanned: "planned",
      isReported: false,
      isCompleted: false,
      isDeleted: false,
      color: "white",
      title: activityName,
    };

    let timeStamp = moment(new Date()).format();
    newEvent.timeStamp = timeStamp;

    let weatherList = [];
    // console.log("moment.getMonth(selectedDate)",moment(selectedDate).month());
    // console.log("moment.getMonth(new Date())",moment(new Date()).month());
    if (moment(selectedDate).month() === moment(new Date()).month()) {
      weatherList = this.thisMonthWeather;
    } else {
      weatherList = this.nextMonthWeather;
    }
    // console.log("Date num", moment(selectedDate).date());
    for (let weather of weatherList) {
      // console.log("weather",weather);
      if (weather.date === moment(selectedDate).date()) {
        newEvent.weather = weather.text;
        newEvent.temp = weather.temp;
      }
    }
    console.log("new event", newEvent);

    let duration = moment.duration(
      moment(formattedEndTime).diff(moment(formattedStartTime))
    );
    let durationMinutes = parseInt(duration.asMinutes()) % 60;

    newEvent.duration = durationMinutes;
    newEvent.activityReminderKey = await this.dataModel.scheduleNotification(
      newEvent
    );

    newEvent.reportReminderKey =
      await this.dataModel.scheduleReportNotification(newEvent);

    if (moment(selectedDate).month() === moment(new Date()).month()) {
      this.combinedEventListThis.push(newEvent);
      this.resetCalendarToCurrentMonth();
    } else {
      this.combinedEventListNext.push(newEvent);
      this.nextMonthBtnPressed();
    }

    let updatedPlanBundle = this.state.plansBuddle;
    updatedPlanBundle.push(newEvent);

    let currentMinutes = this.state.accumulatedMinutes;
    let updatedMinutes = currentMinutes + durationMinutes;
    this.setState({ accumulatedMinutes: updatedMinutes });

    await this.setState({ plansBuddle: updatedPlanBundle });
    console.log(this.state.plansBuddle);

    showMessage({
      message: "Activity Planned!",
      description: activityName + " planned on " + formattedDate.slice(0, 10),
      type: "success",
      icon: "success",
    });

    // await this.dataModel.createNewPlan(this.userKey, newEvent);
    // await this.dataModel.loadUserPlans(this.userKey);
    // this.userPlans = this.dataModel.getUserPlans();

    // console.log("date",date);
  };

  //Delete the selected activity and update it on Firebase
  deleteActivity = async (selectedActivity) => {
    // console.log("this.state.plansBuddle on delete",this.state.plansBuddle);
    // let deleteIndexInPlansBuddle;
    for (let event of this.state.plansBuddle) {
      if (event.timeStamp === selectedActivity.timeStamp) {
        // deleteIndexInPlansBuddle = this.state.plansBuddle.indexOf(event);
        event.isDeleted = true;
      }
    }
    // console.log("deleteIndexInPlansBuddle",deleteIndexInPlansBuddle);
    // let currentPlansBuddle = this.state.plansBuddle;
    let updatedPlansBuddle = this.state.plansBuddle;
    // updatedPlansBuddle.splice(deleteIndexInPlansBuddle, 1);
    // updatedPlansBuddle.splice(deleteIndexInPlansBuddle,1);
    // console.log("updatedPlansBuddle",updatedPlansBuddle);
    await this.setState({ plansBuddle: updatedPlansBuddle });
    // console.log("this.state.plansBuddle",this.state.plansBuddle);

    let currentMinutes = this.state.accumulatedMinutes;
    let updatedMinutes = currentMinutes - selectedActivity.duration;
    this.setState({ accumulatedMinutes: updatedMinutes });

    selectedActivity.isDeleted = true;

    for (let event of this.userPlans) {
      if (event.timeStamp === selectedActivity.timeStamp) {
        selectedActivity.key = event.key;
        event.isDeleted = true;
      }
    }
    // console.log("this.userPlans after delete 1",this.userPlans);
    // await this.dataModel.updatePlan(this.userKey, selectedActivity);
    await this.dataModel.deleteReminders(selectedActivity);
    let monthNum = parseInt(selectedActivity.start.slice(5, 7));

    if (monthNum === this.state.date.getMonth() + 1) {
      let deleteIndex;
      //let deleteItem;
      for (let event of this.combinedEventListThis) {
        if (event.timeStamp === selectedActivity.timeStamp) {
          deleteIndex = this.combinedEventListThis.indexOf(event);
        }
      }
      this.combinedEventListThis.splice(deleteIndex, 1);
      await this.setState({ eventsThisMonth: this.combinedEventListThis });
    } else if (monthNum === this.state.date.getMonth() + 2) {
      let deleteIndex;
      for (let event of this.combinedEventListNext) {
        if (event.timeStamp === selectedActivity.timeStamp) {
          deleteIndex = this.combinedEventListNext.indexOf(event);
        }
      }
      this.combinedEventListNext.splice(deleteIndex, 1);
      await this.setState({ eventsNextMonth: this.combinedEventListNext });
    }

    if (moment(selectedActivity.start).month() === moment(new Date()).month()) {
      this.resetCalendarToCurrentMonth();
    } else {
      this.nextMonthBtnPressed();
    }
    await this.dataModel.loadUserPlans(this.userKey);
    this.userPlans = this.dataModel.getUserPlans();
    showMessage({
      message: "Activity Deleted!",
      description: selectedActivity.title + " has been deleted",
      type: "success",
      icon: "success",
    });
    // console.log("this.userPlans after delete 2",this.userPlans);
  };
  //Add user defined keywords to the list
  addKeywords = () => {
    let newKeywordsRow = this.state.userDefinedKeywords;
    if (newKeywordsRow) {
      if (newKeywordsRow === "") {
        showMessage({
          message: "Invalid Name",
          description: "keywords name can't be empty",
          type: "warning",
          icon: "warning",
        });
        return;
      }
      let newKeywords = { title: newKeywordsRow, type: "USER_DEFINED" };
      this.KeyWordTextInput.clear();
      this.setState({ userDefinedKeywords: "" });
      let updatedKeywordsListFromInput = this.state.keywordsListFromInput;
      for (let keywords of updatedKeywordsListFromInput) {
        if (keywords.title.toLowerCase() === newKeywords.title.toLowerCase()) {
          showMessage({
            message: "Invalid Name",
            description: "keywords already exists",
            type: "warning",
            icon: "warning",
          });
          return;
        }
      }
      updatedKeywordsListFromInput.push(newKeywords);
      this.setState({ keywordsListFromInput: updatedKeywordsListFromInput });

      let updatedKeywordsBuddle = [];
      for (let keywords of this.state.keywordsListFromExample) {
        updatedKeywordsBuddle.push(keywords);
      }
      for (let keywords of updatedKeywordsListFromInput) {
        updatedKeywordsBuddle.push(keywords);
      }
      this.setState({ keywordsBuddle: updatedKeywordsBuddle });
      showMessage({
        message: "Added keywords",
        description: newKeywords.title + " added to keywords",
        type: "success",
        icon: "success",
      });
    } else {
      showMessage({
        message: "Invalid Name",
        description: "keywords name can't be empty",
        type: "warning",
        icon: "warning",
      });
      return;
    }
  };
  //Delete user defined keywords
  deleteKeywords = (item) => {
    let deleteIndex;
    for (let keywords of this.state.keywordsListFromInput) {
      if (keywords.title === item.title) {
        deleteIndex = this.state.keywordsListFromInput.indexOf(keywords);
      }
    }
    let updatedKeywordsListFromInput = this.state.keywordsListFromInput;
    updatedKeywordsListFromInput.splice(deleteIndex, 1);
    this.setState({
      keywordsListFromInput: updatedKeywordsListFromInput,
    });

    let updatedKeywordsBuddle = [];
    for (let keywords of this.state.keywordsListFromInput) {
      updatedKeywordsBuddle.push(keywords);
    }
    for (let keywords of this.state.keywordsListFromExample) {
      updatedKeywordsBuddle.push(keywords);
    }
    this.setState({
      keywordsBuddle: updatedKeywordsBuddle,
    });
  };
  //Modify keywords selected from examples
  onChangeChips = (chips) => {
    let updatedKeywordsListFromExample = [];
    let updatedKeywordsBuddle = [];
    for (let keywords of this.state.keywordsListFromInput) {
      updatedKeywordsBuddle.push(keywords);
    }
    for (let keywords of chips) {
      let keywordsObj = { title: keywords, type: "EXAMPLE" };
      updatedKeywordsBuddle.push(keywordsObj);
      updatedKeywordsListFromExample.push(keywordsObj);
    }
    this.setState({ keywordsBuddle: updatedKeywordsBuddle });
    this.setState({
      keywordsListFromExample: updatedKeywordsListFromExample,
    });
  };
  //Fired when user presses the back btn on the last page
  onBackBtnPressed = () => {
    // this.setState({
    //   confirmPageIcon: (
    //     <FontAwesome5
    //       name="angle-double-right"
    //       size={32}
    //       color="black"
    //     />
    //   ),
    // });
    // this.setState({ confirmPageTitle: "You are almost there!" });
    // this.setState({ confirmBtnDisplay: "flex" });
    // this.setState({ confirmTxtDisplay: "none" });
    // this.setState({ swipeAblePanelDisplay: "flex" });
    // this.setState({ thirdSlidePanelPageUpdatedDisplay: "none" });

    this.setState({ mainContentSwiperDisplay: "flex" });
    this.setState({ conformationPageDisplay: "none" });
    this.mainContentSwiperRef.current.goToPage(1, true);
    this.setState({ panelHeight: 500 });
    this._panel.hide();
    this.setState({ displayCalView: "flex" });
    this.setState({ displayTitle: "flex" });
    this.setState({
      title: <SummarizePlanningStrategy height={28} width={119} />,
    });
    this.panelSwiperRef.current.goToPage(1, true);
  };
  //Fired when user presses the confirm btn on the last page
  onConfirmBtnPressed = async () => {
    if (this.state.planStrategyName === "") {
      showMessage({
        message: "Invalid Name",
        description: "plan strategy name can't be empty",
        type: "warning",
        icon: "warning",
      });
      return;
    }

    this.setState({
      confirmPageIcon: <Feather name="check-circle" size={32} color="black" />,
    });
    this.setState({ confirmPageTitle: "You are all set!" });
    this.setState({ confirmBtnDisplay: "none" });
    this.setState({ confirmTxtDisplay: "flex" });
    this.setState({ swipeAblePanelDisplay: "none" });
    this.setState({ thirdSlidePanelPageUpdatedDisplay: "flex" });

    let duration =
      moment(new Date()).format("MMM Do YY") +
      " " +
      moment(new Date()).add(7, "days").format("MMM Do YY");
    let timeStamp = moment(new Date()).format();

    let newStrategy = {
      title: this.state.planStrategyName,
      duration: duration,
      keywords: this.state.keywordsBuddle,
      plans: this.state.plansBuddle,
      timeStamp: timeStamp,
    };

    for (let event of this.state.plansBuddle) {
      await this.dataModel.createNewPlan(this.userKey, event);
    }
    await this.dataModel.loadUserPlans(this.userKey);
    this.userPlans = this.dataModel.getUserPlans();

    await this.dataModel.addToUserDefinedPlanStrategyList(
      this.userKey,
      newStrategy
    );
    this.dataModel.createDailyNotifications();
  };
  //Press the title on calendar
  onPress = (item, monthNum, month) => {
    this.isReportFromPopup = true;
    this.setState({isDetailViewActivityInfoListVis:"flex" });
    this.setState({isNoActivitySignVis:"none"})
    console.log("item, monthNum, month", item, monthNum, month);
    let today = new Date();
    let weatherList = [];
    let detailViewCalendar = [];
    let selectedEventDate = new Date(this.today.getFullYear(), monthNum, item);
    this.selectedEventDate = selectedEventDate;
    let formattedSelectedEventDate = moment(selectedEventDate)
      .format()
      .slice(0, 10);

    if (monthNum === today.getMonth()) {
      weatherList = this.thisMonthWeather;
      // console.log("this.combinedEventListThis",this.combinedEventListThis);
      for (let event of this.combinedEventListThis) {
        if (
          event.start &&
          event.start.slice(0, 10) === formattedSelectedEventDate
        ) {
          detailViewCalendar.push(event);
        }
      }
    } else if (monthNum < today.getMonth()) {
      weatherList = this.lastMonthWeather;
      for (let event of this.combinedEventListLast) {
        if (
          event.start &&
          event.start.slice(0, 10) === formattedSelectedEventDate
        ) {
          detailViewCalendar.push(event);
        }
      }
    } else {
      weatherList = this.nextMonthWeather;
      for (let event of this.combinedEventListNext) {
        if (
          event.start &&
          event.start.slice(0, 10) === formattedSelectedEventDate
        ) {
          detailViewCalendar.push(event);
        }
      }
    }
    for (let weather of weatherList) {
      if (weather.date === item) {
        this.selectedWeatherIcon = weather.img;
        this.selectedTemp = weather.temp;
        this.selectedWeatherTxt = weather.text;
      }
    }

    // console.log(formattedSelectedEventDate);

    this.detailViewCalendar = detailViewCalendar;
    this.setState({ isPlanDetailModalVis: true });
    let cnt = 0;
    for (let event of this.detailViewCalendar) {
      if (event.title) {
        cnt ++;
      }
    }
    if (cnt === 0) {
      this.setState({isDetailViewActivityInfoListVis: "none"});
      this.setState({ isNoActivitySignVis: "flex"})
    }
    console.log("detailViewCalendar", detailViewCalendar);
  };
  //Report btn pressed
  onMyActivityReportPressed = (item) => {
    if (this.isReportFromPopup) {
      console.log("Vis");
      for (let event of this.state.plansBuddle) {
        if (event.timeStamp === item.timeStamp) {
          this.onReportActivity = event;
        }
      }
    } else {
      console.log("Not Vis");
      this.onReportActivity = item;
    }
    
    this.setState({ isReportModalVis: true });
    this.setState({ reportDetailInfoVis: "flex" });
    this.setState({ isReportSwipePERVvis: "flex" });
    this.setState({ reportNEXTbtn: "NEXT" });

  };
  //When user pressed the daily report btn
  onDailyPressed = (item) => {
    this.setState({ isReportModalVis: true });
    this.setState({ currentSwipeIndex: 6 });
    this.setState({ currentSwipePage: 6 });
    this.setState({ reportModalHeight: "50%" });
    this.setState({ reportDetailInfoVis: "none" });
    this.setState({ isReportSwipePERVvis: "none" });
    this.setState({ reportNEXTbtn: "NEXT" });
  };
  //Close the daily report window
  onDailyReportClose = () => {
    this.setState({ isReportModalVis: false });
    this.setState({ currentSwipeIndex: 0 });
    this.setState({ currentSwipePage: 0 });
    this.setState({ reportModalHeight: "50%" });
    this.setState({ reportNEXTbtn: "NEXT" });
    this.setState({ isReportSwipePERVvis: "flex" });
    this.setState({ isReportSwipePERVdisabled: true });
    this.setState({ reportPageONEvalue: 1 });
    this.setState({ satisfactionScore: "1" });
    this.setState({ reportPage_FOUR_value: "Different_Activity" });
    this.setState({ reportPage_SEVEN_value: "Yes" });
    this.setState({ reportStatus: "default" });
    this.setState({
      selfReportedActivityList: [],
    });
    this.setState({ reportScreen_THREETxt: "" });
    this.setState({ selectedActivity: "" });
    this.setState({ startTime: new Date(this.today.setHours(8, 0, 0)) });
    this.setState({ startTime: new Date(this.today.setHours(8, 30, 0)) });
    this.isReportFromPopup = false;
  };
  //Add unplanned activity btn pressed
  onAddActivityPressed = () => {
    this.setState({ isReportModalVis: true });
    this.setState({ currentSwipeIndex: 7 });
    this.setState({ currentSwipePage: 7 });
    this.setState({ reportModalHeight: 600 });
    this.setState({ reportDetailInfoVis: "none" });
    this.setState({ isReportSwipePERVvis: "none" });
    this.setState({ reportStatus: "ADD_ACTIVITY" });
    this.setState({ reportNEXTbtn: "SUBMIT" });
  };
  //The previous btn on the report modal pressed
  onReportPrevBtnPressed = () => {
    // let currentSwipePage = this.state.currentSwipePage;
    // this.reportModalSwiperRef.current.scrollBy(-1, true);

    // if (currentSwipePage - 1 === 0) {
    //   this.setState({ currentSwipeIndex: 0 });
    //   this.setState({ isReportSwipePERVdisabled: true });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (currentSwipePage - 1 === 2) {
    //   this.setState({ currentSwipeIndex: 2 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (currentSwipePage - 1 === 4) {
    //   this.setState({ currentSwipeIndex: 4 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (currentSwipePage - 1 === 5) {
    //   this.setState({ currentSwipeIndex: 5 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (currentSwipePage - 1 === 6) {
    //   this.setState({ currentSwipeIndex: 6 });
    //   this.setState({ reportModalHeight: "50%" });
    //   this.setState({ reportNEXTbtn: "NEXT" });

    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // }
    // currentSwipePage--;
    // this.setState({ currentSwipePage: currentSwipePage });
    let currentSwipePage = this.state.currentSwipePage;
    // this.reportModalSwiperRef.current.scrollBy(-1, true);
    console.log("currentSwipePage", currentSwipePage);
    if (currentSwipePage === 1) {
      this.setState({ currentSwipeIndex: 0 });
      this.setState({ currentSwipePage: 0 });
      this.reportModalSwiperRef.current.scrollBy(-1, true);
      this.setState({ isReportSwipePERVdisabled: true });
      this.setState({ isReportModalVis: false });
      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (currentSwipePage === 2) {
      this.setState({ currentSwipeIndex: 0 });
      this.setState({ currentSwipePage: 0 });
      this.setState({ isReportSwipePERVdisabled: true });

      this.setState({ reportNEXTbtn: "NEXT" });
      this.reportModalSwiperRef.current.scrollBy(-1, true);
      this.setState({ isReportModalVis: false });

      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (currentSwipePage === 3) {
      this.setState({ currentSwipeIndex: 2 });
      this.setState({ currentSwipePage: 2 });
      this.reportModalSwiperRef.current.scrollBy(-1, true);
      this.setState({ isReportModalVis: false });

      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (currentSwipePage === 4) {
      this.setState({ currentSwipeIndex: 2 });
      this.setState({ currentSwipePage: 2 });
      this.reportModalSwiperRef.current.scrollBy(-2, true);
      this.setState({ reportModalHeight: "50%" });

      this.setState({ isReportModalVis: false });
      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (currentSwipePage === 5) {
      this.setState({ currentSwipeIndex: 3 });
      this.setState({ currentSwipePage: 3 });
      this.reportModalSwiperRef.current.scrollBy(-2, true);

      this.setState({ isReportModalVis: false });
      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (currentSwipePage === 7) {
      console.log("currentSwipePage7");
      this.setState({ isReportModalVis: false });
      this.setState({ reportNEXTbtn: "NEXT" });
      this.setState({ reportModalHeight: "50%" });
      if (this.state.reportPageONEvalue == 1) {
        this.setState({ currentSwipeIndex: 1 });
        this.setState({ currentSwipePage: 1 });
        this.reportModalSwiperRef.current.scrollBy(-6, true);
      } else if (this.state.reportPageONEvalue == 3) {
        if (this.state.reportPage_FOUR_value == "Different_Activity") {
          this.setState({ currentSwipeIndex: 5 });
          this.setState({ currentSwipePage: 5 });
          this.reportModalSwiperRef.current.scrollBy(-2, true);
        } else {
          this.setState({ currentSwipeIndex: 4 });
          this.setState({ currentSwipePage: 4 });
          this.reportModalSwiperRef.current.scrollBy(-3, true);
        }
      }
      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    }
    // currentSwipePage--;
    // this.setState({ currentSwipePage: currentSwipePage });
  };
  //The next btn on the report modal pressed
  onReportNextBtnPressed = () => {
    //this.state.currentSwipePage refers to the current page's index
    // if (this.state.currentSwipePage === 0) {
    //   this.setState({ isReportSwipePERVdisabled: false });
    //   this.reportModalSwiperRef.current.scrollBy(1, true);
    // } else if (this.state.currentSwipePage === 1) {
    //   this.setState({ currentSwipeIndex: 2 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (this.state.currentSwipePage === 3) {
    //   this.setState({ currentSwipeIndex: 4 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (this.state.currentSwipePage === 4) {
    //   this.setState({ currentSwipeIndex: 5 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (this.state.currentSwipePage === 6) {
    //   this.setState({ currentSwipeIndex: 7 });
    //   this.setState({ reportModalHeight: "90%" });
    //   this.setState({ isReportModalVis: false });
    //   this.setState({ reportNEXTbtn: "SUBMIT" });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else {
    //   this.reportModalSwiperRef.current.scrollBy(1, true);
    // }
    // let currentSwipePage = this.state.currentSwipePage;
    // currentSwipePage++;
    // this.setState({ currentSwipePage: currentSwipePage });

    //this.state.currentSwipePage refers to the current page's index
    // console.log("this.state.reportPageONEvalue", this.state.reportPageONEvalue);
    let currentSwipePage = this.state.currentSwipePage;

    if (this.state.currentSwipePage === 0) {
      this.setState({ isReportSwipePERVdisabled: false });

      if (this.state.reportPageONEvalue == 1) {
        this.reportModalSwiperRef.current.scrollBy(1, true);
        currentSwipePage++;
        this.setState({ currentSwipeIndex: 1 });
        this.setState({ isReportModalVis: false });
        setTimeout(() => {
          this.setState({ isReportModalVis: true }), 1000;
        });
      } else if (this.state.reportPageONEvalue == 2) {
        this.reportModalSwiperRef.current.scrollBy(2, true);

        currentSwipePage = currentSwipePage + 2;
        this.setState({ currentSwipeIndex: 2 });
        this.setState({ isReportModalVis: false });
        this.setState({ reportNEXTbtn: "SUBMIT" });
        setTimeout(() => {
          this.setState({ isReportModalVis: true }), 1000;
        });
      } else if (this.state.reportPageONEvalue == 3) {
        this.reportModalSwiperRef.current.scrollBy(2, true);

        currentSwipePage = currentSwipePage + 2;
        this.setState({ currentSwipeIndex: 2 });
        this.setState({ isReportModalVis: false });
        this.setState({ reportNEXTbtn: "NEXT" });
        setTimeout(() => {
          this.setState({ isReportModalVis: true }), 1000;
        });
      }
    } else if (this.state.currentSwipePage === 1) {
      currentSwipePage = currentSwipePage + 6;
      this.setState({ currentSwipeIndex: 7 });
      this.setState({ reportModalHeight: 670 });
      this.setState({ isReportModalVis: false });
      this.setState({ reportStatus: "COMPLETE" });
      this.setState({ reportNEXTbtn: "SUBMIT" });
      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (this.state.currentSwipePage === 2) {
      if (this.state.reportNEXTbtn === "SUBMIT") {
        console.log("SUBMIT FUNCTION HERE: NO ACTIVITY");
        this.onSubmitPressed_NoActivity();
      } else {
        this.reportModalSwiperRef.current.scrollBy(1, true);
        currentSwipePage = currentSwipePage + 2;
        this.setState({ currentSwipeIndex: 4 });
        this.setState({ reportModalHeight: 500 });
        this.setState({ isReportModalVis: false });
        this.setState({ startTime: new Date(this.onReportActivity.start) });
        this.setState({ endTime: new Date(this.onReportActivity.end) });
        this.setState({ selectedActivity: this.onReportActivity.title });
        setTimeout(() => {
          this.setState({ isReportModalVis: true }), 1000;
        });
      }
    } else if (this.state.currentSwipePage === 3) {
      if (this.state.reportPage_FOUR_value == "Different_Activity") {
        // console.log("Different_Activity");
        this.reportModalSwiperRef.current.scrollBy(2, true);

        currentSwipePage = currentSwipePage + 2;
        this.setState({ currentSwipeIndex: 5 });
        this.setState({ isReportModalVis: false });
        setTimeout(() => {
          this.setState({ isReportModalVis: true }), 1000;
        });
      } else {
        // console.log("Different_TIME");
        this.reportModalSwiperRef.current.scrollBy(1, true);
        this.setState({ reportModalHeight: 500 });
        currentSwipePage = currentSwipePage + 1;
        this.setState({ currentSwipeIndex: 4 });
        this.setState({ isReportModalVis: false });
        setTimeout(() => {
          this.setState({ isReportModalVis: true }), 1000;
        });
      }
    } else if (this.state.currentSwipePage === 4) {
      this.reportModalSwiperRef.current.scrollBy(3, true);
      currentSwipePage = currentSwipePage + 3;
      this.setState({ currentSwipeIndex: 7 });
      this.setState({ reportModalHeight: 670 });
      this.setState({ reportNEXTbtn: "SUBMIT" });
      this.setState({ reportStatus: "PARTIALLY_COMPLETE_TIME" });
      this.setState({ isReportModalVis: false });
      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (this.state.currentSwipePage === 5) {
      this.reportModalSwiperRef.current.scrollBy(2, true);
      currentSwipePage = currentSwipePage + 2;
      this.setState({ currentSwipeIndex: 7 });
      this.setState({ reportModalHeight: 670 });
      this.setState({ reportNEXTbtn: "SUBMIT" });
      this.setState({ reportStatus: "PARTIALLY_COMPLETE_ACTIVITY" });
      this.setState({ isReportModalVis: false });
      setTimeout(() => {
        this.setState({ isReportModalVis: true }), 1000;
      });
    } else if (this.state.currentSwipePage === 6) {
      if (this.state.reportPage_SEVEN_value == "Yes") {
        this.reportModalSwiperRef.current.scrollBy(2, true);
        currentSwipePage = currentSwipePage + 1;
        this.setState({ currentSwipeIndex: 7 });
        this.setState({ reportModalHeight: 670 });
        this.setState({ reportNEXTbtn: "SUBMIT" });

        this.setState({ isReportModalVis: false });
        setTimeout(() => {
          this.setState({ isReportModalVis: true }), 1000;
        });
      } else {
        this.setState({ reportNEXTbtn: "SUBMIT" });
        console.log("SUBMIT FUNCTION HERE");
      }
    } else {
      if (this.state.reportStatus == "ADD_ACTIVITY") {
        this.onSubmitPressed_UserAddedActivity();
      } else if (this.state.reportStatus == "COMPLETE") {
        this.onSubmitPressed_CompleteActivity();
      } else if (
        this.state.reportStatus == "PARTIALLY_COMPLETE_ACTIVITY" ||
        this.state.reportStatus == "PARTIALLY_COMPLETE_TIME"
      ) {
        this.OnSubmitPressed_PartiallyComplete();
      }
      console.log("SUBMIT on Self Report");
    }
    // } else if (this.state.currentSwipePage === 1) {
    //   this.setState({ currentSwipeIndex: 2 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (this.state.currentSwipePage === 3) {
    //   this.setState({ currentSwipeIndex: 4 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (this.state.currentSwipePage === 4) {
    //   this.setState({ currentSwipeIndex: 5 });
    //   this.setState({ isReportModalVis: false });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else if (this.state.currentSwipePage === 6) {
    //   this.setState({ currentSwipeIndex: 7 });
    //   this.setState({ reportModalHeight: "90%" });
    //   this.setState({ isReportModalVis: false });
    //   this.setState({ reportNEXTbtn: "SUBMIT" });
    //   setTimeout(() => {
    //     this.setState({ isReportModalVis: true }), 1000;
    //   });
    // } else {
    //   this.reportModalSwiperRef.current.scrollBy(1, true);
    // }

    this.setState({ currentSwipePage: currentSwipePage });
  };

  //Pressed the btn of the self-added activity report popup
  onPlanBtnPressed_reportScreen = async () => {
    if (!this.state.isActivityTypeSelected) {
      showMessage({
        message: "Please specify the activity first",
        description: "The activity type field is empty",
        type: "warning",
        icon: "warning",
      });
      return;
    }
    if (!(this.state.isEndTimeValid && this.state.isStartTimeValid)) {
      showMessage({
        message: "Time range is not valid",
        description: "Please reset the time range",
        type: "warning",
        icon: "warning",
      });
      return;
    }
    let selectedDate = this.state.selectedDate;
    let startTimeMinutes = moment(this.state.startTime).format("HH:mm:ss");
    let endTimeMinutes = moment(this.state.endTime).format("HH:mm:ss");
    console.log("selectedDate on pressed", selectedDate);
    let formattedDate;
    if (this.state.isDateSelected) {
      formattedDate = moment(selectedDate).add(1, "days").format().slice(0, 11);
    } else {
      formattedDate = moment(selectedDate).format().slice(0, 11);
    }

    console.log("formattedDate on pressed", formattedDate);
    let formattedStartTime = formattedDate + startTimeMinutes;
    let formattedEndTime = formattedDate + endTimeMinutes;
    let activityName = this.state.selectedActivity;

    let newEvent = {
      start: formattedStartTime,
      end: formattedEndTime,
      id: formattedStartTime + formattedEndTime,
      isPlanned: "added-activity",
      isReported: false,
      isCompleted: false,
      isDeleted: false,
      color: "blue",
      title: activityName,
    };

    let timeStamp = moment(new Date()).format();
    newEvent.timeStamp = timeStamp;

    let weatherList = [];

    if (moment(selectedDate).month() === moment(new Date()).month()) {
      weatherList = this.thisMonthWeather;
    } else {
      weatherList = this.nextMonthWeather;
    }
    for (let weather of weatherList) {
      if (weather.date === moment(selectedDate).date()) {
        newEvent.weather = weather.text;
        newEvent.temp = weather.temp;
      }
    }
    console.log("new event", newEvent);

    let duration = moment.duration(
      moment(formattedEndTime).diff(moment(formattedStartTime))
    );
    let durationMinutes = parseInt(duration.asMinutes()) % 60;

    newEvent.duration = durationMinutes;
    let updatedAdditionalActivityList = this.state.selfReportedActivityList;
    updatedAdditionalActivityList.push(newEvent);
    await this.setState({
      selfReportedActivityList: updatedAdditionalActivityList,
    });
    await this.setState({ isDateSelected: false });
    await this.setState({ selectedDate: new Date() });
  };
  //Delete the selected activity and update it on Firebase
  deleteActivity_reportScreen = async (selectedActivity) => {
    for (let event of this.state.selfReportedActivityList) {
      if (event.timeStamp === selectedActivity.timeStamp) {
        // deleteIndexInPlansBuddle = this.state.plansBuddle.indexOf(event);
        event.isDeleted = true;
      }
    }

    let updatedUserReportedActivityBuddle = this.state.selfReportedActivityList;
    await this.setState({
      selfReportedActivityList: updatedUserReportedActivityBuddle,
    });
    selectedActivity.isDeleted = true;
  };
  //Submit the user added activities
  onSubmitPressed_UserAddedActivity = () => {
    for (let event of this.state.selfReportedActivityList) {
      if (moment(event.start).month() === moment(new Date()).month()) {
        this.combinedEventListThis.push(event);
        this.resetCalendarToCurrentMonth();
      } else {
        this.combinedEventListNext.push(event);
        this.nextMonthBtnPressed();
      }
    }
    this.onDailyReportClose();
  };
  //Submit the completed activity
  onSubmitPressed_CompleteActivity = async () => {
    // console.log("this.onReportActivity",this.onReportActivity);
    let eventToUpdate = this.onReportActivity;
    eventToUpdate.isActivityCompleted = true;
    eventToUpdate.isReported = true;
    eventToUpdate.satisfactionScore = this.state.satisfactionScore;
    this.onDailyReportClose();
    let formattedThisMonth = parseInt(moment(new Date()).format().slice(5, 7));
    let formattedSelectedMonth = parseInt(
      moment(eventToUpdate.start).format().slice(5, 7)
    );

    let eventDate = new Date(eventToUpdate.start);
    await this.setState({ selectedDateRaw: eventDate });

    let eventToUpdateToFirebaseActivities;

    if (formattedSelectedMonth === formattedThisMonth) {
      for (let event of this.combinedEventListThis) {
        if (event.timeStamp) {
          if (event.timeStamp === eventToUpdate.timeStamp) {
            console.log("event from this.combinedEventListThis", event);
            event.isActivityCompleted = true;
            event.isReported = true;
            eventToUpdateToFirebaseActivities = event;
          }
        }
      }
      await this.resetCalendarToCurrentMonth();
      await this.setState({
        currentMonthDate: this.state.selectedDateRaw,
      });
      this.scrollToThisWeek();
    } else {
      for (let event of this.combinedEventListLast) {
        if (event.timeStamp) {
          if (event.timeStamp === eventToUpdate.timeStamp) {
            event.isActivityCompleted = true;
            event.isReported = true;
            eventToUpdateToFirebaseActivities = event;
          }
        }
      }
      await this.lastMonthEventReported(this.state.selectedDateRaw);
      this.scrollToThisWeek();
    }

    let strategyToUpdate = this.currentStrategy;
    console.log("this.currentStrategy.plans", this.currentStrategy.plans);

    await this.dataModel.updatePlan(
      this.userKey,
      eventToUpdateToFirebaseActivities
    );
    await this.dataModel.loadUserPlans(this.userKey);
    this.userPlans = this.dataModel.getUserPlans();

    await this.dataModel.updateStrategy(this.userKey, strategyToUpdate);
    await this.dataModel.loadUserStrategies(this.userKey);
    this.userStrategies = this.dataModel.getUserStrategies();
  };
  onSubmitPressed_NoActivity = async () => {
    let eventToUpdate = this.onReportActivity;
    let reason = this.state.reportScreen_THREETxt;
    eventToUpdate.isActivityCompleted = false;
    eventToUpdate.reason = reason;
    eventToUpdate.isReported = true;
    // eventToUpdate.satisfactionScore = this.state.satisfactionScore;
    this.onDailyReportClose();
    let formattedThisMonth = parseInt(moment(new Date()).format().slice(5, 7));
    let formattedSelectedMonth = parseInt(
      moment(eventToUpdate.start).format().slice(5, 7)
    );

    let eventDate = new Date(eventToUpdate.start);
    await this.setState({ selectedDateRaw: eventDate });

    let eventToUpdateToFirebaseActivities;

    if (formattedSelectedMonth === formattedThisMonth) {
      for (let event of this.combinedEventListThis) {
        if (event.timeStamp) {
          if (event.timeStamp === eventToUpdate.timeStamp) {
            // console.log("event from this.combinedEventListThis", event);
            event.isActivityCompleted = false;
            event.isReported = true;
            event.reason = reason;
            eventToUpdateToFirebaseActivities = event;
          }
        }
      }
      await this.resetCalendarToCurrentMonth();
      await this.setState({
        currentMonthDate: this.state.selectedDateRaw,
      });
      this.scrollToThisWeek();
    } else {
      for (let event of this.combinedEventListLast) {
        if (event.timeStamp) {
          if (event.timeStamp === eventToUpdate.timeStamp) {
            event.isActivityCompleted = false;
            event.isReported = true;
            event.reason = reason;
            eventToUpdateToFirebaseActivities = event;
          }
        }
      }
      await this.lastMonthEventReported(this.state.selectedDateRaw);
      this.scrollToThisWeek();
    }

    let strategyToUpdate = this.currentStrategy;
    // console.log("this.currentStrategy.plans", this.currentStrategy.plans);

    await this.dataModel.updatePlan(
      this.userKey,
      eventToUpdateToFirebaseActivities
    );
    await this.dataModel.loadUserPlans(this.userKey);
    this.userPlans = this.dataModel.getUserPlans();

    await this.dataModel.updateStrategy(this.userKey, strategyToUpdate);
    await this.dataModel.loadUserStrategies(this.userKey);
    this.userStrategies = this.dataModel.getUserStrategies();
  };
  //Submit the report when the activity is partially completed
  OnSubmitPressed_PartiallyComplete = async () => {
    this.setState({ isReportModalVis: false });
    let eventToUpdate = this.onReportActivity;
    let newActivity = Object.assign({}, this.onReportActivity);
    let eventToUpdateToFirebaseActivities;

    let reason = this.state.reportScreen_THREETxt;
    let formattedSelectedMonth = parseInt(
      moment(eventToUpdate.start).format().slice(5, 7)
    );
    let formattedThisMonth = parseInt(moment(new Date()).format().slice(5, 7));
    let eventDate = new Date(eventToUpdate.start);
    await this.setState({ selectedDateRaw: eventDate });

    let reportStatus;
    let formattedStart = moment(this.state.startTime).format().slice(11, 16);
    let formattedEnd = moment(this.state.endTime).format().slice(11, 16);
    if (
      formattedStart === this.onReportActivity.start.slice(11, 16) &&
      formattedEnd === this.onReportActivity.end.slice(11, 16)
    ) {
      reportStatus = "PARTIALLY_COMPLETE_ACTIVITY";
    } else {
      reportStatus = "PARTIALLY_COMPLETE_TIME";
    }
    console.log("reportStatus", reportStatus);
    console.log("this.state.selectedActivity", this.state.selectedActivity);

    if (reportStatus === "PARTIALLY_COMPLETE_TIME") {
      // Add a new partially completed activity

      newActivity.isActivityCompleted = false;
      newActivity.isReported = true;
      newActivity.isOtherActivity = true;
      newActivity.timeStamp = eventToUpdate.timeStamp + "PARTIAL_NEW";
      let startTimeMinutes = moment(this.state.startTime).format("HH:mm:ss");
      let endTimeMinutes = moment(this.state.endTime).format("HH:mm:ss");
      let formattedDate = this.onReportActivity.start.slice(0, 11);

      let formattedStartTime = formattedDate + startTimeMinutes;
      let formattedEndTime = formattedDate + endTimeMinutes;
      newActivity.start = formattedStartTime;
      newActivity.end = formattedEndTime;
      newActivity.title = this.state.selectedActivity;

      if (formattedSelectedMonth === formattedThisMonth) {
        this.combinedEventListThis.push(newActivity);
      } else {
        this.combinedEventListLast.push(newActivity);
      }
      await this.dataModel.createNewPlan(this.userKey, newActivity);
      //Update the original event
      eventToUpdate.isActivityCompleted = false;
      eventToUpdate.isOtherActivity = false;
      eventToUpdate.reason = reason;
      eventToUpdate.isReported = true;
      if (this.state.selectedActivity === this.onReportActivity.title) {
        eventToUpdate.partialStatus = "TIME";
      } else {
        eventToUpdate.partialStatus = "TIME_AND_ACTIVITY";
        eventToUpdate.oldTitle = eventToUpdate.title;
        eventToUpdate.title = this.state.selectedActivity;
      }

      eventToUpdate.newStart = formattedStartTime;
      eventToUpdate.newEnd = formattedEndTime;
      let duration = moment.duration(
        moment(formattedEndTime).diff(moment(formattedStartTime))
      );
      let durationMinutes = parseInt(duration.asMinutes()) % 60;
      eventToUpdate.newDuration = durationMinutes;

      // let eventToUpdateToFirebaseActivities;
      if (formattedSelectedMonth === formattedThisMonth) {
        for (let event of this.combinedEventListThis) {
          if (event.timeStamp) {
            if (event.timeStamp === eventToUpdate.timeStamp) {
              // console.log("event from this.combinedEventListThis", event);
              event.isActivityCompleted = false;
              event.isReported = true;
              event.isOtherActivity = false;
              event.reason = reason;
              eventToUpdateToFirebaseActivities = event;
            }
          }
        }
        await this.resetCalendarToCurrentMonth();
        await this.setState({
          currentMonthDate: this.state.selectedDateRaw,
        });
        this.onDailyReportClose();

        this.scrollToThisWeek();
      } else {
        for (let event of this.combinedEventListLast) {
          if (event.timeStamp) {
            if (event.timeStamp === eventToUpdate.timeStamp) {
              event.isActivityCompleted = false;
              event.isReported = true;
              event.isOtherActivity = false;
              event.reason = reason;
              eventToUpdateToFirebaseActivities = event;
            }
          }
        }
        await this.lastMonthEventReported(this.state.selectedDateRaw);
        this.scrollToThisWeek();
      }

      // console.log("formattedStartTime",formattedStartTime);
      // console.log("formattedEndTime",formattedEndTime);
    } else if (reportStatus === "PARTIALLY_COMPLETE_ACTIVITY") {
      let activityName = this.state.selectedActivity;

      eventToUpdate.isActivityCompleted = false;
      eventToUpdate.reason = reason;
      eventToUpdate.isReported = true;
      eventToUpdate.partialStatus = "ACTIVITY";
      eventToUpdate.oldTitle = eventToUpdate.title;
      eventToUpdate.title = activityName;

      if (formattedSelectedMonth === formattedThisMonth) {
        for (let event of this.combinedEventListThis) {
          if (event.timeStamp) {
            if (event.timeStamp === eventToUpdate.timeStamp) {
              // console.log("event from this.combinedEventListThis", event);
              event.isActivityCompleted = false;
              event.partialStatus = "ACTIVITY";
              event.isReported = true;
              event.isOtherActivity = true;
              event.reason = reason;
              event.oldTitle = event.title;
              event.title = activityName;
              eventToUpdateToFirebaseActivities = event;
            }
          }
        }
        await this.resetCalendarToCurrentMonth();
        await this.setState({
          currentMonthDate: this.state.selectedDateRaw,
        });
        this.scrollToThisWeek();
      } else {
        for (let event of this.combinedEventListLast) {
          if (event.timeStamp) {
            if (event.timeStamp === eventToUpdate.timeStamp) {
              event.isActivityCompleted = false;
              event.partialStatus = "ACTIVITY";
              event.isReported = true;
              event.isOtherActivity = true;
              event.reason = reason;
              event.oldTitle = event.title;
              event.title = activityName;
              eventToUpdateToFirebaseActivities = event;
            }
          }
        }
        await this.lastMonthEventReported(this.state.selectedDateRaw);
        this.onDailyReportClose();
        this.scrollToThisWeek();
      }
    }
    let strategyToUpdate = this.currentStrategy;
    // console.log("this.currentStrategy.plans", this.currentStrategy.plans);

    await this.dataModel.updatePlan(
      this.userKey,
      eventToUpdateToFirebaseActivities
    );
    await this.dataModel.loadUserPlans(this.userKey);
    this.userPlans = this.dataModel.getUserPlans();

    await this.dataModel.updateStrategy(this.userKey, strategyToUpdate);
    await this.dataModel.loadUserStrategies(this.userKey);
    this.userStrategies = this.dataModel.getUserStrategies();
  };

  lastMonthEventReported = async (date) => {
    this.monthCalRef.current.processEvents();
    if (this.state.currentMonth === "THIS_MONTH") {
      // console.log("nxt month pressed");
      await this.setState({ currentMonth: "PAST_MONTH" });
      await this.setState({
        currentMonthEvents: this.combinedEventListLast,
      });
      await this.setState({
        currentWeatherLists: this.lastMonthWeather,
      });
      // await this.setState({ pastMonthBtnDisabled: true });
      if (date) {
        await this.setState({
          currentMonthDate: date,
        });
      } else {
        await this.setState({
          currentMonthDate: new Date(
            this.state.date.getFullYear(),
            this.state.date.getMonth() + 1,
            15
          ),
        });
      }

      await this.setState({ nextMonthBtnDisabled: false });
      await this.setState({ pastMonthBtnDisabled: true });
      await this.setState({
        currentMonthName: moment().subtract(1, "month").format("MMMM"),
      });

      this.monthCalRef.current.processEvents();
    } else if (this.state.currentMonth === "NEXT_MONTH") {
      this.resetCalendarToCurrentMonth();
    }
  };
  onHideDetailPressed = () => {
    if (this.state.calendarViewHeight === 145) {
      this.setState({ calendarViewHeight: 435 });
      this.setState({
        hideIcon: <Ionicons name="chevron-up-circle" size={25} color="black" />,
      });
    } else {
      this.setState({ calendarViewHeight: 145 });
      this.setState({
        hideIcon: (
          <Ionicons name="chevron-down-circle" size={25} color="black" />
        ),
      });
    }
  };
  //Styling for records
  itemCompletedBlockStyle = (item, timing) => {
    return (
      <View
        style={[
          {
            width: "100%",
            height: this.state.isPlanDetailModalVis ? 70 : 39,
            borderRadius: 20,
            borderColor: "#F0F0F0",
            borderWidth: 0,
            paddingHorizontal: 6,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: this.state.isPlanDetailModalVis ? 10 : 15,
            backgroundColor: GREEN,
          },
        ]}
      >
        <View style={{ position: "absolute", left: 5 }}>
          <Ionicons name="checkmark-circle" size={20} color="white" />
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            fontFamily: "RobotoBoldBold",
            fontSize: 14,
            paddingLeft: 18,
            color: "white",
            width: 100,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "RobotoRegular",
            fontSize: 14,
            color: "white",
          }}
        >
          {moment(item.start).format().slice(5, 10)} {"| "}
        </Text>
        <Text
          style={{
            fontFamily: "RobotoRegular",
            fontSize: 14,
            color: "white",
          }}
        >
          {timing}
        </Text>
      </View>
    );
  };
  itemUnCompletedBlockStyle = (item, timing) => {
    return (
      <View
        style={[
          {
            width: "100%",
            height: 60,
            borderRadius: 15,
            borderColor: "#F0F0F0",
            borderWidth: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
            backgroundColor: BLACK,
            // paddingVertical: 10,
            flex: 1,
          },
        ]}
      >
        <View
          style={{
            // marginTop:10,
            flexDirection: "row",
            width: "100%",
            height: 32,
            // paddingHorizontal: 25,
            // backgroundColor:"red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ position: "absolute", left: 5 }}>
            <MaterialIcons name="cancel" size={24} color="white" />
          </View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              fontFamily: "RobotoBoldBold",
              fontSize: 14,
              paddingLeft: 18,
              color: "white",
              width: 100,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: "white",
            }}
          >
            {moment(item.start).format().slice(5, 10)} {"| "}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: "white",
            }}
          >
            {timing}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            backgroundColor: "white",
            borderColor: BLACK,
            alignItems: "center",
            flex: 1,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              textAlignVertical: "center",
              color: "white",
              flex: 1,
              marginLeft: 35,
              color: BLACK,
            }}
          >
            Affected by: {item.reason}
          </Text>
        </View>
      </View>
    );
  };
  itemUnreportedBlockStyle = (item, timing) => {
    let itemUnreportedBlockStyle = (
      <View
        style={[
          {
            width: "100%",
            height: 60,
            borderRadius: 15,
            borderColor: "black",
            borderWidth: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
            backgroundColor: "white",
            // flexDirection: "column",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            width: "80%",
            paddingVertical: 0,
            paddingHorizontal: 6,
            height: "70%",
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBoldBold",
              fontSize: 14,
              paddingLeft: 8,
              color: "black",
            }}
          >
            {item.title}
            {" | "}
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 14,
              }}
            >
              {moment(item.start).format().slice(5, 10)}
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              width: "100%",
              paddingLeft: 8,
            }}
          >
            {timing}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            borderBottomRightRadius: 12,
            borderTopRightRadius: 12,
            borderWidth: 3,
            height: "100%",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            // item.isReported = true;
            // console.log(
            //   "this.state.plansBuddle",
            //   this.state.plansBuddle
            // );
            
            setTimeout(() => {
              this.onMyActivityReportPressed(item), 1000;
            });
            this.setState({ isPlanDetailModalVis: false });
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: "white",
              paddingHorizontal: 10,
              alignSelf: "center",
              backgroundColor: "black",
            }}
          >
            Report
          </Text>
        </TouchableOpacity>
      </View>
    );
    return itemUnreportedBlockStyle;
  };
  itemPartialCompleteStyle_TIME = (item, timing, newTiming) => {
    let itemPartialCompleteStyle_TIME = (
      <View
        style={[
          {
            width: "100%",
            height: 85,
            borderRadius: 15,
            borderColor: "#F0F0F0",
            borderWidth: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
            backgroundColor: YELLOW,
            flex: 1,
          },
        ]}
      >
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ position: "absolute", left: 5 }}>
            <Ionicons name="remove-circle" size={24} color="white" />
          </View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              fontFamily: "RobotoBoldBold",
              fontSize: 14,
              paddingLeft: 18,
              color: "white",
              marginRight: 10,
              // width: 100,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: "white",
            }}
          >
            {moment(item.start).format().slice(5, 10)} {"|"}{" "}
            {moment(item.start).format("ddd").toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            // backgroundColor:"white",
            borderRadius: 20,
            marginTop: 2,
            marginRight: 5,
            marginLeft: 28,
            // borderColor: "white",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBoldBold",
              fontSize: 12,
              flex: 1,
              color: "black",
              marginLeft: 10,
            }}
          >
            {timing.slice(4)} → {newTiming}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            // borderTopWidth: 1,
            borderColor: "white",
            alignItems: "center",
            backgroundColor: "white",
            flex: 1,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderWidth: 2,
            borderColor: YELLOW,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: YELLOW,
              marginLeft: 35,
              flex: 1,
            }}
          >
            Affected by: {item.reason}
          </Text>
        </View>
      </View>
    );
    return itemPartialCompleteStyle_TIME;
  };
  itemPartialCompleteStyle_ACTIVITY = (item, timing) => {
    let itemPartialCompleteStyle_ACTIVITY = (
      <View
        style={[
          {
            width: "100%",
            height: 85,
            borderRadius: 15,
            borderColor: "#F0F0F0",
            borderWidth: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: this.state.isPlanDetailModalVis ? 7: 15,
            backgroundColor: YELLOW,
            paddingVertical: 0,
            flex: 1,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ position: "absolute", left: 5 }}>
            <Ionicons name="remove-circle" size={24} color="white" />
          </View>
          <View style={{ borderRadius: 20, width: "100%" }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                fontFamily: "RobotoBoldBold",
                fontSize: 14,
                paddingLeft: 18,
                width: "100%",
                color: "black",
              }}
            >
              {item.oldTitle} → {item.title}{" "}
              <Text style={{ fontFamily: "RobotoRegular", color: "white" }}>
                {item.start.slice(5, 10)} | {timing.slice(0, 3)}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            // borderTopWidth: 1,
            borderColor: "white",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              flex: 1,
              color: "white",
              marginLeft: 38,
            }}
          >
            {timing.slice(4)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            borderColor: YELLOW,
            alignItems: "center",
            backgroundColor: "white",
            flex: 1,
            width: "100%",
            borderWidth: 2,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: YELLOW,
              marginLeft: 35,
              flex: 1,
            }}
          >
            Affected by: {item.reason}
          </Text>
        </View>
      </View>
    );
    return itemPartialCompleteStyle_ACTIVITY;
  };
  itemPartialCompleteStyle_TIME_ACTIVITY = (item, timing, newTiming) => {
    let itemPartialCompleteStyle_TIME = (
      <View
        style={[
          {
            width: "100%",
            height: 85,
            borderRadius: 15,
            borderColor: "#F0F0F0",
            borderWidth: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
            backgroundColor: YELLOW,
            flex: 1,
          },
        ]}
      >
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ position: "absolute", left: 5 }}>
            <Ionicons name="remove-circle" size={24} color="white" />
          </View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              fontFamily: "RobotoBoldBold",
              fontSize: 14,
              paddingLeft: 18,
              color: "black",
              marginRight: 10,
              // width: 100,
            }}
          >
            {item.oldTitle} → {item.title}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: "white",
            }}
          >
            {moment(item.start).format().slice(5, 10)} {"|"}{" "}
            {moment(item.start).format("ddd").toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            // backgroundColor:"white",
            borderRadius: 20,
            marginTop: 2,
            marginRight: 5,
            marginLeft: 28,
            // borderColor: "white",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBoldBold",
              fontSize: 12,
              flex: 1,
              color: "black",
              marginLeft: 10,
            }}
          >
            {timing.slice(4)} → {newTiming}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            // borderTopWidth: 1,
            borderColor: "white",
            alignItems: "center",
            backgroundColor: "white",
            flex: 1,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderWidth: 2,
            borderColor: YELLOW,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 14,
              color: YELLOW,
              marginLeft: 35,
              flex: 1,
            }}
          >
            Affected by: {item.reason}
          </Text>
        </View>
      </View>
    );
    return itemPartialCompleteStyle_TIME;
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
                optionContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: "white",
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 15,
                }}
                selectStyle={{ borderWidth: 0 }}
                selectTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                initValueTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                backdropPressToClose={true}
                overlayStyle={{
                  flex: 1,
                  padding: "5%",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  borderRadius: 20,
                }}
                optionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldBlack",
                }}
                sectionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldItalic",
                }}
                cancelStyle={{
                  backgroundColor: "black",
                  borderRadius: 15,
                }}
                cancelTextStyle={{ fontWeight: "bold", color: "white" }}
                data={this.state.activityData}
                initValue={"Select Here"}
                onChange={async (item) => {
                  this.setState({ isActivityTypeSelected: true });
                  this.setState({ selectedActivity: item.label });
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
              Self-Defined Activity
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
                ref={(input) => {
                  this.textInput = input;
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
                  onPress={this.addNewActivityBtnPressed}
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
            // paddingHorizontal: "5%",

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
              borderColor: "#F0F0F0",
              backgroundColor: "#DADADA",
              paddingVertical: "4%",
              borderBottomLeftRadius: 15,
              borderTopLeftRadius: 15,
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
                backgroundColor: "#DADADA",
                borderRadius: 5,
              }}
            >
              <DateTimePicker
                value={this.state.dateTimePickerDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={async (e, date) => {
                  this.pickTheDate(date);
                  this.setState({ dateTimePickerDate: date });
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
              paddingVertical: "4%",
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
                value={this.state.startTime}
                mode="spinner"
                minuteInterval={10}
                is24Hour={true}
                display="default"
                onChange={async (e, date) => this.pickStartTime(date)}
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
              paddingVertical: "4%",
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
                value={this.state.endTime}
                mode="spinner"
                minuteInterval={10}
                is24Hour={true}
                display="default"
                onChange={async (e, date) => this.pickEndTime(date)}
                style={{
                  width: 90,
                  height: 40,
                  flex: 1,
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.onPlanBtnPressed()}>
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
            onChangeChips={(chips) => this.onChangeChips(chips)}
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
            ref={(input) => {
              this.KeyWordTextInput = input;
            }}
            value={this.state.userDefinedKeywords}
            onChangeText={(text) => {
              this.setState({ userDefinedKeywords: text });
            }}
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
              onPress={() => this.addKeywords()}
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
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            width: "80%",
          }}
        >
          <View
            style={[
              generalStyles.shadowStyle,
              {
                marginTop: "5%",
                width: "80%",
                backgroundColor: "white",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "RobotoBoldItalic",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Your planning strategy will appear here:
            </Text>
          </View>
          <View
            style={[
              // generalStyles.shadowStyle,
              {
                height: 81,
                width: 335,
                borderColor: "black",
                // borderWidth: 2,
                borderRadius: 20,
                marginTop: "5%",
                flexDirection: "row",
                backgroundColor: "white",
              },
            ]}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                // borderTopLeftRadius: 20,
                // borderBottomLeftRadius: 20,
                // borderRightColor: "black",
                // borderRightWidth: 2,
                // paddingLeft: 20,
                paddingVertical: 10,
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Image
                source={require("./assets/loader.gif")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        </View>
      </View>
    );
    let thirdSlidePanelPageUpdated = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {/* <View
            style={[
              generalStyles.shadowStyle,
              {
                marginTop: "5%",
                width: "90%",
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "RobotoBoldBold",
                fontSize: 14,
                textAlign: "center",
                marginLeft: "5%",
                flex: 1,
              }}
            >
              0 uncompleted daily report
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                borderRadius: 20,
                height: "90%",
                flex: 0.4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "RobotoBoldBold",
                  fontSize: 14,
                }}
              >
                Complete
              </Text>
            </TouchableOpacity>
          </View> */}
          <View
            style={[
              // generalStyles.shadowStyle,
              {
                marginTop: "5%",
                width: "90%",
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "RobotoBoldBold",
                fontSize: 18,
                textAlign: "center",
                marginLeft: "5%",
              }}
            >
              Current Planning Strategy
            </Text>
          </View>
          <View
            style={[
              generalStyles.shadowStyle,
              {
                height: 81,
                width: 335,
                borderColor: GREEN,
                borderWidth: 2,
                borderRadius: 20,
                marginTop: "5%",
                flexDirection: "row",
                backgroundColor: "white",
              },
            ]}
          >
            <TouchableOpacity
              style={{
                height: "100%",
                width: "100%",

                // borderRightColor: "black",
                // borderRightWidth: 2,
                paddingLeft: 0,
                paddingVertical: 0,
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
              onPress={() => this.setState({ isStrategyDetailModalVis: true })}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  height: "50%",
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                  backgroundColor: GREEN,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <View
                    style={{
                      height: 9,
                      width: 9,
                      borderRadius: 4.5,
                      backgroundColor: GREEN,
                      marginRight: 10,
                    }}
                  /> */}
                  <Text
                    style={{
                      fontFamily: "RobotoBoldBlack",
                      fontSize: 18,
                      marginBottom: 0,
                      marginRight: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "10%",
                      color: "white",
                      alignSelf: "center",
                      textAlign: "center",
                    }}
                  >
                    {this.state.planStrategyName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    // backgroundColor: "red",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 20,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "RobotoBoldBold",
                      textAlign: "center",
                      marginTop: 0,
                      color: GREEN,
                    }}
                  >
                    {this.state.strategyDuration}
                  </Text>
                </View>
                <View style={{ position: "absolute", right: 5 }}>
                  <MaterialIcons name="track-changes" size={20} color="white" />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  paddingLeft: "5%",
                  // alignItems:"center"
                }}
              >
                {this.state.keywordsBuddle.map((item) => {
                  return (
                    <View
                      style={{
                        borderRadius: 20,
                        height: 32,
                        // backgroundColor: "#E7E7E7",
                        marginRight: 2,
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          color: "#1AB700",
                          fontSize: 13,
                        }}
                      >
                        # {item.title}
                      </Text>
                    </View>
                  );
                })}
                {/* <FlatList
                  horizontal={true}
                  contentContainerStyle={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: "red",
                  }}
                  data={this.state.keywordsBuddle}
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
                /> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
    let secondSlidePanelPageUpdated = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <View
            style={[
              // generalStyles.shadowStyle,
              {
                marginTop: "5%",
                width: "90%",
                height: 20,
                backgroundColor: "white",
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "RobotoBoldBold",
                fontSize: 18,
                textAlign: "center",
                marginLeft: "5%",
                flex: 1,
              }}
            >
              My Planning Strategies
            </Text>
          </View>
          <FlatList
            data={this.userStrategies}
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    // generalStyles.shadowStyle,
                    {
                      height: 81,
                      width: 335,
                      borderColor: "black",
                      borderWidth: 2,
                      borderRadius: 20,
                      marginTop: "5%",
                      flexDirection: "row",
                      backgroundColor: "white",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      width: "80%",
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      // borderRightColor: "black",
                      // borderRightWidth: 2,
                      paddingLeft: 20,
                      paddingVertical: 10,
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                    onPress={() =>
                      this.setState({ isStrategyDetailModalVis: true })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            height: 9,
                            width: 9,
                            borderRadius: 4.5,
                            backgroundColor: GREEN,
                            marginRight: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "RobotoBoldBlack",
                            fontSize: 18,
                            marginBottom: 5,
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          // backgroundColor: "red",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "RobotoBoldBold",
                            marginTop: 0,
                            color: GREEN,
                          }}
                        >
                          {item.startDate.slice(5)} - {item.endDate.slice(5)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                      }}
                    >
                      {item.keywords.map((item) => {
                        return (
                          <View
                            style={{
                              borderRadius: 20,
                              height: 32,
                              // backgroundColor: "#E7E7E7",
                              marginRight: 2,
                              padding: 5,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                color: "grey",
                                fontSize: 13,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        );
                      })}
                      {/* <FlatList
                    horizontal={true}
                    contentContainerStyle={{
                      flexDirection: "row",
                      width: "100%",
                      backgroundColor: "red",
                    }}
                    data={this.state.keywordsBuddle}
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
                  /> */}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
    let planSetUpPage = (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* Body */}
        <View
          style={[
            // generalStyles.shadowStyle,
            {
              width: "98%",
              height: "100%",
              backgroundColor: "white",
              marginTop: 4,
              borderRadius: 20,
              borderColor: "grey",
              borderRadius: 2,
              alignItems: "center",
            },
          ]}
        >
          {/* Report option switch selector */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
              padding: 15,
            }}
          >
            {/* <Text style={{ fontFamily: "RobotoBoldItalic", fontSize: 18 }}>
              My Activities
            </Text> */}
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                marginRight: 10,
              }}
              onPress={() => {
                this.onHideDetailPressed();
              }}
            >
              {this.state.hideIcon}
            </TouchableOpacity>

            <View
              style={{
                width: "100%",
                flex: 10,

                height: 20,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <SwitchSelector
                options={REPORT_OPTIONS}
                height={20}
                buttonColor="black"
                style={{
                  borderWidth: 2,
                  borderRadius: 40,
                  padding: 1,
                  borderColor: "black",
                }}
                textStyle={{
                  fontSize: 10,
                  fontFamily: "RobotoRegular",
                  color: "black",
                }}
                selectedTextStyle={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
                borderWidth={0}
                initial={0}
                onPress={(value) => {
                  if (value == "daily") {
                    this.setState({ isDailyReportVis: "flex" });
                    this.setState({ isActivityRecordsVis: "none" });
                  } else {
                    this.setState({ isDailyReportVis: "none" });
                    this.setState({ isActivityRecordsVis: "flex" });
                  }
                }}
              />
              <Badge
                label={"8"}
                size={16}
                backgroundColor={"red"}
                style={{ position: "absolute", top: -6, left: -8 }}
              />
            </View>
            {/* <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 13 }}>
              {this.state.accumulatedMinutes}/150 minutes remains
            </Text> */}
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                flex: 1,
              }}
              onPress={() => {
                this.onAddActivityPressed();
              }}
            >
              <Ionicons
                name="ios-add-circle"
                size={25}
                color={"black"}
                // style={{flex:0.1}}
              />
            </TouchableOpacity>
          </View>
          {/* Planned Activity records  */}
          <View
            style={{
              width: "100%",
              height: 280,
              paddingHorizontal: 15,
              display: this.state.isActivityRecordsVis,
            }}
          >
            <FlatList
              data={this.state.plansBuddle}
              renderItem={({ item }) => {
                if (!item.isDeleted) {
                  let newTiming = "";
                  let timing =
                    moment(item.start).format("ddd").toUpperCase() +
                    " " +
                    item.start.slice(11, 16) +
                    " - " +
                    item.end.slice(11, 16) +
                    " | " +
                    item.duration +
                    " MIN";
                  let itemBlockStyle;
                  if (item.newStart) {
                    newTiming =
                      item.newStart.slice(11, 16) +
                      " - " +
                      item.newEnd.slice(11, 16) +
                      " | " +
                      item.newDuration +
                      " MIN";
                  }

                  if (!item.isReported) {
                    itemBlockStyle = this.itemUnreportedBlockStyle(
                      item,
                      timing
                    );
                  } else {
                    if (item.isActivityCompleted) {
                      itemBlockStyle = this.itemCompletedBlockStyle(
                        item,
                        timing
                      );
                    } else {
                      if (item.isOtherActivity) {
                      } else {
                        if (item.partialStatus) {
                          if (item.partialStatus === "TIME") {
                            itemBlockStyle = this.itemPartialCompleteStyle_TIME(
                              item,
                              timing,
                              newTiming
                            );
                          } else if (item.partialStatus === "ACTIVITY") {
                            itemBlockStyle =
                              this.itemPartialCompleteStyle_ACTIVITY(
                                item,
                                timing
                              );
                          } else {
                            itemBlockStyle =
                              this.itemPartialCompleteStyle_TIME_ACTIVITY(
                                item,
                                timing,
                                newTiming
                              );
                          }
                        } else {
                          itemBlockStyle = this.itemUnCompletedBlockStyle(
                            item,
                            timing
                          );
                        }
                      }
                    }
                  }

                  return itemBlockStyle;
                }
                // console.log("items in plansBuddle", item);
              }}
            />
          </View>
          {/* Daily reports */}
          <View
            style={{
              width: "100%",
              height: 280,
              paddingHorizontal: 15,
              display: this.state.isDailyReportVis,
            }}
          >
            <FlatList
              data={this.state.preList}
              renderItem={
                ({ item }) => {
                  let itemUnreportedBlockStyle = (
                    <View
                      style={[
                        {
                          width: "100%",
                          height: 40,
                          borderRadius: 20,
                          borderColor: "#F0F0F0",
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 15,
                          backgroundColor: "white",
                          flexDirection: "column",
                          paddingVertical: 6,
                        },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "RobotoBoldBold",
                            fontSize: 18,
                            paddingLeft: 8,
                            color: "black",
                          }}
                        >
                          {item.title}
                          {" | "}
                          <Text
                            style={{
                              fontFamily: "RobotoRegular",
                              fontSize: 16,
                            }}
                          >
                            {moment(item.start).format().slice(5, 10)}
                          </Text>
                        </Text>

                        <TouchableOpacity
                          style={{
                            borderRadius: 20,
                            height: "100%",
                            backgroundColor: "black",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            // item.isReported = true;
                            // console.log(
                            //   "this.state.plansBuddle",
                            //   this.state.plansBuddle
                            // );
                            this.onDailyPressed(item);
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "RobotoBoldBold",
                              fontSize: 14,
                              color: "white",
                              paddingHorizontal: 10,
                              alignSelf: "center",
                            }}
                          >
                            Report
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                  return itemUnreportedBlockStyle;
                }
                // console.log("items in plansBuddle", item);
              }
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
        {/* Body */}
        <View
          style={[
            // generalStyles.shadowStyle,
            {
              width: "98%",
              height: "90%",
              backgroundColor: "white",
              marginTop: 4,
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
              Overview
            </Text>
            <Text
              style={{
                fontFamily: "RobotoBoldItalic",
                fontSize: 14,
                marginTop: 5,
                color: "#676767",
              }}
            >
              I completed <Text style={{ color: "blue" }}>50%</Text> of my
              plans.
            </Text>
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
          {this.state.confirmPageIcon}
          <Text
            style={{
              fontFamily: "RobotoBoldItalic",
              fontSize: 24,
              marginTop: "5%",
            }}
          >
            {this.state.confirmPageTitle}
          </Text>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              display: this.state.confirmBtnDisplay,
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 14,
                marginTop: "5%",
                width: "80%",
                textAlign: "center",
              }}
            >
              Give a name to your plans:
            </Text>
            <View
              style={{
                backgroundColor: "white",
                height: 32,
                width: 200,
                borderRadius: 20,
                borderWidth: 2,
                marginTop: 20,
                borderColor: "black",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  fontSize: 14,
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "RobotoBoldItalic",
                }}
                placeholder="e.g. Morning Exercise Plan"
                ref={(input) => {
                  this.planStrategyInputRef = input;
                }}
                value={this.state.planStrategyName}
                onChangeText={(text) => {
                  this.setState({ planStrategyName: text });
                }}
              />
            </View>
            {/* Confirm btns */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                width: 205,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                  height: 30,
                  width: 100,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "black",
                  marginRight: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                onPress={async () => this.onBackBtnPressed()}
              >
                <View
                  style={{
                    margin: 0,
                    width: 25,
                    position: "absolute",
                    left: 1,
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Ionicons
                      name="chevron-back-circle-sharp"
                      size={25}
                      color={"white"}
                    />
                  </View>
                </View>
                <View
                  style={{
                    margin: 0,
                    width: 73,
                    position: "absolute",
                    right: 1,
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        width: "100%",
                        textAlign: "center",
                        fontFamily: "RobotoBoldItalic",
                        color: "white",
                      }}
                    >
                      Back
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                  height: 30,
                  width: 100,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "black",
                  marginRight: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                // OnConfirm
                onPress={() => this.onConfirmBtnPressed()}
              >
                <View
                  style={{
                    margin: 0,
                    width: 73,
                    position: "absolute",
                    left: 1,
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        width: "100%",
                        textAlign: "center",
                        fontFamily: "RobotoBoldItalic",
                        color: "white",
                      }}
                    >
                      Confirm
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    margin: 0,
                    width: 25,
                    position: "absolute",
                    right: 1,
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    <Ionicons
                      name="ios-checkmark-circle"
                      size={25}
                      color={"white"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: "60%", display: this.state.confirmTxtDisplay }}>
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 14,
                marginTop: "5%",

                textAlign: "center",
              }}
            >
              Click the{" "}
              <Text style={{ fontFamily: "RobotoBoldItalic" }}>Start</Text>{" "}
              below to start your first week of tracking
            </Text>
          </View>
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
              borderRadius: 20,
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
          <View
            style={{
              height: 470,
              width: "100%",
              display: this.state.thirdSlidePanelPageUpdatedDisplay,
            }}
          >
            {thirdSlidePanelPageUpdated}
          </View>

          {/* Swipable Body Content */}
          <View
            style={{
              height: 470,
              width: "100%",
              display: this.state.swipeAblePanelDisplay,
            }}
          >
            <Onboarding
              // bottomBarHighlight={false}
              // ref={this.mainContentSwiperRef}
              containerStyles={{ justifyContent: "flex-start" }}
              ref={this.panelSwiperRef}
              imageContainerStyles={{ height: 550 }}
              bottomBarHeight={30}
              showSkip={false}
              showNext={true}
              bottomBarColor="white"
              showDone={false}
              pageIndexCallback={(index) => {
                this.setState({ mainContentSwiperDisplay: "flex" });
                this.setState({ conformationPageDisplay: "none" });
                this.mainContentSwiperRef.current.goToPage(index, true);

                // this._panel.show();
                this.setState({ displayCalView: "flex" });
                this.setState({ displayTitle: "flex" });
                if (index === 1) {
                  this.setState({ panelHeight: 500 });
                  this.setState({
                    title: "Strategies",
                  });
                } else if (index === 0) {
                  this.setState({ panelHeight: 250 });
                  this.setState({
                    title: "Tracking",
                  });
                  this._panel.hide();
                }
              }}
              pages={[
                {
                  title: "",
                  subtitle: "",
                  backgroundColor: "white",
                  image: thirdSlidePanelPageUpdated,
                },
                {
                  title: "",
                  subtitle: "",
                  backgroundColor: "white",
                  image: secondSlidePanelPageUpdated,
                },
              ]}
            />
          </View>
          {/* {firstSlidePanelPage} */}
          {/* {secondSlidePanelPage} */}
          {/* {thirdSlidePanelPage} */}
        </View>
      </SlidingUpPanel>
    );
    let reportScreen_ONE = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          Did you complete this activity as planned?
        </Text>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "black",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 30,
          }}
        ></View>
        <SwitchSelector
          options={REPORTSCREEN_ONE}
          buttonColor="black"
          borderColor="black"
          style={{ borderWidth: 2, borderRadius: 40, padding: 1 }}
          textStyle={{ fontSize: 10 }}
          selectedTextStyle={{ fontSize: 10 }}
          borderWidth={0}
          initial={parseInt(this.state.reportPageONEvalue) - 1}
          onPress={async (value) =>
            await this.setState({ reportPageONEvalue: value })
          }
        />
      </View>
    );
    let reportScreen_TWO = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          How satisfied are you with this activity?
        </Text>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "black",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 30,
          }}
        ></View>
        <SwitchSelector
          options={REPORTSCREEN_TWO}
          buttonColor="black"
          borderColor="black"
          style={{ borderWidth: 2, borderRadius: 40, padding: 1 }}
          textStyle={{ fontSize: 10 }}
          selectedTextStyle={{ fontSize: 10 }}
          borderWidth={0}
          initial={parseInt(this.state.satisfactionScore) - 1}
          onPress={(value) => {
            this.setState({ satisfactionScore: value });
          }}
        />
      </View>
    );
    let reportScreen_THREE = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          Tell us the reason why you didn’t complete this activity as planned
        </Text>
        <View
          style={[
            {
              width: "100%",
              height: 5,
              backgroundColor: "black",
              borderRadius: 10,
              marginTop: 10,
              marginBottom: 30,
            },
          ]}
        ></View>
        <View
          style={[
            generalStyles.shadowStyle,
            {
              backgroundColor: "white",
              height: "15%",
              borderRadius: 20,
              borderWidth: 0,
              borderColor: "black",
              marginRight: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            },
          ]}
        >
          <TextInput
            style={{
              fontSize: 16,
              marginLeft: 15,
              marginRight: 5,
              // backgroundColor: "red",
              width: "100%",
              height: "100%",
              // textAlign: "center",
              // fontFamily: "RobotoBoldItalic",
            }}
            placeholder="e.g., Time conflicts"
            value={this.state.reportScreen_THREETxt}
            onChangeText={(text) => {
              this.setState({ reportScreen_THREETxt: text });
            }}
          ></TextInput>
        </View>
      </View>
    );
    let reportScreen_FOUR = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          Did you complete this activity as planned?
        </Text>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "black",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 30,
          }}
        ></View>
        <SwitchSelector
          options={REPORTSCREEN_FOUR}
          buttonColor="black"
          borderColor="black"
          style={{ borderWidth: 2, borderRadius: 40, padding: 1 }}
          textStyle={{ fontSize: 10 }}
          selectedTextStyle={{ fontSize: 10 }}
          borderWidth={0}
          initial={0}
          onPress={async (value) =>
            this.setState({ reportPage_FOUR_value: value })
          }
        />
      </View>
    );
    let reportScreen_FIVE = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          Tell us the time that you did this activity:
        </Text>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "black",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 30,
          }}
        ></View>
        {/* First Row of Activity Selection */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "5%",
            paddingVertical: "2%",
            height: 90,
            width: "100%",
            borderColor: "#DADADA",
            borderWidth: 2,
            borderRadius: 20,
            marginTop: "2%",
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
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 12 }}>
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
                optionContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: "white",
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 15,
                }}
                selectStyle={{ borderWidth: 0 }}
                selectTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                initValueTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                backdropPressToClose={true}
                overlayStyle={{
                  flex: 1,
                  padding: "5%",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  borderRadius: 20,
                }}
                optionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldBlack",
                }}
                sectionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldItalic",
                }}
                cancelStyle={{
                  backgroundColor: "black",
                  borderRadius: 15,
                }}
                cancelTextStyle={{ fontWeight: "bold", color: "white" }}
                data={this.state.activityData}
                initValue={this.onReportActivity.title}
                onChange={async (item) => {
                  this.setState({ isActivityTypeSelected: true });
                  this.setState({ selectedActivity: item.label });
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
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 12 }}>
              Self-Defined Activity
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
                ref={(input) => {
                  this.textInput = input;
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
                  onPress={this.addNewActivityBtnPressed}
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
        {/* Time Picker */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingHorizontal: "5%",

            height: 80,
            width: "100%",
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
              paddingVertical: "4%",
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
                value={this.state.startTime}
                mode="spinner"
                minuteInterval={10}
                is24Hour={true}
                display="default"
                onChange={async (e, date) => this.pickStartTime(date)}
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
              paddingVertical: "4%",
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
                value={this.state.endTime}
                mode="spinner"
                minuteInterval={10}
                is24Hour={true}
                display="default"
                onChange={async (e, date) => this.pickEndTime(date)}
                style={{
                  width: 90,
                  height: 40,
                  flex: 1,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
    let reportScreen_SIX = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          Tell us the different activity you did at this time:
        </Text>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "black",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 30,
          }}
        ></View>
        {/* First Row of Activity Selection */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "5%",
            paddingVertical: "2%",
            height: 90,
            width: "100%",
            borderColor: "#DADADA",
            borderWidth: 2,
            borderRadius: 20,
            marginTop: "2%",
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
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 12 }}>
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
                optionContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: "white",
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 15,
                }}
                selectStyle={{ borderWidth: 0 }}
                selectTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                initValueTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                backdropPressToClose={true}
                overlayStyle={{
                  flex: 1,
                  padding: "5%",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  borderRadius: 20,
                }}
                optionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldBlack",
                }}
                sectionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldItalic",
                }}
                cancelStyle={{
                  backgroundColor: "black",
                  borderRadius: 15,
                }}
                cancelTextStyle={{ fontWeight: "bold", color: "white" }}
                data={this.state.activityData}
                initValue={"Select Here"}
                onChange={async (item) => {
                  this.setState({ isActivityTypeSelected: true });
                  this.setState({ selectedActivity: item.label });
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
            <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 12 }}>
              Self-Defined Activity
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
                ref={(input) => {
                  this.textInput = input;
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
                  onPress={this.addNewActivityBtnPressed}
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
      </View>
    );
    let reportScreen_SEVEN = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 20 }}
      >
        <FlashMessage position="bottom" />
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          Did you perform any other physical activities today?{" "}
        </Text>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "black",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 30,
          }}
        ></View>
        <SwitchSelector
          options={REPORTSCREEN_SEVEN}
          buttonColor="black"
          borderColor="black"
          style={{ borderWidth: 2, borderRadius: 40, padding: 1 }}
          textStyle={{ fontSize: 10 }}
          selectedTextStyle={{ fontSize: 10 }}
          borderWidth={0}
          initial={0}
          onPress={async (value) =>
            this.setState({ reportPage_SEVEN_value: value })
          }
        />
      </View>
    );
    let reportScreen_EIGHT = (
      <View
        style={{ height: "100%", width: "100%", padding: 15, marginTop: 5 }}
      >
        <Text style={{ fontFamily: "RobotoBoldBold", fontSize: 16 }}>
          Tell us what are other activities you did?{" "}
        </Text>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "black",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        ></View>
        <Text
          style={{
            fontFamily: "RobotoBoldItalic",
            fontSize: 16,
            marginBottom: 5,
          }}
        >
          Unplanned Activities
        </Text>
        {/* Activity List */}
        <View
          style={[
            generalStyles.shadowStyle,
            { width: "100%", height: 150, paddingHorizontal: 0 },
          ]}
        >
          <FlatList
            data={this.state.selfReportedActivityList}
            renderItem={({ item }) => {
              if (!item.isDeleted) {
                let timing =
                  moment(item.start).format("ddd").toUpperCase() +
                  " " +
                  item.start.slice(11, 16) +
                  " - " +
                  item.end.slice(11, 16) +
                  " | " +
                  item.duration +
                  " MIN";

                return (
                  <View
                    style={[
                      {
                        width: "100%",
                        height: 39,
                        borderRadius: 20,
                        borderColor: "#F0F0F0",
                        borderWidth: 1,
                        paddingHorizontal: 0,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 5,
                      },
                    ]}
                  >
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        fontFamily: "RobotoBoldBold",
                        fontSize: 14,
                        paddingLeft: 8,
                        width: 100,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 14 }}>
                      {timing}
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 14 }}>
                      {/* {item.duration} */}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.deleteActivity_reportScreen(item)}
                    >
                      <Ionicons
                        name="md-close-circle"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                );
              }
              // console.log("items in plansBuddle", item);
            }}
          />
        </View>
        {/* First Row of Activity Selection */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "5%",
            paddingVertical: "2%",
            height: 90,
            width: "100%",
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
                optionContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: "white",
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 15,
                }}
                selectStyle={{ borderWidth: 0 }}
                selectTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                initValueTextStyle={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 12,
                }}
                backdropPressToClose={true}
                overlayStyle={{
                  flex: 1,
                  padding: "5%",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  borderRadius: 20,
                }}
                optionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldBlack",
                }}
                sectionTextStyle={{
                  fontWeight: "bold",
                  fontFamily: "RobotoBoldItalic",
                }}
                cancelStyle={{
                  backgroundColor: "black",
                  borderRadius: 15,
                }}
                cancelTextStyle={{ fontWeight: "bold", color: "white" }}
                data={this.state.activityData}
                initValue={"Select Here"}
                onChange={async (item) => {
                  this.setState({ isActivityTypeSelected: true });
                  this.setState({ selectedActivity: item.label });
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
              Self-Defined
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
                ref={(input) => {
                  this.textInput = input;
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
                  onPress={this.addNewActivityBtnPressed}
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
        {/* Second Row of Date & Time Selection */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingHorizontal: "5%",

            height: 90,
            width: "100%",
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
              borderColor: "#F0F0F0",
              backgroundColor: "#DADADA",
              paddingVertical: "4%",
              borderBottomLeftRadius: 15,
              borderTopLeftRadius: 15,
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
                backgroundColor: "#DADADA",
                borderRadius: 5,
              }}
            >
              <DateTimePicker
                value={this.state.dateTimePickerDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={async (e, date) => {
                  this.pickTheDate(date);
                  this.setState({ dateTimePickerDate: date });
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
              paddingVertical: "4%",
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
                value={this.state.startTime}
                mode="spinner"
                minuteInterval={10}
                is24Hour={true}
                display="default"
                onChange={async (e, date) => this.pickStartTime(date)}
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
              paddingVertical: "4%",
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
                value={this.state.endTime}
                mode="spinner"
                minuteInterval={10}
                is24Hour={true}
                display="default"
                onChange={async (e, date) => this.pickEndTime(date)}
                style={{
                  width: 90,
                  height: 40,
                  flex: 1,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => this.onPlanBtnPressed_reportScreen()}
          >
            <AddActivityBtn height={32} width={202} marginTop={"5%"} />
          </TouchableOpacity>
        </View>
      </View>
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
        <FlashMessage position="bottom" />

        {/* Guide Btn */}
        <View
          style={{
            position: "absolute",
            left: 0,
            top: "5%",
            height: 28,
            width: 79,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D9D9D9",
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBoldItalic",
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Guide
          </Text>
        </View>
        {/* Popover Tips */}
        <View
          style={{
            position: "absolute",
            right: 15,
            top: "5%",
            height: 20,
            width: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Popover
            popoverStyle={{ borderRadius: 20 }}
            from={
              <TouchableOpacity style={{ marginLeft: "5%" }}>
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
        {/* Title */}
        <View
          style={{
            height: 28,
            width: "50%",
            marginTop: "10%",
            alignItems: "center",
            justifyContent: "center",
            display: this.state.displayTitle,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontFamily: "RobotoBoldItalic", fontSize: 24 }}>
            {this.state.title}
          </Text>
        </View>
        {/* {Report Popup} */}
        <KeyboardAvoidingView>
          <RNModal
            animationType="slide"
            // propagateSwipe={true}
            visible={this.state.isReportModalVis}
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "75%",
            }}
            presentationStyle="overFullScreen"
            transparent={true}
            // hasBackdrop={true}
            // backdropOpacity={0}
            // onBackdropPress={() => this.setState({ isReportModalVis: false })}
            // onSwipeComplete={() => this.setState({ isReportModalVis: false })}
            // swipeDirection="down"
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  generalStyles.shadowStyle,
                  {
                    width: "90%",
                    height: this.state.reportModalHeight,
                    borderRadius: 20,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    width: "95%",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "RobotoBoldItalic",
                      fontSize: 20,
                      marginLeft: 10,
                    }}
                  >
                    Daily Report
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.onDailyReportClose();

                      // this.reportModalSwiperRef.current.scrollBy(2, true);
                    }}
                  >
                    <AntDesign name="closecircle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    generalStyles.shadowStyle,
                    {
                      width: "90%",
                      height: 60,
                      borderRadius: 20,
                      borderColor: "black",
                      borderWidth: 1,
                      paddingHorizontal: 6,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 15,
                      backgroundColor: "white",
                      flexDirection: "column",
                      paddingVertical: 6,
                      display: this.state.reportDetailInfoVis,
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "RobotoBoldBold",
                        fontSize: 18,
                        paddingLeft: 8,
                        color: "black",
                      }}
                    >
                      {this.onReportActivity.title}
                      {" | "}
                      <Text
                        style={{
                          fontFamily: "RobotoRegular",
                          fontSize: 16,
                        }}
                      >
                        {moment(this.onReportActivity.start)
                          .format()
                          .slice(5, 10)}
                      </Text>
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "RobotoRegular",
                      fontSize: 14,
                      width: "100%",
                      paddingLeft: 8,
                    }}
                  >
                    {moment(this.onReportActivity.start)
                      .format("ddd")
                      .toUpperCase() +
                      " " +
                      this.onReportActivity.start.slice(11, 16) +
                      " - " +
                      this.onReportActivity.end.slice(11, 16) +
                      " | " +
                      this.onReportActivity.duration +
                      " MIN"}
                  </Text>
                </View>
                <Swiper
                  activeDotColor="black"
                  index={this.state.currentSwipeIndex}
                  showsButtons={false}
                  autoplay={false}
                  loop={false}
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled={false}
                  ref={this.reportModalSwiperRef}
                  nextButton={<Text style={{ fontWeight: "bold" }}>NEXT</Text>}
                  prevButton={<Text style={{ fontWeight: "bold" }}>PREV</Text>}
                  showsPagination={false}
                  buttonWrapperStyle={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    position: "absolute",
                    // height:20,
                    // bottom: 30,
                    // left: 0,
                    flex: 1,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                    // paddingVertical: 10,
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  {reportScreen_ONE}
                  {reportScreen_TWO}
                  {reportScreen_THREE}
                  {reportScreen_FOUR}
                  {reportScreen_FIVE}
                  {reportScreen_SIX}
                  {reportScreen_SEVEN}
                  {reportScreen_EIGHT}
                </Swiper>
                {/* <View style={{width:"90%", height:"50%"}}> */}
                <View
                  style={{
                    width: "80%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    position: "absolute",
                    bottom: 20,
                    borderTopWidth: 2,
                  }}
                >
                  <TouchableOpacity
                    disabled={this.state.isReportSwipePERVdisabled}
                    style={{ display: this.state.isReportSwipePERVvis }}
                    onPress={() => {
                      this.onReportPrevBtnPressed();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>PREV</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.onReportNextBtnPressed();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {this.state.reportNEXTbtn}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </RNModal>
        </KeyboardAvoidingView>
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
              {this.state.planStrategyName}
            </Text>
            <View style={{ backgroundColor: "white", borderRadius: 20 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "RobotoBoldBold",
                  marginTop: 0,
                  marginLeft: "10%",
                }}
              >
                {this.state.strategyDuration}
              </Text>
            </View>
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
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginTop: "5%",
                }}
              >
                {this.state.keywordsBuddle.map((item) => {
                  return (
                    <View
                      style={{
                        height: 25,
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
                          fontFamily: "RobotoBoldBlack",
                          color: "white",
                          paddingHorizontal: 20,
                          fontSize: 12,
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </Modal>
        {/* Plan Detail View */}
        <RNModal
          animationType="slide"
          visible={this.state.isPlanDetailModalVis}
          // propagateSwipe={true}
          // isVisible={this.state.isPlanDetailModalVis}
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            // marginBottom: 130,
          }}
          presentationStyle="overFullScreen"
          transparent={true}
          // hasBackdrop={true}
          // backdropOpacity={0}
          // onBackdropPress={() => this.setState({ isPlanDetailModalVis: false })}
          // onSwipeComplete={() => this.setState({ isPlanDetailModalVis: false })}
          // swipeDirection="down"
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={[
                generalStyles.shadowStyle,
                {
                  height: "70%",
                  width: "95%",
                  backgroundColor: "white",
                  // borderWidth: 2,
                  borderColor: "black",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderRadius: 15,
                },
              ]}
            >
              {/* <View
                style={{
                  flex: 0.06,
                  width: "100%",
                  flexDirection: "row",
                  // backgroundColor:RED,

                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ isPlanDetailModalVis: false })
                    }
                  >
                    <AntDesign name="closecircle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View> */}
              <View style={{ height: "85%", width: "100%" }}>
                <TouchableOpacity
                  style={{ position: "absolute", top: 3, right: 3, zIndex: 1 }}
                  onPress={() => {
                    this.setState({ isPlanDetailModalVis: false });

                    // this.reportModalSwiperRef.current.scrollBy(2, true);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color="black" />
                </TouchableOpacity>

                <View
                  style={[
                    generalStyles.shadowStyle,
                    {
                      height: 180,
                      width: "100%",
                      backgroundColor: "white",
                      // borderWidth: 2,
                      borderColor: "black",
                      borderRadius: 15,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  {/* <View
                    style={{
                      flex: 0.4,
                      width: "90%",
                      marginTop: 10,
                      marginLeft: 10,
                      marginBottom: 0,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Records on {this.eventToday.title},{" "}
                      {this.state.detailViewTop}
                    </Text>
                  </View> */}
                  <View
                    style={[
                      generalStyles.shadowStyle,
                      {
                        flex: 1,
                        width: "100%",
                        marginTop: 0,
                        marginLeft: 0,
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        borderColor: "grey",
                        backgroundColor: "white",
                        borderRadius: 15,
                      },
                    ]}
                  >
                    <View
                      style={{
                        borderRightWidth: 2,
                        width: 100,
                        borderColor: "grey",
                        height: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "RobotoBoldBlack",
                          textAlignVertical: "center",
                        }}
                      >
                        {WEEKDAY[new Date(this.selectedEventDate).getDay()]}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        // backgroundColor: "red",
                      }}
                    >
                      {/* <Image
                        source={{
                          uri:
                            "http://openweathermap.org/img/wn/" +
                            this.selectedWeatherIcon +
                            ".png",
                        }}
                        style={{ width: 60, height: 60 }}
                      ></Image> */}
                      <Text
                        style={{ fontSize: 32, textAlignVertical: "center" }}
                      >
                        {ICONS[this.selectedWeatherIcon]}{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "RobotoBoldBlack",
                          textAlignVertical: "center",
                        }}
                      >
                        {this.selectedWeatherTxt}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderLeftWidth: 2,
                        width: 100,
                        height: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        borderColor: "grey",
                      }}
                    >
                      <Text
                        style={{ fontSize: 18, fontFamily: "RobotoBoldBlack" }}
                      >
                        {this.selectedTemp}°F
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: "50%",
                      paddingHorizontal: 15,
                      marginBottom: 10,
                      display:this.state.isNoActivitySignVis,
                      justifyContent:"center",
                      alignItems:"center"
                    }}
                  ><Text style={{fontFamily:"RobotoBoldBlack", fontSize:22, color:"grey", textAlign:"center"}}>No Activity Planned for This Day</Text></View>
                  <View
                    style={{
                      height: "55%",
                      paddingHorizontal: 5,
                      paddingBottom:5,
                      marginBottom:5,
                      display:this.state.isDetailViewActivityInfoListVis
                    }}
                  >
                    <FlatList
                      data={this.detailViewCalendar}
                      contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingHorizontal: 5,
                      }}
                      renderItem={({ item }) => {
                        if (item.title) {
                          if (!item.isDeleted) {
                            let newTiming = "";
                            let timing =
                              moment(item.start).format("ddd").toUpperCase() +
                              " " +
                              item.start.slice(11, 16) +
                              " - " +
                              item.end.slice(11, 16) +
                              " | " +
                              item.duration +
                              " MIN";
                            let itemBlockStyle;
                            if (item.newStart) {
                              newTiming =
                                item.newStart.slice(11, 16) +
                                " - " +
                                item.newEnd.slice(11, 16) +
                                " | " +
                                item.newDuration +
                                " MIN";
                            }

                            if (!item.isReported) {
                              itemBlockStyle = this.itemUnreportedBlockStyle(
                                item,
                                timing
                              );
                            } else {
                              if (item.isActivityCompleted) {
                                itemBlockStyle = this.itemCompletedBlockStyle(
                                  item,
                                  timing
                                );
                              } else {
                                if (item.partialStatus) {
                                  if (item.partialStatus === "TIME") {
                                    itemBlockStyle =
                                      this.itemPartialCompleteStyle_TIME(
                                        item,
                                        timing,
                                        newTiming
                                      );
                                  } else if (
                                    item.partialStatus === "ACTIVITY"
                                  ) {
                                    itemBlockStyle =
                                      this.itemPartialCompleteStyle_ACTIVITY(
                                        item,
                                        timing
                                      );
                                  } else {
                                    itemBlockStyle =
                                      this.itemPartialCompleteStyle_TIME_ACTIVITY(
                                        item,
                                        timing,
                                        newTiming
                                      );
                                  }
                                } else {
                                  itemBlockStyle =
                                    this.itemUnCompletedBlockStyle(
                                      item,
                                      timing
                                    );
                                }
                              }
                            }

                            return itemBlockStyle;
                          }
                        }

                        // console.log("items in plansBuddle", item);
                      }}
                    />
                  </View>
                </View>
                {/* Calendar View */}
                <View
                  style={[
                    generalStyles.shadowStyle,
                    {
                      height: "100%",
                      backgroundColor: "white",
                      borderRadius: 20,
                      marginTop: 15,
                      marginBottom: 15,
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <Calendar
                    events={this.detailViewCalendar}
                    date={new Date(this.selectedEventDate)}
                    dayHeaderStyle={{ display: "none" }}
                    headerContentStyle={{ display: "none" }}
                    scrollOffsetMinutes={
                      this.detailViewCalendar[0]
                        ? (parseInt(
                            this.detailViewCalendar[0].start.slice(11, 13)
                          ) -
                            5) *
                          60
                        : 0
                    }
                    swipeEnabled={false}
                    height={90}
                    mode="day"
                  />
                </View>
              </View>
            </View>
          </View>
        </RNModal>
        {/* Calendar View & Buttons */}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            display: this.state.displayCalView,
            marginTop: 10,
            backgroundColor: "white",
            marginBottom: 0,
          }}
        >
          <CalendarHeader height={15} width={333} />
          <View
            style={{
              height: this.state.calendarViewHeight,
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
                thisMonthEvents={this.state.currentMonthEvents}
                monthCalCurrDate={this.state.currentMonthDate}
                weatherThisMonth={this.state.currentWeatherLists}
                onPress={(item, monthNum, month) =>
                  this.onPress(item, monthNum, month)
                }
              />
            </ScrollView>
            <View
              style={{
                position: "absolute",
                right: 5,
                bottom: "5%",
                height: 20,
                width: 20,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "black",
                width: 60,
                height: 20,
                borderRadius: 5,
                flexDirection: "row",
                opacity: 0.5,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "RobotoBoldBlack",
                  fontSize: 18,
                }}
              >
                {this.state.currentMonthName}
              </Text>
              <View
                style={{ width: 2, height: "100%", backgroundColor: "black" }}
              ></View>
            </View>
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
              disabled={this.state.pastMonthBtnDisabled}
              onPress={this.pastMonthBtnPressed}
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
                borderColor: "black",
                paddingHorizontal: 15,
                borderWidth: 2,
                borderRadius: 20,
                padding: 5,
              }}
              onPress={() => {
                this.scrollToThisWeek();
                this.resetCalendarToCurrentMonth();
              }}
            >
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 12 }}
              >
                Current Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              disabled={this.state.nextMonthBtnDisabled}
              onPress={this.nextMonthBtnPressed}
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
        </View>
        {/* Confirmation Page */}
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            display: this.state.conformationPageDisplay,
          }}
        >
          {finalConfirmationPage}
        </View>
        {/* Body info */}
        <View
          style={[
            generalStyles.shadowStyle,
            {
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              borderRadius: 20,
              paddingTop: 20,
              display: this.state.mainContentSwiperDisplay,
            },
          ]}
        >
          {/* <Swiper gesturesEnabled={() => false} ref={this.mainContentSwiperRef}>
            {planSetUpPage}
            {summaryPage}
            {finalConfirmationPage}
          </Swiper> */}
          <Onboarding
            bottomBarHighlight={false}
            ref={this.mainContentSwiperRef}
            showSkip={false}
            showNext={false}
            pageIndexCallback={(index) => {
              this.panelSwiperRef.current.goToPage(index, true);
            }}
            pages={[
              {
                title: "",
                subtitle: "",
                backgroundColor: "white",
                image: planSetUpPage,
              },
              {
                title: "",
                subtitle: "",
                backgroundColor: "white",
                image: summaryPage,
              },
            ]}
          />
        </View>
        {/* Slide Up Panel */}
        {slideUpPanel}
      </View>
    );
  }
}
AppRegistry.registerComponent("Planneregy", () => TrackingPage);
