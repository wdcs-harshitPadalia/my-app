import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {defaultTheme} from '../../../../theme/defaultTheme';

import icons from '../../../../assets/icon';
import ButtonGradient from '../../../../components/ButtonGradient';
import HeaderComponent from '../../../../components/HeaderComponent';
import Strings from '../../../../constants/strings';
import colors from '../../../../theme/colors';
import ScreenNames from '../../../../navigation/screenNames';
import JuryIntroComponent from '../../../../components/JuryIntro/JuryIntroComponent';
import {verticalScale} from '../../../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {gradientColorAngle} from '../../../../theme/metrics';

const JuryCongratulationScreen: React.FC<any> = () => {
	const navigation = useNavigation();

	const handleFinishButtonClick = () => {
		navigation.navigate(ScreenNames.SettingsScreen);
	};

	const item = {
		image_url: icons.star_congrates,
		title_text: Strings.congratulations,
		description_text: Strings.you_become_judge_desc
	};

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backAction);

		return () =>
			BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, []);

	const backAction = () => {
		handleFinishButtonClick();
		return true;
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={handleFinishButtonClick}
					onLeftIconPath={icons.back}
					name={Strings.congratulations.replace('!', '')}
				/>

				<View style={{marginTop: verticalScale(60)}}>
					<JuryIntroComponent juryIntroData={item} />
				</View>
			</View>

			<ButtonGradient
				style={styles.button}
				buttonText={Strings.finish}
				buttonTextcolor={colors.white}
				colorArray={defaultTheme.secondaryGradientColor}
				angle={gradientColorAngle}
				onPress={handleFinishButtonClick}
			/>
		</SafeAreaView>
	);
};

export default JuryCongratulationScreen;
