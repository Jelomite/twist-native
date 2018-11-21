import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import Button from "../components/button";
import {SafeAreaView} from "react-navigation";
import Style from "../style";
import {iOSUIKit} from "react-native-typography";
import SearchBar from "../components/searchbar";
import List from "../components/list";
import api from "../api";

class Home extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			search: "",
			animeList: [],
			filteredAnimeList: []
		};
	}

	async componentDidMount() {
		const shows = await api.request.anime.getAll();
		this.setState({animeList: shows});
		this.setState({filteredAnimeList: this.state.animeList});
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

	render() {
		return (
			<SafeAreaView style={Style.safeAreaView}>
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
							<Button title={"Chat"}/>
							<Button title={"Settings"}/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default Home;
