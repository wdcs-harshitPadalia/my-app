import React, {useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import HeaderComponent from '../../../../components/HeaderComponent';

import colors from '../../../../theme/colors';
import icons from '../../../../assets/icon';
import Strings from '../../../../constants/strings';
import {horizontalScale} from '../../../../theme';
import ButtonGradient from '../../../../components/ButtonGradient';
import {defaultTheme} from '../../../../theme/defaultTheme';

import styles from './styles';
import ScreenNames from '../../../../navigation/screenNames';
import {gradientColorAngle} from '../../../../theme/metrics';

const DisputeThankYouScreen: React.FC<any> = () => {
	const navigation = useNavigation();

	const {params} = useRoute();
	const {title, subTitle}: any = params;

	const handleContinueFeedButtonClick = () => {
		console.log('handleContinueFeedButtonClick', params?.isFromJury);
		if (params?.isFromJury) {
			navigation.navigate(ScreenNames.AfterJuryScreen);
		} else {
			navigation.navigate(ScreenNames.FeedScreen);
		}
	};

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backAction);

		return () =>
			BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, []);

	const backAction = () => {
		handleContinueFeedButtonClick();
		return true;
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={handleContinueFeedButtonClick}
				onLeftIconPath={icons.back}
				name={Strings.dispute_thank_you}
			/>

			<View
				style={{
					flex: 1,
					marginHorizontal: horizontalScale(16),
					justifyContent: 'center'
				}}>
				<Text style={styles.textTitle}>{title}</Text>
				<Text style={styles.textSubTitle}>{subTitle}</Text>

				<ButtonGradient
					colorArray={defaultTheme.secondaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={
						params?.isFromJury ? Strings.continue : Strings.continue_to_feed
					}
					style={styles.continueFeedButton}
					onPress={handleContinueFeedButtonClick}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DisputeThankYouScreen;
