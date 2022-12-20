import React from 'react';
import {View, StyleSheet, TextInputProps, Text} from 'react-native';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface Props extends TextInputProps {
	popupTitle?: string;
	button1Title?: string;
	button2Title?: string;
	button3Title?: string;

	onButton1Press?: () => void;
	onButton2Press?: () => void;
	onButton3Press?: () => void;

	color1Array?: string[];
	color2Array?: string[];
	color3Array?: string[];

	textType?: string;
	isShowSecondButton?: boolean;
	isShowThirdButton?: boolean;
}

const OptionSelectionView: React.FC<Props> = props => {
	const {
		popupTitle,
		button1Title,
		button2Title,
		button3Title,
		onButton1Press,
		onButton2Press,
		onButton3Press,
		color1Array,
		color2Array,
		color3Array,
		isShowSecondButton,
		textType,
		isShowThirdButton
	} = props;

	return (
		<View style={styles.viewDetails}>
			<Text style={styles.titleStyle}>{popupTitle}</Text>
			<ButtonGradient
				onPress={onButton1Press}
				colorArray={color1Array}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={button1Title}
				style={styles.loginButtonSocial}
				textType={textType}
			/>
			{isShowSecondButton ? (
				<ButtonGradient
					onPress={onButton2Press}
					colorArray={color2Array}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={button2Title}
					style={styles.loginButtonSocial}
					textType={textType}
				/>
			) : null}
			{isShowThirdButton ? (
				<ButtonGradient
					onPress={onButton3Press}
					colorArray={color3Array}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={button3Title}
					style={styles.loginButtonSocial}
					textType={textType}
				/>
			) : null}
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
		paddingVertical: verticalScale(8),
		paddingHorizontal: verticalScale(16)
	},
	loginButtonSocial: {
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16)
	}
});

export default OptionSelectionView;
