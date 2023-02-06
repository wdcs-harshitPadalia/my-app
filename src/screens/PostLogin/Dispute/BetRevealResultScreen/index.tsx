/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../../assets/icon';
import Strings from '../../../../constants/strings';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../../../components/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import ButtonGradient from '../../../../components/ButtonGradient';
import {defaultTheme} from '../../../../theme/defaultTheme';
import colors from '../../../../theme/colors';
import InformationPopUpView from '../../../../components/InformationPopUpView';
import {
	getUserBetResult,
	revealDisputeResult
} from '../../../../redux/apiHandler/apiActions';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootState} from '../../../../redux/store';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import BetsMatchDetailsView from '../../../../components/BetsMatchDetailsView';
import BetsResultView from '../../../../components/BetsResultView';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import ScreenNames from '../../../../navigation/screenNames';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {deleteItemById} from '../../../../redux/reducerSlices/notification';
import {gradientColorAngle} from '../../../../theme/metrics';
import {decimalValue} from '../../../../constants/api';
import {getRoundDecimalValue} from '../../../../constants/utils/Function';

const BetRevealResultScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const {params} = useRoute();
	const dispatch = useDispatch();

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const {bet_id, redirectType, betObj, notification_id} = params;

	const [eventBetData, setEventBetData] = useState();

	const [step, setStep] = useState(0);

	const [isTitle, seIsTitle] = useState('');

	const [isBackButtonDisable, setIsBackButtonDisable] = useState(true);

	const [isSelectedCategory, setIsSelectedCategory] = useState('');

	const [isSelectedSubCategory, setIsSelectedSubCategory] = useState('');

	const [isSelectedLeague, setIsSelectedLeague] = useState('');

	const [isSelectedLeagueType, setIsSelectedLeagueType] = useState(); // 0 for Browse Leagues and 1 for create your own

	const [isSelectBetsType, setIsSelectBetsType] = useState({});

	const [selectedGame, setSelectedGame] = useState();

	const [isSelectChooseSideType, setIsSelectChooseSideType] = useState(null);

	const [isSelectCurrency, setIsSelectCurrency] = useState();
	const [betAmount, setBetAmount] = useState('');
	const [convertCurrency, setConvertCurrency] = useState();

	const [odds, setOdds] = useState();

	const [winningPercentage, setWinningPercentage] = useState(0);
	const [isViewNextBackBtn, setIsViewNextBackBtn] = useState(true); // 0 for not selected and 1 for selected
	const [nextBtnTitle, setNextBtnTitle] = useState(Strings.next);

	const [question, setQuestion] = useState('');

	const [options1, setOptions1] = useState('');
	const [options2, setOptions2] = useState('');

	const [betWinningHelpTitle, setBetWinningHelpTitle] = useState('');
	const [betWinningHelp, setBetWinningHelp] = useState('');

	const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);

	const [apiHashObj, setApiHashObj] = useState(); // get hash from api

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	//revealBetResult
	const {
		resolveBetAddress,
		brodcastFinalVerdict,
		betClaimStatus,
		getBetClaimDetails
	} = useBetCreateContract(false);

	useEffect(() => {
		if (resolveBetAddress && resolveBetAddress !== 'Error') {
			console.log('resolveBetAddress', resolveBetAddress);
			// setStep(1);
			dispatch(updateApiLoader({apiLoader: true}));
			const uploadData = {
				bet_id: bet_id
			};

			revealDisputeResult(uploadData)
				.then(res => {
					dispatch(updateApiLoader({apiLoader: false}));
					// TODO: remove notification
					dispatch(deleteItemById(notification_id));
					console.log('revealDisputeResult Response : ', JSON.stringify(res));
					if (res?.statusCode.toString().includes('200')) {
						navigation.goBack();
					}
				})
				.catch(err => {
					dispatch(updateApiLoader({apiLoader: false}));
					console.log('revealDisputeResult Data Err : ', err);
				});
		}
	}, [resolveBetAddress]);

	useUpdateEffect(() => {
		console.log('eventBetData???????', JSON.stringify(eventBetData));
		getBetClaimDetails(betObj?.bet_id);

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
		setIsSelectedSubCategory(eventBetData?.bet?.subcategories?.name ?? '');
		setIsSelectedLeague(eventBetData?.bet?.match?.leagueName ?? '');
		setIsSelectBetsType(eventBetData?.bet?.bettypes);

		if (
			redirectType === 'RESULT' ||
			redirectType === 'BET_RESULT_CONFIRMATION'
		) {
			console.log('====================================');
			console.log(redirectType === 'RESULT');
			console.log(
				eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
					? eventBetData?.bet?.bet_creator_side_option
					: eventBetData?.bet?.bet_opposite_side_option
			);

			console.log('====================================');
			setIsSelectChooseSideType(
				eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
					? eventBetData?.bet?.bet_creator_side_option
					: eventBetData?.bet?.bet_opposite_side_option
			);
		} else if (
			redirectType === 'BET_RESULT_REVIEW' ||
			redirectType === 'DISPUTE_EVIDENCE' ||
			redirectType === 'RESULT_VERIFICATION_BETRESOLVER'
		) {
			setIsSelectChooseSideType(eventBetData?.resultData?.winnerOption);
		}

		setQuestion(eventBetData?.bet.betQuestion);
		setOptions1(eventBetData?.bet.betOptionOne);
		setOptions2(eventBetData?.bet.betOptionTwo);

		setConvertCurrency(eventBetData?.bet?.tokentypes?.tokenPriceUsd ?? 1);

		seIsTitle(Strings.reveal_Result);
		setStep(1);
		setIsViewNextBackBtn(false);
		setIsBackButtonDisable(false);

		setNextBtnTitle(Strings.reveal_Result);
	}, [eventBetData]);

	const backAction = () => {
		navigation.goBack();
		return true;
	};

	useEffect(() => {
		getUserBetResultData();
		BackHandler.addEventListener('hardwareBackPress', backAction);

		return () =>
			BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, []);

	const getUserBetResultData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		const uploadData = {
			bet_id: bet_id
		};
		getUserBetResult(uploadData)
			.then(res => {
				// console.log('getUserBetResult????????????', res);

				dispatch(updateApiLoader({apiLoader: false}));
				//console.log('getUserBet Response : ', res);
				setApiHashObj(res?.data?.HashSignatureObject);
				setEventBetData(res.data);
				setWinningPercentage(res?.data.winningPercentage);
				setBetWinningHelpTitle(res?.data.tokenContent.title);
				setBetWinningHelp(res?.data.tokenContent.content);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
			});
	};

	const handleRedirectUser = () => {
		navigation.navigate(ScreenNames.OtherUserProfileScreen, {
			userId:
				eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
					? eventBetData?.betTakerData?._id
					: eventBetData?.bet?.users?._id
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
					(isSelectedSubCategory === '' ? '' : ' - ') +
					isSelectedSubCategory?.toUpperCase() +
					(isSelectedLeagueType === 0
						? ' - ' + isSelectedLeague?.toUpperCase()
						: isSelectedLeagueType === 2
						? ' - ' + isSelectedLeague?.toUpperCase()
						: '')
				}
				question={question}
				selectMainMarket={
					isSelectedLeagueType === 0
						? eventBetData?.bet?.mainmarkets?.market_name +
						  (eventBetData?.bet?.market_sub_name
								? ' : ' + eventBetData?.bet?.market_sub_name
								: '')
						: question
				}
				isSelectedLeagueType={isSelectedLeagueType}
				selectedGameData={selectedGame}
				betData={eventBetData}
				handleRedirectUser={handleRedirectUser}
			/>
		);
	};

	const showViews = () => {
		console.log('showViews ', step);

		switch (step) {
			case 1:
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<Text style={styles.titleStyle}>{isTitle}</Text>
						{betsMatchDetails()}
						<BetsResultView
							localTeamName={options1?.trim()}
							// visitorTeamName={
							//   isSelectedLeagueType === 0
							//     ? selectedGame?.visitorTeamName
							//     : options2?.trim()
							// }
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
							winningPercentage={winningPercentage + ''}
							selectMySideType={isSelectChooseSideType}
							onPressNeedHelp={() => {
								setModalNeedHelpVisible(true);
							}}
							oppositeBetAmount={
								eventBetData?.resultData?.isWinner === 'win'
									? getRoundDecimalValue(
											parseFloat(eventBetData?.bet?.bet_amount) +
												parseFloat(eventBetData?.bet?.bet_opposite_amount)
									  )
									: betAmount
							}
							oppositeBetUsdAmount={
								eventBetData?.resultData?.isWinner === 'win'
									? getRoundDecimalValue(
											parseFloat(parseFloat(betAmount) * parseFloat(odds)) *
												parseFloat(convertCurrency)
									  )
									: getRoundDecimalValue(
											parseFloat(betAmount) * parseFloat(convertCurrency)
									  )
							}
							isShowFee={
								eventBetData?.resultData?.isWinner === 'win' ? true : false
							}
							bottomTitle={
								eventBetData?.resultData?.isWinner === 'win'
									? Strings.you_won
									: Strings.you_lost
							}
							isFromResult={true}
						/>
					</KeyboardAwareScrollView>
				);
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
					name={Strings.bet_result}
				/>

				<View style={styles.viewContain}>{showViews()}</View>
				{step !== 0 && !betClaimStatus && (
					<ButtonGradient
						onPress={() => {
							brodcastFinalVerdict(
								betObj?.bet_id,
								apiHashObj?.hash,
								apiHashObj?.makerSignature,
								apiHashObj?.takerSignature
							);
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

export default BetRevealResultScreen;
