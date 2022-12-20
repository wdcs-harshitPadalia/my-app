import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	ImageSourcePropType,
	ViewStyle
} from 'react-native';
import {Badge} from 'react-native-elements/dist/badge/Badge';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {getLevelRank} from '../constants/utils/Function';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import LeftIconWithTextComponent from './LeftIconWithTextComponent';
import TotalBalanceComponent from './TotalBalanceComponent';

interface Props extends TextInputProps {
	name?: string;
	onLeftMenuPress?: () => void;
	onSettingMenuPress?: () => void;
	onNotificationMenuPress?: () => void;
	onSendMenuPress?: () => void;
	onAddMenuPress?: () => void;
	onSaveMenuPress?: () => void;
	onWalletPress?: () => void;

	onLeftIconPath?: ImageSourcePropType;
	onLeftIconFilterPath?: ImageSourcePropType;
	onSettingIconPath?: ImageSourcePropType;
	onNotificationIconPath?: ImageSourcePropType;
	onSendIconPath?: ImageSourcePropType;
	onAddIconPath?: ImageSourcePropType;
	onSaveIconPath?: ImageSourcePropType;

	isSendBadge?: boolean;
	isNotificationBadge?: boolean;

	onProfilePath?: string;
	levelRank?: number;
	isShowBalance?: boolean;
	balance?: string;
	height?: number;
	width?: number;
}

const HeaderComponent: React.FC<Props> = props => {
	const {
		name,
		onLeftMenuPress,
		onSettingMenuPress,
		onNotificationMenuPress,
		onSendMenuPress,
		onAddMenuPress,
		onSaveMenuPress,

		onSaveIconPath,
		onLeftIconPath,
		onLeftIconFilterPath,
		onSettingIconPath,
		onNotificationIconPath,
		onSendIconPath,
		onAddIconPath,
		isSendBadge,
		isNotificationBadge,
		onProfilePath,
		levelRank,
		isShowBalance,
		onWalletPress,
		sendbtnViewStyle,
		height,
		width,
		userInfo
	} = props;

	const customBadgeSendView = () => {
		return (
			<LinearGradient
				useAngle={true}
				angle={gradientColorAngle}
				colors={defaultTheme.redGredientColor}
				style={styles.badgeSendStyle}
			/>
		);
	};
	const customBadgeNotificationView = () => {
		return (
			<LinearGradient
				useAngle={true}
				angle={gradientColorAngle}
				colors={defaultTheme.redGredientColor}
				style={styles.badgeNotificationStyle}
			/>
		);
	};

	return (
		<View style={styles.viewImageStyle}>
			{onLeftIconPath !== undefined ? (
				<TouchableOpacity
					onPress={onLeftMenuPress}
					style={{marginRight: horizontalScale(14)}}>
					<ExpoFastImage
						style={styles.imgIconStyle}
						source={onLeftIconPath}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			) : null}

			{onLeftIconFilterPath !== undefined ? (
				<TouchableOpacity onPress={onLeftMenuPress}>
					<LeftIconWithTextComponent
						text={Strings.filters.toUpperCase()}
						iconPath={onLeftIconFilterPath}
						isApplyFilter={false}
						borderStyle={{borderRadius: 26}}
						gradientColors={defaultTheme.ternaryGradientColor}
					/>
				</TouchableOpacity>
			) : null}

			<View style={styles.viewTextStyle}>
				{name && (
					<TouchableOpacity
						onPress={onLeftMenuPress}
						style={styles.viewTextStyle}>
						<Text style={styles.titleStyle}>{name}</Text>
					</TouchableOpacity>
				)}
				{isShowBalance && <TotalBalanceComponent onPress={onWalletPress} />}
			</View>

			{onAddIconPath !== undefined ? (
				<TouchableOpacity onPress={onAddMenuPress}>
					<ExpoFastImage
						style={[
							styles.imgRightIconStyle(height, width),
							{opacity: onAddIconPath === icons.support ? 0.3 : 1.0}
						]}
						source={onAddIconPath}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			) : null}

			{onSendIconPath !== undefined ? (
				<TouchableOpacity onPress={onSendMenuPress}>
					{isSendBadge ? <Badge Component={customBadgeSendView} /> : null}
					<ExpoFastImage
						// style={[
						// 	styles.imgRightIconStyle,
						// 	{transform: [{rotate: '-45deg'}], width: 28, height: 28}
						// ]}
						style={styles.imgRightIconStyle(height, width)}
						source={onSendIconPath}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			) : null}

			{onNotificationIconPath !== undefined ? (
				<TouchableOpacity onPress={onNotificationMenuPress}>
					{isNotificationBadge ? (
						<Badge Component={customBadgeNotificationView} />
					) : null}

					<ExpoFastImage
						style={[
							styles.imgRightIconStyle(height, width),
							{width: 34, height: 34, marginHorizontal: verticalScale(10)}
						]}
						source={onNotificationIconPath}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			) : null}

			{onSettingIconPath !== undefined ? (
				<TouchableOpacity onPress={onSettingMenuPress}>
					<ExpoFastImage
						style={styles.imgRightIconStyle(height, width)}
						source={onSettingIconPath}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			) : null}
			{onSaveIconPath !== undefined ? (
				<TouchableOpacity onPress={onSaveMenuPress}>
					<LinearGradient
						useAngle={true}
						angle={gradientColorAngle}
						colors={defaultTheme.primaryGradientColor}
						style={{borderRadius: 8}}>
						<View style={styles.saveButtonContainerStyle}>
							<Text style={styles.saveTextStyle}>
								{Strings.saveChanges.toUpperCase()}
							</Text>
							<ExpoFastImage
								style={styles.saveIconStyle}
								source={onSaveIconPath}
								resizeMode={'contain'}
							/>
						</View>
					</LinearGradient>
				</TouchableOpacity>
			) : null}

			{onProfilePath !== undefined ? (
				<View style={styles.profileContainer}>
					<ExpoFastImage
						style={styles.profileIconStyle}
						resizeMode="cover"
						source={{uri: onProfilePath}}
					/>
					<View>
						<ExpoFastImage
							style={styles.viewBadgeStyle}
							resizeMode="contain"
							source={getLevelRank(levelRank)?.image}
						/>
					</View>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	viewImageStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		justifyContent: 'space-between'
		//marginTop: verticalScale(24),
	},
	viewTextStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	saveButtonContainerStyle: {
		height: 35,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: horizontalScale(10)
	},
	imgIconStyle: {
		width: 25,
		height: 25
	},
	saveIconStyle: {
		width: 22,
		height: 22
	},
	imgRightIconStyle: (height: number, width: number) => ({
		width: verticalScale(height),
		height: verticalScale(width),
		alignItems: 'flex-end',
		marginHorizontal: verticalScale(10)
	}),
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'left',
		flex: 1
	},
	saveTextStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Bold,
		marginRight: horizontalScale(14),
		textAlign: 'left'
	},
	badgeSendStyle: {
		position: 'absolute',
		top: 2,
		right: 10,
		// backgroundColor: colors.red,
		width: 10,
		height: 10,
		borderRadius: 5
	},
	badgeNotificationStyle: {
		position: 'absolute',
		top: 5,
		right: 15,
		//backgroundColor: colors.purple,
		width: 10,
		height: 10,
		borderRadius: 5
	},
	profileContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},

	profileIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 30
	},
	viewBadgeStyle: {
		width: 30,
		height: 30,
		top: -45,
		right: -30,
		position: 'absolute'
	}
});

const defaultProps = {
	height: 25,
	width: 25
};

HeaderComponent.defaultProps = defaultProps;

export default HeaderComponent;
