/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';

import {horizontalScale} from '../../theme';
import QRCode from 'react-native-qrcode-svg';
import {metamaskUniversalUrl} from '../../constants/api';

interface WalletQrCodeProps {
	style: ViewStyle;
	address: string;
	isHideTitle?: boolean;
}

export default function WalletQrCodeView(props: WalletQrCodeProps) {
	const qrValue = metamaskUniversalUrl + props.address;

	return <QRCode value={qrValue} size={180} />;
}

const styles = StyleSheet.create({
	imageStyle: {
		height: 15,
		width: 13,
		marginLeft: horizontalScale(12)
	}
});
