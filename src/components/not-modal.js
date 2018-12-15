import React, {Component} from "react";
import {Animated, PanResponder, Dimensions} from "react-native";

const HEIGHT = Dimensions.get("window").height;
const TOP_PORTION = 0.3;
const BOTTOM_PORTION = 0.2;
const MASS = 150;

class Modal extends Component {
	static defaultProps = {
		visible: false,
		height: HEIGHT,
		draggableRange: {top: HEIGHT, bottom: 160},
		onDrag: () => {},
		onDragStart: () => {},
		onDragEnd: () => {},
		onRequestClose: () => {},
		allowDragging: true,
		minimumDistanceThreshold: 0.1,

	}

	constructor(props) {
		super(props);
		this.state = {
			visible: props.visible
		};
		this.transformVal = new Animated.Value(0);

		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				return Math.abs(gestureState.dy) > this.props.minimumDistanceThreshold &&	this.props.allowDragging;
			},
			onPanResponderGrant: (evt, gestureState) => {
				this.transformVal.setOffset(this.transformVal._value);
				this.transformVal.setValue(0);
				this.props.onDragStart(evt, gestureState);
			},
			onPanResponderMove: (evt, gestureState) => {
				this.transformVal.setValue(gestureState.dy);
				this.props.onDrag(evt, gestureState);
			},
			onPanResponderRelease: (evt, gestureState) => {
				this.transformVal.flattenOffset();
				const {dy, vy, y0} = gestureState;
				const {top, bottom} = this.props.draggableRange;
				if (dy + MASS * vy > TOP_PORTION * HEIGHT) {
					this.transitionTo(bottom, vy);
				} else if (dy + MASS * vy < -BOTTOM_PORTION * HEIGHT) {
					this.transitionTo(top, vy);
				} else {
					this.transitionTo(y0 / HEIGHT < 0.5 ? top : bottom);
				}
				this.props.onDragEnd(evt, gestureState);
			}
		});
	}

	getBounds() {
		return this.props.draggableRange;
	}

	transitionTo(val, speed = 1.5) {
		Animated.timing(this.transformVal, {
			duration: Math.min(200, 300 / Math.abs(speed)),
			toValue: HEIGHT - val,
		}).start();
	}

	render() {
		const {top, bottom} = this.props.draggableRange;
		const translateY = this.transformVal.interpolate({
			inputRange: [0, bottom, top],
			outputRange: [0, bottom, top],
			extrapolate: "clamp"
		});

		const childHeight = this.transformVal.interpolate({
			inputRange: [0, top - bottom],
			outputRange: [top, bottom - 80],
			extrapolate: "clamp"
		});

		return (
			<Animated.View
				{...this._panResponder.panHandlers}
				style={{
					position: "absolute",
					top: 0,
					height: childHeight,
					transform: [{translateY}]
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}

export default Modal;
