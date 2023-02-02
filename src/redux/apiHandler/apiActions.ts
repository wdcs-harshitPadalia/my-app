/* eslint-disable react-hooks/rules-of-hooks */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {date} from 'yup';
import Contacts from 'react-native-contacts';

import {
	Api,
	ApiBaseUrl,
	ApiConstants,
	ApiPort,
	ApiSecondaryBaseUrl,
	SecondaryApiPort,
	serverKey
} from '../../constants/api';
import Strings from '../../constants/strings';
import {useAxios} from './axiosHelper';

const CancelToken = axios.CancelToken;
export let cancel;

export const login = createAsyncThunk(ApiConstants.login, async (data: any) => {
	console.log('Data : ???!!!', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.login,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	});
	// console.log('response_login', response);
	return response;
});

export const logout = createAsyncThunk(ApiConstants.logout, async () => {
	console.log('Data : ???!!!');
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.logout,
		data: {}
	});
	// console.log('response_login', response);
	return response;
});

export const editProfile = createAsyncThunk(
	ApiConstants.EditProfile,
	async (data: any) => {
		console.log('Data : ???!!!', data);
		const response = await useAxios({
			method: Api.PUT,
			url: ApiBaseUrl + ApiConstants.EditProfile,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: data
		});
		// console.log('response_editProfile', response);
		return response;
	}
);

export const getCategory = async () => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getCategory
	});
	return response;
};

//checkFollowerExists
export const checkFollowerExists = async () => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.checkFollowerExists
	});
	return response;
};

export const getSubcategory = async (categoryID: string) => {
	// if (controller) {
	//   controller.abort();
	//   console.log('getSubcategory aborted?>>>>>>>>');
	// }
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getSubcategory + categoryID,
		// cancelToken: source.token,
		cancelToken: new CancelToken(function executor(c) {
			// An executor function receives a cancel function as a parameter
			cancel = c;
		})
	});
	return response;
};

export const getRandomNumber = async (type: string) => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getRandomNumber + type
	});
	return response;
};

export const getLeagueList = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getLeagueList,
		data: data
	});
	return response;
};

export const getBetType = async () => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getBetType
	});
	return response;
};

export const getAllMatch = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getAllMatch,
		data: data
	});
	return response;
};

export const getFeeds = createAsyncThunk(
	ApiConstants.getAllMatch,
	async (data: any) => {
		const response = await useAxios({
			method: Api.POST,
			url: ApiSecondaryBaseUrl + ApiConstants.getAllMatch,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: data
		});
		// console.log('response_login', response);
		return response;
	}
);

export const getUserNotificationsData = createAsyncThunk(
	ApiConstants.getUserNotifications,
	async (data: any) => {
		const response = await useAxios({
			method: Api.POST,
			url: ApiBaseUrl + ApiConstants.getUserNotifications,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: data
		});
		// console.log('response_login', response);
		return response;
	}
);

export const updatedUserNotificationsStatus = createAsyncThunk(
	ApiConstants.changeNotificationStatus,
	async (data: any) => {
		const response = await useAxios({
			method: Api.PUT,
			url: ApiBaseUrl + ApiConstants.changeNotificationStatus,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: data
		});
		// console.log('response_login', response);
		return {...response, data: data};
	}
);

export const getFilteredFeeds = createAsyncThunk(
	ApiConstants.getFilteredFeeds,
	async (data: any) => {
		const response = await useAxios({
			method: Api.POST,
			url: ApiSecondaryBaseUrl + ApiConstants.getFilteredFeeds,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: data
		});
		// console.log('response_login', response);
		return response;
	}
);

// export const confirmRequest = async (data: any) => {
//   const response = await useAxios({
//     method: Api.PUT,
//     url: ApiBaseUrl + ApiConstants.confirmRequest,
//     data: data,
//   });
//   return response;
// };

export const confirmFriendRequest = createAsyncThunk(
	ApiConstants.confirmRequest,
	async (data: any) => {
		// let updatedRequest = data;
		// delete updatedRequest.notification_id;
		// const response = await useAxios({
		//   method: Api.PUT,
		//   url: ApiBaseUrl + ApiConstants.confirmRequest,
		//   // headers: {
		//   //   'Content-Type': 'application/json',
		//   // },
		//   data: updatedRequest,
		// });
		// // console.log('response_login', response);
		// return {...response, data: data};
		const {notification_id, ...otherParam} = data;
		//delete myData.notification_id;
		const response = await useAxios({
			method: Api.PUT,
			url: ApiBaseUrl + ApiConstants.confirmRequest,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: otherParam
		});
		console.log('response_login', notification_id, otherParam);
		return {...response, data: notification_id, type: otherParam.type};
	}
);

