// PRODUCTION
//http://13.59.164.150:5090/api/v1/user/login
const ApiVersion = 'v1';
export const ApiPort = '5009'; // client build port - 5009, local build port - 5011
export const SecondaryApiPort = '5008'; // client build port - 5008, local build port - 5012

export const AppSchema = 'https://truly.fun/';

//export const ApiBaseUrl = `http://13.59.164.150:5090/api/${ApiVersion}/`;
export const FireBaseNotification = 'https://fcm.googleapis.com/fcm/send';
export const serverKey =
	'key=AAAAkKwuLSo:APA91bGSCoopkCOmjeWHD_XnNyj5MD5Fh3uKiTa5kWVZDuncwMOA0dBoK9sGCSdc_RU4gWsoXxRtUaKwj4NJAt80dDRw6Yf3_3gMylReaXVH6PfYpshzwIlFGSJa3B6kKxAp55ZrMepG';
// STAGING - Client
export const ApiBaseUrl = `https://api.truly.fun/api/${ApiVersion}/`;
export const ApiSecondaryBaseUrl = `https://api2.truly.fun/api/${ApiVersion}/`;

// Development - Local
// export const ApiBaseUrl = `http://13.59.164.150:${ApiPort}/api/${ApiVersion}/`;
// export const ApiSecondaryBaseUrl = `http://13.59.164.150:${SecondaryApiPort}/api/${ApiVersion}/`;

// Development - 5009, 5008
// export const ApiBaseUrl = `https://defibet-backend.codezeros.com/api/${ApiVersion}/`;
// export const ApiSecondaryBaseUrl = `https://defibet-backend2.codezeros.com/api/${ApiVersion}/`;

// Development - 5011, 5012
// export const ApiBaseUrl = `https://defibet-backendstaging.codezeros.com/api/${ApiVersion}/`;
// export const ApiSecondaryBaseUrl = `https://defibet-backend2staging.codezeros.com/api/${ApiVersion}/`;

export const nullHash =
	'0x0000000000000000000000000000000000000000000000000000000000000000';

export const nullAddress = '0x0000000000000000000000000000000000000000';

export const nullSignature =
	'0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

//Test net RPC
// export const RpcURL ='https://polygon-mumbai.infura.io/v3/525d9ffd0db943908b59d352df167126';
//Dev RPC
// export const RpcURL =
// 	'https://polygon-mumbai.g.alchemy.com/v2/gdNaCO6rM5ROYvDEwzlwerVWVrLYG0bK';

//Client RPC
export const RpcURL =
	'https://polygon-mumbai.g.alchemy.com/v2/oFp2aIln4SEGstoa-7hWn7njKdZioDlg';
// export const RpcURL = 'https://rpc-mumbai.maticvigil.com/';

//Main net RPC
//export const RpcURL = 'https://rpc-mainnet.maticvigil.com';

export const MagicLinkUrl = 'https://reveal.magic.link/defibet';

//Test net Chain ID
export const chainIdPolygonNetwork = 80001;

//main net Chain ID
//export const chainIdPolygonNetwork = 137;

export const googlePlaceApiKey = '1235';

export const isShowTutorial = true;

export const swipeGestureConfig = {
	velocityThreshold: 0.3,
	directionalOffsetThreshold: 100,
	detectSwipeUp: false,
	detectSwipeDown: false
};

export const decimalValue = 4;

export const widgetBaseUrl = 'https://exchange.mercuryo.io/?widget_id=';
export const metamaskUniversalUrl = 'https://metamask.app.link/send/';

export const videoMinimumDuration = 3;
export const videoMaximumDuration = 15;

export const Api = {
	POST: 'POST',
	GET: 'GET',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE'
};

