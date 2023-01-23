import React, { useRef, useState } from "react";
import icons from "../../../assets/icon";
import Strings from "../../../constants/strings";
import styles from "./style";
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useBetCreateContract } from "../../../components/CustomHooks/SmartContract";
import { Animated, TouchableOpacity, View } from "react-native";

import { widgetBaseUrl } from "../../../constants/api";
import { horizontalScale, verticalScale } from "../../../theme";
import { defaultTheme } from "../../../theme/defaultTheme";
import ExpoFastImage from "expo-fast-image";

const TransakWebView: React.FC<any> = () => {
  const navigation = useNavigation();

  const { params } = useRoute();
  const { type } = params;

  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });

  const [randomNumber, setRandomNumber] = useState("");
  const [base64Hash, setBase64Hash] = useState("");
  const [isShowBackButton, setIsShowBackButton] = useState(false);

  const webViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { getBase64Hash } = useBetCreateContract(false);

  const currencyName = "MATIC";

  // useEffect(() => {
  //   //console.log('params : ', Math.floor(1000 + Math.random() * 9000));
  //   const random = Math.floor(1000 + Math.random() * 9000).toString();
  //   setRandomNumber(random);
  // }, []);

  // useUpdateEffect(() => {
  //   getDepositUrl();
  // }, [randomNumber]);

  // const getDepositUrl = async () => {
  //   const value = await getBase64Hash(randomNumber, params?.privateKey);
  //   setBase64Hash(value);
  // };

  //Math.random() * (9999 - 0001) + 0001

  const getPaymentUrl = () => {
    const walletAddress = userInfo?.user?.walletAddress;
    const cryptoHash = crypto
      .createHash("sha512")
      .update(
        "0x8001c03501d88c3Fa61a62786c91f6bdf15CcA0e" +
          "822c9e5f7149734f927c4b77cdc437cb"
      )
      .digest("hex");

    let webUrl;

    if (type === Strings.withdrawal) {
      webUrl =
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
    } else {
      webUrl =
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
    }
    return webUrl;
  };

  const onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.canGoBack) {
      setIsShowBackButton(true);
      Animated.timing(fadeAnim, {
        toValue: verticalScale(46),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setIsShowBackButton(false);
        }
      });
    }

    if (navigator.url === Strings.defibetHouseUrl) {
      navigation.goBack();
      return false;
    } else {
      return true;
    }
  };

  const handleWebviewNavigation = () => {
    webViewRef.current.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderComponent
          onLeftMenuPress={() => {
            navigation.goBack();
          }}
          onLeftIconPath={icons.close}
          name={
            type === Strings.withdrawal
              ? Strings.Withdrawal
              : type === Strings.deposit
              ? Strings.Deposit
              : Strings.back
          }
        />
        {/* {randomNumber !== '' && base64Hash !== '' && (
          <MtPelerinOnOfframp
            //env={'live'}
            onSignPersonalMessage={params => onSignPersonalMessage(params)}
            onSendTransaction={rawTx => onSendTransaction(rawTx)}
            onNavigationStateChange={url =>
              console.log('onNavigationStateChange', url)
            }
            onOffRampOptions={{
              tab: 'buy',
              bdc: 'MATIC',
              bsc: 'USD',
              type: 'webview',
              addr: userInfo.user.walletAddress,
              code: randomNumber,
              hash: base64Hash,
            }}
          />
        )} */}

        {/* <WebView
					ref={webViewRef}
					style={{
						height: '100%',
						width: '100%'
					}}
					// source={{html: '<iframe width="100%" height="100%"
					source={{uri: getPaymentUrl()}}
					allowsInlineMediaPlayback
					mediaPlaybackRequiresUserAction={false}
					//onNavigationStateChange={handleNavigationStateChange}
					onNavigationStateChange={onShouldStartLoadWithRequest} //for Android
				/> */}

        {isShowBackButton ? (
          <Animated.View style={{ height: fadeAnim }}>
            <View
              style={{
                backgroundColor: defaultTheme.backGroundColor,
                paddingVertical: verticalScale(10),
              }}
            >
              <TouchableOpacity onPress={handleWebviewNavigation}>
                <ExpoFastImage
                  source={icons.arrowForward}
                  style={{
                    height: 26,
                    width: 26,
                    marginHorizontal: horizontalScale(16),
                    transform: [{ rotate: "180deg" }],
                  }}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : null}
      </View>

      {/* <WebView
        style={{
          height: '100%',
          width: '100%',
        }}
        // source={{html: '<iframe width="100%" height="100%"
        source={{uri: getDepositUrl()}}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onNavigationStateChange={handleNavigationStateChange}
      /> */}
    </SafeAreaView>
  );
};

export default TransakWebView;
