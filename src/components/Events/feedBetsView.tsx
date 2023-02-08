import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import {
	gradientColorAngle,
	height,
	moderateFontScale,
	verticalScale,
	width
} from '../../theme/metrics';
import CustomTopTabView from '../CustomTopTabVIew';
import Strings from '../../constants/strings';
import BetsBottomView from './BetsBottomView';
import {defaultTheme} from '../../theme/defaultTheme';
import AnimatedCarosualView from '../AnimatedCarosualView';
import StandingLive from './StandingLive';
import HeadToHeadView from './HeadToHeadView';
import PointTableView from './PointTableView';
import TeamView from './TeamView';

import {useDispatch, useSelector} from 'react-redux';
import {
	getBetsPerFeed,
	postReportMatch
} from '../../redux/apiHandler/apiActions';
import {RootState} from '../../redux/store';
import {resetBetsPerFeed} from '../../redux/reducerSlices/dashboard';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../navigation/screenNames';
import {dateTimeConvert, showErrorAlert} from '../../constants/utils/Function';
import StreamingNameView from '../StreamingNameView';
import useUpdateEffect from '../CustomHooks/useUpdateEffect';
import {updateApiLoader} from '../../redux/reducerSlices/preLogin';
import ButtonGradient from '../ButtonGradient';
import ReportFeedView from './ReportFeedView';
import BottomSharePopup from '../BottomSharePopup';
import {BotomSharePopupData} from '../../constants/api';
const data = [
	{
		id: 0
	}, // https://unsplash.com/photos/Jup6QMQdLnM
	{
		id: 1
	}, // https://unsplash.com/photos/oO62CP-g1EA
	{
		id: 2
	}, // https://unsplash.com/photos/gKMmJEvcyA8
	{
		id: 3
	}
];
const topTabData = [
	{id: 1, title: Strings.Prediction_markets, badgeCount: 0},
	{id: 2, title: Strings.P2P_Bets, badgeCount: 0}
];

const FeedBetTopView = ({
	images,
	isSelectedIndex,
	setIsSelectedIndex,
	item,
	headToHead,
	teamPlayersVisitor,
	teamPlayersLocal,
	standingsLive,
	standings,
	bets,
	standingsImage
}) => {
	const componentsArray = [];
	if (standingsLive && standingsLive?.visitorTeamName) {
		componentsArray.push(
			<StandingLive
				standingsImage={standingsImage}
				standingsLive={standingsLive}
			/>
		);
	}
	if (
		headToHead &&
		typeof headToHead === 'object' &&
		Object.keys(headToHead).length > 0
	) {
		componentsArray.push(
			<HeadToHeadView
				headToHead={headToHead}
				teamPlayersVisitor={teamPlayersVisitor}
				teamPlayersLocal={teamPlayersLocal}
				standingsImage={standingsImage}
			/>
		);
	}
	if (
		teamPlayersVisitor &&
		typeof teamPlayersVisitor === 'object' &&
		Object.keys(teamPlayersVisitor).length > 0 &&
		teamPlayersLocal &&
		typeof teamPlayersLocal === 'object' &&
		Object.keys(teamPlayersLocal).length > 0
	) {
		componentsArray.push(
			<TeamView
				teamPlayersVisitor={teamPlayersVisitor}
				teamPlayersLocal={teamPlayersLocal}
				standingsImage={standingsImage}
			/>
		);
	}
	if (standings && standings.length > 0) {
		componentsArray.push(
			<PointTableView
				sportName={item?.subcategories?.name}
				standings={standings}
				standingsImage={standingsImage}
			/>
		);
	}
	return (
		<>
			<Text style={styles.subTitleText}>
				{`${item?.subcategories?.name} - ${item?.leagueName}`.toUpperCase()}
			</Text>
			{item.matchName && <Text style={styles.titleText}>{item.matchName}</Text>}
			{item.localTeamName && item.visitorTeamName && (
				<Text style={styles.titleText}>
					{item.localTeamName} vs. {item.visitorTeamName}
				</Text>
			)}

			<Text style={styles.estimatedTimeText}>
				{dateTimeConvert(parseFloat(item.gmt_timestamp)).toUpperCase()}
			</Text>
			<AnimatedCarosualView data={componentsArray} />
			{/* <StandingLive />
      <HeadToHeadView />
      <PointTableView />
     <TeamView /> */}
			{/* </AnimatedCarosualView> */}
			{/* <CustomTopTabView
        horizontalSpacing={0}
        dataSource={[
          {id: 1, title: Strings.Prediction_markets, badgeCount: 0},
          {
            id: 2,
            title: Strings.P2P_Bets,
            badgeCount: bets?.users && bets?.users?.userName ? 1 : 0,
          },
        ]}
        onTabChange={item => {
          setIsSelectedIndex(item);
        }}
        selectedIndex={isSelectedIndex}
      /> */}
		</>
	);
};

