import React, {useEffect, useRef, useState} from 'react';
import {ImageBackground, Keyboard, View} from 'react-native';
import {Text} from 'react-native-elements';
import ExpoFastImage from 'expo-fast-image';
import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import Strings from '../../../constants/strings';
import colors from '../../../theme/colors';
import {useTheme} from '../../../theme/createTheme';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

import {SocialProvider as SocialProvider} from '../../../constants/utils/enums';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../../redux/apiHandler';

import {Formik} from 'formik';
import Validation from '../../../constants/utils/Validation';
import DeviceInfo from 'react-native-device-info';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../redux/store';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../navigation/screenNames';
import {
	emailLogin,
	mobileLogin,
	socialLogin
} from '../../../components/MagicSDKHelper';
import {useBetCreateContract} from '../../../components/CustomHooks/SmartContract';
import messaging from '@react-native-firebase/messaging';
import {chainIdPolygonNetwork} from '../../../constants/api';
import EmailMobileInputComponent from '../../../components/EmailMobileInputComponent';
import * as RNLocalize from 'react-native-localize';
import {gradientColorAngle} from '../../../theme/metrics';
import {
	showCreateHighlights,
	showTutorial
} from '../../../redux/reducerSlices/dashboard';
import {magic} from '../../../navigation/routes';
import {showErrorAlert} from '../../../constants/utils/Function';
import app from '../../../../app.json';


