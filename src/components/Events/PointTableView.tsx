import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import icons from '../../assets/icon';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {defaultTheme} from '../../theme/defaultTheme';
import GradientNumberView from './GradientNumberView';

export default function PointTableView({standings, sportName, standingsImage}) {
	const listHeaderView = () => {
		switch (sportName?.toLowerCase()) {
			case 'baseball':
				return (
					<View style={[styles.headerStyle, {justifyContent: 'space-between'}]}>
						<>
							<View style={{flexDirection: 'row', flex: 0.7}}>
								{/* <GradientNumberView
  cornerRadius={4}
  selectedCount={'#'}
  gradientColor={['black', 'black']}
  fontSize={6}
/> */}
								{/* <SeparatorView /> */}
								<Text style={[styles.textStyle, {marginVertical: 0}]}>
									{'#'.toUpperCase()}
								</Text>
								<Text
									style={[
										styles.textStyle,
										{marginVertical: 0, marginLeft: 2}
									]}>
									{'Team'.toUpperCase()}
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row'
									//flex: 0.5,
									//flex: 1,
									//justifyContent: 'flex-end',
								}}>
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{'W'.toUpperCase()}
								</Text>
								{/* <SeparatorView /> */}
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{'L'.toUpperCase()}
								</Text>
							</View>
						</>
					</View>
				);

			case 'basketball':
				return (
					<View style={[styles.headerStyle, {justifyContent: 'space-between'}]}>
						<>
							<View style={{flexDirection: 'row', flex: 0.7}}>
								{/* <GradientNumberView
    cornerRadius={4}
    selectedCount={'#'}
    gradientColor={['black', 'black']}
    fontSize={6}
  /> */}
								{/* <SeparatorView /> */}
								<Text style={[styles.textStyle, {marginVertical: 0}]}>
									{'#'.toUpperCase()}
								</Text>
								<Text
									style={[
										styles.textStyle,
										{marginVertical: 0, marginLeft: 2}
									]}>
									{'Team'.toUpperCase()}
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row'
									//flex: 0.5,
									//flex: 1,
									//justifyContent: 'flex-end',
								}}>
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{'W'.toUpperCase()}
								</Text>
								{/* <SeparatorView /> */}
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{'L'.toUpperCase()}
								</Text>

								{/* <Text
                  style={[
                    styles.secondaryTextStyle,
                    {marginVertical: 0, textAlign: 'center'},
                  ]}>
                  {'F'.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.secondaryTextStyle,
                    {marginVertical: 0, textAlign: 'center'},
                  ]}>
                  {'A'.toUpperCase()}
                </Text> */}
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{'DIFF'.toUpperCase()}
								</Text>
							</View>
						</>
					</View>
				);

			case 'motor sports':
				return (
					<View style={[styles.headerStyle, {justifyContent: 'space-between'}]}>
						<>
							<View style={{flexDirection: 'row'}}>
								{/* <GradientNumberView
  cornerRadius={4}
  selectedCount={'#'}
  gradientColor={['black', 'black']}
  fontSize={6}
/> */}
								{/* <SeparatorView /> */}
								<Text style={[styles.textStyle, {marginVertical: 0}]}>
									{'#'.toUpperCase()}
								</Text>
								<Text
									style={[
										styles.textStyle,
										{marginVertical: 0, marginLeft: 2}
									]}>
									{'Player name'.toUpperCase()}
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row'
									//flex: 1,
									//justifyContent: 'flex-end',
								}}>
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{'pts'.toUpperCase()}
								</Text>
							</View>
						</>
					</View>
				);

			default:
				return (
					<View style={styles.headerStyle}>
						<>
							<View style={{flexDirection: 'row', flex: 0.42}}>
								{/* <GradientNumberView
  cornerRadius={4}
  selectedCount={'#'}
  gradientColor={['black', 'black']}
  fontSize={6}
/> */}
								{/* <SeparatorView /> */}
								<Text style={[styles.textStyle, {marginVertical: 0}]}>
									{'#'.toUpperCase()}
								</Text>
								<Text
									style={[
										styles.textStyle,
										{marginVertical: 0, marginLeft: 2}
									]}>
									{'Group A'.toUpperCase()}
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									flex: 0.5
									//flex: 1,
									//justifyContent: 'flex-end',
								}}>
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{'p3'.toUpperCase()}
								</Text>

								{/* <SeparatorView /> */}
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{'g'.toUpperCase()}
								</Text>
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{'e'.toUpperCase()}
								</Text>
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{'p'.toUpperCase()}
								</Text>
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{'g'.toUpperCase()}
								</Text>
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{'pts'.toUpperCase()}
								</Text>
							</View>
						</>
					</View>
				);
		}
	};

	const listView = ({item, index}) => {
		switch (sportName?.toLowerCase()) {
			case 'baseball':
				return (
					<View style={[styles.listItemView]}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								flex: 0.7
							}}>
							<GradientNumberView
								cornerRadius={4}
								selectedCount={index + 1}
								gradientColor={defaultTheme.ternaryGradientColor}
								fontSize={6}
							/>
							{/* <SeparatorView /> */}
							<Text
								numberOfLines={1}
								style={[styles.textStyle, {marginVertical: 0, marginLeft: 2}]}>
								{item?.name?.toUpperCase() +
									item?.name?.toUpperCase() +
									item?.name?.toUpperCase()}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row'
								// backgroundColor : 'red'
								// flex: 0.5,
								// flex: 1,
								// justifyContent: 'flex-end',
							}}>
							{/* <SeparatorView /> */}
							{item?.wins && (
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{item?.wins?.toUpperCase()}
								</Text>
							)}

							{item?.losses && (
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{item?.losses?.toUpperCase()}
								</Text>
							)}
						</View>
					</View>
				);

			case 'basketball':
				return (
					<View style={[styles.listItemView]}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								flex: 0.7
							}}>
							<GradientNumberView
								cornerRadius={4}
								selectedCount={index + 1}
								gradientColor={defaultTheme.ternaryGradientColor}
								fontSize={6}
							/>
							{/* <SeparatorView /> */}
							<Text
								numberOfLines={1}
								style={[styles.textStyle, {marginVertical: 0, marginLeft: 2}]}>
								{item?.name?.toUpperCase() +
									item?.name?.toUpperCase() +
									item?.name?.toUpperCase()}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row'
								// backgroundColor : 'red'
								// flex: 0.5,
								// flex: 1,
								// justifyContent: 'flex-end',
							}}>
							{/* <SeparatorView /> */}
							{item?.wins && (
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{item?.wins?.toUpperCase()}
								</Text>
							)}

							{item?.losses && (
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{item?.losses?.toUpperCase()}
								</Text>
							)}

							{/* {item?.goalsFor && (
                <Text
                  style={[
                    styles.secondaryTextStyle,
                    {marginVertical: 0, textAlign: 'center'},
                  ]}>
                  {item?.goalsFor?.toUpperCase()}
                </Text>
              )}

              {item?.goalsAgainst && (
                <Text
                  style={[
                    styles.secondaryTextStyle,
                    {marginVertical: 0, textAlign: 'center'},
                  ]}>
                  {item?.goalsAgainst?.toUpperCase()}
                </Text>
              )} */}

							{item?.goalDifference && (
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{item?.goalDifference?.toUpperCase()}
								</Text>
							)}
						</View>
					</View>
				);

			case 'motor sports':
				return (
					<View
						style={[styles.listItemView, {justifyContent: 'space-between'}]}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
								// flex: 0.42,
							}}>
							<GradientNumberView
								cornerRadius={4}
								selectedCount={index + 1}
								gradientColor={defaultTheme.ternaryGradientColor}
								fontSize={6}
							/>
							{/* <SeparatorView /> */}
							<Text
								numberOfLines={1}
								style={[styles.textStyle, {marginVertical: 0, marginLeft: 2}]}>
								{item?.playerName?.toUpperCase()}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row'
								// flex: 0.5,
								//flex: 1,
								//justifyContent: 'flex-end',
							}}>
							{item?.gamesPlayed && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.gamesPlayed?.toUpperCase()}
								</Text>
							)}

							{/* <SeparatorView /> */}
							{item?.wins && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.wins?.toUpperCase()}
								</Text>
							)}

							{item?.losses && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.losses?.toUpperCase()}
								</Text>
							)}

							{item?.draws && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.draws?.toUpperCase()}
								</Text>
							)}

							<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
								{item?.goalsFor && item?.goalsAgainst
									? `${item?.goalsFor}:${item?.goalsAgainst}`.toUpperCase()
									: ''}
							</Text>
							{item?.points && (
								<Text
									style={[
										styles.secondaryTextStyle,
										{marginVertical: 0, textAlign: 'center'}
									]}>
									{item?.points?.toUpperCase()}
								</Text>
							)}
						</View>
					</View>
				);

			default:
				return (
					<View style={styles.listItemView}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								flex: 0.42
							}}>
							<GradientNumberView
								cornerRadius={4}
								selectedCount={index + 1}
								gradientColor={defaultTheme.ternaryGradientColor}
								fontSize={6}
							/>
							{/* <SeparatorView /> */}
							<Text
								numberOfLines={1}
								style={[styles.textStyle, {marginVertical: 0, marginLeft: 2}]}>
								{item?.name?.toUpperCase()}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								flex: 0.5
								//flex: 1,
								//justifyContent: 'flex-end',
							}}>
							{item?.gamesPlayed && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.gamesPlayed?.toUpperCase()}
								</Text>
							)}

							{/* <SeparatorView /> */}
							{item?.wins && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.wins?.toUpperCase()}
								</Text>
							)}

							{item?.losses && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.losses?.toUpperCase()}
								</Text>
							)}

							{item?.draws && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.draws?.toUpperCase()}
								</Text>
							)}

							<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
								{item?.goalsFor && item?.goalsAgainst
									? `${item?.goalsFor}:${item?.goalsAgainst}`.toUpperCase()
									: ''}
							</Text>
							{item?.points && (
								<Text style={[styles.secondaryTextStyle, {marginVertical: 0}]}>
									{item?.points?.toUpperCase()}
								</Text>
							)}
						</View>
					</View>
				);
		}
	};

	return (
		<ImageBackground
			resizeMode="cover"
			source={{uri: standingsImage}}
			style={styles.container}>
			<View style={styles.wrapperView}>
				<FlatList
					nestedScrollEnabled
					data={standings}
					ListHeaderComponent={listHeaderView}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={{maxHeight: 180}}
					bounces={false}
					renderItem={listView}
				/>
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
	wrapperView: {
		flex: 1,
		marginTop: 23,
		marginBottom: 34,
		paddingHorizontal: 16
	},
	textStyle: {
		backgroundColor: defaultTheme.backGroundColor,
		paddingHorizontal: 5,
		paddingVertical: 5,
		borderRadius: 5,
		overflow: 'hidden',
		fontSize: 10,
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.white,
		alignSelf: 'center',
		marginVertical: 5
	},

	secondaryTextStyle: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: 5,
		overflow: 'hidden',
		fontSize: 8,
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		//marginVertical: 5,
		//paddingHorizontal: 6,
		//flex: 1,
		width: 24,
		//textAlign: 'right',
		alignSelf: 'center'
	},
	headerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//width: '100%',
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
		padding: 6,
		borderRadius: 8,
		marginBottom: 2
	},
	listItemView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//width: '100%',
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
		padding: 6,
		borderRadius: 8,
		marginBottom: 2
	}
});
