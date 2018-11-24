import React, {Component} from "react";
import {TextInput, View} from "react-native";

class Input extends Component {
	constructor(props){
		super(props);
		this.state = {
			text: ""
		};
		this.updateText = this.updateText.bind(this);
	}

	updateText(text){
		this.setState({text});
	}

	render(){
		return(
			<View style={{
				borderRadius: 5,
				borderColor: "#ffffff20",
				borderWidth: 1,
				marginVertical: 10,
				marginHorizontal: 5
			}}>
				<TextInput
					style={{
						color: "#ffffff",
						fontSize: 20,
						marginHorizontal: 10
					}}
					placeholder={this.props.placeholder}
					placeholderTextColor={"#ffffffAA"}
					onChangeText={(text) => this.updateText(text)}
				/>
			</View>
		);
	}
}

export default Input;
