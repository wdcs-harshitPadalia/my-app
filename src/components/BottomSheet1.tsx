import React, {useEffect, useRef, useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	View,
	Alert
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import {BottomSheet, ListItem} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {defaultTheme} from '../theme/defaultTheme';

interface Props {
	leftIconPath?: ImageSourcePropType;
	style?: any;
	buttonText?: string;
	buttonTextcolor?: string;
	onPress: (data) => void;
	textType?: string;
	textSize?: number;
	colorArray?: [];
	angle?: number;
	dataSource?: any[];
	isOpen?: boolean;
}

const BottomSheet1: React.FC<Props> = props => {
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
	const [text, setText] = useState(props.dataSource[0]);

	const [height, setHeight] = useState(0);

	useEffect(() => {
		// if (props.isOpen === false) {
		//   refRBSheet.current.close();
		// } else {
		props.isOpen && refRBSheet.current.open();
		!props.isOpen && refRBSheet.current.close();
		//}
	}, [props.isOpen]);

	const lapsList = () => {
		return props.dataSource?.map((data, index) => {
			return (
				<TouchableOpacity
					key={data.id}
					onPress={() => {
						onPress(data);
						setText(data.text);
						//refRBSheet.current.close();
					}}
					onLayout={event => {
						if (index == 0) {
							// console.log(
							//   event.nativeEvent.layout.height,
							//   'event.nativeEvent.layout.height??',
							// );
							setHeight(event.nativeEvent.layout.height);
						}
					}}
					style={styles.container}>
					{/* <ExpoFastImage
            resizeMode={'contain'}
            source={icons.calendar_today}
            style={styles.calenderImg}
          /> */}
					<Text style={styles.monthNameStyle}>{data.text}</Text>
				</TouchableOpacity>
			);
		});
	};
	return (
		<View style={[{...props.style}, styles.container]}>
			{/* <TouchableOpacity
        style={styles.container}
        onPress={() => {
          refRBSheet.current.open();
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
      </TouchableOpacity> */}
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				onClose={() => {
					onPress(undefined);
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
						height: (height + 12) * props.dataSource?.length + 48,
						paddingBottom: 24
					}
				}}>
				{lapsList()}
			</RBSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
		//marginHorizontal: verticalScale(8),
		// flex: 1
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
		fontSize: moderateScale(14),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		padding: 12
	},
	calenderImg: {
		height: 15,
		width: 15,
		marginLeft: verticalScale(30)
	}
});

export default BottomSheet1;
