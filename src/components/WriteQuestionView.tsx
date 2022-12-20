import React from 'react';
import {View, StyleSheet, TextInputProps, Text} from 'react-native';
import icons from '../assets/icon';
import Strings from '../constants/strings';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import InputComponent from './InputComponent';

interface Props extends TextInputProps {
	buttonTitle?: string;
	onButtonPress?: () => void;
	colorArray?: string[];
	question: (que: string) => void;
	textValue?: string;
}

const WriteQuestionView: React.FC<Props> = props => {
	const {buttonTitle, onButtonPress, colorArray, question, textValue} = props;

	return (
		<View style={styles.viewDetails}>
			<Text style={styles.titleStyle}>{Strings.write_Question_Market}</Text>
			<InputComponent
				multiline
				blurOnSubmit
				style={styles.marginInput}
				placeholder={Strings.write_your_question.toUpperCase()}
				onChangeText={(text: string) => {
					question(text);
				}}
				textValue={textValue}
			/>
			<Text style={styles.titleStyle}>{Strings.how_many_results}</Text>

			<ButtonGradient
				onPress={onButtonPress}
				colorArray={colorArray}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={buttonTitle}
				style={styles.loginButtonSocial}
				textType={'capitalize'}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	viewDetails: {
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: verticalScale(10),
		backgroundColor: colors.black,
		overflow: 'hidden',
		paddingHorizontal: verticalScale(16)
	},
	titleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginTop: verticalScale(24),
		textAlign: 'center'
	},
	loginButtonSocial: {
		marginBottom: verticalScale(16),
		marginTop: verticalScale(16)
	},
	marginInput: {
		marginVertical: verticalScale(16),
		width: '100%'
	}
});

export default WriteQuestionView;
