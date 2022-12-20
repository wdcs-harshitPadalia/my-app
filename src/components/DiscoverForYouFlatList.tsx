/* eslint-disable react-native/no-inline-styles */
import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	RefreshControl
} from 'react-native';
import React, {useRef, useState} from 'react';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import Strings from '../constants/strings';
import UserGroupView from './UserGroupView';
import {horizontalScale, verticalScale} from '../theme';
import {gradientColorAngle, moderateFontScale} from '../theme/metrics';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {EventInfoView} from './EventInfoView';
import LoadMoreLoaderView from './LoadMoreLoaderView';
import BetsBottomView from './Events/BetsBottomView';

interface DiscoverListItemProps {
	data: any[];
	betInfo: any[];
	onWatchButtonClicked: Function;
	showWatchButton?: Boolean;
	shouldShowBottomButtons?: Boolean;
	shouldShowCloseButton?: Boolean;
	tagLeftImagePath?: String;
	onMenuPressed?: Function;
	onNextPageLoaded?: Function;
	isRefreshing: boolean;
	onRefreshCall: () => void;
	isLoading: boolean;
	numColumns?: number;
	scrollEnabled?: boolean;
	onCloseButtonPress: () => void;
	isLoadDiscoverMatch?: Boolean;
	scrollRef?: any;
}

const DiscoverForYouFlatList = React.memo((props: DiscoverListItemProps) => {
	const flatListRef = useRef();
	const [isMenuOpen, seIsMenuOpen] = useState(false);

	const {
		numColumns,
		scrollEnabled,
		isRefreshing,
		onRefreshCall,
		shouldShowCloseButton,
		onCloseButtonPress,
		isLoadDiscoverMatch,
		scrollRef,
		betInfo
	} = props;

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const renderItem = ({item, index}) => {
		return (
			<View style={styles.verticalContainer}>
				<EventInfoView
					item={item?.matches}
					props={{
						hideBottomView: true,
						moreMenuOptionHidden: true,
						cellTapped: () => props.cellTapped(item?.matches),
						isHideTeamFlag: true,
						numColumns: 3
					}}
					tagLeftImagePath={icons.timer}
					isScreenFocused={true}
					titleTotalNumOfLines={2}
				/>
<BetsBottomView
											addRecent={true}
											betInfo={betInfo}
											selectedIndex={1}
											onNextPageLoaded={() => {}}
											isMenuHide={true}
										/>
				{/* </TouchableOpacity> */}
			</View>
		);
	};

	return (
		<FlatList
			snapToAlignment="center"
			snapToInterval={Dimensions.get('window').width - horizontalScale(80)}
			pagingEnabled={true}
			scrollEnabled={true}
			ref={scrollRef}
			horizontal={false}
			numColumns={1}
			showsVerticalScrollIndicator={false}
			data={props.data}
			keyExtractor={(item, index) => (item?.matches?._id ?? index).toString()}
			contentContainerStyle={{
				paddingBottom: verticalScale(numColumns ? 120 : 0)
			}}
			// scrollEnabled={scrollEnabled}
			// keyboardShouldPersistTaps={'handled'}
			// onEndReachedThreshold={0.5}
			// onScrollEndDrag={e => {
			//   console.log('onMomentumScrollEnd????', e.nativeEvent.contentOffset.y);
			//   if (e.nativeEvent.contentOffset.y > 50) {
			//     props.onNextPageLoaded();
			//   }
			// }}
			onEndReached={() => {
				console.log('onEndReached??');
				if (!isLoadDiscoverMatch) {
					props.onNextPageLoaded();
				}
			}}
			renderItem={renderItem}
			refreshControl={
				numColumns ? (
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefreshCall}
						title="Pull to refresh"
						tintColor="#fff"
						titleColor="#fff"
					/>
				) : (
					<></>
				)
			}
			ListFooterComponent={() => (
				<>{isLoadDiscoverMatch && <LoadMoreLoaderView />}</>
			)}
		/>
	);
});

export default DiscoverForYouFlatList;

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width - horizontalScale(100),
		borderRadius: verticalScale(15),
		marginHorizontal: horizontalScale(16),
		height: verticalScale(200),
		overflow: 'hidden'
	},
	verticalContainer: {
		//width: Dimensions.get('screen').width / 3 - 24,
		borderRadius: verticalScale(10),
		//height: 120,
		overflow: 'hidden',
		marginHorizontal: horizontalScale(16)
		//marginBottom: verticalScale(10),
		//flex: 1
	},
	subContainer: {
		flex: 1
	},
	titleText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(18),
		textAlign: 'left',
		marginVertical: horizontalScale(8)
	},
	subTitleText: {
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.placeholderColor,
		fontSize: moderateFontScale(10),
		textAlign: 'left',
		marginBottom: verticalScale(30)
	},
	flatListItem: {
		marginHorizontal: horizontalScale(12),
		marginVertical: verticalScale(10),
		flex: 1
	},
	viewTextItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	estimatedTimeText: {
		fontFamily: fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.placeholderColor
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		width: '100%',
		opacity: 0.4
	}
});
