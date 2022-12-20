import React from 'react';
import {View, StyleSheet, TextInputProps, Text} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import {getLevelRank} from '../constants/utils/Function';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {borderGradientColorAngle, gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	profileImgPath?: string;
	badgeImgPath?: string;
	level?: number;
}

const StoryProfileComponent: React.FC<Props> = props => {
	const {profileImgPath, badgeImgPath, level} = props;

	return (
		<View style={styles.container}>
			<View style={styles.dropShadowContainer}>
				<LinearGradient
					style={styles.circleGradient}
					useAngle={true}
					angle={borderGradientColorAngle}
					colors={defaultTheme.boarderGradientColor}>
					<View style={styles.profileImageContainer}>
						<ExpoFastImage
							style={styles.profileImage}
							resizeMode="cover"
							source={{uri: profileImgPath}}
						/>
					</View>
				</LinearGradient>
				<View style={styles.profileBadgeImageContainer}>
					<ExpoFastImage
						style={styles.badgeImage}
						resizeMode="contain"
						source={getLevelRank(level).image}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		shadowRadius: 18,
		alignItems: 'center'
	},
	dropShadowContainer: {
		// shadowColor: colors.greenLight,
		// shadowOffset: {
		//   width: 0,
		//   height: 2,
		// },
		// shadowOpacity: 0.6,
		// elevation: 3,
		// shadowRadius: 8,
	},
	circleGradient: {
		width: 70,
		height: 70,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center'
	},
	profileImageContainer: {
		width: 66,
		height: 66,
		borderRadius: 33,
		borderColor: 'rgba(0,0, 0, 1.0)',
		borderWidth: 4
	},
	profileImage: {
		width: 58,
		height: 58,
		borderRadius: 29
	},
	profileBadgeImageContainer: {
		width: 34,
		height: 34,
		//backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		borderRadius: 17,
		right: -10,
		top: 3
	},
	badgeImage: {
		width: 34,
		height: 34
	}
});

export default StoryProfileComponent;
