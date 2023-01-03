import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Alert,
	Platform,
	NativeSyntheticEvent,
	ImageLoadEventData
} from 'react-native';
// import Video, {LoadError, OnLoadData} from 'react-native-video';
import {Video} from 'expo-av';
import {useIsForeground} from '../CustomHooks/useIsForeground';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/core';
import icons from '../../assets/icon';
import ButtonGradient from '../ButtonGradient';
import Strings from '../../constants/strings';
import {colors} from 'react-native-elements';
import {defaultTheme} from '../../theme/defaultTheme';
import {
	gradientColorAngle,
	height,
	horizontalScale,
	SAFE_AREA_PADDING,
	screenHeight,
	verticalScale
} from '../../theme/metrics';
import ScreenNames from '../../navigation/screenNames';
// import { LoadError } from 'react-native-video';

const isVideoOnLoadEvent = (
	event: OnLoadData | NativeSyntheticEvent<ImageLoadEventData>
): event is OnLoadData => 'duration' in event && 'naturalSize' in event;

type Props = NativeStackScreenProps<'MediaPage'>;
export function MediaPage({navigation, route}: Props): React.ReactElement {
	const {path, type, from} = route.params;
	const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
	const [videoData, setVideoData] = useState({});
	const isForeground = useIsForeground();
	const isScreenFocused = useIsFocused();
	let isVideoPaused = !isForeground || !isScreenFocused;

	const [isVideoPlay, setIsVideoPlay] = useState(isVideoPaused);

	const [videoDuration, setVideoDuration] = useState();

	const onMediaLoad = useCallback(
		(event: OnLoadData | NativeSyntheticEvent<ImageLoadEventData>) => {
			if (isVideoOnLoadEvent(event)) {
				setVideoDuration(event.duration);
				console.log('Video Data.', event);
				console.log(
					`Video loaded. Size: ${event.naturalSize.width}x${event.naturalSize.height} (${event.naturalSize.orientation}, ${event.duration} seconds)`
				);
			}
		},
		[]
	);
	const onMediaLoadEnd = useCallback(() => {
		console.log('media has loaded.');
		setHasMediaLoaded(true);
	}, []);
	const onMediaLoadError = useCallback((error: LoadError) => {
		console.log(`failed to load media: ${JSON.stringify(error)}`);
	}, []);

	useEffect(() => {
		callVideoMetaData();
	}, [path]);

	const screenStyle = useMemo(
		() => ({opacity: hasMediaLoaded ? 0 : 0}),
		[hasMediaLoaded]
	);

	const onTap = () => {
		setIsVideoPlay(!isVideoPlay);
	};

	const callVideoMetaData = async () => {
		const videoMetaData = await getVideoMetaData(event.target.files[0]);
		setVideoData(videoMetaData);
	};

	const getVideoMetaData = () =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const media = new Audio(reader.result);
				media.onloadedmetadata = () => resolve(media);
			};
			reader.readAsDataURL(path);
			reader.onerror = error => reject(error);
		});

	return (
		<>
			{videoData && (
				<>
					<video
						autoPlay={true}
						loop={true}
						src={videoData.src}
						width="100%"
						style={{
							backgroundColor: defaultTheme.backGroundColor,
							paddingBottom: 70
						}}
						height={screenHeight}
						controls></video>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={navigation.goBack}>
						<Image source={icons.back} style={styles.closeIcon} />
					</TouchableOpacity>
					<ButtonGradient
						style={styles.button}
						buttonText={Strings.continue}
						buttonTextcolor={colors.white}
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						onPress={() => {
							if (videoData?.duration <= 3 || videoData?.duration > 15) {
								alert(Strings.upload_video_15s)
							} else {
								setIsVideoPlay(true);
								navigation.navigate(ScreenNames.VideoCreationScreen, {
									path: path,
									type: type,
									from: from
								});
							}
						}}
					/>
				</>
			)}

			{/* <ButtonGradient
				style={styles.button}
				buttonText={Strings.continue}
				buttonTextcolor={colors.white}
				colorArray={defaultTheme.secondaryGradientColor}
				angle={gradientColorAngle}
				onPress={() => {
					if (videoDuration <= 3) {
						Alert.alert('Alert', Strings.upload_video_15s, [
							{
								text: Strings.ok,
								onPress: () => console.log('Cancel Pressed')
							}
						]);
					} else {
						setIsVideoPlay(true);
						navigation.navigate(ScreenNames.VideoCreationScreen, {
							path: path,
							type: type,
							from: from
						});
					}
				}}
			/> */}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		width: '100%'
	},
	closeButton: {
		position: 'absolute',
		top: SAFE_AREA_PADDING.paddingTop,
		left: SAFE_AREA_PADDING.paddingLeft,
		width: 50,
		height: 50
	},
	saveButton: {
		position: 'absolute',
		bottom: SAFE_AREA_PADDING.paddingBottom,
		left: SAFE_AREA_PADDING.paddingLeft,
		width: 40,
		height: 40
	},
	icon: {
		textShadowColor: 'black',
		textShadowOffset: {
			height: 0,
			width: 0
		},
		textShadowRadius: 1
	},
	closeIcon: {
		width: 20,
		height: 20
	},
	button: {
		marginHorizontal: horizontalScale(20),
		height: 60,
		borderRadius: 8,
		justifyContent: 'center',
		position: 'absolute',
		bottom: SAFE_AREA_PADDING.paddingBottom,
		width: '90%'
	}
});
