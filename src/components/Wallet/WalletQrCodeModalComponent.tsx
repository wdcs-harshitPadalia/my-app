import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Modal,
	Text,
	TouchableOpacity,
	Dimensions,
	Alert
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../../assets/icon';
import Strings from '../../constants/strings';

import {Fonts, moderateScale, verticalScale} from '../../theme';
import colors from '../../theme/colors';
import {defaultTheme} from '../../theme/defaultTheme';
import {horizontalScale} from '../../theme/metrics';
import WalletQrCodeView from './WalletQrCodeView';

interface Props extends TextInputProps {
	isVisible: boolean;
	popupTitle?: string;
	qrCodeScanMsg?: string;
	onPressCancel?: () => void;
	address: string;
}

const WalletQrCodeModalComponent: React.FC<Props> = props => {
	const {isVisible, popupTitle, onPressCancel} = props;

	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View style={styles.backGroungContainer}>
				<TouchableOpacity activeOpacity={1} onPress={onPressCancel}>
					<View style={styles.outsideClickableView}>
						<View style={styles.innerModalDetailsContainer}>
							<Text style={styles.titleStyle}>{popupTitle}</Text>

							<View style={styles.qrCodeImageContainer}>
								<View style={styles.qrCodeImageBgContainer}>
									<WalletQrCodeView
										address={props.address}
										style={{borderRadius: 0}}
									/>
								</View>
							</View>

							<Text style={styles.qrCodeScanMsgTextStyle}>
								{props.qrCodeScanMsg}
							</Text>

							<View style={styles.qrCodeAddressContainer}>
								<Text style={styles.qrCodeAddressTextStyle}>
									{props.address}
								</Text>

								<TouchableOpacity
									hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
									onPress={async () => {
										await Clipboard.setString(props.address);
										Alert.alert(Strings.copy_wallet_add_desc);
									}}>
									<ExpoFastImage
										style={styles.clipboardImageStyle}
										source={icons.clipboard}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backGroungContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	outsideClickableView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: verticalScale(30)
	},
	innerModalDetailsContainer: {
		backgroundColor: colors.black,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('screen').width * 0.88
	},
	qrCodeImageContainer: {
		marginVertical: verticalScale(30),
		borderRadius: 10,
		overflow: 'hidden'
	},
	qrCodeImageBgContainer: {backgroundColor: colors.white, padding: 20},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(20)
	},
	qrCodeScanMsgTextStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		textAlign: 'center',
		fontWeight: '800'
	},
	qrCodeAddressContainer: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12,
		margin: 20
	},
	qrCodeAddressTextStyle: {
		color: colors.white,
		textAlign: 'center',
		flex: 1,
		fontSize: 14,
		fontFamily: Fonts.type.Inter_Bold,
		marginLeft: horizontalScale(12)
	},
	clipboardImageStyle: {
		height: 15,
		width: 13,
		marginLeft: horizontalScale(12)
	}
});

export default WalletQrCodeModalComponent;
