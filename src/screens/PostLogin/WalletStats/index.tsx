/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, SectionList} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../assets/icon';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import HeaderComponent from '../../../components/HeaderComponent';
import LoadMoreLoaderView from '../../../components/LoadMoreLoaderView';
import MonthSelection from '../../../components/MonthSelection';
import NoDataComponent from '../../../components/NoDataComponent';
import WalletStatsDetailsComponent from '../../../components/WalletStatsDetailsComponent';
import Strings from '../../../constants/strings';
import {getWalletStats} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {resetWalletData} from '../../../redux/reducerSlices/walletinfo';
import {RootState} from '../../../redux/store';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle, verticalScale} from '../../../theme/metrics';
import styles from './style';

const WalletStatsScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {params} = useRoute();

	const {filterTypeForDetails} = params;

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [filterType, setFilterType] = useState(filterTypeForDetails);

	const noDataItem = {
		image_url: icons.no_wallet_stats,
		title_text: Strings.no_wallet_stats,
		description_text: Strings.no_wallet_stats_desc
	};

	const feedInfo = useSelector((state: RootState) => {
		return state.wallet.walletStats;
	});

	const feedInfoLoading = useSelector((state: RootState) => {
		return state.wallet.walletStatsLoading;
	});

	const feedErrorInfo = useSelector((state: RootState) => {
		return state.wallet.walletStatsFailed;
	});

	useEffect(() => {
		if (currentPage === 1 && isLoading === false && isRefreshing === false) {
			dispatch(updateApiLoader({apiLoader: feedInfoLoading}));
		}
	}, [feedInfoLoading]);

	// useUpdateEffect(() => {
	//   setIsLoading(false);
	//   setIsRefreshing(false);
	//   setTotalPage(Math.ceil(feedInfo?.matchCount ?? 0 / 10));
	//   //dispatch(updateApiLoader({apiLoader: false}));
	// }, [feedInfo]);

	// useUpdateEffect(() => {
	//   if (currentPage <= totalPage || totalPage === 0) {
	//     if (currentPage === 0) {
	//       dispatch(updateApiLoader({apiLoader: true}));
	//     } else {
	//       setIsLoading(true);
	//     }
	//     callWalletStatsApi();
	//   }
	//   return () => {
	//     dispatch(resetWalletData({}));
	//   };
	// }, [currentPage]);
	useUpdateEffect(() => {
		setIsLoading(false);
		if ((currentPage < totalPage || totalPage === 0) && currentPage > 1) {
			if (currentPage === 1) {
				//dispatch(updateApiLoader({apiLoader: true}));
			} else {
				setIsLoading(true);
			}
			callWalletStatsApi();
		}
	}, [currentPage]);

	useEffect(() => {
		console.log('filterType???>>>', filterType);
		if ((currentPage < totalPage || totalPage === 0) && currentPage === 1) {
			if (currentPage === 1) {
				dispatch(updateApiLoader({apiLoader: true}));
			} else {
				//setIsLoading(true);
			}
			callWalletStatsApi();
		}
		return () => {
			dispatch(resetWalletData({}));
		};
	}, [filterType]);

	const resetWalletApiData = () => {
		dispatch(resetWalletData({}));
		setTotalPage(0);
		setCurrentPage(1);
	};

	const callWalletStatsApi = () => {
		let uploadData = {};

		if (
			filterType === 'Today' ||
			filterType === 'all' ||
			filterType === 'Last week' ||
			filterType === 'Last month'
		) {
			uploadData = {
				limit: '10',
				skip: currentPage - 1,
				days: filterType?.toLowerCase()
			};
		} else {
			uploadData = {
				limit: '10',
				skip: currentPage - 1,
				from: filterType?.firstDate,
				to: filterType?.secondDate
			};
		}
		dispatch(getWalletStats(uploadData));
	};

	useUpdateEffect(() => {
		if (feedErrorInfo) {
			setIsLoading(false);
			setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
		}
	}, [feedErrorInfo]);

	useUpdateEffect(() => {
		setIsLoading(false);
		setIsRefreshing(false);
		//setTotalPage(Math.ceil(feedInfo?.walletCount / 10));
		if (feedInfo?.walletCount && feedInfo?.walletCount > 0) {
			setTotalPage(Math.ceil(feedInfo?.walletCount / 10));
		} else {
			setTotalPage(0);
		}
		dispatch(updateApiLoader({apiLoader: false}));
	}, [feedInfo]);

	const onNextPageLoaded = () => {
		if (currentPage <= totalPage && totalPage !== 1) {
			setIsLoading(true);
			setCurrentPage(currentPage + 1);
		}
		// setIsLoading(true);
		// setCurrentPage(currentPage + 1);
	};

	return (
		<SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.Stats}
					onLeftIconPath={icons.back}
				/>
				{/* <HeaderView fontSize={24} title={Strings.Stats} /> */}
				<View style={styles.rootView}>
					<Text style={styles.title}>{Strings.Details}</Text>
					<MonthSelection
						onPress={type => {
							resetWalletApiData();
							if (type) {
								setFilterType(type);
							}
						}}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonText={filterType}
						rightIcon={true}
						style={{marginTop: verticalScale(20)}}
						leftIconPath={' '}
						dataSource={[
							'All',
							'Today',
							// 'Yesterday',
							'Last week',
							'Last month',
							'Custom date range'
						]}
					/>
					<SectionList
						// data={feedInfo?.walletData}
						sections={feedInfo?.walletData ?? [{data: []}]}
						keyExtractor={(item, index) => item.toString() + index}
						renderSectionHeader={({section: {_id}}) =>
							feedInfo?.walletData?.length > 0 && (
								<View style={styles.dateTitleContainer}>
									<Text style={styles.dateTitleTextStyle}>
										{moment(_id).format('DD MMMM YYYY')}
									</Text>
								</View>
							)
						}
						renderItem={({item, index}) => (
							<WalletStatsDetailsComponent itemData={item} />
						)}
						style={styles.flatListContainer}
						contentContainerStyle={{paddingBottom: 60}}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						// renderItem={({item, index}) => (
						// 	<View style={styles.flatListView}>
						// 		<Text style={styles.subTitleText}>
						// 			{`${item?.categories?.name} > ${item?.subcategories?.name} ${
						// 				item?.subcategories?.name ? '>' : ''
						// 			}${item?.matches?.leagueName ?? Strings.custom}`}
						// 		</Text>
						// 		<View style={styles.titleViewStyle}>
						// 			<Text numberOfLines={3} style={styles.titleText}>
						// 				{item?.bets?.betQuestion ??
						// 					item?.mainmarkets?.market_name +
						// 						(item?.bets?.market_sub_name
						// 							? ' : ' + item?.bets?.market_sub_name
						// 							: '')}
						// 			</Text>
						// 			<GradientText
						// 				colors={
						// 					item?.transaction_type === 'credit'
						// 						? defaultTheme.textGradientColor
						// 						: defaultTheme.primaryGradientColor
						// 				}
						// 				style={styles.amountText}>
						// 				{item?.transaction_type === 'credit'
						// 					? `+ ${parseFloat(item?.bet_amount).toFixed(7)} ${
						// 							item?.tokentypes?.name
						// 					  }`.toUpperCase()
						// 					: `- ${parseFloat(item?.bet_amount).toFixed(7)} ${
						// 							item?.tokentypes?.name
						// 					  }`.toUpperCase()}
						// 			</GradientText>
						// 		</View>
						// 		<Text style={styles.subTitleText}>
						// 			{moment(item?.created_timestamp).format('DD MMM. YYYY')}
						// 		</Text>
						// 	</View>
						// )}
						// onEndReachedThreshold={0.5}
						onMomentumScrollEnd={onNextPageLoaded}
						// ListEmptyComponent={() =>
						// 	feedErrorInfo && (
						// 		<View style={styles.noDataContainer}>
						// 			<NoDataComponent noData={noDataItem} />
						// 		</View>
						// 	)
						// }
						ListFooterComponent={() => (
							<>{isLoading && <LoadMoreLoaderView />}</>
						)}
					/>

					{feedErrorInfo && (
						<View style={styles.noDataContainer}>
							<NoDataComponent noData={noDataItem} />
						</View>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default WalletStatsScreen;
