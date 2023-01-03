import React from 'react';
import {
	View,
	StyleSheet,
	Modal,
	TouchableOpacity,
	TextInputProps,
	Text,
	Platform
} from 'react-native';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Colors, Fonts, horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle, moderateScale, width} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface Props extends TextInputProps {
	handleYesButtonClick?: () => void;
	handleNoButtonClick?: () => void;
	isTokenConfirmationModelVisible: boolean;
	tokenPrice: string;
	title: string;
	infoDescription: string;
}

const TokenConfirmationModel: React.FC<Props> = props => {
	const {
		handleYesButtonClick,
		handleNoButtonClick,
		isTokenConfirmationModelVisible,
		tokenPrice,
		title,
		infoDescription
	} = props;

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isTokenConfirmationModelVisible}
			onDismiss={handleNoButtonClick}
			onTouchCancel={handleNoButtonClick}
			onRequestClose={handleNoButtonClick}>
			<View style={styles.container}>
				<View style={styles.modalContainer}>
					<View
						style={{
							marginBottom: verticalScale(8)
						}}>
						<Text style={styles.modalTitleTextStyle}>{title}</Text>
					</View>
					<View
						style={{
							marginHorizontal: horizontalScale(8)
						}}>
						<Text style={styles.modalDescTextStyle}>
							{infoDescription.replace('%d', tokenPrice)}
						</Text>
					</View>

					<View style={styles.bottomButtonContainer}>
						<ButtonGradient
							style={styles.noButtonStyle}
							buttonText={Strings.cancel}
							buttonTextcolor={colors.white}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							onPress={handleNoButtonClick}
						/>
						<ButtonGradient
							style={styles.yesButtonStyle}
							buttonText={Strings.ok}
							buttonTextcolor={colors.white}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							onPress={handleYesButtonClick}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	modalContainer: {
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: verticalScale(8),
		backgroundColor: defaultTheme.backGroundColor,
		paddingVertical: verticalScale(20)
	},
	modalTitleTextStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	modalDescTextStyle: {
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	bottomButtonContainer: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(16),
		...Platform.select({
			web: {
				width: '90%'
			}
		})
	},
	noButtonStyle: {
		flex: 1,
		marginRight: horizontalScale(10)
	},
	yesButtonStyle: {
		flex: 1,
		marginLeft: horizontalScale(10)
	}
});

export default TokenConfirmationModel;