export const ApiConstants = {
	login: 'user/login',
	Register: 'user/register',
	EditProfile: 'user/editProfile',
	getCategory: 'category/getCategory',
	getSubcategory: 'category/getAllSubCategory/',
	getLeagueList: 'league/getLeagueList',
	getBetType: 'betType/getBetType',
	getAllMatch: 'match/getAllMatch',
	getMatchDetails: 'match/getMatchDetails',
	getMainMarket: 'mainMarket/getMainMarket/',
	getTokenType: 'tokenType/getTokenType/',
	followUnfollowUser: 'user/followUnfollowUser',
	confirmRequest: 'user/confirmRequest',
	addBet: 'bet/addBet',
	logout: 'user/logout',
	getFollowers: 'user/getFollowers',
	getCms: 'cms/getContent/',
	getRandomNumber: 'common/getRandomNumber/',
	getBetsPerEvent: 'bet/getBetsPerEvent/',
	takeBet: 'bet/takeBet',
	getFilteredFeeds: 'match/getFilteredMatchList',
	validateBets: 'bet/validateBets',
	getLiveStreamingCategory: 'category/getCategorySubCategory',
	getLiveStreamingFeeds: 'bet/getLiveFeeds',
	getUserProfile: 'user/getUserProfile/',
	getVisitorList: 'user/getVisitorList',
	getUserBet: 'bet/getUserBet',
	getUserBetStats: 'user/getUserBetStats',
	getUserWalletStatsByDate: 'user/getUserWalletStats',
	checkFollowerExists: 'user/checkFollowerExists',
	updateDeviceToken: 'user/updateDeviceToken',
	getUserNotifications: 'user/getUserNotifications',
	changeNotificationStatus: 'user/changeNotificationStatus',
	declineRequest: 'user/declineRequest',
	sendNotification: 'https://fcm.googleapis.com/fcm/send',
	getDiscoverData: 'discover/getDiscoverData',
	getDiscoverMatches: 'match/getDiscoverMatches',
	deleteDiscoverData: 'discover/deleteDiscoverData',
	getDiscoverBets: 'discover/getDiscoverBets',
	addRecentBet: 'discover/addRecentBet',
	supportTicket: {
		getConversation: 'supportTicket/getConversation/',
		addSupportChatComment: 'supportTicket/addComment/'
	},
	result_getDisputeResult: 'result/getDisputeResult',
	getAllSupportTickets: 'supportTicket/getAllSupportTickets',
	createTicket: 'supportTicket/createTicket',
	getAllStories: 'story/getAllStories',
	shareStory: 'story/shareStory',
	getUserBetResult: 'result/getUserBetResult',
	match_addTag: 'match/addTag',
	addResultDispute: 'result/addResultDispute',
	addCustomBetResult: 'result/addCustomBetResult',
	addJuryVote: 'result/addJuryVote',
	getUserBetDetails: 'result/getUserBetDetails?id=',
	chat: {
		updateChannelStatus: 'user/updateChannel',
		getAllThreads: 'user/getAllThreads',
		updateChannelTimestamp: 'user/updateChannelTimestamp'
	},
	getJuryCases: 'result/getJuryCases',
	getEscrowDeposit: 'user/getEscrowDeposit',
	getConvertCurrencyData: 'tokenType/getTokenList',
	claimAmount: 'result/claimAmount',
	cancelBet: 'bet/cancelBet',
	revealDisputeResult: 'result/revealDisputeResult',
	removeVisitors: 'user/removeVisitors',
	getAvatar: 'user/getAvatar',
	getChildBets: 'bet/getChildBets',
	getUserList: 'user/getUserList',
	removeSuggestedUser: 'user/removeSuggestedUser',
	saveJuryVoteTemporarily: 'result/saveVoteTemporarily',
	filterUserContacts: 'user/filterUserContacts',
	getAllFaq: 'faq/getAllFAQ',
	getRecommendedBets: 'discover/getRecommendedBets',
	getBetsForVideoUpload: 'video/getBetsForVideoUpload',
	validateJury: 'result/validateJury',
	uploadShortVideo: 'video/uploadShortVideo',
	getUserVideos: 'video/getUserVideos',
	deleteVideo: 'video/deleteVideo',
	getExploreData: 'video/getExploreData',
	messageUser: 'video/messageUser',
	markSeen: 'video/markSeen',
	getUserAncestor: 'result/getUserAncestor',
	addFeedUser: 'admin/addFeedUser'
};

export const BotomSharePopupData = [
	{id: 0, text: 'Report...'},
	{id: 1, text: 'Share with...'},
	{id: 2, text: 'Share to my story'}
];
