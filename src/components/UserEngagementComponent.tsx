import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Platform,
	ImageSourcePropType
} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../theme';
import {defaultTheme} from '../theme/defaultTheme';
import fonts from '../theme/fonts';
import ExpoFastImage from 'expo-fast-image';
import GradientText from './GradientText';
import icons from '../assets/icon';
import colors from '../theme/colors';
import Strings from '../constants/strings';

interface DataProps {
	title?: string;
	description1?: string;
	description2?: string;
	highlightedText?: string;
	image?: ImageSourcePropType;
}

interface Props {
	data: DataProps;
}

const UserEngagementComponent: React.FC<Props> = props => {
	const {data} = props;

	return (
		<>
			<View style={styles.container}>
				{Platform.OS === 'web' ? (
					<Text
						style={[
							styles.gradientTextStyle,
							{color: defaultTheme.primaryGradientColor[0]}
						]}>
						{data?.title.toUpperCase()}
					</Text>
				) : (
					<GradientText
						colors={defaultTheme.primaryGradientColor}
						style={styles.gradientTextStyle}>
						{data?.title.toUpperCase()}
					</GradientText>
				)}

				<View style={styles.titleView}>
					<Text style={[styles.descriptionTextStyle]}>
						{data?.description1}

						{Platform.OS === 'web' ? (
							<Text
								style={[
									styles.gradientStyle,
									{color: defaultTheme.primaryGradientColor[0]}
								]}>
								{' ' + data?.highlightedText + ' '}
							</Text>
						) : (
							<GradientText
								colors={defaultTheme.primaryGradientColor}
								style={styles.gradientStyle}>
								{' ' + data?.highlightedText + ' '}
							</GradientText>
						)}
						<Text style={styles.descriptionTextStyle}>
							{data?.description2}
						</Text>
					</Text>
				</View>

				<ExpoFastImage
					source={data?.image}
					style={styles.imageIcon}
					resizeMode={'contain'}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: verticalScale(20)
	},
	gradientTextStyle: {
		fontSize: verticalScale(28),
		fontFamily: fonts.type.Krona_Regular,
		paddingBottom: verticalScale(18),
		textAlign: 'center'
	},
	imageIcon: {
		height: verticalScale(240),
		width: horizontalScale(240)
	},
	descriptionTextStyle: {
		fontSize: verticalScale(22),
		fontFamily: fonts.type.Inter_Medium,
		color: colors.white,
		textAlign: 'center'
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: fonts.type.Krona_Regular
	},
	gradientStyle: {
		fontSize: verticalScale(26),
		fontFamily: fonts.type.Inter_Medium,
		textAlign: 'center'
	},
	titleView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingVertical: verticalScale(20)
	}
});

export default UserEngagementComponent;