export const declineFriendRequest = createAsyncThunk(
	ApiConstants.declineRequest,
	async (data: any) => {
		const {notification_id, ...otherParam} = data;
		//delete myData.notification_id;
		const response = await useAxios({
			method: Api.DELETE,
			url: ApiBaseUrl + ApiConstants.declineRequest,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: otherParam
		});
		console.log('response_login', notification_id, otherParam);
		return {...response, data: notification_id};
	}
);

export const getLiveStreamingFeeds = createAsyncThunk(
	ApiConstants.getLiveStreamingFeeds,
	async (data: any) => {
		const response = await useAxios({
			method: Api.POST,
			url: ApiBaseUrl + ApiConstants.getLiveStreamingFeeds,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		});
		console.log(
			'getLiveStreamingFeeds??>>>>>>>>>>',
			ApiBaseUrl + ApiConstants.getLiveStreamingFeeds,
			data,
			JSON.stringify(response)
		);
		return response;
	}
);

export const getLiveStreamingData = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getLiveStreamingFeeds,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	});
	return response;
};

export const getBetsPerFeed = createAsyncThunk(
	ApiConstants.getBetsPerEvent,
	async (data: any) => {
		const response = await useAxios({
			method: Api.POST,
			url: ApiSecondaryBaseUrl + ApiConstants.getBetsPerEvent,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: data
		});
		return response;
	}
);

export const getWalletStats = createAsyncThunk(
	ApiConstants.getUserWalletStatsByDate,
	async (data: any) => {
		const response = await useAxios({
			method: Api.POST,
			url: ApiBaseUrl + ApiConstants.getUserWalletStatsByDate,
			// headers: {
			//   'Content-Type': 'application/json',
			// },
			data: data
		});
		// console.log('response_login', response);
		return response;
	}
);

export const getWalletStatics = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getUserWalletStatsByDate,
		data: data
	});
	return response;
};

export const getLiveStreamingCategories = async (data: any) => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getLiveStreamingCategory
		// data: data,
	});
	return response;
};

export const getMainMarket = async (match_id: string) => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getMainMarket + match_id
	});
	return response;
};

export const getTokenType = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getTokenType,
		data: data
	});
	return response;
};

// export const getConvertCurrencyData = async (currency: string) => {
//   const response = await useAxios({
//     method: Api.GET,
//     url: `https://rest.coinapi.io/v1/exchangerate/${currency}/USD`,
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CoinAPI-Key': '9850D6DD-616F-4462-AA7A-93D7793B3992',
//     },
//   });
//   return response;
// };

//https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd
export const getConvertCurrencyData = async (currency: string) => {
	const response = await useAxios({
		method: Api.GET,
		//url: `https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`,
		url: ApiBaseUrl + ApiConstants.getConvertCurrencyData,
		headers: {
			'Content-Type': 'application/json'
		}
	});
	// console.log('getConvertCurrencyData', response, currency);
	// console.log(
	//   'response_login getConvertCurrencyData',
	//   response['matic-network']?.usd,
	// );
	// return response['matic-network']?.usd;
	return response?.data?.[currency?.toUpperCase()];

	//return response?.data?.['MATIC'];
};

export const followUnfollowUser = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.followUnfollowUser,
		data: data
	});
	return response;
};

// export const confirmRequest = async (data: any) => {
//   const response = await useAxios({
//     method: Api.PUT,
//     url: ApiBaseUrl + ApiConstants.confirmRequest,
//     data: data,
//   });
//   return response;
// };

export const addBet = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.addBet,
		data: data
	});
	return response;
};

export const takeBet = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.takeBet,
		data: data
	});
	return response;
};

export const getFollowers = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getFollowers,
		data: data
	});
	return response;
};

// export const getUserNotificationsData = async (data: any) => {
//   const response = await useAxios({
//     method: Api.POST,
//     url: ApiBaseUrl + ApiConstants.getUserNotifications,
//     data: data,
//   });
//   return response;
// };

