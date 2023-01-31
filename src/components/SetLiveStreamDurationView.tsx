import moment from 'moment';
import React, {createElement, useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	Platform,
	TouchableOpacity,
	Alert
} from 'react-native';
import {Switch} from 'react-native-elements';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import DatePickerWeb from './DatePickerWeb';
import {isValidDate} from '../constants/utils/Function';

interface Props extends TextInputProps {
	setSelectedDate: (ans: any) => void;
	selectedDate?: any;
	setEndSelectedDate: (ans: any) => void;
	selectedEndDate?: any;
}

const SetLiveStreamDurationView: React.FC<Props> = props => {
	const {setSelectedDate, selectedDate, setEndSelectedDate, selectedEndDate} =
		props;
	const dateTimePickerRef = useRef();
	const dateTimePickerEndRef = useRef();

	const [date, setDate] = useState(
		selectedDate
			? moment(selectedDate).format('DD MMMM YYYY hh:mm A')
			: Strings.pick_start_time.toUpperCase()
	);

	const [endDate, setEndDate] = useState(
		selectedDate
			? moment(selectedEndDate).format('DD MMMM YYYY hh:mm A')
			: Strings.pick_end_time.toUpperCase()
	);

	const [isSelected, setIsSelected] = useState(0);

	const handleDateValidation = selectedDate => {
		if (isSelected === 0) {
			if (!isValidDate(selectedDate)) {
				return;
			}
			if (new Date(selectedDate).getTime() > new Date(new Date().getTime())) {
				setDate(selectedDate);
				setSelectedDate(selectedDate);
			} else {
				setSelectedDate(null);
				setDate(Strings.pick_start_time.toUpperCase());
				alert(
					`Please select time greater than ${moment(
						new Date(new Date())
					).format('DD MMMM YYYY hh:mm A')}`
				);
			}
		} else {
			if (!isValidDate(selectedDate)) {
				return;
			}
			if (
				new Date(selectedDate).getTime() > new Date(new Date(date).getTime())
			) {
				setEndDate(selectedDate);
				setEndSelectedDate(selectedDate);
			} else {
				setEndSelectedDate(null);
				setEndDate(Strings.pick_end_time.toUpperCase());
				alert(
					`Please select time greater than ${moment(date).format(
						'DD MMMM YYYY hh:mm A'
					)}`
				);
			}
		}
	};

	return (
		<View style={styles.viewDetails}>
			<View style={styles.infoView}>
				<Text style={styles.titleStyle}>{Strings.set_the_duration}</Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					dateTimePickerRef.current.handlePickDateTime();
					setIsSelected(0);
				}}>
				<View style={styles.viewInput}>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.calendar_today}
						style={styles.leftImg}
					/>
					<Text style={styles.inputStyle}>{date}</Text>
				</View>
			</TouchableOpacity>
			<DatePickerWeb
				selected={
					date === Strings.pick_end_date_time.toUpperCase()
						? moment().add(10, 'minutes').format('YYYY-MM-DDTHH:mm').toString()
						: date
				}
				handleChange={val => {
					console.log('DatePickerWeb', val);
					// setDate(val);
					handleDateValidation(val);
				}}
				ref={dateTimePickerRef}
			/>

			<TouchableOpacity
				style={[
					styles.viewInput,
					{
						opacity: date === Strings.pick_end_date_time.toUpperCase() ? 0.5 : 1
					}
				]}
				onPress={() => {
					dateTimePickerRef.current.handlePickDateTime();
					setIsSelected(1);
				}}>
				<ExpoFastImage
					//resizeMode={ExpoFastImage.resizeMode.contain}
					source={icons.calendar_today}
					style={styles.leftImg}
				/>
				<Text style={styles.inputStyle}>{endDate}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	viewDetails: {
		flexDirection: 'column',
		borderRadius: verticalScale(10),
		backgroundColor: colors.black,
		overflow: 'hidden',
		paddingHorizontal: verticalScale(16),
		paddingVertical: verticalScale(16)
	},
	titleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(8),
		textAlign: 'center',
		flex: 1
	},

	viewInput: {
		width: '100%',
		marginTop: verticalScale(16),
		flexDirection: 'row',
		borderBottomColor: colors.gray,
		borderBottomWidth: 1,
		paddingBottom: verticalScale(Platform.OS === 'web' ? 8 : 0)
	},
	inputStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textAlign: 'left',
		marginBottom: verticalScale(Platform.OS !== 'web' ? 8 : 0),
		...Platform.select({
			web: {
				alignSelf: 'center'
			}
		})
	},
	leftImg: {
		height: 17,
		width: 17,
		marginRight: verticalScale(8),
		marginLeft: verticalScale(2),
		tintColor: colors.white,
		top: Platform.OS === 'ios' ? -2 : 0
	},
	viewOption: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: verticalScale(8),
		paddingBottom: verticalScale(10)
	},
	optionStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginLeft: verticalScale(8),
		flex: 1
	},
	infoView: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(16),
		alignItems: 'center'
	},
	helpImg: {
		height: 20,
		width: 20
	}
});

function DateTimePickerWeb({value, onChange}: Props) {
	return createElement('input', {
		type: 'time',
		value: value,
		onInput: onChange
	});
}

export default SetLiveStreamDurationView;
