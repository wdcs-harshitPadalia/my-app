import React from 'react';
import {Platform, Text} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import {LinearGradient} from 'expo-linear-gradient';
import Gradient from 'rgt';

interface GradientTextProps {
	colors: string[];
	[x: string]: any;
}

const GradientText = ({colors, data, ...rest}: GradientTextProps) => {
	return Platform.OS === 'web' ? (
		<Text {...rest} style={[rest.style]}>
			<Gradient dir="bottom-to-top" from={colors[1]} to={colors[0]}>
				{rest.children}
			</Gradient>
		</Text>
	) : (
		// <MaskedView maskElement={<Text {...rest} />}>
		<LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
			<Text {...rest} style={[rest.style, {opacity: 0}]} />
		</LinearGradient>
		// </MaskedView>
	);
};

export default GradientText;
