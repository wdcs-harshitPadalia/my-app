import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Strings from '../constants/strings';
import {horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import fonts from '../theme/fonts';
import GradientText from './GradientText';

interface Props {
	caseATitle?: String;
	caseBTitle?: String;
	caseCTitle?: String;
	caseAValue?: Number;
	caseBValue?: Number;
	caseCValue?: Number;
	redirectType?: String;
}
const ResultCaseView: React.FC<Props> = props => {
	const {
		caseAValue,
		caseBValue,
		caseCValue,
		caseATitle,
		caseBTitle,
		caseCTitle,
		redirectType
	} = props;

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>{Strings.result}</Text>
			<View style={styles.casesRootContainer}>
				{/* Case A */}
				<View>
					<Text style={styles.caseName}>
						{caseATitle ? caseATitle : Strings.caseA}
					</Text>
					<GradientText
						colors={defaultTheme.textGradientColor}
						style={styles.caseValueText}>
						{caseAValue}
					</GradientText>
				</View>

				{/* Case B */}
				<View>
					<Text style={styles.caseName}>
						{caseBTitle ? caseBTitle : Strings.caseB}
					</Text>
					<GradientText
						colors={defaultTheme.primaryGradientColor}
						style={styles.caseValueText}>
						{caseBValue}
					</GradientText>
				</View>

				{/* Case Void */}
				<View>
					<Text style={styles.caseName}>
						{caseCTitle ? caseCTitle : Strings.void}
					</Text>
					<GradientText
						colors={defaultTheme.whiteGredientColor}
						style={[
							styles.caseValueText,
							{
								marginTop:
									redirectType === 'DISPUTE_RESULT'
										? verticalScale(8)
										: verticalScale(0)
							}
						]}>
						{caseCValue}
					</GradientText>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		backgroundColor: colors.black,
		marginTop: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(20),
		// for ios
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {width: -2, height: 6},
		shadowOpacity: 0.4,
		shadowRadius: 3,
		// for android
		elevation: 20
	},
	headerText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(18),
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		marginBottom: verticalScale(38)
	},
	casesRootContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	caseName: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Regular,
		marginBottom: horizontalScale(20),
		fontWeight: '800'
	},
	caseValueText: {
		color: ['#00C2FF', '#00FF19'],
		textAlign: 'center',
		fontSize: moderateScale(32),
		fontFamily: fonts.type.Inter_Regular,
		marginBottom: horizontalScale(20),
		fontWeight: '800'
	}
});

export default ResultCaseView;
