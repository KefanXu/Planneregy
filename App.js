import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { OnboardingScreen } from "./OnBoardingScreen";
import { PlanOnCalendar } from "./PlanOnCalendar";
import { BeforeLoginScreen } from "./BeforeLoginScreen";
import * as Font from "expo-font";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

export default class App extends React.Component {

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

  headerTitle = (headerName) => {
    let headerStyle = {
      gestureEnabled: false,
      headerBackVisible:false,
      title: headerName,
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "none",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "black",
        fontFamily: "RobotoBoldItalic",
      }
    }
    return headerStyle;
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BeforeLoginScreen">
        <Stack.Screen
            options={{ headerShown: false }}
            name="BeforeLoginScreen"
            component={BeforeLoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={this.headerTitle("Welcome to Planneregy Study")}
            name="OnboardingScreen"
            component={OnboardingScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PlanOnCalendar"
            component={PlanOnCalendar}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
