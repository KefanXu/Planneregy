export const firebaseConfig = {
	apiKey: "AIzaSyCXhjKkbgnhkvagISsLjHB-vq7DQTj4oMQ",
	authDomain: "planneregy.firebaseapp.com",
	projectId: "planneregy",
	storageBucket: "planneregy.appspot.com",
	messagingSenderId: "695321657776",
	appId: "1:695321657776:web:db5fe3c111d5b24e4cd675",
	measurementId: "G-3RE09ELK0N",
};

export const googleLoginConfig = {
	//   iosStandaloneAppClientId:
	//     "858218224278-0d4utg27sf6mkdm5ohe9un0kmn1jt2se.apps.googleusercontent.com",
	//   iosClientId:
	//     "695321657776-nqkqqcaib5rfa0peh2jdn60gopc8aon6.apps.googleusercontent.com",
	//   expoClientId:
	//     "734078016442-rs8o5titja31ne113sl1s8nhsftfi1f9.apps.googleusercontent.com",
	expoClientId:
		"695321657776-bqd25a8tin38pc7kso7qaagkpusbgna0.apps.googleusercontent.com",
	iosClientId:
		"695321657776-nqkqqcaib5rfa0peh2jdn60gopc8aon6.apps.googleusercontent.com",
	scopes: [
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/calendar.readonly",
	],
	prompt: "select_account",
};

export const WEATHER_API_KEY = "237c7b1a9185ae4d6dfcc6a43c47f74e";
