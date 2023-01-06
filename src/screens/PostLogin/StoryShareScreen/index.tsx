import React from 'react';
import {View, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import {styles} from './styles';
import ButtonGradient from '../../../components/ButtonGradient';
import Strings from '../../../constants/strings';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {horizontalScale} from '../../../theme';
import {shareToMyStory} from '../../../redux/apiHandler/apiActions';
import ScreenNames from '../../../navigation/screenNames';
import {gradientColorAngle} from '../../../theme/metrics';
import BetsBottomView from '../../../components/Events/BetsBottomView';
import {EventInfoView} from '../../../components/EventInfoView';
import {showErrorAlert} from '../../../constants/utils/Function';

const StoryShareScreen = () => {
	const navigation = useNavigation();
	const params = useRoute().params;
	const {feedObject, isFromFeed} = params;

	const onPressHandleShareStory = () => {
		const uploadData = {
			matchId: params?.matchId,
			betId:
				feedObject.dataType === 'customBet' && isFromFeed
					? feedObject?._id
					: feedObject?.bet?.bets[0]?._id,
			sharedFrom: isFromFeed ? 'Feed' : 'Details'
		};

		shareToMyStory(uploadData)
			.then(res => {
				console.log('shareToMyStory response : ', res);
				setTimeout(() => {
					if (res?.statusCode.toString().startsWith('20')) {
						navigation.navigate(ScreenNames.FeedScreen);
					} else {
						showErrorAlert('', Strings.somethingWentWrong);
					}
				}, 300);
			})
			.catch(err => {
				console.log('shareToMyStory Err : ', err);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<ImageBackground
					source={{
						uri:
							feedObject.dataType === 'customBet'
								? feedObject[0]?.subcategories?.imageUrl ??
								  feedObject[0]?.categories?.imageUrl ??
								  feedObject?.subcategories?.imageUrl ??
								  feedObject?.categories?.imageUrl
								: feedObject.image
					}}
					style={styles.imageBg}
					resizeMode={'cover'}>
					<View
						style={{
							marginHorizontal: horizontalScale(20)
						}}>
						{feedObject.dataType === 'custom' ? (
							<BetsBottomView
								// addRecent={true}
								betInfo={[feedObject?.bet]}
								selectedIndex={1}
								onNextPageLoaded={() => {
									// if (
									// 	totalDiscoverSearchBets !== discoverSearchBetsData?.length
									// ) {
									// 	pageBets = pageBets + 1;
									// 	getDiscoverBetsData();
									// }
								}}
								isMenuHide={true}
							/>
						) : (
							<EventInfoView
								item={feedObject}
								props={{hideBottomView: true, moreMenuOptionHidden: true}}
								isScreenFocused={true}
							/>
						)}
					</View>

					<View style={styles.bottomButtonContainer}>
						<View style={styles.bottomButtonView}>
							<ButtonGradient
								style={styles.cancleButton}
								buttonText={Strings.cancel}
								buttonTextcolor={colors.white}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								onPress={() => {
									navigation.goBack();
								}}
							/>
							<ButtonGradient
								style={styles.shareButton}
								buttonText={Strings.share}
								buttonTextcolor={colors.white}
								colorArray={defaultTheme.secondaryGradientColor}
								angle={gradientColorAngle}
								onPress={onPressHandleShareStory}
							/>
						</View>
					</View>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

export default StoryShareScreen;
