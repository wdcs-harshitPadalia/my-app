import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface IProps {
	label: string;
	onPress: () => void;
	align?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
	disabled: boolean;
	font?: string;
}

export default ({
	label,
	onPress = () => {},
	align,
	disabled = false,
	font
}: IProps) => {
	const textStyle = {
		textAlign: align,
		opacity: disabled ? 0.4 : 1,
		fontFamily: font,
		color: 'white'
	};

	return (
		<TouchableOpacity
			disabled={disabled}
			style={styles.buttonContainer}
			onPress={() => onPress()}>
			<Text style={textStyle}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		height: 30,
		flex: 0.7,
		justifyContent: 'center'
	}
});
