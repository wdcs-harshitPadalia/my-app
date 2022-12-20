import React, {useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	ViewStyle,
	Text,
	TextStyle
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import DropdownComponent from './thirdParty/react-native-element-dropdown/src/Dropdown';

interface Props extends TextInputProps {
	style?: ViewStyle;
	errMessage?: string;
	colorArray: any[];
	textStyle?: TextStyle;
	arrayData: any[];
	placeholder?: string;
	selectedBetOdds: (odds: any) => void;
	previousData: any;
}

const GradientDropDownComponent: React.FC<Props> = props => {
	const {
		placeholder,
		isShowError,
		errMessage,
		colorArray,
		arrayData,
		selectedBetOdds,
		previousData
	} = props;
	const [value, setValue] = useState(previousData?.decimal);
	return (
		<View style={[{borderRadius: 8, overflow: 'hidden'}, {...props.style}]}>
			<LinearGradient
				colors={colorArray}
				useAngle={true}
				angle={gradientColorAngle}>
				<View style={[styles.container]}>
					<DropdownComponent
						containerStyle={styles.dropdownView}
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={arrayData}
						search
						maxHeight={300}
						labelField="decimal"
						valueField="decimal"
						placeholder={placeholder}
						searchPlaceholder="Search..."
						value={value}
						onChange={item => {
							setValue(item.decimal);
							selectedBetOdds(item);
						}}
						renderItem={item => (
							<Text style={styles.inputStyle}>{item.decimal}</Text>
						)}
					/>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		margin: verticalScale(8)
	},

	dropdownView: {
		backgroundColor: defaultTheme.backGroundColor,
		borderWidth: 0
	},
	dropdown: {
		flex: 1,
		paddingHorizontal: horizontalScale(10),
		marginVertical: verticalScale(6),
		paddingVertical: 0
	},
	placeholderStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(22),
		fontFamily: Fonts.type.Inter_Bold
	},
	selectedTextStyle: {
		color: colors.white,
		fontSize: moderateScale(22),
		fontFamily: Fonts.type.Inter_Bold
	},
	iconStyle: {
		width: 7.45,
		height: 15,
		tintColor: colors.placeholderColor,
		marginRight: verticalScale(10)
	},
	inputSearchStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		borderRadius: verticalScale(6)
	}
});

export default GradientDropDownComponent;
