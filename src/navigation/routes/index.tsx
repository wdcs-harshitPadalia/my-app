import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Splash from 'react-native-splash-screen';

import {navigationRef} from '../navigationHelper';
import ScreenNames from '../screenNames';
import SplashScreen from '../../screens/Auth/SplashScreen';
import Login from '../../screens/Auth/Login';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from '../../screens/PostLogin/FeedScreen';
import icons from '../../assets/icon';
import {CustomTabBar} from '../../components/CustomTab';
import Strings from '../../constants/strings';
import LiveStreamingScreen from '../../screens/PostLogin/LiveStreamingScreen';
import WalletScreen from '../../screens/PostLogin/WalletScreen';
import DiscoverScreen from '../../screens/PostLogin/DiscoverScreen';
import ProfileScreen from '../../screens/PostLogin/ProfileScreen';
import {
	CardStyleInterpolators,
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack';

import ProfileSetupScreen from '../../screens/Auth/ProfileSetupScreen';
import SettingsScreen from '../../screens/PostLogin/Settings';
import WhoCanViewScreen from '../../screens/PostLogin/WhoCanView';
import ExportPrivateKeyScreen from '../../screens/PostLogin/ExportPrivateKey';
import WalletStatsScreen from '../../screens/PostLogin/WalletStats';
import FollowingFollowersScreen from '../../screens/PostLogin/FollowingFollowers';
import WalletDepositScreen from '../../screens/PostLogin/Wallet_Deposit';
import WalletWithdrawalScreen from '../../screens/PostLogin/Wallet_Withdrawal';
import OtherUserProfileScreen from '../../screens/PostLogin/OtherUserProfileScreen';
import BetsCategoryScreen from '../../screens/PostLogin/CreateBets/BetsCategory';
import EventDetailsScreen from '../../screens/PostLogin/EventDetailsScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Loader from '../../components/Loader';
import {Magic} from '@magic-sdk/react-native';
import {OAuthExtension} from '@magic-ext/react-native-oauth';
import {MAGIC_API_KEY} from '@env';
import {Magic as MagicWeb} from 'magic-sdk';
import {OAuthExtension as OAuthExtensionWeb} from '@magic-ext/oauth';
import ReferralProgramScreen from '../../screens/PostLogin/ReferralProgramScreen';
import WithdrawSuccessScreen from '../../screens/PostLogin/WithdrawSuccessScreen';

const customNodeOptions = {
	rpcUrl: RpcURL, // Polygon RPC URL
	chainId: chainIdPolygonNetwork // Polygon chain id
};

export const magic =
	Platform.OS === 'web'
		? new MagicWeb('pk_live_8EFB86C1F5685BE3', {
				testMode: false,
				extensions: [new OAuthExtensionWeb()],
				network: customNodeOptions
		  })
		: new Magic('pk_live_8EFB86C1F5685BE3', {
				testMode: false,
				extensions: [new OAuthExtension()],
				network: customNodeOptions
		  });

export const magicWeb = new MagicWeb('pk_live_8EFB86C1F5685BE3', {
	testMode: false,
	extensions: [new OAuthExtensionWeb()],
	network: customNodeOptions
});

import axios from 'axios';
import CMSScreen from '../../screens/Auth/CMS';
import JoinBetCreateScreen from '../../screens/PostLogin/CreateBets/JoinBetCreateScreen';
import NotificationScreen from '../../screens/PostLogin/NotificationScreen';
import ApplyFilterScreen from '../../screens/PostLogin/ApplyFilterScreen';
import ReplicateBetCreatScreen from '../../screens/PostLogin/CreateBets/ReplicateBetCreatScreen';
import FeedFilterScreen from '../../screens/PostLogin/FeedFilterScreen';
import DiscoverFindFriendsScreen from '../../screens/PostLogin/DiscoverFindFriendsScreen';
import ChatListScreen from '../../screens/PostLogin/ChatListScreen';
import ChatDetailsScreen from '../../screens/PostLogin/ChatDetailsScreen';
import UserViewProfileScreen from '../../screens/PostLogin/UserViewProfileScreen';
import MyBetListScreen from '../../screens/PostLogin/MyBetListScreen';
import NotificationManager from '../../notificationManager';
import TransakWebView from '../../screens/PostLogin/TransakWebView';
import OpenDisputeInfoScreen from '../../screens/PostLogin/Dispute/OpenDisputeInfoScreen';
import ViewDisputeScreen from '../../screens/PostLogin/Dispute/ViewDisputeScreen';
import DisputeThankYouScreen from '../../screens/PostLogin/Dispute/DisputeThankYouScreen';
import OpenDisputeScreen from '../../screens/PostLogin/Dispute/OpenDisputeScreen';
import SupportDetailsScreen from '../../screens/PostLogin/SupportDetailsScreen';
import SupportTicketsList from '../../screens/PostLogin/SupportTicketsList';
import StoryShareScreen from '../../screens/PostLogin/StoryShareScreen';
import BetMakerResultScreen from '../../screens/PostLogin/Dispute/BetMakerResultScreen';
import Linking from './Linking';
import EditProfileScreen from '../../screens/PostLogin/EditProfileScreen';
import JuryIntroScreen from '../../screens/PostLogin/BecomeJury/JuryIntroScreen';
import JuryPayChargeScreen from '../../screens/PostLogin/BecomeJury/JuryPayChargeScreen';
import JuryCongratulationScreen from '../../screens/PostLogin/BecomeJury/JuryCongratulationScreen';
import RecoverFundsScreen from '../../screens/PostLogin/RecoverFundsScreen';
import {chainIdPolygonNetwork, RpcURL} from '../../constants/api';
import AfterJuryScreen from '../../screens/PostLogin/AfterJury';
import MoreAboutStrikePolicyScreen from '../../screens/PostLogin/MoreAboutStrikePolicyScreen';
import DisputeResultScreen from '../../screens/PostLogin/Dispute/DisputeResultScreen';
import BetDetailsScreen from '../../screens/PostLogin/BetDetailsScreen';
import BetRevealResultScreen from '../../screens/PostLogin/Dispute/BetRevealResultScreen';
import CustomBetDetailsScreen from '../../screens/PostLogin/CustomBetDetailsScreen';
import SuggestedFriendList from '../../components/SuggestedFriendList';
import CreatePredictionMarket from '../../screens/CreatePredictionMarket';
import ChatUserSuggestion from '../../screens/PostLogin/ChatUserSuggestion';
import FaqScreen from '../../screens/PostLogin/FaqScreen';
import PredictionMarketsDetailsScreen from '../../screens/PostLogin/PredictionMarketsDetailsScreen';
import PushNotificationScreen from '../../screens/PostLogin/PushNotificationScreen';
import InviteShareFriend from '../../components/InviteShareFriend';
import {
	hideBottomTab,
	showInviteUser,
	showSuggestedUser
} from '../../redux/reducerSlices/dashboard';
import NotificationPopUp from '../../components/NotificationPopUp';
import {CameraPage} from '../../components/Camera/CameraPage';
import {MediaPage} from '../../components/Camera/MediaPage';
import VideoCreationScreen from '../../screens/PostLogin/VideoCreationScreen';
import VideoContentScreen from '../../screens/VideoContentScreen';
import {Platform, StyleSheet} from 'react-native';
import UserEngagementScreen from '../../screens/PostLogin/UserEngagementScreen';
import LiveChallengeScreen from '../../screens/PostLogin/LiveChallengeScreen';
import LiveChallengeListScreen from '../../screens/PostLogin/LiveChallengeListScreen';

//const Stack = createNativeStackNavigator();
const options = {
	gestureEnabled: true, // If you want to swipe back like iOS on Android
	...TransitionPresets.SlideFromRightIOS
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const cardStyleType =
	Platform.OS === 'web'
		? CardStyleInterpolators.forNoAnimation
		: CardStyleInterpolators.forHorizontalIOS;

export const BeforeLoginRoutesRoot = () => (
	<Stack.Navigator
		screenOptions={{
			cardStyleInterpolator: cardStyleType,
			cardStyle: styles.cardContainerStyle
		}}
		initialRouteName={ScreenNames.Login}>
		<Stack.Screen
			name={ScreenNames.Login}
			component={Login}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
);

export const WalletTabRoutes = (_props: any) => (
	<Stack.Navigator
		screenOptions={{
			cardStyleInterpolator: cardStyleType,
			cardStyle: styles.cardContainerStyle
		}}
		initialRouteName={ScreenNames.WalletScreen}>
		<Stack.Screen
			name={ScreenNames.WalletScreen}
			component={WalletScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ExportPrivateKeyScreen}
			component={ExportPrivateKeyScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletStatsScreen}
			component={WalletStatsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletDepositScreen}
			component={WalletDepositScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletWithdrawalScreen}
			component={WalletWithdrawalScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.TransakWebView}
			component={TransakWebView}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.WithdrawSuccessScreen}
			component={WithdrawSuccessScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeScreen}
			component={LiveChallengeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeListScreen}
			component={LiveChallengeListScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.EventDetailsScreen}
			component={EventDetailsScreen}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
);

export const LiveTabRoutes = (_props: any) => (
	<Stack.Navigator
		screenOptions={{
			cardStyleInterpolator: cardStyleType,
			cardStyle: styles.cardContainerStyle
		}}
		initialRouteName={ScreenNames.LiveStreamingScreen}>
		<Stack.Screen
			name={ScreenNames.LiveStreamingScreen}
			component={LiveStreamingScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.EventDetailsScreen}
			component={EventDetailsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.BetsCategoryScreen}
			component={BetsCategoryScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.CustomBetDetailsScreen}
			component={CustomBetDetailsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoCreationScreen}
			component={VideoCreationScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.CameraPage}
			component={CameraPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.MediaPage}
			component={MediaPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoContentScreen}
			component={VideoContentScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.UserEngagementScreen}
			component={UserEngagementScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeScreen}
			component={LiveChallengeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeListScreen}
			component={LiveChallengeListScreen}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
);

export const BottomTabs = () => (
	<Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
		<Tab.Screen
			name={ScreenNames.FeedsRouter}
			component={FeedsRouter}
			options={{
				tabBarLabel: Strings.bottomTabBets,
				selectedIconName: icons.feed_active,
				unSelectedIconName: icons.feed_inActive,
				headerShown: false
			}}
		/>
		<Tab.Screen
			name={ScreenNames.LiveTabRoutes}
			component={LiveTabRoutes}
			options={{
				tabBarLabel: Strings.bottomTabLive,
				selectedIconName: icons.video_active,
				unSelectedIconName: icons.video_inActive,
				headerShown: false
			}}
		/>
		{/* <Tab.Screen
      name={ScreenNames.WalletTabRoutes}
      component={WalletTabRoutes}
      options={{
        tabBarLabel: Strings.bottomTabWallet,
        selectedIconName: icons.wallet_active,
        unSelectedIconName: icons.wallet_inActive,
        headerShown: false,
      }}
    /> */}
		<Tab.Screen
			name={Strings.bottomTabCreate}
			component={() => <></>}
			options={{
				tabBarLabel: Strings.bottomTabCreate,
				selectedIconName: icons.ic_create_bet,
				unSelectedIconName: icons.ic_create_bet,
				headerShown: false
			}}
		/>
		<Tab.Screen
			name={ScreenNames.DiscoverRouter}
			component={DiscoverRouter}
			options={{
				tabBarLabel: Strings.bottomTabDiscover,
				selectedIconName: icons.discover_active,
				unSelectedIconName: icons.discover_inActive,
				headerShown: false
			}}
		/>
		<Tab.Screen
			name={ScreenNames.ProfileRouter}
			component={ProfileRouter}
			options={{
				tabBarLabel: Strings.bottomTabProfile,
				selectedIconName: icons.profile_active,
				unSelectedIconName: icons.profile,
				badgeIconName: icons.profileBadge,
				headerShown: false
			}}
		/>
	</Tab.Navigator>
);

// export const dashBoardRoutesRoot = (_props: any) => (
//   <Stack.Navigator initialRouteName={Navigation.dashBoardRoutesRoot}>
//     <Stack.Screen
//       name={Navigation.DashBoardTabMenu}
//       component={DashBoardTabMenu}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
// );

const FeedsRouter = () => (
	<Stack.Navigator
		screenOptions={{
			cardStyleInterpolator: cardStyleType,
			gestureResponseDistance: 100,
			cardStyle: styles.cardContainerStyle
		}}>
		<Stack.Screen
			name={ScreenNames.FeedScreen}
			component={FeedScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.FeedFilterScreen}
			component={FeedFilterScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ApplyFilterScreen}
			component={ApplyFilterScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BetsCategoryScreen}
			component={BetsCategoryScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.EventDetailsScreen}
			component={EventDetailsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.PredictionMarketsDetailsScreen}
			component={PredictionMarketsDetailsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.StoryShareScreen}
			component={StoryShareScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.OtherUserProfileScreen}
			component={OtherUserProfileScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JoinBetCreateScreen}
			component={JoinBetCreateScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.NotificationScreen}
			component={NotificationScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.createPredictionMarket}
			component={CreatePredictionMarket}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ReplicateBetCreatScreen}
			component={ReplicateBetCreatScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ChatListScreen}
			component={ChatListScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ChatDetailsScreen}
			component={ChatDetailsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ChatUserSuggestion}
			component={ChatUserSuggestion}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.OpenDisputeInfoScreen}
			component={OpenDisputeInfoScreen}
			options={{headerShown: false}}
		/>

		<Stack.Screen
			name={ScreenNames.DisputeResultScreen}
			component={DisputeResultScreen}
			options={{headerShown: false}}
		/>

		<Stack.Screen
			component={OpenDisputeScreen}
			name={ScreenNames.OpenDisputeScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ViewDisputeScreen}
			component={ViewDisputeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.DisputeThankYouScreen}
			component={DisputeThankYouScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>

		<Stack.Screen
			name={ScreenNames.MoreAboutStrikePolicyScreen}
			component={MoreAboutStrikePolicyScreen}
			options={{headerShown: false}}
		/>

		<Stack.Screen
			name={ScreenNames.BetMakerResultScreen}
			component={BetMakerResultScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BetRevealResultScreen}
			component={BetRevealResultScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BetDetailsScreen}
			component={BetDetailsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.CustomBetDetailsScreen}
			component={CustomBetDetailsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletScreen}
			component={WalletScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ExportPrivateKeyScreen}
			component={ExportPrivateKeyScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletStatsScreen}
			component={WalletStatsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletDepositScreen}
			component={WalletDepositScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletWithdrawalScreen}
			component={WalletWithdrawalScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.TransakWebView}
			component={TransakWebView}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.UserViewProfileScreen}
			component={UserViewProfileScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.FollowingFollowersScreen}
			component={FollowingFollowersScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.MyBetListScreen}
			component={MyBetListScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.CameraPage}
			component={CameraPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.MediaPage}
			component={MediaPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoCreationScreen}
			component={VideoCreationScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoContentScreen}
			component={VideoContentScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.UserEngagementScreen}
			component={UserEngagementScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeScreen}
			component={LiveChallengeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeListScreen}
			component={LiveChallengeListScreen}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
);

