import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as SecureStore from "expo-secure-store";

import { firebaseConfig } from "./secret";

class DataModel {
  constructor() {
    app = firebase.initializeApp(firebaseConfig);
    console.log("create database");
    this.usersRef = firebase.firestore().collection("users");
    this.asyncInit();
    this.key = "";
    this.plans = [];
  }
  //init firebase
  asyncInit = async () => {
    this.usersRef = firebase.firestore().collection("users");

    this.users = [];
    this.plans = [];
    this.key = "";
    // await this.askPermission();
    // await this.loadUsers();
    //console.log("this.users", this.users);
  };

  //Create new user and create default activities
  createNewUser = async (username) => {
    let newUser = {
      email: username,
    };
    let newUsersDocRef = await this.usersRef.add(newUser);
    let key = newUsersDocRef.id;
    await this.usersRef.doc(key).update({ id: key });
    let testColl = {
      test: 1,
    };
    let newUserColl = await newUsersDocRef.collection("activity_plans");
    await newUserColl.add(testColl);

    let userActivityList = {
      activityList: [
        "Walking",
        "Jogging",
        "Gardening",
        "Biking",
        "Jumping Rope",
      ],
    };
    let activityList = await this.usersRef.doc(key).collection("my_activities");

    await activityList.add(userActivityList);

    this.key = key;
  };
  //Get user-defined activity types
  getUserActivities = async (key) => {
    console.log("getUserActivities");
    let activityQuerySnap = await this.usersRef
      .doc(key)
      .collection("my_activities")
      .get();
    let userActivityList = [];

    activityQuerySnap.forEach((qDocSnap) => {
      let data = qDocSnap.data();

      userActivityList.push(data);
    });
    return userActivityList;
  };
  //Load users' self-created plans
  loadUserPlans = async (key) => {
    let userPlanCollection = await this.usersRef
      .doc(key)
      .collection("activity_plans")
      .get();
    userPlanCollection.forEach(async (qDocSnap) => {
      let key = qDocSnap.id;
      let plan = qDocSnap.data();
      plan.key = key;
      this.plans.push(plan);
    });
  };
  //Update the weather list to Firebase
  updateWeatherInfo = async (key, fullWeatherList) => {
    let weatherList = await this.usersRef
      .doc(key)
      .collection("weather_records");
    for (let weather of fullWeatherList) {
      await weatherList.add(weather);
    }
  };
  //Check if the user defined activity list exist
  isUserDefineActivitiesExist = async (key) => {
    let userDefineActivities = await this.usersRef
      .doc(key)
      .collection("my_activities")
      .limit(1)
      .get();

    return userDefineActivities.empty;
  };
  //Create default activities
  createUserActivities = async (key) => {
    let userActivityList = {
      activityList: [
        "Walking",
        "Jogging",
        "Gardening",
        "Biking",
        "Jumping Rope",
      ],
    };
    let activityList = await this.usersRef.doc(key).collection("my_activities");
    // for (let activity of userActivityList) {
    //   await activityList.add(activity);
    // }
    await activityList.add(userActivityList);
  };
  //Update user-defined activity list with new activity
  updateUserActivities = async (key, activity) => {
    console.log("key", key);
    console.log("activity", activity);
    let activityQuerySnap = await this.usersRef
      .doc(key)
      .collection("my_activities")
      .get();
    let docKey;
    let userActivityList = [];
    activityQuerySnap.forEach((qDocSnap) => {
      docKey = qDocSnap.id;
      let data = qDocSnap.data();
      userActivityList.push(data);
    });
    userActivityList[0].activityList.push(activity);
    let updatedList = {
      activityList: userActivityList[0].activityList,
    };
    //console.log("updatedList", updatedList);
    //console.log("docKey", docKey);
    await this.usersRef
      .doc(key)
      .collection("my_activities")
      .doc(docKey)
      .update(updatedList);
  };

  getUserKey = () => {
    return this.key;
  };
  getUserPlans = () => {
    return this.plans;
  };
}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}
