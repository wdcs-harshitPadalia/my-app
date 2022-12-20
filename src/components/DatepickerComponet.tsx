import RNDateTimePicker, {Event} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
	ImageSourcePropType,
	Platform,
	StyleSheet,
	Text,
	TextInputProps,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import Modal from 'react-native-modal';
import Strings from '../constants/strings';
import {getInitialDate} from '../constants/utils/Function';
import {
	Colors,
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../theme';
import colors from '../theme/colors';

interface Props extends TextInputProps {
	isVisible: boolean;
	rightIcon: boolean;
	rightIconPath?: ImageSourcePropType;
	style?: ViewStyle;
	date?: Date;
	setDate?: Function;
	isShowError?: boolean;
	setDateerror: Function;
	errMessage?: string;
	title?: string;
	maximumDate: Date;
	minimumDate: Date;
	mode: string;
	dateChanged: String;
	isDateSelected?: boolean;
}

interface renderModal {
	isVisible: boolean;
	setisVisible: Function;
	oldvalue: string;
	date: Date;
	setDateerror: Function;
	setDate: Function;
	setdateSelect: Function;
	maximumDate: Date;
	minimumDate: Date;
	mode: string;
}
const RenderModal = ({
	isVisible,
	setisVisible,
	oldvalue,
	date,
	setDate,
	setdateSelect,
	setDateerror,
	maximumDate,
	minimumDate,
	mode
}: renderModal) => {
	const [oldvalue1, setoldvalue] = useState<string>(oldvalue);
	const [cancel, setcancel] = useState<boolean>(false);

	const [datetemp, setDatetemp] = useState<Date>(getInitialDate());
	const onChange = (event: Event, selectedDate: Date) => {
		// setisVisible(false);

		const currentDate = selectedDate || date;
		setDatetemp(currentDate);
		setDateerror(false);
		if (Platform.OS === 'android') {
			if (event?.type === 'set') {
				setDatetemp(currentDate);
				setDate(currentDate);
				setisVisible(false);
				setdateSelect(true);
				console.log('ok button click');
			} else {
				setisVisible(false);
				setDatetemp(date);
				console.log('cancel button click', event?.type);
			}
		}
	};

	useEffect(() => {
		setDatetemp(date);
	}, [cancel]);
	return Platform.OS === 'android' && isVisible ? (
		<RNDateTimePicker
			value={datetemp}
			mode={mode}
			is24Hour={true}
			// initialDate={moment().subtract(18, 'years')}
			maximumDate={maximumDate}
			minimumDate={minimumDate}
			display="default"
			onChange={onChange}
			textColor={colors.black}
		/>
	) : (
		<Modal isVisible={isVisible} style={styles.containerModal}>
			<View style={styles.containerView}>
				<View>
					<View style={styles.pickerStyle}>
						<TouchableOpacity
							style={styles.buttonStyle}
							onPress={() => {
								setcancel(!cancel);
								setisVisible(false);
							}}>
							<Text style={styles.buttonTextStyle}>{Strings.cancel}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonStyle}
							onPress={() => {
								setdateSelect(true);
								//props.changed(datetemp)
								setDate(datetemp);
								setisVisible(false);
							}}>
							<Text style={styles.buttonTextStyle}>{Strings.done}</Text>
						</TouchableOpacity>
					</View>
					<RNDateTimePicker
						value={datetemp}
						mode={mode}
						is24Hour={true}
						maximumDate={maximumDate}
						minimumDate={minimumDate}
						display="spinner"
						onChange={onChange}
						textColor={colors.black}
						themeVariant="light"
					/>
				</View>
			</View>
		</Modal>
	);
};

const DatepickerComponet: React.FC<Props> = props => {
	const {
		rightIcon,
		rightIconPath,
		placeholder,
		date,
		setDate,
		isShowError,
		errMessage,
		setDateerror,
		title,
		maximumDate,
		minimumDate,
		mode,
		dateChanged,
		isDateSelected
	} = props;
	const [selectedLanguage, setSelectedLanguage] = useState<string>('');
	const [isVisible, setisVisible] = useState<boolean>(false);
	const [dateselect, setdateSelect] = useState<boolean>(isDateSelected);
	const oldvalue = selectedLanguage;

	const dateset = () => {
		if (mode === 'time') {
			if (!dateselect) {
				return placeholder;
			} else {
				return moment(date).format('hh:mm A');
			}
		} else {
			if (!dateselect) {
				return placeholder;
			} else {
				return moment(date).format('DD MMMM YYYY');
			}
		}
	};
	return (
		<View>
			<RenderModal
				isVisible={isVisible}
				oldvalue={oldvalue}
				setDate={setDate}
				date={date}
				setDateerror={setDateerror}
				setdateSelect={setdateSelect}
				setisVisible={setisVisible}
				maximumDate={maximumDate}
				minimumDate={minimumDate}
				mode={mode}
			/>
			<Text style={styles.titleStyle}>{title}</Text>

			<View style={[{...props.style}, styles.container]}>
				<TouchableOpacity
					style={{flexDirection: 'row', alignItems: 'center'}}
					onPress={() => {
						setisVisible(!isVisible);
					}}>
					{rightIcon === true && rightIconPath !== undefined ? (
						<TouchableOpacity disabled={true}>
							<ExpoFastImage
								//resizeMode={ExpoFastImage.resizeMode.contain}
								source={rightIconPath}
								style={styles.leftImg}
							/>
						</TouchableOpacity>
					) : null}
					<Text
						style={[
							styles.inputStyle,
							{color: !dateselect ? colors.placeholderColor : colors.white}
						]}>
						{dateset()}
					</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.errStyle}>{isShowError ? errMessage : ''}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	containerModal: {flex: 1, margin: 0},
	containerView: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: 'white'
	},
	pickerStyle: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	buttonStyle: {padding: horizontalScale(16)},
	buttonTextStyle: {
		fontFamily: Fonts.type.Inter_Regular,
		fontSize: moderateScale(12),
		color: Colors.blackFour
	},
	container: {
		elevation: 3,
		borderBottomColor: colors.gray,
		borderBottomWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Platform.OS === 'ios' ? 10 : 0,
		paddingBottom: Platform.OS === 'ios' ? 5 : -10
	},
	leftImg: {
		height: 20,
		width: 20,
		marginRight: verticalScale(10),
		tintColor: colors.black,
		marginBottom: Platform.OS === 'ios' ? 2 : 4
	},

	inputStyle: {
		flex: 1,
		color: colors.gray,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingBottom: Platform.OS === 'ios' ? 0 : 4
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
		paddingBottom: Platform.OS === 'ios' ? 0 : 6
	}
});

export default DatepickerComponet;
