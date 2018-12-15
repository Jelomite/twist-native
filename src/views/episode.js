import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-navigation";
import {iOSUIKit} from "react-native-typography";
import VideoPlayer from "../components/video";
import List from "../components/eplist";
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
			title: "",
			episodeList: [],
			currentEpisode: 1,
			episodeURIs: []
		};
		this.changeEpisode = this.changeEpisode.bind(this);
	}

	async changeEpisode(e) {
		this.setState({currentEpisode: e.number});
	}

	render() {
		const {episodeURIs, currentEpisode} = this.state;
		return (
			<SafeAreaView style={{
				flex: 1,
				backgroundColor: "rgba(255, 255, 255, 0.02)"
			}}>
				<VideoPlayer source={episodeURIs[currentEpisode]} {...this.props}/>
				<ScrollView style={Style.scrollViewNotBlack}>
					<View style={Style.viewAppleBar}>
						<View style={Style.viewAppleBarContent}>
							<View style={Style.viewAppleBarRow}>
								<View>
									<View style={{opacity: 0.5}}>
										<Text style={iOSUIKit.footnoteEmphasizedWhite}> ANIME </Text>
									</View>
									<Text style={iOSUIKit.largeTitleEmphasizedWhite}>
										{this.state.title}
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
							onPress={this.changeEpisode}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
export default Episodes;
