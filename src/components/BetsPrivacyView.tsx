import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Strings from '../constants/strings';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface Props extends TextInputProps {
	popupTitle?: string;
	onPublicPress?: () => void;
	onPrivatePress?: () => void;
	isSelected?: number;
}

const BetsPrivacyView: React.FC<Props> = props => {
	const {popupTitle, onPublicPress, isSelected, onPrivatePress} = props;

	return (
		<View style={styles.container}>
			<Text style={styles.titleStyle}>{popupTitle}</Text>
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
						{Strings.public_bet.toUpperCase()}{' '}
					</Text>
					<Text style={styles.descriptionsStyle}>
						{Strings.anybody_can_join}
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
						{Strings.private_bet.toUpperCase()}{' '}
					</Text>
					<Text style={styles.descriptionsStyle}>
						{Strings.who_participates}
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
		alignItems: 'center',
		justifyContent: 'center',
		padding: horizontalScale(16)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingVertical: verticalScale(8)
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
