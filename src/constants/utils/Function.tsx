import moment from 'moment';
import {ApiBaseUrl, AppSchema, isShowTutorial, RpcURL} from '../api';
import ExpoFastImage from 'expo-fast-image';
import {createImageProgress} from 'react-native-image-progress';
import Web3 from 'web3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createThumbnail} from 'react-native-create-thumbnail';
import * as Yup from 'yup';

import {MAGIC_API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {magic} from '../../navigation/routes';
import {Alert, Linking, Platform} from 'react-native';
import icons from '../../assets/icon';
import ScreenNames from '../../navigation/screenNames';
import Strings from '../strings';

// import RNFetchBlob from 'rn-fetch-blob';
import {getBundleId} from 'react-native-device-info';
import {saveToCameraRoll} from '@react-native-community/cameraroll';
import axios from 'axios';

const appSharePostFixURL = 'share/?shareapp=true&deeplinktype=share';
const eventSharePostFixUrl =
	'/?title=%title&matchId=%matchId&betCreationType=%betCreationType&id=%id&deeplinktype=match';
const betSharePostFixURL =
	'/?title=%title&betId=%betId&betCreationType=%betCreationType&id=%id&deeplinktype=bet';
const joinSharePostFixUrl = '/?betId=%betId&id=%id&deeplinktype=bet';
const videoSharePostFixUrl = '/?video_id=%id&type=video&deeplinktype=video';
export const getInitialDate = () => {
	const date1 = new Date();
	const subtractYears = 18;
	date1.setFullYear(date1.getFullYear() - subtractYears);
	return date1;
};

global.isFromLogin = false;

export const getPieChartDataRounded = (data: number[]) => {
	return data.map((item, index) => {
		const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		let key = 'url(#gradient' + index + ')';
		return {
			key: index,
			value: item,
			svg: {fill: key},
			arc: {cornerRadius: 10},
			spacing: 2
		};
	});
};

export const timeConvert = (timeStamp: number, subtractMinute: number = 0) => {
	let time = moment
		.unix(timeStamp / 1000)
		.subtract(subtractMinute, 'minute')
		.format('HH:mm');
	return time;
};

export const dateConvert = (
	timeStamp: number,
	timeFormat?: string,
	subtractMinute: number = 0
) => {
	if (
		moment
			.unix(timeStamp / 1000)
			.subtract(subtractMinute, 'minute')
			.format('DD MMM') ===
		moment().subtract(subtractMinute, 'minute').format('DD MMM')
	) {
		return 'Today - ';
	}
	let time = moment
		.unix(timeStamp / 1000)
		.subtract(subtractMinute, 'minute')
		.format(timeFormat ?? 'DD MMM.');
	return time;
};

export const dateFormatConvert = (timeStamp: number) => {
	if (
		moment.unix(timeStamp / 1000).format('DD MMM') === moment().format('DD MMM')
	) {
		return 'Today';
	}
	let time = moment.unix(timeStamp / 1000).format('DD/MM/YYYY');
	return time;
};

export const dateTimeConvert = (timeStamp: number) => {
	if (moment(timeStamp).format('DD MMM') === moment().format('DD MMM')) {
		return 'Today' + moment(timeStamp).format(' - HH:mm');
	}
	let time = moment(timeStamp).format('DD MMM YYYY - HH:mm');
	return time;
};

export const dateTimeStreamingConvert = (timeStamp: number) => {
	if (moment(timeStamp).format('DD MMM') === moment().format('DD MMM')) {
		return 'Today ' + moment(timeStamp).format('.HH:mm');
	}
	let time = moment(timeStamp).format('DD MMM. HH:mm');
	return time;
};

export const dateTimeLiveStreamingConvert = (timeStamp: number) => {
	if (moment(timeStamp).format('DD MMM') === moment().format('DD MMM')) {
		return 'Streaming today at ' + moment(timeStamp).format('HH:mm');
	}
	let time = moment(timeStamp).format('DD MMM. HH:mm');
	return time;
};

export const getMetamaskBalance = async address => {
	console.log('temp0??>>>>>>', address);

	const web3 = new Web3(magic.rpcProvider);
	// console.log('temp0??>>>>>>', address);

	const balance = web3.utils.fromWei(await web3.eth.getBalance(address));
	console.log('balance', balance);
	const balanceInWei = await web3.eth.getBalance(address);
	console.log('web3.eth.getBalance>????????@@@', balanceInWei);
	return balance;
};

export const ImageIndicator = createImageProgress(ExpoFastImage);

export const get_query = (url: string) => {
	let qs = url.substring(url.indexOf('?') + 1).split('&');
	for (var i = 0, result = {}; i < qs.length; i++) {
		qs[i] = qs[i].split('=');
		result[qs[i][0]] = decodeURIComponent(qs[i][1]);
	}
	return result;
};

export const handleOpenUrlInBrowser = async (url: string) => {
	const result = await Linking.canOpenURL(url);

	if (result) {
		Linking.openURL(url);
	} else {
		showErrorAlert('', Strings.txt_invalid_url);
	}
};

export const getLevelRank = (level: number) => {
	switch (level) {
		case 1:
			return {image: icons.snooker, type: 'SNOOKER'};
		case 2:
			return {image: icons.joker, type: 'JOKER'};
		case 3:
			return {image: icons.unicorn, type: 'UNICORN'};
		case 4:
			return {image: icons.star, type: 'SUPERSTAR'};
		default:
			return {image: icons.party, type: 'NOOB'};
	}
};

export const uniqueIdGenerateFrom2Ids = (arrIds: any[]) => {
	const sortedString = arrIds.sort();
	return sortedString.toString();
};

export const createMatchDetailsShareUrl = (title, matchId, betCreationType) => {
	const shareUrlString =
		AppSchema +
		ScreenNames.EventDetailsScreen +
		'?title=' +
		title +
		'&matchId=' +
		matchId +
		'&betCreationType=' +
		betCreationType;

	return shareUrlString;
};

export const createJoinBetShareMessage = (userName, betQuestion, betId) => {
	const joinBetShareMessage = Strings.txt_share_join_bet_message_with_url
		.replace('%user', userName)
		.replace('%betInfo', betQuestion)
		.replace('%shareBetUrl', createJoinBetShareUrl(betId));

	return joinBetShareMessage;
};

export const createJoinBetShareUrl = betId => {
	const shareUrlString =
		AppSchema +
		ScreenNames.JoinBetCreateScreen +
		joinSharePostFixUrl.replace('%betId', betId).replace('%id', betId);
	return shareUrlString;
};

export const createBetDetailsShareUrl = (title, betId, betCreationType) => {
	const shareUrlString =
		AppSchema +
		ScreenNames.CustomBetDetailsScreen +
		'?title=' +
		title +
		'&betId=' +
		betId +
		'&betCreationType=' +
		betCreationType;

	return shareUrlString;
};

export const createBetDetailsPreviewShareUrl = (
	title,
	id,
	betId,
	betCreationType,
	isCustomBet
) => {
	const currentTime = new Date();
	const betTypeName = isCustomBet
		? ScreenNames.CustomBetDetailsScreen
		: ScreenNames.EventDetailsScreen;
	const betType = isCustomBet ? 'bet' : 'match';
	const idType = isCustomBet ? '&betId=' : '&matchId=';
	const appLink =
		AppSchema +
		betTypeName +
		'&title=' +
		title +
		idType +
		betId +
		'&betCreationType=' +
		betCreationType;

	const shareUrlString =
		ApiBaseUrl +
		'bet/share/' +
		id +
		'?deeplinkurl=' +
		appLink +
		'&type=' +
		betType +
		'&time=' +
		currentTime.getTime();

	return shareUrlString;
};

function epoch(date) {
	return Date.parse(date);
}

export const getTimeLeft = (futureDate, timeLeftWithSec) => {
	// const currentDate = new Date();
	// const epochCurrentDate = epoch(currentDate) / 1000;
	// console.log("epochCurrentDate >> ",epochCurrentDate);

	var currentDate = moment().unix();

	var diffMs = (futureDate - currentDate) * 1000; // milliseconds between now & future date

	// var diffDays = Math.floor(diffMs / 86400000); // days
	var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
	var diffSecs = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000); // seconds

	// console.log(diffHrs + " hours, " + diffMins + " minutes, " + diffSecs + 'seconds');
	let formatedHour, formatedMinute, formatedSecond;
	if (diffHrs > 0) {
		if (diffHrs < 10) {
			formatedHour = '0' + diffHrs;
		} else {
			formatedHour = diffHrs;
		}
	}

	if (diffMins > 0) {
		if (diffMins < 10) {
			formatedMinute = '0' + diffMins;
		} else {
			formatedMinute = diffMins;
		}
	}

	if (diffSecs > 0) {
		if (diffSecs < 10) {
			formatedSecond = '0' + diffSecs;
		} else {
			formatedSecond = diffSecs;
		}
	}

	let timeLeft = '';
	if (formatedHour) {
		timeLeft = timeLeft + formatedHour + (formatedMinute && ':');
	}

	if (formatedMinute) {
		timeLeft = timeLeft + formatedMinute + (timeLeftWithSec ? ':' : '');
	}

	if (timeLeftWithSec) {
		if (formatedSecond) {
			timeLeft = timeLeft + formatedSecond;
		}
	}

	// console.log('timeLeft >> ', timeLeft);

	return timeLeft;
};

