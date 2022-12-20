import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '../theme/colors';

import {getTimeLeft} from '../constants/utils/Function';
import fonts from '../theme/fonts';

const DisputeTimerView = ({voteEndTime}: any) => {
	const [currentTime, setCurrentTime] = useState(voteEndTime);

	useEffect(() => {
		const interval = setInterval(() => {
			const timeLeft = getTimeLeft(voteEndTime, true);
			setCurrentTime(timeLeft);
		}, 1000);
		return () => clearInterval(interval);
	}, [voteEndTime]);

	return <Text style={styles.estimatedTimeText}>{currentTime}</Text>;
};

const styles = StyleSheet.create({
	estimatedTimeText: {
		color: colors.white,
		fontSize: 24,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		textAlign: 'center',
		textTransform: 'uppercase'
	}
});

export default memo(DisputeTimerView);
