import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../theme/colors';
import {Fonts, horizontalScale, moderateScale} from '../theme';
import {videoMaximumDuration} from '../constants/api';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import {SAFE_AREA_PADDING} from '../theme/metrics';
let interval;
const VideoTimer = ({isRecording, onStartStopRecoding}: any) => {
	const [currentTime, setCurrentTime] = useState(videoMaximumDuration);

	useUpdateEffect(() => {
		if (!isRecording) {
			clearInterval(interval);
		}
		setCurrentTime(videoMaximumDuration);
	}, [isRecording]);

	useEffect(() => {
		if (isRecording) {
			interval = setInterval(() => {
				const time = currentTime - 1;
				if (time === 0) {
					onStartStopRecoding('stop');
					clearInterval(interval);
				} else {
					setCurrentTime(time);
				}
				console.log(time);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [currentTime, isRecording]);

	return (
		<View style={styles.container}>
			{isRecording && <Text style={styles.bulletText}>{'\u2B24'}</Text>}
			<Text style={styles.estimatedTimeText}>
				{'00:' + (currentTime > 9 ? currentTime : '0' + currentTime)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		position: 'absolute',
		top: SAFE_AREA_PADDING.paddingTop,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center'
	},
	bulletText: {
		color: 'red',
		fontSize: moderateScale(12),
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	estimatedTimeText: {
		fontSize: moderateScale(40),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Bold,
		marginLeft: horizontalScale(6)
	}
});

export default memo(VideoTimer);
