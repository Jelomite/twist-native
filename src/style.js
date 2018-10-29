import {StyleSheet} from "react-native";

export const accent = "#e53232";
export const bg = "#1c1f22";
export const elBg = "rgba(255, 255, 255, .05)";

export default StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: bg,
	},
	scrollView: {
		flex: 1
	},
	safeAreaViewBlack: {
		flex: 1,
		backgroundColor: "black"
	},
	scrollViewNotBlack: {
		flex: 1,
		backgroundColor: bg
	},
	viewAppleBar: {
		padding: 10
	},
	viewAppleBarContent: {
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: elBg
	},
	viewAppleBarRow: {
		paddingTop: 10,
		flexDirection: "row"
	},
	viewMotd: {
		margin: 16,
		backgroundColor: elBg,
		padding: 16,
		borderRadius: 16,
		shadowRadius: 6,
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.1
	},
	viewAnimeList: {
		paddingTop: 16
	},
	viewEpisodeList: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center"
	},
	searchBarContainer: {
		backgroundColor: "transparent",
		borderColor: "transparent",
		borderTopColor: "transparent",
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	searchBarInputContainer: {
		backgroundColor: accent
	},
	searchBarInput: {
		backgroundColor: accent,
		color: "rgba(255,255,255,.5)"
	},
	listContainer: {
		borderBottomColor: elBg,
		backgroundColor: bg,
	},
	listTitle: {
		color: "white"
	},
	listSubtitle: {
		color: accent
	}
});