export const FeedBetsView = ({
	item,
	selectedBetType,
	isFromStreaming,
	isRecent,
	handleShareStory,
	handleShareUrl,
	handleBetShare,
	streamCreator
}) => {
	const [images, setImages] = useState([]);
	const [isSelectedIndex, setIsSelectedIndex] = useState(1);
	const [shouldRefresh, setShouldRefresh] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isReportPopupShown, setIsReportPopupShown] = useState(false);
	const [selectedDataObj, setselectedDataObj] = useState();
	const dispatch = useDispatch();
	const betInfo = useSelector((state: RootState) => {
		return state.dashboard.betsPerFeed;
	});
	const loadingStatus = useSelector((state: RootState) => {
		return state.dashboard.loading;
	});

	useEffect(() => {
		dispatch(updateApiLoader({apiLoader: loadingStatus}));
	}, [loadingStatus]);

	useEffect(() => {
		//reloadImages();
		getBetPerMatch();

		const unsubscribe = navigation.addListener('focus', () => {
			// The screen is focused
			// Call any action
			getBetPerMatch();
		});

		return () => {
			unsubscribe;
			dispatch(resetBetsPerFeed({}));
		};

		function getBetPerMatch() {
			console.log('Live Item?>?????', JSON.stringify(item));
			dispatch(
				getBetsPerFeed({
					match_id: isFromStreaming ? item?.matches?._id : item?._id,
					visitedType: isFromStreaming ? 'liveEvent' : 'matchEvent',
					live_id: isFromStreaming ? item?._id : undefined,
					isRecent: isRecent
				})
			);
		}
	}, []);

	useUpdateEffect(() => {
		//reloadImages();

		// The screen is focused
		// Call any action
		//if (shouldRefresh) {
		dispatch(resetBetsPerFeed({}));
		let match_id = item.hasOwnProperty('matches')
			? item?.matches?._id
			: item?._id;
		dispatch(
			getBetsPerFeed({
				match_id: null ?? match_id,
				visitedType: item.hasOwnProperty('matches')
					? 'liveEvent'
					: 'matchEvent',
				live_id: item?._id,
				isRecent: isRecent
			})
		);
		//}
	}, [shouldRefresh]);

	useEffect(() => {
		console.log(isSelectedIndex);
		// if (topTabData[isSelectedIndex].title === Strings.P2P_Bets) {
		//   dispatch(getBetsPerFeed({match_id: item._id}));
		// }
		return () => {
			//dispatch(resetBetsPerFeed({}));
		};
	}, [isSelectedIndex]);

	const reloadImages = async () => {
		setImages(data);
	};

	const navigation = useNavigation();

	useEffect(() => {
		console.log(
			'JSON.stringify(item.hasOwnProperty() ? item.matches : item)',
			JSON.stringify(betInfo)
		);
		setTimeout(() => {
			dispatch(updateApiLoader({apiLoader: false}));
		}, 200);
	}, [betInfo]);

	// const MemorizedCarousual = useMemo(() => AnimatedCarosualView, [images]);

	return (
		<>
			<View style={styles.container}>
				{/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}> */}
				{/* <Text style={styles.subTitleText}>
            {`FootBall - abc`.toUpperCase()}
          </Text>
          <Text style={styles.titleText}>Atlético de Madrid vs. Liverpool</Text>
          <Text style={styles.estimatedTimeText}>
            {moment(parseFloat(1649659746000))
              .format('DD MMM.HH:mm')
              .toUpperCase()}
          </Text>
          <AnimatedCarosualView sliderHeight={height * 0.22} data={images}>
            <StandingLive />
          </AnimatedCarosualView>

          <CustomTopTabView
            horizontalSpacing={0}
            dataSource={topTabData}
            onTabChange={item => {
              setIsSelectedIndex(item);
            }}
            selectedIndex={isSelectedIndex}
          /> */}
				{/* {topTabData[isSelectedIndex].title === Strings.P2P_Bets && ( */}
				<BetsBottomView
					onNextPageLoaded={() => {}}
					onPullToRefresh={() => setShouldRefresh(!shouldRefresh)}
					betInfo={isSelectedIndex === 1 ? betInfo?.bets : []}
					selectedIndex={isSelectedIndex}
					handleShowReportModelView={dataObj => {
						setselectedDataObj(dataObj);
						setIsMenuOpen(true);
					}}>
					{isFromStreaming ? (
						<StreamingNameView betInfo={item} />
					) : (
						<FeedBetTopView
							item={item}
							images={images}
							isSelectedIndex={isSelectedIndex}
							setIsSelectedIndex={setIsSelectedIndex}
							headToHead={betInfo?.headToHead}
							standingsLive={betInfo?.standingsLive}
							teamPlayersLocal={betInfo?.teamPlayersLocal}
							teamPlayersVisitor={betInfo?.teamPlayersVisitor}
							standings={betInfo?.standings}
							bets={betInfo?.bets}
							standingsImage={betInfo?.subCategory?.standings_image}
						/>
					)}

					{/* <StreamingNameView /> */}
					{/* <>
            <Text style={styles.subTitleText}>
              {`FootBall - abc`.toUpperCase()}
            </Text>
            <Text style={styles.titleText}>
              Atlético de Madrid vs. Liverpool
            </Text>
            <Text style={styles.estimatedTimeText}>
              {moment(parseFloat(1649659746000))
                .format('DD MMM.HH:mm')
                .toUpperCase()}
            </Text>
            <AnimatedCarosualView data={images}>
              <StandingLive />
              <HeadToHeadView />
              <PointTableView />
            </AnimatedCarosualView>
            <CustomTopTabView
              horizontalSpacing={0}
              dataSource={topTabData}
              onTabChange={item => {
                setIsSelectedIndex(item);
              }}
              selectedIndex={isSelectedIndex}
            />
          </> */}
					<CustomTopTabView
						horizontalSpacing={0}
						dataSource={[
							{id: 1, title: Strings.Prediction_markets, badgeCount: 0},
							{
								id: 2,
								title: Strings.P2P_Bets,
								badgeCount: betInfo.bets?.length ?? 0
							}
						]}
						onTabChange={item => {
							setIsSelectedIndex(item);
						}}
						selectedIndex={isSelectedIndex}
					/>
					{isSelectedIndex === 0 && <View style={{height: 10}} />}
				</BetsBottomView>
				{/* )} */}
				{/* </ScrollView> */}
				{isFromStreaming &&
				!item.hasOwnProperty('matches') &&
				item?.subCategoryList?.length === 0 ? (
					<ButtonGradient
						onPress={() => {
							console.log('item>???', JSON.stringify(item));
							// props.onTabChange(index);
							// setSelectedItemIndex(index);
							navigation.navigate(ScreenNames.BetsCategoryScreen, {
								matchData: item.hasOwnProperty('matches')
									? {
											...item?.matches,
											...{
												categories: item?.categories,
												subcategories: item?.subcategories
											}
									  }
									: item,
								live_feed_id: item?._id,
								betCreationType: 1,
								selectedBetType: selectedBetType,
								isLive: isFromStreaming, // is redirect to live
								streamCreator: streamCreator,
							});
						}}
						//gradientViewStyle={styles.gradientViewStyle}
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						//style={{maxWidth: 150}}
						style={styles.bottomButtonStyle}
						gradientViewStyle={styles.bottomButtonGradientStyle}
						buttonText={
							topTabData[isSelectedIndex].title === Strings.P2P_Bets
								? Strings.Create_a_bet_on_this_event.toUpperCase()
								: Strings.Create_a_predication_market_on_this_event.toUpperCase()
						}
						textType="none"
					/>
				) : (
					<></>
				)}
				{isFromStreaming ? (
					parseFloat(item?.matches?.gmt_timestamp) < moment().format('x') && (
						<ButtonGradient
							onPress={() => {
								// props.onTabChange(index);
								// setSelectedItemIndex(index);
								navigation.navigate(ScreenNames.BetsCategoryScreen, {
									matchData: item.hasOwnProperty('matches')
										? {
												...item?.matches,
												...{
													categories: item?.categories,
													subcategories: item?.subcategories
												}
										  }
										: item,
									betCreationType: 1,
									live_feed_id: item?._id,
									selectedBetType: selectedBetType,
									isLive: isFromStreaming, // is redirect to live
								});
							}}
							//gradientViewStyle={styles.gradientViewStyle}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							//style={{maxWidth: 150}}
							style={styles.bottomButtonStyle}
							gradientViewStyle={styles.bottomButtonGradientStyle}
							buttonText={
								topTabData[isSelectedIndex].title === Strings.P2P_Bets
									? Strings.Create_a_bet_on_this_event.toUpperCase()
									: Strings.Create_a_predication_market_on_this_event.toUpperCase()
							}
							textType="none"
						/>
					)
				) : (
					<ButtonGradient
						onPress={() => {
							// props.onTabChange(index);
							// setSelectedItemIndex(index);
							console.log('item??>>>>>>>>>>', item);
							console.log('selectedBetType??', selectedBetType);
							navigation.navigate(ScreenNames.BetsCategoryScreen, {
								matchData: item.hasOwnProperty('matches') ? item.matches : item,
								betCreationType: 1,
								selectedBetType: selectedBetType,
								isLive: isFromStreaming, // is redirect to live
							});
						}}
						//gradientViewStyle={styles.gradientViewStyle}
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						//style={{maxWidth: 150}}
						style={styles.bottomButtonStyle}
						gradientViewStyle={styles.bottomButtonGradientStyle}
						buttonText={
							topTabData[isSelectedIndex].title === Strings.P2P_Bets
								? Strings.Create_a_bet_on_this_event.toUpperCase()
								: Strings.Create_a_predication_market_on_this_event.toUpperCase()
						}
						textType="none"
					/>
				)}
				<BottomSharePopup
					angle={gradientColorAngle}
					isOpen={isMenuOpen}
					onPress={data => {
						setIsMenuOpen(false);
						if (data) {
							switch (data.id) {
								case 0:
									setTimeout(() => {
										setIsReportPopupShown(true);
									}, 500);
									break;
								case 1:
									setTimeout(() => {
										// handleShareUrl();
										handleBetShare(selectedDataObj);
									}, 500);
									break;
								case 2:
									setTimeout(() => {
										// console.log('====================================');
										// console.log(
										// 	'betInfo?.bets[0] ::: ',
										// 	JSON.stringify(selectedDataObj)
										// );
										// console.log('====================================');
										handleShareStory(selectedDataObj);
									}, 500);
									break;
								// case 3:
								// 	setTimeout(() => {
								// 		handleShare(item.bet_id, true, item?.betQuestion);
								// 	}, 1000);
								// 	break;
								default:
									break;
							}
						}
					}}
					// dataSource={BotomSharePopupData.slice(0, 2)}
					// dataType={'customBet'}
					dataSource={BotomSharePopupData}
				/>
				<ReportFeedView
					onPressCancel={() => {
						setIsReportPopupShown(false);
					}}
					onPressOk={(tag, description) => {
						setIsReportPopupShown(false);
						let match_id = item.hasOwnProperty('matches')
							? item?.matches?._id
							: item?._id;
						let bet_id = betInfo?.bets[0]?.bets[0]?._id;
						const data = {
							tagText: tag === 'Other' ? description : tag,
							matchId: match_id,
							betId: bet_id,
							customTag: tag === 'Other' ? 1 : 0
						};
						console.log('====================================');
						console.log('data :: ', data);
						console.log('====================================');
						postReportMatch(data).then(res => {
							showErrorAlert('', res?.message ?? Strings.somethingWentWrong);
						});
					}}
					isVisible={isReportPopupShown}
				/>
			</View>
		</>
	);
};

export default React.memo(FeedBetsView);

const styles = StyleSheet.create({
	container: {marginHorizontal: 16, flex: 1},
	titleText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(25),
		textAlign: 'left',
		marginBottom: verticalScale(15)
	},
	estimatedTimeText: {
		fontFamily: fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.textTitle,
		//opacity: 0.7,
		marginBottom: verticalScale(15)
	},
	subTitleText: {
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		fontSize: moderateFontScale(10),
		textAlign: 'left',
		//opacity: 0.7,
		marginTop: verticalScale(4),
		marginBottom: verticalScale(15)
	},
	flatListContainer: {
		// paddingHorizontal: 10,
		paddingBottom: 20
		//height: height * 0.20,
	},
	flatListItem: {
		borderWidth: 1,
		//flex: 1,
		marginRight: 10,
		borderRadius: 8,
		height: height * 0.2,
		width: width - 32
	},
	imageStyle: {
		height: height * 0.2,
		width: width - 32,
		borderRadius: 8
	},
	bottomButtonStyle: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		...Platform.select({
			web: {
				width: '100%'
			}
		})
	},
	bottomButtonGradientStyle: {
		width: '100%',
		paddingVertical: verticalScale(15)
	}
});
