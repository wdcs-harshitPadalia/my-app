import React, {forwardRef, useState, useImperativeHandle, useRef} from 'react';
import {
	Alert,
	FlatList,
	Image,
	ImageBackground,
	Keyboard,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
// import {openSettings, PERMISSIONS, request} from 'react-native-permissions';

import icons from '../../assets/icon';

import {Api, ApiBaseUrl, ApiConstants} from '../../constants/api';
import Strings from '../../constants/strings';
import {
	createThumbnailFromUrl,
	handleOpenUrlInBrowser,
	showErrorAlert,
	isValidUrl,
	getCompressedImage
} from '../../constants/utils/Function';
import {validationRegex} from '../../constants/utils/Validation';

import {magic} from '../../navigation/routes';

import {logout} from '../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../redux/reducerSlices/preLogin';
import {
	resetProfileData,
	updateDeviceToken
} from '../../redux/reducerSlices/userInfo';
import {RootState} from '../../redux/store';

import {Colors, horizontalScale, verticalScale} from '../../theme';
import colors from '../../theme/colors';
import {defaultTheme} from '../../theme/defaultTheme';
import fonts from '../../theme/fonts';
import {gradientColorAngle, width} from '../../theme/metrics';

import ButtonGradient from '../ButtonGradient';
import {useBetCreateContract} from '../CustomHooks/SmartContract';
import useUpdateEffect from '../CustomHooks/useUpdateEffect';
import InputComponent from '../InputComponent';
import SelectImageComponentModal from '../SelectImageComponentModal';
import TokenConfirmationModel from '../TokenConfirmationModel';
import VideoPlayerComponent from '../VideoPlayerComponent';
import FullScreenImageComponent from '../FullScreenImageComponent';
import UploadOptionalEvidenceViewComponent from '../UploadOptionalEvidenceViewComponent';

interface EvidenceProps {
	style?: ViewStyle;
	handleSendButtonDisable: (data: boolean) => void;
	navigateToThankYouScreen: () => void;
	navigateToNotification: () => void;

	betId: string;
	winnerOption?: string;
	amount?: string;
	contractAddress?: string;
	bet_contract_address?: string;
	myCase?: string;
	betUserId?: string;
	isOpenDispute?: boolean;
	isAlreadyPaid?: boolean;
}

const EvidenceType = forwardRef((props: EvidenceProps, ref) => {
	const {
		handleSendButtonDisable,
		navigateToThankYouScreen,
		navigateToNotification,
		betId,
		winnerOption,
		contractAddress,
		amount,
		myCase,
		bet_contract_address,
		betUserId,
		isOpenDispute,
		isAlreadyPaid
	} = props;

	const dispatch = useDispatch();
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [enterUrlView, setEnterUrlView] = useState<boolean>(false);
	const [showImageSelectionView, setShowImageSelectionView] =
		useState<boolean>(false);

	const [urlText, setUrlText] = useState('');
	const [videoUrl, setVideoUrl] = useState<string>('');
	const [videoThumb, setVideoThumb] = useState<string>('');

	const [urlItemsArray, serUrlItemsArray] = useState<Array<Object>>([]);
	const [evidenceItemsArray, setEvidenceItemsArray] = useState<Array<Object>>(
		[]
	);

	const myRef = useRef();

	const [isShowVideoModal, setIsShowVideoModal] = useState<boolean>(false);

	const [imageUrl, setImageUrl] = useState<string>('');
	const [isShowImageModal, setIsShowImageModal] = useState<boolean>(false);

	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);

	const {
		hashObj,
		personalSign,
		createDispute,
		createDisputeRoom,
		disputeAddress
	} = useBetCreateContract(false);

	const connector = useWalletConnect();

	useUpdateEffect(() => {
		if (hashObj?.error) {
			showErrorAlert(Strings.txt_error, Strings.txt_check_internet_connection);
		} else {
			if (isOpenDispute) {
				// createDisputeRoom(
				// 	hashObj?.hash,
				// 	hashObj?.signature,
				// 	bet_contract_address,
				// 	myCase
				// );
				setTimeout(
					() => {
						createDisputeRoom(
							hashObj?.hash,
							hashObj?.signature,
							bet_contract_address,
							myCase
						);
					},
					userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask'
						? 500
						: 0
				);
			} else {
				if (betUserId === userInfo.user?._id || isAlreadyPaid) {
					handleUploadEvidence();
				} else {
					// Call upload evidence function
					// createDispute(
					// 	hashObj?.hash,
					// 	hashObj?.signature,
					// 	bet_contract_address,
					// 	myCase
					// );
					setTimeout(
						() => {
							createDispute(
								hashObj?.hash,
								hashObj?.signature,
								bet_contract_address,
								myCase
							);
						},
						userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask'
							? 500
							: 0
					);
				}
			}
		}
	}, [hashObj]);

	useUpdateEffect(() => {
		if (disputeAddress === 'Error' || disputeAddress === '') {
			console.log('User denied metamask access');
			navigateToNotification();
		} else {
			//Call upload evidence function
			handleUploadEvidence();
		}
	}, [disputeAddress]);

	const showHideInputUrlView = () => {
		setEnterUrlView(!enterUrlView);
		if (showImageSelectionView) {
			setShowImageSelectionView(!showImageSelectionView);
		}
	};

	const showHideImageVideoView = () => {
		if (evidenceItemsArray.length < 5) {
			if (Platform.OS === 'web') {
				myRef.current.click(function () {
					changeHandler();
				});
			} else {
				setShowImageSelectionView(!showImageSelectionView);
			}
			if (enterUrlView) {
				setEnterUrlView(!enterUrlView);
			}
		} else {
			showErrorAlert('', Strings.reach_max_limit);
		}
	};

	const checkValidationAndAddURL = () => {
		if (validationRegex.url.test(urlText) && isValidUrl(urlText)) {
			var urlItemObj = {
				id: Date.now(),
				url: urlText
			};

			serUrlItemsArray([...urlItemsArray, urlItemObj]);

			Keyboard.dismiss();
			setUrlText('');

			handleSendButtonDisable(false);
		} else {
			showErrorAlert('', Strings.please_enter_valid_url);
		}
	};

	const handleLinkPress = (urlTxt: string) => {
		handleOpenUrlInBrowser(urlTxt);
	};

	const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}
		checkValidationAndAddEvidenceFormWeb(event.target.files[0]);
	};

	const checkValidationAndAddEvidenceFormWeb = async responseData => {
		const {type, name, size, length, webkitRelativePath} = responseData;
		//const imageStrUri = await fileToBase64(responseData);
		let videoMetaData;

		let compressedPictureData;
		if (type.includes('image')) {
			compressedPictureData = await getCompressedImage(
				!type.includes('video') ? responseData : {}
			);
		}

		let imageThumbPath;
		console.log(
			'createThumbnailFromUrl :: imageThumbPath :: ',
			videoMetaData?.duration,
			type,
			name,
			size,
			length,
			webkitRelativePath
		);

		if (type.includes('video')) {
			videoMetaData = await getVideoMetaData(responseData);
			//imageThumbPath = await createThumbnailFromUrl(webkitRelativePath, name);
			console.log(
				'createThumbnailFromUrl :: imageThumbPath :: ',
				videoMetaData?.duration,
				imageThumbPath
			);
		}

		if (evidenceItemsArray.length < 5) {
			var evidenceItemObj = {
				id: Date.now(),
				name: name,
				type: type,
				// uri:
				//   Platform.OS === 'android'
				//     ? type.includes('video')
				//       ? uri + '.' + type.split('/')[1]
				//       : uri
				//     : uri.replace('file://', ''),
				uri: type.includes('image') ? compressedPictureData : responseData,
				file: await fileToBase64(
					type.includes('image') ? compressedPictureData : responseData
				),
				image_thumb: type.includes('video') ? imageThumbPath : ''
			};

			console.log('====================================');
			console.log('evidenceItemObj :: ', evidenceItemObj);
			console.log('====================================');

			if (type.includes('video')) {
				if (parseInt(videoMetaData?.duration) > 30) {
					showErrorAlert(Strings.upload_video_30s, '');
				} else if (size / 1024 ** 2 > 30) {
					showErrorAlert(Strings.upload_video_30mb, '');
				} else {
					setEvidenceItemsArray([...evidenceItemsArray, evidenceItemObj]);
					handleSendButtonDisable(false);
				}
			} else {
				setEvidenceItemsArray([...evidenceItemsArray, evidenceItemObj]);
				handleSendButtonDisable(false);
			}
		}
	};

	const getVideoMetaData = async file =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const media = new Audio(reader.result);
				media.onloadedmetadata = () => resolve(media);
			};
			reader.readAsDataURL(file);
			reader.onerror = error => reject(error);
		});

	const fileToBase64 = async file =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = e => reject(e);
		});

	const pickImage = async (from: String) => {
		// if (from === 'camera') {
		// 	let reqPermission = await request(
		// 		Platform.OS === 'android'
		// 			? PERMISSIONS.ANDROID.CAMERA
		// 			: PERMISSIONS.IOS.CAMERA
		// 	);
		// 	console.log('pickImage reqPermission :: ', reqPermission);
		// 	if (reqPermission === 'granted') {
		// 		setTimeout(() => {
		// 			ImagePicker.launchCamera(
		// 				{
		// 					mediaType: 'mixed',
		// 					includeBase64: true,
		// 					maxHeight: 800,
		// 					maxWidth: 800,
		// 					videoQuality: 'medium',
		// 					durationLimit: 30
		// 				},
		// 				async response => {
		// 					handleResponse(response);
		// 				}
		// 			);
		// 		}, 200);
		// 	} else {
		// 		showGivePermissonAlert();
		// 	}
		// } else {
		// 	ImagePicker.launchImageLibrary(
		// 		{
		// 			mediaType: 'mixed',
		// 			includeBase64: false,
		// 			maxHeight: 800,
		// 			maxWidth: 800,
		// 			videoQuality: 'medium'
		// 		},
		// 		async response => {
		// 			handleResponse(response);
		// 		}
		// 	);
		// }
	};

	const showGivePermissonAlert = () => {
		// Alert.alert('Alert', Strings.cameraAccess, [
		// 	{
		// 		text: 'Open Settings',
		// 		onPress: () => openSettings()
		// 	},
		// 	{
		// 		text: 'Cancel',
		// 		onPress: () => console.log('Cancel Pressed')
		// 	}
		// ]);
	};

	const handleResponse = response => {
		setShowImageSelectionView(false);

		if (response.didCancel) {
			console.log('ImagePicker didCancel');
		} else if (response.error) {
			console.log('ImagePicker Error :: ', response.error);
		} else {
			console.log('response.assets[0] >> ', response?.assets[0]);

			checkValidationAndAddEvidence(response?.assets[0]);
		}
	};

	const checkValidationAndAddEvidence = async responseData => {
		const {type, fileName, fileSize, duration, uri} = responseData;

		let imageThumbPath;

		if (type.includes('video')) {
			imageThumbPath = await createThumbnailFromUrl(uri, fileName);
			// console.log('createThumbnailFromUrl :: imageThumbPath :: ', imageThumbPath);
		}

		if (evidenceItemsArray.length < 5) {
			var evidenceItemObj = {
				id: Date.now(),
				name: type.includes('video')
					? Platform.OS === 'android'
						? fileName + '.' + type.split('/')[1]
						: fileName
					: fileName,
				type: type,
				// uri:
				//   Platform.OS === 'android'
				//     ? type.includes('video')
				//       ? uri + '.' + type.split('/')[1]
				//       : uri
				//     : uri.replace('file://', ''),
				uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
				image_thumb: type.includes('video')
					? Platform.OS === 'android'
						? imageThumbPath
						: imageThumbPath.replace('file://', '')
					: ''
			};

			console.log('====================================');
			console.log('evidenceItemObj :: ', evidenceItemObj);
			console.log('====================================');

			if (type.includes('video')) {
				if (parseInt(duration) > 30) {
					showErrorAlert('', Strings.upload_video_30s);
				} else if (fileSize / 1024 ** 2 > 30) {
					showErrorAlert('', Strings.upload_video_30mb);
				} else {
					setEvidenceItemsArray([...evidenceItemsArray, evidenceItemObj]);
					handleSendButtonDisable(false);
				}
			} else {
				setEvidenceItemsArray([...evidenceItemsArray, evidenceItemObj]);
				handleSendButtonDisable(false);
			}
		}
	};

	const handleRemoveEvidence = itemId => {
		var index = evidenceItemsArray.findIndex(function (o) {
			return o.id === itemId;
		});
		if (index !== -1) {
			evidenceItemsArray.splice(index, 1);
			setEvidenceItemsArray([...evidenceItemsArray]);

			if (urlItemsArray.length === 0) {
				handleSendButtonDisable(true);
			}
		}
	};

	// The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	useImperativeHandle(ref, () => ({
		signDispute() {
			setIsTokenConfirmationModelVisible(true);
		}
	}));

	const createFormData = () => {
		const urlStringArray = [];

		for (let i = 0; i < urlItemsArray.length; i++) {
			const strUrl = urlItemsArray[i]?.url;
			urlStringArray.push(strUrl);
		}
		const formData = new FormData();
		formData.append('winnerOption', winnerOption);
		if (amount) {
			formData.append('disputeAmount', amount); // for now set static id
		}
		if (contractAddress) {
			formData.append('disputeContractAddress', contractAddress); // for now set static id
		}
		if (hashObj?.signature) {
			formData.append('disputeSignature', hashObj.signature);
		}

		if (hashObj?.hash) {
			formData.append('disputeHash', hashObj.hash);
		}
		formData.append('bet_id', betId); // for now set static id
		//formData.append('proofLinks', urlStringArray);
		urlStringArray.forEach(proofLink =>
			formData.append('proofLinks', proofLink)
		);
		//formData.append('evidenceFile', evidenceItemsArray);
		evidenceItemsArray.forEach(evidenceFile =>
			formData.append(
				'evidenceFile',
				Platform.OS === 'web' ? evidenceFile.uri : evidenceFile
			)
		);
		console.log('formData >> ', JSON.stringify(formData));

		return formData;
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
		personalSign(bet_contract_address);
	};

	const handleUploadEvidence = async () => {
		dispatch(updateApiLoader({apiLoader: true}));

		fetch(ApiBaseUrl + ApiConstants.addResultDispute, {
			method: Api.POST,
			body: await createFormData(),
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		})
			.then(response => response.json())
			.then(response => {
				console.log('handleUploadEvidence succes', response);
				dispatch(updateApiLoader({apiLoader: false}));
				if (response?.statusCode.toString().includes('200')) {
					navigateToThankYouScreen();
				} else {
					showErrorAlert('', response?.message);
				}
			})
			.catch(error => {
				console.log('handleUploadEvidence error', JSON.stringify(error));
				dispatch(updateApiLoader({apiLoader: false}));
				showErrorAlert(
					'',
					error.response?.data?.message ?? Strings.somethingWentWrong
				);
			});
	};

	const renderUrlItem = ({item, index}) => (
		<View key={index}>
			<ButtonGradient
				leftIconPath={icons.link}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={item.url}
				style={{marginTop: 10}}
				paddingVertical={20}
				leftIconStyle={{width: 36, height: 36}}
				onPress={() => handleLinkPress(item.url)}
			/>
		</View>
	);

	const renderEvidenceItem = ({item, index}) => {
		return (
			<View key={item.id} style={styles.renderEvidenceRootContainer}>
				{item.type === 'image/png' ||
				item.type === 'image/jpg' ||
				item.type === 'image/jpeg' ? (
					<TouchableOpacity
						style={styles.imageEvidenceBg}
						onPress={() => {
							setIsShowImageModal(true);
							setImageUrl(Platform.OS === 'web' ? item.file : item.uri);
						}}>
						<ImageBackground
							source={{uri: Platform.OS === 'web' ? item.file : item.uri}}
							style={styles.imageEvidenceBg}
							resizeMode={'contain'}>
							<TouchableOpacity onPress={() => handleRemoveEvidence(item.id)}>
								<Image
									source={icons.delete}
									style={styles.imageEvidenceDeleteIcon}
								/>
							</TouchableOpacity>
						</ImageBackground>
					</TouchableOpacity>
				) : (
					<ImageBackground
						style={styles.videoEvidenceBg}
						source={{uri: item.image_thumb}}>
						<TouchableOpacity
							onPress={() => {
								setIsShowVideoModal(true);
								// if (Platform.OS === 'android' && item.type.includes('video')) {
								//   setVideoUrl(
								//     item.uri.replace('.' + item.type.split('/')[1], ''),
								//   );
								// } else {
								//   setVideoUrl(item.uri);
								// }
								setVideoUrl(Platform.OS === 'web' ? item.file : item.uri);
								setVideoThumb(item.image_thumb);
							}}
							activeOpacity={0.8}>
							{Platform.OS === 'web' ? (
								<Image source={icons.video_thumb} style={styles.videoIcon} />
							) : (
								<Image source={icons.playIcon} style={styles.imgPlayIcon} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.videoEvidenceDeleteRootContainer}
							onPress={() => handleRemoveEvidence(item.id)}>
							<Image
								source={icons.delete}
								style={styles.videoEvidenceDeleteIcon}
							/>
						</TouchableOpacity>
					</ImageBackground>
				)}
			</View>
		);
	};

	return (
		<ScrollView
			keyboardShouldPersistTaps={'handled'}
			style={{flex: 1}}
			scrollEnabled={urlItemsArray.length > 0 ? true : false}>
			<View
				style={[
					styles.container,
					Platform.OS == 'ios' ? styles.iosShadow : styles.androidShadow
				]}>
				<Text style={styles.textTitle}>{Strings.choose_type_of_evidence}</Text>
				<Text style={styles.textSubTitle}>{Strings.evidence_desc}</Text>
				<View>
					<View style={{opacity: showImageSelectionView ? 0.5 : 1.0}}>
						<ButtonGradient
							onPress={showHideInputUrlView}
							leftIconPath={icons.link}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.evidence_via_link}
							style={{marginTop: verticalScale(20)}}
							paddingVertical={20}
							leftIconStyle={{width: 36, height: 36}}
						/>
					</View>

					<FlatList
						data={urlItemsArray}
						renderItem={renderUrlItem}
						keyExtractor={item => item.id}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						bounces={false}
					/>

					{enterUrlView && urlItemsArray.length < 5 ? (
						<View>
							<Text style={styles.textUrlDesc}>{Strings.url_desc}</Text>
							<InputComponent
								style={styles.marginInput}
								textValue={urlText}
								onChangeText={text => setUrlText(text)}
								placeholder={Strings.url.toUpperCase()}
								placeholderTextColor={Colors.white}
								returnKeyType={'done'}
							/>
							<ButtonGradient
								onPress={checkValidationAndAddURL}
								leftIconPath={icons.plusRound}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.add_more}
								style={styles.btnAddMore}
								paddingVertical={12}
								leftIconStyle={{width: 20, height: 20}}
							/>
						</View>
					) : null}
				</View>

				<View>
					<View
						style={{
							opacity: enterUrlView ? 0.5 : 1.0,
							marginTop: urlItemsArray.length > 0 ? verticalScale(20) : 0
						}}>
						<ButtonGradient
							leftIconPath={icons.gallary}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							onPress={showHideImageVideoView}
							buttonTextcolor={colors.white}
							buttonText={Strings.evidence_photo_video}
							style={{marginTop: verticalScale(10)}}
							paddingVertical={20}
							leftIconStyle={{width: 36, height: 36}}
						/>
					</View>

					<View style={{marginTop: verticalScale(16)}}>
						<FlatList
							data={evidenceItemsArray}
							keyExtractor={item => item.id}
							renderItem={renderEvidenceItem}
							horizontal
							showsHorizontalScrollIndicator={true}
							indicatorStyle={'white'}
						/>
					</View>

					<SelectImageComponentModal
						isVisible={showImageSelectionView}
						setIsVisible={setShowImageSelectionView}
						onPressCamera={() => pickImage('camera')}
						onPressGallery={() => pickImage('gallery')}
					/>
					<FullScreenImageComponent
						isVisible={isShowImageModal}
						url={imageUrl}
						onClose={() => setIsShowImageModal(false)}
					/>
					<VideoPlayerComponent
						isVisible={isShowVideoModal}
						url={videoUrl}
						onClose={() => setIsShowVideoModal(false)}
						poster={videoThumb}
					/>
				</View>
			</View>

			<input
				ref={myRef}
				id="input"
				type="file"
				name="file"
				accept="image/png, image/jpeg, video/*"
				onChange={changeHandler}
				style={{opacity: 0, height: 0, width: 0}}
			/>
			<TokenConfirmationModel
				title={Strings.signature_Request}
				infoDescription={Strings.signature_request_message}
				isTokenConfirmationModelVisible={isTokenConfirmationModelVisible}
				tokenPrice={bet_contract_address} // tokenPrice
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
		</ScrollView>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(20),
		padding: 20,
		borderRadius: 8
	},
	iosShadow: {
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 3
	},
	androidShadow: {
		elevation: 20,
		shadowColor: 'rgba(0,0,0,0.5)'
	},
	textTitle: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		marginBottom: verticalScale(20)
	},
	textSubTitle: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 12,
		fontWeight: '500',
		fontFamily: fonts.type.Inter_Regular
	},
	textUrlDesc: {
		color: colors.white,
		textTransform: 'uppercase',
		fontSize: 12,
		fontWeight: '800',
		fontFamily: fonts.type.Inter_Regular,
		marginTop: verticalScale(20)
	},
	marginInput: {
		marginVertical: verticalScale(20)
	},
	btnAddMore: {
		marginVertical: verticalScale(10),
		width: 150,
		alignSelf: 'center'
	},
	renderEvidenceRootContainer: {
		marginRight: horizontalScale(16),
		marginVertical: horizontalScale(16),
		borderRadius: 8,
		borderColor: colors.white,
		borderWidth: 0.4,
		justifyContent: 'center',
		flex: 1,
		width: width - horizontalScale(80)
	},
	imageEvidenceBg: {
		height: verticalScale(150),
		marginVertical: verticalScale(2)
	},
	imageEvidenceDeleteIcon: {
		height: 24,
		width: 24,
		position: 'absolute',
		top: verticalScale(12),
		right: horizontalScale(12),
		backgroundColor: 'rgba(0,0,0,0.2)'
	},
	videoEvidenceBg: {
		height: verticalScale(150),
		borderRadius: 8,
		marginVertical: verticalScale(2),
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	videoIcon: {
		height: 130,
		width: 130,
		//tintColor: 'rgba(255,255,255,0.9)',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	imgPlayIcon: {
		height: 48,
		width: 48,
		tintColor: 'rgba(255,255,255,0.9)',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	videoEvidenceDeleteRootContainer: {
		position: 'absolute',
		top: verticalScale(12),
		right: horizontalScale(12)
	},
	videoEvidenceDeleteIcon: {
		height: 24,
		width: 24,
		backgroundColor: 'rgba(0,0,0,0.2)'
	}
});

export default EvidenceType;
