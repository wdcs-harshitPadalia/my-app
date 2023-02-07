import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState
} from 'react';
import {
	ImageBackground,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import {defaultTheme} from '../../theme/defaultTheme';
import {LinearGradient} from 'expo-linear-gradient';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../theme';
import colors from '../../theme/colors';
import {
	moderateFontScale,
	screenHeight,
	SCREEN_WIDTH
} from '../../theme/metrics';
import Strings from '../../constants/strings';
import fonts from '../../theme/fonts';
import ScreenNames from '../../navigation/screenNames';
import {useNavigation} from '@react-navigation/native';
import {EventInfoView} from '../EventInfoView';
import {dateTimeConvert} from '../../constants/utils/Function';
import BetsBottomView from '../Events/BetsBottomView';
import OtherUserProfileReplicateBetComponent from '../OtherUserProfileReplicateBetComponent';
// import convertToProxyURL from 'react-native-video-cache';
import ReactPlayer from 'react-player';

type Props = {
	story: any;
	onImageLoaded?: () => void;
	friendProfile: string;
	userName: string;
	storyClose: () => void;
	friendLevel: number;
	isNewStory: boolean;
	onVideoLoaded?: (Object) => void;
	pause: boolean;
	isLoaded?: boolean;
	next: () => void;
};

let isVideoLoaded = false;

const Story = forwardRef((props: Props, parentRef) => {
	const {story, storyClose} = props;
	const {type, shortVideos, betShortVideos} = story || {};

	const navigation = useNavigation();

	const [isPlaying, setIsPlaying] = useState(true);

	// The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	useImperativeHandle(parentRef, () => ({
		handlePause,
		handlePlay
	}));

	// useImperativeHandle(parentRef, () => ({
	// 	handlePlay
	// }));

	const handlePause = () => {
		console.log('handlePause');
		setIsPlaying(false);
	};

	const handlePlay = () => {
		console.log('handlePlay');
		setIsPlaying(true);
	};

	return (
		<View style={styles.container}>
			{type === 'image' ? (
				<ImageBackground
					// source={{
					//   uri:
					//     (story.match?.image ?? story?.bet?.custom_bet_image) +
					//     '?' +
					//     new Date().getMilliseconds(),
					// }}
					source={{
						uri:
							Platform.OS === 'web'
								? story?.subcategories?.imageUrl ?? story?.categories?.imageUrl
								: (story?.subcategories?.imageUrl ??
										story?.categories?.imageUrl) +
								  '?' +
								  new Date().getMilliseconds()
					}}
					onLoadEnd={props.onImageLoaded}
					style={styles.content}
					resizeMode="cover"
					// width={ScreenWidth}
				>
					<LinearGradient colors={['black', 'black']} style={styles.gradient} />
					{story?.bet &&
					Object.keys(story.bet).length > 0 &&
					story?.sharedFrom !== 'Feed' ? (
						<View style={styles.matchDetailRootContainer}>
							<View style={styles.matchDetailInnerContainer}>
								<View style={styles.betTitleContainer}>
									<View style={styles.flexColumnContainer}>
										<View style={styles.dateTimeView}>
											{story?.match?.gmt_timestamp ? (
												<Text style={styles.estimatedTimeText}>
													{Strings.starts +
														dateTimeConvert(
															parseFloat(story?.match?.gmt_timestamp)
														).toUpperCase()}
												</Text>
											) : null}

											<Text style={styles.estimatedTimeText}>
												{Strings.ends +
													dateTimeConvert(
														parseFloat(
															story?.match?.match_end_time
																? story?.match?.match_end_time
																: story?.bet?.betEndDate
														)
													).toUpperCase()}
											</Text>
										</View>
										{story?.match?.localTeamName && (
											<Text style={styles.betTitleText}>
												{story?.match?.localTeamName} vs.{' '}
												{story?.match?.visitorTeamName}
											</Text>
										)}
										{story?.match?.matchName && (
											<Text numberOfLines={1} style={styles.betTitleText}>
												{story?.match?.matchName}
											</Text>
										)}
										{story?.bet?.bet_type === 1 && (
											<Text numberOfLines={2} style={styles.betTitleText}>
												{story?.bet?.betQuestion}
											</Text>
										)}
										{story?.match ? (
											<Text numberOfLines={1} style={styles.betSubTitleText}>
												{`${
													story?.subcategories?.name ?? story?.categories?.name
												} ${story?.match?.leagueName ? '-' : ''} ${
													story?.match?.leagueName ?? ''
												}`.toUpperCase()}
											</Text>
										) : (
											<Text numberOfLines={1} style={styles.betSubTitleText}>
												{`${
													story?.subcategories?.name ??
													story?.categories?.name ??
													''
												}`.toUpperCase()}
											</Text>
										)}
										{/* <Text style={styles.betSubTitleText}>
										{story?.bet?.betQuestion ??
											story?.bet?.mainmarkets?.market_name +
												(story?.bet?.market_sub_name
													? ' : ' + story?.bet?.market_sub_name
													: '')}
									</Text> */}
									</View>
									{/* {story?.bet?.user_id !== userInfo?.user?._id &&
										story?.hasOwnProperty('beTtaker') === false && (
											<TouchableOpacity
												onPress={() => {
													storyClose();
													console.log('story??????', JSON.stringify(story));
													navigation.navigate(
														ScreenNames.ReplicateBetCreatScreen,
														{
															eventBetData: {
																...story,
																...story.bet,
																...{
																	matches: story.match,
																	betQuestion: story.bet.betQuestion,
																	betOptionOne: story.bet.betOptionOne,
																	betOptionTwo: story.bet.betOptionTwo,
																	bet_type: story.bet.bet_type,
																	bet_opposite_side_option:
																		story.bet.bet_opposite_side_option,
																	bettypes: story.match?.betType,
																	mainmarkets: story.bet?.mainmarkets,
																	market_id: story.bet?.market_id,
																	bet_id: story.bet?.bet_id,
																	market_sub_name: story.bet?.market_sub_name
																}
															}
															// selectedBetType: feedInfo.betType,
														}
													);
												}}>
												<FastImage
													source={icons.plusGradient}
													style={styles.plusIcon}
												/>
											</TouchableOpacity>
										)} */}
								</View>

								{/* <View style={styles.betUserContainer}>
									<View style={{flexDirection: 'row', alignItems: 'center'}}>
										<View>
											<View>
												<FastImage
													source={{uri: friendProfile}}
													style={styles.userProfile}
												/>
												<FastImage
													source={getLevelRank(friendLevel)?.image}
													style={styles.userProfileBadge}
												/>
											</View>
										</View>
										<Text style={styles.betUserText}>
											{story?.bet?.user_id === userInfo?.user?._id
												? 'You'
												: userName}{' '}
											picked{' '}
											{story?.bet?.bet_creator_side_option ??
												story?.bet?.local_team_name}{' '}
											@odds {story?.bet?.odds}
										</Text>
									</View>
									{story?.bet?.user_id !== userInfo?.user?._id &&
										story?.hasOwnProperty('betTaker') === false && (
											<DynamicButtonGradient
												//gradientViewStyle={styles.gradientViewStyle}
												onPress={() => {
													storyClose();
													//                   setQuestion(eventBetData?.betQuestion);
													// setOptions1(eventBetData?.betOptionOne);
													// setOptions2(eventBetData?.betOptionTwo);
													console.log('story?.bet??>>>>>>', story);
													navigation.navigate(ScreenNames.JoinBetCreateScreen, {
														betId: story.bet?._id
													});
													// props.onTabChange(index);
													// setSelectedItemIndex(index);
												}}
												colorArray={defaultTheme.primaryGradientColor}
												angle={gradientColorAngle}
												set2Text={true}
												buttonTextcolor={colors.white}
												style={{maxWidth: horizontalScale(130)}}
												// buttonText2={'0.00004 Matic'}
												// buttonText={'Pick No'}
												// buttonText2={`${
												//   (
												//     parseFloat(story?.bet?.bet_amount) *
												//       parseFloat(story?.bet?.odds) -
												//     parseFloat(story?.bet?.bet_amount)
												//   ).toFixed(decimalValue) + ''
												// } ${story?.bet?.tokenType?.name}`}
												buttonText2={`${
													parseFloat(story?.bet?.bet_opposite_amount).toFixed(decimalValue) +
													''
												} ${story?.bet?.tokenType?.name}`}
												buttonText={`pick ${
													story?.bet?.bet_opposite_side_option ??
													story?.bet?.opposite_team_name
												}`.toUpperCase()}
												textType="none"
											/>
										)}
								</View> */}

								{/* <OtherUserProfileReplicateBetComponent
									itemData={{
										...story,
										...story?.bet,
										...story?.bet?.childBets.unshift(story?.bet)
									}}
									isHideReplicateBet={false}
									isOnlyHideBetTitle={story?.bet?.bet_type === 1}
									handleMenuPress={() => {}}
									handleBetMakerUserPicked={() => {
										storyClose();
										navigation.navigate(ScreenNames.OtherUserProfileScreen, {
											userId: story?.bet?.user_id
										});
									}}
									handleBetTackerPicked={() => {
										storyClose();
										navigation.navigate(ScreenNames.JoinBetCreateScreen, {
											betId: story.bet?._id
										});
									}}
									handleAlreadyBetTackerUserPicked={() => {
										storyClose();
										navigation.navigate(ScreenNames.OtherUserProfileScreen, {
											userId: story?.betTaker?.takerDetails?._id
										});
									}}
									handleReplicateBet={() => {
										storyClose();
										navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
											eventBetData: {
												...story,
												...story.bet,
												...{
													matches: story.match,
													betQuestion: story.bet.betQuestion,
													betOptionOne: story.bet.betOptionOne,
													betOptionTwo: story.bet.betOptionTwo,
													bet_type: story.bet.bet_type,
													bet_opposite_side_option:
														story.bet.bet_opposite_side_option,
													bettypes: story.match?.betType,
													mainmarkets: story.bet?.mainmarkets,
													market_id: story.bet?.market_id,
													bet_id: story.bet?.bet_id,
													market_sub_name: story.bet?.market_sub_name
												}
											}
										});
									}}
								/> */}
								<BetsBottomView
									// addRecent={true}
									betInfo={[
										{bets: [story?.bet, ...story?.bet?.childBets].slice(0, 2)}
									]}
									selectedIndex={1}
									storyClose={() => storyClose()}
									onNextPageLoaded={() => {
										// if (
										// 	totalDiscoverSearchBets !== discoverSearchBetsData?.length
										// ) {
										// 	pageBets = pageBets + 1;
										// 	getDiscoverBetsData();
										// }
									}}
									isMenuHide={true}
									style={{paddingBottom: 0}}
								/>
								{[story?.bet, ...story?.bet?.childBets].length > 2 && (
									<TouchableOpacity
										onPress={() => {
											storyClose();
											if (story?.match) {
												navigation.navigate(ScreenNames.EventDetailsScreen, {
													title: Strings.feed,
													matchId: story?.match?._id
												});
											} else {
												navigation.navigate(
													ScreenNames.CustomBetDetailsScreen,
													{
														title: Strings.feed,
														betId: story?.bet?.bet_id
													}
												);
											}
										}}>
										<Text style={styles.btnShowAllStyle}>
											{Strings.str_show_all}
										</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					) : (
						<TouchableOpacity
							style={{marginHorizontal: horizontalScale(20)}}
							activeOpacity={1}
							onPress={() => {
								//console.log('story', story);
								storyClose();
								navigation.navigate(ScreenNames.EventDetailsScreen, {
									title: Strings.feed,
									matchId: story?.match?._id,
									feedObject: {
										...story.match,
										subcategories: story.subcategories
									},
									betCreationType: 1,
									selectedBetType: story.match.betType
								});
							}}>
							<EventInfoView
								item={{
									...(story.match ?? story.bet),
									dataType: story?.bet?.bet_type === 1 ? 'customBet' : '',
									subcategories: story.subcategories ?? story.categories
								}}
								props={{
									hideBottomView: true,
									moreMenuOptionHidden: true,
									disable: true
								}}
								isScreenFocused={true}
							/>
							{/* <ImageBackground
								source={{uri: story.match?.image}}
								style={styles.matchDetailRootContainer}>
								<LinearGradient
									colors={['black', 'black']}
									style={styles.gradient}
								/>
								<View style={styles.matchDetailInnerContainer}>
									<Text style={styles.estimatedTimeText}>
										{dateTimeConvert(
											parseFloat(story.match?.gmt_timestamp)
										).toUpperCase()}
									</Text>
	
									<View style={{marginTop: verticalScale(8)}}>
										<Text style={styles.titleText}>
											{story.match?.localTeamName} vs.{' '}
											{story.match?.visitorTeamName}
										</Text>
										<Text style={styles.subTitleText}>
											{`${story.subcategories?.name} - ${story.match?.leagueName}`.toUpperCase()}
										</Text>
									</View>
	
									<View style={{flexDirection: 'row'}}>
										{story?.match?.tags?.includes(Strings.HOT.toLowerCase()) && (
											<TagView
												viewStyle={{marginRight: horizontalScale(8)}}
												backGroundColor={colors.purple}
												text={Strings.HOT}
											/>
										)}
										{story?.match?.tags?.includes(
											Strings.FRIENDS.toLowerCase()
										) && (
											<TagView
												viewStyle={{marginRight: horizontalScale(8)}}
												fontColor={colors.black}
												backGroundColor={colors.yellow}
												text={Strings.FRIENDS}
											/>
										)}
										{story?.match?.tags?.includes('last minute') && (
											<TagView
												backGroundColor={colors.redTag}
												text={Strings.LAST_MINUTE}
												withLeftDotView={false}
												tagLeftImagePath={icons.timer}
											/>
										)}
									</View>
								</View>
							</ImageBackground> */}
						</TouchableOpacity>
					)}
				</ImageBackground>
			) : (
				<>
					<View style={styles.overlay}>
						{story?.bet && Object.keys(story?.bet).length !== 0 && (
							<OtherUserProfileReplicateBetComponent
								itemData={{
									...story,
									...story?.bet,
									betTaker: story?.betTaker,
									users: story?.bet?.users
									// ...story?.bet?.childBets.unshift(story?.bet)
								}}
								isHideReplicateBet={true}
								isOnlyHideBetTitle={false}
								isFromDiscoverVideo={true}
								handleMenuPress={() => {}}
								handleBetMakerUserPicked={() => {
									storyClose();
									navigation.navigate(ScreenNames.OtherUserProfileScreen, {
										userId: story?.users?._id
									});
								}}
								handleBetTackerPicked={() => {
									storyClose();
									navigation.navigate(ScreenNames.JoinBetCreateScreen, {
										betId: story.bet?._id
									});
								}}
								handleAlreadyBetTackerUserPicked={() => {
									storyClose();
									navigation.navigate(ScreenNames.OtherUserProfileScreen, {
										userId: story?.betTaker?.takerDetails?._id
									});
								}}
								handleReplicateBet={() => {
									storyClose();
									navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
										eventBetData: {
											...story,
											...story.bet,
											...{
												matches: story.match,
												betQuestion: story.bet.betQuestion,
												betOptionOne: story.bet.betOptionOne,
												betOptionTwo: story.bet.betOptionTwo,
												bet_type: story.bet.bet_type,
												bet_opposite_side_option:
													story.bet.bet_opposite_side_option,
												bettypes: story.match?.betType,
												mainmarkets: story.bet?.mainmarkets,
												market_id: story.bet?.market_id,
												bet_id: story.bet?.bet_id,
												market_sub_name: story.bet?.market_sub_name
											}
										}
									});
								}}
							/>
						)}
					</View>
					{!props.isNewStory && (
						<ReactPlayer
							url={shortVideos?.video_url ?? betShortVideos?.video_url}
							style={styles.contentVideo}
							// light={
							// 	shortVideos?.video_thumbnail ?? betShortVideos?.video_thumbnail
							// }
							playing={isPlaying}
							// playing={!props.pause || props.isNewStory}
							onReady={() => {
								console.log('onReady ::');
							}}
							onStart={() => {
								console.log('onStart ::');
								isVideoLoaded = false;
							}}
							onDuration={duration => {
								console.log('onDuration ::');
								isVideoLoaded = false;
							}}
							onProgress={state => {
								// console.log('onProgress ::', state);
								if (!isVideoLoaded && !props.isNewStory) {
									props.onVideoLoaded(state);
									isVideoLoaded = true;
								}
								const played = parseInt(state.played);
								if (played === 1) {
									isVideoLoaded = false;
								}
							}}
							onEnded={() => {
								console.log('onEnded ::');
								isVideoLoaded = false;
							}}
							onError={(error, data) => {
								console.log('onError :: error ::', error);
								props.next();
							}}
							playsinline
							// onPause={handlePause}
							// onPlay={handlePlay}
						/>
					)}
				</>
			)}
		</View>
	);
});

