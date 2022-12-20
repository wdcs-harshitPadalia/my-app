import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInputProps, Text} from 'react-native';
import icons from '../assets/icon';
import Strings from '../constants/strings';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import LottieView from 'lottie-react-native';

interface Props extends TextInputProps {
	onPressShare: (type: string) => void;
}

const ShareOptionView: React.FC<Props> = props => {
	const {onPressShare} = props;
	const [isShowAnimation, setIsShowAnimation] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsShowAnimation(false);
		}, 3000);
	}, []);

	return (
		<View style={styles.viewDetails}>
			<Text style={styles.titleStyle}>{Strings.share_your_bet}</Text>
			<ButtonGradient
				onPress={() => {
					onPressShare(Strings.share_on_whatsapp);
				}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={Strings.share_on_whatsapp}
				style={styles.loginButtonSocial}
				leftIconPath={icons.whatsApp}
			/>
			<ButtonGradient
				onPress={() => {
					onPressShare(Strings.share_on_telegram);
				}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={Strings.share_on_telegram}
				style={styles.loginButtonSocial}
				leftIconPath={icons.telegram}
			/>
			<ButtonGradient
				onPress={() => {
					onPressShare(Strings.share_on_twitter);
				}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={Strings.share_on_twitter}
				style={styles.loginButtonSocial}
				leftIconPath={icons.twitter}
			/>
			<ButtonGradient
				onPress={() => {
					onPressShare(Strings.copy_link);
				}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={Strings.copy_link}
				style={styles.loginButtonSocial}
				leftIconPath={icons.copy}
			/>
			<ButtonGradient
				onPress={() => {
					onPressShare(Strings.or_share_with);
				}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={Strings.or_share_with.replace('or ', '')}
				style={styles.loginButtonSocial}
				leftIconPath={icons.ic_share_upload}
			/>
			{isShowAnimation && (
				<LottieView
					style={{
						height: 300,
						width: 300,
						alignSelf: 'center',
						position: 'absolute'
					}}
					source={require('../assets/animations/confetti_day.json')}
					autoPlay
					loop={false}
				/>
			)}

			{/* <TouchableOpacity
				style={styles.nameViewStyle}
				onPress={() => {
					onPressShare(Strings.or_share_with);
				}}>
				<Text style={styles.nameStyle}>
					{Strings.or_share_with.toUpperCase()}{' '}
				</Text>
			</TouchableOpacity> */}
		</View>
	);
};

const styles = StyleSheet.create({
	viewDetails: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: verticalScale(16),
		marginVertical: verticalScale(16)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingVertical: verticalScale(8)
	},
	loginButtonSocial: {
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16)
	},
	nameStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginTop: verticalScale(20)
	},
	nameViewStyle: {
		borderBottomColor: colors.placeholderColor,
		borderBottomWidth: 1
	}
});

export default ShareOptionView;
