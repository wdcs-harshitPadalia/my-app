import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {Fonts} from '../../theme';
import colors from '../../theme/colors';
import {
	height,
	horizontalScale,
	moderateFontScale,
	verticalScale,
	width
} from '../../theme/metrics';

interface JuryIntroProps {
	image_url: any;
	title_text: string;
	description_text: string;
	escrowAmount: string;
}

interface Props {
	juryIntroData: JuryIntroProps;
	escrowAmount: string;
}

const JuryIntroComponent = (props: Props) => {
	const {juryIntroData, escrowAmount} = props;

	return (
		<View style={styles.container}>
			<ExpoFastImage source={juryIntroData.image_url} style={styles.imageIcon} />
			<Text style={styles.titleText}>{juryIntroData.title_text}</Text>
			<Text style={styles.descriptionText}>
				{juryIntroData.description_text.replace('XX', '' + escrowAmount)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: width,
		height: height
	},
	imageIcon: {
		height: 240,
		width: 240
	},
	titleText: {
		fontSize: moderateFontScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center',
		marginHorizontal: horizontalScale(58)
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

export default JuryIntroComponent;
