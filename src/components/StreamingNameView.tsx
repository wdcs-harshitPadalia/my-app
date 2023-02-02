import React, {useRef} from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	View,
	Platform
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {useIsFocused} from '@react-navigation/native';

import {height, moderateFontScale} from '../theme/metrics';
import WebView from 'react-native-webview';
import StreamingTimerView from './StreamingTimerView';
import {TwitchPlayer} from 'react-twitch-embed';
interface Props extends TextInputProps {
	leftIcon?: ImageSourcePropType;
	onPress?: () => void;
	//title: string;
	isGradient?: boolean;
	betInfo: object;
}

const StreamingNameView: React.FC<Props> = props => {
	const {leftIcon, betInfo} = props;
	const WEBVIEW_REF = useRef('');
	const isFocused = useIsFocused();

	const onShouldStartLoadWithRequest = navigator => {
		if (navigator.url == betInfo?.feedUrl) {
			return true;
		} else {
			//WEBVIEW_REF.stopLoading(); //Some reference to your WebView to make it stop loading that URL
			return false;
		}
	};

	//let hours = duration.asHours();
	// const injectedJavascript =
	//   'window.ReactNativeWebView.postMessage(document.documentElement.innerHTML)';

	// const injectedJavascript = `
	// document.querySelector('nav.global-navstyles__StyledNav-sc-1wl5s1s-0.cBIlxL').style.display = 'none';
	// `;

	// const injectedJavascript = `document.getElementByClassName('ijNEut').style.display = none !important;
	// true;`;

	// const postMessageToWebView = data => {
	//   const injected = `document.querySelector('.ijNEut').style.display = none !important true;
	//   `;
	//   WEBVIEW_REF.current.injectJavaScript(injected);
	// };
	// const runFirst = `setTimeout(() => {
	//   document.querySelector('.fmjCoJ').remove();
	// }, 5000);`;

	const webViewOnLoad = () => {
		const jsCode = "document.querySelector('.fmjCoJ').remove();";
		setTimeout(() => {
			WEBVIEW_REF?.current?.injectJavaScript(jsCode);
		}, 1000);
	};

	const getQueryFromUrl = () => {
		const strUrl: string = betInfo?.feedUrl;
		let channel = 'abc';
		let parent = 'truly.fun';

		const queryParam = strUrl.split('?');
		if (queryParam?.length > 1) {
			const params = queryParam[1].split('&');
			for (let i = 0; i < params.length; i++) {
				const keyValue = params[i].split('=');
				if (keyValue?.length > 1) {
					if (keyValue[0] == 'channel') {
						channel = keyValue[1];
					}
					if (keyValue[0] == 'parent') {
						parent = keyValue[1];
					}
				}
			}
		}
		return {channel, parent};
	};

	const {channel, parent} = getQueryFromUrl();

	return (
		<View style={styles.container}>
			{/* <WebView
          style={{flex: 1}}
          javaScriptEnabled={true}
          source={{
            uri: betInfo?.feedUrl,
          }}
        /> */}
			{
				isFocused &&
					// <View
					//   style={{
					//     height: height * 0.35,
					//     //width: '100%',
					//     backgroundColor: 'transparent',
					//   }}>
					(Platform.OS === 'web' ? (
						<TwitchPlayer
							channel={channel}
							parent={[parent]}
							hideControls={false}
							width="100%"
							height={height * 0.29}
						/>
					) : (
						<WebView
							ref={WEBVIEW_REF}
							//style={{flex: 1, height: height * 0.35, width: '100%'}}
							//onMessage={e => console.log("message???????????", e)}
							javaScriptEnabled
							style={{backgroundColor: 'transparent', height: height * 0.29}}
							//injectedJavaScript={injectedJavascript}
							originWhitelist={['*']}
							// injectedJavaScript={postMessage(
							//   JSON.stringify({listening: 'Sup'}),
							//   '*',
							// )}
							//onMessage={event => console.log('Received: ', event.nativeEvent.data)}
							//onMessage={postMessageToWebView}
							source={{uri: betInfo?.feedUrl}}
							allowsInlineMediaPlayback
							scalesPageToFit
							useWebKit
							allowsFullscreenVideo={true}
							//mediaPlaybackRequiresUserAction
							//accessibilityElementsHidden
							onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} //for iOS
							onNavigationStateChange={onShouldStartLoadWithRequest} //for Android
							onLoadEnd={webViewOnLoad}
							scrollEnabled={false}
							startInLoadingState
							//injectedJavaScriptBeforeContentLoaded={runFirst}
							//allowsLinkPreview={false}
							//onLoad={e => console.log('onLoad?>>>>>>>>>>>', e.nativeEvent)}
						/>
					))
				// </View>
			}
			<Text
				style={[
					styles.titleStyle,
					{marginBottom: verticalScale(betInfo.matches ? 0 : 8)}
				]}>
				{`${
					betInfo.matches?.subcategories?.name ??
					betInfo.subcategories?.name ??
					betInfo.categories?.name
				} ${betInfo.matches?.leagueName ? '-' : ''} ${
					betInfo.matches?.leagueName ?? ''
				}`
					.toUpperCase()
					.toUpperCase()}
			</Text>
			{betInfo.matches && (
				<Text style={styles.gameTitleStyle}>
					{betInfo.matches?.leagueName}: {betInfo.matches?.localTeamName} vs.{' '}
					{betInfo.matches?.visitorTeamName}
				</Text>
			)}
			{betInfo?.feed_name && (
				<Text style={styles.gameTitleStyle}>
					{betInfo.feed_name}
				</Text>
			)}

			{isFocused && <StreamingTimerView betInfo={betInfo} />}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: verticalScale(6)
	},
	titleStyle: {
		color: colors.placeholderColor,
		fontSize: moderateFontScale(10),
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingTop: verticalScale(8)
	},
	gameTitleStyle: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateScale(18),
		textAlign: 'left',
		paddingVertical: verticalScale(8)
	},
	viewTagTIme: {flexDirection: 'row', alignItems: 'center'},
	estimatedTimeText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.textTitle
		//opacity: 0.7,
		//marginLeft: horizontalScale(8),
	}
});
export default StreamingNameView;
