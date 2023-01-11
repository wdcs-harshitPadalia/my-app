import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {
	View,
	Modal,
	StyleSheet,
	ActivityIndicator,
	AppState,
	Platform
} from 'react-native';
import {Text} from 'react-native-elements';
import Strings from '../constants/strings';
import fonts from '../theme/fonts';
import LottieView from 'lottie-react-native';
import Lottie from 'lottie-react';

import {defaultTheme} from '../theme/defaultTheme';
import colors from '../theme/colors';
import useInterval from './CustomHooks/useInterval';

// import { RootState } from "../redux/store";

interface LoaderProps {
	isVisible: boolean;
	shouldShowText: boolean;
	shouldShowRandomMessage?: boolean;
}

const Loader: React.FC<LoaderProps> = props => {
	const {isVisible, shouldShowText, shouldShowRandomMessage} = props;

	const appState = useRef(AppState.currentState);

	const animation = useRef(null);
	const [delay, setDelay] = useState<number>(2000);
	const [randomLoadingMessage, setRandomLoadingMessage] =
		useState(shouldShowText);

	const randomMessageArray = [
		Strings.we_are_taking,
		Strings.random_login_message_one,
		Strings.random_login_message_two,
		Strings.random_login_message_three,
		Strings.random_login_message_four,
		Strings.random_login_message_five,
		Strings.random_login_message_six,
		Strings.random_login_message_seven,
		Strings.random_login_message_eight,
		Strings.random_login_message_nine,
		Strings.random_login_message_ten
	];

	const getRandomMessageFromArray = () => {
		let randomNo = randomNoFromInterval(1, 10);
		setRandomLoadingMessage(randomMessageArray[randomNo]);
	};

	function randomNoFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	useInterval(
		() => {
			shouldShowRandomMessage && getRandomMessageFromArray();
		},
		isVisible && shouldShowRandomMessage ? delay : null
	);

	useEffect(() => {
		console.log('shouldShowRandomMessage :: ', shouldShowRandomMessage);
	}, [shouldShowRandomMessage]);

	// const viewColor = useSelector((state: RootState) => state.auth.modeColor);
	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === 'active'
			) {
				console.log('App has come to the foreground!', animation.current);

				console.log('App has come to the foreground!');
			}
			if (Platform.OS !== 'web' && animation.current) {
				animation.current.play();
			}
			//appState.current = nextAppState;
			//console.log('AppState', appState.current, animation.current);
		});
		return () => {
			subscription.remove();
		};
	}, []);
	return (
		<Modal
			animationType={'fade'}
			transparent={true}
			visible={isVisible}
			style={{flex: 1}}>
			<View style={styles.container}>
				<View style={styles.backgroundView}>
					<View
						style={
							shouldShowText
								? [styles.dialogView, {backgroundColor: 'rgba(255,255,255,00)'}]
								: [styles.dialogView]
						}>
						{Platform.OS === 'web' ? (
							// <ActivityIndicator size={50} color={"red"} />
							<Lottie
								style={{
									height: 100,
									width: 100,
									padding: 0,
									alignSelf: 'center'
								}}
								animationData={require('../assets/animations/lf30.json')}
								loop={true}
							/>
						) : (
							<LottieView
								style={{
									height: 100,
									width: 100,
									padding: 0,
									alignSelf: 'center'
								}}
								source={require('../assets/animations/lf30.json')}
								autoPlay
								loop
								ref={ref => {
									animation.current = ref;
								}}
							/>
						)}

						{shouldShowText && shouldShowRandomMessage ? (
							<Text style={styles.textStyle}>{randomLoadingMessage}</Text>
						) : (
							<Text style={styles.textStyle}>{shouldShowText}</Text>
						)}
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(1,1,2,0.5)'
	},
	backgroundView: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)', //'#4d383838'
		opacity: 1,
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textStyle: {
		fontFamily: fonts.type.Inter_Bold,
		margin: 8,
		color: 'white',
		textAlign: 'center'
	},
	dialogView: {
		alignSelf: 'center',
		justifyContent: 'center',
		// width: 80,
		//height: 80,
		//padding: 15,
		//backgroundColor: '#fff',
		borderRadius: 10,
		borderColor: 'red'
		// borderWidth: 1
	}
});

export default Loader;
