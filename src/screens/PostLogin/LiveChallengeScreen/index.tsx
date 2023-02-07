import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {StackActions, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonGradient from '../../../components/ButtonGradient';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle, verticalScale} from '../../../theme/metrics';
import colors from '../../../theme/colors';
import WriteQuestionView from '../../../components/WriteQuestionView';
import SetLiveStreamDurationView from '../../../components/SetLiveStreamDurationView';
import {validationRegex} from '../../../constants/utils/Validation';
import {showErrorAlert} from '../../../constants/utils/Function';
import {addFeedUser} from '../../../redux/apiHandler/apiActions';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';

const LiveChallengeScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [step, setStep] = useState(1);

	const [streamName, setStreamName] = useState('');
	const [streamLink, setStreamLink] = useState('');

	const [liveStartTime, setLiveStartTime] = useState();
	const [liveEndTime, setLiveEndTime] = useState();

	const [isBackButtonDisable, setIsBackButtonDisable] = useState(true);

	const addFeedUserData = () => {
		dispatch(updateApiLoader({apiLoader: true}));

		let start_date_time = Date.parse(moment.utc(liveStartTime));
		let end_date_time = Date.parse(moment.utc(liveEndTime));
		if (Platform.OS === 'web') {
			start_date_time = Date.parse(liveStartTime);
			end_date_time = Date.parse(liveEndTime);
		}
		const channelName = streamLink
			.split('/')
			[streamLink.split('/')?.length - 1].split('?')[0];
		const uploadData = {
			feedUrl: `https://player.twitch.tv/?channel=${channelName}&parent=www.truly.fun`,
			start_date_time: start_date_time,
			end_date_time: end_date_time,
			feed_name: streamName
		};

		addFeedUser(uploadData)
			.then(res => {
				console.log('getUserBet Data res : ', res, 'res?.data?.message'),
					res?.data?.message;

				dispatch(updateApiLoader({apiLoader: false}));
				showErrorAlert('', res?.data?.message);
				if (res?.statusCode?.toString().includes('2')) {
					navigation.dispatch(StackActions.popToTop());
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={() => {
					navigation.dispatch(StackActions.popToTop());
				}}
				onLeftIconPath={icons.back}
				name={Strings.live_challenge}
			/>
			<View style={styles.viewContain}>
				<Text style={styles.titleStyle}>
					{step === 1
						? Strings.attach_the_stream
						: Strings.set_the_duration_of_the_stream}
				</Text>
				{step === 1 ? (
					<>
						<Text style={styles.subTitleStyle}>
							{Strings.attach_the_channel_link_des}
						</Text>
						<WriteQuestionView
							style={{marginTop: verticalScale(8)}}
							title={Strings.stream_name}
							textValue={streamName}
							question={value => {
								setStreamName(value);
								if (value.trim() !== '' && streamLink.trim() !== '') {
									setIsBackButtonDisable(false);
								} else {
									setIsBackButtonDisable(true);
								}
							}}
							placeholder={Strings.enter_a_stream_name}
						/>
						<WriteQuestionView
							style={{marginTop: verticalScale(16)}}
							title={Strings.stream_link}
							textValue={streamLink}
							question={value => {
								setStreamLink(value);
								if (value.trim() !== '' && streamName.trim() !== '') {
									setIsBackButtonDisable(false);
								} else {
									setIsBackButtonDisable(true);
								}
							}}
							placeholder={
								Strings.enter_a_stream_link +
								' in this format https://www.twitch.tv/channleName'
							}
						/>
					</>
				) : (
					<SetLiveStreamDurationView
						setSelectedDate={date => {
							setLiveStartTime(date);
							console.log('setSelectedDate ::', date);
							if (date) {
								setIsBackButtonDisable(false);
							} else {
								setIsBackButtonDisable(true);
							}
						}}
						selectedDate={liveStartTime}
						onTimePress={() => {
							setLiveStartTime(previousState => !previousState);
						}}
						setEndSelectedDate={date => {
							setLiveEndTime(date);
							console.log('setEndSelectedDate ::', date);
							if (date) {
								setIsBackButtonDisable(false);
							} else {
								setIsBackButtonDisable(true);
							}
						}}
						selectedEndDate={liveEndTime}
					/>
				)}
			</View>

			<View style={styles.viewBackButton}>
				<ButtonGradient
					onPress={() => {
						if (step === 2) {
							setStep(1);
							setIsBackButtonDisable(false);
						} else {
							navigation.dispatch(StackActions.popToTop());
						}
					}}
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={Strings.back}
					style={styles.backButton}
				/>
				<ButtonGradient
					onPress={() => {
						if (step === 1) {
							if (
								streamLink.startsWith('https://www.twitch.tv/') &&
								validationRegex.url.test(streamLink)
							) {
								if (streamLink === 'https://www.twitch.tv/') {
									showErrorAlert('', Strings.please_enter_valid_twitch_url);
								} else {
									setLiveStartTime();
									setLiveEndTime();

									setStep(2);
									setIsBackButtonDisable(true);
								}
							} else {
								showErrorAlert('', Strings.please_enter_valid_twitch_url);
							}
						} else {
							addFeedUserData();
						}
					}}
					colorArray={defaultTheme.secondaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={Strings.next}
					style={
						!isBackButtonDisable ? styles.nextButton : styles.nextButtonOpacity
					}
					btnDisabled={isBackButtonDisable}
				/>
			</View>
		</SafeAreaView>
	);
};

export default LiveChallengeScreen;
