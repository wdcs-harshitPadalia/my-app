import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	View,
	TextStyle,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import ExpoFastImage from 'expo-fast-image';
import colors from '../theme/colors';
import Strings from '../constants/strings';
import {getRoundDecimalValue} from '../constants/utils/Function';
interface Props extends TextInputProps {
	leftIconPath?: ImageSourcePropType;
	style?: any;
	buttonText?: string;
	buttonTextcolor?: string;
	onPress?: () => void;
	textType?: string;
	textSize?: number;
	colorArray?: [];
	angle?: number;
	title: string;
	subtitle: string;
	balance: string | number;
	currentUsdBalance: string | number;
	balanceTextStyle?: TextStyle;
	titleTextStyle?: TextStyle;
	subTitleTextStyle?: TextStyle;
	usdBalanceTextStyle?: TextStyle;
	isLoading?: boolean;
}
const CurrencyBalanceVIew: React.FC<Props> = props => {
	const {
		leftIconPath,
		onPress,
		title,
		subtitle,
		balance,
		currentUsdBalance,
		isLoading
	} = props;

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, {...props.style}]}>
			<View style={styles.rawWithCenterContainer}>
				{isLoading ? (
					<ActivityIndicator size={'small'} color={colors.white} />
				) : (
					<View style={styles.contentStyle}>
						<ExpoFastImage
							resizeMode={'contain'}
							// source={leftIconPath}
							source={{uri: leftIconPath}}
							style={styles.left1Img}
						/>
						<Text style={[styles.currencyStyle, props.balanceTextStyle]}>
							{balance}
						</Text>
						<Text style={[styles.currencyStyle, props.titleTextStyle]}>
							{title}
						</Text>
						<Text style={[styles.AmountStyle, props.subTitleTextStyle]}>
							{subtitle}
						</Text>
						<Text style={[styles.usdStyle, props.usdBalanceTextStyle]}>
							{`≈ ${Strings.str_dollor}${getRoundDecimalValue(
								currentUsdBalance
							)}`}
						</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: verticalScale(6),
		paddingHorizontal: verticalScale(12),
		flex: 1
	},
	rawWithCenterContainer: {flexDirection: 'row', alignItems: 'center'},
	contentStyle: {flexDirection: 'row', alignItems: 'center'},
	left1Img: {
		height: 26,
		width: 26,
		borderRadius: 13
	},
	currencyStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Medium,
		marginLeft: horizontalScale(8)
	},
	AmountStyle: {
		fontSize: moderateScale(22),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginLeft: horizontalScale(8)
	},
	usdStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginLeft: horizontalScale(8)
		//flex: 1,
		//textAlign: 'right',
	}
});
export default CurrencyBalanceVIew;
