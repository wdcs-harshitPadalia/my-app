import moment from "moment";
import { ApiBaseUrl, AppSchema, isShowTutorial, RpcURL } from "../api";
import ExpoFastImage from "expo-fast-image";
import { createImageProgress } from "react-native-image-progress";
import Web3 from "web3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { magic } from "../../navigation/routes";
import { Alert, Linking, Platform } from "react-native";
import icons from "../../assets/icon";
import ScreenNames from "../../navigation/screenNames";
import Strings from "../strings";

export const getInitialDate = () => {
  const date1 = new Date();
  const subtractYears = 18;
  date1.setFullYear(date1.getFullYear() - subtractYears);
  return date1;
};

export const getPieChartDataRounded = (data: number[]) => {
  return data.map((item, index) => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    let key = "url(#gradient" + index + ")";
    return {
      key: index,
      value: item,
      svg: { fill: key },
      arc: { cornerRadius: 10 },
      spacing: 2,
    };
  });
};

export const timeConvert = (timeStamp: number, subtractMinute: number = 0) => {
  let time = moment
    .unix(timeStamp / 1000)
    .subtract(subtractMinute, "minute")
    .format("HH:mm");
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
      .subtract(subtractMinute, "minute")
      .format("DD MMM") ===
    moment().subtract(subtractMinute, "minute").format("DD MMM")
  ) {
    return "Today - ";
  }
  let time = moment
    .unix(timeStamp / 1000)
    .subtract(subtractMinute, "minute")
    .format(timeFormat ?? "DD MMM.");
  return time;
};

export const dateFormatConvert = (timeStamp: number) => {
  if (
    moment.unix(timeStamp / 1000).format("DD MMM") === moment().format("DD MMM")
  ) {
    return "Today";
  }
  let time = moment.unix(timeStamp / 1000).format("DD/MM/YYYY");
  return time;
};

export const dateTimeConvert = (timeStamp: number) => {
  if (moment(timeStamp).format("DD MMM") === moment().format("DD MMM")) {
    return "Today" + moment(timeStamp).format(" - HH:mm");
  }
  let time = moment(timeStamp).format("DD MMM YYYY - HH:mm");
  return time;
};

export const dateTimeStreamingConvert = (timeStamp: number) => {
  if (moment(timeStamp).format("DD MMM") === moment().format("DD MMM")) {
    return "Today " + moment(timeStamp).format(".HH:mm");
  }
  let time = moment(timeStamp).format("DD MMM. HH:mm");
  return time;
};

export const dateTimeLiveStreamingConvert = (timeStamp: number) => {
  if (moment(timeStamp).format("DD MMM") === moment().format("DD MMM")) {
    return "Streaming today at " + moment(timeStamp).format("HH:mm");
  }
  let time = moment(timeStamp).format("DD MMM. HH:mm");
  return time;
};

export const getMetamaskBalance = async (address) => {
  console.log("temp0??>>>>>>", address);

  const web3 = new Web3(Platform.OS === "web" ? RpcURL : magic.rpcProvider);
  // console.log('temp0??>>>>>>', address);

  const balance = web3.utils.fromWei(await web3.eth.getBalance(address));
  console.log("balance", balance);
  const balanceInWei = await web3.eth.getBalance(address);
  console.log("web3.eth.getBalance>????????@@@", balanceInWei);
  return balance;
};

export const ImageIndicator = createImageProgress(ExpoFastImage);

export const get_query = (url: string) => {
  let qs = url.substring(url.indexOf("?") + 1).split("&");
  for (var i = 0, result = {}; i < qs.length; i++) {
    qs[i] = qs[i].split("=");
    result[qs[i][0]] = decodeURIComponent(qs[i][1]);
  }
  return result;
};

export const handleOpenUrlInBrowser = async (url: string) => {
  const result = await Linking.canOpenURL(url);

  if (result) {
    Linking.openURL(url);
  } else {
    Alert.alert("Invalid Url.");
  }
};

