import React from 'react';
import {Dimensions} from 'react-native';
import {
	View,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import {ImageIndicator} from '../constants/utils/Function';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	title: string;
	imgPath?: string;
	onPress?: () => void;
	isSelected?: boolean;
}

const SportsCategory: React.FC<Props> = props => {
	const {title, imgPath, onPress, isSelected} = props;

	return (
		<DropShadow
			style={[
				styles.container
				// {
				//   shadowColor:
				//     isSelected === true ? 'rgba(189, 0, 255, 1)' : colors.black,
				// },
			]}>
			<TouchableOpacity activeOpacity={1} onPress={onPress}>
				<View style={{overflow: 'hidden'}}>
					<ImageIndicator
						source={{uri: imgPath}}
						resizeMode="cover"
						imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
						style={styles.imageBgStyle}
						indicatorProps={{
							size: 40,
							borderWidth: 0,
							color: colors.gray,
							unfilledColor: colors.grayLightText
						}}
					/>
				</View>
				{isSelected ? (
					<LinearGradient
						useAngle={true}
						angle={gradientColorAngle}
						colors={defaultTheme.primaryGradientColor}
						style={styles.bgGradient}
					/>
				) : null}
				<Text style={styles.titleStyle} numberOfLines={1} ellipsizeMode="tail">
					{title}
				</Text>
			</TouchableOpacity>
		</DropShadow>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		borderRadius: 10,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		margin: 8,
		width: Dimensions.get('screen').width * 0.43,
		backgroundColor: defaultTheme.backGroundColor,
		justifyContent: 'center'
		// alignItems: 'center',
		// overflow: 'hidden'
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		padding: horizontalScale(10),
		width: '100%',
		textAlign: 'center'
	},
	imageBgStyle: {
		width: '100%',
		height: Dimensions.get('screen').width * 0.35
	},
	bgGradient: {
		width: '100%',
		height: Dimensions.get('screen').width * 0.35,
		position: 'absolute',
		opacity: 0.4,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	}
});

export default SportsCategory;
