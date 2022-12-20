import React, {useEffect} from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	TouchableOpacity
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import ExpoFastImage from 'expo-fast-image';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import GradientText from './GradientText';
interface Props extends TextInputProps {
	leftIcon?: ImageSourcePropType;
	onPress?: () => void;
	title: string;
	isGradient?: boolean;
}
const LeagueView: React.FC<Props> = props => {
	const {leftIcon, title, isGradient, onPress} = props;

	useEffect(() => {
		console.log('leftIcon', leftIcon);
	}, [leftIcon]);
	return (
		<TouchableOpacity
			style={[styles.container, {...props.style}]}
			onPress={onPress}>
			{leftIcon ? (
				<ExpoFastImage
					resizeMode={'contain'}
					source={leftIcon}
					style={styles.left1Img}
				/>
			) : null}

			{isGradient ? (
				<GradientText
					colors={defaultTheme.primaryGradientColor}
					style={styles.titleStyle}>
					{title}
				</GradientText>
			) : (
				<Text style={leftIcon ? styles.titleStyle : styles.titleWithSpaceStyle}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: verticalScale(6)
	},
	titleStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold
	},

	titleWithSpaceStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginLeft: verticalScale(25)
	},

	left1Img: {
		height: verticalScale(15),
		width: verticalScale(15),
		marginRight: verticalScale(10)
	}
});
export default LeagueView;
