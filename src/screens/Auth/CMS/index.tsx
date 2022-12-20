import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../../components/HeaderComponent';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import WebView from 'react-native-webview';
import Strings from '../../../constants/strings';
import icons from '../../../assets/icon';
import {defaultTheme} from '../../../theme/defaultTheme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getCMS} from '../../../redux/apiHandler/apiActions';
import {useDispatch} from 'react-redux';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {HeaderView} from '../../../components/HeaderView';
import {width} from '../../../theme/metrics';

const CMSScreen = () => {
	const navigation = useNavigation();
	const [data, setData] = useState({});
	const {params} = useRoute();
	const dispatch = useDispatch();

	const {screenName} = params;

	useEffect(() => {
		getCMSData();
	}, []);

	const getCMSData = () => {
		console.log('params>??', params);
		dispatch(updateApiLoader({apiLoader: true}));
		getCMS(screenName)
			.then(res => {
				//console.log('getCategoryData Response : ', res);
				dispatch(updateApiLoader({apiLoader: false}));
				setData(res.data);
				//setCategoryData(res?.data.category);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getCategoryData Data Err : ', err);
			});
	};
	return (
		<SafeAreaView
			style={{backgroundColor: defaultTheme.backGroundColor, flex: 1}}>
			<View
				style={{
					backgroundColor: defaultTheme.backGroundColor,
					marginVertical: verticalScale(16),
					flex: 1
				}}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.back}
				/>
				<View style={{alignItems: 'center'}}>
					{screenName === 'strike-policy' && (
						<Image source={icons.ic_info} style={{height: 54, width: 54}} />
					)}
				</View>

				<HeaderView
					fontSize={24}
					title={
						screenName === 'strike-policy'
							? Strings.more_about_strike_policy
								.replace('the strikes', 'strike')
								.replace('.', '')
							: data?.title
					}
				/>
				<WebView
					style={{
						backgroundColor: 'transparent',
						width: width - 100,
						marginHorizontal: 16
					}}
					source={{
						html: data?.content ?? ''
					}}
					javaScriptEnabled
				/>
			</View>

			{/* <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <HTMLView value={data?.content ?? ''} />
      </KeyboardAwareScrollView> */}
		</SafeAreaView>
	);
};

export default CMSScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(16)
		//backgroundColor: defaultTheme.backGroundColor,
	}
});
