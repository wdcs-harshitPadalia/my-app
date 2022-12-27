/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Share, View, Platform } from "react-native";
import { Text } from "react-native-elements";
import icons from "../../../assets/icon";
import Strings from "../../../constants/strings";
import styles from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import ButtonGradient from "../../../components/ButtonGradient";
import { defaultTheme } from "../../../theme/defaultTheme";
import colors from "../../../theme/colors";
import InformationPopUpView from "../../../components/InformationPopUpView";
import {
  cancelBet,
  claimAmount,
  getUserBetResult,
  logout,
} from "../../../redux/apiHandler/apiActions";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "../../../redux/store";
import { navigateReset } from "../../../navigation/navigationHelper";
import { updateApiLoader } from "../../../redux/reducerSlices/preLogin";
import BetsMatchDetailsView from "../../../components/BetsMatchDetailsView";
import BetsResultView from "../../../components/BetsResultView";
import useUpdateEffect from "../../../components/CustomHooks/useUpdateEffect";
import { useBetCreateContract } from "../../../components/CustomHooks/SmartContract";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import {
  resetProfileData,
  updateDeviceToken,
} from "../../../redux/reducerSlices/userInfo";
import { magic } from "../../../navigation/routes";
import { decimalValue, nullHash, nullSignature } from "../../../constants/api";
import {
  createJoinBetShareMessage,
  createJoinBetShareUrl,
  getRoundDecimalValue,
} from "../../../constants/utils/Function";
import { deleteItemById } from "../../../redux/reducerSlices/notification";
import ScreenNames from "../../../navigation/screenNames";
import { gradientColorAngle } from "../../../theme/metrics";

