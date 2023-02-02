import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonGradient from '../../../components/ButtonGradient';
import UserEngagementComponent from '../../../components/UserEngagementComponent';
import Strings from '../../../constants/strings';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';
import * as WebBrowser from 'expo-web-browser';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import * as Crypto from 'expo-crypto';
import {widgetBaseUrl} from '../../../constants/api';
import icons from '../../../assets/icon';
import ScreenNames from '../../../navigation/screenNames';
import {useNavigation, useRoute} from '@react-navigation/native';
import SelectImageComponet from '../../../components/SelectImageComponet';

const UserEngagementScreen = () => {
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const navigation = useNavigation();
	const params = useRoute().params;

	const [isMediaTypeVisible, setIsMediaTypeVisible] = useState(false);

	const getPaymentUrl = () => {
		const walletAddress = userInfo?.user?.walletAddress;
		const cryptoHash = Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			'0x8001c03501d88c3Fa61a62786c91f6bdf15CcA0e' +
				'822c9e5f7149734f927c4b77cdc437cb'
		);

		let webUrl =
			widgetBaseUrl +
			'f49448ba-2a9b-438e-8bb6-fdbdb30f5818' +
			'&type=' +
			Strings.buy +
			'&currencies=' +
			'MATIC' +
			'&return_url=' +
			Strings.defibetHouseUrl +
			'&address=' +
			walletAddress +
			'&signature=' +
			cryptoHash;

		return webUrl;
	};

	function onBtnSkipForP2p() {
		navigation.navigate(ScreenNames.BetsCategoryScreen);
	}
	const onBtnSkipForShortVideo = () => {
		setIsMediaTypeVisible(true);
	};
	const onBtnSkipForLiveChallenge = () => {
		navigation.navigate(ScreenNames.LiveChallengeScreen);
	};

	const p2pBetData = {
		title: Strings.create_a_challenge,
		description1: Strings.engage_your_audience_and_earn_up_to,
		description2: Strings.betting_fees_generated,
		highlightedText: '50%',
		image: icons.star_congrats
	};
	const liveChallenge = {
		title: Strings.create_a_live_challenge,
		description1: Strings.earn_up_to,
		description2: Strings.from_streaming_content,
		highlightedText: '20%',
		image: icons.star_congrats
	};

	const shortVideoData = {
		title: Strings.create_a_video_with_bet_attached,
		description1: Strings.engage_your_audience_and_earn_up_to,
		description2: Strings.betting_fees_generated,
		highlightedText: '50%',
		image: icons.star_congrats
	};

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<UserEngagementComponent
						data={
							params?.isForP2pBet
								? p2pBetData
								: params?.isForVideoCreation
								? shortVideoData
								: liveChallenge
						}
					/>
					<View style={styles.buttonView}>
						<ButtonGradient
							onPress={async () => {
								// navigation.navigate(ScreenNames.TransakWebView, {
								//   type: Strings.buy_crypto,
								// });
								// Linking.openURL(getPaymentUrl());
								await WebBrowser.openBrowserAsync(getPaymentUrl());
							}}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.top_up_with_credit_card}
							style={styles.nextButton}
						/>

						<TouchableOpacity
							onPress={() => {
								params?.isForP2pBet
									? onBtnSkipForP2p()
									: params?.isForVideoCreation
									? onBtnSkipForShortVideo()
									: onBtnSkipForLiveChallenge();
							}}>
							<Text style={styles.titleSkip}>{Strings.skip}</Text>
						</TouchableOpacity>
					</View>
				</View>

				<SelectImageComponet
					isVisible={isMediaTypeVisible}
					setIsVisible={setIsMediaTypeVisible}
					onPressGallery={() => {
						setIsMediaTypeVisible(!isMediaTypeVisible);
						params?.pickVideoFromGallery();
					}}
					onPressCamera={() => {
						setIsMediaTypeVisible(!isMediaTypeVisible);
						Platform.OS === 'web'
							? params?.pickVideoFromGallery()
							: navigation.navigate(ScreenNames.CameraPage);
					}}
					isHideAvatar={true}
				/>
			</SafeAreaView>
		</>
	);
};

export default UserEngagementScreen;
