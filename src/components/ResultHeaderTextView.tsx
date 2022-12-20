import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, Text} from 'react-native-elements';
import ExpoFastImage from 'expo-fast-image';
import {ImageSource} from 'react-native-vector-icons/Icon';
import {horizontalScale, moderateScale, verticalScale} from '../theme';
import fonts from '../theme/fonts';

interface Props {
	headerTitle: string;
	title?: string;
	subTitle?: string;
	image?: ImageSource;
}

const ResultHeaderTextView: React.FC<Props> = props => {
	const {headerTitle, title, subTitle, image} = props;

	return (
		<View style={styles.container}>
			<View style={{marginBottom: verticalScale(20)}}>
				<Text style={styles.headerTitleText}>{headerTitle}</Text>
			</View>

			<View style={{marginBottom: verticalScale(20)}}>
				<Text style={styles.titleText}>{title}</Text>
				<Text style={styles.subTitleText}>{subTitle}</Text>
			</View>

			{image ? (
				<ExpoFastImage
					resizeMode={'contain'}
					source={image}
					style={styles.imgLogo}
				/>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: horizontalScale(20)
	},
	headerTitleText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(24),
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400'
	},
	titleText: {
		color: colors.white,
		textTransform: 'uppercase',
		textAlign: 'center',
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Bold,
		fontWeight: '700'
	},
	subTitleText: {
		color: colors.white,
		textTransform: 'uppercase',
		textAlign: 'center',
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Regular,
		fontWeight: '300'
	},
	imgLogo: {
		alignSelf: 'center',
		height: 24,
		width: 24
	}
});

export default ResultHeaderTextView;
