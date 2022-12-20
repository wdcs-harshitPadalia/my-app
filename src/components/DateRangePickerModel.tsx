import React, {useEffect, useRef, useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	View,
	Platform
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import {BottomSheet, ListItem} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {defaultTheme} from '../theme/defaultTheme';
import DateRangePicker from './custom/DateRangePicker';
import moment from 'moment';

interface IResponse {
	firstDate: string | moment.Moment;
	secondDate: string | moment.Moment;
}

interface Props extends TextInputProps {
	leftIconPath?: ImageSourcePropType;
	style?: any;
	buttonText?: string;
	buttonTextcolor?: string;
	onPress: (data: IResponse) => void;
	textType?: string;
	textSize?: number;
	colorArray?: [];
	angle?: number;
	dataSource?: any[];
}

const DateRangePickerModel: React.FC<Props> = props => {
	const {
		leftIconPath,
		buttonText,
		buttonTextcolor,
		textType,
		textSize,
		onPress,
		colorArray,
		angle,
		dataSource
	} = props;

	const [isVisible, setIsVisible] = useState(false);
	const refRBSheet = useRef();
	//const [text, setText] = useState(props.dataSource[0]);
	const [height, setHeight] = useState(0);

	const [selectedRange, setRange] = useState({});

	useEffect(() => {
		// console.log('selectedRange??', selectedRange);
		refRBSheet.current.open();
	}, [selectedRange]);

	return (
		<View style={[{...props.style}, styles.container]}>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				onClose={() => {
					//refRBSheet.current.close();
					props.onPress(null);
				}}
				customStyles={{
					wrapper: {
						backgroundColor: 'transparent'
					},
					draggableIcon: {
						backgroundColor: colors.placeholderColor
					},
					container: {
						backgroundColor: defaultTheme.backGroundColor,
						//height: 430,
						paddingBottom: Platform.OS === 'ios' ? 0 : 100,
						paddingHorizontal: horizontalScale(20),
						...Platform.select({
							ios: {
								flexGrow: 1
							},
							android: {
								flex: 1
							}
						})
					}
				}}>
				<View style={{backgroundColor: 'white'}}>
					<DateRangePicker
						onSelectDateRange={range => {
							setRange(range);
						}}
						blockSingleDateSelection={true}
						responseFormat="YYYY-MM-DD"
						maxDate={moment()}
						minDate={moment().subtract(60, 'days')}
						selectedDateContainerStyle={styles.selectedDateContainerStyle}
						selectedDateStyle={styles.selectedDateStyle}
						onSSetDateClicked={response => {
							console.log('onSSetDateClicked?>>>>>', response);
							onPress(response);
							refRBSheet.current.close();
						}}
						oncancel={() => {
							refRBSheet.current.close();
							props.onPress(null);
						}}
						font={Fonts.type.Inter_SemiBold}
					/>
				</View>
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
		//backgroundColor: defaultTheme.primaryColor,
		width: 25,
		// height: 30,
		padding: 4,
		textAlign: 'center',
		borderRadius: 8,
		overflow: 'hidden'
	}
});

export default DateRangePickerModel;
