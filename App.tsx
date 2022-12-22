import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import 'react-native-gesture-handler';
import polyfill from '@amityco/react-native-formdata-polyfill';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./src/redux/store";
import Routes from "./src/navigation/routes";
import { ThemeProvider } from "./src/theme/createTheme";
import {
  QrcodeModal,
  RenderQrcodeModalProps,
  useWalletConnect,
  WalletService,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoInternetView from "./src/components/NoInternetView";
import { PortalProvider, enableLogging } from "@gorhom/portal";
import KeyboardManager from "react-native-keyboard-manager";
import NotificationManager from "./src/notificationManager";
import FlashMessage from "react-native-flash-message";
import {
  API_REGIONS,
  createClient,
  disableCache,
  enableCache,
} from "@amityco/ts-sdk";
import { defaultTheme } from "./src/theme/defaultTheme";
import CustomWalletBottomSheet from "./src/components/CustomWalletBottomSheet";
import { AppSchema } from "./src/constants/api";
import { initSmartLookSession } from "./src/components/SmartLookSDKHelper";
import { useCallback, useEffect } from "react";
import { useFonts } from 'expo-font';

import './global';
polyfill();

// export default () => {
//   	<Provider store={store}>
//   <StatusBar
//     translucent
//     barStyle="light-content"
//     //backgroundColor="transparent"
//   />
//   {/* <PersistGate loading={null} persistor={persistor}> */}
//     <ThemeProvider>
//       <Routes />
//       <NoInternetView />
//     </ThemeProvider>
//   {/* </PersistGate> */}
//   <FlashMessage position="top" />
// </Provider>

// }
let persistor = persistStore(store);

const App = () => { 
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('./src/assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-Light': require('./src/assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./src/assets/fonts/Inter-SemiBold.ttf'),
    'KronaOne-Regular': require('./src/assets/fonts/KronaOne-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
   
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return(
  <View style={{ backgroundColor: "red", flex: 1 }} onLayout={onLayoutRootView}>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </PersistGate>
  </View>
)};

export default withWalletConnect(App, {
	redirectUrl: window.location.origin,
	storageOptions: {
		asyncStorage: AsyncStorage
	}
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});