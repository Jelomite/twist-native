import React, {Component} from "react";
import {View} from "react-native";
import {SearchBar} from "react-native-elements";

class Bar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: props.style,
			handleSearch: props.handleSearch,
			handleSearchClear: props.handleSearchClear,
			searchValue: props.searchValue
		};
	}
	render() {
		return (
			<View>
				<SearchBar
					containerStyle={this.state.style.searchBarContainer}
					inputContainerStyle={this.state.style.searchBarInputContainer}
					inputStyle={this.state.style.searchBarInput}
					style={{
						color: "white"
					}}
					clearIcon={null}
					searchIcon={null}
					placeholderTextColor={"rgba(255,255,255,.5)"}
					onChangeText={this.state.handleSearch}
					onClear={this.state.handleSearchClear}
					placeholder="Search anime"
				/>
			</View>
		);
	}
}

export default Bar;
