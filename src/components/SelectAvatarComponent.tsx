import React, {useEffect, useRef} from 'react';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInputProps,
	FlatList
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import Strings from '../constants/strings';
import {ImageIndicator} from '../constants/utils/Function';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import fonts from '../theme/fonts';
import {
	horizontalScale,
	screenWidth,
	screenHeight,
	verticalScale
} from '../theme/metrics';

interface Props extends TextInputProps {
	isVisible: boolean;
	onPressSelectSheet: (data: any) => void;
	avtarDataArray: any[];
}

const numColumns = 3;
const size = screenWidth / numColumns - horizontalScale(4);

const SelectAvatarComponent: React.FC<Props> = props => {
	const refRBSheet = useRef();

	const {isVisible, onPressSelectSheet, avtarDataArray} = props;

	useEffect(() => {
		isVisible && refRBSheet.current.open();
		!isVisible && refRBSheet.current.close();
	}, [isVisible]);

	const renderAvtarItem = ({item}) => {
		return (
			<TouchableOpacity
				key={item._id}
				onPress={() => onPressSelectSheet(item?.img)}
				activeOpacity={0.6}>
				<ImageIndicator
					source={{uri: item.img}}
					resizeMode="cover"
					style={styles.imgIconStyle}
					indicatorProps={styles.indicatorStyle}
				/>
			</TouchableOpacity>
		);
	};

	return (
		<RBSheet
			ref={refRBSheet}
			onClose={() => {
				onPressSelectSheet(undefined);
			}}
			closeOnDragDown={true}
			closeOnPressMask={false}
			customStyles={{
				container: {
					backgroundColor: defaultTheme.backGroundColor,
					height: screenHeight - verticalScale(100),
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10
				}
			}}>
			<TouchableOpacity
				onPress={() => {
					refRBSheet.current.close();
				}}
				activeOpacity={0.6}>
				<Text style={styles.cancleText}>{Strings.cancel}</Text>
			</TouchableOpacity>
			<FlatList
				data={avtarDataArray}
				renderItem={renderAvtarItem}
				keyExtractor={item => item._id}
				numColumns={numColumns}
				showsVerticalScrollIndicator={false}
			/>
		</RBSheet>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	imgIconStyle: {
		width: size,
		height: size,
		marginHorizontal: horizontalScale(2),
		marginVertical: verticalScale(2)
	},
	indicatorStyle: {
		size: 40,
		borderWidth: 0,
		color: colors.gray,
		unfilledColor: colors.grayLightText
	},
	cancleText: {
		fontSize: 20,
		marginStart: horizontalScale(18),
		marginBottom: verticalScale(12),
		color: '#FFFFFF',
		fontFamily: fonts.type.Inter_Medium
	}
});

export default SelectAvatarComponent;