export const getJuryVoteTimeLeft = futureDate => {
	// const currentDate = new Date();
	// const epochCurrentDate = epoch(currentDate) / 1000;
	// console.log("epochCurrentDate >> ",epochCurrentDate);

	var currentDate = moment().unix();

	var diffMs = (futureDate - currentDate) * 1000; // milliseconds between now & future date

	// var diffDays = Math.floor(diffMs / 86400000); // days
	var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
	var diffSecs = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000); // seconds

	// console.log(diffHrs + " hours, " + diffMins + " minutes, " + diffSecs + 'seconds');
	let formatedHour, formatedMinute;
	// let formatedSecond;
	if (diffHrs > 0) {
		if (diffHrs < 10) {
			formatedHour = '0' + diffHrs;
		} else {
			formatedHour = diffHrs;
		}
	}

	if (diffMins > 0) {
		if (diffMins < 10) {
			formatedMinute = '0' + diffMins;
		} else {
			formatedMinute = diffMins;
		}
	}

	// if (diffSecs > 0) {
	//   if (diffSecs < 10) {
	//     formatedSecond = '0' + diffSecs;
	//   } else {
	//     formatedSecond = diffSecs;
	//   }
	// }

	let timeLeft = '';
	if (formatedHour) {
		timeLeft = timeLeft + formatedHour + 'h ';
	}

	if (formatedMinute) {
		timeLeft = timeLeft + formatedMinute + 'm';
	}

	// if (timeLeftWithSec) {
	//   if (formatedSecond) {
	//     timeLeft = timeLeft + formatedSecond;
	//   }
	// }

	// console.log('timeLeft >> ', timeLeft);

	return timeLeft;
};