export const getLevelRank = (level: number) => {
  switch (level) {
    case 1:
      return { image: icons.snooker, type: "SNOOKER" };
    case 2:
      return { image: icons.joker, type: "JOKER" };
    case 3:
      return { image: icons.unicorn, type: "UNICORN" };
    case 4:
      return { image: icons.star, type: "SUPERSTAR" };
    default:
      return { image: icons.party, type: "NOOB" };
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
    "?title=" +
    title +
    "&matchId=" +
    matchId +
    "&betCreationType=" +
    betCreationType;

  return shareUrlString;
};

export const createJoinBetShareMessage = (userName, betQuestion, betId) => {
  const joinBetShareMessage = Strings.txt_share_join_bet_message_with_url
    .replace("%user", userName)
    .replace("%betInfo", betQuestion)
    .replace("%shareBetUrl", createJoinBetShareUrl(betId));

  return joinBetShareMessage;
};

export const createJoinBetShareUrl = (betId) => {
  const shareUrlString =
    AppSchema + ScreenNames.JoinBetCreateScreen + "?betId=" + betId;
  return shareUrlString;
};

export const createBetDetailsShareUrl = (title, betId, betCreationType) => {
  const shareUrlString =
    AppSchema +
    ScreenNames.CustomBetDetailsScreen +
    "?title=" +
    title +
    "&betId=" +
    betId +
    "&betCreationType=" +
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
  const betType = isCustomBet ? "bet" : "match";
  const idType = isCustomBet ? "&betId=" : "&matchId=";
  const appLink =
    AppSchema +
    betTypeName +
    "&title=" +
    title +
    idType +
    betId +
    "&betCreationType=" +
    betCreationType;

  const shareUrlString =
    ApiBaseUrl +
    "bet/share/" +
    id +
    "?deeplinkurl=" +
    appLink +
    "&type=" +
    betType +
    "&time=" +
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
      formatedHour = "0" + diffHrs;
    } else {
      formatedHour = diffHrs;
    }
  }

  if (diffMins > 0) {
    if (diffMins < 10) {
      formatedMinute = "0" + diffMins;
    } else {
      formatedMinute = diffMins;
    }
  }

  if (diffSecs > 0) {
    if (diffSecs < 10) {
      formatedSecond = "0" + diffSecs;
    } else {
      formatedSecond = diffSecs;
    }
  }

  let timeLeft = "";
  if (formatedHour) {
    timeLeft = timeLeft + formatedHour + (formatedMinute && ":");
  }

  if (formatedMinute) {
    timeLeft = timeLeft + formatedMinute + (timeLeftWithSec ? ":" : "");
  }

  if (timeLeftWithSec) {
    if (formatedSecond) {
      timeLeft = timeLeft + formatedSecond;
    }
  }

  // console.log('timeLeft >> ', timeLeft);

  return timeLeft;
};

export const getJuryVoteTimeLeft = (futureDate) => {
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
      formatedHour = "0" + diffHrs;
    } else {
      formatedHour = diffHrs;
    }
  }

  if (diffMins > 0) {
    if (diffMins < 10) {
      formatedMinute = "0" + diffMins;
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

  let timeLeft = "";
  if (formatedHour) {
    timeLeft = timeLeft + formatedHour + "h ";
  }

  if (formatedMinute) {
    timeLeft = timeLeft + formatedMinute + "m";
  }

  // if (timeLeftWithSec) {
  //   if (formatedSecond) {
  //     timeLeft = timeLeft + formatedSecond;
  //   }
  // }

  // console.log('timeLeft >> ', timeLeft);

  return timeLeft;
};

export const isValidUrl = (str) => {
  let url;
  try {
    url = new URL(str);
    return (
      url.protocol === "http:" ||
      url.protocol === "https:" ||
      url.protocol === "defibet:"
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
    .padStart(6, "0");
  return `#${CHHAPOLA}`;
};

export const validateEmail = (email: string | undefined) => {
  return Yup.string().email().isValidSync(email);
};

export const validatePhone = (phone: number | undefined) => {
  return Yup.number()
    .integer()
    .positive()
    .test((phone) => {
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

export const getProfileShareUrl = (userName: string) => {
  const appLink = "https://defibet.house/";
  const currentTime = new Date();

  return (
    ApiBaseUrl +
    `bet/share/nobet?deeplinkurl=${appLink}&username=${userName}&shareapp=true&time=${currentTime.getTime()}`
  );
};

global.tutorialTimer = {};
