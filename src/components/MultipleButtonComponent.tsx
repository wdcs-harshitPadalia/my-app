import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import fonts from '../theme/fonts';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface Props {
	title: string;
	btnTextArray: Array<Object>;
	selectItem: Object;
	handleSelection: Function;
	btnDisable: boolean;
}

const MulitpleButtonComponent: React.FC<Props> = props => {
	const {title, btnTextArray, selectItem, handleSelection, btnDisable} = props;

	return (
		<View
			style={[
				styles.rootContainer,
				Platform.OS == 'ios' ? styles.iosShadow : styles.androidShadow
			]}>
			<View style={styles.selectCaseContainer}>
				<Text style={styles.titleText}>{title}</Text>

				{btnTextArray &&
					btnTextArray.map((itemText, index) => (
						<ButtonGradient
							key={index}
							textType={'none'}
							colorArray={
								selectItem.key === itemText.key
									? defaultTheme.primaryGradientColor
									: defaultTheme.ternaryGradientColor
							}
							angle={gradientColorAngle}
							buttonText={itemText.value}
							buttonTextcolor={colors.white}
							textSize={moderateScale(18)}
							style={{marginTop: verticalScale(10)}}
							onPress={() => handleSelection(itemText)}
							btnDisabled={btnDisable}
							activeOpacity={1.0}
						/>
					))}
			</View>
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	rootContainer: {
		backgroundColor: colors.black,
		marginVertical: verticalScale(20),
		borderRadius: 8
	},
	selectCaseContainer: {
		marginHorizontal: horizontalScale(20),
		marginVertical: verticalScale(20)
	},
	iosShadow: {
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3
	},
	androidShadow: {
		elevation: 20,
		shadowColor: 'rgba(0,0,0,0.5)'
	},
	titleText: {
		color: colors.white,
		fontSize: 18,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		textAlign: 'center',
		marginBottom: verticalScale(10)
	},
	selectCaseButtonContainer: {
		marginHorizontal: horizontalScale(20),
		marginVertical: verticalScale(20)
	}
});

//make this component available to the app
export default MulitpleButtonComponent;
