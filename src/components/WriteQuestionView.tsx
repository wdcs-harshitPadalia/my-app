import React from 'react';
import {View, StyleSheet, TextInputProps, Text} from 'react-native';
import icons from '../assets/icon';
import Strings from '../constants/strings';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle, width} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import InputComponent from './InputComponent';

interface Props extends TextInputProps {
	buttonTitle?: string;
	onButtonPress?: () => void;
	colorArray?: string[];
	question: (que: string) => void;
	textValue?: string;
	isShowButtonOption?: boolean;
	title?: string;
	placeholder?: string;
}

const WriteQuestionView: React.FC<Props> = props => {
	const {
		buttonTitle,
		onButtonPress,
		colorArray,
		question,
		textValue,
		isShowButtonOption,
		title,
		placeholder
	} = props;

	const onSubmitEditing = e => {
		if (e.keyCode == 13 && !e.shiftKey) {
			e.preventDefault();
			return false;
		}
	};

	return (
		<View style={[styles.viewDetails, {...props.style}]}>
			<Text style={styles.titleStyle}>{title}</Text>
			<InputComponent
				multiline
				blurOnSubmit
				style={styles.marginInput}
				placeholder={placeholder.toUpperCase()}
				onChangeText={(text: string) => {
					question(text);
				}}
				onSubmitEditing={onSubmitEditing}
				textValue={textValue}
				maxLength={100}
			/>
			{isShowButtonOption && (
				<>
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
				</>
			)}
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
		width : '100%',
		marginBottom: verticalScale(16),
		marginTop: verticalScale(16)
	},
	marginInput: {
		marginVertical: verticalScale(20),
		width: '100%'
	}
});

export default WriteQuestionView;
