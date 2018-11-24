import React, {Component} from "react";
import {View} from "react-native";
import Route from "./routes/routes";
import LoginScreen from "./views/login";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			logged_in: false
		};
		this.updateState = (val, key) => {
			this.setState({[val]: key});
		};
		this.updateState = this.updateState.bind(this);
	}

	render(){
		return (
			<View style={{flex: 1}}>
				{this.state.logged_in ?
					<Route screenProps={{
						state: this.state,
						setState: this.updateState
					}}/> :
					<LoginScreen rootState={{
						state: this.state,
						setState: this.updateState
					}} />
				}
			</View>
		);
	}
}

export default App;
