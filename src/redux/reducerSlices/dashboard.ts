import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	getBetsPerFeed,
	getFeeds,
	getFilteredFeeds,
	getLiveStreamingFeeds
} from '../apiHandler/apiActions';
import store from '../store';
import {updateApiLoader} from './preLogin';
interface dashBoardType {
	feedData: Object;
	failed: Boolean;
	loading: Boolean;
	betsPerFeedLoading: Boolean;
	filterLoading: Boolean;
	filterFailed: Boolean;
	betsPerFeed: Array<any>;
	filteredFeeds: Array<any>;
	liveFeeds: Array<any>;
	liveFeedsLoading: Boolean;
	liveFeedsFailed: Boolean;
	isFromPullToRefresh: Boolean;
	isHideBottomTab: Boolean;
	shouldFeedRefreshOnFocus: Boolean;
	shouldDiscoverRefreshOnFocus: Boolean;
	isShowInviteUser: Boolean;
	isShowTutorial: Boolean;
	isShowCreateHighlights: Boolean;
	isShowSuggestedUser: Boolean;
}

export const initialState: dashBoardType = {
	feedData: {},
	failed: false,
	loading: false,
	betsPerFeed: [],
	filteredFeeds: [],
	filterLoading: false,
	filterFailed: false,
	shouldFeedRefreshOnFocus: false,
	liveFeeds: [],
	liveFeedsLoading: false,
	liveFeedsFailed: false,
	isFromPullToRefresh: false,
	isHideBottomTab: false,
	betsPerFeedLoading: false,
	shouldDiscoverRefreshOnFocus: false,
	isShowInviteUser: false,
	isShowTutorial: false,
	isShowCreateHighlights: false,
	isShowSuggestedUser: false
};
const dashBoard = createSlice({
	name: 'dashBoard',
	initialState: initialState,
	reducers: {
		resetFeeds: (state, action: PayloadAction<any>) => {
			console.log('resetFeeds??>>>', action?.payload.isFromPullToRefresh);
			state.isFromPullToRefresh = action?.payload.isFromPullToRefresh;

			if (action?.payload.isFromPullToRefresh) {
				//state.feedData = {};
			} else {
				state.feedData = {};
			}
		},
		resetBetsPerFeed: (state, action: PayloadAction<any>) => {
			state.betsPerFeed = [];
		},
		resetFilteredFeeds: (state, action: PayloadAction<any>) => {
			console.log(
				'resetFilteredFeeds??>>>',
				action?.payload.isFromPullToRefresh
			);

			state.isFromPullToRefresh = action?.payload.isFromPullToRefresh;

			if (action?.payload.isFromPullToRefresh) {
			} else {
				state.filteredFeeds = [];
			}
			// state.filteredFeeds = [];
		},
		resetLiveFeeds: (state, action: PayloadAction<any>) => {
			state.liveFeeds = [];
		},

		hideBottomTab: (state, action: PayloadAction<any>) => {
			console.log('tempTutorial 1315456'), action;

			state.isHideBottomTab = action?.payload.isHideBottomTab;
		},
		resetPullToRefresh: (state, action: PayloadAction<any>) => {
			state.isFromPullToRefresh = false;
		},
		updateFeedRefreshOnFocus: (state, action: PayloadAction<any>) => {
			console.log('action>>', action);
			state.shouldFeedRefreshOnFocus = action?.payload;
		},
		updateDiscoverRefreshOnFocus: (state, action: PayloadAction<any>) => {
			// console.log('action>>', action);
			state.shouldDiscoverRefreshOnFocus = action?.payload;
		},
		showInviteUser: (state, action: PayloadAction<any>) => {
			state.isShowInviteUser = action?.payload.isShowInviteUser;
		},
		showTutorial: (state, action: PayloadAction<any>) => {
			state.isShowTutorial = action?.payload.isShowTutorial;
		},
		showCreateHighlights: (state, action: PayloadAction<any>) => {
			state.isShowCreateHighlights = action?.payload.isShowCreateHighlights;
		},
		showSuggestedUser: (state, action: PayloadAction<any>) => {
			state.isShowSuggestedUser = action?.payload.isShowSuggestedUser;
		}
	},
	extraReducers: builder => {
		//getFeeds -----------
		builder.addCase(getFeeds.pending, (state, action) => {
			state.loading = true;
			state.failed = false;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(getFeeds.fulfilled, (state, action) => {
			state.failed = false;
			state.loading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			// console.log('getFeeds Success Payload : ', JSON.stringify(action.payload));
			if (
				action.payload?.data?.matchList &&
				state.feedData?.matchList &&
				!state.isFromPullToRefresh
			) {
				console.log('state.feedData?.matchList???>>>', state.feedData);
				state.feedData.matchList = [
					...state.feedData?.matchList,
					...action.payload?.data?.matchList
				];
			} else {
				state.feedData = action.payload?.data;
				state.isFromPullToRefresh = false;
			}
			if (action.payload?.data?.matchCount === 0) {
				state.failed = true;
			}
		});
		builder.addCase(getFeeds.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			console.log('getFeeds Error Payload : ', action?.error);
			state.loading = false;
			if (state.isFromPullToRefresh) {
				state.feedData = {};
			}
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			// state.loginData = errorObj;
			state.failed = true;
		});

		//getFilteredFeeds -----------
		builder.addCase(getFilteredFeeds.pending, (state, action) => {
			state.filterLoading = true;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(getFilteredFeeds.fulfilled, (state, action) => {
			state.filterFailed = false;
			state.filterLoading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			//console.log('get filter Feeds Success Payload : ', action.payload);
			// if (action.payload?.data?.matchList && state.filteredFeeds?.matchList) {
			//   //console.log('state.feedData?.matchList???>>>', state.filteredFeeds);
			//   state.filteredFeeds.matchList = [
			//     ...state.filteredFeeds?.matchList,
			//     ...action.payload?.data?.matchList,
			//   ];
			// } else {
			//   if (action.payload?.data?.matchCount === 0) {
			//     state.filterFailed = true;
			//   }
			//   state.filteredFeeds = action.payload?.data;
			// }

			if (
				action.payload?.data?.matchList &&
				state.filteredFeeds?.matchList &&
				!state.isFromPullToRefresh
			) {
				console.log('state.feedData?.matchList???>>>', state.feedData);
				state.filteredFeeds.matchList = [
					...state.filteredFeeds?.matchList,
					...action.payload?.data?.matchList
				];
			} else {
				state.filteredFeeds = action.payload?.data;
			}
			if (action.payload?.data?.matchCount === 0) {
				state.filterFailed = true;
			}
		});
		builder.addCase(getFilteredFeeds.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			console.log('getFeeds Error Payload : ', action?.error);
			state.filterLoading = false;
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			// state.loginData = errorObj;
			state.filterFailed = true;
		});

		//getLiveFeeds -----------
		builder.addCase(getLiveStreamingFeeds.pending, (state, action) => {
			state.liveFeedsLoading = true;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(getLiveStreamingFeeds.fulfilled, (state, action) => {
			//state.liveFeedsFailed = false;
			state.liveFeedsLoading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			//console.log('get live Feeds Success Payload : ', action.payload);
			if (action.payload?.data?.matchList && state.liveFeeds?.matchList) {
				//console.log('state.feedData?.matchList???>>>', state.liveFeeds);
				state.liveFeeds.matchList = [
					...state.liveFeeds?.matchList,
					...action.payload?.data?.matchList
				];
			} else {
				// console.log(
				//   'action.payload?.data?.matchList?.length??',
				//   action.payload?.data?.matchList?.length,
				// );
				if (action.payload?.data?.matchList?.length == 0) {
					state.liveFeedsFailed = true;
				} else {
					state.liveFeedsFailed = false;
				}
				state.liveFeeds = action.payload?.data;
			}
		});
		builder.addCase(getLiveStreamingFeeds.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			console.log('getFeeds Error Payload : ', action?.error);
			state.liveFeedsLoading = false;
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			// state.loginData = errorObj;
			state.liveFeedsFailed = true;
		});

		//getbetperevent -----------
		builder.addCase(getBetsPerFeed.pending, (state, action) => {
			state.betsPerFeedLoading = true;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(getBetsPerFeed.fulfilled, (state, action) => {
			state.failed = false;
			state.betsPerFeedLoading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			// console.log(
			//   'getBetsPerFeed Success Payload : ',
			//   JSON.stringify(action.payload),
			// );
			// if (action.payload?.data?.matchList && state.feedData?.matchList) {
			//   console.log(
			//     'state.feedData?.matchList???>>>',
			//     state.feedData?.matchList,
			//   );
			//   state.feedData.matchList = [
			//     ...state.feedData?.matchList,
			//     ...action.payload?.data?.matchList,
			//   ];
			// } else {
			state.betsPerFeed = action.payload?.data;
			// }
		});
		builder.addCase(getBetsPerFeed.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			console.log('getFeeds Error Payload : ', action?.error);
			state.betsPerFeedLoading = false;
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			// state.loginData = errorObj;
			state.failed = true;
		});
	}
});

export const {
	resetFeeds,
	resetBetsPerFeed,
	resetFilteredFeeds,
	resetLiveFeeds,
	hideBottomTab,
	updateFeedRefreshOnFocus,
	resetPullToRefresh,
	updateDiscoverRefreshOnFocus,
	showInviteUser,
	showTutorial,
	showCreateHighlights,
	showSuggestedUser
} = dashBoard.actions;
export default dashBoard;
