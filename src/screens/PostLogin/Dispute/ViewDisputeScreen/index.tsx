import React, {useEffect, useRef, useState} from 'react';
import {
	View,
	Text,
	Platform,
	Image,
	FlatList,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	Alert
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../../assets/icon';
import HeaderComponent from '../../../../components/HeaderComponent';
import Strings from '../../../../constants/strings';
import styles from './styles';
import {defaultTheme} from '../../../../theme/defaultTheme';
import {horizontalScale, verticalScale} from '../../../../theme';
import ButtonGradient from '../../../../components/ButtonGradient';
import colors from '../../../../theme/colors';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import {
	addJuryVote,
	getUserBetResult,
	logout,
	saveJuryVoteTemp
} from '../../../../redux/apiHandler/apiActions';
import {
	handleOpenUrlInBrowser,
	showErrorAlert
} from '../../../../constants/utils/Function';
import FullScreenImageComponent from '../../../../components/FullScreenImageComponent';
import VideoPlayerComponent from '../../../../components/VideoPlayerComponent';
import MulitpleButtonComponent from '../../../../components/MultipleButtonComponent';
import ScreenNames from '../../../../navigation/screenNames';
import BetsMatchDetailsView from '../../../../components/BetsMatchDetailsView';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import DisputeTimerView from '../../../../components/DisputeTimerView';
import {RootState} from '../../../../redux/store';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {magic} from '../../../../navigation/routes';
import {
	resetProfileData,
	updateDeviceToken
} from '../../../../redux/reducerSlices/userInfo';
import TokenConfirmationModel from '../../../../components/TokenConfirmationModel';
import {gradientColorAngle} from '../../../../theme/metrics';
interface DisputeDataTypes {
	id: number;
	type: string;
	data_url: string;
}

interface DisputeOptionsTypes {
	key: String;
	value: String;
}

const ViewDisputeScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {params} = useRoute();
	const {betId, juryId}: any = params;
	const [eventBetData, setEventBetData] = useState();
	const imageRef = useRef(null);
	const [isCaseADataAvailable, setIsCaseADataAvailable] = useState(false);
	const [isCaseBDataAvailable, setIsCaseBDataAvailable] = useState(false);
	const [disputeCaseAData, setDisputeCaseAData] = useState<
		Array<DisputeDataTypes>
	>([]);
	const [disputeCaseBData, setDisputeCaseBData] = useState<
		Array<DisputeDataTypes>
	>([]);
	const [isShowImageModal, setIsShowImageModal] = useState<boolean>(false);
	const [isShowVideoModal, setIsShowVideoModal] = useState<boolean>(false);
	const [selectedCase, setSelectedCase] = useState<DisputeOptionsTypes>({
		key: params?.vote,
		value: ''
	});

	const [imageUrl, setImageUrl] = useState<string>('');
	const [videoUrl, setVideoUrl] = useState<string>('');
	const [videoThumb, setVideoThumb] = useState<string>('');
	const [votEndTime, setVotEndTime] = useState<string>('');
	const [disputeEvidance, setDisputeEvidance] = useState({});

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const {
		hashObj,
		personalSign,
		processVerdict,
		verdictAddress,
		getJuryVoteStatus,
		isJuryVoted
	} = useBetCreateContract(false);
	const connector = useWalletConnect();
	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);

	const caseArray = [];
	if (
		isCaseADataAvailable &&
		disputeCaseAData.length > 0 &&
		isCaseBDataAvailable &&
		disputeCaseBData.length > 0
	) {
		caseArray.push({key: 'A', value: 'A'});
		caseArray.push({key: 'B', value: 'B'});
	} else {
		caseArray.push({key: 'A', value: eventBetData?.bet_opposite_side_option});
		caseArray.push({key: 'B', value: eventBetData?.bet_creator_side_option});
	}

	caseArray.push({key: 'Void', value: 'VOID'});
	caseArray.push({
		key: 'NotClear',
		value: 'Not enough Evidence or Terms of Bet not clear'
	});

	useEffect(() => {
		getUserBetResultData(); // get user bet result data
	}, []);

	useUpdateEffect(() => {
		getJuryVoteStatus(eventBetData?.bet_id);
	}, [eventBetData]);

	useEffect(() => {
		console.log('====================================');
		console.log('isJuryVoted ::', isJuryVoted);
		console.log('====================================');

		if (isJuryVoted && !params?.isVoted) {
			if (Platform.OS === 'web') {
				let retVal = confirm(Strings.already_voted);
				if (retVal == true) {
					handleSendButtonClick();
					return true;
				} else {
					return false;
				}
			} else {
				Alert.alert('', Strings.already_voted, [
					{
						text: 'Retry',
						onPress: () => {
							handleSendButtonClick();
						},
						style: 'default'
					}
				]);
			}
		}
	}, [isJuryVoted]);

	useUpdateEffect(() => {
		if (hashObj?.error) {
			showErrorAlert(Strings.txt_error, Strings.txt_check_internet_connection);
		} else {
			let cash = 0;
			if (selectedCase.key === 'A') {
				cash = eventBetData?.bet_opposite_side_option_index + 1;
			} else if (selectedCase.key === 'B') {
				cash = eventBetData?.bet_creator_side_option_index + 1;
			} else if (selectedCase.key === 'Void') {
				cash = 0;
			} else if (selectedCase.key === 'NotClear') {
				cash = 3;
			}

			// if (isJuryVoted) {
			//   Alert.alert('', Strings.already_voted, [
			//     {
			//       text: 'Retry',
			//       onPress: () => {
			//         handleSendButtonClick();
			//       },
			//       style: 'default',
			//     },
			//   ]);
			// } else {
			handleSaveJuryVoteTemp(cash);
			// }
		}
	}, [hashObj]);

	useUpdateEffect(() => {
		if (verdictAddress === 'Error' || verdictAddress === '') {
			console.log('User denied metamask access');
		} else {
			//Call upload evidence function
			handleSendButtonClick();
		}
	}, [verdictAddress]);

	const handleSaveJuryVoteTemp = cash => {
		const uploadData = {
			bet_id: eventBetData?._id,
			vote_option: selectedCase.key
		};

		saveJuryVoteTemp(uploadData)
			.then(res => {
				console.log(
					'handleSaveJuryVoteTemp :: saveJuryVoteTemp ::  response ::',
					JSON.stringify(res)
				);
				if (res?.statusCode.toString().includes('200')) {
					//Call upload evidence function
					processVerdict(
						hashObj?.hash,
						hashObj?.signature,
						eventBetData?.bet_id,
						cash
					);
				} else {
					showErrorAlert('', Strings.somethingWentWrong);
				}
			})
			.catch(err => {
				console.log(
					'handleSaveJuryVoteTemp :: saveJuryVoteTemp ::  catch ::',
					err
				);
				showErrorAlert('', Strings.somethingWentWrong);
			});
	};

	const getUserBetResultData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		getUserBetResult(betId)
			.then(res => {
				// console.log('getUserBetResult????????????', res);

				dispatch(updateApiLoader({apiLoader: false}));
				setEventBetData(res?.data?.bet);
				setVotEndTime(res?.data?.disputeEvidence?.voteEndTime / 1000);
				handleUserBetResultResponse(res);
				setDisputeEvidance(res?.data?.disputeEvidence);
				setSelectedCase({
					key: res?.data?.disputeEvidence?.temporary_vote_option,
					value: ''
				});
			})
			.catch(error => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBetResultData :: error :: ', JSON.stringify(error));
				showErrorAlert('', JSON.parse(error).message);
			});
	};

	const handleUserBetResultResponse = (res: any) => {
		console.log('====================================');
		console.log('getUserBetResultData Response : ', JSON.stringify(res));
		console.log('====================================');
		const disputeEvidence = res?.data?.disputeEvidence;
		const betTakerEvidenceData = disputeEvidence?.betTakerEvidence;
		if (betTakerEvidenceData) {
			setIsCaseADataAvailable(true);
			handleBetTakerEvidenceData(betTakerEvidenceData);
		}
		const betMakerEvidenceData = disputeEvidence?.betMakerEvidence;
		if (betMakerEvidenceData) {
			setIsCaseBDataAvailable(true);
			handleBetMakerEvidenceData(betMakerEvidenceData);
		}
	};

	const handleBetTakerEvidenceData = (betTakerEvidenceData: any) => {
		const disputeDataArray = [];
		let disputeEvidenceDataId = 0;
		const proofLinksArray = betTakerEvidenceData?.proofLinks;
		const proofImagesUrlsArray = betTakerEvidenceData?.proofImagesUrls;
		const proofVideosUrlsArray = betTakerEvidenceData?.proofVideosUrls;
		if (proofLinksArray && proofLinksArray.length > 0) {
			for (let i = 0; i < proofLinksArray.length; i++) {
				const proofLink = proofLinksArray[i];
				const disputeDataObj = {
					id: disputeEvidenceDataId,
					type: 'url',
					data_url: proofLink
				};
				disputeDataArray.push(disputeDataObj);
				disputeEvidenceDataId++;
			}
			setDisputeCaseAData([...disputeCaseAData, ...disputeDataArray]);
		}
		if (proofImagesUrlsArray && proofImagesUrlsArray.length > 0) {
			for (let i = 0; i < proofImagesUrlsArray.length; i++) {
				const proofImageUrl = proofImagesUrlsArray[i];
				const disputeDataObj = {
					id: disputeEvidenceDataId,
					type: 'image',
					data_url: proofImageUrl
				};
				disputeDataArray.push(disputeDataObj);
				disputeEvidenceDataId++;
			}
			setDisputeCaseAData([...disputeCaseAData, ...disputeDataArray]);
		}
		if (proofVideosUrlsArray && proofVideosUrlsArray.length > 0) {
			for (let i = 0; i < proofVideosUrlsArray.length; i++) {
				const proofVideoUrl = proofVideosUrlsArray[i].url;
				const proofVideoThumb = proofVideosUrlsArray[i].image_thumb;
				const disputeDataObj = {
					id: disputeEvidenceDataId,
					type: 'video',
					data_url: proofVideoUrl,
					data_video_thumb: proofVideoThumb
				};
				disputeDataArray.push(disputeDataObj);
				disputeEvidenceDataId++;
			}
			setDisputeCaseAData([...disputeCaseAData, ...disputeDataArray]);
		}
	};

	const handleBetMakerEvidenceData = (betMakerEvidenceData: any) => {
		const disputeDataArray = [];
		let disputeEvidenceDataId = 0;
		const proofLinksArray = betMakerEvidenceData?.proofLinks;
		const proofImagesUrlsArray = betMakerEvidenceData?.proofImagesUrls;
		const proofVideosUrlsArray = betMakerEvidenceData?.proofVideosUrls;
		if (proofLinksArray && proofLinksArray.length > 0) {
			for (let i = 0; i < proofLinksArray.length; i++) {
				const proofLink = proofLinksArray[i];
				const disputeDataObj = {
					id: disputeEvidenceDataId,
					type: 'url',
					data_url: proofLink
				};
				disputeDataArray.push(disputeDataObj);
				disputeEvidenceDataId++;
			}
			setDisputeCaseBData([...disputeCaseBData, ...disputeDataArray]);
		}
		if (proofImagesUrlsArray && proofImagesUrlsArray.length > 0) {
			for (let i = 0; i < proofImagesUrlsArray.length; i++) {
				const proofImageUrl = proofImagesUrlsArray[i];
				const disputeDataObj = {
					id: disputeEvidenceDataId,
					type: 'image',
					data_url: proofImageUrl
				};
				disputeDataArray.push(disputeDataObj);
				disputeEvidenceDataId++;
			}
			setDisputeCaseBData([...disputeCaseBData, ...disputeDataArray]);
		}
		if (proofVideosUrlsArray && proofVideosUrlsArray.length > 0) {
			for (let i = 0; i < proofVideosUrlsArray.length; i++) {
				const proofVideoUrl = proofVideosUrlsArray[i].url;
				const proofVideoThumb = proofVideosUrlsArray[i].image_thumb;
				const disputeDataObj = {
					id: disputeEvidenceDataId,
					type: 'video',
					data_url: proofVideoUrl,
					data_video_thumb: proofVideoThumb
				};
				disputeDataArray.push(disputeDataObj);
				disputeEvidenceDataId++;
			}
			setDisputeCaseBData([...disputeCaseBData, ...disputeDataArray]);
		}
	};

	const handleLinkPress = (urlTxt: string) => {
		handleOpenUrlInBrowser(urlTxt);
	};

	const handleSendButtonClick = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		const data = {
			bet_id: betId,
			// jury_id: juryId,
			vote_option: isJuryVoted
				? disputeEvidance?.temporary_vote_option
				: selectedCase.key,
			disputeSignature: hashObj?.signature,
			disputeHash: hashObj?.hash
		};
		addJuryVote(data)
			.then(res => {
				console.log(
					'handleSendButtonClick :: addJuryVote :: res :: ',
					JSON.stringify(res)
				);
				dispatch(updateApiLoader({apiLoader: false}));
				navigateThankYouScreen();
			})
			.catch(error => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBetResultData :: error :: ', JSON.stringify(error));
				showErrorAlert('', JSON.parse(error).message);
			});
	};

	const signDispute = async () => {
		if (
			userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask' &&
			!connector.connected
		) {
			showErrorAlert('', Strings.txt_session_expire_msg);
			return;
		} else {
			if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
				const loginStatus = await magic.user.isLoggedIn();
				console.log('loginStatus', loginStatus);
				if (!loginStatus) {
					if (Platform.OS === 'web') {
						let retVal = confirm(Strings.txt_session_expire_msg);
						if (retVal == true) {
							dispatch(logout());
							dispatch(updateDeviceToken({deviceToken: ''}));
							dispatch(resetProfileData({}));
							return true;
						} else {
							return false;
						}
					} else {
						Alert.alert(Strings.txt_session_expire_msg, '', [
							{
								text: 'Ok',
								onPress: () => {
									dispatch(logout());
									dispatch(updateDeviceToken({deviceToken: ''}));
									dispatch(resetProfileData({}));
								}
							}
						]);
					}
					return;
				}
			}
		}
		personalSign(eventBetData?.bet_id);
	};

	const navigateThankYouScreen = () => {
		navigation.navigate(ScreenNames.DisputeThankYouScreen, {
			title: Strings.thank_you_vote_sent,
			subTitle: Strings.we_will_review_vote,
			isFromJury: params?.isFromJury
		});
	};

	const renderItem = ({item}: any) => {
		return (
			<View key={item.id} style={{paddingBottom: verticalScale(4)}}>
				{item.type === 'url' && (
					<ButtonGradient
						leftIconPath={icons.link}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonText={item.data_url}
						buttonTextcolor={colors.white}
						numberOfLines={2}
						leftIconStyle={styles.disputeLinkIcon}
						style={styles.disputeLinkPreviewContainer}
						onPress={() => handleLinkPress(item.data_url)}
					/>
				)}
				{item.type === 'image' && (
					<View
						style={{
							marginTop: horizontalScale(20),
							borderRadius: 8,
							borderColor: colors.white,
							borderWidth: 0.4,
							justifyContent: 'center',
							flex: 1
						}}>
						<ImageBackground
							ref={imageRef.current}
							source={{uri: item.data_url}}
							style={{
								height: verticalScale(150),
								marginVertical: verticalScale(2)
							}}
							resizeMode={'contain'}>
							<TouchableOpacity
								onPress={() => {
									setIsShowImageModal(true);
									setImageUrl(item.data_url);
								}}>
								<Image
									source={icons.imageExpander}
									style={{
										height: 32,
										width: 32,
										position: 'absolute',
										top: verticalScale(12),
										right: horizontalScale(12),
										backgroundColor: 'rgba(0,0,0,0.2)'
									}}
								/>
							</TouchableOpacity>
						</ImageBackground>
					</View>
				)}
				{item.type == 'video' && (
					<ImageBackground
						style={{
							height: 150,
							borderRadius: 8,
							marginTop: verticalScale(20),
							alignItems: 'center',
							justifyContent: 'center',
							borderColor: colors.white,
							borderWidth: 0.4,
							overflow: 'hidden'
						}}
						source={{uri: item.data_video_thumb}}>
						<TouchableOpacity
							onPress={() => {
								setIsShowVideoModal(true);
								setVideoUrl(item.data_url);
								setVideoThumb(item.data_video_thumb);
							}}
							activeOpacity={0.8}>
							<Image
								source={icons.playIcon}
								style={{
									height: 48,
									width: 48,
									tintColor: 'rgba(255,255,255,0.9)',
									alignSelf: 'center',
									justifyContent: 'center'
								}}
							/>
						</TouchableOpacity>
					</ImageBackground>
				)}
				<FullScreenImageComponent
					isVisible={isShowImageModal}
					url={imageUrl}
					onClose={() => setIsShowImageModal(false)}
				/>
				<VideoPlayerComponent
					isVisible={isShowVideoModal}
					url={videoUrl}
					poster={videoThumb}
					onClose={() => setIsShowVideoModal(false)}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.dispute_view}
				/>

				<ScrollView
					style={{
						marginHorizontal: horizontalScale(16),
						flex: 1,
						paddingBottom: verticalScale(50)
					}}
					showsVerticalScrollIndicator={false}>
					<View style={{marginVertical: verticalScale(10)}}>
						<Text style={styles.txtEvidence}>
							{Strings.evidence_of_the_dispute}
						</Text>
						<Text style={styles.txtTimeLeft}>{Strings.time_left}</Text>
						<DisputeTimerView voteEndTime={votEndTime} />
					</View>
					{eventBetData && (
						<BetsMatchDetailsView
							popupTitle={Strings.bet_details}
							betType={
								eventBetData?.bet_type === 2
									? eventBetData?.bettypes?.name?.toUpperCase()
									: Strings.custom.toUpperCase()
							}
							// categoryName={
							// 	eventBetData?.categories?.name?.toUpperCase() +
							// 	' - ' +
							// 	eventBetData?.subcategories?.name?.toUpperCase() +
							// 	(eventBetData?.bet_type === 2
							// 		? ' - ' + eventBetData?.match?.leagueName?.toUpperCase()
							// 		: '')
							// }
							categoryName={
								eventBetData?.categories?.name?.toUpperCase() +
								(eventBetData?.subcategories
									? ' - ' +
									  eventBetData?.subcategories?.name?.toUpperCase() +
									  (eventBetData?.bet_type === 2
											? ' - ' + eventBetData?.match?.leagueName?.toUpperCase()
											: '')
									: '')
							}
							question={eventBetData?.betQuestion}
							selectMainMarket={eventBetData?.betQuestion}
							isSelectedLeagueType={eventBetData?.bet_type}
							selectedGameData={eventBetData?.match}
							betData={eventBetData}
							isShowUserProfile
						/>
					)}
					{isCaseADataAvailable && disputeCaseAData.length > 0 && (
						<View
							style={[
								styles.disputeCasesRootContainer,
								Platform.OS == 'ios' ? styles.iosShadow : styles.androidShadow
							]}>
							<View style={styles.disputeCasesChildContainer}>
								<Text style={styles.disputeCaseTitle}>
									{isCaseBDataAvailable && disputeCaseBData.length > 0
										? 'Case A'
										: 'Evidence'}
								</Text>
								<FlatList
									data={disputeCaseAData}
									keyExtractor={item => item.id}
									renderItem={renderItem}
									showsVerticalScrollIndicator={false}
									scrollEnabled={false}
								/>
							</View>
						</View>
					)}
					{isCaseBDataAvailable && disputeCaseBData.length > 0 && (
						<View
							style={[
								styles.disputeCasesRootContainer,
								Platform.OS == 'ios' ? styles.iosShadow : styles.androidShadow
							]}>
							<View style={styles.disputeCasesChildContainer}>
								<Text style={styles.disputeCaseTitle}>
									{isCaseADataAvailable && disputeCaseAData.length > 0
										? 'Case B'
										: 'Evidence'}
								</Text>
								<FlatList
									data={disputeCaseBData}
									keyExtractor={item => item.id}
									renderItem={renderItem}
									showsVerticalScrollIndicator={false}
									scrollEnabled={false}
								/>
							</View>
						</View>
					)}
					{eventBetData && (
						<MulitpleButtonComponent
							title={
								isCaseADataAvailable &&
								disputeCaseAData.length > 0 &&
								isCaseBDataAvailable &&
								disputeCaseBData.length > 0
									? Strings.who_case_right
									: 'Choose Accurate Bet Outcome'
							}
							btnTextArray={caseArray}
							selectItem={selectedCase}
							handleSelection={(text: any) => {
								setSelectedCase(text);
							}}
							btnDisable={params?.vote}
						/>
					)}
				</ScrollView>

				{!params?.vote && (
					<ButtonGradient
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.send}
						style={styles.sendButton}
						onPress={() => {
							setIsTokenConfirmationModelVisible(true);
						}}
						btnDisabled={selectedCase.key ? false : true}
					/>
				)}
			</View>
			<TokenConfirmationModel
				title={Strings.signature_Request}
				infoDescription={Strings.signature_request_message}
				isTokenConfirmationModelVisible={isTokenConfirmationModelVisible}
				tokenPrice={eventBetData?.bet_id} // tokenPrice
				handleYesButtonClick={() => {
					// contract calling
					setIsTokenConfirmationModelVisible(false);
					setTimeout(() => {
						signDispute();
					}, 1000);
				}}
				handleNoButtonClick={() => {
					setIsTokenConfirmationModelVisible(false);
				}}
			/>
		</SafeAreaView>
	);
};
export default ViewDisputeScreen;
