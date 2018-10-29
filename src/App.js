import React from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "react-navigation";
import Route from "./routes/routes";
import {bg, elBg} from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";


const App = createBottomTabNavigator(
	{
		Home: {
			screen: Route
		}
	},
	{
		navigationOptions: ({navigation}) => ({
			tabBarIcon: ({focused, tintColor}) => {
				const {routeName} = navigation.state;
				let iconName = "";
				switch (routeName) {
				case "Home":
					iconName = `ios-home${focused ? "" : "-outline"}`;
					break;

				case "Chat":
					iconName = `ios-chatbubbles${focused ? "" : "-outline"}`;
					break;

				case "Profile":
					iconName = `ios-person${focused ? "" : "-outline"}`;
					break;

				case "Settings":
					iconName = `ios-settings${focused ? "" : "-outline"}`;
					break;

				default:
					break;
				}
				return <Ionicons name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: "white",
			inactiveTintColor: "gray",
			activeBackgroundColor: elBg,
			tabStyle: {
				backgroundColor: bg,
				borderWidth: 0
			},
			style: {
				backgroundColor: bg
			}
		}
	}
);


export default () => (
	<View style={{flex: 1}}>
		<App />
	</View>
);
