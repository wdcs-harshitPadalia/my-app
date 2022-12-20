import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import icons from '../../assets/icon';
import {verticalScale} from '../../theme';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import CounterView from './CounterView';
import SeparatorView from '../SeparatorView';
import {defaultTheme} from '../../theme/defaultTheme';
import WinningProbabilityView from './WinningProbabilityView';

export default function StandingLive({standingsLive, standingsImage}) {
	return (
		<ImageBackground
			resizeMode="cover"
			source={{uri: standingsImage}}
			style={styles.container}>
			<View style={styles.wrapperView}>
				<View style={styles.timeView}>
					<CounterView count={18} label={'days'.toUpperCase()} />
					<SeparatorView />
					<CounterView count={0} label={'hrs'.toUpperCase()} />
					<SeparatorView />
					<CounterView count={32} label={'min'.toUpperCase()} />
					<SeparatorView />
					<CounterView count={7} label={'sec'.toUpperCase()} />
				</View>
				<Text style={styles.textStyle}>
					Standings
					<Text
						style={[
							styles.textStyle,
							{
								color: colors.white,
								marginTop: 0,
								paddingHorizontal: 0,
								paddingVertical: 0
							}
						]}>
						{' Live'}
					</Text>
				</Text>
				<View style={styles.bottomCountryView}>
					<WinningProbabilityView
						standingsLive={standingsLive}
						isVisitorView={false}
					/>
					<WinningProbabilityView
						standingsLive={standingsLive}
						isVisitorView={true}
					/>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//borderRadius: verticalScale(15),
		//overflow: 'hidden',
		//marginBottom: verticalScale(16),
		//height: 230,
		width: '100%'
	},
	timeView: {flexDirection: 'row', alignSelf: 'center', flex: 1},
	wrapperView: {flex: 1, marginTop: 18},
	textStyle: {
		backgroundColor: defaultTheme.backGroundColor,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 6,
		overflow: 'hidden',
		fontSize: 10,
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		alignSelf: 'center',
		marginTop: 24,
		marginBottom: 13
	},
	bottomCountryView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: verticalScale(10)
		//marginBottom: verticalScale(26),
	}
});
