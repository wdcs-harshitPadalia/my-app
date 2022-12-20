import React, {useEffect, useRef, useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Animated
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import ButtonGradient from './ButtonGradient';
import GradientText from './GradientText';
import {
	dateTimeConvert,
	getJuryVoteTimeLeft
} from '../constants/utils/Function';
import DropShadow from 'react-native-drop-shadow';

interface Props {
	data: any;
	onPressJuryCase: () => void;
	isActive: Boolean;
}

const VoteResultComponent = ({data}) => {
	return (
		<View style={{marginVertical: verticalScale(12)}}>
			<View>
				{/* 1 */}
				<View style={styles.voteResultLineContainer}>
					<Text style={styles.leftSideText}>{Strings.your_vote}</Text>
					<Text style={styles.rightSideText}>{data?.yourVote ?? '-'}</Text>
				</View>

				{/* 2 */}
				<View
					style={[
						styles.voteResultLineContainer,
						{
							backgroundColor: 'none',
							marginVertical: verticalScale(4)
						}
					]}>
					<Text style={styles.leftSideText}>{Strings.voting_result}</Text>
					<GradientText
						colors={defaultTheme.textGradientColor}
						style={[styles.rightSideText, {opacity: 1.0}]}>
						{data?.votingResult}
					</GradientText>
				</View>

				{/* 3 */}
				<View style={styles.voteResultLineContainer}>
					{Object.keys(data).includes('strikeLevel') ? (
						<>
							<Text style={styles.leftSideText}>{Strings.strike}</Text>
							<Text style={[styles.rightSideText, {opacity: 1.0}]}>
								{data?.strikeLevel}
							</Text>
						</>
					) : (
						<>
							<Text style={styles.leftSideText}>{Strings.reward}</Text>
							<Text style={[styles.rightSideText, {opacity: 1.0}]}>
								{data?.betWinningAmount + ' ' + data?.tokenType?.name}
							</Text>
						</>
					)}
				</View>
			</View>
		</View>
	);
};

const JuryCaseItemComponent = (props: Props) => {
	const {data, onPressJuryCase, isActive} = props;

	const [showVoteResult, setShowVoteResult] = useState(false);
	const [voteType, setVoteType] = useState('');

	useEffect(() => {
		console.log('data >> ', JSON.stringify(data));
	}, [data]);

	const fadeAnim = useRef(new Animated.Value(0)).current;

	const handleShowHideVoteResultDetails = () => {
		if (!showVoteResult) {
			setShowVoteResult(!showVoteResult);
			Animated.timing(fadeAnim, {
				toValue: verticalScale(100),
				duration: 500,
				useNativeDriver: false
			}).start();
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false
			}).start(({finished}) => {
				if (finished) {
					setShowVoteResult(!showVoteResult);
				}
			});
		}
	};

	const ButtonWithRigthIcon = () => (
		<TouchableOpacity
			style={styles.bottomPartButtonContainer}
			onPress={handleShowHideVoteResultDetails}>
			<Text
				style={[
					styles.bottomPartButtonText,
					{paddingVertical: verticalScale(8), marginHorizontal: 8}
				]}>
				{showVoteResult ? Strings.hide_details : Strings.see_details}
			</Text>
			<ExpoFastImage
				source={icons.downGray}
				style={{
					height: 8,
					width: 12,
					transform: [showVoteResult ? {rotate: '180deg'} : {rotate: '0deg'}]
				}}
			/>
		</TouchableOpacity>
	);

	return (
		<DropShadow style={dropShadowStyles(data?.isVoted).dropShadowContainer}>
			<TouchableOpacity activeOpacity={1} onPress={onPressJuryCase}>
				<View style={styles.container}>
					<View>
						<ImageBackground
							source={{
								uri:
									isActive === true
										? data?.activeCaseImage
										: data?.pastCasesImage
							}}
							style={styles.imageBg}>
							<View style={{marginHorizontal: horizontalScale(12)}}>
								<Text style={styles.timeText}>
									{dateTimeConvert(
										parseFloat(new Date(data?.betDetails?.createdAt).getTime())
									).toUpperCase()}
								</Text>

								<Text style={styles.titleText}>
									{data?.betDetails?.betQuestion}
								</Text>
								<Text style={styles.subTitleText}>
									{`${
										data?.betDetails?.categories &&
										data?.betDetails?.categories?.name
									} ${
										data?.betDetails?.subcategories
											? ' - ' + data?.betDetails?.subcategories?.name
											: ''
									} ${
										Object.keys(data?.betDetails).includes('match')
											? '- ' + data?.betDetails?.match?.leagueName
											: ''
									}`.toUpperCase()}
								</Text>
							</View>
						</ImageBackground>
					</View>

					<View style={styles.bottomPartContainer}>
						<View
							style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<View style={{justifyContent: 'center', flex: 0.5}}>
								<Text style={[styles.bottomPartTimeText]} numberOfLines={2}>
									{Object.keys(data).includes('isVoted')
										? 'Time left:-\n' +
										  getJuryVoteTimeLeft(data?.voteEndTime / 1000)
										: Strings.voting_finalized}
								</Text>
							</View>

							{Object.keys(data).includes('isVoted') ? (
								<View style={{flex: 0.5, justifyContent: 'center'}}>
									<ButtonGradient
										style={styles.bottomPartButtonContainer}
										buttonText={
											data.isVoted == false
												? Strings.pending_vote
												: Strings.voted
										}
										buttonTextcolor={colors.white}
										paddingVertical={8}
										textSize={12}
										colorArray={
											data.isVoted == false
												? defaultTheme.primaryGradientColor
												: [
														defaultTheme.backGroundColor,
														defaultTheme.backGroundColor
												  ]
										}
									/>
								</View>
							) : (
								<View style={{flex: 0.5, justifyContent: 'center'}}>
									<ButtonWithRigthIcon />
								</View>
							)}
						</View>

						{Object.keys(data).includes('isVoted') || (
							<Animated.View style={{height: fadeAnim}}>
								<VoteResultComponent data={data} />
							</Animated.View>
						)}
					</View>
				</View>
			</TouchableOpacity>
		</DropShadow>
	);
};

