import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import {useSelector} from 'react-redux';

import icons from '../assets/icon';
import Strings from '../constants/strings';
import {getLevelRank, getRoundDecimalValue} from '../constants/utils/Function';
import {RootState} from '../redux/store';

import {Fonts, horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle, moderateFontScale} from '../theme/metrics';
import ButtonLeftIconGradient from './ButtonLeftIconGradient';
import GradientText from './GradientText';

interface Props {
	itemData?: any;
	handleMenuPress?: () => void;
	handleBetMakerUserPicked?: () => void;
	handleBetTackerPicked?: () => void;
	handleAlreadyBetTackerUserPicked?: () => void;
	handleReplicateBet?: () => void;
	isHideReplicateBet?: boolean;
	isOnlyHideBetTitle?: boolean;
}

const OtherUserProfileReplicateBetComponent: React.FC<Props> = props => {
	const {
		itemData,
		handleBetMakerUserPicked,
		handleBetTackerPicked,
		handleAlreadyBetTackerUserPicked,
		handleReplicateBet,
		isHideReplicateBet,
		isOnlyHideBetTitle
	} = props;

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	// useEffect(() => {
	// 	console.log('====================================');
	// 	console.log('itemData :::: ', itemData);
	// 	console.log('====================================');
	// }, [itemData]);

	const ProfileComponent = (props: any) => {
		const {profilePath, profileLevelRank, handleBetMakerUserPicked} = props;
		const userLevelBadge = getLevelRank(profileLevelRank)?.image;
		return (
			<TouchableOpacity
				style={styles.profileInnerContainer}
				onPress={() => {
					if (userInfo?.user?._id === itemData?.users?._id) return;
					handleBetMakerUserPicked();
				}}>
				<ExpoFastImage
					style={styles.profileIcon}
					resizeMode="cover"
					source={{uri: profilePath}}
				/>
				<ExpoFastImage
					style={styles.profileRank}
					resizeMode="contain"
					source={userLevelBadge}
				/>
			</TouchableOpacity>
		);
	};

	const BetMakerPickedStringComponent = (props: any) => {
		const {handleBetMakerUserPicked} = props;
		return (
			<View style={styles.betMakerPickedStringContainer}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						if (userInfo?.user?._id === itemData?.users?._id) return;
						handleBetMakerUserPicked();
					}}>
					<Text style={styles.txtBetMakerPickedStyle}>
						{userInfo?.user?._id === itemData?.users?._id
							? 'You'
							: '@' + itemData?.users?.userName}
					</Text>
				</TouchableOpacity>
				<Text style={styles.txtBetMakerPickedStyle}>
					{' picked ' + itemData?.bet_creator_side_option}
				</Text>

				<GradientText
					colors={defaultTheme.primaryGradientColor}
					style={styles.txtBetMakerPickedStyle}>
					{' ' +
						Strings.str_dollor +
						getRoundDecimalValue(itemData?.bet_amount_usd)}
				</GradientText>
				<Text style={styles.txtBetMakerPickedStyle}>{' to win '}</Text>
				<GradientText
					colors={defaultTheme.primaryGradientColor}
					style={styles.txtBetMakerPickedStyle}>
					{Strings.str_dollor +
						getRoundDecimalValue(
							parseFloat(itemData?.bet_amount_usd) *
								parseFloat(itemData?.odds) -
								parseFloat(itemData?.bet_amount_usd)
						)}
				</GradientText>
			</View>
		);
	};

	const BetTakerPickedComponent = (props: any) => {
		const {handleBetTackerPicked} = props;

		let betUsdAmount = getRoundDecimalValue(
			parseFloat(itemData?.bet_amount_usd) * parseFloat(itemData?.odds) -
				parseFloat(itemData?.bet_amount_usd)
		);

		return (
			<TouchableOpacity activeOpacity={0.8} onPress={handleBetTackerPicked}>
				<LinearGradient
					colors={defaultTheme.primaryGradientColor}
					useAngle={true}
					angle={gradientColorAngle}
					style={styles.betTakerPickedContainer}>
					<Text style={styles.txtBetTackerPickerStyle} numberOfLines={2}>
						{'pick ' +
							itemData?.bet_opposite_side_option +
							' (bet ' +
							Strings.str_dollor +
							betUsdAmount +
							' win ' +
							Strings.str_dollor +
							getRoundDecimalValue(
								betUsdAmount * itemData?.opposite_odds - betUsdAmount
							) +
							')'}
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		);
	};

	const BetTakerAlreadyPickedComponent = (props: any) => {
		const {handleAlreadyBetTackerUserPicked} = props;
		return (
			<View style={styles.betTakerAlreadyPickedContainer}>
				<BetTakerAlreadyPickedStringComponent
					handleAlreadyBetTackerUserPicked={handleAlreadyBetTackerUserPicked}
				/>
			</View>
		);
	};

	const BetTakerAlreadyPickedStringComponent = (props: any) => {
		const {handleAlreadyBetTackerUserPicked} = props;
		return (
			<View style={styles.betTakerAlreadyPickedStringContainer}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						if (userInfo?.user?._id === itemData?.betTaker?.takerDetails?._id)
							return;
						handleAlreadyBetTackerUserPicked();
					}}>
					<Text style={styles.txtBetMakerPickedStyle}>
						{userInfo?.user?._id === itemData?.betTaker?.takerDetails?._id
							? 'You'
							: '@' + itemData?.betTaker?.takerDetails?.userName}
					</Text>
				</TouchableOpacity>
				<GradientText
					colors={defaultTheme.primaryGradientColor}
					style={styles.txtBetMakerPickedStyle}>
					{' joined '}
				</GradientText>
				<Text style={styles.txtBetMakerPickedStyle}>{'this bet'}</Text>
			</View>
		);
	};

	const ReplicateBetComponent = (props: any) => {
		const {handleReplicateBet} = props;
		return (
			<View style={styles.replicateBetContainer}>
				<ButtonLeftIconGradient
					onPress={handleReplicateBet}
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={Strings.replicate_this_bet_btn}
					leftIconPath={icons.ic_replicate_btn}
				/>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{!isOnlyHideBetTitle && (
				<View style={styles.betQuestionContainer}>
					<Text style={styles.txtBetQuestionStyle} numberOfLines={2}>
						{itemData?.betQuestion}
					</Text>
					{/* <TouchableOpacity
						hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
						onPress={handleMenuPress}>
						<ExpoFastImage style={{height: 16, width: 4}} source={icons.ic_menu} />
					</TouchableOpacity> */}
				</View>
			)}
			<View
				style={[
					styles.grayRootContainer,
					{
						marginHorizontal: horizontalScale(!isHideReplicateBet ? 12 : 0)
					}
				]}>
				<View style={styles.profileRootContainer}>
					<ProfileComponent
						profilePath={itemData?.users?.picture}
						profileLevelRank={itemData?.users?.level}
						handleBetMakerUserPicked={handleBetMakerUserPicked}
					/>
					<View style={styles.betMakerPickedStringRootContainer}>
						<BetMakerPickedStringComponent
							handleBetMakerUserPicked={handleBetMakerUserPicked}
						/>
					</View>
				</View>

				{itemData.betTaker && Object.keys(itemData.betTaker)?.length > 0 ? (
					<BetTakerAlreadyPickedComponent
						handleAlreadyBetTackerUserPicked={handleAlreadyBetTackerUserPicked}
					/>
				) : (
					userInfo?.user?._id !== itemData?.users?._id && (
						<BetTakerPickedComponent
							handleBetTackerPicked={handleBetTackerPicked}
						/>
					)
				)}
			</View>

			{!isHideReplicateBet && userInfo?.user?._id !== itemData?.users?._id ? (
				<ReplicateBetComponent handleReplicateBet={handleReplicateBet} />
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {borderRadius: 8, backgroundColor: colors.black},
	betQuestionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: horizontalScale(12),
		marginTop: verticalScale(10)
	},
	txtBetQuestionStyle: {
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		fontSize: moderateFontScale(18)
	},
	grayRootContainer: {
		marginHorizontal: horizontalScale(12),
		marginVertical: verticalScale(10),
		borderRadius: 8,
		padding: 10,
		backgroundColor: defaultTheme.backGroundColor
	},
	profileRootContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	profileInnerContainer: {
		width: horizontalScale(35),
		height: verticalScale(35),
		justifyContent: 'center'
	},
	profileIcon: {
		width: 26,
		height: 26,
		borderRadius: 13
	},
	profileRank: {
		width: 15,
		height: 15,
		position: 'absolute',
		right: 2,
		top: 0
	},
	betMakerPickedStringRootContainer: {flex: 1, marginLeft: horizontalScale(5)},
	betMakerPickedStringContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	txtBetMakerPickedStyle: {
		color: colors.white,
		fontSize: moderateFontScale(13),
		fontFamily: Fonts.type.Krona_Regular
	},
	replicateBetContainer: {
		paddingTop: verticalScale(10),
		marginBottom: verticalScale(12),
		marginHorizontal: horizontalScale(12),
		borderColor: colors.placeholderColor,
		borderTopWidth: 1
	},
	betTakerPickedContainer: {
		borderRadius: 8,
		marginTop: verticalScale(10),
		alignItems: 'center',
		paddingVertical: verticalScale(11)
	},
	txtBetTackerPickerStyle: {
		color: colors.white,
		fontSize: moderateFontScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	betTakerAlreadyPickedStringContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginHorizontal: horizontalScale(8)
	},
	betTakerAlreadyPickedContainer: {
		borderRadius: 8,
		marginTop: verticalScale(10),
		alignItems: 'center',
		paddingVertical: verticalScale(11),
		backgroundColor: colors.black
	},
	txtBetTackerAlreadyPickedStyle: {
		color: colors.white,
		fontSize: moderateFontScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		textAlign: 'center'
	}
});

export default OtherUserProfileReplicateBetComponent;
