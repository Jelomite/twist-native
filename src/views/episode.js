import React, {Component} from "react";
import {View, Text, Dimensions} from "react-native";
import {iOSUIKit} from "react-native-typography";
import VideoPlayer from "../components/video";
import List from "../components/eplist";
import api from "../api";
import Style from "../style";

class Episodes extends Component {
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
    const {navigation} = this.props;
    const slug = "toaru-majutsu-no-index"; //temporary, later change to navigation.getParam("id", 0)
    try {
      const episodeList = await api.request.anime.get(slug);
      const sortedList = episodeList.episodes.sort(
        (a, b) => a.number - b.number
      );
      this.setState({episodeList: sortedList});
      const firstID = this.state.episodeList[0].id;
      const uris = await api.request.anime.getSources(firstID);
      this.setState({episodeURIs: uris.map(ep => ep.source)});
    } catch (error) {
      if (__DEV__) {
        console.error(error);
      }
    }
  }

  async changeEpisode(e) {
    this.setState({currentEpisode: e.number});
  }

  render() {
    const {episodeURIs, currentEpisode} = this.state;
    return (
      <View style={Style.safeAreaView}>
        <VideoPlayer source={episodeURIs[currentEpisode]} />
        <View style={Style.viewAppleBarRow}>
          <Text style={iOSUIKit.largeTitleEmphasizedWhite}>
            {this.state.title + " ep. " + (currentEpisode + 1)}
          </Text>
        </View>
        <List
          data={this.state.episodeList}
          style={Style}
          onPress={this.changeEpisode.bind(this)}
        />
      </View>
    );
  }
}

export default Episodes;
