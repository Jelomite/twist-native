import Home from "../views/home";
import Episode from '../viiews/episode'
import {createStackNavigator} from "react-navigation";


const routes = createStackNavigator(
  {
    Home,
    Episode
  },
  {}
);

export default routes;
