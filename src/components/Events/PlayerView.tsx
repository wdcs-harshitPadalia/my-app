import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {defaultTheme} from '../../theme/defaultTheme';
import ExpoFastImage from 'expo-fast-image';
import icons from '../../assets/icon';

const PlayerView = props => {
	return (
		<View style={styles.container}>
			<ExpoFastImage
				resizeMode={'contain'}
				source={icons.userDummy}
				style={styles.left2Img}
			/>
			<View style={styles.playerNameView}>
				<Text style={styles.playerName} numberOfLines={1}>
					{props?.name?.toUpperCase()}
				</Text>
			</View>
			{props?.number && (
				<View style={styles.playerNumberView}>
					<Text style={styles.playerNumber} numberOfLines={1}>
						{props?.number}
					</Text>
				</View>
			)}
		</View>
	);
};

export default PlayerView;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 4
	},
	left2Img: {
		height: 22,
		width: 22,
		borderRadius: 11
	},
	playerNameView: {
		borderRadius: 8,
		backgroundColor: defaultTheme.backGroundColor,
		justifyContent: 'center',
		alignItems: 'center',
		top: -3,
		overflow: 'hidden',
		width: 40
	},
	playerName: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 7,
		fontFamily: fonts.type.Inter_ExtraBold,
		backgroundColor: defaultTheme.backGroundColor,
		paddingVertical: 3,
		paddingHorizontal: 2
	},

	playerNumberView: {
		borderRadius: 8,
		backgroundColor: defaultTheme.backGroundColor,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		width: 16,
		height: 16,
		position: 'absolute',
		top: 0,
		right: 4
	},
	playerNumber: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 7,
		fontFamily: fonts.type.Inter_SemiBold,
		backgroundColor: defaultTheme.backGroundColor
	}
});
