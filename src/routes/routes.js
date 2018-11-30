import Home from "../views/home";
import Settings from "../views/settings";
import {createStackNavigator} from "react-navigation";


const routes = createStackNavigator(
	{
		Home,
		Settings
	},
	{}
);

export default routes;
