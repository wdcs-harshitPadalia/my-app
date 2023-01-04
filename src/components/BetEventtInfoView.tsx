/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';

import {Text} from 'react-native-elements';
import colors from '../theme/colors';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import {dateTimeConvert} from '../constants/utils/Function';
import {moderateFontScale, moderateScale} from '../theme/metrics';
import fonts from '../theme/fonts';
import TagView from './TagView';

export const BetEventtInfoView = ({item, cellTapped}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={1} onPress={cellTapped}>
				<LinearGradient colors={['black', 'black']} style={styles.gradient} />
				<View style={styles.flatListItem}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'flex-start',
							// flex: 1,
							justifyContent: 'space-between'
						}}>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<View style={styles.dateTimeView}>
								{item?.matches?.match_end_time ? (
									<Text style={styles.estimatedTimeText}>
										{Strings.starts +
											dateTimeConvert(
												parseFloat(item?.matches?.gmt_timestamp)
											).toUpperCase()}
									</Text>
								) : null}

								<Text style={styles.estimatedTimeText}>
									{Strings.ends +
										dateTimeConvert(
											parseFloat(
												item?.bet_type === 1
													? item?.betEndDate
													: item?.matches?.match_end_time
											)
										).toUpperCase()}
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							marginTop: verticalScale(8)
						}}>
						{item?.bet_type === 1 ? (
							<Text numberOfLines={2} style={styles.titleText}>
								{item?.betQuestion}
							</Text>
						) : (
							item?.matches?.localTeamName &&
							item?.matches?.visitorTeamName && (
								<Text numberOfLines={2} style={styles.titleText}>
									{item?.matches?.localTeamName} vs.{' '}
									{item?.matches?.visitorTeamName}
								</Text>
							)
						)}

						{item?.matches?.matchName && (
							<Text numberOfLines={2} style={styles.titleText}>
								{item?.matches?.matchName}
							</Text>
						)}
						<Text
							numberOfLines={2}
							style={[
								styles.subTitleText(moderateFontScale(12)),
								{
									marginBottom:
										(item?.matches?.localLogo?.teamLogo ||
											item?.localLogo?.teamLogo) &&
										(item?.matches?.visitorLogo?.teamLogo ||
											item?.visitorLogo?.teamLogo)
											? verticalScale(0)
											: verticalScale(20),
									marginTop: 18
								}
							]}>
							{item?.dataType === 'customBet'
								? `${
										item?.subcategories?.name ??
										item?.categories?.name ??
										item?.matches?.subcategories?.name ??
										''
								  }`.toUpperCase()
								: `${
										item?.subcategories?.name ??
										item?.matches?.subcategories?.name ??
										item?.categories?.name
								  } ${
										item?.leagueName || item?.matches?.leagueName ? '-' : ''
								  } ${
										item?.leagueName ?? item?.matches?.leagueName ?? ''
								  }`.toUpperCase()}
						</Text>
					</View>
					<View style={{flexDirection: 'row'}}>
						{item?.tags?.includes(Strings.HOT.toLowerCase()) && (
							// <LeftIconWithTextComponent
							// 	text={Strings.HOT}
							// 	iconPath={icons.ic_hot}
							// 	isApplyFilter={false}
							// 	borderStyle={{borderRadius: 26}}
							// 	activeOpacity={0.6}
							// 	gradientColors={defaultTheme.primaryGradientColor}
							// 	enabled={true}
							// />
							<TagView
								viewStyle={{marginRight: horizontalScale(8)}}
								backGroundColor={colors.purple}
								text={Strings.HOT}
							/>
						)}
						{item?.tags?.includes(Strings.FRIENDS.toLowerCase()) && (
							// <View style={{marginHorizontal: horizontalScale(8)}}>
							// 	<LeftIconWithTextComponent
							// 		text={Strings.FRIENDS}
							// 		iconPath={icons.ic_friends}
							// 		isApplyFilter={false}
							// 		borderStyle={{borderRadius: 26}}
							// 		activeOpacity={0.6}
							// 		gradientColors={defaultTheme.primaryGradientColor}
							// 		enabled={false}
							// 	/>
							// </View>
							<TagView
								viewStyle={{marginRight: horizontalScale(8)}}
								fontColor={colors.black}
								backGroundColor={colors.yellow}
								text={Strings.FRIENDS}
							/>
						)}
						{item?.tags?.includes('last minute') && (
							// <LeftIconWithTextComponent
							// 	text={Strings.LAST_MINUTE}
							// 	iconPath={icons.ic_timer}
							// 	isApplyFilter={false}
							// 	borderStyle={{borderRadius: 26}}
							// 	activeOpacity={0.6}
							// 	gradientColors={defaultTheme.primaryGradientColor}
							// 	enabled={false}
							// />
							<TagView
								backGroundColor={colors.redTag}
								text={Strings.LAST_MINUTE}
								withLeftDotView={false}
								tagLeftImagePath={props.tagLeftImagePath}
							/>
						)}
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		...Platform.select({
			web: {
				width: '100%'
			}
		}),
		borderRadius: moderateScale(15),
		overflow: 'hidden',
		marginBottom: verticalScale(8)
		// marginHorizontal: 16,
	},
	titleText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(30),
		textAlign: 'left'
	},
	subTitleText: (textFontSize: number) => ({
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		fontSize: textFontSize,
		textAlign: 'left'
		//opacity: 0.7,
		// marginTop: verticalScale(4),
		// marginBottom: verticalScale(50),
	}),
	flatListItem: {
		// flex: 1,
		marginHorizontal: horizontalScale(12),
		marginVertical: verticalScale(10)
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		opacity: 0.4
	},
	estimatedTimeText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.white,
		opacity: 0.7,
		paddingBottom: 2

		//marginLeft: horizontalScale(8),
	},
	dateTimeView: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		flex: 1,
		marginBottom: verticalScale(12),
		marginRight: verticalScale(8),
		alignItems: 'flex-start'
	}
});
