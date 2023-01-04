import Clipboard from '@react-native-clipboard/clipboard';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	Alert,
	Linking,
	Platform,
	Share,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import GradientProgressView from '../../../components/GradientProgressView';
import HeaderComponent from '../../../components/HeaderComponent';
import ShareOptionView from '../../../components/ShareOptionView';
import Strings from '../../../constants/strings';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {getBetsForVideoUpload} from '../../../redux/apiHandler/apiActions';
import OtherUserProfileReplicateBetComponent from '../../../components/OtherUserProfileReplicateBetComponent';
import {FlatList} from 'react-native-gesture-handler';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {Api, ApiBaseUrl, ApiConstants} from '../../../constants/api';
import NoDataComponent from '../../../components/NoDataComponent';
import {Video, getRealPath} from 'react-native-compressor';

const VideoCreationScreen = () => {
	const navigation = useNavigation();
	const {path, type, from, videoDuration} = useRoute().params;
	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [isProgress, seIsProgress] = useState('90%');
	const [step, setStep] = useState(1);

	const [isTitle, setIsTitle] = useState(Strings.attach_video_to_bets);
	const [isNextButtonDisable, setIsNextButtonDisable] = useState(true);
	const [isShareScreen, setIsShareScreen] = useState(false);
	const [isNoData, setIsNoData] = useState(false);
	const [activeBetsData, setActiveBetsData] = useState([]);
	const [betSelectedId, setBetSelectedId] = useState('');
	const [videoUploadUrl, setVideoUploadUrl] = useState();

	const noDataItem = {
		image_url: icons.star_congrats,
		title_text: '',
		description_text: Strings.no_active_bets
	};

	useEffect(() => {
		getActiveBets();
	}, []);

	function getActiveBets() {
		dispatch(updateApiLoader({apiLoader: true}));
		getBetsForVideoUpload()
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				setActiveBetsData(res?.data);
				setIsNoData(res?.data?.length === 0 ? true : false);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
			});
	}

	const createFormData = (videoCompress: string) => {
		const formData = new FormData();

		if (betSelectedId) {
			formData.append('bet_id', betSelectedId);
		}
		if (Platform.OS === 'web') {
			formData.append('duration', videoDuration);
			formData.append('video', path);
		} else {
			let filename = videoCompress.replace(/^.*[\\\/]/, '');
			formData.append('duration', videoDuration);

			formData.append('video', {
				name: filename,
				type: `video/${filename.split('.')[1]}`,
				uri:
					Platform.OS === 'android'
						? Platform.OS === 'android' && from === 'launchImageLibrary'
							? videoCompress
							: videoCompress.replace('file://', 'file:///')
						: videoCompress.replace('file://', '')
			});
		}

		console.log('formData', JSON.stringify(formData));
		return formData;
	};

	const uploadShortVideo = async () => {
		dispatch(updateApiLoader({apiLoader: true}));
		let realPath;
		let videoCompress;
		if (Platform.OS !== 'web') {
			videoCompress = await Video.compress(
				path,
				{
					compressionMethod: 'auto'
				},
				progress => {
					console.log('Compression Progress: ', progress);
				}
			);

			realPath = await videoCompress;
		}

		fetch(ApiBaseUrl + ApiConstants.uploadShortVideo, {
			method: Api.POST,
			body:
				Platform.OS === 'web'
					? createFormData()
					: createFormData(
							Platform.OS === 'android' && from === 'launchImageLibrary'
								? realPath
								: videoCompress
					  ),
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		})
			.then(response => response.json())
			.then(response => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('upload succes', JSON.stringify(response));
				if (response?.statusCode == 200) {
					setVideoUploadUrl(response?.data);
					seIsProgress('100%');
					setStep(2);
					setIsTitle('');
					setIsShareScreen(true);
				} else {
					Alert.alert('', response?.message);
				}
			})
			.catch(error => {
				console.log('upload error', JSON.stringify(error));
				dispatch(updateApiLoader({apiLoader: false}));
				// navigation.goBack();
			});
	};

	function handleBetViewSelection(id) {
		if (betSelectedId === id) {
			setIsNextButtonDisable(true);
			setBetSelectedId('');
		} else {
			setIsNextButtonDisable(false);
			setBetSelectedId(id);
		}
	}

	const onShare = async (url: string) => {
		try {
			const result = await Share.share({
				message: url
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

	const renderActiveBets = item => {
		return (
			<OtherUserProfileReplicateBetComponent
				itemData={item?.item}
				isHideReplicateBet={true}
				isOnlyHideBetTitle={false}
				betSelectedId={betSelectedId}
				SelectedValue={value => {
					handleBetViewSelection(value);
				}}
				isFromVideoCreation={true}
				handleAlreadyBetTackerUserPicked={() => {}}
			/>
		);
	};

	const showViews = () => {
		switch (step) {
			case 1:
				return (
					<>
						{isNoData ? (
							<View style={styles.noDataContainer}>
								<NoDataComponent noData={noDataItem} />
							</View>
						) : (
							<FlatList data={activeBetsData} renderItem={renderActiveBets} />
						)}
					</>
				);
			case 2:
				return (
					<View style={styles.viewDoneStyle}>
						<Text style={styles.titleDoneStyle}>
							{betSelectedId === ''
								? Strings.well_done_video_has_been_created.replace(
										'%s',
										userInfo?.user?.displayName || userInfo?.user?.userName
								  )
								: Strings.well_done_bet_has_been_created.replace(
										'%s',
										userInfo?.user?.displayName || userInfo?.user?.userName
								  )}
						</Text>
						<LottieView
							style={styles.lottieViewStyle}
							source={require('../../../assets/animations/confetti_day.json')}
							autoPlay
							loop={false}
						/>
						<KeyboardAwareScrollView
							bounces={false}
							showsVerticalScrollIndicator={false}>
							<ShareOptionView
								onPressShare={text => {
									if (text === Strings.share_on_whatsapp) {
										Linking.openURL('whatsapp://send?text=' + '');
									} else if (text === Strings.share_on_telegram) {
										Linking.openURL('tg://msg?text=' + '');
									} else if (text === Strings.share_on_twitter) {
										Linking.openURL('twitter://post?message=' + '');
									} else if (text === Strings.copy_link) {
										Clipboard.setString('');
										Alert.alert(Strings.copy_link_desc);
									} else {
										onShare('');
									}
								}}
							/>
						</KeyboardAwareScrollView>
					</View>
				);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						if (videoUploadUrl) {
							navigation.dispatch(StackActions.popToTop());
						} else {
							navigation.goBack();
						}
					}}
					onLeftIconPath={icons.back}
					name={Strings.video_creation}
				/>

				<View style={styles.viewContain}>
					<GradientProgressView progress={isProgress} />
					{isTitle !== '' && <Text style={styles.titleStyle}>{isTitle}</Text>}
					{showViews()}
				</View>

				<View style={styles.buttonView}>
					{!isShareScreen ? (
						<>
							{activeBetsData.length !== 0 && (
								<ButtonGradient
									onPress={() => {
										uploadShortVideo();
									}}
									colorArray={defaultTheme.secondaryGradientColor}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									buttonText={Strings.next}
									style={styles.nextButton}
									btnDisabled={isNextButtonDisable}
								/>
							)}

							{isNextButtonDisable && (
								<TouchableOpacity
									onPress={() => {
										uploadShortVideo();
									}}>
									<Text style={styles.titleSkip}>{Strings.skip}</Text>
								</TouchableOpacity>
							)}
						</>
					) : (
						<ButtonGradient
							onPress={() => {
								navigation.dispatch(StackActions.popToTop());
							}}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.continue_to_feed}
							style={styles.nextButton}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default VideoCreationScreen;
