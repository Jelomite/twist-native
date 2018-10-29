import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-navigation";
import {iOSUIKit} from "react-native-typography";
import VideoPlayer from "../components/video";
import List from "../components/eplist";
import api from "../api";
import Style from "../style";

class Episodes extends Component {
	static navigationOptions = {
		headerTitle: null,
		headerStyle: {
			borderBottomColor: "transparent"
		},
		headerLeft: () => null,
		headerTransparent: true
	};
	
	constructor(props) {
		super(props);
		this.state = {
			title: "toaru majutsu no index",
			episodeList: [],
			currentEpisode: 0,
			episodeURIs: []
		};
	}

	async componentDidMount() {
		const slug = "toaru-majutsu-no-index"; //temporary, later change to navigation.getParam("id", 0)
		const episodeList = await api.request.anime.get(slug);
		const sortedList = episodeList.episodes.sort(
			(a, b) => a.number - b.number
		);
		this.setState({episodeList: sortedList});
		const firstID = this.state.episodeList[0].id;
		const uris = await api.request.anime.getSources(firstID);
		this.setState({episodeURIs: uris.map(ep => ep.source)});

	}

	async changeEpisode(e) {
		this.setState({currentEpisode: e.number});
	}

	render() {
		const {episodeURIs, currentEpisode} = this.state;
		return (
			<SafeAreaView style={Style.safeAreaViewBlack}>
				<VideoPlayer source={episodeURIs[currentEpisode]} />
				<ScrollView style={Style.scrollViewNotBlack}>
					<View style={Style.viewAppleBar}>
						<View style={Style.viewAppleBarContent}>
							<View style={Style.viewAppleBarRow}>
								<View>
									<View style={{opacity: 0.5}}>
										<Text style={iOSUIKit.footnoteEmphasizedWhite}> ANIME </Text>
									</View>
									<Text style={iOSUIKit.largeTitleEmphasizedWhite}>
										{"Title Placeholder"}
									</Text>
									<Text style={iOSUIKit.footnoteEmphasizedWhite}>
										{"episode: " + (currentEpisode + 1)}
									</Text>
									<View style={{flex: 1}} />
								</View>
							</View>
						</View>
					</View>
					<View style={{opacity: 0.5, paddingLeft: 16, paddingBottom: 16}}>
						<Text style={iOSUIKit.footnoteEmphasizedWhite}>
							{"EPISODES (" + episodeURIs.length + ")"}
						</Text>
					</View>
					<View style={Style.viewEpisodeList}>
						<List
							data={this.state.episodeList}
							style={Style}
							onPress={this.changeEpisode.bind(this)}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
export default Episodes;