const DiscoverRouter = () => (
	<Stack.Navigator
		screenOptions={{
			cardStyleInterpolator: cardStyleType,
			cardStyle: styles.cardContainerStyle
		}}>
		<Stack.Screen
			name={ScreenNames.DiscoverScreen}
			component={DiscoverScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.DiscoverFindFriendsScreen}
			component={DiscoverFindFriendsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BetsCategoryScreen}
			component={BetsCategoryScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.EventDetailsScreen}
			component={EventDetailsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.CustomBetDetailsScreen}
			component={CustomBetDetailsScreen}
			options={{
				headerShown: false
			}}
		/>
		<Stack.Screen
			name={ScreenNames.ReplicateBetCreatScreen}
			component={ReplicateBetCreatScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JoinBetCreateScreen}
			component={JoinBetCreateScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.OtherUserProfileScreen}
			component={OtherUserProfileScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.MyBetListScreen}
			component={MyBetListScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.FollowingFollowersScreen}
			component={FollowingFollowersScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BetDetailsScreen}
			component={BetDetailsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.SettingsScreen}
			component={SettingsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JuryIntroScreen}
			component={JuryIntroScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.AfterJuryScreen}
			component={AfterJuryScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ViewDisputeScreen}
			component={ViewDisputeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.DisputeThankYouScreen}
			component={DisputeThankYouScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JuryPayChargeScreen}
			component={JuryPayChargeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JuryCongratulationScreen}
			component={JuryCongratulationScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.RecoverFundsScreen}
			component={RecoverFundsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoCreationScreen}
			component={VideoCreationScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.CameraPage}
			component={CameraPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.MediaPage}
			component={MediaPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ChatListScreen}
			component={ChatListScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ChatDetailsScreen}
			component={ChatDetailsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoContentScreen}
			component={VideoContentScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.UserEngagementScreen}
			component={UserEngagementScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeScreen}
			component={LiveChallengeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeListScreen}
			component={LiveChallengeListScreen}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
);

