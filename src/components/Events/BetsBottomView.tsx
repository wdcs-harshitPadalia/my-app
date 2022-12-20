import {
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultTheme} from '../../theme/defaultTheme';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {
	gradientColorAngle,
	horizontalScale,
	moderateFontScale,
	moderateScale,
	verticalScale
} from '../../theme/metrics';
import ExpoFastImage from 'expo-fast-image';
import icons from '../../assets/icon';
import Strings from '../../constants/strings';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../navigation/screenNames';
import {Fonts} from '../../theme';
import {addRecentBet} from '../../redux/apiHandler/apiActions';
import NoDataComponent from '../NoDataComponent';
import ButtonLeftIconGradient from '../ButtonLeftIconGradient';
import OtherUserProfileReplicateBetComponent from '../OtherUserProfileReplicateBetComponent';
import PredictionMarketsCellView from './PredictionMarketsCellView';
import useUpdateEffect from '../CustomHooks/useUpdateEffect';

const BetsBottomView = props => {
	const {
		betInfo,
		onPullToRefresh,
		onNextPageLoaded,
		addRecent,
		handleShowReportModelView,
		isMenuHide,
		style,
		storyClose,
		onRedirectToDetails
	} = props;

	const topTabData = [
		{id: 1, title: Strings.Prediction_markets, badgeCount: 3},
		{id: 2, title: Strings.P2P_Bets, badgeCount: 12}
	];

	const noDataItemArray = [
		{
			image_url: icons.no_prediction_market,
			title_text: Strings.no_prediction_market,
			description_text: Strings.no_prediction_market_desc
		},
		{
			image_url: icons.no_prediction_market,
			title_text: Strings.no_p2p_bets,
			description_text: Strings.no_p2p_bets_desc
		}
	];

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const navigation = useNavigation();

	const [isShowNoData, setIsShowNoData] = useState(false);

	useEffect(() => {
		console.log('BetsBottomView useEffect', JSON.stringify(betInfo));

		if (betInfo && betInfo?.length <= 0) {
			setIsShowNoData(true);
		} else {
			setIsShowNoData(false);
		}
	}, [betInfo]);

	const checkArrayHasUserId = parentBetObject => {
		const userId = userInfo?.user?._id;
		// console.log('BetsBottomView useEffect?>>>>>>>>>>>>>???', betInfo);
		if (betInfo && betInfo?.length <= 0) {
			return;
		}
		const userIdIndex = parentBetObject?.bets?.filter(item => {
			// console.log('BetsBottomView useEffect?>>>>>>>>>>>>>???', item);
			return item.users._id === userId;
		});
		// console.log('BetsBottomView useEffect?>>>>>>>>>>>', userIdIndex);
		return userIdIndex?.length <= 0;
	};

	const addRecentBetData = () => {
		addRecentBet({bet_id: betInfo[0]?._id})
			.then(res => {
				console.log('postFollowUser Response : ', res);
			})
			.catch(() => {});
	};

	const BetFlatListComponent = props => {
		const {item} = props;

		const [isShowAll, setIsShowAll] = useState(false);

		const renderBetsFooter = () => {
			return (
				<>
					{checkArrayHasUserId(item) && (
						<View>
							{item.bets.length > 3 && (
								<TouchableOpacity onPress={() => setIsShowAll(!isShowAll)}>
									<Text style={styles.btnShowAllStyle}>
										{!isShowAll ? Strings.str_show_all : Strings.str_show_less}
									</Text>
								</TouchableOpacity>
							)}
							<ButtonLeftIconGradient
								onPress={() => {
									if (addRecent) {
										addRecentBetData();
									}
									storyClose && storyClose();
									navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
										eventBetData: item?.bets[0]
									});
								}}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								rightIcon={true}
								buttonText={Strings.replicate_this_bet_btn}
								leftIconPath={icons.ic_replicate_btn}
								rightIconPath={icons.ic_replicate_btn}
							/>
						</View>
					)}
				</>
			);
		};

		return (
			<FlatList
				data={isShowAll ? item.bets : item.bets.slice(0, 3)}
				showsHorizontalScrollIndicator={false}
				renderItem={renderBets}
				ListFooterComponent={renderBetsFooter}
			/>
		);
	};

	const renderBets = ({item, index}) => {
		return (
			<OtherUserProfileReplicateBetComponent
				itemData={item}
				isHideReplicateBet={true}
				isOnlyHideBetTitle={true}
				handleMenuPress={() => {}}
				handleBetMakerUserPicked={() => {
					storyClose && storyClose();
					navigation.navigate(ScreenNames.OtherUserProfileScreen, {
						userId: item?.users?._id
					});
				}}
				handleBetTackerPicked={() => {
					storyClose && storyClose();
					navigation.navigate(ScreenNames.JoinBetCreateScreen, {
						betId: item?._id
					});
				}}
				handleAlreadyBetTackerUserPicked={() => {
					storyClose && storyClose();
					navigation.navigate(ScreenNames.OtherUserProfileScreen, {
						userId: item?.betTaker?.takerDetails?._id
					});
				}}
				handleReplicateBet={() => {
					storyClose && storyClose();
					navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
						eventBetData: item
					});
				}}
			/>
		);
	};

	return (
		<FlatList
			nestedScrollEnabled
			onEndReachedThreshold={0.5}
			onMomentumScrollEnd={onNextPageLoaded}
			showsVerticalScrollIndicator={false}
			data={betInfo}
			contentContainerStyle={[styles.flatListContainer, props.style]}
			showsHorizontalScrollIndicator={false}
			ListHeaderComponent={<>{props?.children}</>}
			renderItem={({item}) => (
				<>
					{topTabData[props?.selectedIndex].title === Strings.P2P_Bets &&
					item ? (
						<View style={styles.p2pBetView}>
							<View style={styles.p2pBetHeaderText}>
								{storyClose ? null : (
									<Text style={styles.titleText}>
										{item?.bets[0]?.betQuestion ??
											item?.bets[0]?.mainmarkets?.market_name +
												(item?.bets[0]?.market_sub_name
													? ' : ' + item?.bets[0]?.market_sub_name
													: '')}
									</Text>
								)}

								{!isMenuHide && (
									<TouchableOpacity
										style={styles.paddingSix}
										onPress={() => handleShowReportModelView(item)}>
										<ExpoFastImage
											resizeMode={'contain'}
											source={icons.ic_menu}
											style={styles.rightImage}
										/>
									</TouchableOpacity>
								)}
							</View>
							<BetFlatListComponent item={item} />
						</View>
					) : (
						<FlatList
							data={item.bets}
							showsHorizontalScrollIndicator={false}
							renderItem={({item}) => {
								return (
									<PredictionMarketsCellView
										itemData={item}
										questionText={'Will Atlético de Madrid win?'}
										onQuestionTextPress={() => {
											navigation.navigate(
												ScreenNames.PredictionMarketsDetailsScreen,
												{
													questionText: 'Will Atlético de Madrid win?'
												}
											);
										}}
									/>
								);
							}}
						/>
					)}
				</>
			)}
			ListEmptyComponent={() =>
				isShowNoData && (
					<NoDataComponent
						noData={noDataItemArray[props?.selectedIndex]}
						isFromEventDetailScreen={true}
					/>
				)
			}
			refreshControl={
				<RefreshControl
					refreshing={false}
					onRefresh={onPullToRefresh}
					title=""
					tintColor="#rgba(0,0,0,0)"
					titleColor="#rgba(0,0,0,0)"
				/>
			}
			keyExtractor={(item, index) => item?._id?.toString() + index}
		/>
	);
};