const dropShadowStyles = (props: any) =>
	StyleSheet.create({
		dropShadowContainer: {
			borderRadius: 12,
			shadowColor:
				props === false ? 'rgba(189, 0, 255, 1)' : 'rgba(61, 224, 35, 1)', // false = pending, true = voted
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowOpacity: 0.3,
			shadowRadius: 5,
			elevation: 5
		}
	});

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		backgroundColor: '#3F3F3F',
		overflow: 'hidden',
		marginBottom: verticalScale(20)
	},
	imageBg: {
		height: 120,
		justifyContent: 'center'
	},
	timeText: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '700',
		fontSize: moderateScale(12),
		opacity: 0.7
	},
	titleText: {
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateScale(14),
		marginVertical: verticalScale(14)
	},
	subTitleText: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '700',
		fontSize: moderateScale(10),
		opacity: 0.7,
		textTransform: 'uppercase'
	},
	bottomPartContainer: {
		flex: 1,
		// justifyContent: 'space-between',
		paddingVertical: verticalScale(10),
		paddingHorizontal: horizontalScale(8)
	},
	bottomPartTimeText: {
		// textAlign: 'center',
		color: colors.textTitle,
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateScale(14),
		textAlignVertical: 'center'
	},
	bottomPartButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#262626',
		marginLeft: horizontalScale(8),
		borderRadius: 8
		// marginHorizontal : horizontalScale(8)
	},
	bottomPartButtonText: {
		textTransform: 'uppercase',
		textAlign: 'center',
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '800',
		fontSize: moderateScale(12)
	},
	voteResultLineContainer: {
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(4),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#393939'
	},
	leftSideText: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '700',
		fontSize: moderateScale(12),
		opacity: 0.7
	},
	rightSideText: {
		textTransform: 'uppercase',
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateScale(14),
		opacity: 0.5
	}
});

export default JuryCaseItemComponent;
