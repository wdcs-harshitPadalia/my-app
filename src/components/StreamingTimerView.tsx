import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Fonts, horizontalScale} from '../theme';
import colors from '../theme/colors';
import TagView from './TagView';

import Strings from '../constants/strings';
import {moderateFontScale} from '../theme/metrics';
import moment from 'moment';
import {
	dateTimeLiveStreamingConvert,
	dateTimeStreamingConvert
} from '../constants/utils/Function';

const StreamingTimerView = ({betInfo}: any) => {
	const [currentTime, setCurrentTime] = useState(moment().format('x'));
	let duration = moment(parseFloat(betInfo.end_date_time)).fromNow(true);

	useEffect(() => {
		const interval = setInterval(() => {
			if (moment().format('x') >= betInfo.start_date_time) {
				setCurrentTime(moment().format('x'));
				if (moment().format('x') >= betInfo.end_date_time) {
					clearInterval(interval);
				}
				//betInfo.end_date_time
				//clearInterval(interval);
			}
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	if (currentTime >= betInfo.end_date_time) {
		return (
			<Text style={styles.estimatedTimeText}>
				{'streaming has been ended!'.toUpperCase().toUpperCase()}
			</Text>
		);
	} else {
		return (
			<>
				{currentTime < betInfo.start_date_time ? (
					<Text style={styles.estimatedTimeText}>
						{dateTimeLiveStreamingConvert(parseFloat(betInfo?.start_date_time)).toUpperCase()}
					</Text>
				) : (
					<View style={styles.viewTagTIme}>
						<TagView
							backGroundColor={colors.redTag}
							text={Strings.STREAMING}
							withLeftDotView={true}
							viewStyle={{marginRight: horizontalScale(8)}}
							// leftImagePath={props.tagLeftImagePath}
						/>
						<Text style={styles.estimatedTimeText}>
							{/* {dateTimeConvert(parseFloat(item.gmt_timestamp)).toUpperCase()} */}
							{`estimated end: ${duration}`.toUpperCase()}
						</Text>
					</View>
				)}
			</>
		);
	}
};

const styles = StyleSheet.create({
	viewTagTIme: {flexDirection: 'row', alignItems: 'center'},
	estimatedTimeText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.textTitle
		//opacity: 0.7,
		//marginLeft: horizontalScale(8),
	}
});

export default memo(StreamingTimerView);
