import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useInternetStatus} from './CustomHooks/useInternetStatus';
import {SafeAreaView} from 'react-native-safe-area-context';
import ExpoFastImage from 'expo-fast-image';
import {
	Colors,
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../theme';
import colors from '../theme/colors';
import icons from '../assets/icon';
import Strings from '../constants/strings';

export default function NoInternetView() {
	const isInternetReachable = useInternetStatus();

	// useEffect(() => {
	//   console.log("isInternetReachable????", isInternetReachable)
	// }, [isInternetReachable])

	return (
		<>
			{!isInternetReachable ? (
				<View style={styles.viewTextStyle}>
					<ExpoFastImage
						style={styles.viewImageStyle}
						resizeMode="contain"
						source={icons.noInternet}
					/>
					<Text style={styles.textStyle}>{Strings.internetOff}</Text>
				</View>
			) : null}
		</>
	);
}

const styles = StyleSheet.create({
	viewStyle: {
		// height: '100%',
		// width: '100%',
		// justifyContent: 'center',
	},
	viewImageStyle: {
		height: verticalScale(30),
		width: verticalScale(30)
		//position: 'absolute',
	},
	viewTextStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		height: verticalScale(60),
		width: '100%',
		backgroundColor: Colors.darkRed,
		position: 'absolute',
		bottom: 0
	},
	textStyle: {
		fontFamily: Fonts.type.Inter_Medium,
		fontSize: moderateScale(14),
		color: colors.white,
		marginStart: horizontalScale(14),
		alignSelf: 'center'
	}
});
