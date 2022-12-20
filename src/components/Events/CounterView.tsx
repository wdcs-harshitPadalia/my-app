import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {defaultTheme} from '../../theme/defaultTheme';

const CounterView = props => {
	return (
		<View style={styles.durationContainer}>
			<View style={styles.timeContainer}>
				<Text style={styles.timeView}>{props.count}</Text>
			</View>
			<Text style={styles.bottomLabelStyle}>{props.label}</Text>
		</View>
	);
};

export default CounterView;

const styles = StyleSheet.create({
	timeView: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		fontSize: 12,
		fontFamily: fonts.type.Inter_ExtraBold
		//opacity: 0.78,
		//marginLeft: horizontalScale(6),
	},
	timeContainer: {
		height: 40,
		width: 40,
		borderRadius: 8,
		//marginLeft: 8,
		backgroundColor: defaultTheme.backGroundColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	durationContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		//backgroundColor: 'green',
		alignSelf: 'center'
		//flex: 1,
	},
	bottomLabelStyle: {
		color: defaultTheme.backGroundColor,
		//padding: 10,
		textAlign: 'center',
		fontSize: 6,
		fontFamily: fonts.type.Inter_ExtraBold,
		paddingHorizontal: 4
	}
});
