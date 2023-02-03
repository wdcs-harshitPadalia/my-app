import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	Modal,
	TouchableOpacity,
	Platform
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import GradientText from './GradientText';

interface Props extends TextInputProps {
	amount?: string;
	onButtonClosePress?: () => void;
	description?: string;
	isVisible: boolean;
	onButtonConfirmPress?: () => void;
	address?: string;
}

const WithdrawConformationModal: React.FC<Props> = props => {
	const {amount, onButtonClosePress, onButtonConfirmPress, isVisible, address} =
		props;

	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View style={styles.bgView}>
				<View style={styles.viewDetails}>
					<View style={styles.infoView}>
						<ExpoFastImage
							resizeMode={'contain'}
							source={icons.about}
							style={styles.helpImg}
							tintColor={colors.placeholderColor}
						/>
						<TouchableOpacity
							onPress={onButtonClosePress}
							hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
							<ExpoFastImage
								resizeMode={'contain'}
								source={icons.close}
								style={styles.closeImg}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.titleView}>
						<Text style={styles.titleStyle}>{Strings.you_will_transfer}</Text>
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={styles.gradientStyle}>
							{' ' + amount + ' '}
						</GradientText>
						<Text style={styles.titleStyle}>{Strings.to_address}</Text>
					</View>
					<LinearGradient
						style={styles.gradientView}
						useAngle={true}
						angle={gradientColorAngle}
						colors={defaultTheme.ternaryGradientColor}>
						<Text style={styles.addressTextStyle} numberOfLines={2}>
							{address}
						</Text>
					</LinearGradient>

					<View style={styles.viewBackButton}>
						<LinearGradient
							style={styles.backButtonView}
							useAngle={true}
							angle={gradientColorAngle}
							colors={defaultTheme.secondaryGradientColor}>
							<ButtonGradient
								onPress={onButtonClosePress}
								colorArray={defaultTheme.blackGredientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.cancel}
								style={styles.backButton}
							/>
						</LinearGradient>

						<ButtonGradient
							onPress={onButtonConfirmPress}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.confirm}
							style={styles.nextButton}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	bgView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	viewDetails: {
		backgroundColor: colors.black,
		borderRadius: verticalScale(10),
		// justifyContent: 'center',
		//  paddingBottom: verticalScale(50),
		paddingHorizontal: verticalScale(16),
		height: '45%',
		width: '100%'
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular
	},
	gradientStyle: {
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular
	},
	infoView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	helpImg: {
		marginTop: verticalScale(30),
		height: verticalScale(30),
		width: verticalScale(30)
	},
	closeImg: {
		height: verticalScale(14),
		width: verticalScale(14)
	},
	gradientView: {
		borderRadius: verticalScale(16),
		alignItems: 'center'
	},
	viewBackButton: {
		flexDirection: 'row',
		paddingVertical: verticalScale(20)
	},
	backButton: {
		padding: verticalScale(2)
	},
	backButtonView: {
		flex: 0.5,
		borderRadius: verticalScale(8)
	},
	nextButton: {
		marginLeft: verticalScale(16),
		flex: 0.5
	},
	addressTextStyle: {
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold,
		padding: verticalScale(20)
	},
	titleView: {
		flexDirection: 'row',
		marginRight: 16,
		flexWrap: 'wrap',
		paddingVertical: verticalScale(20)
	}
});

export default WithdrawConformationModal;