export const isValidUrl = str => {
	let url;
	try {
		url = new URL(str);
		return (
			url.protocol === 'http:' ||
			url.protocol === 'https:' ||
			url.protocol === 'defibet:'
		);
	} catch (_) {
		//onsole.log('Invalid URL');
		return false;
	}
	// console.log('url >> ', str && await Linking.canOpenURL(str));
	// const a = await Linking.canOpenURL(str);
};

export const createThumbnailFromUrl = async (
	videoUrlString: string,
	cacheFileName: string
) => {
	// const response = await createThumbnail({
	// 	url: videoUrlString,
	// 	timeStamp: 1000,
	// 	cacheName: cacheFileName
	// });

	return videoUrlString;
};

export const generateColor = () => {
	const CHHAPOLA = Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, '0');
	return `#${CHHAPOLA}`;
};

export const validateEmail = (email: string | undefined) => {
	return Yup.string().email().isValidSync(email);
};

export const validatePhone = (phone: number | undefined) => {
	return Yup.number()
		.integer()
		.positive()
		.test(phone => {
			return phone &&
				phone.toString().length >= 8 &&
				phone.toString().length <= 14
				? true
				: false;
		})
		.isValidSync(phone);
};

export const getRoundDecimalValue = (value?: any) => {
	let tempValue = parseFloat(value ?? 0);
	return Math.round((tempValue + Number.EPSILON) * 10000) / 10000;
};

