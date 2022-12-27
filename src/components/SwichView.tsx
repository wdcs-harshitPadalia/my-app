import React, {useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	View,
	Switch
} from 'react-native';
// import {Switch} from 'react-native-elements/dist/switch/switch';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';

interface Props extends TextInputProps {
	toggleSwitch?: () => void;
	title?: string;
	isEnabled?: boolean;
}

const SwichView: React.FC<Props> = props => {
	const {toggleSwitch, title, isEnabled} = props;
	return (
		<View style={styles.container}>
			<Text style={styles.nameStyle}>{title}</Text>
			<Switch
				trackColor={{false: colors.handleColor, true: colors.corallight}}
				thumbColor={isEnabled ? colors.parrot : colors.handleColor}
				ios_backgroundColor={colors.handleColor}
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginHorizontal: verticalScale(16),
	},
	nameStyle: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_Bold,
		fontSize: moderateScale(12),
		alignSelf: 'center',
		flex: 1
	}
});

export default SwichView;
