import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login} from '../apiHandler';
import {
	editProfile,
	getUserProfile,
	logout,
	updateDeviceTokenApi
} from '../apiHandler/apiActions';

export interface UserState {
	data: {
		user: {
			_id: string;
			email: string;
			isSocialLogin: string;
			displayName: string;
			userName: string;
			picture: string;
			walletAddress: string;
			socialLoginType: string;
			level: number;
			isJury: boolean;
			push_notifications: {
				pause_all_notifications: boolean;
				bet_join: boolean;
				bet_replicate: boolean;
				bet_invitation: boolean;
				new_followers: boolean;
				direct_messages: boolean;
				events_you_like: boolean;
				people_you_know: boolean;
				your_friends_bet: boolean;
			};
			videosVisible: string;
			balanceVisible: string;
			betsVisible: string;
			messagesVisible: string;
		};
		token: string;
		isNewUser: boolean;
		isAppLaunched: boolean;
		fcmToken: string;
		shouldShowNotificationBadge: boolean;
		shouldShowChatBadge: boolean;
		bets: [];
		isBiometric: boolean;
		isSyncContact: boolean;
		totalBalance: string;
		maximumLevelBets: number;
		minimumLevelBets: number;
		totalBets: number;
		platformFees: number;
	};
}

const initialState: UserState = {
	data: {
		user: {
			_id: '',
			email: '',
			isSocialLogin: '',
			displayName: '',
			userName: '',
			picture: '',
			walletAddress: '',
			socialLoginType: '',
			level: 0,
			push_notifications: {
				pause_all_notifications: false,
				bet_join: false,
				bet_replicate: false,
				bet_invitation: false,
				new_followers: false,
				direct_messages: false,
				events_you_like: false,
				people_you_know: false,
				your_friends_bet: false
			}
		},
		videosVisible: '',
		balanceVisible: '',
		betsVisible: '',
		messagesVisible: '',
		token: '',
		isNewUser: false,
		isAppLaunched: true,
		fcmToken: '',
		shouldShowNotificationBadge: false,
		bets: [],
		isBiometric: false,
		shouldShowChatBadge: false,
		isSyncContact: true,
		totalBalance: '0',
		maximumLevelBets: 0,
		minimumLevelBets: 0,
		totalBets: 0,
		platformFees: 0
	}
};

export const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		// myProfileDataReset: (state, action: PayloadAction<any>) => {
		//   if (action.payload?.userProfileData !== undefined) {
		//     state.data = action.payload?.userProfileData;
		//   }
		// },
		updateTotalBalance: (state, action: PayloadAction<any>) => {
			state.data.totalBalance = action.payload;
		},
		updateChatBadgeStatus: (state, action: PayloadAction<any>) => {
			state.data.shouldShowChatBadge = action.payload;
		},
		updateNotificationBadgeStatus: (state, action: PayloadAction<any>) => {
			state.data.shouldShowNotificationBadge = action.payload;
		},
		updateProfileData: (state, action: PayloadAction<any>) => {
			state.data.user = {...state.data.user, ...action.payload};
		},
		resetProfileData: (state, action: PayloadAction<any>) => {
			//console.log('state.data?>?', state.data);
			state.data = {};
			// console.log('state.data?>?', state.data);
		},
		updateDeviceToken: (state, action: PayloadAction<any>) => {
			//console.log('action.payload.deviceToken', action.payload.deviceToken);
			state.data.token = action.payload.deviceToken;
		},
		updateFCMToken: (state, action: PayloadAction<any>) => {
			//console.log('action.payload.deviceToken', action.payload.fcmToken);
			state.data.fcmToken = action.payload.fcmToken;
		},
		updateAppLaunched: (state, action: PayloadAction<any>) => {
			state.data.isAppLaunched = false;
		},
		updateBiometric: (state, action: PayloadAction<any>) => {
			console.log('action.payload.updateBiometric', action.payload);
			state.data.isBiometric = action.payload;
		},
		updateSyncContact: (state, action: PayloadAction<any>) => {
			console.log('action.payload.updateSyncContact', action.payload);
			state.data.isSyncContact = action.payload;
		}
	},

	extraReducers: builder => {
		//Login -----------
		// builder.addCase(login.fulfilled, (state, action) => {
		//   console.log('login userInfo Success Payload : ', action.payload);
		//   state.userData = action.payload.data ? action.payload.data : {};
		// });
		builder.addCase(login.fulfilled, (state, action) => {
			// console.log("login Success Payload : ", action.payload);
			//console.log('login fulfilled Payload : ', action.payload?.data);
			state.data = action.payload?.data;
			state.data.isSyncContact = true;
			//console.log('state.data>>?????????', state.data);
			//_storeData(action.payload);
		});
		builder.addCase(login.rejected, (state, action) => {
			console.log('login userInfo Reject Payload : ', action);
		});

		builder.addCase(logout.fulfilled, (state, action) => {
			// console.log("login Success Payload : ", action.payload);
			console.log('logout fulfilled Payload : ');
			//state.data = action.payload?.data;
			//_storeData(action.payload);
		});
		builder.addCase(logout.rejected, (state, action) => {
			console.log('logout userInfo Reject Payload : ', action);
		});
		builder.addCase(
			editProfile.fulfilled,
			(state, action: PayloadAction<any>) => {
				// console.log("login Success Payload : ", action.payload);
				// console.log('editProfile fulfilled Payload : ', action.payload);
				// console.log('state.data.user', state.data.user);
				state.data.user = {...state.data.user, ...action.payload?.data.user};
				state.data.isNewUser = false;
				//console.log('state.data.user after update', state.data);
				//updateDeviceTokenApi({deviceToken: state.data.fcmToken});
				//state.loginData = action.payload;
				//_storeData(action.payload);
			}
		);

		//getUserProfile User ------------------------
		builder.addCase(getUserProfile.fulfilled, (state, action) => {
			//console.log('getUserProfile Success Payload : ', action.payload);
			state.data.user = {...state.data.user, ...action.payload?.data.user};
			state.data.bets = action.payload?.data.bets;
		});
		builder.addCase(getUserProfile.rejected, (state, action) => {
			console.log('getUserProfile Reject Payload : ', action);
		});
	}
});

// Action creators are generated for each case reducer function

export const {
	myProfileDataReset,
	updateProfileData,
	updateDeviceToken,
	updateAppLaunched,
	resetProfileData,
	updateFCMToken,
	updateNotificationBadgeStatus,
	updateBiometric,
	updateChatBadgeStatus,
	updateSyncContact,
	updateTotalBalance
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
