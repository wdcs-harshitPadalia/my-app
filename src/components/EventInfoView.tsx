/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import ExpoFastImage from 'expo-fast-image';

import icons from '../assets/icon';
import {Text} from 'react-native-elements';
import colors from '../theme/colors';
import Strings from '../constants/strings';
import UserGroupView from './UserGroupView';
import {defaultTheme} from '../theme/defaultTheme';
import {Fonts, horizontalScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import {dateTimeConvert} from '../constants/utils/Function';
import StreamingTimerView from './StreamingTimerView';
import LeftIconWithTextComponent from './LeftIconWithTextComponent';
import {
	gradientColorAngle,
	moderateFontScale,
	moderateScale
} from '../theme/metrics';
import fonts from '../theme/fonts';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import TagView from './TagView';

export const EventInfoView = ({
	item,
	props,
	isScreenFocused,
	onShareSheetOpen,
	titleTotalNumOfLines
}) => {
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	return (
		<View style={styles.container}>
			<TouchableOpacity
				disabled={props?.disable}
				activeOpacity={1}
				onPress={() => props.cellTapped && props.cellTapped(item)}>
				<ImageBackground
					fallback={true}
					style={props?.height ? {height: props?.height} : {}}
					source={{
						uri: props.showWatchButton
							? item?.image
							: item?.dataType === 'customBet'
							? item?.subcategories?.imageUrl ?? item?.categories?.imageUrl
							: item?.subcategories?.imageUrl ??
							  item?.categories?.imageUrl ??
							  item?.image,
						priority: 'high'
					}}>
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
								{/* {!props.tagLeftImagePath && (
      <TagView
        backGroundColor={colors.redTag}
        text={Strings.STREAMING}
        withLeftDotView={true}
        leftImagePath={props.tagLeftImagePath}
      />
    )} */}
								{props.showWatchButton ? (
									// <Text style={styles.estimatedTimeText}>
									//   {'estimated end '.toUpperCase() +
									//     moment(parseFloat(item?.matches?.gmt_timestamp))
									//       .fromNow(true)
									//       .toUpperCase()}
									// </Text>
									// <Text style={styles.estimatedTimeText}>
									//   {'streaming on '.toUpperCase() +
									//     dateTimeStreamingConvert(
									//       parseFloat(item?.matches?.gmt_timestamp),
									//     ).toUpperCase()}
									// </Text>
									isScreenFocused && <StreamingTimerView betInfo={item} />
								) : (
									<>
										{props?.numColumns ? (
											<Text style={styles.estimatedTimeText}>
												{dateTimeConvert(
													parseFloat(item?.gmt_timestamp ?? item?.endTime)
												).toUpperCase()}
											</Text>
										) : (
											<View style={styles.dateTimeView}>
												{item?.gmt_timestamp ? (
													<Text style={styles.estimatedTimeText}>
														{Strings.starts +
															dateTimeConvert(
																parseFloat(item?.gmt_timestamp)
															).toUpperCase()}
													</Text>
												) : null}

												<Text style={styles.estimatedTimeText}>
													{Strings.ends +
														dateTimeConvert(
															parseFloat(
																item?.dataType === 'customBet'
																	? item?.betEndDate
																	: item?.match_end_time
															)
														).toUpperCase()}
												</Text>
											</View>
										)}
									</>
								)}
							</View>
							{props.moreMenuOptionHidden ? null : (
								<TouchableOpacity
									onPress={onShareSheetOpen}
									hitSlop={{left: 18, top: 18, right: 18, bottom: 18}}>
									<ExpoFastImage
										style={{
											height: 16,
											width: 4,
											position: 'absolute',
											top: 4,
											right: 3
										}}
										source={icons.ic_menu}
									/>
								</TouchableOpacity>
							)}
						</View>
						<View
							style={{
								marginTop: verticalScale(8)
							}}>
							{item?.dataType === 'customBet' ? (
								<Text
									numberOfLines={titleTotalNumOfLines}
									style={[
										styles.titleText,
										props?.titleFontSize
											? {
													fontSize: props?.titleFontSize
											  }
											: {}
									]}>
									{item?.betQuestion}
								</Text>
							) : (
								(item?.localTeamName ?? item?.matches?.localTeamName) &&
								(item?.visitorTeamName ?? item?.matches?.visitorTeamName) && (
									<Text
										numberOfLines={titleTotalNumOfLines}
										style={[
											styles.titleText,
											props?.titleFontSize
												? {
														fontSize: props?.titleFontSize
												  }
												: {}
										]}>
										{item?.localTeamName ?? item?.matches?.localTeamName} vs.{' '}
										{item?.visitorTeamName ?? item?.matches?.visitorTeamName}
									</Text>
								)
							)}

							{item?.matchName && (
								<Text
									numberOfLines={titleTotalNumOfLines}
									style={[
										styles.titleText,
										props?.titleFontSize
											? {
													fontSize: props?.titleFontSize
											  }
											: {}
									]}>
									{item.matchName}
								</Text>
							)}
							<Text
								numberOfLines={2}
								style={[
									styles.subTitleText(
										props?.numColumns
											? moderateFontScale(10)
											: moderateFontScale(12)
									),
									{
										marginBottom:
											(item?.matches?.localLogo?.teamLogo ||
												item?.localLogo?.teamLogo) &&
											(item?.matches?.visitorLogo?.teamLogo ||
												item?.visitorLogo?.teamLogo)
												? verticalScale(0)
												: verticalScale(20),
										marginTop: verticalScale(props.numColumns ? 12 : 18)
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

						{!props?.isHideTeamFlag &&
							(item?.matches?.localLogo?.teamLogo ||
								item?.localLogo?.teamLogo) &&
							(item?.matches?.visitorLogo?.teamLogo ||
								item?.visitorLogo?.teamLogo) && (
								<View
									style={{
										//position: 'absolute',
										//height: '100%',
										//width: '100%',
										justifyContent: 'space-between',
										// backgroundColor: 'red',
										alignItems: 'center',
										flexDirection: 'row',
										marginVertical: verticalScale(12)
										//paddingHorizontal: horizontalScale(20),
									}}>
									<ExpoFastImage
										style={{
											height: 100,
											// width: 100,
											aspectRatio: 1
										}}
										source={{
											uri: props.showWatchButton
												? item?.matches?.localLogo?.teamLogo
												: item?.localLogo?.teamLogo
										}}
									/>

									<ExpoFastImage
										style={{
											height: 50,
											//width: 100,
											aspectRatio: 1
										}}
										source={icons.VS}
									/>

									<ExpoFastImage
										style={{
											height: 100,
											// width: 100,
											// backgroundColor: 'red',
											aspectRatio: 1
										}}
										source={{
											uri: props.showWatchButton
												? item?.matches?.visitorLogo?.teamLogo
												: item?.visitorLogo?.teamLogo
										}}
									/>
								</View>
							)}

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
							{props.tagLeftImagePath &&
								item?.tags?.includes('last minute') && (
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
				</ImageBackground>
			</TouchableOpacity>
			{!props.hideBottomView && (
				<TouchableOpacity
					onPress={() => {
						props.cellTapped && props.cellTapped(item);
					}}
					activeOpacity={0.8}
					style={{flex: 1}}>
					<UserGroupView
						userArray={item?.users ?? item?.liveViewUserData}
						userCount={
							item?.liveViewsCount ??
							(item?.betUserCount > 0 && item?.betUserCount)
						}
						onPress={() => {
							// handleSubmit();
							// navigation.replace(ScreenNames.BottomTabScreen);
							//  navigation.navigate(ScreenNames.ProfileSetupScreen);
						}}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						rightIcon={true}
						buttonText={Strings.login}
						shouldShowBottomButtons={props.shouldShowBottomButtons}
						shouldShowCloseButton={props.shouldShowCloseButton}
						showWatchButton={props.showWatchButton}
						onWatchButtonClicked={() => props.onWatchButtonClicked(item)}
						// onRightButtonPress={props.onWatchButtonClicked}
						style={{
							borderRadius: verticalScale(0)
						}}
						onLeftButtonPress={() => props.onDiscoverButtonClicked(item)}
						onRightButtonPress={() => props.onCreatBetButtonClicked(item)}
						desText={''}
						userID={userInfo?.user?._id}
						isCustomBet={item?.dataType === 'customBet'}
						onPressViewAll={() => props.cellTapped && props.cellTapped(item)}
						volume={item?.totalVolume}
						openbet={item?.openBets}
						prefixText={Strings.str_prefix_p2p_bets}
						isFromLive={item?.liveViewUserData}
						isCallFromSuggestedUser={true}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

EventInfoView.defaultProps = {
	titleTotalNumOfLines: 3
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		borderRadius: moderateScale(15),
		overflow: 'hidden',
		marginBottom: verticalScale(8)
		// marginHorizontal: 16,
	},
	titleText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(20),
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
		marginTop: verticalScale(10),
		marginRight: verticalScale(8),
		// backgroundColor: 'red',
		alignItems: 'flex-start'
	}
});
