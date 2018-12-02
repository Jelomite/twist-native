import React, {Component} from "react";
import {View, ScrollView, Text, BackHandler} from "react-native";
import Button from "../components/button";
import {SafeAreaView} from "react-navigation";
import Style, {bg} from "../style";
import {iOSUIKit} from "react-native-typography";
import SearchBar from "../components/searchbar";
import List from "../components/list";
import ChatIcon from "../svg/chat";
import SettingsIcon from "../svg/settings";
import Episodes from "./episode";
import SlidePanel from "rn-sliding-up-panel";

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
			episodesVisible: false,
		};

		this.search = this.search.bind(this);
		this.press = this.press.bind(this);
		this.clear = this.clear.bind(this);
		this.handleBackPress = this.handleBackPress.bind(this);
	}

	async componentDidMount() {
		this.setState({filteredAnimeList: this.state.animeList});
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
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
		//TODO: add api.
	}

	handleBackPress() {
		if (this.state.episodesVisible) {
			this.setState({episodesVisible: false});
			return true;
		}
		return false;
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
								onPress={() => this.setState({episodesVisible: true})}
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
				<SlidePanel
					visible={this.state.episodesVisible}
					allowDragging={false}
					onRequestClose={() => this.setState({episodesVisible: false})}
					style={{
						margin: 0
					}}
				>
					<View style={{
						backgroundColor: bg,
						width: "100%",
						height: "100%"
					}}>
						<Episodes />
					</View>

				</SlidePanel>
			</SafeAreaView>
		);
	}
}

export default Home;
