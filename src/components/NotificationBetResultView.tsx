import React, {useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	View
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import moment from 'moment';
import {gradientColorAngle} from '../theme/metrics';
import {decimalValue} from '../constants/api';
import {getRoundDecimalValue} from '../constants/utils/Function';
interface Props extends TextInputProps {
	onPress?: () => void;
	onConfirm?: () => void;
	onReject?: () => void;
	colorArray?: [];
	data: Object;
}
const NotificationBetResultView: React.FC<Props> = props => {
	const {onPress, colorArray, data} = props;
	const [betType] = useState(data?.type);
	return (
		<LinearGradient
			style={styles.circleGradient}
			useAngle={true}
			angle={gradientColorAngle}
			colors={colorArray}>
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.container}
				onPress={onPress}>
				<View
					style={
						betType === 'RESULT'
							? styles.profileIconStyle
							: styles.matchIconStyle
					}>
					<ExpoFastImage
						style={
							betType === 'RESULT' ? styles.imgIconStyle : styles.matchIconStyle
						}
						resizeMode="cover"
						source={
							betType === 'RESULT' || betType === 'BET_RESULT_CONFIRMATION'
								? data?.resultData?.isWinner === 'win'
									? icons.celebration
									: data?.resultData?.isWinner === 'draw' ||
									  data?.resultData?.isWinner === 'Void'
									? icons.emojiNeutral
									: icons.emojiSad
								: {uri: data?.match?.image ?? data?.bet?.custom_bet_image}
						}
					/>
				</View>
				<View style={styles.viewLabelContainer}>
					{betType === 'RESULT' && (
						<Text style={[styles.usernameStyle]}>
							{(data?.resultData?.isWinner === 'win'
								? Strings.str_congrats_you_just_won + Strings.str_dollor
								: Strings.str_oh_no_you_just_lost + Strings.str_dollor) +
								(data?.resultData?.isWinner === 'win'
									? getRoundDecimalValue(data?.resultData?.betWinningAmount)
									: getRoundDecimalValue(data?.resultData?.betLossingAmount)) +
								' ' +
								Strings.str_from}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.resultData?.betCreatorUsername}
							</Text>
							<Text style={[styles.usernameStyle]}>{Strings.str_bet}</Text>
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.match?.matchName
									? data?.match?.matchName
									: data?.match?.localTeamName +
									  Strings.str_vs +
									  data?.match?.visitorTeamName}
							</Text>
						</Text>
					)}
					{betType === 'CUSTOM_BET_RESULT' && (
						<Text style={[styles.usernameStyle]}>
							{Strings.str_your_bet}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{Strings.str_has_end_verify_result}
						</Text>
					)}
					{betType === 'CUSTOM_BET_RESULT_NOTRESOLVER' && (
						<Text style={[styles.usernameStyle]}>
							{Strings.str_your_bet}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{Strings.str_has_end_provide_result_and_evidence}
						</Text>
					)}
					{betType === 'RESULT_VERIFICATION_BETRESOLVER' && (
						<Text style={[styles.usernameStyle]}>
							{Strings.str_your_bet}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{Strings.str_has_end_provide_evidence}
						</Text>
					)}
					{betType === 'BET_RESULT_REVIEW' && (
						<Text style={[styles.usernameStyle]}>
							{Strings.str_the_bet}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{Strings.str_has_end_creator_verify_review_result}
						</Text>
					)}
					{betType === 'BET_RESULT_CONFIRMATION' && (
						<Text style={[styles.usernameStyle]}>
							{data?.resultData?.isWinner === 'win'
								? Strings.str_great_result_for_your_bet
								: data?.resultData?.isWinner === 'draw' ||
								  data?.resultData?.isWinner === 'Void'
								? Strings.str_result_for_your_bet
								: Strings.str_oh_no_result_for_your_bet}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{data?.resultData?.isWinner === 'win'
								? Strings.str_accept_by_opponent_you_just_won +
								  Strings.str_dollor +
								  data?.resultData?.betWinningAmount +
								  '.'
								: data?.resultData?.isWinner === 'draw' ||
								  data?.resultData?.isWinner === 'Void'
								? Strings.str_accepted_your_oponent_returned_to_your_wallet
								: Strings.str_accept_by_opponent_you_just_lost +
								  Strings.str_dollor +
								  data?.resultData?.betLossingAmount +
								  '.'}
						</Text>
					)}
					{betType === 'DISPUTE_EVIDENCE' && (
						<Text style={[styles.usernameStyle]}>
							{Strings.str_your_oppent_in_bet}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{Strings.str_opened_dispute_provide_evidence_result}
						</Text>
					)}
					{betType === 'MATCH_CANCELLED' && (
						<Text style={[styles.usernameStyle]}>
							{`${
								data?.match_status === 'retired'
									? Strings.str_player
									: Strings.str_match
							}${Strings.str_for_your_bet}`}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{`${Strings.str_has_been}${data?.match_status}${Strings.str_you_cancel_bet_recover_fund}`}
						</Text>
					)}
					<Text style={styles.userTypeStyle}>
						{/* {dateTimeStreamingConvert(
              parseFloat(new Date(data?.createdAt).getTime()),
            ).toUpperCase()} */}
						{moment(parseFloat(new Date(data?.createdAt).getTime())).fromNow(
							true
						) + Strings.str_ago}
					</Text>
				</View>
			</TouchableOpacity>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: verticalScale(16),
		paddingHorizontal: verticalScale(14),
		alignItems: 'center'
	},
	circleGradient: {
		borderRadius: verticalScale(8),
		marginTop: verticalScale(8),
		marginBottom: verticalScale(8)
	},
	profileIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	matchIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgIconStyle: {
		width: 25,
		height: 25
		// borderRadius: 5,
	},
	viewLabelContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: verticalScale(20)
	},
	usernameStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'left'
	},
	userTypeStyle: {
		fontSize: moderateScale(10),
		color: colors.whiteFour10,
		fontFamily: Fonts.type.Inter_Regular,
		marginTop: verticalScale(2)
	},
	viewBackButton: {
		flexDirection: 'row',
		marginTop: verticalScale(16)
	},
	backButton: {
		flex: 1
	},
	nextButton: {
		marginLeft: verticalScale(16),
		flex: 1,
		borderColor: colors.white,
		borderWidth: 1,
		borderRadius: 8
	}
});
export default NotificationBetResultView;
