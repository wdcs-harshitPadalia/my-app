import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import HeaderComponent from '../../../components/HeaderComponent';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import {getCMS} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {styles} from './styles';
import {gradientColorAngle} from '../../../theme/metrics';

const MoreAboutStrikePolicyScreen: React.FC = () => {
	const navigation = useNavigation();

	const dispatch = useDispatch();

	const [descText, setDescText] = useState('');

	useEffect(() => {
		getCMSData();
	}, []);

	const getCMSData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		getCMS('strike-policy')
			.then(res => {
				//console.log('getCMSData Response : ', res);
				dispatch(updateApiLoader({apiLoader: false}));
				setDescText(res?.data?.content);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getCMSData Data Err : ', err);
			});
	};

	const handleContinueFeedButtonClick = () => {
		navigation.navigate(ScreenNames.FeedScreen);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.more_about_strike}
				/>

				<View
					style={{
						alignItems: 'center',
						backgroundColor: defaultTheme.backGroundColor,
						marginVertical: verticalScale(10)
					}}>
					<Image source={icons.ic_info} style={{height: 54, width: 54, borderRadius: 27}} />
				</View>

				{/* <View
          style={{
            alignItems: 'center',
            marginVertical: verticalScale(28),
          }}>
          <Text style={styles.titleText}>{Strings.more_about_strike}</Text>
        </View> */}

				<View
					style={{
						alignItems: 'center',
						marginHorizontal: horizontalScale(16)
					}}>
					<Text style={styles.descText}>
						{descText.replaceAll('\\n\\n', '\n\n')}
					</Text>
				</View>
			</View>

			<ButtonGradient
				colorArray={defaultTheme.secondaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={Strings.continue_to_feed}
				style={styles.continueButton}
				onPress={handleContinueFeedButtonClick}
			/>
		</SafeAreaView>
	);
};

export default MoreAboutStrikePolicyScreen;
