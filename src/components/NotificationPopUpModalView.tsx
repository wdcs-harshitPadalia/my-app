import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import {verticalScale} from '../theme/metrics';
import NotificationPopUpComponent from './NotificationPopUpComponent';

interface ModalProps {
	isVisible: boolean;
	imgPath?: any;
	title?: string;
	buttonTitle?: string;
	onPressButton?: () => void;
	description1?: string;
	description2?: string;
	onBtnSkipPressed?: () => void;
	highlightedDescription?: string;
	isDescriptionGradient?: boolean;
	isTitleGradient?: boolean;
	descriptionHighlightColor?: string;
}

const NotificationPopUpModalView: React.FC<ModalProps> = props => {
	const {
		isVisible,
		imgPath,
		title,
		buttonTitle,
		onPressButton,
		description1,
		description2,
		onBtnSkipPressed,
		highlightedDescription,
		isDescriptionGradient,
		isTitleGradient,
		descriptionHighlightColor
	} = props;
	return (
		<>
			{isVisible && (
				<View style={styles.bgView}>
					<View style={styles.centeredView}>
						<TouchableOpacity
							style={styles.skipView}
							onPress={onBtnSkipPressed}>
							<Text style={styles.skipText}>{Strings.skip}</Text>
						</TouchableOpacity>
						<NotificationPopUpComponent
							title={title}
							description1={description1}
							description2={description2}
							buttonTitle={buttonTitle}
							isTitleGradient={isTitleGradient}
							imgPath={imgPath}
							onPressButton={onPressButton}
							highlightedDescription={highlightedDescription}
							isDescriptionGradient={isDescriptionGradient}
							color={descriptionHighlightColor}
						/>
					</View>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: verticalScale(25)
	},
	bgView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
		position: 'absolute',
		top: 0,
		bottom: 0
	},
	skipView: {
		alignSelf: 'flex-end',
		paddingBottom: verticalScale(6),
		paddingRight: verticalScale(16)
	},
	skipText: {
		color: colors.textTitle,
		fontSize: verticalScale(12),
		fontFamily: fonts.type.Inter_Medium
	}
});

export default NotificationPopUpModalView;
