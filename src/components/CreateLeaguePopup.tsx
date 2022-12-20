import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Modal,
	Text,
	TouchableOpacity,
	Dimensions,
	ImageSourcePropType
} from 'react-native';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface Props extends TextInputProps {
	isVisible: boolean;
	popupTitle?: string;
	buttonOkTitle?: string;
	buttonCancelTitle?: string;
	leftIconPath?: ImageSourcePropType;
	onPressOk?: () => void;
	onPressCancel?: () => void;
}

const CreateLeaguePopup: React.FC<Props> = props => {
	const {
		popupTitle,
		buttonOkTitle,
		onPressOk,
		onPressCancel,
		buttonCancelTitle,
		isVisible,
		leftIconPath
	} = props;

	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View style={styles.bgView}>
				<TouchableOpacity activeOpacity={1} onPress={onPressCancel}>
					<View style={styles.centeredView}>
						<View style={styles.viewDetails}>
							<Text style={styles.titleStyle}>{popupTitle}</Text>
							<View style={styles.viewBackButton}>
								<ButtonGradient
									onPress={onPressCancel}
									colorArray={defaultTheme.ternaryGradientColor}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									buttonText={buttonCancelTitle}
									style={styles.backButton}
								/>
								<ButtonGradient
									onPress={onPressOk}
									colorArray={defaultTheme.primaryGradientColor}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									buttonText={buttonOkTitle}
									style={styles.nextButton}
									leftIconPath={leftIconPath}
									leftIconStyle={styles.rightIconStyle}
								/>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>

			{/* </TouchableOpacity> */}
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: verticalScale(30)
	},
	bgView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	viewDetails: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10),
		// alignItems: 'center',
		// justifyContent: 'center',
		paddingVertical: verticalScale(20),
		width: Dimensions.get('screen').width * 0.9
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_Bold,
		textAlign: 'center',
		paddingVertical: verticalScale(8),
		paddingHorizontal: horizontalScale(8)
	},
	viewBackButton: {
		flexDirection: 'row',
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16)
	},
	backButton: {
		flex: 1
	},
	nextButton: {
		marginLeft: verticalScale(16),
		flex: 1
	},
	rightIconStyle: {height: 15, width: 15}
});

export default CreateLeaguePopup;
