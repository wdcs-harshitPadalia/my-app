import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import icons from '../../assets/icon';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import CounterView from './CounterView';
import {defaultTheme} from '../../theme/defaultTheme';
import GradientNumberView from './GradientNumberView';
import Strings from '../../constants/strings';

export default function HeadToHeadView(props) {
	useEffect(() => {
		console.log('props??>>>>>>>', props);
	}, [props]);

	return (
		<ImageBackground
			resizeMode="cover"
			source={{uri: props?.standingsImage}}
			style={styles.container}>
			<View style={styles.wrapperView}>
				<Text style={[styles.textStyle, {color: colors.textTitle}]}>
					{Strings.head_to_head.toUpperCase()}
				</Text>
				<View style={styles.teamsView}>
					<Text style={[styles.textStyle, {marginVertical: 0}]}>
						{props?.item?.localTeamName?.toUpperCase()}
					</Text>
					{/* <SeparatorView /> */}
					<Text style={[styles.textStyle, {marginVertical: 0}]}>
						{props?.item?.visitorTeamName?.toUpperCase()}
					</Text>
				</View>

				<View style={styles.counterContainer}>
					<CounterView
						count={props?.headToHead?.localTeamWon}
						label={Strings.won.toUpperCase()}
					/>
					{/* <SeparatorView /> */}
					<CounterView
						count={props?.headToHead?.totalDraw}
						label={Strings.tied.toUpperCase()}
					/>
					{/* <SeparatorView /> */}
					<CounterView
						count={props?.headToHead?.visitorTeamWon}
						label={Strings.won.toUpperCase()}
					/>
				</View>

				<View style={styles.goalsScoreView}>
					<GradientNumberView
						cornerRadius={4}
						selectedCount={props?.headToHead?.localTeamGoals}
						gradientColor={defaultTheme.ternaryGradientColor}
						fontSize={8}
					/>
					<Text style={[styles.textStyle, {marginVertical: 0}]}>
						{Strings.AVG_scored_goals.toUpperCase()}
					</Text>
					<GradientNumberView
						cornerRadius={4}
						selectedCount={props?.headToHead?.visitorTeamGoals}
						gradientColor={defaultTheme.ternaryGradientColor}
						fontSize={8}
					/>
					{/* <SeparatorView /> */}
				</View>

				<View style={styles.goalsScoreView}>
					<GradientNumberView
						cornerRadius={4}
						selectedCount={props?.headToHead?.localTeamAgainst}
						gradientColor={defaultTheme.ternaryGradientColor}
						fontSize={8}
					/>
					<Text style={[styles.textStyle, {marginVertical: 0}]}>
						{Strings.AVG_goals_against.toUpperCase()}
					</Text>
					<GradientNumberView
						cornerRadius={4}
						selectedCount={props?.headToHead?.visitorTeamAgainst}
						gradientColor={defaultTheme.ternaryGradientColor}
						fontSize={8}
					/>
					{/* <SeparatorView /> */}
				</View>
				{/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: verticalScale(10),
          }}>
          <WinningProbabilityView isReversedView={false} />
          <WinningProbabilityView isReversedView={true} />
        </View> */}
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
	wrapperView: {flex: 1, marginTop: 12, marginBottom: 40, marginHorizontal: 16},
	textStyle: {
		backgroundColor: defaultTheme.backGroundColor,
		paddingHorizontal: 5,
		paddingVertical: 3,
		borderRadius: 5,
		overflow: 'hidden',
		fontSize: 10,
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.white,
		alignSelf: 'center',
		marginVertical: 5
	},
	teamsView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//width: '100%',
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
		padding: 6,
		borderRadius: 8,
		marginBottom: 5
	},
	counterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//width: '100%',
		flex: 1,
		marginBottom: 6
		//backgroundColor: 'red',
	},
	goalsScoreView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//width: '100%',
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
		padding: 6,
		borderRadius: 8,
		marginBottom: 5
	}
});
