import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {defaultTheme} from '../../theme/defaultTheme';
import GradientNumberView from './GradientNumberView';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import SeparatorView from '../SeparatorView';

const WinningProbabilityView = ({isVisitorView, standingsLive}) => {
	let teamData = isVisitorView
		? standingsLive?.visitorTeam
		: standingsLive?.localTeam;
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: isVisitorView ? 'row-reverse' : 'row',
					flex: 1,
					alignItems: 'center',
					paddingBottom: 10
				}}>
				<Text
					style={[
						styles.textStyle,
						,
						{
							fontSize: 10,
							fontFamily: fonts.type.Inter_ExtraBold,
							color: colors.white
						}
					]}>
					{`${
						isVisitorView
							? standingsLive?.visitorTeamName ?? 'N/A'
							: standingsLive?.localTeamName ?? 'N/A'
					}`.toUpperCase()}
				</Text>
				<SeparatorView spacing={11} />
				<GradientNumberView
					cornerRadius={4}
					selectedCount={
						isVisitorView
							? standingsLive?.visitorTeamWinCount ?? '0'
							: standingsLive?.localTeamWinCount ?? '0'
					}
					gradientColor={defaultTheme.ternaryGradientColor}
					fontSize={6}
				/>
				<SeparatorView spacing={11} />
				<Text style={styles.textStyle}>
					{`${
						isVisitorView
							? standingsLive?.visitorTeamWinPercentage ?? '0'
							: standingsLive?.localTeamWinPercentage ?? '0'
					}%`.toUpperCase()}
				</Text>
			</View>

			<View
				style={{
					flexDirection: isVisitorView ? 'row-reverse' : 'row',
					flex: 1
				}}>
				{teamData?.map((item, index) => {
					return (
						<View
							key={index}
							style={{
								flexDirection: 'row',
								//marginTop: 10,
								//backgroundColor: 'red',
								borderRadius: 4,
								overflow: 'hidden',
								marginLeft: 4
							}}>
							{/* <SeparatorView spacing={3} /> */}
							<Text
								style={[
									styles.textStyle,
									{
										backgroundColor: item.color,
										fontSize: 9,
										color: 'black',
										padding: 2,
										width: 16,
										height: 16,
										textAlign: 'center',
										textAlignVertical: 'center'
										//marginLeft: 4,
									}
								]}>
								{item.score}
							</Text>
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default WinningProbabilityView;

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.backGroundColor,
		//flex: 1,
		//height: 200,
		padding: 12,
		marginHorizontal: 10,
		alignSelf: 'flex-start',
		marginBottom: 22,
		borderRadius: 8
	},
	textStyle: {
		//backgroundColor: defaultTheme.backGroundColor,
		// paddingHorizontal: 5,
		// paddingVertical: 3,
		//padding: 4,
		//borderRadius: 6,
		overflow: 'hidden',
		fontSize: 10,
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		alignSelf: 'center'
		//marginTop: 13,
	}
});
