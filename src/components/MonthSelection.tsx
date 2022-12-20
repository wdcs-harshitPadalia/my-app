import React, {useEffect, useRef, useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	View
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import colors from '../theme/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {defaultTheme} from '../theme/defaultTheme';
import DateRangePickerModel from './DateRangePickerModel';

interface Props extends TextInputProps {
	leftIconPath?: ImageSourcePropType;
	style?: any;
	buttonText?: any;
	buttonTextcolor?: string;
	textType?: string;
	textSize?: number;
	colorArray?: [];
	angle?: number;
	dataSource?: any[];
}

const MonthSelection: React.FC<Props> = props => {
	const {leftIconPath, buttonText, onPress} = props;

	const refRBSheet = useRef();
	const [text, setText] = useState(props?.dataSource[0]);
	const [height, setHeight] = useState(0);
	const [openDateRange, setOpenDateRange] = useState(false);

	useEffect(() => {
		if (typeof buttonText === 'object') {
			setText(`${buttonText.firstDate} - ${buttonText.secondDate}`);
		} else {
			setText(buttonText);
		}
	}, [buttonText]);

	const lapsList = () => {
		return props.dataSource?.map((data, index) => {
			return (
				<TouchableOpacity
					key={index}
					onLayout={event => {
						if (index === 0) {
							// console.log(
							//   event.nativeEvent.layout.height,
							//   'event.nativeEvent.layout.height??',
							// );
							setHeight(event.nativeEvent.layout.height);
						}
					}}
					onPress={() => {
						if (data === 'Custom date range') {
							setOpenDateRange(true);
						} else {
							setText(data);
							onPress(data);
							refRBSheet?.current?.close();
						}
					}}
					style={styles.container}>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.calendar_today}
						style={styles.calenderImg}
					/>
					<Text style={styles.monthNameStyle}>{data}</Text>
				</TouchableOpacity>
			);
		});
	};
	return (
		<View style={[{...props.style}, styles.container]}>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					refRBSheet?.current?.open();
				}}>
				{leftIconPath !== undefined ? (
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.calendar_today}
						style={styles.leftImg}
					/>
				) : null}

				<Text style={styles.userNameStyle}>{text}</Text>
				<ExpoFastImage
					resizeMode={'contain'}
					source={icons.downGray}
					style={styles.rightImg}
				/>
			</TouchableOpacity>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: 'transparent'
					},
					draggableIcon: {
						backgroundColor: colors.placeholderColor
					},
					container: {
						backgroundColor: defaultTheme.backGroundColor,
						height: (height + 14) * props?.dataSource?.length,
						paddingBottom: 24
					}
				}}>
				{lapsList()}
				{openDateRange && (
					<DateRangePickerModel
						onPress={response => {
							if (response) {
								setText(`${response.firstDate} - ${response.secondDate}`);
								onPress(response);
								setOpenDateRange(false);
								refRBSheet?.current?.close();
							} else {
								onPress();
								setOpenDateRange(false);
								refRBSheet?.current?.close();
							}
						}}
					/>
				)}
			</RBSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: verticalScale(8)
	},
	leftImg: {
		height: 15,
		width: 15,
		marginRight: verticalScale(10)
	},
	rightImg: {
		height: 10,
		width: 10,
		marginHorizontal: verticalScale(10)
	},
	userNameStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold
		// marginHorizontal: verticalScale(10),
	},
	monthNameStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		padding: 15
	},
	calenderImg: {
		height: 15,
		width: 15,
		marginLeft: verticalScale(30)
	},
	selectedDateContainerStyle: {
		height: 35,
		width: '125%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: defaultTheme.primaryColor,
		borderRadius: 8
	},
	selectedDateStyle: {
		fontWeight: 'bold',
		color: 'white',
		backgroundColor: defaultTheme.primaryColor,
		width: 25,
		// height: 30,
		padding: 4,
		textAlign: 'center',
		borderRadius: 8,
		overflow: 'hidden'
	}
});

export default MonthSelection;
