import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import {ItemTemplateProps} from '../types/Types';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../../theme';
import colors from '../../../../theme/colors';

export const CountryButton = ({
	item,
	name,
	style,
	...rest
}: ItemTemplateProps) => (
	<TouchableOpacity style={[styles.countryButton]} {...rest}>
		<Text
			style={[
				{
					flex: 0.1
				},
				style?.flag
			]}>
			{item?.flag}
		</Text>
		<Text
			numberOfLines={1}
			style={[
				{
					flex: 1,
					color: colors.black,
					fontSize: moderateScale(14),
					fontFamily: Fonts.type.Inter_Medium
				},
				style?.countryName
			]}>
			{name}
		</Text>
	</TouchableOpacity>
);

type StyleKeys = 'countryButton';

const styles: {[key in StyleKeys]: ViewStyle} = {
	countryButton: {
		paddingVertical: 10,
		backgroundColor: '#f5f5f5',
		width: '100%',
		height: 50,
		paddingHorizontal: 25,
		alignItems: 'center',
		marginVertical: 2,
		flexDirection: 'row',
		borderRadius: 10
	}
};
