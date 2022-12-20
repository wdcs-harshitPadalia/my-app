/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ExpoFastImage from 'expo-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
// import HTMLView from 'react-native-htmlview';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import {height, moderateFontScale, verticalScale} from '../theme/metrics';

export interface FaqData {
	id?: string;
	question?: string;
	answer?: string;
	position?: number;
}

const QuestionComponent: React.FC<FaqData> = props => {
	const {question, answer} = props;

	const [isCollapsed, setIsCollapsed] = useState(true);

	return (
		<>
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					setIsCollapsed(!isCollapsed);
				}}>
				<LinearGradient
					style={[styles.buttonContainerStyle]}
					colors={['black', 'black']}
					start={{x: 0, y: 0}}
					end={{x: 1, y: 0}}>
					<Text style={styles.buttonTitleText}>{question}</Text>
					<ExpoFastImage
						source={
							!isCollapsed ? icons.arrow_up_white : icons.arrow_down_white
						}
						style={styles.img}
					/>
				</LinearGradient>
			</TouchableOpacity>
			<Collapsible
				duration={400}
				easing="easeInOutCubic"
				align="center"
				collapsed={isCollapsed}>
				<ScrollView
					style={{marginBottom: 16, marginTop: 11, maxHeight: height * 0.3}}>
					{/* <HTMLView value={answer} stylesheet={webStyle} /> */}
				</ScrollView>
			</Collapsible>
		</>
	);
};

export default QuestionComponent;

const styles = StyleSheet.create({
	img: {
		height: 24,
		width: 24
	},
	buttonTitleText: {
		color: colors.white,
		textAlign: 'left',
		flex: 1,
		fontSize: moderateFontScale(12),
		fontFamily: fonts.type.Inter_Bold
	},
	buttonContainerStyle: {
		borderRadius: verticalScale(8),
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: verticalScale(16)
	}
});

const webStyle = StyleSheet.create({
	p: {
		color: colors.white,
		fontSize: moderateFontScale(14),
		backgroundColor: 'transparent',
		fontFamily: fonts.type.Inter_Medium,
		opacity: 0.7,
		flexWrap: 'wrap'
	}
});
