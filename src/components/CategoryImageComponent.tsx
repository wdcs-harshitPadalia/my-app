import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	ViewStyle
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import {ImageIndicator} from '../constants/utils/Function';
import {Fonts, moderateScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import DropShadow from 'react-native-drop-shadow';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	title: string;
	imgPath?: string;
	onPress?: () => void;
	isShadow: boolean;
	selectedCount: number;
}

const CategoryImageComponent: React.FC<Props> = props => {
	const {title, imgPath, onPress, isShadow, selectedCount, style} = props;
	return (
		<DropShadow
			style={[
				isShadow ? styles.containerWithShadow : styles.containerWithOutShadow,
				style
			]}>
			{/* <View
        style={
          isShadow ? styles.containerWithShadow : styles.containerWithOutShadow
        }> */}
			<TouchableOpacity
				activeOpacity={1}
				onPress={onPress}
				style={{overflow: 'hidden'}}>
				<View>
					<ImageIndicator
						resizeMode="cover"
						source={{uri: imgPath}}
						style={[styles.imageBgStyle, props.style ?? {width: 'auto'}]}
						indicatorProps={{
							size: 40,
							borderWidth: 0,
							color: colors.gray,
							unfilledColor: colors.grayLightText
						}}
					/>

					{isShadow ? (
						<LinearGradient
							useAngle={true}
							angle={gradientColorAngle}
							colors={defaultTheme.primaryGradientColor}
							style={styles.bgGradient}
						/>
					) : null}
				</View>
			</TouchableOpacity>
			{/* </View> */}
		</DropShadow>
	);
};

const styles = StyleSheet.create({
	containerWithShadow: {
		flexDirection: 'column',
		borderRadius: 10,
		shadowColor: 'rgba(189, 0, 255, 1)',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		margin: 8,
		width: 100,
		height: 110
	},
	containerWithOutShadow: {
		flexDirection: 'column',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		margin: 8,
		width: 100,
		height: 110
	},
	bgGradient: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		opacity: 0.4,
		borderRadius: 10,
		overflow: 'hidden'
	},
	imageBgStyle: {
		width: 100,
		height: 100,
		borderRadius: 10,
		overflow: 'hidden'
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Bold,
		textAlign: 'center',
		marginHorizontal: 2
	},

	viewSportName: {
		height: 31,
		backgroundColor: defaultTheme.backGroundColor,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		justifyContent: 'center'
	},
	countGradient: {
		width: 24,
		height: 24,
		position: 'absolute',
		opacity: 1,
		borderRadius: 12,
		justifyContent: 'center',
		right: 5,
		top: 5
	}
});

export default CategoryImageComponent;
