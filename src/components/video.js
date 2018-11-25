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
import Orientation from "react-native-orientation-locker";

function secondsToTime(time) {
	return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + (time % 60);
}

class VideoPlayer extends Component {
	constructor(props){
		super(props);
		const {width, height} = Dimensions.get("window");
		this.state = {
			visibleSeeker: true,
			paused: false,
			progress: 0,
			duration: 0,
			fullScreen: false,
			portraitWidth: Math.min(width, height),
		};
		this.handleLoad = this.handleLoad.bind(this);
		this.handleProgress = this.handleProgress.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.handleMainButtonTouch = this.handleMainButtonTouch.bind(this);
		this.handleProgressPress = this.handleProgressPress.bind(this);
		this.fullScreenHandler = this.fullScreenHandler.bind(this);
		this.handleBackPress = this.handleBackPress.bind(this);
		this.handleVideoPress = this.handleVideoPress.bind(this);
		this.setScreenMode = this.setScreenMode.bind(this);
		this.orientationDidChange = this.orientationDidChange.bind(this);
	}


	componentWillMount() {
		Orientation.addOrientationListener(this.orientationDidChange);
	}

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	componentWillUnmount() {
		Orientation.unlockAllOrientations();
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
		Orientation.removeOrientationListener(this.orientationDidChange);
	}

	handleBackPress(){
		Orientation.lockToPortrait();
		this.setScreenMode("regular");
	}

	orientationDidChange(UIOrientation, deviceOrientation) {
		if(deviceOrientation.includes("LANDSCAPE") && UIOrientation.includes("LANDSCAPE")) {
			this.setScreenMode("full");
			Orientation.unlockAllOrientations();
		} else if (deviceOrientation.includes("LANDSCAPE") && UIOrientation.includes("PORTRAIT")) {
			Orientation.lockToLandscape();
			this.setScreenMode("full");
		} else if (deviceOrientation.includes("PORTRAIT") && UIOrientation.includes("PORTRAIT")) {
			this.setScreenMode("regular");
			Orientation.unlockAllOrientations();
		} else if (deviceOrientation.includes("PORTRAIT") && UIOrientation.includes("LANDSCAPE")) {
			this.setScreenMode("full");
		}
	}

	setScreenMode(mode){
		if (mode == "full") {
			this.setState({fullScreen: true});
			this.setState({visibleSeeker: false});
		} else {
			this.setState({fullScreen: false});
			this.setState({visibleSeeker: true});
		}
	}

	fullScreenHandler() {
		if (!this.state.fullScreen) {
			Orientation.lockToLandscape();
			this.setScreenMode("full");
		} else {
			Orientation.lockToPortrait();
			this.setScreenMode("regular");
		}
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
				<TouchableWithoutFeedback onPress={this.handleVideoPress}>
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
								<Slider
									style={{
										flex: 1
									}}
									minimumValue={0}
									maximumValue={this.state.duration}
									onSlidingComplete={this.handleProgressPress}
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
