import {localeData} from 'moment';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TextInputProps,
	ViewStyle,
	Text,
	Platform,
	Alert
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import CountryPickerComponent from './CountryPickerComponent';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import CountryPicker from './thirdParty/react-native-country-codes-picker';
import * as RNLocalize from 'react-native-localize';
import countriesList from '../constants/utils/countriesList.json';

interface Props extends TextInputProps {
	style?: ViewStyle;
	textTitleStyle?: ViewStyle;
	isShowError?: boolean;
	errMessage?: string;
	title?: string;
	onLeftIconPath?: ImageSourcePropType;
	textValue?: string;
	isUserName?: boolean;
	returnType?: string;
	onSelectCountryCode?: any;
}

//^[1-9]\d*$

const EmailMobileInputComponent = forwardRef<TextInput, Props>((props, ref) => {
	const {
		title,
		placeholder,
		isShowError,
		errMessage,
		onLeftIconPath,
		textValue,
		isUserName,
		returnType,
		fontSize,
		onSelectCountryCode
	} = props;

	const localData = countriesList;
	let ISDCode = localData[RNLocalize.getCountry()]?.callingCode[0];

	const [countryCode, setcountryCode] = useState(`+${ISDCode}`);

	const [showCountryCode, setShowCountryCode] = useState(true);

	const [emailOrPhone, setEmailOrPhone] = useState('');

	const onSelect = (country: Country) => {
		setcountryCode(country.dial_code);
		// setCountry(country);
		// onSelectCountryCode(country.dial_code);
	};

	// useEffect(() => {

	//   setcountryCode(ISDCode);
	//   console.log(ISDCode, 'sjdfklfjd???');
	// }, [emailOrPhone]);

	useUpdateEffect(() => {
		const isMobileNumber = /^[1-9]\d*$/.test(emailOrPhone);
		// Alert.alert(isMobile÷Number + '');
		setShowCountryCode(isMobileNumber || emailOrPhone.length === 0);
		props?.onChangeText(
			isMobileNumber ? countryCode + emailOrPhone : emailOrPhone
		);
	}, [emailOrPhone, countryCode]);

	return (
		<View>
			{title ? (
				<Text style={[styles.titleStyle, {...props.textTitleStyle}]}>
					{title}
				</Text>
			) : null}

			<View style={[styles.container, {...props.style}]}>
				{onLeftIconPath !== undefined ? (
					<ExpoFastImage
						//resizeMode={ExpoFastImage.resizeMode.contain}
						source={onLeftIconPath}
						style={styles.leftImg}
					/>
				) : null}
				{isUserName && (
					<Text
						style={props.defaultValue === '' ? styles.prefix1 : styles.prefix}>
						@
					</Text>
				)}
				{showCountryCode && (
					<CountryPickerComponent
						//style={styles.marginInput}
						// valasdasue={''}
						isSecureText={false}
						isFromMobileDialCode
						style={{borderBottomWidth: 0}}
						// isShowError={touched.country && errors.country}
						text={countryCode}
						onSelectCountry={onSelect}
						defaultValue={''}
						placeholder={''}
						returnKeyType={'done'}
						// errMessage={errors.country}
					/>
				)}
				{/* {showCountryCode && (
          <CountryPicker
            placeholder={
              <Text style={[styles.inputStyle, {fontSize: 12}]}>
                {'+' + countryCode + ' '}
              </Text>
            }
            // theme={DARK_THEME}
            withFlagButton={true}
            containerButtonStyle={{
              // width: 50,
              // backgroundColor: 'red',
              // marginTop: verticalScale(12),
              // position: 'absolute',
              // left: 8,
              top: 2,
              // backgroundColor: 'red',
            }}
            {...{
              CountryCode,
              // WithFilter,
              // withCountryNameButton,
              // withAlphaFilter,
              onSelect,
            }}
          />
        )} */}
				<TextInput
					{...props}
					ref={ref}
					style={[styles.inputStyle, {fontSize: fontSize}]}
					placeholder={placeholder}
					placeholderTextColor={colors.placeholderColor}
					onChangeText={value => {
						setEmailOrPhone(value);
					}}
					onSubmitEditing={props.onSubmitEditing}
					value={props.textValue}
					returnKeyType={returnType ?? 'done'}
				/>
			</View>
			{isShowError ? <Text style={styles.errStyle}>{errMessage}</Text> : null}
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: colors.gray,
		borderBottomWidth: 1
	},
	prefix: {
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold
		//flex: 1,
		// backgroundColor: 'red',
	},
	prefix1: {
		color: colors.placeholderColor,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold
		//flex: 1,
		// backgroundColor: 'red',
	},
	inputStyle: {
		outlineStyle: 'none',
		// flex: 1,
		width: '100%',
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold,
		//paddingLeft: 10,
		paddingTop: Platform.OS === 'ios' ? 10 : 0,
		paddingBottom: Platform.OS === 'ios' ? 5 : -10
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
	},
	leftImg: {
		height: 17,
		width: 17,
		marginRight: verticalScale(8),
		tintColor: colors.black,
		marginBottom: Platform.OS === 'ios' ? -4 : 0,
		alignSelf: 'center'
	}
});

export default EmailMobileInputComponent;
