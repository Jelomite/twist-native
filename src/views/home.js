import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import Button from "../components/button";
import {SafeAreaView} from "react-navigation";
import Style from "../style";
import {iOSUIKit} from "react-native-typography";
import SearchBar from "../components/searchbar";
import List from "../components/list";
import ChatIcon from "../svg/chat";
import SettingsIcon from "../svg/settings";


class Home extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			search: "",
			animeList: [],
			filteredAnimeList: [],
			settingsModal: false,
			chatModal: false
		};

		this.search = this.search.bind(this);
		this.press = this.press.bind(this);
		this.clear = this.clear.bind(this);
		this.store = this.props.screenProps;
	}

	async componentDidMount() {
		this.setState({filteredAnimeList: this.state.animeList});
	}

	componentDidUpdate(){
		if (this.store.state != this.props.screenProps.state){
			this.store.state = this.props.screenProps.state;
		}
	}

	search(term) {
		this.setState({search: term});
		let list = this.state.animeList;
		let result = list.filter(anime =>
			anime.title.toLowerCase().includes(term.toLowerCase())
		);
		this.setState({filteredAnimeList: result});
	}
	clear() {
		this.setState({search: ""});
		this.setState({filteredList: this.state.animeList});
	}

	press(anime) {
		//TODO
	}

	render() {
		return (
			<SafeAreaView style={Style.safeAreaView}>
				<SearchBar
					style={Style}
					handleSearch={this.search.bind(this)}
					handleSearchClear={this.clear.bind(this)}
					searchValue={this.state.search}
				/>
				<ScrollView style={Style.scrollView}>
					<View style={Style.viewAppleBar}>
						<View>
							<View style={{opacity: 0.5}}>
								<Text style={iOSUIKit.footnoteEmphasizedWhite}>
										ANIME TWIST
								</Text>
							</View>
							<Text style={iOSUIKit.largeTitleEmphasizedWhite}>Home</Text>
						</View>
						<View style={{opacity: 0.5}}>
							<Text style={iOSUIKit.footnoteEmphasizedWhite}>
								{"ANIME LIST (" + this.state.filteredAnimeList.length + ")"}
							</Text>
						</View>
					</View>
					<View style={Style.viewAnimeList}>

						<List
							data={this.state.filteredAnimeList}
							style={Style}
							onPress={this.press.bind(this)}
						/>
					</View>
				</ScrollView>
				<View>
					<View	style={Style.buttonBottomBar}>
						<View	style={Style.rowDirection}>
						</View>
						<View style={Style.rowDirection}>
							<Button
								onPress={() => null}
								buttonStyle={{
									width: 65,
									alignItems: "center"
								}}
							>
								<ChatIcon />
							</Button>
							<Button
								onPress={() => {
									this.props.navigation.navigate("Settings", {});
								}}
								buttonStyle={{
									width: 65,
									alignItems: "center"
								}}
							>
								<SettingsIcon />
							</Button>
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default Home;
