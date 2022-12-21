import React, {useEffect, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Modal,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import InputComponent from './InputComponent';

interface Props extends TextInputProps {
	isVisible: boolean;
	popupTitle?: string;
	buttonOkTitle?: string;
	onPressOk?: () => void;
	onPressCancel?: () => void;
	setSubject: (subject: string) => void;
	setDescription: (subject: string) => void;
	isAlpha: boolean;
}

const CreateNewTickets: React.FC<Props> = props => {
	const {
		popupTitle,
		buttonOkTitle,
		onPressOk,
		onPressCancel,
		isVisible,
		style,
		setSubject,
		setDescription,
		isAlpha
	} = props;

	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View style={styles.bgView}>
				<View style={styles.centeredView}>
					<View style={styles.viewDetails}>
						<Text style={[styles.titleStyle, {...style}]}>{popupTitle}</Text>
						<InputComponent
							style={styles.marginInput}
							title={Strings.subject}
							returnKeyType={'done'}
							onChangeText={(text: string) => {
								setSubject(text);
							}}
							maxLength={50}
						/>
						<InputComponent
							style={styles.marginInput}
							title={Strings.description}
							returnKeyType={'done'}
							onChangeText={(text: string) => {
								setDescription(text);
							}}
							multiline
							maxLength={150}
						/>
						<ButtonGradient
							onPress={onPressOk}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={buttonOkTitle}
							style={isAlpha ? styles.loginButton : styles.loginButtonWithAlpha}
							btnDisabled={!isAlpha}
						/>
						<ButtonGradient
							onPress={onPressCancel}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.cancel}
							style={styles.loginButton}
						/>
					</View>
				</View>
			</View>

			{/* </TouchableOpacity> */}
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: verticalScale(30)
	},
	bgView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	viewDetails: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10),
		// alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: verticalScale(20),
		width: Dimensions.get('screen').width * 0.88
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingVertical: verticalScale(8)
	},

	loginButtonWithAlpha: {
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16),
		opacity: 0.5
	},
	loginButton: {
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16)
	},
	marginInput: {
		marginHorizontal: verticalScale(16)
	}
});

export default CreateNewTickets;