export const getCMS = async (type: string) => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getCms + type
		//data: data,
	});
	return response;
};

export const validateBets = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.validateBets,
		data: data
	});
	return response;
};

//result_getDisputeResult

export const getDisputeResult = async (data: any) => {
	console.log(
		'getDisputeResult',
		data,
		ApiBaseUrl + ApiConstants.result_getDisputeResult
	);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.result_getDisputeResult,
		data: data
	});
	console.log('getDisputeResult', response);
	return response;
};

export const getVisitorList = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getVisitorList,
		data: data
	});
	return response;
};

export const getUserProfile = createAsyncThunk(
	ApiConstants.getUserProfile,
	async (data: any) => {
		const response = await useAxios({
			method: Api.POST,
			url: ApiBaseUrl + ApiConstants.getUserProfile,
			data: data
		});
		return response;
	}
);

export const getUserBet = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getUserBet,
		data: data
	});
	return response;
};

export const getUserBetStats = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getUserBetStats,
		data: data
	});
	return response;
};

export const getOtherUserProfile = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getUserProfile,
		data: data
	});
	return response;
};

//updateDeviceToken
export const updateDeviceTokenApi = async data => {
	const response = await useAxios({
		method: Api.PUT,
		url: ApiBaseUrl + ApiConstants.updateDeviceToken,
		data: data
	});
	//console.log('updateDeviceTokenApi', response);
};

export const updateUserProfile = async (data: any) => {
	const response = await useAxios({
		method: Api.PUT,
		url: ApiBaseUrl + ApiConstants.EditProfile,
		data: data
		// headers: {
		//   // Accept: 'application/json',
		//   // 'Content-Type': 'multipart/form-data',
		// },
	});
	return response;
};

//Send Notification---------
export const sendNotification = async (data: any) => {
	// console.log('sendNotification', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiConstants.sendNotification,
		headers: {
			Authorization: serverKey
		},
		data: data
	});
};

export const getDiscoverMatches = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getDiscoverMatches,
		data: data,
		cancelToken: new CancelToken(function executor(c) {
			// An executor function receives a cancel function as a parameter
			cancel = c;
		})
	});
	return response;
};

export const getDiscoverData = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getDiscoverData,
		data: data,
		cancelToken: new CancelToken(function executor(c) {
			// An executor function receives a cancel function as a parameter
			cancel = c;
		})
	});
	return response;
};

export const deleteDiscoverData = async (data: any) => {
	const response = await useAxios({
		method: Api.DELETE,
		url: ApiBaseUrl + ApiConstants.deleteDiscoverData,
		data: data
	});
	return response;
};

export const getDiscoverBets = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getDiscoverBets,
		data: data
	});
	return response;
};

export const addRecentBet = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.addRecentBet,
		data: data
	});
	return response;
};

//supportTicket
export const getSupportTicketCommentsById = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.supportTicket.getConversation + data?._id,
		data: {skip: data.skip, limit: data.limit}
	});
	return response;
};

//add comment to support ticket
export const addCommentToSupportTicket = async (data: any, ticket_id: any) => {
	const response = await useAxios({
		method: Api.PUT,
		url:
			ApiBaseUrl + ApiConstants.supportTicket.addSupportChatComment + ticket_id,
		data: data
	});
	return response;
};

export const getAllSupportTickets = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getAllSupportTickets,
		data: data
	});
	return response;
};

export const createTicket = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.createTicket,
		data: data
	});
	return response;
};

export const shareToMyStory = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.shareStory,
		data: data
	});
	return response;
};

export const getAllStoriesData = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getAllStories,
		data: data
	});
	return response;
};

export const getMatchDetails = async (match_id: any) => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getMatchDetails + '?id=' + match_id
	});
	return response;
};

export const getUserBetResult = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getUserBetResult,
		data: data
	});
	return response;
};
//Report match
export const postReportMatch = async (data: any) => {
	//console.log('postReportMatch', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.match_addTag,
		data: data
	});
	return response;
};

export const addCustomBetResult = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.addCustomBetResult,
		data: data
	});
	return response;
};

