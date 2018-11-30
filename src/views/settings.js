import React, {Component} from "react";
import {View, Text} from "react-native";
import Button from "../components/button";


class SettingsPage extends Component {
	constructor(props){
		super(props);
		this.store = props.screenProps;
	}

	componentDidUpdate() {
		if (this.store.state != this.props.screenProps.state) {
			this.store.state = this.props.screenProps.rootState;
		}
	}

	logout(){
		this.store.setState("logged_in", false);
	}

	render(){
		return(
			<View style={{
				alignItems: "center"
			}}>
				<Text style={{
					color: "#ffffff",
					fontSize: 40,
				}}> Settings Page </Text>
				<Button
					buttonStyle={{
						width: "40%"
					}}
					title={"Log out"}
					onPress={this.logout.bind(this)} />
			</View>
		);
	}
}

export default SettingsPage;
