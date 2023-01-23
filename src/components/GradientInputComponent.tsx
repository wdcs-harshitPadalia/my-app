import React, {useEffect, useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TextInputProps,
	ViewStyle,
	Text,
	Platform,
	TextStyle
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	isSecureText?: boolean;
	style?: ViewStyle;
	isShowError?: boolean;
	errMessage?: string;
	title?: string;
	colorArray: any[];
	textStyle?: TextStyle;
	editable?: boolean;
}

const GradientInputComponent: React.FC<Props> = props => {
	const {
		title,
		placeholder,
		isSecureText,
		isShowError,
		errMessage,
		colorArray,
		textStyle,
		editable
	} = props;

	const [isSecure, setSecure] = useState<boolean>(
		isSecureText !== undefined ? isSecureText : false
	);

	const textInputRef = useRef();

	useEffect(() => {
		console.log('textStyle', textStyle);
	}, [textStyle]);

	useEffect(() => {
		if (textInputRef.current) {
			textInputRef.current.setNativeProps({
				style: styles.inputStyle
			});
		}
	}, [isSecure]);

	return (
		<View style={[{borderRadius: 8, overflow: 'hidden'}, {...props.style}]}>
			<LinearGradient
				colors={colorArray}
				useAngle={true}
				angle={gradientColorAngle}>
				{/* <Text style={styles.titleStyle}>{title}</Text> */}
				<View style={[styles.container]}>
					<TextInput
						editable={editable}
						// {...props}
						ref={ref => {
							textInputRef.current = ref;
						}}
						style={[styles.inputStyle, {...props.textStyle}]}
						secureTextEntry={isSecure}
						placeholder={placeholder}
						placeholderTextColor={colors.placeholderColor}
						value={title}
					/>
				</View>
				{isShowError ? <Text style={styles.errStyle}>{errMessage}</Text> : null}
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputStyle: {
		outlineStyle: 'none',
		flex: 1,
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingHorizontal: horizontalScale(10),
		marginVertical: verticalScale(16),
		paddingVertical: 0
		//backgroundColor: 'red',
	},
	errStyle: {
		color: colors.red,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		paddingHorizontal: horizontalScale(16),
		paddingTop: 5
	},
	titleStyle: {
		color: colors.textTitle,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingHorizontal: horizontalScale(16),
		paddingTop: verticalScale(20)
	}
});

export default GradientInputComponent;
