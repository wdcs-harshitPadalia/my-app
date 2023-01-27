import React, {useEffect, useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	Modal,
	TouchableOpacity,
	FlatList
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {useDispatch} from 'react-redux';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {showCreateHighlights} from '../redux/reducerSlices/dashboard';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {horizontalScale, width} from '../theme/metrics';
import ButtonBorderGradient from './ButtonBorderGradient';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import TutorialView from './TutorialView';
import { FlashList } from '@shopify/flash-list';

interface Props extends TextInputProps {
	onNextPress?: () => void;
	onSkipPress?: () => void;
}

const HomeTutorialList: React.FC<Props> = props => {
	const {onNextPress, onSkipPress} = props;

	const [selectedIndex, setSelectedIndex] = useState(0);
	const flatListRef = useRef();
	const dispatch = useDispatch();

	const arrData = [
		{
			title: Strings.str_tut_create_bet,
			description: Strings.str_tut_create_bet_desc
		},
		{
			title: Strings.bets,
			description: Strings.str_tut_feed_desc
		},
		{
			title: '',
			description: Strings.str_tut_feed_event_desc
		}
	];

	console.log('selectedIndex', selectedIndex);
	return (
		<View style={styles.container}>
		<FlashList
			ref={flatListRef}
			scrollEnabled={false}
			bounces={false}
			pagingEnabled
			horizontal
			data={arrData}
			showsHorizontalScrollIndicator={false}
			renderItem={({item, index}) => (
				<TutorialView
					isShowPlusIcon={false}
					isShowTitle={index === 2 ? false : true}
					isShowEventImg={index === 2 ? true : false}
					popupTitle={item.title}
					buttonTitle={Strings.next}
					description={item.description}
					onNextPress={() => {
						dispatch(showCreateHighlights({isShowCreateHighlights: false}));
						setSelectedIndex(selectedIndex + 1);
						if (index === 2) {
							onNextPress();
							return;
						}
						flatListRef.current.scrollToIndex({index: index + 1});
					}}
					onSkipPress={onSkipPress}
				/>
			)}
		/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: '100%',
		height:'100%'
	},
	bgView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	centeredView: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	viewDetails: {
		// backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: verticalScale(20)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(24),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	descriptionStyle: {
		color: colors.grayLightText,
		fontSize: moderateScale(16),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		marginTop: verticalScale(10)
	},
	loginButtonSocial: {
		marginTop: verticalScale(16)
	},
	skipBtn: {
		color: colors.grayLightText,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		padding: verticalScale(16)
	},
	plusImg: {
		height: 40,
		width: 40,
		position: 'absolute',
		top: 60,
		right: 120
	},
	arrowImg: {
		height: 50,
		width: 50,
		position: 'absolute',
		top: 120,
		right: 115
	},
	eventImg: {
		height: width,
		width: width - horizontalScale(20),
		margin: 0
	}
});

export default HomeTutorialList;
