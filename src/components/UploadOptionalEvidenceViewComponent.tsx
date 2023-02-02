import React, {useRef, useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	Image,
	Alert,
	Keyboard
} from 'react-native';
// import {openSettings, PERMISSIONS, request} from 'react-native-permissions';

import icons from '../assets/icon';

import Strings from '../constants/strings';

import {
	createThumbnailFromUrl,
	handleOpenUrlInBrowser,
	showErrorAlert,
	isValidUrl
} from '../constants/utils/Function';
import {validationRegex} from '../constants/utils/Validation';

import colors from '../theme/colors';
import {Colors, Fonts} from '../theme';
import {defaultTheme} from '../theme/defaultTheme';
import {
	gradientColorAngle,
	horizontalScale,
	verticalScale,
	width
} from '../theme/metrics';

import ButtonGradient from './ButtonGradient';
import FullScreenImageComponent from './FullScreenImageComponent';
import InputComponent from './InputComponent';
import SelectImageComponentModal from './SelectImageComponentModal';
import VideoPlayerComponent from './VideoPlayerComponent';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
interface Props {
	handleUploadOptionalEvidence: (evidenceData) => void;
}

const UploadOptionalEvidenceViewComponent: React.FC<Props> = props => {
	const {handleUploadOptionalEvidence} = props;

	const [urlText, setUrlText] = useState('');
	const [urlItemsArray, serUrlItemsArray] = useState<Array<Object>>([]);
	const [evidenceItemsArray, setEvidenceItemsArray] = useState<Array<Object>>(
		[]
	);

	const [totalEvidenceDataArray, setTotalEvidenceDataArray] = useState<
		Array<Object>
	>([]);

	const [showImageSelectionView, setShowImageSelectionView] =
		useState<boolean>(false);

	const [imageUrl, setImageUrl] = useState<string>('');
	const [videoUrl, setVideoUrl] = useState<string>('');
	const [videoThumb, setVideoThumb] = useState<string>('');

	const [isShowImageModal, setIsShowImageModal] = useState<boolean>(false);
	const [isShowVideoModal, setIsShowVideoModal] = useState<boolean>(false);

	const myRef = useRef();

	useUpdateEffect(() => {
		handleUploadOptionalEvidence(totalEvidenceDataArray);
	}, [totalEvidenceDataArray]);

	const showHideImageVideoView = () => {
		if (evidenceItemsArray.length < 5) {
			if (Platform.OS === 'web') {
				myRef.current.click(function () {
					changeHandler();
				});
			} else {
				setShowImageSelectionView(!showImageSelectionView);
			}
		} else {
			showErrorAlert('', Strings.reach_max_limit);
		}
	};

	const checkValidationAndAddURL = () => {
		if (validationRegex.url.test(urlText) && isValidUrl(urlText)) {
			var urlItemObj = {
				id: Date.now(),
				url: urlText,
				type: 'url'
			};

			serUrlItemsArray([...urlItemsArray, urlItemObj]);
			setTotalEvidenceDataArray([...totalEvidenceDataArray, urlItemObj]);

			Keyboard.dismiss();
			setUrlText('');
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
				uri: responseData,
				file: await fileToBase64(responseData),
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
					setTotalEvidenceDataArray([
						...totalEvidenceDataArray,
						evidenceItemObj
					]);
				}
			} else {
				setEvidenceItemsArray([...evidenceItemsArray, evidenceItemObj]);
				setTotalEvidenceDataArray([...totalEvidenceDataArray, evidenceItemObj]);
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

	// const showGivePermissonAlert = () => {
	// 	Alert.alert('Alert', Strings.cameraAccess, [
	// 		{
	// 			text: 'Open Settings',
	// 			onPress: () => openSettings()
	// 		},
	// 		{
	// 			text: 'Cancel',
	// 			onPress: () => console.log('Cancel Pressed')
	// 		}
	// 	]);
	// };

	// const handleResponse = response => {
	// 	setShowImageSelectionView(false);

	// 	if (response.didCancel) {
	// 		console.log('ImagePicker didCancel');
	// 	} else if (response.error) {
	// 		console.log('ImagePicker Error :: ', response.error);
	// 	} else {
	// 		console.log('response.assets[0] >> ', response?.assets[0]);

	// 		checkValidationAndAddEvidence(response?.assets[0]);
	// 	}
	// };

	// const checkValidationAndAddEvidence = async responseData => {
	// 	const {type, fileName, fileSize, duration, uri} = responseData;

	// 	let imageThumbPath;

	// 	if (type.includes('video')) {
	// 		imageThumbPath = await createThumbnailFromUrl(uri, fileName);
	// 		// console.log('createThumbnailFromUrl :: imageThumbPath :: ', imageThumbPath);
	// 	}

	// 	if (evidenceItemsArray.length < 5) {
	// 		var evidenceItemObj = {
	// 			id: Date.now(),
	// 			name: type.includes('video')
	// 				? Platform.OS === 'android'
	// 					? fileName + '.' + type.split('/')[1]
	// 					: fileName
	// 				: fileName,
	// 			type: type,
	// 			uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
	// 			image_thumb: type.includes('video')
	// 				? Platform.OS === 'android'
	// 					? imageThumbPath
	// 					: imageThumbPath.replace('file://', '')
	// 				: ''
	// 		};

	// 		console.log('====================================');
	// 		console.log('evidenceItemObj :: ', evidenceItemObj);
	// 		console.log('====================================');

	// 		if (type === 'video/mp4') {
	// 			if (parseInt(duration) > 30) {
	// 				Alert.alert(Strings.upload_video_30s);
	// 			} else if (fileSize / 1024 ** 2 > 30) {
	// 				Alert.alert(Strings.upload_video_30mb);
	// 			} else {
	// 				setEvidenceItemsArray([...evidenceItemsArray, evidenceItemObj]);
	// 				setTotalEvidenceDataArray([
	// 					...totalEvidenceDataArray,
	// 					evidenceItemObj
	// 				]);
	// 			}
	// 		} else {
	// 			setEvidenceItemsArray([...evidenceItemsArray, evidenceItemObj]);
	// 			setTotalEvidenceDataArray([...totalEvidenceDataArray, evidenceItemObj]);
	// 		}
	// 	}
	// };

	// const handleRemoveUrl = itemId => {
	// 	var index = urlItemsArray.findIndex(function (o) {
	// 		return o.id === itemId;
	// 	});
	// 	if (index !== -1) {
	// 		urlItemsArray.splice(index, 1);
	// 		serUrlItemsArray([...urlItemsArray]);
	// 	}
	// };

	const handleRemoveEvidence = itemId => {
		var index = evidenceItemsArray.findIndex(function (o) {
			return o.id === itemId;
		});
		if (index !== -1) {
			evidenceItemsArray.splice(index, 1);
			setEvidenceItemsArray([...evidenceItemsArray]);
		}

		var evidenceRemoveIndex = totalEvidenceDataArray.findIndex(function (o) {
			return o.id === itemId;
		});
		if (evidenceRemoveIndex !== -1) {
			totalEvidenceDataArray.splice(evidenceRemoveIndex, 1);
			setTotalEvidenceDataArray([...totalEvidenceDataArray]);
		}
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
				// rightIconPath={icons.delete}
				// rightIconStyle={{width: 30, height: 30}}
				// isShowRightIcon={true}
				// rightIconPress={() => handleRemoveUrl(item.id)}
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
		<View style={[styles.container, styles.shadow]}>
			<Text style={styles.textTitle}>{Strings.optional_evidence}</Text>
			<Text style={styles.textSubTitle}>{Strings.optional_evidence_desc}</Text>
			<View>
				<FlatList
					data={urlItemsArray}
					renderItem={renderUrlItem}
					keyExtractor={item => item.id}
					scrollEnabled={false}
					showsVerticalScrollIndicator={false}
					bounces={false}
				/>

				{urlItemsArray.length < 5 ? (
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
							leftIconStyle={styles.plusRoundStyle}
						/>
						<Text style={[styles.textUrlDesc, styles.txtAndOr]}>
							{Strings.str_and_or}
						</Text>
					</View>
				) : null}
			</View>

			<ButtonGradient
				leftIconPath={icons.gallary}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				onPress={showHideImageVideoView}
				buttonTextcolor={colors.white}
				buttonText={Strings.verify_photo_video}
				style={{marginTop: verticalScale(10)}}
				paddingVertical={20}
				leftIconStyle={styles.galleryIconStyle}
			/>

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

			<input
				ref={myRef}
				id="input"
				type="file"
				name="file"
				accept="image/png, image/jpeg, video/*"
				onChange={changeHandler}
				style={{opacity: 0, height: 0, width: 0}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		padding: 20,
		borderRadius: 8
	},
	shadow: {
		// for ios
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 3,
		// for android
		elevation: 20
	},
	textTitle: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '400',
		fontFamily: Fonts.type.Krona_Regular,
		marginBottom: verticalScale(20)
	},
	textSubTitle: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 12,
		fontWeight: '500',
		fontFamily: Fonts.type.Inter_Regular
	},
	textUrlDesc: {
		color: colors.white,
		textTransform: 'uppercase',
		fontSize: 12,
		fontWeight: '800',
		fontFamily: Fonts.type.Inter_Regular,
		marginTop: verticalScale(20)
	},
	marginInput: {
		marginVertical: verticalScale(20)
	},
	btnAddMore: {
		width: 150,
		alignSelf: 'center'
	},
	txtAndOr: {
		marginVertical: verticalScale(10),
		alignSelf: 'center'
	},
	plusRoundStyle: {width: 20, height: 20},
	galleryIconStyle: {width: 36, height: 36},
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

export default UploadOptionalEvidenceViewComponent;
