import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	Modal,
	Image,
	TouchableOpacity
} from 'react-native';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {
	Colors,
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import ButtonGradient from './ButtonGradient';

interface Props extends TextInputProps {
	onPressCamera?: () => void;
	onPressGallery?: () => void;
	isVisible: boolean;
	setIsVisible: Function;
}

const SelectImageComponentModal: React.FC<Props> = props => {
	const {onPressCamera, onPressGallery, isVisible, setIsVisible} = props;

	const cancelPopup = () => {
		setIsVisible(false);
	};
	return (
		<View style={styles.centeredView}>
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
					<View style={styles.modalChildContainer}>
						<View style={{marginHorizontal: horizontalScale(20)}}>
							<ButtonGradient
								onPress={onPressGallery}
								buttonText={Strings.choose_from_gallery}
								buttonTextcolor={Colors.white}
								leftIconPath={icons.photo_collection}
								colorArray={defaultTheme.ternaryGradientColor}
								textType={'none'}
								paddingVertical={verticalScale(20)}
								style={{
									marginBottom: verticalScale(10)
								}}
							/>

							<ButtonGradient
								onPress={onPressCamera}
								buttonText={Strings.use_camera}
								buttonTextcolor={Colors.white}
								leftIconPath={icons.photo_camera}
								colorArray={defaultTheme.ternaryGradientColor}
								textType={'none'}
								paddingVertical={verticalScale(20)}
								style={{
									marginTop: verticalScale(10)
								}}
							/>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)'
		// backgroundColor: defaultTheme.backGroundColor,
	},
	modalChildContainer: {
		borderRadius: verticalScale(8),
		backgroundColor: defaultTheme.backGroundColor,
		marginHorizontal: horizontalScale(40),
		paddingVertical: verticalScale(20)
		// alignItems: 'center',
		// justifyContent: 'center',
	}
});

export default SelectImageComponentModal;
