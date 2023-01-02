import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import fonts from '../theme/fonts';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import GradientText from './GradientText';

export interface NotificationProps {
	imgPath?: any;
	title?: string;
	buttonTitle?: string;
	onPressButton?: () => void;
	description1?: string;
	highlightedDescription?: string;
	description2?: string;
	isTitleGradient?: boolean;
	isDescriptionGradient?: boolean;
	color?: string;
}

const NotificationPopUpComponent: React.FC<NotificationProps> = props => {
	const {
		imgPath,
		title,
		buttonTitle,
		onPressButton,
		description1,
		description2,
		isTitleGradient,
		isDescriptionGradient,
		color,
		highlightedDescription
	} = props;
	return (
		<View style={styles.container}>
			<FastImage style={styles.img} resizeMode="contain" source={imgPath} />
			{isTitleGradient ? (
				Platform.OS === 'web' ? (
					<Text
						style={[
							styles.titleText,
							{color: defaultTheme.primaryGradientColor[0]}
						]}>
						{title}
					</Text>
				) : (
					<GradientText
						colors={defaultTheme.primaryGradientColor}
						style={styles.titleText}>
						{title}
					</GradientText>
				)
			) : (
				<Text style={styles.titleText}>{title}</Text>
			)}

			<View style={styles.descriptionView}>
				{isDescriptionGradient &&
					(Platform.OS === 'web' ? (
						<Text
							style={[
								styles.gradientTextStyle,
								{color: defaultTheme.primaryGradientColor[0]}
							]}>
							{highlightedDescription?.toUpperCase()}
						</Text>
					) : (
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={styles.gradientTextStyle}>
							{highlightedDescription?.toUpperCase()}
						</GradientText>
					))}
				<Text style={styles.descriptionText(colors?.white)}>
					{!isDescriptionGradient && (
						<Text style={styles.descriptionText(color)}>
							{highlightedDescription?.toUpperCase()}
						</Text>
					)}
					{' ' + description1}
				</Text>
			</View>
			<Text style={styles.description2Text}>{description2}</Text>

			<ButtonGradient
				onPress={onPressButton}
				colorArray={defaultTheme.primaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={buttonTitle}
				style={styles.buttonView}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		borderRadius: verticalScale(8),
		paddingHorizontal: verticalScale(10)
	},
	img: {
		height: verticalScale(80),
		width: verticalScale(80),
		alignSelf: 'center',
		marginTop: verticalScale(16)
	},
	titleText: {
		color: colors.white,
		fontSize: verticalScale(18),
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		paddingTop: verticalScale(7),
		alignSelf: 'center'
	},
	descriptionView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		paddingTop: verticalScale(7)
	},
	gradientTextStyle: {
		fontSize: verticalScale(16),
		fontFamily: fonts.type.Inter_Medium,
		textAlign: 'center'
	},
	descriptionText: (color: string) => ({
		color: color,
		fontSize: verticalScale(16),
		fontFamily: fonts.type.Inter_Medium,
		textAlign: 'center'
	}),
	description2Text: {
		color: colors.white,
		fontSize: verticalScale(16),
		fontFamily: fonts.type.Inter_Medium,
		textAlign: 'center',
		paddingTop: verticalScale(20)
	},
	buttonView: {
		marginHorizontal: verticalScale(77),
		marginVertical: verticalScale(22)
	}
});

export default NotificationPopUpComponent;
