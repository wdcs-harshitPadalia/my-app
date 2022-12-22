/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

import { Linking, RefreshControl, View, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { useBetCreateContract } from "../../../components/CustomHooks/SmartContract";
import useUpdateEffect from "../../../components/CustomHooks/useUpdateEffect";
import TokenSelection from "../../../components/TokenSelection";
import WalletAddressView from "../../../components/Wallet/WalletAddressView";
import WalletBalance from "../../../components/Wallet/WalletBalance";
import WalletStats from "../../../components/Wallet/WalletStats";
import Strings from "../../../constants/strings";
import {
  getMetamaskBalance,
  getRoundDecimalValue,
} from "../../../constants/utils/Function";
import ScreenNames from "../../../navigation/screenNames";
import {
  getTokenType,
  getWalletStatics,
} from "../../../redux/apiHandler/apiActions";
import { updateApiLoader } from "../../../redux/reducerSlices/preLogin";
import { RootState } from "../../../redux/store";

import styles from "./style";
import HeaderComponent from "../../../components/HeaderComponent";
import icons from "../../../assets/icon";
import WalletQrCodeModalComponent from "../../../components/Wallet/WalletQrCodeModalComponent";
import { decimalValue } from "../../../constants/api";
import { updateTotalBalance } from "../../../redux/reducerSlices/userInfo";

let totalBalance = 0;
let showTokenWiseBalance = false;

const WalletScreen: React.FC<any> = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const [currentBalance, setCurrentBalance] = useState(0);
  const [isRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [walletStatics, setWalletStatics] = useState({});

  const [showTokenSelectionPopup, setShowTokenSelectionPopup] = useState(false);
  const [currencyData, setCurrencyData] = useState([{}]);
  const [isSelectCurrency, setIsSelectCurrency] = useState({});

  const [isApiSelectCurrency, setIsApiSelectCurrency] = useState({});

  const [showPopupType, setShowPopupType] = useState("0"); // 0 for balance and 1 for win/loss

  const [totalMoney, setTotalMoney] = useState("0");
  const [moneyType, setMoneyType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displaySelectedTokenName, setDisplaySelectedTokenName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const { getBalanceFromContract, tokenBalance, approveContract } = useBetCreateContract(false);
  const [tokenCount, setTokenCount] = useState(0);

  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });

  useUpdateEffect(() => {
    callWalletStatsApi();
    approveContract('0xa19E732541063C8954880ffc68F1fE54a0e749dE', 'sdds', true);
  }, [filterType]);

  const callWalletStatsApi = async () => {
    let uploadData = {};

    if (
      filterType === "Today" ||
      filterType === "All" ||
      filterType === "Last week" ||
      filterType === "Last month"
    ) {
      uploadData = {
        days: filterType?.toLowerCase(),
        viewDetails: false,
      };
    } else {
      uploadData = {
        from: filterType?.firstDate,
        to: filterType?.secondDate,
        viewDetails: false,
      };
    }
    const response = await getWalletStatics(uploadData);
    console.log("getWalletStatics response :: ", response?.data?.money);
    // let objData = response?.data?.money?.filter(data => {
    // 	return data?.tokenType === 'MATIC';
    // });
    // setTotalMoney(objData[0]?.amount ?? '0');
    // setMoneyType(objData[0]?.tokenType ?? '');
    setTotalMoney(response?.data?.totalDollarAmount);
    if (currencyData && currencyData?.length > 0) {
      setIsApiSelectCurrency(currencyData[0]);
    }
    setWalletStatics(response?.data);
  };

  // useEffect(() => {
  //   console.log(userInfo, '....connector...');
  // }, [userInfo]);

  // const onMetamaskButtonTap = async () => {
  //   if (connector.connected) {
  //     await connector.killSession();
  //   } else {
  //     const success = await connector.connect();
  //     if (success) {
  //       console.log('success?.accounts[0]', success?.accounts[0]);
  //       getBalance(success?.accounts[0]);
  //       // console.log('res balance', res);
  //       // setCurrentBalance(parseFloat(res).toPrecision(5));
  //     }
  //   }
  // };

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    // The screen is focused
    // Call any action
    setFilterType("All");
    getTokenTypeData();
    callWalletStatsApi();
    // if (connector.connected) {
    // 	setFilterType('All');
    // 	getTokenTypeData();
    // 	callWalletStatsApi();
    // 	getBalance(connector?.accounts[0] ?? userInfo.user?.walletAddress);
    // } else {
    // 	getBalance('0xf7dcD487ca9e6d82e4F9f601Eb3be3655c1e9757');
    // }
    // });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;
  }, [connector]);

  useEffect(() => {
    if (tokenBalance) {
      // console.log(
      //   'tokenBalance ::' + tokenBalance,
      //   '[0] ::' + tokenBalance.split(' ')[0],
      //   '[1] :: ' + tokenBalance.split(' ')[1],
      // );

      // let lastIndex = 0;
      const filteredCurrencyObj = currencyData.filter(
        (currencyDataObj: any) => {
          // lastIndex = index;
          return (
            currencyDataObj.short_name.toLowerCase() ===
            tokenBalance.split(" ")[1].toLowerCase()
          );
        }
      );

      const tokenTotalBalance =
        tokenBalance?.split(" ")[0] *
        (filteredCurrencyObj[0]?.tokenPriceUsd ?? 1);

      totalBalance += tokenTotalBalance;

      // console.log(
      //   'lastIndex :: ' + lastIndex,
      //   'tokenTotalBalance :: ' + tokenTotalBalance,
      //   'totalBalance :: ' + totalBalance,
      // );

      setCurrentBalance(getRoundDecimalValue(totalBalance));

      if (showTokenWiseBalance) {
        setIsLoading(false);
      }
      setTokenCount(tokenCount + 1);
    }
  }, [tokenBalance]);

  const getBalance = async (address) => {
    try {
      let res = await getMetamaskBalance(address);
      // console.log('getBalance ::: res :::', res);

      const totalMaticBalance = getRoundDecimalValue(
        res * currencyData[0]?.tokenPriceUsd
      );

      setCurrentBalance(totalMaticBalance);
      if (showTokenWiseBalance) {
        setIsLoading(false);
      }
      setDisplaySelectedTokenName(currencyData[0]?.short_name);
    } catch (error) {
      setCurrentBalance(0 + "");
      if (showTokenWiseBalance) {
        setIsLoading(false);
      }
      setDisplaySelectedTokenName(currencyData[0]?.short_name);
    }
  };

  const getTokenTypeData = () => {
    dispatch(updateApiLoader({ apiLoader: true }));

    getTokenType({})
      .then((res) => {
        console.log("getTokenTypeData Response >>> ", JSON.stringify(res));
        dispatch(updateApiLoader({ apiLoader: false }));

        setCurrencyData(res?.data?.tokens);
        if (Object.keys(isApiSelectCurrency).length === 0) {
          // console.log('====================================');
          // console.log('getTokenType :: res?.data.tokens[0] ::', res?.data.tokens[0]);
          // console.log('====================================');
          // setIsSelectCurrency(res?.data.tokens[0]);
          setIsApiSelectCurrency(res?.data?.tokens[0]);
        }
      })
      .catch((err) => {
        console.log("getTokenTypeData Data Err >>> ", JSON.stringify(err));
        dispatch(updateApiLoader({ apiLoader: false }));
      });
  };

  const getBalanceAsync = async (address) => {
    getBalanceFromContract(address);
  };

  useUpdateEffect(() => {
    handleGetBalance();
  }, [currencyData]);

  const handleGetBalance = async () => {
    totalBalance = 0;
    setDisplaySelectedTokenName("");
    for (let i = 0; i < currencyData.length; i++) {
      if (currencyData[i]?.short_name?.toLowerCase() === "matic") {
        let res = await getMetamaskBalance(userInfo?.user?.walletAddress);
        const totalMaticBalance =
          parseFloat(res).toFixed(decimalValue) *
          currencyData[i]?.tokenPriceUsd;
        console.log("totalMaticBalance ::", totalMaticBalance);
        totalBalance += totalMaticBalance;
        setTokenCount(tokenCount + 1);
      } else {
        getBalanceAsync(currencyData[i]?.contractAddress);
      }
    }
  };

  useEffect(() => {
    if (tokenCount === currencyData.length) {
      dispatch(updateTotalBalance(totalBalance.toFixed(2)));
      setIsLoading(false);
    }
  }, [tokenCount]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        onLeftMenuPress={() => {
          navigation.goBack();
        }}
        name={Strings.str_wallet}
        onLeftIconPath={icons.back}
      />
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                // getBalance(
                //   connector?.accounts[0] ?? userInfo.user?.walletAddress,
                // );
                setIsSelectCurrency({});
                setIsLoading(true);
                handleGetBalance();
                callWalletStatsApi();
              }}
              title="Pull to refresh"
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          {/* <ButtonGradient
						onPress={onMetamaskButtonTap}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={
							connector.connected
								? Strings.disconnect_metamask
								: Strings.connect_metamask
						}
						style={{marginTop: 30, paddingHorizontal: horizontalScale(18)}}
						leftIconPath={icons.metamask}
						paddingVertical={20}
					/> */}

          <>
            <WalletAddressView
              address={connector?.accounts[0] ?? userInfo.user?.walletAddress}
              style={{ borderRadius: 8 }}
              handleShowQrCodeModal={() => setModalVisible(true)}
            />

            {/* <WalletQrCodeView
							address={connector?.accounts[0] ?? userInfo.user?.walletAddress}
							style={{borderRadius: 8}}
						/> */}

            <WalletBalance
              style={{ borderRadius: 8 }}
              userData={userInfo?.user}
              onExportPrivateKeyPressed={() => {
                Linking.openURL("https://reveal.magic.link/defibet");
              }}
              onDepositButtonPressed={() => {
                navigation.navigate(ScreenNames.WalletDepositScreen);
              }}
              onWithdrawalButtonPressed={() => {
                navigation.navigate(ScreenNames.WalletWithdrawalScreen);
              }}
              balance={userInfo?.totalBalance}
              changeToken={() => {
                setShowPopupType("0");
                setShowTokenSelectionPopup(!showTokenSelectionPopup);
              }}
              onBalanceReload={() => {
                // getBalance(
                //   connector?.accounts[0] ?? userInfo.user.walletAddress,
                // );
              }}
              onBuyCryptoButtonPressed={() => {
                navigation.navigate(ScreenNames.TransakWebView, {
                  type: Strings.buy_crypto,
                });
              }}
              isLoading={isLoading}
              displaySelectedTokenName={displaySelectedTokenName}
            />
          </>

          <WalletStats
            onViewDetailsButtonClicked={() => {
              navigation.navigate(ScreenNames.WalletStatsScreen, {
                filterTypeForDetails: filterType,
              });
            }}
            style={{ borderRadius: 8 }}
            onFilterChanged={(type) => {
              console.log("onFilterChanged type :: ", type);
              setFilterType(type);
            }}
            filterType={filterType}
            // lossBets={walletStatics?.lossBets}
            // winBets={walletStatics?.winBets}
            passiveIncomeEarnings={getRoundDecimalValue(
              walletStatics?.passiveIncomeDollar
            )}
            juryEarnings={getRoundDecimalValue(
              walletStatics?.juryEarningsDollar
            )}
            totalMoney={totalMoney}
            moneyType={moneyType}
            changeToken={() => {
              setShowPopupType("1");
              setShowTokenSelectionPopup(!showTokenSelectionPopup);
            }}
          />
        </ScrollView>

        {showTokenSelectionPopup && (
          <TokenSelection
            data={currencyData}
            onClose={(item) => {
              if (item) {
                if (showPopupType === "0") {
                  if (item._id === isSelectCurrency?._id) {
                    setIsSelectCurrency({});
                    setIsLoading(true);
                    handleGetBalance();
                    setShowTokenSelectionPopup(false);
                    return;
                  }

                  totalBalance = 0;
                  setIsLoading(true);
                  setIsSelectCurrency(item);
                  if (item._id === currencyData[0]._id) {
                    showTokenWiseBalance = true;
                    getBalance(
                      userInfo.user.walletAddress ?? connector?.accounts[0]
                    );
                  } else {
                    showTokenWiseBalance = true;
                    setDisplaySelectedTokenName(item?.short_name);
                    getBalanceAsync(item.contractAddress);
                  }
                } else {
                  let objData = walletStatics?.money?.filter((data) => {
                    return data.tokenType === item.short_name;
                  });
                  setTotalMoney(objData[0]?.amount ?? "0");
                  setMoneyType(objData[0]?.tokenType ?? "");
                  setIsApiSelectCurrency(item);
                }
              }
              setShowTokenSelectionPopup(false);
            }}
            pervSelectedID={
              showPopupType === "0"
                ? isSelectCurrency?._id
                : isApiSelectCurrency?._id
            }
            pervSelectedObj={
              showPopupType === "0" ? isSelectCurrency : isApiSelectCurrency
            }
          />
        )}

        <WalletQrCodeModalComponent
          isVisible={modalVisible}
          popupTitle={Strings.str_receive_crypto}
          qrCodeScanMsg={Strings.str_scan_qr_receive_crypto}
          address={connector?.accounts[0] ?? userInfo.user?.walletAddress}
          onPressCancel={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
