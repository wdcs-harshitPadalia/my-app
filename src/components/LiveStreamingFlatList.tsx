/* eslint-disable react-native/no-inline-styles */
import {
	StyleSheet,
	RefreshControl,
	FlatList,
	View,
	ScrollView
} from 'react-native';
import React, {ReactElement, useEffect, useRef, useState} from 'react';

import {moderateScale, verticalScale} from '../theme';
import {gradientColorAngle} from '../theme/metrics';
import {useIsFocused, useScrollToTop} from '@react-navigation/native';
import LoadMoreLoaderView from './LoadMoreLoaderView';
import {EventInfoView} from './EventInfoView';
import BottomSharePopup from './BottomSharePopup';
import {BotomSharePopupData} from '../constants/api';

interface LiveStreamingListItemProps {
	data: any[];
	onWatchButtonClicked: Function;
	showWatchButton?: Boolean;
	shouldShowBottomButtons?: Boolean;
	shouldShowCloseButton?: Boolean;
	tagLeftImagePath?: String;
	onMenuPressed?: (data, item) => void;
	onNextPageLoaded?: Function;
	isRefreshing: boolean;
	onRefreshCall: () => void;
	isLoading: boolean;
	moreMenuOptionHidden: boolean;
	headerView: ReactElement;
	hideBottomView: boolean;
	showLiveTage: boolean;
}

export default function LiveStreamingFlatList(
	props: LiveStreamingListItemProps
) {
	const scrollRef = useRef(null);
	const [isMenuOpen, seIsMenuOpen] = useState(false);
	const [feedItemData, setFeedItemData] = useState();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [dataType, setDataType] = useState();

	let isScreenFocused = useIsFocused();

	// const ref = React.useRef(null);

	useEffect(() => {
		console.log('useEffect props.isRefreshing?????', props.isRefreshing);
	}, [props]);

	useScrollToTop(scrollRef);
	return (
		<>
			<FlatList
				ref={scrollRef}
				//horizontal
				// style={{flex: 1}}
				ListHeaderComponent={props.headerView}
				data={props.data}
				contentContainerStyle={styles.flatListContainer}
				showsVerticalScrollIndicator={false}
				renderItem={({item, index}) => (
					<EventInfoView
						item={item}
						props={props}
						isScreenFocused={isScreenFocused}
						onShareSheetOpen={() => {
							setFeedItemData(item);
							setDataType(item?.dataType);
							seIsMenuOpen(true);
						}}
						showLiveTage={props?.showLiveTage && item?.isLiveBet}
					/>
				)}
				keyExtractor={(item, index) => item._id.toString() + index}
				// refreshing={props.isRefreshing}
				onEndReached={() => {
					props?.onNextPageLoaded();
					console.log('onMomentumScrollEnd??');
				}}
				// onRefresh={props.onRefreshCall}
				ListHeaderComponentStyle={{marginHorizontal: -16}}
				refreshControl={
					<RefreshControl
						refreshing={props.isRefreshing}
						onRefresh={props.onRefreshCall}
						title="Pull to refresh"
						tintColor="#fff"
						titleColor="#fff"
					/>
				}
				ListFooterComponent={() => (
					<>{props.isLoading && <LoadMoreLoaderView />}</>
				)}
			/>
			{/* <BottomSheet1
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonText={Strings.Last_month}
				isOpen={isMenuOpen}
				onPress={data => {
					if (data) {
						props.onMenuPressed(data, feedItemData);
					}
					seIsMenuOpen(false);
				}}
				dataSource={
					dataType === 'customBet'
						? [{id: 3, text: 'Share with...'}]
						: [
								{id: 0, text: 'Report...'},
								{id: 1, text: 'Share with...'},
								{id: 2, text: 'Share to my story'}
						  ]
				}
			/> */}
			<BottomSharePopup
				angle={gradientColorAngle}
				isOpen={isMenuOpen}
				onPress={data => {
					if (data) {
						props.onMenuPressed(data, feedItemData);
					}
					seIsMenuOpen(false);
				}}
				// dataSource={
				// 	dataType !== 'customBet'
				// 		? BotomSharePopupData
				// 		: BotomSharePopupData.slice(0, 2)
				// }
				// dataType={dataType}
				dataSource={BotomSharePopupData}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	flatListContainer: {
		paddingBottom: 200
	},
	container: {
		flex: 1,
		borderRadius: moderateScale(15),
		overflow: 'hidden',
		marginBottom: verticalScale(8)
		// marginHorizontal: 16,
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		opacity: 0.4
	}
});