Story.propTypes = {
	story: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: defaultTheme.backGroundColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	},
	contentVideo: {
		flex: 1,
		width: '100%',
		backgroundColor: colors.black,
		height: '100%',
		resizeMode: 'contain'
	},
	matchDetailRootContainer: {
		backgroundColor: colors.black,
		marginHorizontal: horizontalScale(20),
		borderRadius: moderateScale(15),
		overflow: 'hidden'
	},
	matchDetailInnerContainer: {
		marginHorizontal: horizontalScale(10),
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
	dateTimeView: {
		flexDirection: 'column',
		marginBottom: verticalScale(12)
		// justifyContent: 'space-between',
		// marginTop: verticalScale(10),
		// marginRight: verticalScale(8),
		// backgroundColor: 'red'
		// alignItems: 'flex-start'
	},
	estimatedTimeText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.textTitle
	},
	titleText: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(25),
		textAlign: 'left'
	},
	subTitleText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		fontSize: moderateScale(10),
		textAlign: 'left',
		//opacity: 0.7,
		marginTop: verticalScale(4),
		marginBottom: verticalScale(50)
	},
	betTitleContainer: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(12),
		marginVertical: verticalScale(12),
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	flexColumnContainer: {flex: 1, flexDirection: 'column'},
	btnShowAllStyle: {
		color: colors.textTitle,
		fontSize: 12,
		fontFamily: Fonts.type.Inter_Medium,
		paddingBottom: verticalScale(8),
		textAlign: 'center'
	},
	betTitleText: {
		color: colors.white,
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: 18
	},
	betSubTitleText: {
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		fontSize: moderateScale(12),
		marginTop: verticalScale(4)
	},
	plusIcon: {
		width: 18,
		height: 18,
		marginLeft: horizontalScale(8)
	},
	betUserContainer: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(12),
		marginBottom: verticalScale(12),
		justifyContent: 'space-between'
	},
	userProfile: {height: 42, width: 42, borderRadius: 21},
	userProfileBadge: {
		height: 21,
		width: 21,
		position: 'absolute',
		top: 2,
		right: -8
	},
	betUserText: {
		width: 120,
		color: colors.white,
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: 10,
		marginLeft: horizontalScale(12),
		marginVertical: verticalScale(4)
	},
	overlay: {
		position: 'absolute',
		bottom: verticalScale(100),
		left: horizontalScale(8),
		right: horizontalScale(8),
		zIndex: 1000
	}
});

export default Story;
