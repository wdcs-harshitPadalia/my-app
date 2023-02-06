import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonGradient from '../../../components/ButtonGradient';
import {gradientColorAngle} from '../../../theme/metrics';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import ScreenNames from '../../../navigation/screenNames';

const LiveChallengeListScreen: React.FC<any> = props => {
	const navigation = useNavigation();

	const {liveEventData} = useRoute().params;

	const renderItem = ({item, index}) => (
		<ButtonGradient
			onPress={() => {
				// TODO : redirect to live event page
				navigation.navigate(ScreenNames.EventDetailsScreen, {
					feedObject: item,
					betCreationType: 1,
					selectedBetType: {
						"_id": "62318eb3099d3530771ae880",
						"name": "Single Match",
						"active": true,
						"createdAt": "2022-03-16T07:16:03.804Z",
						"updatedAt": "2022-03-16T07:16:03.804Z",
						"__v": 0
					  },
					isFromStreaming: true,
				});
			}}
			colorArray={defaultTheme.ternaryGradientColor}
			angle={gradientColorAngle}
			buttonTextcolor={colors.white}
			buttonText={item?.feed_name}
			style={styles.marginInput}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={() => {
					navigation.goBack();
				}}
				onLeftIconPath={icons.back}
				name={Strings.live_challenge}
			/>
			<View style={styles.viewContain}>
				<FlatList
					bounces={false}
					data={liveEventData}
					renderItem={renderItem}
				/>
			</View>
		</SafeAreaView>
	);
};

export default LiveChallengeListScreen;
