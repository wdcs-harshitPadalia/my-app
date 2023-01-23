import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Modal,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Text
} from 'react-native';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {screenHeight, width} from '../theme/metrics';

interface Props extends TextInputProps {
	onPressCamera?: () => void;
	onPressGallery?: () => void;
	onPressAvatar?: () => void;
	isVisible: boolean;
	setIsVisible: boolean;
	isHideAvatar: boolean;
	isShowLoader: boolean;
}

const SelectImageComponet: React.FC<Props> = props => {
	const {
		onPressCamera,
		onPressGallery,
		onPressAvatar,
		isVisible,
		setIsVisible,
		isHideAvatar,
		isShowLoader
	} = props;

	const cancelPopup = () => {
		if (!isShowLoader) {
			setIsVisible(false);
		}
	};
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onDismiss={() => cancelPopup()}
			onTouchCancel={() => cancelPopup()}
			onRequestClose={() => cancelPopup()}>
			<TouchableOpacity
				activeOpacity={1}
				style={styles.centeredView}
				onPressOut={() => cancelPopup()}>
				<View style={styles.modalView}>
					<TouchableOpacity onPress={onPressCamera}>
						<Image style={styles.imageStyle} source={icons.camera} />
					</TouchableOpacity>

					<TouchableOpacity onPress={onPressGallery}>
						<Image style={styles.imageStyle} source={icons.gallery} />
					</TouchableOpacity>
					{!isHideAvatar && (
						<TouchableOpacity onPress={onPressAvatar}>
							<Image style={styles.imageStyle} source={icons.profile} />
						</TouchableOpacity>
					)}
				</View>
			</TouchableOpacity>
			{isShowLoader && (
				<View style={styles.activityIndicator}>
					<ActivityIndicator animating size="large" color={colors.gray} />
					<Text style={styles.textStyle}>{Strings.video_processing}</Text>
				</View>
			)}
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'column',
		// marginTop: verticalScale(20),
		backgroundColor: colors.blackTransparent05
	},
	modalView: {
		borderTopLeftRadius: verticalScale(20),
		borderTopRightRadius: verticalScale(20),
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		padding: verticalScale(40),
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: width
	},
	imageStyle: {width: verticalScale(50), height: verticalScale(50)},
	activityIndicator: {
		position: 'absolute',
		alignSelf: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	textStyle: {
		fontFamily: Fonts.type.Inter_Bold,
		margin: verticalScale(8),
		color: colors.white,
		textAlign: 'center'
	}
});

export default SelectImageComponet;
