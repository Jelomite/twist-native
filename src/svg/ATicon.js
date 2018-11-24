import React from "react";
import Svg, {Polygon} from "react-native-svg";
import {accent} from "../style";

export default function() {
	return(
		<Svg height={220} width={230} scale={14}>
			<Polygon
				points={"0, 10 5,0 10,10 9,10 5,2 1,10"}
				fill="white"
			/>
			<Polygon
				points={"11,10 6,0 16,0 15.5,1 7.5,1 11.5,9"}
				fill={accent}
			/>
		</Svg>
	);
}
