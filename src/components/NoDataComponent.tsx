import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {Fonts} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {
	gradientColorAngle,
	height,
	horizontalScale,
	moderateFontScale,
	verticalScale,
	width
} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface NoDataProps {
	image_url: any;
	title_text: string;
	description_text: string;
	shouldShowButton?: boolean;
	onButtonPress?: () => void;
}

interface Props {
	noData: NoDataProps;
	isFromFeedScreen?: boolean;
	shouldShowButton?: boolean;
	onButtonPress?: () => void;
	btnTitle?: string;
	colorArray?: string[];
}

const NoDataComponent = (props: Props) => {
	const {
		noData,
		isFromFeedScreen,
		shouldShowButton,
		onButtonPress,
		btnTitle,
		colorArray
	} = props;
	return (
		<View
			style={[
				isFromFeedScreen
					? {
							flex: 1,

							alignItems: 'center'
					  }
					: styles.container
			]}>
			<ExpoFastImage
				source={noData.image_url}
				style={styles.imageIcon}
				resizeMode={'contain'}
			/>
			<Text style={styles.titleText}>{noData.title_text}</Text>
			<Text style={styles.descriptionText}>{noData.description_text}</Text>
			{shouldShowButton && (
				<ButtonGradient
					colorArray={colorArray ?? defaultTheme.primaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={btnTitle ?? 'Start a new chat'}
					style={styles.buttonInputStyle}
					onPress={onButtonPress}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// width: width,
		// height: height,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonInputStyle: {
		marginVertical: verticalScale(20)
	},
	imageIcon: {
		height: verticalScale(240),
		width: horizontalScale(240)
	},
	titleText: {
		fontSize: moderateFontScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center'
		// marginHorizontal: horizontalScale(58),
	},
	descriptionText: {
		fontSize: moderateFontScale(16),
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '500',
		textAlign: 'center',
		marginTop: verticalScale(10),
		marginHorizontal: horizontalScale(44)
	}
});

export default NoDataComponent;
