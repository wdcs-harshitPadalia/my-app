/* eslint-disable react-native/no-inline-styles */
import {Text, View, ViewStyle} from 'react-native';
import React from 'react';
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import {horizontalScale, moderateScale, verticalScale} from '../theme';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import {defaultTheme} from '../theme/defaultTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {gradientColorAngle} from '../theme/metrics';

interface TagViewProps {
	backGroundColor: string;
	text: string;
	withLeftDotView?: Boolean;
	tagLeftImagePath?: String;
	fontColor?: string;
	viewStyle?: ViewStyle;
	fontSize?: number;
	fontFamily?: string;
	gradientColors?: string[];
	enabled?: boolean;
	isSelected?: boolean;
	onPress?: () => void;
	activeOpacity?: number;
	borderRadius?: number;
	paddingVertical?: number;
}

export default function TagView(props: TagViewProps) {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			activeOpacity={props.activeOpacity ?? 1}
			disabled={props.enabled ? false : true}
			style={{flexDirection: 'row', alignItems: 'center'}}>
			<LinearGradient
				useAngle={true}
				angle={gradientColorAngle}
				colors={
					props.isSelected
						? defaultTheme.primaryGradientColor
						: props.gradientColors ?? ['transparent', 'transparent'] ??
						  props.gradientColors ?? ['transparent', 'transparent']
				}
				style={[
					{
						backgroundColor: props.backGroundColor,
						alignItems: 'center',
						borderRadius: moderateScale(props?.borderRadius ?? 8),
						flexDirection: 'row',
						paddingVertical: verticalScale(props?.paddingVertical ?? 7.5),
						paddingHorizontal: horizontalScale(6)
					},
					props.viewStyle
				]}>
				{props.withLeftDotView && (
					<View
						style={{
							height: 8,
							width: 8,
							borderRadius: moderateScale(4),
							marginRight: horizontalScale(7),
							backgroundColor: colors.white
						}}
					/>
				)}
				{props.children}
				{props.tagLeftImagePath && (
					<ExpoFastImage
						style={{
							height: 8,
							width: 8,
							borderRadius: moderateScale(4),
							marginRight: horizontalScale(7)
						}}
						source={props.tagLeftImagePath}
					/>
				)}
				<Text
					style={{
						fontFamily: props.fontFamily ?? fonts.type.Inter_Bold,
						fontSize: moderateScale(props.fontSize ? props.fontSize : 9),
						color: props.fontColor ? props.fontColor : colors.white,
						textAlign: 'center'
						//padding: 6,
					}}>
					{props.text}
				</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
}
