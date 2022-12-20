import React, {useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import {Switch} from 'react-native-elements/dist/switch/switch';
import {SafeAreaView} from 'react-native-safe-area-context';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';

interface Props extends TextInputProps {
	onMenuPress?: () => void;
	title?: string;
	isEnabled?: boolean;
	selectedType?: string;
}

const SelectWhoCan: React.FC<Props> = props => {
	const {onMenuPress, title, selectedType} = props;
	return (
		<TouchableOpacity style={styles.container} onPress={onMenuPress}>
			<Text style={styles.titleStyle}>{title}</Text>
			<Text style={styles.nameStyle}>{selectedType}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(16),
		marginVertical: horizontalScale(10)
	},
	titleStyle: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_Bold,
		fontSize: moderateScale(12),
		alignSelf: 'center',
		flex: 1
	},
	nameStyle: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_Bold,
		fontSize: moderateScale(12),
		alignSelf: 'center',
		textTransform: 'capitalize'
	}
});

export default SelectWhoCan;
