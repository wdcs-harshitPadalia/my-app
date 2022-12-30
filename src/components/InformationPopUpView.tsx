import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	Modal,
	TouchableOpacity,
	ImageSourcePropType,
	ScrollView,
	Platform
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
// import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';
import icons from '../assets/icon';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {moderateFontScale, width} from '../theme/metrics';

interface Props extends TextInputProps {
	popupTitle?: string;
	onButtonPress?: () => void;
	description?: string;
	isVisible: boolean;
	iconPath?: ImageSourcePropType;
}

const InformationPopUpView: React.FC<Props> = props => {
	const {popupTitle, onButtonPress, description, isVisible, iconPath} = props;

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			style={{margin: 0}}>
			<View style={styles.bgView}>
				<View style={styles.viewDetails}>
					<View style={styles.infoView}>
						<ExpoFastImage
							resizeMode={'contain'}
							source={iconPath ?? icons.about}
							style={styles.helpImg}
							tintColor={colors.placeholderColor}
						/>
						<TouchableOpacity onPress={onButtonPress}>
							<ExpoFastImage
								resizeMode={'contain'}
								source={icons.close}
								style={styles.closeImg}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.titleStyle}>{popupTitle}</Text>

					<ScrollView>
						{Platform.OS === 'web' ? (
							<div
								style={webStyle.divStyle}
								dangerouslySetInnerHTML={{
									__html: description
								}}
							/>
						) : (
							<>
								{/* <HTMLView value={description} stylesheet={webStyle} /> */}
							</>
						)}
					</ScrollView>
				</View>
			</View>

			{/* </TouchableOpacity> */}
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
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10),
		justifyContent: 'center',
		paddingBottom: verticalScale(16),
		paddingHorizontal: verticalScale(16),
		height: '40%'
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		paddingVertical: verticalScale(16)
	},
	infoView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	helpImg: {
		marginTop: verticalScale(24),
		height: 24,
		width: 24
	},
	closeImg: {
		height: 14,
		width: 14
	}
});

const webStyle = StyleSheet.create({
	divStyle: {
		color: colors.white,
		fontSize: moderateFontScale(16),
		backgroundColor: 'transparent',
		fontFamily: Fonts.type.Inter_Medium,
		opacity: 0.5,
		flexWrap: 'wrap'
	}
});

export default InformationPopUpView;
