import React, {Component} from "react";
import {View, Text} from "react-native";
import Button from "../components/button";
import {iOSUIKit} from "react-native-typography";
import Style, {accent} from "../style";
import Input from "../components/text-input";
import ATicon from "../svg/ATicon";

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
			<View style={[
				Style.safeAreaView,
				{
					justifyContent: "space-evenly",
					alignItems: "center"
				}
			]}>
				<View style={{
					alignItems: "center",
					width: "100%"
				}}>
					<ATicon />
					<View>
						<Text style={iOSUIKit.footnoteEmphasizedWhite}>
							{" Welcome to:"}
						</Text>
						<Text style={iOSUIKit.largeTitleEmphasizedWhite}>
					ANIME TWIST
						</Text>
					</View>
					<View style={{
						width: "70%"
					}}>
						<Input placeholder={"username"} />
						<Input placeholder={"password"} />
						<Button
							buttonStyle={{
								alignItems: "center",
								backgroundColor: accent,
								height: 50
							}}
							title={"Log In"}
							onPress={() => this.login()} />
					</View>

				</View>
			</View>
		);
	}
}

export default LoginScreen;
