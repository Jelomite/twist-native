import React, {Component} from "react";
import {
	View,
	Text,
	Slider,
	Dimensions,
	TouchableWithoutFeedback,
	TouchableOpacity,
	StatusBar,
	BackHandler
} from "react-native";
import Video from "react-native-video";
import Ionicons from "react-native-vector-icons/Ionicons";
import Orientation from "react-native-orientation";

function secondsToTime(time) {
	return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + (time % 60);
}

class VideoPlayer extends Component {
	constructor(props){
		super(props);
		this.state = {
			visibleSeeker: true,
			paused: false,
			progress: 0,
			duration: 0,
			fullScreen: false,
			portraitWidth: Dimensions.get("window").width,
		};
	}


	componentWillMount() {
		Orientation.lockToPortrait();
	}

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress.bind(this));
	}

	componentWillUnmount() {
		Orientation.unlockAllOrientations();
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}

	handleBackPress(){
		if (this.state.fullScreen) {
			this.setState({fullScreen: false}, () => {
				Orientation.lockToPortrait();
			});
			this.setState({visibleSeeker: true});
			return true;
		}
	}

	fullScreenHandler() {
		this.setState({visibleSeeker: !this.state.visibleSeeker});
		this.setState({fullScreen: !this.state.fullScreen}, () => {
			if (!this.state.fullScreen) {
				Orientation.lockToPortrait();
			} else {
				Orientation.lockToLandscape();
			}
		});
	}

	handleMainButtonTouch() {
		this.setState(state => {
			return {
				paused: !state.paused
			};
		});
	}

	handleProgressPress(val) {
		this.player.seek(val);
		this.setState({seeking: false});
	}

	handleProgress(progress) {
		if (!this.state.seeking) {
			this.setState({
				progress: progress.currentTime
			});
		}

	}

	handleEnd() {
		this.setState({paused: true});
	}

	handleLoad(meta) {
		this.setState({
			duration: meta.duration
		});
	}

	handleVideoPress() {
		this.setState({visibleSeeker: !this.state.visibleSeeker});
	}

	render() {
		return (
			<View
				style={{
					backgroundColor: "#000"
				}}
			>
				<StatusBar hidden={this.state.fullScreen} />
				<TouchableWithoutFeedback onPress={this.handleVideoPress.bind(this)}>
					<Video
						paused={this.state.paused}
						source={{
							uri: this.props.source
						}}
						style={
							!this.state.fullScreen
								? {
									width: this.state.portraitWidth,
									height: this.state.portraitWidth / (16 / 9)
								}
								: {
									height: this.state.portraitWidth
								}
						}
						resizeMode="contain"
						onLoad={this.handleLoad.bind(this)}
						onProgress={this.handleProgress.bind(this)}
						onEnd={this.handleEnd.bind(this)}
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
								<TouchableOpacity onPress={this.handleMainButtonTouch.bind(this)}>
									<Ionicons
										name={!this.state.paused ? "ios-pause" : "ios-play"}
										size={30}
										color="#FFF"
									/>
								</TouchableOpacity>
								<Slider
									style={{
										flex: 1
									}}
									minimumValue={0}
									maximumValue={this.state.duration}
									onSlidingComplete={this.handleProgressPress.bind(this)}
									onValueChange={(val) => this.setState({progress: val, seeking: true})}
									value={this.state.progress}
								/>
								<Text
									style={{
										color: "#FFF",
										marginLeft: 15,
										marginRight: 15
									}}
								>
									{secondsToTime(
										Math.floor(this.state.progress)
									)}
								</Text>
								<TouchableOpacity onPress={this.fullScreenHandler.bind(this)}>
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
