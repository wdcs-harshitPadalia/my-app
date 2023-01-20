import React, {useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	ViewStyle,
	Text,
	Platform,
	TouchableOpacity
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import Strings from '../constants/strings';
import CountryPicker from '../components/thirdParty/react-native-country-codes-picker';

interface Props extends TextInputProps {
	style?: ViewStyle;
	isShowError?: boolean;
	errMessage?: string;
	title?: string;
}

const CountryPickerComponent: React.FC<Props> = props => {
	const {title, isShowError, errMessage, isFromMobileDialCode} = props;
	const [show, setShow] = useState(false);

	const [country, setCountry] = useState(
		props?.text ?? Strings.selectCountry.toUpperCase()
	);

	return (
		<>
			{title && <Text style={styles.titleStyle}>{title}</Text>}
			<View style={[styles.container, {...props.style}]}>
				<TouchableOpacity
					style={
						isFromMobileDialCode
							? {marginRight: verticalScale(8)}
							: styles.buttonStyle
					}
					onPress={() => {
						setShow(true);
					}}>
					<Text
						style={
							country === Strings.selectCountry.toUpperCase()
								? styles.inputStyle
								: styles.inputSelectedStyle
						}>
						{country}
					</Text>
				</TouchableOpacity>
				<CountryPicker
					show={show}
					style={{
						// Styles for whole modal [View]
						modal: {
							flex: 0.8
						}
					}}
					pickerButtonOnPress={item => {
						if (isFromMobileDialCode) {
							props?.onSelectCountry(item);
						} else {
							props?.onSelectCountry(item.name.en);
						}
						console.log(item);
						setCountry(isFromMobileDialCode ? item.dial_code : item.name.en);
						setShow(false);
					}}
					onBackdropPress={() => setShow(false)}
				/>
			</View>
			{isShowError ? <Text style={styles.errStyle}>{errMessage}</Text> : null}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderBottomColor: colors.gray,
		borderBottomWidth: 1,
		paddingTop: Platform.OS === 'ios' ? 10 : 0,
		paddingBottom: 5
	},
	buttonStyle: {
		flex: 1
	},
	inputStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	inputSelectedStyle: {
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold
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
		paddingTop: verticalScale(20),
		paddingBottom: Platform.OS === 'ios' ? 0 : 2
	}
});

export default CountryPickerComponent;
