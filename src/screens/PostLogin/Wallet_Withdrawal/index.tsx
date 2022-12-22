import React, { useState } from "react";
import { TouchableOpacity, View, Text, Linking } from "react-native";

import Collapsible from "react-native-collapsible";
import ExpoFastImage from "expo-fast-image";
import * as Crypto from "expo-crypto";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import ScreenNames from "../../../navigation/screenNames";

import styles from "./style";

import colors from "../../../theme/colors";
import { defaultTheme } from "../../../theme/defaultTheme";
import { gradientColorAngle } from "../../../theme/metrics";

import icons from "../../../assets/icon";

import { widgetBaseUrl } from "../../../constants/api";
import Strings from "../../../constants/strings";
import { RootState } from "../../../redux/store";

import ButtonGradient from "../../../components/ButtonGradient";
import HeaderComponent from "../../../components/HeaderComponent";

export default function WalletWithdrawalScreen() {
  const navigation = useNavigation();
  const currencyName = "MATIC";

  const [isCollapsed, setIsCollapsed] = useState(true);

  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });

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
      Strings.sell +
      "&currency=" +
      currencyName +
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
          name={Strings.Withdrawal}
          onLeftIconPath={icons.back}
        />
        {/* <HeaderView fontSize={24} title={Strings.Withdrawal} /> */}

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
                <ButtonGradient
                  colorArray={defaultTheme.secondaryGradientColor}
                  angle={gradientColorAngle}
                  onPress={async () => {
                    // navigation.navigate(ScreenNames.TransakWebView, {
                    // 	type: Strings.withdrawal
                    // });
                    Linking.openURL(getPaymentUrl());
                  }}
                  buttonTextcolor={colors.white}
                  buttonText={Strings.withdrawal}
                  style={{ marginTop: 16 }}
                  paddingVertical={20}
                />
              </View>
            </Collapsible>
          </View>
        </KeyboardAwareScrollView>
        {/* <Collapsible collapsed={isCollapsed}>
          <LinearGradient
            style={styles.buttonContainerStyle}
            colors={['black', 'black']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.buttonTitleText}>
              {Strings.Polygon_Transfer}
            </Text>
            <ExpoFastImage source={icons.downGray} style={styles.img} />
          </LinearGradient>
          <LinearGradient
            style={styles.buttonContainerStyle}
            colors={['black', 'black']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.buttonTitleText}>
              {Strings.ETH_Network_Transfer}
            </Text>
            <ExpoFastImage source={icons.downGray} style={styles.img} />
          </LinearGradient>
        </Collapsible> */}
      </View>
    </SafeAreaView>
  );
}
