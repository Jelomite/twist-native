import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import Button from "../components/button";
import {SafeAreaView} from "react-navigation";
import Style, {bg} from "../style";
import {iOSUIKit} from "react-native-typography";
import SearchBar from "../components/searchbar";
import List from "../components/list";
import api from "../api";
import Modal from "react-native-modal";
import SettingsPage from "./settings";
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
		this.toggleModal = this.toggleModal.bind(this);
		this.store = this.props.screenProps;
	}

	async componentDidMount() {
		const shows = await api.request.anime.getAll();
		this.setState({animeList: shows});
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
		return this.props.navigation.navigate("Episode", {
			title: anime.title,
			id: anime.id,
			slug: anime.slug.slug
		});
	}

	toggleModal(modal) {
		if (modal == "settings") {
			this.setState({settingsModal: !this.state.settingsModal});
		} else if (modal == "chat") {
			this.setState({chatModal: !this.state.chatModal});
		}
	}

	render() {
		return (
			<SafeAreaView style={Style.safeAreaView}>
				<Modal
					visible={this.state.settingsModal}
					onBackButtonPress={() => this.setState({settingsModal: false})}
					style={{
						margin: 5
					}}>
					<View style={{
						backgroundColor: bg,
						width: "100%",
						height: "100%"
					}}>
						<View style={{
							alignItems: "flex-end",
							padding: 5
						}}>
							<Button
								textStyle={{
									fontSize: 30,
									marginHorizontal: 20
								}}
								title={"X"}
								onPress={() => this.setState({settingsModal: false})}
							/>
						</View>
						<SettingsPage />
					</View>
				</Modal>
				<View style={Style.viewAppleBar}>
					<View style={Style.viewAppleBarContent}>
						<SearchBar
							style={Style}
							handleSearch={this.search.bind(this)}
							handleSearchClear={this.clear.bind(this)}
							searchValue={this.state.search}
						/>
						<View style={Style.viewAppleBarRow}>
							<View>
								<View style={{opacity: 0.5}}>
									<Text style={iOSUIKit.footnoteEmphasizedWhite}>
										ANIME TWIST
									</Text>
								</View>
								<Text style={iOSUIKit.largeTitleEmphasizedWhite}>Home</Text>
							</View>
						</View>
					</View>
				</View>
				<ScrollView style={Style.scrollView}>

					<View style={Style.viewAnimeList}>
						<View style={{opacity: 0.5, paddingLeft: 16}}>
							<Text style={iOSUIKit.footnoteEmphasizedWhite}>
								{"ANIME LIST (" + this.state.filteredAnimeList.length + ")"}
							</Text>
						</View>
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
							<Button title={"Home"}/>
						</View>
						<View style={Style.rowDirection}>
							<Button title={"Chat"} onPress={() => this.toggleModal("chat")}/>
							<Button title={"Settings"} onPress={() => this.toggleModal("settings")}/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default Home;
