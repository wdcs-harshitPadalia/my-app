import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
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
	description_text2?: string;
	highlightText?: string;
}

interface Props {
	noData: NoDataProps;
	isFromFeedScreen?: boolean;
	shouldShowButton?: boolean;
	onButtonPress?: () => void;
	btnTitle?: string;
	colorArray?: string[];
	isFromWithdrawal?: boolean;
}

const NoDataComponent = (props: Props) => {
	const {
		noData,
		isFromFeedScreen,
		shouldShowButton,
		onButtonPress,
		btnTitle,
		colorArray,
		isFromWithdrawal = false
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
			{isFromWithdrawal ? (
				<Text style={styles.descriptionText(colors.white)}>
					{noData.description_text}
					<Text
						style={[
							styles.descriptionText(colors.red),
							{fontWeight: '700', marginHorizontal: 0}
						]}>
						{' ' + noData.highlightText + ' '}
					</Text>
					<Text>{noData.description_text2}</Text>
				</Text>
			) : (
				<Text style={styles.descriptionText(colors.textTitle)}>
					{noData.description_text}
				</Text>
			)}
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
		marginVertical: verticalScale(20),
		...Platform.select({
			web: {
				width: '100%'
			}
		})
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
	descriptionText: (color: string) => ({
		fontSize: moderateFontScale(16),
		color: color,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '500',
		textAlign: 'center',
		marginTop: verticalScale(10),
		marginHorizontal: horizontalScale(44)
	})
});

export default NoDataComponent;
