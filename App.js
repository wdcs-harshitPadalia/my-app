import { StatusBar } from 'expo-status-bar';
import {
	Alert,
	Button,
	Image,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
  StyleSheet
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './src/redux/store';
import Routes from './src/navigation/routes';
import {ThemeProvider} from './src/theme/createTheme';
import {
	QrcodeModal,
	RenderQrcodeModalProps,
	useWalletConnect,
	WalletService,
	withWalletConnect
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoInternetView from './src/components/NoInternetView';
import {PortalProvider, enableLogging} from '@gorhom/portal';
import KeyboardManager from 'react-native-keyboard-manager';
import NotificationManager from './src/notificationManager';
import FlashMessage from 'react-native-flash-message';
import {
	API_REGIONS,
	createClient,
	disableCache,
	enableCache
} from '@amityco/ts-sdk';
import {defaultTheme} from './src/theme/defaultTheme';
import CustomWalletBottomSheet from './src/components/CustomWalletBottomSheet';
import {AppSchema} from './src/constants/api';
import {initSmartLookSession} from './src/components/SmartLookSDKHelper';
import { useEffect } from 'react';
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


export default () => (
  <View style={{backgroundColor: 'red', flex: 1}}>
  	<Provider store={store}>
    <Routes />
    </Provider>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
