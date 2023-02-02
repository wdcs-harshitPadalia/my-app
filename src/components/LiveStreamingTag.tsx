/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import fonts from '../theme/fonts';
import colors from '../theme/colors';
import {horizontalScale, moderateScale, verticalScale} from '../theme';

interface LiveStreamingTagProps {
	text: string;
	onPress?: () => void;
	backgroundColor?: string;
}

const LiveStreamingTag: React.FC<any> = (props: LiveStreamingTagProps) => {
	const {onPress, text, backgroundColor} = props;

	const Dot = () => {
		return (
			<View
				style={{
					height: 8,
					width: 8,
					borderRadius: moderateScale(4),
					marginRight: horizontalScale(7),
					backgroundColor: colors.white
				}}
			/>
		);
	};

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: backgroundColor,
					paddingVertical: verticalScale(7.5),
					paddingHorizontal: horizontalScale(6),
					borderRadius: moderateScale(8)
				}}>
				<Dot />
				<Text
					style={{
						fontFamily: fonts.type.Inter_Bold,
						fontSize: 12,
						color: colors.white,
						textAlign: 'center'
					}}>
					{text}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default LiveStreamingTag;
