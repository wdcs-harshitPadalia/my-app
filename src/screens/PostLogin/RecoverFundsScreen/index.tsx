import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {styles} from './styles';
import HeaderComponent from '../../../components/HeaderComponent';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import {HeaderView} from '../../../components/HeaderView';
import ExpoFastImage from 'expo-fast-image';
import ButtonGradient from '../../../components/ButtonGradient';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import ScreenNames from '../../../navigation/screenNames';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import {editProfile} from '../../../redux/apiHandler/apiActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBetCreateContract} from '../../../components/CustomHooks/SmartContract';
import {gradientColorAngle} from '../../../theme/metrics';

const RecoverFundsScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const {params} = useRoute();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const {
		getJuryStrike,
		strike,
		strikePercentage,
		getJuryTokensShare,
		userInitialStake,
		juryDbethToken,
		withdrawAddress,
		claimJuryStackAmount,
		juryVersion,
		getJuryVersion
	} = useBetCreateContract(false);

	const [availableStake, setAvilableStake] = useState('');

	useUpdateEffect(() => {
		navigation.navigate(ScreenNames.SettingsScreen);
	}, [userInfo]);

	useEffect(() => {
		userInitialStake();
		getJuryVersion();
	}, []);

	useUpdateEffect(() => {
		if (juryDbethToken) {
			if (juryDbethToken === 'Error') {
				console.log('User denied metamask access');
			} else {
				getJuryStrike();
			}
		}
	}, [juryDbethToken]);

	useUpdateEffect(() => {
		if (strike && juryVersion) {
			console.log('strike level', strike, juryDbethToken);
			if (strike == 0) {
				setAvilableStake(juryDbethToken);
			} else if (strike == 4) {
				setAvilableStake(0);
			} else {
				getJuryTokensShare(strike, juryVersion);
			}
		}
	}, [strike, juryVersion]);

	useUpdateEffect(() => {
		if (strikePercentage) {
			if (strikePercentage === 'Error') {
				console.log('User denied metamask access');
			} else {
				console.log('setAvilableStake', strikePercentage);
				setAvilableStake(
					parseFloat(juryDbethToken) -
						(parseFloat(juryDbethToken) * parseFloat(strikePercentage)) / 100
				);
			}
		}
	}, [strikePercentage]);

	useEffect(() => {
		if (
			withdrawAddress &&
			withdrawAddress !== 'Error' &&
			withdrawAddress !== ''
		) {
			handleRecoverButtonClick();
		}
	}, [withdrawAddress]);

	const handleRecoverButtonClick = () => {
		if (params?.isFromSettings) {
			return;
		}

		const requestObject = {
			isJury: false,
			juryEscrowDeposit: availableStake,
			juryEscrowContractAddress: withdrawAddress
		};

		dispatch(editProfile(requestObject));
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={
						params?.isFromSettings
							? Strings.recover_fund
							: Strings.resign_recover_fund
					}
					// onSettingIconPath={icons.setting}
					// onSettingMenuPress={() => {
					//   setOpenBottomSheet(true);
					// }}
				/>

				{/* <HeaderView
          title={
            params?.isFromSettings
              ? Strings.recover_fund
              : Strings.resign_recover_fund
          }
          fontSize={24}
        /> */}

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<ExpoFastImage style={styles.image} source={icons.whistle} />
				</View>

				<View style={styles.descriptionContainer}>
					<Text style={styles.titleText}>{Strings.yoooo_buddy}</Text>
					<Text style={styles.descriptionText}>
						{Strings.resign_recover_fund_desc}
					</Text>

					<ButtonGradient
						style={styles.recoverButton}
						buttonText={Strings.recover_my_funds}
						buttonTextcolor={colors.white}
						colorArray={defaultTheme.primaryGradientColor}
						angle={gradientColorAngle}
						onPress={() => {
							claimJuryStackAmount();
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RecoverFundsScreen;