export const sendNotificationObject = (
	fcmToken: string,
	deviceType: string,
	username: string,
	userDetails: any
) => {
	let data = {
		to: fcmToken,
		priority: 'high',
		data: {
			device_type: deviceType,
			message: `${username} send you a message.`,
			priority: 'high',
			title: 'Chat',
			type: Strings.NOTIFICATION_CHAT_MESSAGE,
			userDetails: userDetails
		},
		notification: {
			body: `${username} send you a message.`,
			sound: 'default',
			title: 'Chat',
			text: `${username} send you a message.`
		}
	};

	return data;
};

export const addJuryVote = async (data: any) => {
	//console.log('addJuryVote', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.addJuryVote,
		data: data
	});
	return response;
};

export const getUserBetDetails = async (betId: string) => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getUserBetDetails + betId
	});
	return response;
};
export const updateChannel = async (data: any) => {
	//console.log('addJuryVote', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.chat.updateChannelStatus,
		data: data
	});
	return response;
};

export const getThreads = async (data: any) => {
	//console.log('addJuryVote', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.chat.getAllThreads,
		data: data
	});
	return response;
};

//updateChannelTimestamp
export const updateChannelTimestamp = async (data: any) => {
	//console.log('addJuryVote', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.chat.updateChannelTimestamp,
		data: data
	});
	return response;
};

export const getJuryCases = async (data: any) => {
	// console.log('getJuryCases', data);
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getJuryCases,
		data: data
	});
	return response;
};

export const getEscrowDeposit = async () => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getEscrowDeposit
	});
	return response;
};

export const claimAmount = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.claimAmount,
		data: data
	});
	return response;
};

export const cancelBet = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.cancelBet,
		data: data
	});
	return response;
};

export const revealDisputeResult = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.revealDisputeResult,
		data: data
	});
	return response;
};

export const removeVisitors = async () => {
	const response = await useAxios({
		method: Api.PUT,
		url: ApiBaseUrl + ApiConstants.removeVisitors
	});
	return response;
};

export const getAvatarList = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getAvatar,
		data: data
	});
	return response;
};

export const getChildBets = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getChildBets,
		data: data
	});
	return response;
};

export const saveJuryVoteTemp = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.saveJuryVoteTemporarily,
		data: data
	});
	return response;
};

export const getAllContacts = createAsyncThunk('getAllContacts', async () => {
	const contacts = await Contacts.getAll();
	// console.log('contacts :: ', JSON.stringify(contacts));
	return contacts;
});

export const getUserList = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getUserList,
		data: data
	});
	return response;
};

export const removeSuggestedUser = async (data: any) => {
	const response = await useAxios({
		method: Api.PUT,
		url: ApiBaseUrl + ApiConstants.removeSuggestedUser,
		data: data
	});
	return response;
};

export const filterUserContacts = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.filterUserContacts,
		data: data
	});
	return response;
};

export const getAllFaqQuestion = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getAllFaq,
		data: data
	});
	return response;
};
export const getExploreData = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getExploreData,
		data: data
	});
	return response;
};

export const validateJury = async () => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.validateJury
	});
	return response;
};

export const getBetsForVideoUpload = async () => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getBetsForVideoUpload
	});
	// console.log('RESPONSE::::', JSON.stringify(response));
	return response;
};

export const deleteUserVideo = async (data: any) => {
	const response = await useAxios({
		method: Api.PUT,
		url: ApiBaseUrl + ApiConstants.deleteVideo,
		data: data
	});
	return response;
};

export const getUserVideoList = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getUserVideos,
		data: data
	});
	// console.log('RESPONSE::::', JSON.stringify(response));
	return response;
};

export const markSeen = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.markSeen,
		data: data
	});
	return response;
};

export const getUserMessageList = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.messageUser,
		data: data
	});
	// console.log('RESPONSE::::', JSON.stringify(response));
	return response;
};

export const getUserAncestor = async () => {
	const response = await useAxios({
		method: Api.GET,
		url: ApiBaseUrl + ApiConstants.getUserAncestor
	});
	return response;
};

export const addFeedUser = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.addFeedUser,
		data: data
	});
	return response;
};

export const getLiveChallengesData = async (data: any) => {
	const response = await useAxios({
		method: Api.POST,
		url: ApiBaseUrl + ApiConstants.getLiveChallenges,
		data: data
	});
	return response;
};