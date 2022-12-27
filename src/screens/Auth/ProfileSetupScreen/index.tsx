import React, { useEffect, useRef, useState } from "react";
import { Alert, ImageBackground, Platform, View } from "react-native";
import { Text } from "react-native-elements";
import ExpoFastImage from "expo-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import icons from "../../../assets/icon";
import ButtonGradient from "../../../components/ButtonGradient";
import InputComponent from "../../../components/InputComponent";
import Strings from "../../../constants/strings";
import colors from "../../../theme/colors";
import { useTheme } from "../../../theme/createTheme";
import styles from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatepickerComponet from "../../../components/DatepickerComponet";
import CountryPickerComponent from "../../../components/CountryPickerComponent";
import { getInitialDate } from "../../../constants/utils/Function";
import { Formik } from "formik";
import Validation from "../../../constants/utils/Validation";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, logout } from "../../../redux/apiHandler/apiActions";
import { RootState } from "../../../redux/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenNames from "../../../navigation/screenNames";
import moment from "moment";
import SwichView from "../../../components/SwichView";
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import useUpdateEffect from "../../../components/CustomHooks/useUpdateEffect";
import {
  resetProfileData,
  updateBiometric,
  updateDeviceToken,
} from "../../../redux/reducerSlices/userInfo";
import HeaderComponent from "../../../components/HeaderComponent";
import { magic } from "../../../navigation/routes";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { SafeAreaView } from "react-native-safe-area-context";
import messaging from "@react-native-firebase/messaging";
import {
  gradientColorAngle,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../theme/metrics";
import {
  showCreateHighlights,
  showTutorial,
} from "../../../redux/reducerSlices/dashboard";
import DatePickerWeb from "../../../components/DatePickerWeb";
import { Fonts } from "../../../theme";

const ProfileSetupScreen: React.FC<any> = (props) => {
  const theme = useTheme();
  const [check, setCheck] = useState(false);
  const [date, setDate] = useState<Date>(getInitialDate());
  const [dateerror, setDateerror] = useState(false);
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [isSubmitted, setisSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const fa_ref = useRef();
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });
  const navigation = useNavigation();

  const params = useRoute().params;

  const callEditProfileApi = (requestObject) => {
    dispatch(showTutorial({ isShowTutorial: true }));
    dispatch(showCreateHighlights({ isShowCreateHighlights: true }));
    dispatch(editProfile(requestObject));
  };
  const [isBiometric, setIsBiometric] = useState(userInfo?.isBiometric);

  const [biometryType, setBiometryType] = useState();
  const connector = useWalletConnect();

  useEffect(() => {
    detectFingerprintAvailable();
  }, []);

  useUpdateEffect(() => {
    dispatch(updateBiometric(isBiometric));
  }, [isBiometric]);

  const detectFingerprintAvailable = () => {
    // FingerprintScanner.isSensorAvailable()
    // 	.then(biometry => {
    // 		setBiometryType(biometry);
    // 	})
    // 	.catch(error => console.log('isSensorAvailable error => ', error));
  };

  const getMessage = () => {
    if (biometryType == "Face ID") {
      return "Scan your Face on the device to continue";
    } else {
      return "Scan your Fingerprint on the device scanner to continue";
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDatePickerVisibility(false);

    console.log(
      "A date has been picked: ",
      date,
      moment(date).format("DD MMMM YYYY HH:mm")
    );
    setDate(moment(date).format("DD MMMM YYYY HH:mm"));
    hideDatePicker();
  };

  const showAuthenticationDialog = () => {};

  return (
    // <View style={styles.container}>
    <ImageBackground source={icons.loginBg} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent
          style={{ marginTop: 100 }}
          onLeftIconPath={icons.back}
          // onSendIconPath={icons.logout}
          //isSendBadge={true}
          onLeftMenuPress={async () => {
            dispatch(updateDeviceToken({ deviceToken: "" }));
            dispatch(resetProfileData({}));
            dispatch(logout());
            await magic.user.logout();
            connector?.killSession();
            navigation.goBack();
          }}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
          enableOnAndroid={false}
          bounces={false}
        >
          <View style={styles.viewContain}>
            <Text style={styles.titleStyle}>{Strings.setupyourprofile}</Text>
            <Formik
              innerRef={fa_ref}
              initialValues={{
                userName: "",
                email: userInfo?.user?.email ?? userInfo?.user?.mobile_number,
                country: "",
                isTermsAccepted: false,
                date: null,
              }}
              validationSchema={Validation.setupProfile}
              onSubmit={async (values) => {
                try {
                  //let token = await messaging().getToken();
                  console.log("HO", values.isTermsAccepted);
                  let requestObject = {};
                  if (userInfo?.user?.email || userInfo?.user?.mobile_number) {
                    requestObject = {
                      userName: values.userName,
                      country: values.country,
                      birthDate: moment(date).format("DD-MM-YYYY").toString(),
                      walletAddress: params?.address ?? undefined,
                      //deviceToken: userInfo.fcmToken ?? token
                    };
                  } else {
                    requestObject = {
                      email: values.email,
                      userName: values.userName,
                      country: values.country,
                      birthDate: moment(date).format("DD-MM-YYYY").toString(),
                      walletAddress: params?.address ?? undefined,
                      //deviceToken: userInfo.fcmToken ?? token
                    };
                  }
                  //console.log('userInfo.fcmToken>>>>', token);
                  callEditProfileApi(requestObject);
                } catch {
                  console.log("HO", values.isTermsAccepted);
                  let requestObject = {};
                  if (userInfo?.user?.email || userInfo?.user?.mobile_number) {
                    requestObject = {
                      userName: values.userName,
                      country: values.country,
                      birthDate: moment(date).format("DD-MM-YYYY").toString(),
                      walletAddress: params?.address ?? undefined,
                      //deviceToken: userInfo.fcmToken ?? ''
                    };
                  } else {
                    requestObject = {
                      email: values.email,
                      userName: values.userName,
                      country: values.country,
                      birthDate: moment(date).format("DD-MM-YYYY").toString(),
                      walletAddress: params?.address ?? undefined,
                      //deviceToken: userInfo.fcmToken ?? token
                    };
                  }
                  // console.log('userInfo.fcmToken>>>>', token);
                  callEditProfileApi(requestObject);
                }
                //emailLogin(values?.email);
                //fa_ref.current.validate()
                //Loginclick(values?.email, values?.password);
                // call api
              }}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                values,
                touched,
                resetForm,
              }) => (
                <View>
                  <InputComponent
                    style={styles.marginInput}
                    // valasdasue={''}
                    isSecureText={false}
                    isShowError={touched.userName && errors.userName}
                    title={Strings.username}
                    onChangeText={handleChange("userName")}
                    defaultValue={values.userName}
                    placeholder={Strings.username.toUpperCase()}
                    returnKeyType={"done"}
                    errMessage={errors.userName}
                    isUserName
                  />

                  <InputComponent
                    style={styles.marginInput}
                    // valasdasue={''}
                    isSecureText={false}
                    editable={
                      userInfo?.user?.email || userInfo?.user?.mobile_number
                        ? false
                        : true
                    }
                    isShowError={touched.email && errors.email}
                    onChangeText={handleChange("email")}
                    title={
                      userInfo?.user?.mobile_number
                        ? Strings.phone
                        : Strings.email
                    }
                    defaultValue={values.email}
                    placeholder={Strings.email.toUpperCase()}
                    returnKeyType={"done"}
                    errMessage={errors.email}
                  />

                  <CountryPickerComponent
                    style={styles.marginInput}
                    // valasdasue={''}
                    isSecureText={false}
                    isShowError={touched.country && errors.country}
                    title={Strings.country}
                    onSelectCountry={handleChange("country")}
                    defaultValue={values.country}
                    placeholder={Strings.selectCountry.toUpperCase()}
                    returnKeyType={"done"}
                    errMessage={errors.country}
                  />

                  {Platform.OS === "web" ? (
                    <View>
                      <Text
                        style={{
                          color: colors.textTitle,
                          fontSize: moderateScale(14),
                          fontFamily: Fonts.type.Inter_ExtraBold,
                          paddingHorizontal: horizontalScale(16),
                          paddingTop: verticalScale(20),
                          paddingBottom: Platform.OS === "ios" ? 0 : 6,
                        }}
                      >
                        {Strings.dateOfBirth}
                      </Text>
                      <View
                        style={{
                          marginHorizontal: horizontalScale(16),
                          paddingVertical: verticalScale(2),
                        }}
                      >
                        <DatePickerWeb
                          //selected={}
                          handleChange={(val) => {
                            setDate(val);
                            setisSubmitted(false);
                            values.date = val;
                            console.log("DatePickerWeb", val);
                          }}
                          isPickOnlyDate={true}
                          maximumDate={getInitialDate()}
                        />
                      </View>
                    </View>
                  ) : (
                    <DatepickerComponet
                      style={styles.marginInput}
                      value={date && date.toDateString()}
                      setDate={(value) => {
                        setDate(value);
                        setisSubmitted(false);
                        values.date = value;
                      }}
                      date={date}
                      //changed={handleChange('dob')}
                      rightIcon={true}
                      setDateerror={setDateerror}
                      isShowError={touched.date && !values.date}
                      errMessage={errors.date}
                      title={Strings.dateOfBirth}
                      rightIconPath={icons.calendar_today}
                      placeholder={Strings.pickDate.toUpperCase()}
                      isVisible={isVisible}
                      maximumDate={getInitialDate()}
                      mode={"date"}
                    />
                  )}
                  {/* <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={moment(new Date()).add(5, 'minute').toDate()}
                    display={Platform.OS === 'ios' ? 'spinner' : ''}
                    isDarkModeEnabled={false}
                    themeVariant="light"
                    date={date}
                    //minuteInterval={15}
                    //disabledDays={{after: new Date()}}
                  /> */}
                  <View style={styles.viewCheckboxStyle}>
                    <TouchableOpacity
                      onPress={() => {
                        setCheck(!check);
                        //handleChange('isTermsAccepted', value => {
                        values.isTermsAccepted = !values.isTermsAccepted;
                        // });
                        // navigation.navigate(Navigation.CMSScreen, {
                        //   isScreen: 'term',
                        // });
                      }}
                    >
                      <ExpoFastImage
                        style={styles.imgIconStyle}
                        source={
                          Platform.OS === "web"
                            ? !check
                              ? icons.unCheck
                              : icons.checkbox
                            : !values.isTermsAccepted
                            ? icons.unCheck
                            : icons.checkbox
                        }
                        // resizeMode={'cover'}
                      />
                    </TouchableOpacity>

                    <View style={styles.acceptTextViewStyle}>
                      <Text>
                        <Text style={styles.acceptStyle}>
                          {Strings.acceptandagree}
                        </Text>
                        <Text
                          onPress={() => {
                            navigation.navigate(ScreenNames.CMSScreen, {
                              screenName: "terms-and-conditions",
                            });
                            // Linking.openURL('https://google.com');
                          }}
                          style={styles.underlineStyle}
                        >
                          {Strings.termsAndConditions}
                        </Text>
                        <Text style={{ color: colors.white }}>{", "}</Text>
                        <Text
                          style={styles.underlineStyle}
                          onPress={() => {
                            navigation.navigate(ScreenNames.CMSScreen, {
                              screenName: "rules",
                            });
                            // Linking.openURL('https://google.com');
                          }}
                        >
                          {Strings.rules}
                        </Text>
                        <Text style={{ color: colors.white }}>{", "}</Text>
                        <Text
                          style={styles.underlineStyle}
                          onPress={() => {
                            navigation.navigate(ScreenNames.CMSScreen, {
                              screenName: "privacy-policy",
                            });
                            // Linking.openURL('https://google.com');
                          }}
                        >
                          {Strings.privacyPolicy}
                        </Text>
                        <Text style={{ color: colors.white }}>{"."}</Text>
                      </Text>
                    </View>
                  </View>
                  {!values.isTermsAccepted && touched.isTermsAccepted && (
                    <Text style={styles.errorStyle}>
                      {errors.isTermsAccepted}
                    </Text>
                  )}
                  {biometryType !== null && biometryType !== undefined && (
                    <SwichView
                      toggleSwitch={() => showAuthenticationDialog()}
                      title={Strings.enable_biometric_id_to_open_defibet.toUpperCase()}
                      isEnabled={isBiometric}
                    />
                  )}

                  <ButtonGradient
                    onPress={() => {
                      //setisSubmitted(true);
                      handleSubmit();
                    }}
                    colorArray={theme.secondaryGradientColor}
                    angle={gradientColorAngle}
                    buttonTextcolor={colors.white}
                    rightIcon={true}
                    buttonText={Strings.submit}
                    style={styles.loginButtonStyle}
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
    // </View>
  );
};

export default ProfileSetupScreen;