export default React.memo(BetsBottomView);

const styles = StyleSheet.create({
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginTop: verticalScale(60)
	},
	profileContainer: {
		marginVertical: verticalScale(8),

		flexDirection: 'row'
	},
	circleGradient: {
		width: 26,
		height: 26,
		borderRadius: 13,
		marginRight: horizontalScale(16)
	},
	paddingSix: {padding: 6},
	rightImage: {
		height: 20,
		width: 20
	},
	titleText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(18),
		textAlign: 'left',
		flex: 1
	},
	oddPickText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(12),
		textAlign: 'left',
		flex: 1,
		marginRight: 2
	},
	viewImageStyle: {
		width: 22,
		height: 22,
		borderRadius: 11,
		borderColor: 'rgba(0,0, 0, 0.5)',
		borderWidth: 3,
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgIconStyle: {
		width: 26,
		height: 26,
		borderRadius: 13
	},
	viewBadgeStyle: {
		width: 20,
		height: 20,
		left: 16,
		top: -2,
		position: 'absolute'
	},

	badgeStyle: {
		position: 'absolute',
		top: -4,
		left: 12
	},
	imageStyle: {
		height: 26.22,
		width: 40
	},
	flatListContainer: {
		paddingBottom: verticalScale(70)
	},
	flatListItem: {
		borderWidth: 1,
		marginRight: 10,
		borderRadius: 8
	},
	p2pBetView: {
		backgroundColor: colors.black,
		padding: 12,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: colors.black,
		borderRadius: 8
	},
	p2pBetHeaderText: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	btnShowAllStyle: {
		color: colors.textTitle,
		fontSize: 12,
		fontFamily: Fonts.type.Inter_Medium,
		paddingVertical: verticalScale(8),
		textAlign: 'center'
	}
});
