import * as React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Checkbox, Colors, Button } from "react-native-ui-lib";
import { getDataModel } from "./DataModel";
import { googleLoginConfig } from "./secret";
import { WEATHER_API_KEY } from "./secret";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import moment, { min } from "moment";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logo from "./assets/svg/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";

export function Login({ navigation }) {
	const [request, response, promptAsync] =
		Google.useAuthRequest(googleLoginConfig);
	const [clickCount, setClickCount] = React.useState(0);
	let auth;
	let dataModel = getDataModel();
	const [requestFrom, setRequestFrom] = React.useState("");

	React.useEffect(async () => {
		if (response?.type === "success") {
			const { authentication } = response;
			auth = authentication;

			let accessToken = auth.accessToken;
			//console.log("auth",auth);
			// console.log("dataModel.isLogin",dataModel.isLogin);
			let userInfoResponse = await fetch(
				"https://www.googleapis.com/userinfo/v2/me",
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);
			let userInfoResponseJSON = await userInfoResponse.json();
			console.log("userInfoResponseJSON", userInfoResponseJSON);

			let userEmailFetched = userInfoResponseJSON.email;
			// console.log("userEmailFetched",userEmailFetched);
			if (Platform.OS !== "web") {
				// Securely store the auth on your device
				// let emailAddress = await SecureStore.getItemAsync("USER_EMAIL");
				let [userEmail, key] = await dataModel.loadAllUserEmails(
					userEmailFetched
				);
				// console.log("userEmail from login",typeof(userEmail));
				if (typeof userEmail != "undefined") {
					SecureStore.setItemAsync("ACCESS_TOKEN", accessToken);
					// console.log("from login", userEmail, key, accessToken);
					navigation.navigate("BeforeLoginScreen", {
						userEmail: userEmail,
						key: key,
						accessToken: accessToken,
						isFromLogin: true,
					});
					SecureStore.setItemAsync("USER_EMAIL", userEmail);
					SecureStore.setItemAsync("ACCESS_TOKEN", accessToken);
					SecureStore.setItemAsync("USER_KEY", key);
				} else {
					// console.log("userEmail", userEmail);
					await dataModel.createNewUser(userEmailFetched);
					let [userEmail, key] = await dataModel.loadAllUserEmails(
						userEmailFetched
					);
					// console.log("userEmail,key", userEmail,key);
					SecureStore.setItemAsync("USER_EMAIL", userEmail);
					SecureStore.setItemAsync("ACCESS_TOKEN", accessToken);
					SecureStore.setItemAsync("USER_KEY", key);

					navigation.navigate("OnboardingScreen", {
						userEmail: userEmail,
						userKey: key,
					});
				}
			}
		}
	}, [response]);

	const reset = () => {
		console.log("Reset");
		SecureStore.deleteItemAsync("USER_EMAIL");
		SecureStore.deleteItemAsync("ACCESS_TOKEN");
		SecureStore.deleteItemAsync("USER_KEY");

		SecureStore.deleteItemAsync("START_DATE");
		SecureStore.deleteItemAsync("END_DATE");
		SecureStore.deleteItemAsync("TIME_STAMP");
	};

	return (
		<SafeAreaView style={{ height: "100%", width: "100%" }}>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Logo height={302} width={234} marginBottom={30} />
				<Button
					label={"Login with Google"}
					labelStyle={{ fontWeight: "bold", fontSize: 15 }}
					size={Button.sizes.medium}
					backgroundColor={Colors.black}
					enableShadow={true}
					onPress={async () => {
						await setRequestFrom((requestFrom) => (requestFrom = "1"));
						// console.log("requestFrom",requestFrom);
						await promptAsync();
					}}
				/>
				<View
					style={{
						position: "absolute",
						top: 0,
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Button
						label="Reset"
						backgroundColor={Colors.red30}
						labelStyle={{ fontWeight: "bold", fontSize: 15 }}
						size={Button.sizes.xSmall}
						onPress={() => {
							if (clickCount === 5) {
								Alert.alert(
									"Are you sure you want to reset the records",
									"Resetting records might affect your tracking data",
									[
										{
											text: "Cancel",
											onPress: () => console.log("Cancel Pressed"),
											style: "Cancel",
										},
										{
											text: "Reset",
											onPress: () => reset(),
											style: "destructive",
										},
									]
								);
							} else {
								setClickCount(clickCount + 1);
							}
							console.log("clickCount", clickCount);
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
