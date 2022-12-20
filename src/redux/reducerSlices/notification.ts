import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LayoutAnimation} from 'react-native';
import {
	confirmFriendRequest,
	declineFriendRequest,
	getBetsPerFeed,
	getFeeds,
	getFilteredFeeds,
	getLiveStreamingFeeds,
	getUserNotificationsData,
	updatedUserNotificationsStatus
} from '../apiHandler/apiActions';
import store from '../store';
import {updateApiLoader} from './preLogin';
interface dashBoardType {
	failed: Boolean;
	loading: Boolean;
	notificationData: Object;
	newNotifications: Array<any>;
	previousNotifications: Array<any>;
	//message: String;
}

export const initialState: dashBoardType = {
	failed: false,
	loading: false,
	notificationData: {},
	newNotifications: [],
	previousNotifications: [],
	message: ''
};
const notification = createSlice({
	name: 'notification',
	initialState: initialState,
	reducers: {
		resetNotifications: (state, action: PayloadAction<any>) => {
			state.notificationData = {};
			state.newNotifications = [];
			state.previousNotifications = [];
		},
		deleteItemById: (state, action: PayloadAction<any>) => {
			state.newNotifications = state.newNotifications.filter(item => {
				return item._id !== action.payload;
			});

			state.previousNotifications = state.previousNotifications.filter(item => {
				return item._id !== action.payload;
			});

			if (
				!state.previousNotifications.length &&
				!state.newNotifications.length
			) {
				state.failed = true;
			}
		},
		notifyOnNewMessageSend: (state, action: PayloadAction<any>) => {
			state.message = action.payload;
		}
	},
	extraReducers: builder => {
		//getUserNotification -----------
		builder.addCase(getUserNotificationsData.pending, (state, action) => {
			state.loading = true;
			state.failed = false;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(getUserNotificationsData.fulfilled, (state, action) => {
			state.failed = false;
			state.loading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			//state.notificationData = action.payload?.data;
			// console.log(
			//   'getUserNotificationsData Success Payload : ',
			//   JSON.stringify(action.payload),
			// );

			state.notificationData = action.payload?.data;

			if (action.payload?.data?.new && action.payload?.data?.new.length > 0) {
				state.newNotifications = [
					...state.newNotifications,
					...action.payload?.data?.new
				];
			}

			if (
				action.payload?.data?.previous &&
				action.payload?.data?.previous.length > 0
			) {
				state.previousNotifications = [
					...state.previousNotifications,
					...action.payload?.data?.previous
				];
			}

			//   state.previousNotifications = [
			//     ...state.previousNotifications,
			//     ...action.payload?.data?.previous,
			//   ];
			//   state.newNotifications = action.payload?.data?.new;
			//   state.previousNotifications = action.payload?.data?.previous;

			if (action.payload?.data?.count === 0) {
				state.failed = true;
			}
		});
		builder.addCase(getUserNotificationsData.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			console.log('getUserNotificationsData Error Payload : ', action?.error);
			state.loading = false;
			//   const errorObj = JSON.parse(action?.error?.message);
			//   console.log('login Reject Payload Error : ', errorObj);
			// state.loginData = errorObj;
			state.failed = true;
		});

		//change notification un read to read
		builder.addCase(updatedUserNotificationsStatus.pending, (state, action) => {
			// state.loading = true;
			// state.failed = false;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(
			updatedUserNotificationsStatus.fulfilled,
			(state, action) => {
				console.log(
					'updatedUserNotificationsStatus????',
					action.payload.data?.notification_id
				);
				state.newNotifications.filter((item, index) => {
					if (item._id === action.payload.data?.notification_id) {
						let temp = state.newNotifications;
						temp[index].notificationStatus = 'read';

						state.newNotifications = [...temp];
						state.notificationData.allNotificationCount =
							state.notificationData.allNotificationCount > 0
								? state.notificationData.allNotificationCount - 1
								: 0;

						// if (item.type === 'BET') {
						//   state.notificationData.betsNotificationCount =
						//     state.notificationData.betsNotificationCount > 0
						//       ? state.notificationData.betsNotificationCount - 1
						//       : 0;
						// } else
						if (item.type === 'FRIEND') {
							state.notificationData.friendNotificationCount =
								state.notificationData.friendNotificationCount > 0
									? state.notificationData.friendNotificationCount - 1
									: 0;
						} else if (item.superType === 'bet') {
							state.notificationData.betsNotificationCount =
								state.notificationData.betsNotificationCount > 0
									? state.notificationData.betsNotificationCount - 1
									: 0;
						}
					}
				});

				state.previousNotifications.filter((item, index) => {
					if (item._id === action.payload.data?.notification_id) {
						let temp = state.previousNotifications;
						temp[index].notificationStatus = 'read';

						state.previousNotifications = [...temp];
						state.notificationData.allNotificationCount =
							state.notificationData.allNotificationCount > 0
								? state.notificationData.allNotificationCount - 1
								: 0;

						// if (item.type === 'BET') {
						//   state.notificationData.betsNotificationCount =
						//     state.notificationData.betsNotificationCount > 0
						//       ? state.notificationData.betsNotificationCount - 1
						//       : 0;
						// } else
						if (item.type === 'FRIEND') {
							state.notificationData.friendNotificationCount =
								state.notificationData.friendNotificationCount > 0
									? state.notificationData.friendNotificationCount - 1
									: 0;
						} else if (item.superType === 'bet') {
							state.notificationData.betsNotificationCount =
								state.notificationData.betsNotificationCount > 0
									? state.notificationData.betsNotificationCount - 1
									: 0;
						}
					}
				});
				// state.failed = false;
				// state.loading = false;
				//store.dispatch(updateApiLoader({apiLoader: false}));
				//state.notificationData = action.payload?.data;
			}
		);
		builder.addCase(
			updatedUserNotificationsStatus.rejected,
			(state, action) => {
				//store.dispatch(updateApiLoader({apiLoader: false}));
				console.log(
					'updatedUserNotificationsStatus Error Payload : ',
					action?.error
				);
				// state.loading = false;
				// //   const errorObj = JSON.parse(action?.error?.message);
				// //   console.log('login Reject Payload Error : ', errorObj);
				// // state.loginData = errorObj;
				// state.failed = true;
			}
		);

		//confirm friend request notification
		builder.addCase(confirmFriendRequest.pending, (state, action) => {
			// state.loading = true;
			// state.failed = false;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(confirmFriendRequest.fulfilled, (state, action) => {
			console.log(
				'updatedUserNotificationsStatus????',
				action.payload.data,
				action.payload.type
			);
			if (action.payload.type === 'JURY_INVITATION') {
				state.newNotifications.filter((item, index) => {
					if (item._id === action.payload.data) {
						let temp = state.newNotifications;
						temp[index].notificationStatus = 'read';

						state.newNotifications = [...temp];
						state.notificationData.allNotificationCount =
							state.notificationData.allNotificationCount > 0
								? state.notificationData.allNotificationCount - 1
								: 0;

						// if (item.type === 'BET') {
						state.notificationData.betsNotificationCount =
							state.notificationData.betsNotificationCount > 0
								? state.notificationData.betsNotificationCount - 1
								: 0;
						// } else if (item.type === 'FRIEND') {
						// state.notificationData.friendNotificationCount =
						//   state.notificationData.friendNotificationCount > 0
						//     ? state.notificationData.friendNotificationCount - 1
						//     : 0;
						//  }
					}
				});

				state.previousNotifications.filter((item, index) => {
					if (item._id === action.payload.data) {
						let temp = state.previousNotifications;
						temp[index].notificationStatus = 'read';

						state.previousNotifications = [...temp];
						state.notificationData.allNotificationCount =
							state.notificationData.allNotificationCount > 0
								? state.notificationData.allNotificationCount - 1
								: 0;

						// if (item.type === 'BET') {
						//   state.notificationData.betsNotificationCount =
						//     state.notificationData.betsNotificationCount > 0
						//       ? state.notificationData.betsNotificationCount - 1
						//       : 0;
						// } else
						if (item.type === 'FRIEND') {
							state.notificationData.friendNotificationCount =
								state.notificationData.friendNotificationCount > 0
									? state.notificationData.friendNotificationCount - 1
									: 0;
						} else if (item.superType === 'bet') {
							state.notificationData.betsNotificationCount =
								state.notificationData.betsNotificationCount > 0
									? state.notificationData.betsNotificationCount - 1
									: 0;
						}
					}
				});
				state.newNotifications = state.newNotifications.filter(item => {
					return item._id !== action.payload.data;
				});

				state.previousNotifications = state.previousNotifications.filter(
					item => {
						return item._id !== action.payload.data;
					}
				);
			} else {
				state.newNotifications.filter((item, index) => {
					if (item._id === action.payload.data) {
						let temp = state.newNotifications;
						temp[index].isAccepted = true;
						//temp[index].notificationStatus = 'read';
						state.newNotifications = [...temp];

						// if (item.type === 'BET') {
						//   state.notificationData.betsNotificationCount =
						//     state.notificationData.betsNotificationCount > 0
						//       ? state.notificationData.betsNotificationCount - 1
						//       : 0;
						// } else if (item.type === 'FRIEND') {
						//   state.notificationData.friendNotificationCount =
						//     state.notificationData.friendNotificationCount > 0
						//       ? state.notificationData.friendNotificationCount - 1
						//       : 0;
						// }
					}
				});

				state.previousNotifications.filter((item, index) => {
					if (item._id === action.payload.data) {
						let temp = state.previousNotifications;
						temp[index].isAccepted = true;
						//temp[index].notificationStatus = 'read';

						state.previousNotifications = [...temp];
						// state.notificationData.allNotificationCount =
						//   state.notificationData.allNotificationCount > 0
						//     ? state.notificationData.allNotificationCount - 1
						//     : 0;

						// if (item.type === 'BET') {
						//   state.notificationData.betsNotificationCount =
						//     state.notificationData.betsNotificationCount > 0
						//       ? state.notificationData.betsNotificationCount - 1
						//       : 0;
						// } else if (item.type === 'FRIEND') {
						//   state.notificationData.friendNotificationCount =
						//     state.notificationData.friendNotificationCount > 0
						//       ? state.notificationData.friendNotificationCount - 1
						//       : 0;
						// }
					}
				});
			}

			// state.failed = false;
			// state.loading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			//state.notificationData = action.payload?.data;
		});
		builder.addCase(confirmFriendRequest.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			console.log(
				'updatedUserNotificationsStatus Error Payload : ',
				action?.error
			);
			// state.loading = false;
			// //   const errorObj = JSON.parse(action?.error?.message);
			// //   console.log('login Reject Payload Error : ', errorObj);
			// // state.loginData = errorObj;
			// state.failed = true;
		});

		//reject friend request notification
		builder.addCase(declineFriendRequest.pending, (state, action) => {
			// state.loading = true;
			// state.failed = false;
			//store.dispatch(updateApiLoader({apiLoader: true}));
		});
		builder.addCase(declineFriendRequest.fulfilled, (state, action) => {
			console.log('declineFriendRequest????', action.payload.data);

			state.newNotifications.filter((item, index) => {
				if (item._id === action.payload.data) {
					let temp = state.newNotifications;
					temp[index].notificationStatus = 'read';

					state.newNotifications = [...temp];
					state.notificationData.allNotificationCount =
						state.notificationData.allNotificationCount > 0
							? state.notificationData.allNotificationCount - 1
							: 0;

					// if (item.type === 'BET') {
					//   state.notificationData.betsNotificationCount =
					//     state.notificationData.betsNotificationCount > 0
					//       ? state.notificationData.betsNotificationCount - 1
					//       : 0;
					// } else
					if (item.type === 'FRIEND') {
						state.notificationData.friendNotificationCount =
							state.notificationData.friendNotificationCount > 0
								? state.notificationData.friendNotificationCount - 1
								: 0;
					} else if (item.superType === 'bet') {
						state.notificationData.betsNotificationCount =
							state.notificationData.betsNotificationCount > 0
								? state.notificationData.betsNotificationCount - 1
								: 0;
					}
				}
			});

			state.previousNotifications.filter((item, index) => {
				if (item._id === action.payload.data) {
					let temp = state.previousNotifications;
					temp[index].notificationStatus = 'read';

					state.previousNotifications = [...temp];
					state.notificationData.allNotificationCount =
						state.notificationData.allNotificationCount > 0
							? state.notificationData.allNotificationCount - 1
							: 0;

					// if (item.type === 'BET') {
					//   state.notificationData.betsNotificationCount =
					//     state.notificationData.betsNotificationCount > 0
					//       ? state.notificationData.betsNotificationCount - 1
					//       : 0;
					// } else
					if (item.type === 'FRIEND') {
						state.notificationData.friendNotificationCount =
							state.notificationData.friendNotificationCount > 0
								? state.notificationData.friendNotificationCount - 1
								: 0;
					} else if (item.superType === 'bet') {
						state.notificationData.betsNotificationCount =
							state.notificationData.betsNotificationCount > 0
								? state.notificationData.betsNotificationCount - 1
								: 0;
					}
				}
			});
			state.newNotifications = state.newNotifications.filter(item => {
				return item._id !== action.payload.data;
			});

			state.previousNotifications = state.previousNotifications.filter(item => {
				return item._id !== action.payload.data;
			});

			if (
				!state.previousNotifications.length &&
				!state.newNotifications.length
			) {
				state.failed = true;
			}

			// state.failed = false;
			// state.loading = false;
			//store.dispatch(updateApiLoader({apiLoader: false}));
			//state.notificationData = action.payload?.data;
		});
		builder.addCase(declineFriendRequest.rejected, (state, action) => {
			//store.dispatch(updateApiLoader({apiLoader: false}));
			console.log('declineFriendRequest Error Payload : ', action?.error);
			// state.loading = false;
			// //   const errorObj = JSON.parse(action?.error?.message);
			// //   console.log('login Reject Payload Error : ', errorObj);
			// // state.loginData = errorObj;
			// state.failed = true;
		});
	}
});

export const {resetNotifications, deleteItemById, notifyOnNewMessageSend} =
	notification.actions;
export default notification;
