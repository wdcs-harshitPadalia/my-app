/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	ImageSourcePropType
} from 'react-native';
import {Badge} from 'react-native-elements/dist/badge/Badge';
import {Image} from 'react-native-elements/dist/image/Image';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import GradientText from './GradientText';

interface Props extends TextInputProps {
	betsLost?: string;
	betsPending?: string;
	betsWon?: string;

	onActiveBetsPress?: () => void;
	onFollowersPress?: () => void;
	onFollowingPress?: () => void;
	onCreatePress?: () => void;
	onAWalletPress?: () => void;

	betWonPercent?: number;
	betLossPercent?: number;

	progressTitle?: string;
	nextGoalTitle?: string;
	currentFeesTitle?: string;
	isGradiantColorVisible?: boolean;
}

const BetsProgress: React.FC<Props> = props => {
	const {
		betsLost,
		betsPending,
		betsWon,
		onActiveBetsPress,
		onFollowersPress,
		onFollowingPress,
		onCreatePress,
		onAWalletPress,
		betWonPercent,
		betLossPercent,
		progressTitle,
		nextGoalTitle,
		currentFeesTitle,
		isGradiantColorVisible
	} = props;

	return (
		<View style={styles.container}>
			<View style={styles.viewRowStyle}>
				<View style={styles.viewColumnStyle}>
					<Text style={styles.countText}>
						{progressTitle ? progressTitle : Strings.betsWon}
					</Text>
					<TouchableOpacity
						onPress={onActiveBetsPress}
						style={styles.viewContainStyle}>
						<GradientText
							colors={defaultTheme.textGradientColor}
							style={styles.gradientText}>
							{betsWon}
						</GradientText>
						{betWonPercent !== 0 && (
							<>
								<ExpoFastImage
									resizeMode={'contain'}
									source={icons.upWhite}
									style={styles.rightImg}
								/>
								<Text style={styles.countText}>{betWonPercent + '%'}</Text>
							</>
						)}
					</TouchableOpacity>
				</View>

				<View style={styles.viewColumnStyle}>
					<Text style={styles.countText}>
						{nextGoalTitle ? nextGoalTitle : Strings.betsLost}
					</Text>
					<TouchableOpacity
						onPress={onActiveBetsPress}
						style={styles.viewContainStyle}>
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={styles.gradientText}>
							{betsLost}
						</GradientText>
						{betLossPercent !== 0 && (
							<>
								<ExpoFastImage
									resizeMode={'contain'}
									source={icons.upWhite}
									style={[
										styles.rightImg,
										{
											transform: [{rotate: '180deg'}]
										}
									]}
								/>
								<Text style={styles.countText}>{betLossPercent + '%'}</Text>
							</>
						)}
					</TouchableOpacity>
				</View>
				<View style={styles.viewColumnStyle}>
					<Text style={styles.countText}>
						{currentFeesTitle ? currentFeesTitle : Strings.betsPending}
					</Text>
					<TouchableOpacity
						onPress={onFollowingPress}
						style={styles.viewContainStyle}>
						{isGradiantColorVisible ? (
							<GradientText
								colors={defaultTheme.secondaryGradientColor}
								style={styles.gradientText}>
								{betsPending + '%'}
							</GradientText>
						) : (
							<Text style={styles.betsPendingCountText}>{betsPending}</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: verticalScale(8)
	},
	viewColumnStyle: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},

	viewRowStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: verticalScale(5)
	},

	viewContainStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'space-between'
	},
	viewBGStyle: {
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1
	},
	rightImg: {
		height: 10,
		width: 10,
		marginHorizontal: horizontalScale(6)
	},
	gradientText: {
		fontSize: moderateScale(20),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginRight: horizontalScale(6)
	},
	countText: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: colors.placeholderColor,
		marginVertical: verticalScale(3)
	},
	betsPendingCountText: {
		fontSize: moderateScale(20),
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: colors.white,
		marginRight: horizontalScale(4),
		textAlign: 'left',
		flex: 1
	}
});

export default BetsProgress;
