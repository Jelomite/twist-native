import React from "react";
import Svg, {Circle, Path} from "react-native-svg";

export default function() {
	return(
		<Svg height={25} width={25} scale={1.5}>
			<Circle
				cx="8"
				cy="7"
				r="7"
				fill="white"
			/>
			<Path
				d={"M 8,14 L 8,16 C 12,16 15,11 15,7 Z"}
				fill="white"
			/>
		</Svg>
	);
}
