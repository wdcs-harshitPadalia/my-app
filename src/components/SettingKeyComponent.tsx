/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../theme/colors';
import {horizontalScale, verticalScale} from '../theme/metrics';
import SwichView from './SwichView';

export interface NotificationData {
	title?: string;
	keyValue?: string;
	toggleValue?: boolean;
	setNotificationValue?: (key: string, toggleValue: boolean) => void;
	isTopRadius?: boolean;
	isBottomRadius?: boolean;
}

const SettingKeyComponent: React.FC<NotificationData> = props => {
	const {
		title,
		keyValue,
		toggleValue,
		setNotificationValue,
		isTopRadius,
		isBottomRadius
	} = props;

	const [isNotificationEnabled, setIsNotificationEnabled] =
		useState(toggleValue);

	function handleswitch(key: string) {
		setIsNotificationEnabled(!isNotificationEnabled);
		setNotificationValue(key, !isNotificationEnabled);
	}
	return (
		<View style={styles.viewContain(isTopRadius, isBottomRadius)}>
			<SwichView
				toggleSwitch={() => handleswitch(keyValue)}
				title={title?.toUpperCase()}
				isEnabled={isNotificationEnabled}
			/>
		</View>
	);
};

export default SettingKeyComponent;

const styles = StyleSheet.create({
	viewContain: (
		isTopborderVisible: boolean,
		isBottomborderVisible: boolean
	) => ({
		paddingVertical: verticalScale(14),
		paddingHorizontal: horizontalScale(8),
		backgroundColor: colors.black,
		borderTopLeftRadius: isTopborderVisible
			? verticalScale(8)
			: verticalScale(0),
		borderTopRightRadius: isTopborderVisible
			? verticalScale(8)
			: verticalScale(0),
		borderBottomLeftRadius: isBottomborderVisible
			? verticalScale(8)
			: verticalScale(0),
		borderBottomRightRadius: isBottomborderVisible
			? verticalScale(8)
			: verticalScale(0)
	})
});