const ProfileRouter = () => (
	<Stack.Navigator
		screenOptions={{
			cardStyleInterpolator: cardStyleType,
			cardStyle: styles.cardContainerStyle
		}}
		initialRouteName={ScreenNames.ProfileScreen}>
		<Stack.Screen
			name={ScreenNames.ProfileScreen}
			component={ProfileScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.SettingsScreen}
			component={SettingsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JuryIntroScreen}
			component={JuryIntroScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.AfterJuryScreen}
			component={AfterJuryScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ViewDisputeScreen}
			component={ViewDisputeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.DisputeThankYouScreen}
			component={DisputeThankYouScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JuryPayChargeScreen}
			component={JuryPayChargeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JuryCongratulationScreen}
			component={JuryCongratulationScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.RecoverFundsScreen}
			component={RecoverFundsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.WhoCanViewScreen}
			component={WhoCanViewScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.FollowingFollowersScreen}
			component={FollowingFollowersScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.OtherUserProfileScreen}
			component={OtherUserProfileScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BetsCategoryScreen}
			component={BetsCategoryScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.UserViewProfileScreen}
			component={UserViewProfileScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.MyBetListScreen}
			component={MyBetListScreen}
			options={{headerShown: false}}
		/>

		<Stack.Screen
			name={ScreenNames.SupportDetailsScreen}
			component={SupportDetailsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.SupportTicketsList}
			component={SupportTicketsList}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.EditProfileScreen}
			component={EditProfileScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BetDetailsScreen}
			component={BetDetailsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.DiscoverFindFriendsScreen}
			component={DiscoverFindFriendsScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.WalletTabRoutes}
			component={WalletTabRoutes}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.FaqScreen}
			component={FaqScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.JoinBetCreateScreen}
			component={JoinBetCreateScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ReplicateBetCreatScreen}
			component={ReplicateBetCreatScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.PushNotificationScreen}
			component={PushNotificationScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoCreationScreen}
			component={VideoCreationScreen}
			options={{headerShown: false, gestureEnabled: false}}
		/>
		<Stack.Screen
			name={ScreenNames.CameraPage}
			component={CameraPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.MediaPage}
			component={MediaPage}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.VideoContentScreen}
			component={VideoContentScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ReferralProgramScreen}
			component={ReferralProgramScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.UserEngagementScreen}
			component={UserEngagementScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeScreen}
			component={LiveChallengeScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.LiveChallengeListScreen}
			component={LiveChallengeListScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.EventDetailsScreen}
			component={EventDetailsScreen}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
);

