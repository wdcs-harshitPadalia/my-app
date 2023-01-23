import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {colors} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../../assets/icon';
import ButtonGradient from '../../../../components/ButtonGradient';
import HeaderComponent from '../../../../components/HeaderComponent';
import {HeaderView} from '../../../../components/HeaderView';
import EvidenceType from '../../../../components/Dispute/EvidenceTypeView';
import Strings from '../../../../constants/strings';
import ScreenNames from '../../../../navigation/screenNames';
import {defaultTheme} from '../../../../theme/defaultTheme';
import {styles} from './style';
import {getUserBetResult} from '../../../../redux/apiHandler/apiActions';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {gradientColorAngle} from '../../../../theme/metrics';

const OpenDisputeScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const {params} = useRoute();
	const {
		bet_id,
		winnerOption,
		contractAddress,
		amount,
		bet_contract_address,
		isOpenDispute,
		isAlreadyPaid
	} = params;

	const [isSendButtonDisable, setSendButtonDisable] = useState(true);

	const evidenceTypeRef = useRef();
	const [eventBetData, setEventBetData] = useState();

	const handleSendButtonDisable = (data: boolean) => {
		setSendButtonDisable(data);
	};
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	useEffect(() => {
		console.log('hssdhjadsshj', amount);
		getUserBetResultData();
	}, [bet_id]);

	const getUserBetResultData = () => {
		const uploadData = {
			bet_id: bet_id
		};
		getUserBetResult(uploadData)
			.then(res => {
				// console.log('getUserBetResult????????????', res);
				const betObj = res?.data?.bet;
				setEventBetData(betObj);
			})
			.catch(err => {
				console.log('getUserBet Data Err : ', err);
			});
	};

	const navigateToThankYouScreen = () => {
		navigation.navigate(ScreenNames.DisputeThankYouScreen, {
			title: Strings.you_open_dispute,
			subTitle: Strings.we_will_review_evidence
		});
	};

	const navigateToNotification = () => {
		navigation.navigate(ScreenNames.NotificationScreen);
	};

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backAction);

		return () =>
			BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, []);

	const backAction = () => {
		navigateToThankYouScreen();
		return true;
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.dispute_open}
					onLeftIconPath={icons.back}
				/>
				<View>
					<HeaderView title={Strings.openDispute} />
				</View>

				<EvidenceType
					isOpenDispute={isOpenDispute}
					betUserId={eventBetData?.user_id}
					myCase={
						eventBetData?.user_id === userInfo.user?._id
							? eventBetData?.bet_creator_side_option_index + 1
							: eventBetData?.bet_opposite_side_option_index + 1
					}
					betId={bet_id}
					bet_contract_address={bet_contract_address}
					winnerOption={winnerOption}
					ref={evidenceTypeRef}
					handleSendButtonDisable={handleSendButtonDisable}
					navigateToThankYouScreen={navigateToThankYouScreen}
					contractAddress={contractAddress}
					amount={amount}
					isAlreadyPaid={isAlreadyPaid}
					navigateToNotification={navigateToNotification}
				/>

				<View style={styles.bottomButtonContainer}>
					<ButtonGradient
						style={styles.cancleButton}
						buttonText={Strings.cancel}
						buttonTextcolor={colors.white}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						onPress={() => {
							navigation.goBack();
						}}
					/>
					<ButtonGradient
						style={styles.sendButton}
						buttonText={Strings.send}
						buttonTextcolor={colors.white}
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						btnDisabled={isSendButtonDisable}
						onPress={() => evidenceTypeRef.current.signDispute()}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default OpenDisputeScreen;
