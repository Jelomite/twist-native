import React, {Component} from "react";
import {
	View,
	Text,
	Slider,
	Dimensions,
	TouchableWithoutFeedback,
	TouchableOpacity,
	StatusBar,
	BackHandler,
	Animated
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
		this.setFullScreen = this.setFullScreen.bind(this);
	}


	componentWillMount() {
		Orientation.lockToPortrait();
	}

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
		Orientation.unlockAllOrientations();
		StatusBar.setHidden(false);
	}

	handleBackPress() {
		if (this.state.fullScreen == true){
			this.setFullScreen("regular");
			Orientation.lockToPortrait(); // for some reason this is necessary...
			return true;
		}
		return false;
	}

	fullScreenHandler() {
		if (this.state.fullScreen) {
			this.setFullScreen("regular");
		} else {
			this.setFullScreen("full");
		}
	}

	setFullScreen(mode) {
		if (mode == "full") {
			this.setState({fullScreen: true});
			this.setState({visibleSeeker: false});
			Orientation.lockToLandscape();
			StatusBar.setHidden(true);
			this.props.setAllowDragging(false);
		} else if (mode == "regular") {
			this.setState({fullScreen: false});
			this.setState({visibleSeeker: true});
			Orientation.lockToPortrait();
			StatusBar.setHidden(false);
			this.props.setAllowDragging(true);
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
		const {width, height} = Dimensions.get("window");
		const vidScale = this.props.transformVal.interpolate({
			inputRange: [0,  height - this.props.collapsedWidth * 2],
			outputRange: [1, 0.35],
			extrapolate: "clamp"
		});
		const vidTransX = this.props.transformVal.interpolate({
			inputRange: [1,  height - this.props.collapsedWidth * 2],
			outputRange: [0, -0.65 * width / 2],
			extrapolate: "clamp"
		});

		const vidTransY = this.props.transformVal.interpolate({
			inputRange: [1,  height - this.props.collapsedWidth * 2],
			outputRange: [0, - (0.65 * width / 2) * 0.5625],
			extrapolate: "clamp"
		});

		const contTransY = this.props.transformVal.interpolate({
			inputRange: [1,  height - this.props.collapsedWidth * 2],
			outputRange: [0, - (0.65 * width /2) * 0.5625],
			extrapolate: "clamp"
		});




		//when on top, transformVal = 0
		//when on bottom transformVal = height - this.props.collapsedWidth*2

		return (
			<Animated.View
				style={[
					!this.state.fullScreen
						? {
							width,
							height: width * 0.5625
						}
						: {
							height
						},
					{
						transform: [{translateX: vidTransX}],
					}
				]
				}
			>
				<TouchableWithoutFeedback onPress={this.handleVideoPress}>
					<Animated.View style={{
						transform: [{translateY: vidTransY}]
					}}>
						<Animated.View style={{
							alignItems: "flex-start",
							transform: [{scale: vidScale}],
							backgroundColor: "black",
						}}>
							<Video
								paused={this.state.paused}
								source={{
									uri: "https://us-at-01.cdn.bunny.sh//anime/jojoougonnokaze/[HorribleSubs]%20JoJo's%20Bizarre%20Adventure%20-%20Golden%20Wind%20-%2001%20[1080p].mp4"
								}}
								style={{
									width: "100%",
									height: "100%"
								}}
								resizeMode="contain"
								onLoad={this.handleLoad}
								onProgress={this.handleProgress}
								onEnd={this.handleEnd}
								ref={ref => (this.player = ref)}
							/>
						</Animated.View>
					</Animated.View>
				</TouchableWithoutFeedback>
				<View>
					{this.state.visibleSeeker && this.props.allowSeeker ? (
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
			</Animated.View>
		);
	}
}

export default VideoPlayer;