const LoginRouter = () => (
	<Stack.Group navigationKey="login">
		<Stack.Screen
			name={ScreenNames.Login}
			component={Login}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.ProfileSetupScreen}
			component={ProfileSetupScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.CMSScreen}
			component={CMSScreen}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name={ScreenNames.BottomTabScreen}
			component={BottomTabs}
			options={{headerShown: false}}
		/>
	</Stack.Group>
);

const RootRouter = () => {
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	//console.log('global.firstTime>???>>>', globalThis.firstTime);

	//console.log('userInfo.token>???>>>', userInfo.user._id);
	console.log('userInfo.token>???>>>', userInfo.token, userInfo.user?._id);
	axios.defaults.headers = {
		Authorization: 'Bearer ' + userInfo.token,
		accept: '*/*',
		'Content-Type': 'application/json'
	};

	// console.log(
	//   'Authorization : ',
	//   userInfo?.token,
	//   userInfo.isNewUser,
	//   userInfo.token && !userInfo.isNewUser,
	//   userInfo,
	// );
	if (userInfo.token && !userInfo.isNewUser) {
		return (
			<Stack.Navigator
				screenOptions={{
					cardStyleInterpolator: cardStyleType,
					cardStyle: styles.cardContainerStyle
				}}>
				{globalThis.firstTime && (
					<Stack.Screen
						name={ScreenNames.SplashScreen}
						component={SplashScreen}
						options={{
							headerShown: false,
							cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
						}}
					/>
				)}
				<Stack.Screen
					name={ScreenNames.BottomTabScreen}
					component={BottomTabs}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name={ScreenNames.CMSScreen}
					component={CMSScreen}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		);
	} else {
		return (
			<Stack.Navigator
				screenOptions={{
					cardStyleInterpolator: cardStyleType,
					cardStyle: styles.cardContainerStyle
				}}>
				{globalThis.firstTime && (
					<Stack.Screen
						name={ScreenNames.SplashScreen}
						component={SplashScreen}
						options={{
							headerShown: false,
							cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
						}}
					/>
				)}
				{LoginRouter()}
			</Stack.Navigator>
		);
	}
};

