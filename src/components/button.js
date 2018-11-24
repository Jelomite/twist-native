import React, {Component} from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {elBg} from "../style";

class Btn extends Component {
	render() {
		return (
			<TouchableOpacity
				style={[styles.buttonStyle, this.props.buttonStyle]}
				onPress={this.props.onPress}
			>
				{this.props.title && (
					<Text
						style={[styles.textStyle, this.props.textStyle]}>
						{this.props.title}
					</Text>
				)}
				{this.props.children}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 20,
		color: "#ffffff",
		textAlign: "center",
		margin: 5
	},

	buttonStyle: {
		marginVertical: 10,
		marginHorizontal: 5,
		backgroundColor: elBg,
		borderRadius: 5,
		justifyContent: "space-around"
	}
});

export default Btn;
