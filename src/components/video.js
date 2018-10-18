import React, {Component} from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Video from "react-native-video";
import ProgressBar from "react-native-progress/Bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Orientation from "react-native-orientation";

function secondsToTime(time) {
  return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + (time % 60);
}

class VideoPlayer extends Component {
  state = {
    visibleSeeker: true,
    statusbarVisible: false,
    paused: false,
    progress: 0,
    duration: 0,
    fullScreen: false
  };

  componentWillMount() {
    Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  fullScreenHandler = () => {
    this.setState({visibleSeeker: !this.state.visibleSeeker});
    this.setState({fullScreen: !this.state.fullScreen});
    if (this.state.fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  handleMainButtonTouch = () => {
    if (this.state.progress >= 1) {
      this.player.seek(0);
    }

    this.setState(state => {
      return {
        paused: !state.paused
      };
    });
  };

  handleProgressPress = e => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * this.state.duration;
    const isPlaying = !this.state.paused;

    this.player.seek(progress);
  };

  handleProgress = progress => {
    this.setState({
      progress: progress.currentTime / this.state.duration
    });
  };

  handleEnd = () => {
    this.setState({paused: true});
  };

  handleLoad = meta => {
    this.setState({
      duration: meta.duration
    });
  };

  handleVideoPress = () => {
    this.setState({visibleSeeker: !this.state.visibleSeeker});
  };

  render() {
    const {height, width} = Dimensions.get("window");
    // const height = width / (16 / 9);
    return (
      <View
        style={{
          backgroundColor: "#000"
        }}
      >
        <StatusBar hidden={!this.state.statusbarVisible} />
        <TouchableWithoutFeedback onPress={this.handleVideoPress}>
          <Video
            paused={this.state.paused}
            source=this.props.video
            style={
              !this.state.fullScreen
                ? {
                    width: "100%",
                    height: width / (16 / 9)
                  }
                : {
                    height
                  }
            }
            resizeMode="contain"
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            ref={ref => (this.player = ref)}
          />
        </TouchableWithoutFeedback>
        <View>
          {this.state.visibleSeeker ? (
            <View>
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  height: 48,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  paddingHorizontal: 10
                }}
              >
                <TouchableOpacity onPress={this.handleMainButtonTouch}>
                  <Ionicons
                    name={!this.state.paused ? "ios-pause" : "ios-play"}
                    size={30}
                    color="#FFF"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleProgressPress}>
                  <View
                    style={{
                      marginLeft: 15
                    }}
                  >
                    <ProgressBar
                      progress={this.state.progress}
                      color="#FFF"
                      unfilledColor="rgba(255,255,255,.1)"
                      borderColor="rgba(0,0,0,0)"
                      width={250}
                      height={5}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "#FFF",
                    marginLeft: 15,
                    marginRight: 15
                  }}
                >
                  {secondsToTime(
                    Math.floor(this.state.progress * this.state.duration)
                  )}
                </Text>
                <TouchableOpacity onPress={this.fullScreenHandler}>
                  <Ionicons name="ios-qr-scanner" size={30} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

export default VideoPlayer;
