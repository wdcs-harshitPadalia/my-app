import React, {useCallback, useMemo, useState} from 'react';
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
import Video, {LoadError, OnLoadData} from 'react-native-video';
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
	horizontalScale,
	SAFE_AREA_PADDING
} from '../../theme/metrics';
import ScreenNames from '../../navigation/screenNames';

const isVideoOnLoadEvent = (
	event: OnLoadData | NativeSyntheticEvent<ImageLoadEventData>
): event is OnLoadData => 'duration' in event && 'naturalSize' in event;

type Props = NativeStackScreenProps<'MediaPage'>;
export function MediaPage({navigation, route}: Props): React.ReactElement {
	const {path, type, from} = route.params;
	const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
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

	const source = useMemo(
		() => ({uri: Platform.OS === 'android' ? `${path}` : `file://${path}`}),
		[path]
	);

	const screenStyle = useMemo(
		() => ({opacity: hasMediaLoaded ? 1 : 0}),
		[hasMediaLoaded]
	);

	const onTap = () => {
		setIsVideoPlay(!isVideoPlay);
	};

	return (
		<View style={[styles.container, screenStyle]}>
			<TouchableOpacity
				style={StyleSheet.absoluteFill}
				onPress={onTap}
				activeOpacity={1}>
				<Video
					source={source}
					style={StyleSheet.absoluteFill}
					paused={isVideoPlay}
					resizeMode="cover"
					posterResizeMode="cover"
					allowsExternalPlayback={false}
					automaticallyWaitsToMinimizeStalling={false}
					disableFocus={true}
					repeat={true}
					useTextureView={false}
					controls={false}
					playWhenInactive={true}
					ignoreSilentSwitch="ignore"
					onReadyForDisplay={onMediaLoadEnd}
					onLoad={onMediaLoad}
					onError={onMediaLoadError}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.closeButton} onPress={navigation.goBack}>
				<Image source={icons.back} style={styles.closeIcon} />
			</TouchableOpacity>
			<ButtonGradient
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
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	closeButton: {
		position: 'absolute',
		top: SAFE_AREA_PADDING.paddingTop,
		left: SAFE_AREA_PADDING.paddingLeft,
		width: 40,
		height: 40
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
		bottom: SAFE_AREA_PADDING.paddingBottom
	}
});
