import React, {useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ViewStyle,
	TextStyle,
	Pressable,
	TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Month from './Month';
import Button from './Button';
import {defaultTheme} from '../../../theme/defaultTheme';
import ButtonGradient from '../../ButtonGradient';
import colors from '../../../theme/colors';
import Strings from '../../../constants/strings';
import {verticalScale} from '../../../theme';
import ExpoFastImage from 'expo-fast-image';
import icons from '../../../assets/icon';
import fonts from '../../../theme/fonts';
import {gradientColorAngle} from '../../../theme/metrics';
require('moment/min/locales.min');

interface IResponse {
	firstDate: string | moment.Moment;
	secondDate: string | moment.Moment;
}

interface IProps {
	onSelectDateRange: (response: IResponse) => void;
	responseFormat?: string;
	maxDate?: moment.Moment;
	minDate?: moment.Moment;
	blockSingleDateSelection?: boolean;
	font?: string;
	selectedDateContainerStyle?: ViewStyle;
	selectedDateStyle?: TextStyle;
	ln?: string;
	onSSetDateClicked: (response: IResponse) => void;
	oncancel: () => void;
}

const DateRangePicker = ({
	onSelectDateRange,
	responseFormat,
	maxDate,
	minDate,
	blockSingleDateSelection,
	font,
	selectedDateContainerStyle,
	selectedDateStyle,
	onSSetDateClicked,
	oncancel,
	ln = 'en'
}: IProps) => {
	const [selectedDate, setSelectedDate] = useState(moment());

	const [firstDate, setFirstDate] = useState<moment.Moment | null>(null);
	const [secondDate, setSecondDate] = useState<moment.Moment | null>(null);

	const lastMonth = selectedDate.clone().subtract(1, 'months');
	const lastYear = selectedDate.clone().subtract(1, 'years');
	const nextMonth = selectedDate.clone().add(1, 'months');
	const nextYear = selectedDate.clone().add(1, 'years');

	const [dateRange, setDateRange] = useState<IResponse>({});

	moment.locale(ln);

	const returnSelectedRange = (fd: moment.Moment, ld: moment.Moment) => {
		const isWrongSide = ld?.isBefore(fd);

		if (responseFormat) {
			onSelectDateRange({
				firstDate: isWrongSide
					? ld.format(responseFormat)
					: fd.format(responseFormat),
				secondDate: isWrongSide
					? fd.format(responseFormat)
					: ld.format(responseFormat)
			});
			setDateRange({
				firstDate: isWrongSide
					? ld.format(responseFormat)
					: fd.format(responseFormat),
				secondDate: isWrongSide
					? fd.format(responseFormat)
					: ld.format(responseFormat)
			});
		} else {
			onSelectDateRange({
				firstDate: isWrongSide ? ld : fd,
				secondDate: isWrongSide ? fd : ld
			});
			setDateRange({
				firstDate: isWrongSide ? ld : fd,
				secondDate: isWrongSide ? fd : ld
			});
		}
	};

	const onSelectDate = (date: moment.Moment) => {
		if (
			blockSingleDateSelection &&
			(firstDate?.isSame(date, 'dates') || secondDate?.isSame(date, 'dates'))
		) {
			return;
		}

		if (!firstDate) {
			setFirstDate(date);
		} else {
			if (!secondDate) {
				setSecondDate(date);
				returnSelectedRange(firstDate, date);
			} else {
				setFirstDate(secondDate);
				setSecondDate(date);
				returnSelectedRange(secondDate, date);
			}
		}
	};

	const onPressClear = () => {
		setFirstDate(null);
		setSecondDate(null);
		onSelectDateRange({
			firstDate: '',
			secondDate: ''
		});
		oncancel();
	};

	const returnSelectedDateRange = () => {
		onSSetDateClicked(dateRange);
	};

	const isDateSelected = () => firstDate === null || secondDate === null;

	return (
		<View style={{backgroundColor: defaultTheme.backGroundColor}}>
			{/* <View style={styles.titleRow}>
        <Button
          font={font}
          disabled={minDate ? lastYear.isBefore(minDate, 'months') : false}
          // label={`< ${lastYear.format('YYYY')}`}
          label={`< ${lastYear.format('YYYY')}`}
          onPress={() => setSelectedDate(lastYear)}
        />
        <Text style={{...styles.title, fontFamily: font}}>
          {selectedDate.format('YYYY')}
        </Text>
        <Button
          font={font}
          disabled={maxDate ? nextYear.isAfter(maxDate, 'months') : false}
          label={`${nextYear.format('YYYY')} >`}
          onPress={() => setSelectedDate(nextYear)}
          align="right"
        />
      </View> */}

			<View style={styles.titleRow}>
				{/* <Button
          font={font}
          disabled={minDate ? lastMonth.isBefore(minDate, 'months') : false}
          //label={`< ${lastMonth.locale(ln).format('MMM')}`}
          label={`< ${lastMonth.locale(ln).format('MMM')}`}
          onPress={() => setSelectedDate(lastMonth)}
        /> */}

				<View
					style={{
						flexDirection: 'row',
						flex: 1,
						alignItems: 'center',
						//backgroundColor: 'red',
						justifyContent: 'space-between'
						//alignItems: 'flex-end',
					}}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						{/* <Button
              font={font}
              disabled={minDate ? lastYear.isBefore(minDate, 'months') : false}
              // label={`< ${lastYear.format('YYYY')}`}
              label={`< ${lastYear.format('YYYY')}`}
              onPress={() => setSelectedDate(lastYear)}
            // /> */}
						<TouchableOpacity
							hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
							style={{paddingRight: 5}}
							disabled={minDate ? lastYear.isBefore(minDate, 'months') : false}
							// label={`< ${lastYear.format('YYYY')}`}
							onPress={() => setSelectedDate(lastYear)}>
							{/* <Text
                style={{
                  ...styles.title,
                  fontFamily: font,
                  fontSize: 30,
                  width: 20,
                  opacity: minDate
                    ? lastYear.isBefore(minDate, 'months')
                      ? 0.2
                      : 1
                    : 1,
                }}>{`<`}</Text> */}
							<ExpoFastImage
								style={[
									styles.iconStyle,
									{
										opacity: minDate
											? lastYear.isBefore(minDate, 'months')
												? 0.2
												: 1
											: 1
									}
								]}
								resizeMode="cover"
								// source={{uri: profileImgPath}}
								source={icons.ic_previous}
							/>
						</TouchableOpacity>

						<Text style={{...styles.title, fontFamily: font}}>
							{selectedDate.locale(ln).format('MMMM')}{' '}
							{selectedDate.format('YYYY')}
						</Text>

						<TouchableOpacity
							style={{paddingLeft: 5}}
							hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
							disabled={maxDate ? nextYear.isAfter(maxDate, 'months') : false}
							// label={`< ${lastYear.format('YYYY')}`}
							onPress={() => setSelectedDate(nextYear)}>
							{/* <Text
                style={{
                  ...styles.title,
                  fontFamily: font,
                  fontSize: 30,
                  width: 20,
                  opacity: maxDate
                    ? nextYear.isAfter(maxDate, 'months')
                      ? 0.2
                      : 1
                    : 1,
                }}>{`>`}</Text> */}
							<ExpoFastImage
								style={[
									styles.iconStyle,
									{
										opacity: maxDate
											? nextYear.isAfter(maxDate, 'months')
												? 0.2
												: 1
											: 1
									}
								]}
								resizeMode="cover"
								// source={{uri: profileImgPath}}
								source={icons.ic_next}
							/>
						</TouchableOpacity>

						{/* <Button
              font={font}
              disabled={maxDate ? nextYear.isAfter(maxDate, 'months') : false}
              label={`${nextYear.format('YYYY')} >`}
              onPress={() => setSelectedDate(nextYear)}
              align="right"
            /> */}
					</View>

					<View style={{flexDirection: 'row'}}>
						<TouchableOpacity
							style={{paddingRight: 20}}
							hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
							disabled={minDate ? lastMonth.isBefore(minDate, 'months') : false}
							onPress={() => setSelectedDate(lastMonth)}>
							{/* <Text
                style={{
                  ...styles.title,
                  fontFamily: font,
                  fontSize: 30,
                  width: 20,
                  opacity: minDate
                    ? lastMonth.isBefore(minDate, 'months')
                      ? 0.2
                      : 1
                    : 1,
                }}>{`<`}</Text> */}
							<ExpoFastImage
								style={[
									styles.iconStyle,
									{
										opacity: minDate
											? lastMonth.isBefore(minDate, 'months')
												? 0.2
												: 1
											: 1
									}
								]}
								resizeMode="cover"
								// source={{uri: profileImgPath}}
								source={icons.ic_previous}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
							disabled={maxDate ? nextMonth.isAfter(maxDate, 'months') : false}
							onPress={() => setSelectedDate(nextMonth)}>
							{/* <Text
                style={{
                  ...styles.title,
                  fontFamily: font,
                  fontSize: 30,
                  width: 20,
                  opacity: maxDate
                    ? nextMonth.isAfter(maxDate, 'months')
                      ? 0.2
                      : 1
                    : 1,
                }}>{`>`}</Text> */}
							<ExpoFastImage
								style={[
									styles.iconStyle,
									{
										opacity: maxDate
											? nextMonth.isAfter(maxDate, 'months')
												? 0.2
												: 1
											: 1
									}
								]}
								resizeMode="cover"
								// source={{uri: profileImgPath}}
								source={icons.ic_next}
							/>
						</TouchableOpacity>
					</View>
					{/* <Button
            font={font}
            disabled={maxDate ? nextMonth.isAfter(maxDate, 'months') : false}
            label={`<`}
            onPress={() => setSelectedDate(nextMonth)}
            //align="right"
          />
          <Button
            font={font}
            disabled={maxDate ? nextMonth.isAfter(maxDate, 'months') : false}
            //label={`${nextMonth.locale(ln).format('MMM')} >`}
            label={`>`}
            onPress={() => setSelectedDate(nextMonth)}
            //align="right"
          /> */}
				</View>
			</View>
			<Month
				font={font}
				selectedDate={selectedDate}
				onSelectDate={onSelectDate}
				firstDate={firstDate}
				secondDate={secondDate}
				maxDate={maxDate}
				minDate={minDate}
				selectedDateContainerStyle={selectedDateContainerStyle}
				selectedDateStyle={selectedDateStyle}
			/>
			{/* <View style={styles.clearContainer}>
        <Pressable
          disabled={isDateSelected()}
          onPress={onPressClear}
          style={[styles.clearBtn, {opacity: isDateSelected() ? 0.4 : 1}]}>
          <Text style={{fontFamily: font, color: 'white'}}>Clear</Text>
        </Pressable>
      </View> */}
			<View style={styles.viewBackButton}>
				<ButtonGradient
					//onPress={callBackButton}
					onPress={onPressClear}
					btnDisabled={isDateSelected()}
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={Strings.cancel}
					style={{
						flex: 0.5,
						marginVertical: verticalScale(4),
						opacity: isDateSelected() ? 0.4 : 1
					}}
				/>
				<ButtonGradient
					//onPress={callNext}
					onPress={returnSelectedDateRange}
					btnDisabled={isDateSelected()}
					colorArray={defaultTheme.secondaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={Strings.set_date}
					style={{
						marginLeft: verticalScale(16),
						marginVertical: verticalScale(4),
						flex: 0.5,
						opacity: isDateSelected() ? 0.4 : 1
					}}
					//btnDisabled={isBackButtonDisable}
				/>
			</View>
		</View>
	);
};

export default DateRangePicker;

const styles = StyleSheet.create({
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: defaultTheme.backGroundColor,
		marginBottom: 5,
		padding: 5,
		borderRadius: 5
	},
	title: {
		fontSize: 20,
		//flex: 1,
		textAlign: 'center',
		color: 'white',
		fontFamily: fonts.type.Inter_SemiBold
	},
	clearBtn: {
		paddingVertical: 3,
		paddingHorizontal: 10
	},
	clearContainer: {
		flexDirection: 'row-reverse',
		paddingVertical: 5
	},
	viewBackButton: {
		flexDirection: 'row',
		paddingVertical: verticalScale(10),
		paddingHorizontal: verticalScale(16)
	},
	backButton: {
		flex: 0.5,
		marginVertical: verticalScale(4)
	},
	nextButton: {
		marginLeft: verticalScale(16),
		marginVertical: verticalScale(4),
		flex: 0.5
	},
	iconStyle: {
		height: 17,
		width: 10
	}
});
