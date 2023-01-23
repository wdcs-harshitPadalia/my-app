import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Modal,
	Platform
} from 'react-native';
import {useSelector} from 'react-redux';
import Strings from '../../constants/strings';
import ScreenNames from '../../navigation/screenNames';
import userInfo from '../../redux/reducerSlices/userInfo';
import {RootState} from '../../redux/store';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import {
	horizontalScale,
	moderateFontScale,
	verticalScale
} from '../../theme/metrics';

import StoryProfileComponent from '../StoryProfileComponent';
import StoryDetailsContainer from './StoryDetailsContainer';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';

interface PropsType {
	data: any;
	onEndReached: () => void;
}

const Stories = (props: PropsType) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentUserIndex, setCurrentUserIndex] = useState(0);
	const [currentScrollValue, setCurrentScrollValue] = useState(0);
	const modalScroll = useRef(null);
	const navigation = useNavigation();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const onStorySelect = (index: number) => {
		console.log('onStorySelect >> index >> ', index);

		setCurrentUserIndex(index);
		setIsModalOpen(true);
	};

	const onStoryClose = () => {
		console.log('onStoryClose >>');

		setIsModalOpen(false);
	};

	const onStoryNext = (isScroll: boolean) => {
		console.log('onStoryNext >> isScroll >> ', isScroll);

		const newIndex = currentUserIndex + 1;
		if (props.data.length - 1 > currentUserIndex) {
			setCurrentUserIndex(newIndex);
			if (!isScroll) {
				try {
					modalScroll.current.scrollTo(newIndex, true);
				} catch (e) {
					console.warn('error=>', e);
				}
			}
		} else {
			setIsModalOpen(false);
		}
	};

	const onStoryPrevious = (isScroll: boolean) => {
		console.log('onStoryPrevious >> isScroll >> ', isScroll);

		const newIndex = currentUserIndex - 1;
		if (currentUserIndex > 0) {
			setCurrentUserIndex(newIndex);
			if (!isScroll) {
				modalScroll.current.scrollTo(newIndex, true);
			}
		}
	};

	const onScrollChange = scrollValue => {
		console.log('onScrollChange >> scrollValue >> ', scrollValue);

		if (currentScrollValue > scrollValue) {
			onStoryNext(true);
			console.log('next');
			setCurrentScrollValue(scrollValue);
		}
		if (currentScrollValue < scrollValue) {
			onStoryPrevious(false);
			console.log('previous');
			setCurrentScrollValue(scrollValue);
		}
	};

	const onHandleRedirectUser = item => {
		if (item?._id !== userInfo?.user?._id) {
			setIsModalOpen(false);

			navigation.navigate(ScreenNames.OtherUserProfileScreen, {
				userId: item?._id
			});
		}
	};

	// useEffect(() => {
	// 	console.log('====================================');
	// 	console.log('props.data ::', JSON.stringify(props.data));
	// 	console.log('====================================');
	// }, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={props.data}
				horizontal
				keyExtractor={item => item._id}
				renderItem={({item, index}) => (
					<View
						key={item._id}
						style={{justifyContent: 'center', marginLeft: horizontalScale(4)}}>
						<TouchableOpacity
							style={{marginHorizontal: horizontalScale(8)}}
							onPress={() => onStorySelect(index)}>
							<StoryProfileComponent
								level={item.level}
								profileImgPath={item.picture}
							/>
							<View
								style={{
									marginTop: verticalScale(8)
								}}>
								<Text style={styles.storyTitleText}>
									{item?._id === userInfo?.user?._id
										? Strings.your_story
										: ('@' + item.userName).length > 10
										? ('@' + item.userName).substring(0, 10).concat('...')
										: '@' + item.userName}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
				onMomentumScrollEnd={props.onEndReached}
			/>

			<Modal
				animationType={Platform.OS === 'ios' ? 'none' : 'slide'}
				transparent={false}
				visible={isModalOpen}
				style={styles.modalContainer}
				onShow={() => {
					if (currentUserIndex > 0) {
						modalScroll.current.scrollTo(currentUserIndex, false);
					}
				}}
				onRequestClose={onStoryClose}>
				<CubeNavigationHorizontal
					callBackAfterSwipe={g => onScrollChange(g)}
					ref={modalScroll}
					style={styles.container}>
					{props.data.map((item, index) => (
						<>
							<StoryDetailsContainer
								key={item._id}
								onClose={onStoryClose}
								onStoryNext={onStoryNext}
								onStoryPrevious={onStoryPrevious}
								dataStories={item}
								isNewStory={index !== currentUserIndex}
								onHandleRedirectUser={() => onHandleRedirectUser(item)}
							/>
						</>
					))}
				</CubeNavigationHorizontal>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	storyTitleText: {
		color: colors.white,
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateFontScale(8),
		textAlign: 'center'
	},
	modalContainer: {
		flex: 1
	}
});

export default Stories;