const Routes = () => {
	//   const userInfoData = useSelector((state: RootState) => state.userInfo);

	//   const _retrieveData = async () => {
	//     try {
	//       const value = await AsyncStorage.getItem('LAPUSER');
	//       if (value !== null) {
	//         // We have data!
	//         // console.log(JSON.parse(value));

	//         return JSON.parse(value)?.data;
	//       }
	//     } catch (error) {
	//       // Error retrieving data
	//     }
	//   };

	//   _retrieveData().then(value => {
	//     console.log('auth token : ', userInfoData.userData.user_jwt);
	//     axios.defaults.headers = {
	//       Authorization: '' + userInfoData.userData.user_jwt ?? '',
	//       accept: '*/*',
	//     };
	//   });
	const apiState = useSelector((state: RootState) => state.preLogin);
	const routeNameRef = React.useRef();
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const isShowShare = useSelector((state: RootState) => {
		return state.dashboard.isShowInviteUser;
	});

	const isShowSuggestedUser = useSelector((state: RootState) => {
		return state.dashboard.isShowSuggestedUser;
	});

	const dispatch = useDispatch();

	useEffect(() => {
		// Splash.hide();
		// if (!globalThis.firstTime === false) {
		//   globalThis.firstTime = true;
		// }
	}, []);
	// console.log('chece',isLoggedin);
	return (
		<NavigationContainer
			theme={{colors: {background: '#000'}}}
			ref={navigationRef}
			linking={userInfo.token && !userInfo.isNewUser && Linking}
			onReady={() => {
				routeNameRef.current = navigationRef.current.getCurrentRoute().name;
			}}
			fallback={<Login />}>
			{/* Render the Magic iframe! */}
			{/* <magic.Relayer /> */}
			<Loader
				isVisible={apiState.apiLoader}
				shouldShowText={apiState.showAlertWithText}
				shouldShowRandomMessage={apiState.showRandomMessage}
			/>
			<RootRouter />
			{isShowShare && (
				<InviteShareFriend
					onSkipPress={() => {
						dispatch(showInviteUser({isShowInviteUser: false}));
						dispatch(hideBottomTab({isHideBottomTab: false}));
						global.tutorialTimer = setTimeout(() => {
							dispatch(hideBottomTab({isHideBottomTab: true}));
							dispatch(showSuggestedUser({isShowSuggestedUser: true}));
						}, 300000);
					}}
					onSharePress={() => {}}
				/>
			)}

			{isShowSuggestedUser && (
				<SuggestedFriendList
					userId={userInfo.user?._id}
					onSkipPress={async () => {
						dispatch(showSuggestedUser({isShowSuggestedUser: false}));
						dispatch(hideBottomTab({isHideBottomTab: false}));
					}}
				/>
			)}
			{/* <NotificationManager /> */}
			<NotificationPopUp />
		</NavigationContainer>
	);
};
export default Routes;

const styles = StyleSheet.create({
	cardContainerStyle: {
		flex: 1
	}
});