const BetDetailsScreen: React.FC<any> = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();

  const userProfileInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });

  const { bet_id, redirectType, isFromOtherUser } = params;

  const [eventBetData, setEventBetData] = useState();

  const [step, setStep] = useState(0);

  const [isTitle, seIsTitle] = useState("");
  const [betCancleDesc, setBetCancleDesc] = useState("");

  const [isBackButtonDisable, setIsBackButtonDisable] = useState(true);

  const [isSelectedCategory, setIsSelectedCategory] = useState("");

  const [isSelectedSubCategory, setIsSelectedSubCategory] = useState("");

  const [isSelectedLeague, setIsSelectedLeague] = useState("");

  const [isSelectedLeagueType, setIsSelectedLeagueType] = useState(); // 0 for Browse Leagues and 1 for create your own

  const [isSelectBetsType, setIsSelectBetsType] = useState({});

  const [selectedGame, setSelectedGame] = useState();

  const [isSelectChooseSideType, setIsSelectChooseSideType] = useState(null);

  const [isSelectCurrency, setIsSelectCurrency] = useState();
  const [betAmount, setBetAmount] = useState("");
  const [convertCurrency, setConvertCurrency] = useState();

  const [odds, setOdds] = useState();

  const [winningPercentage, setWinningPercentage] = useState(0);
  const [nextBtnTitle, setNextBtnTitle] = useState(Strings.next);

  const [question, setQuestion] = useState("");

  const [options1, setOptions1] = useState("");

  const [betWinningHelpTitle, setBetWinningHelpTitle] = useState("");
  const [betWinningHelp, setBetWinningHelp] = useState("");

  const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);

  const [betLiquidyAmount, setBetLiquidyAmount] = useState({});

  const connector = useWalletConnect();

  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });

  const {
    resolveBetAddress,
    resolveBetResult,
    cancle_bet_id,
    claimBetAmount,
    resolvedBetEvent,
    betLiquidity,
    getForwardGetBetData,
    betStatus,
    getPassiveIncome,
    passiveIncomeAmount,
    liquidity,
  } = useBetCreateContract(false);

  useUpdateEffect(() => {
    getForwardGetBetData(eventBetData?.bet?.bet_id);

    if (
      eventBetData?.resultData?.isWinner === "draw" ||
      eventBetData?.resultData?.isWinner === "win"
    ) {
      getPassiveIncome();
      resolvedBetEvent(
        eventBetData?.bet?.bet_id,
        eventBetData?.resultData?.isWinner === "draw"
      );
    }
  }, [eventBetData]);

  useUpdateEffect(() => {
    if (betLiquidity?.length > 0) {
      setBetLiquidyAmount(betLiquidity?.length && betLiquidity[0]);
    }
  }, [betLiquidity]);

  useUpdateEffect(() => {
    const tokenName = eventBetData?.bet?.tokentypes?.short_name.toUpperCase();
    let decimals;
    if (tokenName === "USDC" || tokenName === "USDT") {
      decimals = 6;
    } else {
      decimals = 18;
    }
    console.log(
      "betLiquidyAmount:::::::????",
      betLiquidyAmount,
      betLiquidyAmount?.returnValues,
      parseFloat(betLiquidyAmount?.returnValues?.winnerAmount_) / 10e18
    );

    if (eventBetData?.bet?.resultClaim_contract_address) {
      return;
    }
    let uploadData = {};

    const tempDifference =
      liquidity?.receivedLiquidityFromAave - liquidity?.totalAvailableLiquidity;
    let passiveIncome = 0;
    if (tempDifference > 0) {
      passiveIncome = tempDifference / 10 ** decimals;
    }

    if (betLiquidyAmount) {
      if (eventBetData?.resultData?.isWinner === "draw") {
        const betTakerWinningAmount =
          parseFloat(betLiquidyAmount?.returnValues?.betTakerAmount_) /
          10 ** decimals;

        const betMakerWinningAmount =
          parseFloat(betLiquidyAmount?.returnValues?.betMakerAmount_) /
          10 ** decimals;

        uploadData = {
          bet_id: bet_id,
          contractAddress: betLiquidyAmount?.transactionHash,
          // bet_winning_amount:
          //   parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
          //   10e18,
          // bet_winning_amount_usd: (
          //   parseFloat(
          //     betLiquidyAmount?.['returnValues']?.winnerAmount_ / 10e18,
          //   ) * parseFloat(convertCurrency)
          // ).toFixed(decimalValue),
          taker_winning_amount: betTakerWinningAmount,
          taker_winning_amount_usd:
            parseFloat(betTakerWinningAmount) * parseFloat(convertCurrency),
          maker_winning_amount: betMakerWinningAmount,
          maker_winning_amount_usd:
            parseFloat(betMakerWinningAmount) * parseFloat(convertCurrency),
          passive_income: passiveIncome * (passiveIncomeAmount / 100),
        };
      } else {
        const winningAmount =
          parseFloat(betLiquidyAmount?.returnValues?.winnerAmount_) /
          10 ** decimals;
        uploadData = {
          bet_id: bet_id,
          contractAddress: betLiquidyAmount?.transactionHash,
          bet_winning_amount: winningAmount,
          bet_winning_amount_usd: (
            winningAmount * parseFloat(convertCurrency)
          ).toFixed(decimalValue),
          passive_income: passiveIncome * (passiveIncomeAmount / 100),
        };
      }

      console.log("uploadData?????>><", uploadData);

      claimAmount(uploadData)
        .then((res) => {
          dispatch(updateApiLoader({ apiLoader: false }));
          console.log("claimAmount Response : ", JSON.stringify(res));
          //Alert.alert('Claimamount api success', JSON.stringify(res));
          if (res?.statusCode?.toString().includes("200")) {
            // getBetClaimDetails(eventBetData?.bet?.bet_id);
            navigation.goBack();
          }
        })
        .catch((err) => {
          dispatch(updateApiLoader({ apiLoader: false }));
          Alert.alert("Claimamount api error", JSON.stringify(err));
          console.log("claimAmount Data Err : ", err);
        });
    }
  }, [betLiquidyAmount]);
  useEffect(() => {
    if (resolveBetAddress && resolveBetAddress !== "Error") {
      resolvedBetEvent(
        eventBetData?.bet?.bet_id,
        eventBetData?.resultData?.isWinner === "draw"
      );
    }
  }, [resolveBetAddress]);
  useEffect(() => {
    if (cancle_bet_id) {
      if (cancle_bet_id === "Error") {
        console.log("User denied metamask access");
        Alert.alert(Strings.somethingWentWrong);
      } else {
        // addBetData();
        const betClaimAmount =
          eventBetData?.resultData?.isWinner === "win"
            ? (parseFloat(betAmount) * parseFloat(odds)).toFixed(decimalValue)
            : betAmount;
        const uploadData = {
          bet_id: bet_id,
          bet_cancel_contract_address: cancle_bet_id,
          bet_amount: betClaimAmount,
          bet_amount_usd: (
            parseFloat(betClaimAmount) * parseFloat(convertCurrency)
          ).toFixed(decimalValue),
        };
        cancelBet(uploadData)
          .then((res) => {
            dispatch(updateApiLoader({ apiLoader: false }));
            console.log("claimAmount Response : ", JSON.stringify(res));
            if (res?.statusCode?.toString().includes("200")) {
              if (params?.notification_id) {
                dispatch(deleteItemById(params?.notification_id));
              }
              Alert.alert("", Strings.bet_cancelled_successfully);
              navigation.goBack();
            }
          })
          .catch((err) => {
            dispatch(updateApiLoader({ apiLoader: false }));
            Alert.alert("", Strings.somethingWentWrong);
            console.log("claimAmount Data Err : ", err);
          });
      }
      console.log(cancle_bet_id, "bet_id?>>>");
    }
  }, [cancle_bet_id]);

  useUpdateEffect(() => {
    if (eventBetData?.bet?.users?._id === userProfileInfo?.user?._id) {
      setOdds(eventBetData?.bet?.odds);
      setBetAmount(eventBetData?.bet?.bet_amount);
    } else {
      setOdds(eventBetData?.bet?.opposite_odds);
      setBetAmount(eventBetData?.bet?.bet_opposite_amount);

      // setBetAmount(
      //   parseFloat(eventBetData?.bet?.bet_amount) *
      //     parseFloat(eventBetData?.bet?.odds) -
      //     parseFloat(eventBetData?.bet?.bet_amount) +
      //     '',
      // );
    }

    setIsSelectCurrency(eventBetData?.bet?.tokentypes);
    setSelectedGame(eventBetData?.bet?.match);
    setIsSelectedLeagueType(eventBetData?.bet?.bet_type);
    setIsSelectedCategory(eventBetData?.bet?.categories?.name);
    setIsSelectedSubCategory(eventBetData?.bet?.subcategories?.name ?? "");
    setIsSelectedLeague(eventBetData?.bet?.match?.leagueName);
    setIsSelectBetsType(eventBetData?.bet?.bettypes);

    if (redirectType === "RESULT") {
      setIsSelectChooseSideType(
        eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
          ? eventBetData?.bet?.bet_creator_side_option
          : eventBetData?.bet?.bet_opposite_side_option
      );
    } else if (
      redirectType === "BET_RESULT_REVIEW" ||
      redirectType === "DISPUTE_EVIDENCE"
    ) {
      setIsSelectChooseSideType(eventBetData?.resultData?.winnerOption);
    }

    setQuestion(eventBetData?.bet?.betQuestion);
    setOptions1(eventBetData?.bet?.betOptionOne);
    // setOptions2(eventBetData?.bet?.betOptionTwo);

    if (redirectType === "CANCELLED" && eventBetData?.bet?.isDeleted) {
      seIsTitle(Strings.admin_bet_canceled_title);
      setBetCancleDesc(Strings.admin_bet_canceled_desc);
    } else if (redirectType === "CANCELLED") {
      seIsTitle(Strings.this_bet_canceled);
      setBetCancleDesc(Strings.user_bet_canceled_desc);
    } else {
      seIsTitle("");
      setBetCancleDesc("");
    }

    setConvertCurrency(eventBetData?.bet?.tokentypes?.tokenPriceUsd ?? 1);

    if (redirectType === "RESULT") {
      seIsTitle(Strings.this_bet_end);
      setStep(1);
      setIsBackButtonDisable(false);

      if (eventBetData?.resultData?.isWinner === "win") {
        setNextBtnTitle(Strings.claim_winning);
      } else if (eventBetData?.resultData?.isWinner === "loss") {
        setNextBtnTitle(Strings.continue_to_feed);
      } else if (eventBetData?.resultData?.isWinner === "draw") {
        setNextBtnTitle(Strings.claim_bet_funds);
      }
    } else {
      setStep(2);
      setNextBtnTitle(Strings.next);
      setIsBackButtonDisable(false);
    }
  }, [eventBetData]);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    getUserBetResultData();
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const getUserBetResultData = () => {
    dispatch(updateApiLoader({ apiLoader: true }));
    getUserBetResult(bet_id)
      .then((res) => {
        dispatch(updateApiLoader({ apiLoader: false }));
        console.log(
          "getUserBetResultData ??????getUserBet Response : ",
          JSON.stringify(res)
        );
        setEventBetData(res?.data);
        setWinningPercentage(res?.data?.winningPercentage);
        setBetWinningHelpTitle(res?.data?.tokenContent.title);
        setBetWinningHelp(res?.data?.tokenContent.content);
      })
      .catch((err) => {
        dispatch(updateApiLoader({ apiLoader: false }));
        console.log("getUserBet Data Err : ", err);
        Alert.alert("", Strings.somethingWentWrong);
      });
  };

  const handleRedirectUser = () => {
    navigation.push(ScreenNames.OtherUserProfileScreen, {
      userId:
        eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
          ? eventBetData?.betTakerData?._id
          : eventBetData?.bet?.users?._id,
    });
  };

  const betsMatchDetails = () => {
    return (
      <BetsMatchDetailsView
        popupTitle={Strings.bet_details}
        betType={
          isSelectedLeagueType === 0
            ? isSelectBetsType?.name?.toUpperCase()
            : isSelectedLeagueType === 2
            ? isSelectBetsType?.name?.toUpperCase()
            : Strings.custom.toUpperCase()
        }
        categoryName={
          isSelectedCategory?.toUpperCase() +
          (isSelectedSubCategory === "" ? "" : " - ") +
          isSelectedSubCategory?.toUpperCase() +
          (isSelectedLeagueType === 0
            ? (isSelectedLeague ? " - " : "") +
              (isSelectedLeague?.toUpperCase() ?? "")
            : isSelectedLeagueType === 2
            ? (isSelectedLeague ? " - " : "") +
              (isSelectedLeague?.toUpperCase() ?? "")
            : "")
        }
        question={question}
        selectMainMarket={
          isSelectedLeagueType === 0
            ? eventBetData?.bet?.mainmarkets?.market_name +
              (eventBetData?.bet?.market_sub_name
                ? " : " + eventBetData?.bet?.market_sub_name
                : "")
            : question
        }
        isSelectedLeagueType={isSelectedLeagueType}
        selectedGameData={selectedGame}
        betData={eventBetData}
        isShowUserProfile={
          redirectType === "RESULT" ||
          Object.keys(eventBetData?.betTakerData)?.length > 0
            ? false
            : true
        }
        handleRedirectUser={handleRedirectUser}
      />
    );
  };

  const showViews = () => {
    console.log("showViews ", step);

    switch (step) {
      case 1:
        return (
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titleStyle}>{isTitle}</Text>
            {betsMatchDetails()}
            <BetsResultView
              localTeamName={
                isSelectedLeagueType === 0
                  ? selectedGame?.localTeamName
                  : options1?.trim()
              }
              visitorTeamName={
                eventBetData?.bet?.user_id === userInfo?.user?._id
                  ? eventBetData?.bet?.bet_creator_side_option
                  : eventBetData?.bet?.bet_opposite_side_option
              }
              isSelectCurrency={isSelectCurrency}
              betAmount={betAmount}
              betUsdAmount={getRoundDecimalValue(
                parseFloat(betAmount) * parseFloat(convertCurrency)
              )}
              betOdds={odds}
              paysBetAmount={getRoundDecimalValue(
                parseFloat(betAmount) * parseFloat(odds)
              )}
              paysBetUsdAmount={getRoundDecimalValue(
                parseFloat(parseFloat(betAmount) * parseFloat(odds)) *
                  parseFloat(convertCurrency)
              )}
              winningPercentage={winningPercentage + ""}
              selectMySideType={
                isSelectedLeagueType === 0
                  ? isSelectChooseSideType === selectedGame?.localTeamId
                    ? selectedGame?.localTeamName
                    : selectedGame?.visitorTeamName
                  : isSelectChooseSideType
              }
              onPressNeedHelp={() => {
                setModalNeedHelpVisible(true);
              }}
              oppositeBetAmount={
                eventBetData?.resultData?.isWinner === "win"
                  ? getRoundDecimalValue(
                      parseFloat(eventBetData?.bet?.bet_amount) +
                        parseFloat(eventBetData?.bet?.bet_opposite_amount)
                    )
                  : betAmount
              }
              oppositeBetUsdAmount={
                eventBetData?.resultData?.isWinner === "win"
                  ? getRoundDecimalValue(
                      parseFloat(parseFloat(betAmount) * parseFloat(odds)) *
                        parseFloat(convertCurrency)
                    )
                  : getRoundDecimalValue(
                      parseFloat(betAmount) * parseFloat(convertCurrency)
                    )
              }
              isShowFee={
                eventBetData?.resultData?.isWinner === "win" ? true : false
              }
              isShowLost={
                eventBetData?.resultData?.isWinner === "draw" ? false : true
              }
              bottomTitle={
                eventBetData?.resultData?.isWinner === "win"
                  ? Strings.you_won
                  : Strings.you_lost
              }
            />
          </KeyboardAwareScrollView>
        );
      case 2:
        return (
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {isTitle !== "" && <Text style={styles.titleStyle}>{isTitle}</Text>}
            {betCancleDesc !== "" && (
              <Text style={styles.descTextStyle}>{betCancleDesc}</Text>
            )}
            {betsMatchDetails()}
            <BetsResultView
              localTeamName={
                isSelectedLeagueType === 0
                  ? eventBetData?.bet?.bet_creator_side_option
                  : options1?.trim()
              }
              visitorTeamName={
                eventBetData?.bet?.user_id === userInfo?.user?._id
                  ? eventBetData?.bet?.bet_creator_side_option
                  : eventBetData?.bet?.bet_opposite_side_option
              }
              isSelectCurrency={isSelectCurrency}
              betAmount={betAmount}
              betUsdAmount={getRoundDecimalValue(
                parseFloat(betAmount) * parseFloat(convertCurrency)
              )}
              betOdds={odds}
              paysBetAmount={getRoundDecimalValue(
                parseFloat(betAmount) * parseFloat(odds)
              )}
              paysBetUsdAmount={getRoundDecimalValue(
                parseFloat(parseFloat(betAmount) * parseFloat(odds)) *
                  parseFloat(convertCurrency)
              )}
              winningPercentage={winningPercentage + ""}
              selectMySideType={
                isSelectedLeagueType === 0
                  ? isSelectChooseSideType === selectedGame?.localTeamId
                    ? selectedGame?.localTeamName
                    : selectedGame?.visitorTeamName
                  : isSelectChooseSideType
              }
              onPressNeedHelp={() => {
                setModalNeedHelpVisible(true);
              }}
              oppositeBetAmount={
                eventBetData?.resultData?.isWinner === "win"
                  ? getRoundDecimalValue(
                      parseFloat(eventBetData?.bet?.bet_amount) +
                        parseFloat(eventBetData?.bet?.bet_opposite_amount)
                    )
                  : betAmount
              }
              oppositeBetUsdAmount={
                eventBetData?.resultData?.isWinner === "win"
                  ? getRoundDecimalValue(
                      parseFloat(parseFloat(betAmount) * parseFloat(odds)) *
                        parseFloat(convertCurrency)
                    )
                  : getRoundDecimalValue(
                      parseFloat(betAmount) * parseFloat(convertCurrency)
                    )
              }
              isShowLost={false}
            />
          </KeyboardAwareScrollView>
        );
    }
  };
  const handleClaimWinningAmount = () => {
    let bet_type = eventBetData?.bet?.bet_type;
    let result =
      eventBetData?.resultData?.isWinner === "win"
        ? eventBetData?.bet?.user_id === userInfo.user?._id
          ? eventBetData?.bet?.bet_creator_side_option_index + 1
          : eventBetData?.bet?.bet_opposite_side_option_index + 1
        : 0;
    //0
    console.log("result??????????", bet_type);
    if (bet_type == "0") {
      resolveBetResult(
        eventBetData?.bet?.bet_id,
        result,
        [nullHash],
        nullSignature,
        nullSignature
      );
    } else {
      resolveBetResult(
        eventBetData?.bet?.bet_id,
        result,
        eventBetData?.HashSignatureObject?.hash,
        eventBetData?.HashSignatureObject?.makerSignature,
        eventBetData?.HashSignatureObject?.takerSignature
      );
    }

    //resolveBetResult()
    // dispatch(updateApiLoader({apiLoader: true}));
  };
  // const handleClaimWinningAmount = () => {
  //   dispatch(updateApiLoader({apiLoader: true}));

  //   const betClaimAmount =
  //     eventBetData?.resultData?.isWinner === 'win'
  //       ? (parseFloat(betAmount) * parseFloat(odds)).toFixed(decimalValue)
  //       : betAmount;

  //   const uploadData = {
  //     bet_id: bet_id,
  //     contractAddress: '0x00000',
  //     bet_amount: betClaimAmount,
  //     bet_amount_usd: (
  //       parseFloat(betClaimAmount) * parseFloat(convertCurrency)
  //     ).toFixed(decimalValue),
  //   };

  //   claimAmount(uploadData)
  //     .then(res => {
  //       dispatch(updateApiLoader({apiLoader: false}));
  //       console.log('claimAmount Response : ', JSON.stringify(res));
  //       if (res?.status.toString().includes('200')) {
  //         navigation.goBack();
  //       }
  //     })
  //     .catch(err => {
  //       dispatch(updateApiLoader({apiLoader: false}));
  //       console.log('claimAmount Data Err : ', err);
  //     });
  // };

  const handleCancelBet = async (isCancel) => {
    if (Platform.OS === "web") {
      let retVal = confirm(
        isCancel ? Strings.cancel_bet_desc : Strings.claim_winning_desc
      );
      if (retVal == true) {
        if (
          userInfo?.user?.socialLoginType?.toLowerCase() === "metamask" &&
          !connector.connected
        ) {
          let retVal = confirm(Strings.txt_session_expire_msg);
          if (retVal == true || retVal == false) {
            dispatch(logout());
            dispatch(updateDeviceToken({ deviceToken: "" }));
            dispatch(resetProfileData({}));
          }
          return;
        } else {
          if (userInfo?.user?.socialLoginType?.toLowerCase() !== "metamask") {
            const loginStatus = await magic.user.isLoggedIn();
            console.log("loginStatus", loginStatus);
            if (!loginStatus) {
              let retVal = confirm(Strings.txt_session_expire_msg);
              if (retVal == true || retVal == false) {
                dispatch(logout());
                dispatch(updateDeviceToken({ deviceToken: "" }));
                dispatch(resetProfileData({}));
              }
              return;
            }
          }
        }
        console.log("bet_id???", eventBetData?.bet?.bet_id);
        claimBetAmount(eventBetData?.bet?.bet_id);
        return true;
      } else {
        return false;
      }
    } else {
      Alert.alert(
        isCancel ? Strings.cancel_bet_desc : Strings.claim_winning_desc,
        "",
        [
          {
            text: "Yes",
            onPress: async () => {
              if (
                userInfo?.user?.socialLoginType?.toLowerCase() === "metamask" &&
                !connector.connected
              ) {
                Alert.alert(Strings.txt_session_expire_msg, "", [
                  {
                    text: "Ok",
                    onPress: () => {
                      dispatch(logout());
                      dispatch(updateDeviceToken({ deviceToken: "" }));
                      dispatch(resetProfileData({}));
                    },
                  },
                ]);
                return;
              } else {
                if (
                  userInfo?.user?.socialLoginType?.toLowerCase() !== "metamask"
                ) {
                  const loginStatus = await magic.user.isLoggedIn();
                  console.log("loginStatus", loginStatus);
                  if (!loginStatus) {
                    Alert.alert(Strings.txt_session_expire_msg, "", [
                      {
                        text: "Ok",
                        onPress: () => {
                          dispatch(logout());
                          dispatch(updateDeviceToken({ deviceToken: "" }));
                          dispatch(resetProfileData({}));
                        },
                      },
                    ]);
                    return;
                  }
                }
              }
              console.log("bet_id???", eventBetData?.bet?.bet_id);
              claimBetAmount(eventBetData?.bet?.bet_id);
            },
            style: "destructive",
          },
          {
            text: "No",
            onPress: () => {},
          },
        ]
      );
    }
  };

  const shouldShowClaimButton = () => {
    // const isMaker = eventBetData?.bet?.user_id === userInfo.user?._id;
    // if (isMaker) {
    //   if (eventBetData?.bet?.bet_creator_contract_address) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // } else {
    //   if (eventBetData?.bet?.bet_opposite_contract_address) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    // if (!eventBetData?.bet?.resultClaim_contract_address) {
    //   //TODO: call claim api
    // }
    // console.log(
    //   "betLiquidyAmount?.['returnValues']?.winnerAmount_???",
    //   betLiquidyAmount?.['returnValues']?.winnerAmount_,
    // );
    // const flag = betStatus;
    return betStatus;
  };

  const onShare = async (url: string) => {
    try {
      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderComponent
          onLeftMenuPress={() => {
            navigation.goBack();
          }}
          onLeftIconPath={icons.back}
          name={Strings.bet_details}
          onSendIconPath={
            eventBetData?.bet?.is_public === true
              ? icons.share
              : eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
              ? icons.share
              : null
          }
          onSendMenuPress={() => {
            if (
              eventBetData?.bet?.is_public === false &&
              eventBetData?.bet?.users?._id !== userProfileInfo?.user?._id
            )
              return;
            onShare(
              createJoinBetShareMessage(
                userInfo?.user?.userName,
                question,
                bet_id
              )
              // createJoinBetShareUrl(bet_id)
            );
          }}
        />

        <View style={styles.viewContain}>{showViews()}</View>

        {step === 1 &&
          ((eventBetData?.resultData?.isWinner === "win" &&
            shouldShowClaimButton()) ||
            (eventBetData?.resultData?.isWinner === "draw" &&
              shouldShowClaimButton()) ||
            eventBetData?.resultData?.isWinner === "loss") && (
            <ButtonGradient
              onPress={() => {
                if (step === 1) {
                  if (eventBetData?.resultData?.isWinner === "win") {
                    handleClaimWinningAmount();
                  } else if (eventBetData?.resultData?.isWinner === "loss") {
                    navigateReset("FeedsRouter");
                  } else if (eventBetData?.resultData?.isWinner === "draw") {
                    handleClaimWinningAmount();
                  }
                }
              }}
              colorArray={defaultTheme.secondaryGradientColor}
              angle={gradientColorAngle}
              buttonTextcolor={colors.white}
              buttonText={nextBtnTitle}
              style={
                !isBackButtonDisable
                  ? styles.continueFeedButton
                  : styles.continueFeedButtonOpacity
              }
              btnDisabled={isBackButtonDisable}
            />
          )}

        {eventBetData?.betTakerData &&
        Object.keys(eventBetData?.betTakerData)?.length
          ? null
          : eventBetData &&
            redirectType !== "CANCELLED" &&
            (Object.keys(eventBetData?.resultData)?.length
              ? eventBetData?.bet?.replicatedBetsCount === 0
              : true) &&
            !isFromOtherUser && (
              <ButtonGradient
                onPress={() => {
                  // if (step === 1) {
                  //   setIsViewNextBackBtn(false);
                  //   if (eventBetData?.resultData?.isWinner === 'win') {
                  //     handleClaimWinningAmount();
                  //   } else if (eventBetData?.resultData?.isWinner === 'loss') {
                  //     navigateReset('FeedsRouter');
                  //   } else if (eventBetData?.resultData?.isWinner === 'draw') {
                  //     handleClaimWinningAmount();
                  //   }
                  // }
                  // console.log(
                  //   'step : ',
                  //   Object.keys(eventBetData?.betTakerData)?.length,
                  // );

                  handleCancelBet(true);
                }}
                colorArray={defaultTheme.secondaryGradientColor}
                angle={gradientColorAngle}
                buttonTextcolor={colors.white}
                buttonText={Strings.cancel_bet}
                style={
                  !isBackButtonDisable
                    ? styles.continueFeedButton
                    : styles.continueFeedButtonOpacity
                }
                btnDisabled={isBackButtonDisable}
              />
            )}

        <InformationPopUpView
          popupTitle={betWinningHelpTitle}
          buttonTitle={Strings.got_it}
          description={betWinningHelp}
          onButtonPress={() => {
            setModalNeedHelpVisible(!modalNeedHelpVisible);
          }}
          isVisible={modalNeedHelpVisible}
          colorArray={defaultTheme.ternaryGradientColor}
        />
      </View>
    </SafeAreaView>
  );
};

export default BetDetailsScreen;
