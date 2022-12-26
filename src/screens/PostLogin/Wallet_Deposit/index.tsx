import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Linking } from "react-native";

import Collapsible from "react-native-collapsible";
import ExpoFastImage from "expo-fast-image";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";

import styles from "./style";
import colors from "../../../theme/colors";
import { defaultTheme } from "../../../theme/defaultTheme";
import { gradientColorAngle } from "../../../theme/metrics";

import icons from "../../../assets/icon";

import { widgetBaseUrl } from "../../../constants/api";
import Strings from "../../../constants/strings";
import ScreenNames from "../../../navigation/screenNames";
import { getTokenType } from "../../../redux/apiHandler/apiActions";
import { RootState } from "../../../redux/store";

import ButtonGradient from "../../../components/ButtonGradient";
import GetPrivateKey from "../../../components/GetPrivateKey";
import HeaderComponent from "../../../components/HeaderComponent";

export default function WalletDepositScreen() {
  const navigation = useNavigation();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });

  const [currencyData, setCurrencyData] = useState();
  const [isSelectCurrency, setIsSelectCurrency] = useState({});

  const [isPopupShow, setIsPopupShow] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [description, setDescription] = useState("");

  const [buttonAlpha, setButtonAlpha] = useState(false);

  const [isSecondLevelCollapsed, setIsSecondLevelCollapsed] = useState(true);
  const [showTokenSelectionPopup, setShowTokenSelectionPopup] = useState(false);
  const topTabData = [
    { id: 1, title: "All", badgeCount: "9" },
    { id: 2, title: "Bets", badgeCount: "4" },
    { id: 3, title: "Friends", badgeCount: "5" },
  ];

  useEffect(() => {
    getTokenTypeData();
  }, []);

  // const currencyData = [
  //   {
  //     id: 1,
  //     currency_short: 'ETH',
  //     currency: 'Ethereum',
  //     balance: '1,02',
  //   },
  //   {
  //     id: 1,
  //     currency_short: 'BTC',
  //     currency: 'Bitcoin',
  //     balance: '1,02',
  //   },
  //   {
  //     id: 1,
  //     currency_short: 'DOGE',
  //     currency: 'Dogecoin',
  //     balance: '1,02',
  //   },
  // ];

  const getTokenTypeData = () => {
    const uploadData = {};
    getTokenType(uploadData)
      .then((res) => {
        console.log("getTokenTypeData Response : ", JSON.stringify(res));
        setCurrencyData(res?.data.tokens);
        setIsSelectCurrency(res?.data.tokens[0]);
      })
      .catch((err) => {
        console.log("getTokenTypeData Data Err : ", err);
      });
  };

  const getPaymentUrl = () => {
    const walletAddress = userInfo?.user?.walletAddress;
    const cryptoHash = Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      "0x8001c03501d88c3Fa61a62786c91f6bdf15CcA0e" +
        "822c9e5f7149734f927c4b77cdc437cb"
    );

    let webUrl =
      widgetBaseUrl +
      "f49448ba-2a9b-438e-8bb6-fdbdb30f5818" +
      "&type=" +
      Strings.buy +
      "&return_url=" +
      Strings.defibetHouseUrl +
      "&address=" +
      walletAddress +
      "&signature=" +
      cryptoHash;

    return webUrl;
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <View style={styles.container}>
        <HeaderComponent
          onLeftMenuPress={() => {
            navigation.goBack();
          }}
          name={Strings.Deposit}
          onLeftIconPath={icons.back}
        />
        {/* <HeaderView fontSize={24} title={Strings.Deposit} /> */}
        {/* <CustomTopTabView dataSource={topTabData} /> */}
        <KeyboardAwareScrollView bounces={false}>
          <View style={styles.creditCardViewStyle}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              <LinearGradient
                style={[styles.buttonContainerStyle]}
                colors={["black", "black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonTitleText}>
                  {Strings.Polygon_Transfer}
                </Text>
                <ExpoFastImage source={icons.downGray} style={styles.img} />
              </LinearGradient>
            </TouchableOpacity>
            <Collapsible
              duration={400}
              easing="easeInOutCubic"
              align="center"
              collapsed={isCollapsed}
            >
              <View style={{ marginBottom: 16 }}>
                {/* <WalletAddressView
                  address={userInfo.user.walletAddress}
                  style={{
                    marginTop: verticalScale(0),
                    marginHorizontal: horizontalScale(0),
                    padding: 0,
                  }}
                  isHideTitle
                /> */}
                {/* <ButtonGradientWithRightIcon
                  colorArray={defaultTheme.ternaryGradientColor}
                  angle={gradientColorAngle}
                  rightIconPath={isSelectCurrency?.tokenImageUrl}
                  style={styles.marginInput}
                  short_name={isSelectCurrency?.short_name}
                  editable={false}
                  textValue={depositAmount}
                  btnDisabled={true}
                /> */}
                <ButtonGradient
                  colorArray={defaultTheme.secondaryGradientColor}
                  angle={gradientColorAngle}
                  onPress={async () => {
                    // setIsPopupShow(true);
                    // navigation.navigate(ScreenNames.TransakWebView, {
                    //   type: Strings.deposit,
                    // });
                    // Linking.openURL(getPaymentUrl());
                    await WebBrowser.openBrowserAsync(getPaymentUrl());
                  }}
                  buttonTextcolor={colors.white}
                  buttonText={Strings.deposit}
                  //rightIconPath={icons.Currency_Ethereum}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ marginTop: 16 }}
                  paddingVertical={20}
                />
              </View>
            </Collapsible>
          </View>
          {/* <Collapsible collapsed={isCollapsed}> */}
          {/* <View style={styles.creditCardViewStyle}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setIsCollapsed(!isCollapsed);
                if (!isSecondLevelCollapsed) {
                  setIsSecondLevelCollapsed(!isSecondLevelCollapsed);
                }
              }}>
              <LinearGradient
                style={[styles.buttonContainerStyle, {marginHorizontal: 0}]}
                colors={['black', 'black']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={[styles.buttonTitleText]}>
                  {Strings.Debit_Credit_Card}
                </Text>
                <ExpoFastImage source={icons.downGray} style={styles.img} />
              </LinearGradient>
            </TouchableOpacity>
            {showTokenSelectionPopup && (
              <TokenSelection
                data={currencyData}
                onClose={index => {
                  setShowTokenSelectionPopup(false);
                }}
              />
            )}
            <Collapsible
              easing="easeInOutCubic"
              duration={500}
              collapsed={isCollapsed}>
              <TouchableOpacity
                style={{paddingBottom: 20}}
                activeOpacity={1}
                onPress={() => {
                  //  setIsSecondLevelCollapsed(!isSecondLevelCollapsed);
                }}>
                <Text style={styles.buttonSubTitleText}>
                  {Strings.You_pay.toUpperCase()}
                </Text>
                <ButtonGradientWithRightIcon
                  colorArray={defaultTheme.ternaryGradientColor}
                  angle={gradientColorAngle}
                  buttonTextcolor={colors.white}
                  buttonText={'10'}
                  rightIconPath={icons.Currency_Ethereum}
                  onPress={() =>
                    setShowTokenSelectionPopup(!showTokenSelectionPopup)
                  }
                />
                <ExpoFastImage
                  style={styles.imgStyle}
                  source={icons.convertDownArrow}
                />
                <Text style={styles.buttonSubTitleText}>
                  {Strings.You_get.toUpperCase()}
                </Text>
                <ButtonGradientWithRightIcon
                  colorArray={defaultTheme.ternaryGradientColor}
                  angle={gradientColorAngle}
                  onPress={() =>
                    setShowTokenSelectionPopup(!showTokenSelectionPopup)
                  }
                  buttonTextcolor={colors.white}
                  buttonText={'0.0026'}
                  rightIconPath={icons.Currency_Ethereum}
                />
                <Text style={[styles.textStyle]}>1 ETH = 3.805,71 EUR</Text>
                {isSecondLevelCollapsed && (
                  <ButtonGradient
                    colorArray={defaultTheme.ternaryGradientColor}
                    angle={gradientColorAngle}
                    onPress={() =>
                      setIsSecondLevelCollapsed(!isSecondLevelCollapsed)
                    }
                    buttonTextcolor={colors.white}
                    buttonText={Strings.add_a_card}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{marginTop: 16}}
                    paddingVertical={20}
                  />
                )}
              </TouchableOpacity>
              <Collapsible
                duration={400}
                easing="easeInOutCubic"
                align="center"
                collapsed={isSecondLevelCollapsed}>
                <View style={{marginBottom: 16}}>
                  <GradientInputComponent
                    //style={{marginHorizontal: 20}}
                    colorArray={defaultTheme.ternaryGradientColor}
                    isSecureText={false}
                    keyboardType={'number-pad'}
                    isShowError={false}
                    returnKeyType={'done'}
                    placeholder={'0000 0000 0000 0000'}
                    placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
                  />
                  <View style={styles.inputView}>
                    <GradientInputComponent
                      style={{marginRight: 10, flex: 0.9}}
                      colorArray={defaultTheme.ternaryGradientColor}
                      isSecureText={false}
                      isShowError={false}
                      returnKeyType={'done'}
                      placeholder={'MM/YY'}
                      placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
                    />
                    <GradientInputComponent
                      style={{flex: 0.9}}
                      colorArray={defaultTheme.ternaryGradientColor}
                      isSecureText={false}
                      isShowError={false}
                      returnKeyType={'done'}
                      placeholder={'CVV'}
                      placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
                    />
                  </View>
                  <ButtonGradient
                    colorArray={defaultTheme.secondaryGradientColor}
                    angle={gradientColorAngle}
                    //onPress={() => setIsSecondLevelCollapsed(!isSecondLevelCollapsed)}
                    buttonTextcolor={colors.white}
                    buttonText={Strings.add_card_and_buy}
                    //rightIconPath={icons.Currency_Ethereum}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{marginTop: 16}}
                    paddingVertical={20}
                  />
                </View>
              </Collapsible>
            </Collapsible>
          </View> */}
        </KeyboardAwareScrollView>
        <GetPrivateKey
          setDescription={(description) => {
            setDescription(description);
            if (description.trim() !== "") {
              setButtonAlpha(true);
            } else {
              setButtonAlpha(false);
            }
          }}
          onPressOk={() => {
            setIsPopupShow(false);
            setButtonAlpha(false);
            navigation.navigate(ScreenNames.TransakWebView, {
              privateKey: description,
            });
          }}
          onPressCancel={() => {
            setIsPopupShow(false);
          }}
          isVisible={isPopupShow}
          isAlpha={buttonAlpha}
        />
      </View>
    </SafeAreaView>
  );
}
