import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity
} from 'react-native';

import DropShadow from 'react-native-drop-shadow';
import ExpoFastImage from 'expo-fast-image';

import Strings from '../constants/strings';

import {Fonts, verticalScale} from '../theme';
import colors from '../theme/colors';

import {moderateFontScale} from '../theme/metrics';

interface Props extends TextInputProps {
	profileImgPath?: string;
	handleOnClick?: () => void;
}

const LiveUserProfileComponent: React.FC<Props> = props => {
	const {profileImgPath, handleOnClick} = props;

	return (
		<View style={styles.container}>
			<DropShadow style={styles.bgProfileShadow}>
				<TouchableOpacity onPress={handleOnClick}>
					<View style={styles.liveRing}>
						<ExpoFastImage
							style={styles.imgIconStyle}
							resizeMode="cover"
							source={{uri: profileImgPath}}
						/>
					</View>
					<View style={styles.liveTextContainer}>
						<Text style={styles.liveText}>{Strings.live}</Text>
					</View>
				</TouchableOpacity>
			</DropShadow>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: verticalScale(20),
		marginBottom: verticalScale(16)
	},
	bgProfileShadow: {
		shadowColor: colors.greenLight,
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.8,
		shadowRadius: 55,
		borderRadius: 55,
		elevation: 3
	},
	liveRing: {
		width: 110,
		height: 110,
		borderRadius: 55,
		borderColor: colors.red,
		borderWidth: 5
	},
	imgIconStyle: {
		width: 90,
		height: 90,
		borderRadius: 45,
		margin: 5
	},
	liveTextContainer: {
		borderRadius: 6,
		backgroundColor: colors.red,
		width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		position: 'absolute',
		bottom: verticalScale(-5),
		padding: 5
	},
	liveText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(9),
		color: colors.white,
		textTransform: 'uppercase'
	}
});

export default LiveUserProfileComponent;
