import React, {Component} from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {elBg} from "../style";

class Btn extends Component {
	render() {
		return (
			<TouchableOpacity
				style={styles.buttonStyle}
				onPress={this.props.onPress}
			>
				<Text style={styles.textStyle}> {this.props.title} </Text>
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
		borderRadius: 5
	}
});

export default Btn;