export const showErrorAlert = (errTitle = '', errMessage) => {
	if (Platform.OS === 'web') {
		alert(errTitle + '\n' + errMessage);
	} else {
		Alert.alert(errTitle, errMessage);
	}
};

export const isValidDate = (date?: any) => {
	return moment(date).toDate().toString() !== 'Invalid Date';
};

export const getProfileShareUrl = (userName: string) => {
	return (
		Strings.app_sharing_text.replace('%s', userName) +
		AppSchema +
		appSharePostFixURL
	);
};

export const getEventShareUrl = (
	matchId,
	matchEndTime,
	title,
	betCreationType
) => {
	return (
		Strings.event_sharing_text +
		Strings.ends +
		' ' +
		matchEndTime +
		'\n\n' +
		AppSchema +
		ScreenNames.EventDetailsScreen +
		eventSharePostFixUrl
			.replace('%title', title)
			.replace('%matchId', matchId)
			.replace('%betCreationType', betCreationType)
			.replace('%id', matchId)
	);
};

export const getBetShareUrl = (
	userName,
	betEndTime,
	betId,
	id,
	title,
	betCreationType
) => {
	return (
		Strings.bet_sharing_text.replace('%s', userName) +
		Strings.join_deadline +
		' ' +
		betEndTime +
		'\n\n' +
		AppSchema +
		ScreenNames.CustomBetDetailsScreen +
		betSharePostFixURL
			.replace('%title', title)
			.replace('%betId', betId)
			.replace('%betCreationType', betCreationType)
			.replace('%id', id)
	);
};

export const downloadVideo = (fileUrl: string) => {
	axios({
		url: fileUrl,
		method: 'GET',
		//headers: headers,
		responseType: 'blob' // important
	}).then(response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'abc.mp4');
		document.body.appendChild(link);
		link.click();

		// Clean up and remove the link
		link.parentNode.removeChild(link);
	});
	// const {config} = RNFetchBlob;
	// const {
	// 	dirs: {DownloadDir, DocumentDir}
	// } = RNFetchBlob.fs;
	// const directoryPath = Platform.select({
	// 	ios: DocumentDir,
	// 	android: DownloadDir
	// });

	// const filePath =
	// 	`${directoryPath}/${getBundleId()}/${'Video_' + new Date().getTime()}` +
	// 	'.mp4';

	// const fileExt = '.mp4';
	// const configOptions = Platform.select({
	// 	ios: {
	// 		fileCache: true,
	// 		path: filePath,
	// 		appendExt: fileExt,
	// 		notification: true
	// 	},
	// 	android: {
	// 		fileCache: true,
	// 		appendExt: fileExt,
	// 		addAndroidDownloads: {
	// 			title: 'Defibet',
	// 			path: filePath,
	// 			description: Strings.downloading_video,
	// 			notification: true,
	// 			useDownloadManager: true
	// 		},
	// 		mediaScannable: true
	// 	}
	//});
	// config(configOptions)
	// 	.fetch('GET', fileUrl)
	// 	.progress((received, total) => {
	// 		console.log('Progress : ', received / total);
	// 	})
	// 	.then(async res => {
	// 		// Alert after successful downloading
	// 		Alert.alert('', Strings.downloaded_video);

	// 		saveToCameraRoll(filePath, 'video');
	// 	})
	// 	.catch(err => {
	// 		Alert.alert('', Strings.downloading_video_error);
	// 		console.log('Download Err :  -> ', err);
	// 	});
};

export const getVideoShareUrl = id => {
	return (
		AppSchema +
		ScreenNames.DiscoverScreen +
		videoSharePostFixUrl.replace('%id', id)
	);
};

export const getVideoShareMessage = (userName, id) => {
	return (
		Strings.video_sharing_text.replace('%s', userName) +
		'\n\n' +
		getVideoShareUrl(id)
	);
};

global.tutorialTimer = {};
