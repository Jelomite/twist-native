import React, {Component} from "react";
import {View} from "react-native";
import Button from "../components/button";

class LoginScreen extends Component {
	constructor(props){
		super(props);
		this.store = this.props.rootState;
	}

	componentDidUpdate(){
		if (this.store.state != this.props.rootState.state) {
			this.store.state = this.props.rootState.state;
		}
	}

	login(){
		this.store.setState("logged_in", true);
	}

	render(){
		return (
			<View>
				<Button
					buttonStyle={{
						backgroundColor: "#000000"
					}}
					title={"Log In"}
					onPress={() => this.login()} />
			</View>
		);
	}
}

export default LoginScreen;
