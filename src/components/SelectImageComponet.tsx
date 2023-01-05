import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Modal,
	Image,
	TouchableOpacity
} from 'react-native';
import icons from '../assets/icon';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {width} from '../theme/metrics';

interface Props extends TextInputProps {
	onPressCamera?: () => void;
	onPressGallery?: () => void;
	onPressAvatar?: () => void;
	isVisible: boolean;
	setIsVisible: boolean;
	isHideAvatar: boolean;
}

const SelectImageComponet: React.FC<Props> = props => {
	const {
		onPressCamera,
		onPressGallery,
		onPressAvatar,
		isVisible,
		setIsVisible,
		isHideAvatar
	} = props;

	const cancelPopup = () => {
		setIsVisible(false);
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
		backgroundColor: colors.backgroundTrns
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
	desStyle: {
		color: colors.grayText,
		fontSize: moderateScale(14),
		marginLeft: verticalScale(10),
		fontFamily: Fonts.type.Inter_Regular,
		textAlign: 'center'
	}
});

export default SelectImageComponet;
