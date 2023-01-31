import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity,
	Platform
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Strings from '../constants/strings';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface Props extends TextInputProps {
	onPublicPress?: () => void;
	onPrivatePress?: () => void;
	isSelected?: number;
	popUpType?: number; // 0 for Privacy 1 for Result verification
}

const BetsPrivacyView: React.FC<Props> = props => {
	const {popUpType, onPublicPress, isSelected, onPrivatePress} = props;

	return (
		<View style={styles.container}>
			<Text style={styles.titleStyle}>
				{popUpType === 0
					? Strings.bet_privacy
					: Strings.select_who_verifies_the_challenge}
			</Text>
			<TouchableOpacity
				style={styles.viewDetails}
				activeOpacity={1}
				onPress={onPublicPress}>
				<LinearGradient
					useAngle={true}
					angle={gradientColorAngle}
					colors={defaultTheme.ternaryGradientColor}
					style={styles.bgGradient}>
					{isSelected === 0 ? (
						<LinearGradient
							useAngle={true}
							angle={gradientColorAngle}
							colors={defaultTheme.textGradientColor}
							style={styles.countGradient}
						/>
					) : null}
				</LinearGradient>
				<View style={styles.viewText}>
					<Text style={styles.nameStyle}>
						{popUpType === 0
							? Strings.public_bet.toUpperCase()
							: Strings.bet_maker.toUpperCase()}
					</Text>
					<Text style={styles.descriptionsStyle}>
						{popUpType === 0
							? Strings.anybody_can_join
							: Strings.if_you_select_Bet_Maker_des}
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.viewDetails}
				activeOpacity={1}
				onPress={onPrivatePress}>
				<LinearGradient
					useAngle={true}
					angle={gradientColorAngle}
					colors={defaultTheme.ternaryGradientColor}
					style={styles.bgGradient}>
					{isSelected === 1 ? (
						<LinearGradient
							useAngle={true}
							angle={gradientColorAngle}
							colors={defaultTheme.textGradientColor}
							style={styles.countGradient}
						/>
					) : null}
				</LinearGradient>
				<View style={styles.viewText}>
					<Text style={styles.nameStyle}>
						{popUpType === 0
							? Strings.private_bet.toUpperCase()
							: Strings.bet_taker.toUpperCase()}
					</Text>
					<Text style={styles.descriptionsStyle}>
						{popUpType === 0
							? Strings.who_participates
							: Strings.if_you_select_Bet_taker_des}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		alignItems: 'stretch',
		...Platform.select({
			ios: {
				alignItems: 'center'
			},
			android: {
				alignItems: 'center'
			},
			web: {
				alignItems: 'stretch'
			}
		}),
		justifyContent: 'center',
		padding: horizontalScale(16)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingVertical: verticalScale(8),
		flex: 1
	},

	viewDetails: {
		flexDirection: 'row',
		marginVertical: verticalScale(8)
	},

	bgGradient: {
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center'
	},
	nameStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Bold
	},
	descriptionsStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_SemiBold,
		marginVertical: verticalScale(6)
	},
	countGradient: {
		width: 14,
		height: 14,
		opacity: 1,
		borderRadius: 7
	},
	viewText: {flex: 1, marginHorizontal: verticalScale(10)}
});

export default BetsPrivacyView;
