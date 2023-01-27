import React, {useEffect, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	Share,
	Platform,
	TouchableOpacity
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {useSelector} from 'react-redux';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {getProfileShareUrl, showErrorAlert} from '../constants/utils/Function';
import {RootState} from '../redux/store';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonLeftIconGradient from './ButtonLeftIconGradient';
import {LinearGradient} from 'expo-linear-gradient';
interface Props extends TextInputProps {
	onSharePress?: () => void;
	onSkipPress?: () => void;
	textType?: string;
	closeText?: string;
}

const InviteShareFriend: React.FC<Props> = props => {
	const {onSharePress, onSkipPress, textType, closeText} = props;
	const [shareContent, setShareContent] = useState('');
	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const onShare = async (url: string) => {
		if (Platform.OS === 'web') {
			try {
				await navigator.share({
					text: url
				});
			} catch (error) {
				showErrorAlert('', error?.message);
			}
		} else {
			try {
				const result = await Share.share({
					message: url
				});
				if (result.action === Share.sharedAction) {
					if (result.activityType) {
						// shared with activity type of result.activityType
					} else {
						// shared
					}
				} else if (result.action === Share.dismissedAction) {
					// dismissed
				}
			} catch (error) {
				showErrorAlert('', error.message);
			}
		}
	};
	useEffect(() => {
		setShareContent(
			getProfileShareUrl(
				userProfileInfo?.user?.displayName || userProfileInfo?.user?.userName
			)
		);
	}, []);

	return (
		<View style={styles.bgView}>
			<View style={styles.centeredView}>
				<View style={styles.viewDetails}>
					<View style={styles.skipView}>
						<LinearGradient
							style={styles.circleGradient}
							useAngle={true}
							angle={gradientColorAngle}
							colors={defaultTheme.ternaryGradientColor}>
							<TouchableOpacity style={styles.skipBtn} onPress={onSkipPress}>
								<Text style={styles.skipText}>{closeText ?? Strings.skip}</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>

					<View style={{alignItems: 'center'}}>
						<ExpoFastImage
							resizeMode={'contain'}
							source={icons.share_gradient}
							style={styles.shareImg}
						/>
					</View>

					<Text style={styles.titleStyle}>{Strings.invite_your_friends}</Text>
					<Text style={styles.descriptionStyle}>
						{Strings.share_the_app_with_your_friends}
					</Text>

					<ButtonLeftIconGradient
						onPress={() => {
							onSharePress();
							onShare(shareContent);
						}}
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.share_defibet_house}
						style={styles.loginButtonSocial}
						textType={textType}
						leftIconPath={icons.share}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bgView: {
		top: 0,
		bottom: 0,
		width: '100%',
		position: 'absolute'
	},
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	viewDetails: {
		width: '100%',
		backgroundColor: defaultTheme.backGroundColor
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(24),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		marginVertical: verticalScale(20),
		marginHorizontal: verticalScale(16)
	},

	skipBtn: {
		color: colors.grayLightText,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		alignItems: 'center',
		justifyContent: 'center',
		height: verticalScale(36),
		borderRadius: verticalScale(18)
	},
	skipText: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginHorizontal: verticalScale(16)
	},

	skipView: {
		alignItems: 'flex-end',
		marginTop: verticalScale(16),
		marginRight: verticalScale(16)
	},
	circleGradient: {
		borderRadius: verticalScale(18),
		alignItems: 'center',
		flexDirection: 'row'
	},
	descriptionStyle: {
		color: colors.grayLightText,
		fontSize: moderateScale(16),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		marginBottom: verticalScale(10),
		marginHorizontal: verticalScale(16)
	},
	loginButtonSocial: {
		marginTop: verticalScale(16),
		marginBottom: verticalScale(30),
		marginHorizontal: verticalScale(16)
	},
	shareImg: {
		height: 120,
		width: 120,
		marginTop: verticalScale(20)
	}
});

export default InviteShareFriend;
