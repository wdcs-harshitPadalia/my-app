import {Linking as DeepLink} from 'react-native';
import {AppSchema} from '../../constants/api';
import ScreenNames from '../screenNames';

const config = {
	// initialRouteName: ScreenNames.BottomTabScreen,
	screens: {
		// set config for Tabs screen
		BottomTabScreen: {
			screens: {
				FeedsRouter: {
					initialRouteName: ScreenNames.FeedScreen,
					screens: {
						EventDetailsScreen: {
							path: 'EventDetailsScreen/:title?/:matchId?/:betCreationType?'
							// parse: {
							//   title: (title: String) => `${title}`,
							//   matchId: (matchId: String) => `${matchId}`,
							//   betCreationType: (betCreationType: String) =>
							//     `${betCreationType}`,
							// },
						},
						JoinBetCreateScreen: {
							path: 'JoinBetCreateScreen/:betId?'
							// parse: {
							//   betId: (betId: String) => `${betId}`,
							// },
						},
						CustomBetDetailsScreen: {
							path: 'CustomBetDetailsScreen/:title?/:betId?/:betCreationType?'
							// parse: {
							//   title: (title: String) => `${title}`,
							//   matchId: (matchId: String) => `${matchId}`,
							//   betCreationType: (betCreationType: String) =>
							//     `${betCreationType}`,
							// },
						}
					}
				},
				ProfileRouter: {
					initialRouteName: ScreenNames.ProfileScreen,
					screens: {
						EditProfileScreen: ScreenNames.EditProfileScreen
					}
				}
			}
		}
	}
};

const Linking = {
	prefixes: [AppSchema],
	// Custom function to get the URL which was used to open the app
	async getInitialURL() {
		// As a fallback, you may want to do the default deep link handling
		const url = await DeepLink.getInitialURL();
		console.log('url getInitialURL >>> ', url);

		return url;
	},

	// Custom function to subscribe to incoming links
	subscribe(listener) {
		// Listen to incoming links from deep linking
		const linkingSubscription = DeepLink.addEventListener('url', ({url}) => {
			console.log('url addEventListener >>> ', url);
			listener(url);
		});

		return () => {
			// Clean up the event listeners
			linkingSubscription.remove();
		};
	},
	config
};

export default Linking;
