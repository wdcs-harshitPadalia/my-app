import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {verticalScale} from '../theme';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

interface headerProps {
	title: string;
	fontSize?: number;
}

export const HeaderView = (props: headerProps) => {
	return (
		<Text style={styles({fontSize: props.fontSize}).headerText}>
			{props.title}
		</Text>
	);
};

const styles = (props = {fontSize: ''}) =>
	StyleSheet.create({
		headerText: {
			fontFamily: fonts.type.Krona_Regular,
			fontWeight: '400',
			color: colors.white,
			fontSize: props.fontSize ? props.fontSize : 30,
			textAlign: 'center',
			marginVertical: verticalScale(16)
		}
	});
