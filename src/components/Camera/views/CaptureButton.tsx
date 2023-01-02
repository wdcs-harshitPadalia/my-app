import React, {useCallback, useRef, useState} from 'react';
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewProps
} from 'react-native';
import {cancelAnimation, useSharedValue} from 'react-native-reanimated';
import type {Camera, PhotoFile, VideoFile} from 'react-native-vision-camera';
import icons from '../../../assets/icon';
import useUpdateEffect from '../../CustomHooks/useUpdateEffect';

interface Props extends ViewProps {
	camera: React.RefObject<Camera>;
	onMediaCaptured: (
		media: PhotoFile | VideoFile,
		type: 'photo' | 'video'
	) => void;
	onStartStopRecoding?: (type: string) => void;

	flash: 'off' | 'on';
	recording?: 'off' | 'on';
}

const _CaptureButton: React.FC<Props> = ({
	camera,
	onMediaCaptured,
	flash,
	style,
	onStartStopRecoding,
	recording
}): React.ReactElement => {
	const isRecording = useRef(false);
	const recordingProgress = useSharedValue(0);

	const onStoppedRecording = useCallback(() => {
		isRecording.current = false;
		cancelAnimation(recordingProgress);
		console.log('stopped recording video!');
	}, [recordingProgress]);

	const [isRecordingStopPress, setIsRecordingStopPress] = useState(false);

	const stopRecording = useCallback(async () => {
		try {
			if (camera.current == null) throw new Error('Camera ref is null!');

			console.log('calling stopRecording()...');
			await camera.current.stopRecording();
			console.log('called stopRecording()!');
		} catch (e) {
			console.error('failed to stop recording!', e);
		}
	}, [camera]);

	const startRecording = useCallback(() => {
		try {
			if (camera.current == null) throw new Error('Camera ref is null!');
			console.log('calling startRecording()...');
			camera.current.startRecording({
				flash: flash,
				onRecordingError: error => {
					console.error('Recording failed!', error);
					onStoppedRecording();
				},
				onRecordingFinished: video => {
					console.log(`Recording successfully finished! ${video.path}`);
					onStartStopRecoding('stop');
					onMediaCaptured(video, 'video');
					onStoppedRecording();
				}
			});
			// TODO: wait until startRecording returns to actually find out if the recording has successfully started
			console.log('called startRecording()!');
			isRecording.current = true;
			onStartStopRecoding('start');
		} catch (e) {
			console.error('failed to start recording!', e, 'camera');
		}
	}, [camera, flash, onMediaCaptured, onStoppedRecording]);

	useUpdateEffect(() => {
		if (recording === 'off' && !isRecordingStopPress) {
			console.log('111 useUpdateEffect 1111');
			stopRecording();
		}
	}, [recording]);

	return (
		<View style={style}>
			<TouchableOpacity
				onPress={() => {
					if (!isRecording.current) {
						startRecording();
						setIsRecordingStopPress(false);
					} else {
						setIsRecordingStopPress(true);
						stopRecording();
					}
				}}>
				<Image
					source={
						recording === 'on' ? icons.camera_record : icons.camera_shutter
					}
					style={styles.image}
				/>
			</TouchableOpacity>
		</View>
	);
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
	flex: {
		flex: 1
	},
	image: {
		width: 70,
		height: 70
	}
});
