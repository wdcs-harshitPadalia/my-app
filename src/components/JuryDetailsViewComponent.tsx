import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {
	gradientColorAngle,
	moderateFontScale,
	moderateScale
} from '../theme/metrics';
import GradientText from './GradientText';

interface Props {
	juryName?: string;
	juryProfileImage?: string;
	juryStrikeLevel?: number;
	juryAvailableStrike?: string;
	juryClaimedRewards?: string;
}

const JuryProfileImage = ({profilePath}) => {
	return (
		<DropShadow style={styles.dropShadowContainer}>
			<LinearGradient
				style={styles.circleGradient}
				useAngle={true}
				angle={gradientColorAngle}
				colors={defaultTheme.boarderGradientColor}>
				<View style={styles.profileImageContainer}>
					<ExpoFastImage
						source={{uri: profilePath}}
						style={styles.juryProfileImage}
						resizeMode="cover"
					/>
				</View>
			</LinearGradient>
		</DropShadow>
	);
};

const JuryDetailsViewComponent = (props: Props) => {
	const {
		juryName,
		juryProfileImage,
		juryStrikeLevel,
		juryAvailableStrike,
		juryClaimedRewards
	} = props;

	return (
		<View style={styles.container}>
			<View style={styles.juryDetailsTopContainer}>
				<JuryProfileImage profilePath={juryProfileImage} />
				<View style={styles.juryNameContainer}>
					<Text
						style={styles.juryNameTitleTextStyle}
						numberOfLines={2}>{`@${juryName}`}</Text>
					<Text style={styles.jurySubTitleTextStyle}>{Strings.judge}</Text>
				</View>
			</View>
			<View style={styles.juryDetailsBottomContainer}>
				<View style={styles.juryDetailsChildContainer}>
					<Text style={styles.juryDetailsChildLeftTextStyle}>
						{Strings.strike_level}
					</Text>
					<GradientText
						colors={defaultTheme.primaryGradientColor}
						style={styles.strikeLevelValueText}>
						{juryStrikeLevel}
					</GradientText>
				</View>
				<View style={styles.juryDetailsChildContainer}>
					<Text style={styles.juryDetailsChildLeftTextStyle}>
						{Strings.available_strike}
					</Text>
					<Text style={styles.juryDetailsChildRightTextStyle}>
						{juryAvailableStrike}
					</Text>
				</View>
				<View style={styles.juryDetailsChildContainer}>
					<Text style={styles.juryDetailsChildLeftTextStyle}>
						{Strings.claim_rewards}
					</Text>
					<Text style={styles.juryDetailsChildRightTextStyle}>
						{juryClaimedRewards}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		borderRadius: 10,
		paddingVertical: verticalScale(12),
		marginTop: verticalScale(12),
		marginBottom: verticalScale(8)
	},
	juryDetailsTopContainer: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(20)
	},
	dropShadowContainer: {
		shadowColor: colors.greenLight,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.6,
		elevation: 3,
		shadowRadius: 8,
		borderRadius: 34
	},
	circleGradient: {
		width: 68,
		height: 68,
		borderRadius: 34,
		alignItems: 'center',
		justifyContent: 'center'
	},
	profileImageContainer: {
		width: 64,
		height: 64,
		borderRadius: 33,
		borderColor: 'rgba(0,0, 0, 1.0)',
		borderWidth: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	juryProfileImage: {
		height: 60,
		width: 60,
		borderRadius: 30
	},
	juryNameContainer: {
		justifyContent: 'center',
		flex: 1,
		marginHorizontal: horizontalScale(16)
	},
	juryNameTitleTextStyle: {
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateFontScale(18),
		color: colors.white
	},
	jurySubTitleTextStyle: {
		marginTop: verticalScale(6),
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateFontScale(12),
		color: colors.textTitle,
		textTransform: 'uppercase'
	},
	juryDetailsBottomContainer: {
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(4)
		// paddingBottom: verticalScale(8),
	},
	juryDetailsChildContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	juryDetailsChildLeftTextStyle: {
		marginVertical: verticalScale(6),
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '700',
		fontSize: moderateFontScale(12),
		color: colors.textTitle
	},
	juryDetailsChildRightTextStyle: {
		marginVertical: verticalScale(3),
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateFontScale(14),
		color: colors.white,
		textTransform: 'uppercase'
	},
	strikeLevelValueText: {
		marginVertical: verticalScale(3),
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400'
	}
});

export default JuryDetailsViewComponent;
