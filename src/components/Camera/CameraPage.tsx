import * as React from 'react';
import {useRef, useState, useMemo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
	PinchGestureHandler,
	PinchGestureHandlerGestureEvent,
	TapGestureHandler
} from 'react-native-gesture-handler';
import {
	CameraDeviceFormat,
	CameraRuntimeError,
	PhotoFile,
	sortFormats,
	useCameraDevices,
	VideoFile,
	Camera,
	frameRateIncluded
} from 'react-native-vision-camera';
import Reanimated, {
	Extrapolate,
	interpolate,
	useAnimatedGestureHandler,
	useAnimatedProps,
	useSharedValue
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {useIsForeground} from '../CustomHooks/useIsForeground';
import {CaptureButton} from './views/CaptureButton';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/core';
import {Image} from 'react-native-elements';
import icons from '../../assets/icon';
import VideoTimer from '../VideoTimer';
import colors from '../../theme/colors';
import {
	CONTENT_SPACING,
	MAX_ZOOM_FACTOR,
	SAFE_AREA_PADDING
} from '../../theme/metrics';
import ScreenNames from '../../navigation/screenNames';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
	zoom: true
});

const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;

type Props = NativeStackScreenProps<'CameraPage'>;
export function CameraPage({navigation}: Props): React.ReactElement {
	const camera = useRef<Camera>(null);
	const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
	const zoom = useSharedValue(0);

	// check if camera page is active
	const isFocussed = useIsFocused();
	const isForeground = useIsForeground();
	const isActive = isFocussed && isForeground;

	const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
		'back'
	);
	const [enableHdr, setEnableHdr] = useState(false);
	const [flash, setFlash] = useState<'off' | 'on'>('off');
	const [enableNightMode, setEnableNightMode] = useState(false);

	const [isRecording, setIsRecording] = useState(false);

	// camera format settings
	const devices = useCameraDevices();
	const device = devices[cameraPosition];
	const formats = useMemo<CameraDeviceFormat[]>(() => {
		if (device?.formats == null) return [];
		return device.formats.sort(sortFormats);
	}, [device?.formats]);

	//#region Memos
	const fps = useMemo(() => {
		return 30;
	}, [device?.supportsLowLightBoost, enableHdr, enableNightMode, formats]);

	const supportsCameraFlipping = useMemo(
		() => devices.back != null && devices.front != null,
		[devices.back, devices.front]
	);
	const supportsFlash = device?.hasFlash ?? false;

	const canToggleNightMode = enableNightMode
		? true // it's enabled so you have to be able to turn it off again
		: (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS
	//#endregion

	const format = useMemo(() => {
		let result = formats;
		if (enableHdr) {
			// We only filter by HDR capable formats if HDR is set to true.
			// Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
			result = result.filter(f => f.supportsVideoHDR || f.supportsPhotoHDR);
		}

		// find the first format that includes the given FPS
		return result.find(f =>
			f.frameRateRanges.some(r => frameRateIncluded(r, fps))
		);
	}, [formats, fps, enableHdr]);

	//#region Animated Zoom
	// This just maps the zoom factor to a percentage value.
	// so e.g. for [min, neutr., max] values [1, 2, 128] this would result in [0, 0.0081, 1]
	const minZoom = device?.minZoom ?? 1;
	const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

	const cameraAnimatedProps = useAnimatedProps(() => {
		const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
		return {
			zoom: z
		};
	}, [maxZoom, minZoom, zoom]);
	//#endregion

	// Camera callbacks
	const onError = useCallback((error: CameraRuntimeError) => {
		console.error(error);
	}, []);

	const onInitialized = useCallback(() => {
		console.log('Camera initialized!');
	}, []);

	const onMediaCaptured = useCallback(
		(media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
			console.log(`Media captured! ${JSON.stringify(media)}`);
			navigation.navigate(ScreenNames.MediaPage, {
				path: media.path,
				type: type,
				from: 'camera'
			});
		},
		[navigation]
	);

	const onStartStopRecoding = async (type: string) => {
		if (type === 'start') {
			setIsRecording(true);
		} else {
			setIsRecording(false);
		}
	};

	const onFlipCameraPressed = useCallback(() => {
		setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
	}, []);
	const onFlashPressed = useCallback(() => {
		setFlash(f => (f === 'off' ? 'on' : 'off'));
	}, []);
	//#endregion

	//#region Tap Gesture
	const onDoubleTap = useCallback(() => {
		onFlipCameraPressed();
	}, [onFlipCameraPressed]);
	//#endregion

	//#region Effects
	const neutralZoom = device?.neutralZoom ?? 1;
	useEffect(() => {
		// Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
		zoom.value = neutralZoom;
	}, [neutralZoom, zoom]);

	useEffect(() => {
		Camera.getMicrophonePermissionStatus().then(status =>
			setHasMicrophonePermission(status === 'authorized')
		);
	}, []);
	//#endregion

	//#region Pinch to Zoom Gesture
	// The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
	// function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
	const onPinchGesture = useAnimatedGestureHandler<
		PinchGestureHandlerGestureEvent,
		{startZoom?: number}
	>({
		onStart: (_, context) => {
			context.startZoom = zoom.value;
		},
		onActive: (event, context) => {
			// we're trying to map the scale gesture to a linear zoom here
			const startZoom = context.startZoom ?? 0;
			const scale = interpolate(
				event.scale,
				[1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
				[-1, 0, 1],
				Extrapolate.CLAMP
			);
			zoom.value = interpolate(
				scale,
				[-1, 0, 1],
				[minZoom, startZoom, maxZoom],
				Extrapolate.CLAMP
			);
		}
	});
	//#endregion

	if (device != null && format != null) {
		console.log(
			`Re-rendering camera page with ${
				isActive ? 'active' : 'inactive'
			} camera. ` +
				`Device: "${device.name}" (${format.photoWidth}x${format.photoHeight} @ ${fps}fps)`
		);
	} else {
		console.log('re-rendering camera page without active camera');
	}

	return (
		<View style={styles.container}>
			{device != null && (
				<PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
					<Reanimated.View style={StyleSheet.absoluteFill}>
						<TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
							<ReanimatedCamera
								ref={camera}
								style={StyleSheet.absoluteFill}
								device={device}
								format={format}
								fps={fps}
								hdr={enableHdr}
								lowLightBoost={device.supportsLowLightBoost && enableNightMode}
								isActive={isActive}
								onInitialized={onInitialized}
								onError={onError}
								enableZoomGesture={false}
								animatedProps={cameraAnimatedProps}
								photo={false}
								video={true}
								audio={hasMicrophonePermission}
								// frameProcessor={
								// 	device.supportsParallelVideoProcessing
								// 		? frameProcessor
								// 		: undefined
								// }
								orientation="portrait"
								// frameProcessorFps={1}
								// onFrameProcessorPerformanceSuggestionAvailable={
								// 	onFrameProcessorSuggestionAvailable
								// }
							/>
						</TapGestureHandler>
					</Reanimated.View>
				</PinchGestureHandler>
			)}

			<CaptureButton
				style={styles.captureButton}
				camera={camera}
				onMediaCaptured={onMediaCaptured}
				onStartStopRecoding={onStartStopRecoding}
				flash={supportsFlash ? flash : 'off'}
				recording={isRecording ? 'on' : 'off'}
			/>

			<View style={styles.rightButtonRow}>
				{supportsCameraFlipping && (
					<TouchableOpacity style={styles.button} onPress={onFlipCameraPressed}>
						<Image source={icons.flip_camera_android} style={styles.icon} />
					</TouchableOpacity>
				)}
				{supportsFlash && (
					<TouchableOpacity style={styles.button} onPress={onFlashPressed}>
						<Image
							source={flash === 'on' ? icons.flash_on : icons.flash_off}
							style={styles.icon}
						/>
					</TouchableOpacity>
				)}

				{canToggleNightMode && (
					<TouchableOpacity
						style={styles.button}
						onPress={() => setEnableNightMode(!enableNightMode)}>
						<Image source={icons.night_mode} style={styles.icon} />
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.leftButtonRow}>
				{supportsCameraFlipping && (
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							navigation.goBack();
						}}>
						<Image source={icons.close} style={styles.closeIcon} />
					</TouchableOpacity>
				)}
			</View>
			<VideoTimer
				isRecording={isRecording}
				setIsRecording={setIsRecording}
				onStartStopRecoding={onStartStopRecoding}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	captureButton: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: 0,
		backgroundColor: colors.blackTransparent05,
		width: '100%',
		paddingVertical: SAFE_AREA_PADDING.paddingBottom,
		alignItems: 'center'
	},
	button: {
		marginBottom: CONTENT_SPACING,
		width: BUTTON_SIZE,
		height: BUTTON_SIZE,
		justifyContent: 'center',
		alignItems: 'center'
	},
	rightButtonRow: {
		position: 'absolute',
		right: SAFE_AREA_PADDING.paddingRight,
		top: SAFE_AREA_PADDING.paddingTop
	},
	leftButtonRow: {
		position: 'absolute',
		left: SAFE_AREA_PADDING.paddingLeft,
		top: SAFE_AREA_PADDING.paddingTop
	},
	closeIcon: {
		width: 20,
		height: 20
	},
	icon: {
		width: 25,
		height: 25
	}
});
