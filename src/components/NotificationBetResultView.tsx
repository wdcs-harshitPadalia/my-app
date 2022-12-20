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
								? 'Congrats! You just won ' + Strings.str_dollor
								: 'Oh no! You just lost  ' + Strings.str_dollor) +
								(data?.resultData?.isWinner === 'win'
									? getRoundDecimalValue(data?.resultData?.betWinningAmount)
									: getRoundDecimalValue(data?.resultData?.betLossingAmount)) +
								' ' +
								' from '}

							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.resultData?.betCreatorUsername}
							</Text>
							<Text style={[styles.usernameStyle]}>{' bet '}</Text>
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.match?.matchName
									? data?.match?.matchName
									: data?.match?.localTeamName +
									  ' vs ' +
									  data?.match?.visitorTeamName}
							</Text>
						</Text>
					)}

					{betType === 'CUSTOM_BET_RESULT' && (
						<Text style={[styles.usernameStyle]}>
							{'Your bet '}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{' has ended. Please verify the result.'}
						</Text>
					)}

					{betType === 'CUSTOM_BET_RESULT_TAKER' && (
						<Text style={[styles.usernameStyle]}>
							{'Your bet '}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{' has ended. Please provide the result and evidence.'}
						</Text>
					)}

					{betType === 'RESULT_VERIFICATION_BETMAKER' && (
						<Text style={[styles.usernameStyle]}>
							{'Your bet '}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{' has ended. Please provide a evidence.'}
						</Text>
					)}

					{betType === 'BET_RESULT_REVIEW' && (
						<Text style={[styles.usernameStyle]}>
							{'The bet '}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{
								' has ended and the creator has verified the result. Please review the result.'
							}
						</Text>
					)}

					{betType === 'BET_RESULT_CONFIRMATION' && (
						<Text style={[styles.usernameStyle]}>
							{data?.resultData?.isWinner === 'win'
								? 'Great! The result for your bet '
								: data?.resultData?.isWinner === 'draw' ||
								  data?.resultData?.isWinner === 'Void'
								? 'The result for your bet '
								: 'Oh no! The result for your bet '}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{data?.resultData?.isWinner === 'win'
								? ' has been accepted by your opponent. You just won ' +
								  Strings.str_dollor +
								  data?.resultData?.betWinningAmount +
								  '.'
								: data?.resultData?.isWinner === 'draw' ||
								  data?.resultData?.isWinner === 'Void'
								? ' has been accepted by your oponent. The bet has been made Void and the funds will be returned to your Wallet.'
								: ' has been accepted by your oponent. You just lost ' +
								  Strings.str_dollor +
								  data?.resultData?.betLossingAmount +
								  '.'}
						</Text>
					)}

					{betType === 'DISPUTE_EVIDENCE' && (
						<Text style={[styles.usernameStyle]}>
							{'Your oponent in your bet '}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{' has opened a dispute. Please provide evidence to your result.'}
						</Text>
					)}

					{betType === 'MATCH_CANCELLED' && (
						<Text style={[styles.usernameStyle]}>
							{`${
								data?.match_status === 'retired' ? 'Player' : 'Match'
							} for your bet `}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data?.bet?.betQuestion}
							</Text>
							{` has been ${data?.match_status}. You can cancel this bet to recover your funds.`}
						</Text>
					)}
					<Text style={styles.userTypeStyle}>
						{/* {dateTimeStreamingConvert(
              parseFloat(new Date(data?.createdAt).getTime()),
            ).toUpperCase()} */}
						{moment(parseFloat(new Date(data?.createdAt).getTime())).fromNow(
							true
						) + ' ago'}
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
		paddingHorizontal: verticalScale(14)
		// alignItems: 'center',
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