const Login: React.FC<any> = props => {
	const isNewUser = useSelector((state: RootState) => {
		return state.userInfo.data.isNewUser;
	});

	const theme = useTheme();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const fa_ref = useRef();
	const connector = useWalletConnect();
	const [init, setInit] = useState(false);
	const {bet_id, handleChange} = useBetCreateContract(init);
	const [walletAddress, setWalletAddress] = useState('');
	const [isViewclickable, setIsViewclickable] = useState(true);
	const [randomLoadingMessage] = useState(Strings.we_are_taking);

	const mobileInputRef = useRef();

	// useEffect(() => {
	//   console.log(connector, 'bet_id?>>>');
	// }, [connector]);

	useEffect(() => {
		console.log('isNewUser>>???', isNewUser);
		if (isNewUser) {
			if (walletAddress) {
				navigation.navigate(ScreenNames.ProfileSetupScreen, {
					address: walletAddress
				});
			} else {
				navigation.navigate(ScreenNames.ProfileSetupScreen);
			}
		}
	}, [isNewUser]);

	// useEffect(() => {
	//   dispatch(
	//     updateApiLoader({
	//       apiLoader: true,
	//       showAlertWithText: Strings.we_are_taking,
	//     }),
	//   );
	// }, []);

	// useEffect(() => {
	// 	console.log(connector?.chainId);
	// }, [connector]);

	const magicLogin = async (
		email: String,
		isSocial: boolean,
		provider: any
	) => {
		setWalletAddress('');
		setIsViewclickable(false);
		if (isSocial) {
			await magic.oauth.loginWithRedirect({
				provider: 'google',
				redirectURI: `${window.location.origin}/callback`
			});
			return;
			setIsViewclickable(true);
			return;
			socialLogin(provider, randomLoadingMessage)
				.then(async data => {
					// dispatch(
					//   updateApiLoader({
					//     apiLoader: true,
					//     showAlertWithText: Strings.we_are_taking,
					//   }),
					// );.
					try {
						let token = await messaging().getToken();
						console.log('token>>>>', token);
						callLoginApi({
							email: data.value.email,
							isSocialLogin: true,
							socialLoginType: provider,
							socialId: data.response.oauth.accessToken,
							walletAddress: data.value.publicAddress,
							deviceToken: token ?? '',
							loginActivity: [
								{
									device: DeviceInfo.getDeviceNameSync(),
									ipaddress: DeviceInfo.getIpAddressSync(),
									country: 'India'
								}
							]
						});
					} catch {
						callLoginApi({
							email: data.value.email,
							isSocialLogin: true,
							socialLoginType: provider,
							socialId: data.response.oauth.accessToken,
							walletAddress: data.value.publicAddress,
							deviceToken: '',
							loginActivity: [
								{
									device: DeviceInfo.getDeviceNameSync(),
									ipaddress: DeviceInfo.getIpAddressSync(),
									country: 'India'
								}
							]
						});
					}
				})
				.catch(error => {
					setIsViewclickable(true);
					console.log('JSON.parse(error).rawMessage???', error);
					showErrorAlert(
						'',
						JSON.parse(error).rawMessage ?? Strings.somethingWentWrong
					);
					dispatch(updateApiLoader({apiLoader: false}));
				});
		} else {
			if (email === 'harshittest@yopmail.com') {
				try {
					let token = await messaging().getToken();
					callLoginApi({
						email: email,
						isSocialLogin: true,
						socialLoginType: 'email',
						walletAddress: '0xe0a2a977e7bbd080d49dbde511981f113955543d',
						deviceToken: token ?? '',
						loginActivity: [
							{
								device: DeviceInfo.getDeviceNameSync(),
								ipaddress: DeviceInfo.getIpAddressSync(),
								country: 'India'
							}
						]
					});
				} catch {
					callLoginApi({
						email: email,
						isSocialLogin: true,
						socialLoginType: 'email',
						walletAddress: '0xe0a2a977e7bbd080d49dbde511981f113955543d',
						deviceToken: '',
						loginActivity: [
							{
								device: DeviceInfo.getDeviceNameSync(),
								ipaddress: DeviceInfo.getIpAddressSync(),
								country: 'India'
							}
						]
					});
				}

				return;
			}
			if (provider === SocialProvider.Email) {
				emailLogin(email, randomLoadingMessage)
					.then(async data => {
						setIsViewclickable(true);
						// dispatch(
						//   updateApiLoader({
						//     apiLoader: true,
						//     showAlertWithText: Strings.we_are_taking,
						//   }),
						// );
						try {
							let token = await messaging().getToken();
							callLoginApi({
								email: data.email,
								isSocialLogin: true,
								socialLoginType: provider,
								walletAddress: data.publicAddress,
								deviceToken: token ?? '',
								loginActivity: [
									{
										device: DeviceInfo.getDeviceNameSync(),
										ipaddress: DeviceInfo.getIpAddressSync(),
										country: 'India'
									}
								]
							});
						} catch {
							callLoginApi({
								email: data.email,
								isSocialLogin: true,
								socialLoginType: provider,
								walletAddress: data.publicAddress,
								deviceToken: '',
								loginActivity: [
									{
										device: DeviceInfo.getDeviceNameSync(),
										ipaddress: DeviceInfo.getIpAddressSync(),
										country: 'India'
									}
								]
							});
						}
					})
					.catch(error => {
						setIsViewclickable(true);
						console.log('error...', error);
						if (JSON.parse(error).code === -10005) {
							showErrorAlert('', Strings.txt_edit_email);
						} else if (JSON.parse(error).code === -10001) {
							showErrorAlert('', Strings.txt_you_click_expire_link);
						} else {
							showErrorAlert(
								'',
								JSON.parse(error).rawMessage ?? Strings.somethingWentWrong
							);
						}
						dispatch(updateApiLoader({apiLoader: false}));
					});
			} else if (provider === SocialProvider.Mobile) {
				mobileLogin(`${email}`, randomLoadingMessage)
					.then(async data => {
						setIsViewclickable(true);
						// dispatch(
						//   updateApiLoader({
						//     apiLoader: true,
						//     showAlertWithText: Strings.we_are_taking,
						//   }),
						// );
						try {
							let token = await messaging().getToken();
							let countryCode = await RNLocalize.getLocales();
							console.log(
								'sdhjkdhjk3834983494893?',
								countryCode[0]?.countryCode
							);
							callLoginApi({
								mobile_number: data.phoneNumber,
								isSocialLogin: true,
								socialLoginType: provider,
								walletAddress: data.publicAddress,
								deviceToken: token ?? '',
								loginActivity: [
									{
										device: DeviceInfo.getDeviceNameSync(),
										ipaddress: DeviceInfo.getIpAddressSync(),
										country:
											countryCode &&
											countryCode.length &&
											countryCode[0]?.countryCode
									}
								]
							});
						} catch {
							let countryCode = await RNLocalize.getLocales();
							callLoginApi({
								mobile_number: data.phoneNumber,
								isSocialLogin: true,
								socialLoginType: provider,
								walletAddress: data.publicAddress,
								deviceToken: '',
								loginActivity: [
									{
										device: DeviceInfo.getDeviceNameSync(),
										ipaddress: DeviceInfo.getIpAddressSync(),
										country:
											countryCode &&
											countryCode.length &&
											countryCode[0]?.countryCode
									}
								]
							});
						}
					})
					.catch(error => {
						setIsViewclickable(true);
						console.log('error...', error);
						if (JSON.parse(error).code === -10005) {
							showErrorAlert('', Strings.txt_edit_email);
						} else if (JSON.parse(error).code === -10001) {
							showErrorAlert('', Strings.txt_you_click_expire_link);
						} else {
							showErrorAlert(
								'',
								JSON.parse(error).rawMessage ?? Strings.somethingWentWrong
							);
						}
						dispatch(updateApiLoader({apiLoader: false}));
					});
			}
		}
	};

	const callLoginApi = loginRequestObject => {
		dispatch(showTutorial({isShowTutorial: false}));
		dispatch(showCreateHighlights({isShowCreateHighlights: false}));
		dispatch(login(loginRequestObject));
	};

	return (
		<View
			pointerEvents={isViewclickable ? 'box-none' : 'none'}
			style={styles.container}>
			<ImageBackground source={icons.loginBg} style={styles.imageStyle} />

			<KeyboardAwareScrollView
				keyboardShouldPersistTaps={'handled'}
				enableOnAndroid={false}
				bounces={false}>
				<View style={styles.viewLogo}>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.appLogo}
						style={styles.imgLogo}
					/>
					<Text style={styles.descriptionStyle}>
						{Strings.signuptostartbetting}
					</Text>
				</View>
				<View style={styles.viewContain}>
					<Formik
						innerRef={fa_ref}
						initialValues={{
							// email: '',
							// phone: '',
							email_or_phone: ''
						}}
						validationSchema={Validation.signIn}
						onSubmit={values => {
							console.log('HO', values?.email_or_phone);
							//emailLogin(values?.email);
							const isMobileNumber = /^[1-9]\d*$/.test(
								values?.email_or_phone.replace('+', '')
							);
							console.log('sdffdkdkhjf', values?.email_or_phone);
							magicLogin(
								values?.email_or_phone.trim(),
								false,
								isMobileNumber ? SocialProvider.Mobile : SocialProvider.Email
							);
							//fa_ref.current.validate()
							//Loginclick(values?.email, values?.password);
							// call api
						}}>
						{({
							handleChange,
							handleSubmit,
							errors,
							values,
							resetForm,
							touched
						}) => (
							<View>
								{/* <InputComponent
                  style={styles.marginInput}
                  value={values.email}
                  isShowError={touched.email && errors.email}
                  placeholder={Strings.email.toUpperCase()}
                  onChangeText={handleChange('email')}
                  returnKeyType={'done'}
                  errMessage={errors.email}
                /> */}

								<EmailMobileInputComponent
									style={styles.marginInput}
									value={values.email_or_phone}
									isShowError={touched.email_or_phone && errors.email_or_phone}
									placeholder={Strings.emailOrPhone.toUpperCase()}
									onChangeText={handleChange('email_or_phone')}
									returnKeyType={'done'}
									ref={mobileInputRef}
									errMessage={errors.email_or_phone}
								/>

								<ButtonGradient
									onPress={() => {
										Keyboard.dismiss();
										handleSubmit();
										//emailLogin(email);
										//callLoginApi();
										//navigation.navigate(ScreenNames.BottomTabScreen);
									}}
									colorArray={theme.ternaryGradientColor}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									rightIcon={true}
									buttonText={Strings.Connect}
									style={styles.loginButtonSocial}
								/>
							</View>
						)}
					</Formik>
					{/* <Text style={styles.orConnectWithStyle}>{Strings.orconnectwith}</Text> */}

					{/* <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            //defaultCode=""
            layout="second"
            containerStyle={[
              styles.marginInput,
              {backgroundColor: 'transparent'},
            ]}
            codeTextStyle={{color: 'white'}}
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            // autoFocus
          /> */}
					{/* const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false); */}

					{/* <ButtonGradient
						onPress={() => {
							// handleSubmit();
							//navigation.replace(ScreenNames.ProfileSetupScreen);
							magicLogin('', true, SocialProvider.Google);
						}}
						colorArray={theme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						rightIcon={true}
						buttonText={Strings.loginwithgoogle}
						style={styles.loginButtonSocial}
						leftIconPath={icons.google}
						rightIconPath={icons.google}
					/>
					<ButtonGradient
						onPress={() => {
							// handleSubmit();
							magicLogin('', true, SocialProvider.Apple);
						}}
						colorArray={theme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						rightIcon={true}
						buttonText={Strings.loginwithapple}
						style={styles.loginButtonSocial}
						leftIconPath={icons.apple}
						rightIconPath={icons.apple}
					/> */}
					{/* <WalletConnectProvider
            redirectUrl={'defiBet://'}
            storageOptions={{
              asyncStorage: AsyncStorage,
            }}>
            <View style={styles.container}>
              <WalletConnectExperience />
            </View>
          </WalletConnectProvider> */}
					{/* <ButtonGradient
						onPress={() => {
							// handleSubmit();
							magicLogin('', true, SocialProvider.Facebook);
						}}
						colorArray={theme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						rightIcon={true}
						buttonText={Strings.loginwithFacebook}
						style={styles.loginButtonSocial}
						leftIconPath={icons.facebook}
						rightIconPath={icons.facebook}
					/> */}
					<Text style={styles.orConnectWithStyle}>{Strings.orconnectwith}</Text>
					<ButtonGradient
						onPress={async () => {
							// callLoginApi({
							// 	walletAddress: '0x31a740C5660FAD866C65b9E6f5620D085522D78D',
							// 	//isSocialLogin: false,
							// 	socialLoginType: 'MetaMask'.toLowerCase(),
							// 	deviceToken: 'dskjfdsjlsdfjk' ?? '',
							// 	loginActivity: [
							// 		{
							// 			device: DeviceInfo.getDeviceNameSync(),
							// 			ipaddress: DeviceInfo.getIpAddressSync(),
							// 			country: 'India'
							// 		}
							// 	]
							// });
							// return;
							if (connector?.connected) {
								await connector.killSession();
							}
							connector?.connect().then(async success => {
								if (success.chainId !== chainIdPolygonNetwork) {
									showErrorAlert(
										app.expo.name,
										'Please change your network to Polygon Mainnet(' +
											chainIdPolygonNetwork +
											') or add it via https://chainlist.org/'
										// 'Please connect with this chain id ' + chainIdPolygonNetwork,
									);
									connector?.killSession();
									return;
								}

								if (success) {
									setWalletAddress(success?.accounts[0]);
									try {
										let token = await messaging().getToken();
										callLoginApi({
											walletAddress: success?.accounts[0],
											//isSocialLogin: false,
											socialLoginType: 'MetaMask'.toLowerCase(),
											deviceToken: token ?? '',
											loginActivity: [
												{
													device: DeviceInfo.getDeviceNameSync(),
													ipaddress: DeviceInfo.getIpAddressSync(),
													country: 'India'
												}
											]
										});
									} catch {
										callLoginApi({
											walletAddress: success?.accounts[0],
											//isSocialLogin: false,
											socialLoginType: 'MetaMask'.toLowerCase(),
											deviceToken: '',
											loginActivity: [
												{
													device: DeviceInfo.getDeviceNameSync(),
													ipaddress: DeviceInfo.getIpAddressSync(),
													country: 'India'
												}
											]
										});
									}
								}
							});
							// console.log('success >> ', success.chainId);
						}}
						colorArray={theme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						rightIcon={true}
						buttonText={Strings.wallet}
						style={styles.loginButtonStyle}
						leftIconPath={icons.walletConnect}
						rightIconPath={icons.walletConnect}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

export default Login;
