/* eslint-disable react-native/no-inline-styles */
import {Platform, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';

interface TagViewProps {
	text: string;
	viewStyle?: ViewStyle;
	activeOpacity?: number;
	onPress?: () => void;
	leftIconPath?: string;
}

export default function SelecteableTag(props: TagViewProps) {
	return (
		<TouchableOpacity
			activeOpacity={props.activeOpacity ?? 1}
			style={{flexDirection: 'row', alignItems: 'center'}}
			onPress={props.onPress}>
			<LinearGradient
				style={[
					props.viewStyle,
					{
						alignItems: 'center',
						borderRadius: 20,
						flexDirection: 'row',
						paddingVertical: 0,
						paddingHorizontal: 6
					}
				]}
				useAngle={true}
				angle={gradientColorAngle}
				colors={defaultTheme.primaryGradientColor}>
				{props.leftIconPath && (
					<ExpoFastImage
						style={{
							width: 20,
							height: 20
						}}
						source={props.leftIconPath}
						resizeMode={'contain'}
					/>
				)}
				<Text
					style={{
						fontFamily: Fonts.type.Inter_ExtraBold,
						fontSize: moderateScale(12),
						color: colors.white,
						textAlign: 'center',
						padding: 6,
						marginVertical: verticalScale(2)
					}}>
					{props.text}
				</Text>
				<TouchableOpacity
					hitSlop={{top: 8, left: 8, right: 8, bottom: 8}}
					activeOpacity={1}
					onPress={props.onPress}>
					<ExpoFastImage
						//resizeMode={ExpoFastImage.resizeMode.contain}
						source={icons.close}
						style={{
							height: 10,
							width: 10,
							// marginLeft: verticalScale(8),
							marginRight: verticalScale(4),
							tintColor: colors.white
						}}
					/>
				</TouchableOpacity>
			</LinearGradient>
		</TouchableOpacity>
	);
}
