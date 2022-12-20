import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
	getBetsPerFeed,
	getFeeds,
	getFilteredFeeds,
	getLiveStreamingFeeds,
	getWalletStats
} from '../apiHandler/apiActions';
import store from '../store';
import {updateApiLoader} from './preLogin';
interface walletStatsType {
	walletStatsInfo: Object;
	failed: Boolean;
	loading: Boolean;
	walletStats: any;
	walletStatsLoading: Boolean;
	walletStatsFailed: Boolean;
}

export const initialState: walletStatsType = {
	walletStatsInfo: {},
	failed: false,
	loading: false,
	walletStats: {},
	walletStatsLoading: false,
	walletStatsFailed: false
};
const wallet = createSlice({
	name: 'wallet',
	initialState: initialState,
	reducers: {
		resetWalletData: (state, action: PayloadAction<any>) => {
			state.walletStats = {};
		}
	},
	extraReducers: builder => {
		//getFeeds -----------
		builder.addCase(getWalletStats.pending, (state, action) => {
			state.loading = true;
			state.walletStatsLoading = true;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(getWalletStats.fulfilled, (state, action) => {
			// state.failed = false;
			// state.loading = false;
			// //store.dispatch(updateApiLoader({apiLoader: false}));
			// console.log(
			//   'getwallet Success Payload : ',
			//   JSON.stringify(action.payload),
			// );
			// if (
			//   action.payload?.data?.walletData &&
			//   state.walletStats?.walletStats?.walletData
			// ) {
			//   console.log('state.feedData?.matchList???>>>', state.walletStats);
			//   state.walletStats.walletData = [
			//     ...state.walletStats?.walletData,
			//     ...action.payload?.data?.walletData,
			//   ];
			// } else {
			//   state.walletStats = action.payload?.data;
			// }

			state.failed = false;
			state.loading = false;
			state.walletStatsLoading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			// console.log(
			//   'getWallertrtlrkrtlkrtlrtkrtlk Success Payload : ',
			//   JSON.stringify(action.payload?.data),
			// );
			if (action.payload?.data?.walletData && state.walletStats?.walletData) {
				// console.log('state.feedData?.matchList???>>>', state.walletStats);
				state.walletStats.walletData = [
					...state.walletStats?.walletData,
					...action.payload?.data?.walletData
				];
			} else {
				if (
					action.payload?.data?.walletData &&
					action.payload?.data?.walletData.length > 0
				) {
					state.walletStats = action.payload?.data;
					state.failed = false;
					state.walletStatsFailed = false;
				} else {
					state.failed = true;
					state.walletStatsFailed = true;
				}
			}
		});
		builder.addCase(getWalletStats.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			//console.log('getFeeds Error Payload : ', action?.error);
			state.loading = false;
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			// state.loginData = errorObj;
			state.failed = true;
			state.walletStatsFailed = true;
			state.walletStatsLoading = false;
		});
	}
});

export const {resetWalletData} = wallet.actions;
export default wallet;
