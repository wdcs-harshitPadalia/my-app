import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Colors, verticalScale} from '../theme';
import fonts from '../theme/fonts';
interface ErrorProps {
	onPress?: () => void;
}
const ErrorComponent: React.FC<ErrorProps> = props => {
	const {onPress} = props;
	return (
		<>
			<ExpoFastImage source={icons.about} style={styles.img} />
			<View style={styles.errorView}>
				<Text style={styles.errorText}>
					{Strings.error_Message}
					<Text style={styles.tryAgainTextStyle} onPress={onPress}>
						{' ' + Strings.try_again}
					</Text>
				</Text>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	tryAgainTextStyle: {
		fontSize: verticalScale(14),
		fontFamily: fonts.type.Inter_Medium,
		color: Colors.white,
		textDecorationLine: 'underline'
	},
	errorText: {
		fontSize: verticalScale(14),
		fontFamily: fonts.type.Inter_Medium,
		color: Colors.white
	},
	img: {
		height: verticalScale(44),
		width: verticalScale(44)
	},
	errorView: {
		marginTop: verticalScale(20)
	}
});

export default ErrorComponent;
