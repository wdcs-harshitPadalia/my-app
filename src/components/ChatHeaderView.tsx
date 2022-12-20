import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	ImageSourcePropType
} from 'react-native';
import {Badge} from 'react-native-elements/dist/badge/Badge';
import {Image} from 'react-native-elements/dist/image/Image';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {getLevelRank} from '../constants/utils/Function';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';

interface Props extends TextInputProps {
	onLeftMenuPress?: () => void;
	friendImage?: string;
	friendName?: string;
	friendLevel?: number;
}

const HeaderComponent: React.FC<Props> = props => {
	const {onLeftMenuPress, friendImage, friendName, friendLevel} = props;

	return (
		<View style={styles.viewImageStyle}>
			<TouchableOpacity onPress={onLeftMenuPress}>
				<ExpoFastImage
					style={styles.backIconStyle}
					source={icons.back}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
			<ExpoFastImage
				style={styles.imgIconStyle}
				resizeMode="cover"
				source={{uri: friendImage}}
				//source={icons.userDummy}
			/>

			<View style={styles.viewBadgeStyle}>
				<ExpoFastImage
					style={styles.badgeIconStyle}
					resizeMode="cover"
					// source={{uri: profileImgPath}}
					source={getLevelRank(friendLevel)?.image}
				/>
			</View>
			<Text style={styles.titleStyle}>{friendName}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	viewImageStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: verticalScale(16)
		//justifyContent: 'space-between',
		//marginTop: verticalScale(24),
	},
	viewTextStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	imgRightIconStyle: {
		width: 25,
		height: 25,
		alignItems: 'flex-end',
		marginHorizontal: verticalScale(10)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Krona_Regular,
		marginLeft: horizontalScale(14),
		textAlign: 'left'
	},
	saveStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Krona_Regular,
		marginRight: horizontalScale(14),
		textAlign: 'left'
	},
	badgeSendStyle: {
		position: 'absolute',
		top: 6,
		right: 14,
		//backgroundColor: colors.purple,
		width: 8,
		height: 8,
		borderRadius: 5
	},
	badgeNotificationStyle: {
		position: 'absolute',
		top: 5,
		right: 12,
		//backgroundColor: colors.purple,
		width: 8,
		height: 8,
		borderRadius: 5
	},
	profileContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},

	profileIconStyle: {
		width: 30,
		height: 30,
		borderRadius: 15
	},
	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginLeft: horizontalScale(10)
		// overflow: 'visible',
	},
	viewBadgeStyle: {
		width: 25,
		height: 25,
		borderRadius: 20,
		left: horizontalScale(74),
		top: 12,
		position: 'absolute',
		//backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center'
	},
	badgeIconStyle: {
		width: 30,
		height: 30
	},
	backIconStyle: {
		width: 25,
		height: 25
	}
});

export default HeaderComponent;
