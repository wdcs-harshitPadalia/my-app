import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
// import FastImage from 'react-native-fast-image';
import ExpoFastImage from 'expo-fast-image';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import GradientText from '../../../components/GradientText';
import HeaderComponent from '../../../components/HeaderComponent';
import InputComponent from '../../../components/InputComponent';
import Strings from '../../../constants/strings';
import {
	editProfile,
	getUserProfile
} from '../../../redux/apiHandler/apiActions';
import {RootState} from '../../../redux/store';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';

const ReferralProgramScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [referralCode, setReferralCode] = useState('');
	const [isShowError, setIsShowError] = useState(false);

	const submitReferralCodeData = () => {
		if (referralCode) {
			const requestObject = {
				friendsAffiliateCode: referralCode
			};
			dispatch(editProfile(requestObject));
		}
	};

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	useUpdateEffect(() => {
		dispatch(getUserProfile({}));
	}, [userInfo]);

	return (
		<SafeAreaView style={styles.container} edges={['bottom', 'top']}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.referral_program}
					onLeftIconPath={icons.back}
				/>
				<View style={styles.viewReferral}>
					<Text style={styles.textTitle}>{Strings.your_referral_code}</Text>
					<View style={styles.viewCode}>
						<Text style={styles.codeText}>{userInfo?.user?.affiliateCode}</Text>
						<TouchableOpacity
							hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
							onPress={async () => {
								await Clipboard.setString(userInfo?.user?.affiliateCode);
								Alert.alert(Strings.copy_wallet_add_desc);
							}}>
							<ExpoFastImage style={styles.imageStyle} source={icons.clipboard} />
						</TouchableOpacity>
					</View>
					<Text style={styles.codeDesText}>{Strings.referral_des}</Text>
				</View>

				{userInfo?.user?.referralUserInfo &&
				Object.keys(userInfo?.user?.referralUserInfo).length !== 0 ? (
					<View style={styles.viewAlreadyReferral}>
						<Text style={styles.referralText}>{Strings.referral_buddy}</Text>
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={styles.referralText}>
							{`@${userInfo?.user?.referralUserInfo?.userName}`}
						</GradientText>
					</View>
				) : (
					<View style={styles.viewReferral}>
						<Text style={styles.textTitle}>{Strings.enter_a_friends_code}</Text>
						<InputComponent
							placeholder={Strings.enter_a_friends_code.toUpperCase()}
							onChangeText={(text: string) => {
								if (text) {
									setIsShowError(false);
								} else {
									setIsShowError(true);
								}
								setReferralCode(text);
							}}
							errMessage={Strings.enter_a_friends_code}
							isShowError={isShowError}
						/>
						<ButtonGradient
							onPress={submitReferralCodeData}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.enter}
							style={styles.marginInput}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

export default ReferralProgramScreen;
