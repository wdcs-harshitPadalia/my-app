import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Video, AVPlaybackStatus } from 'expo-av';

import {horizontalScale, verticalScale} from '../theme';

interface Props {
	isVisible?: boolean;
	url: string;
	onClose: Function;
	poster: string;
}

const VideoPlayerComponent: React.FC<Props> = props => {
	const {isVisible, url, onClose, poster} = props;

	return (
		<Modal
			backdropOpacity={0.9}
			style={{marginHorizontal: 0}}
			isVisible={isVisible}
			onSwipeComplete={({swipingDirection}) => {
				onClose();
				console.log('swipingDirection :: ', swipingDirection);
			}}
			swipeDirection={'down'}>
			<SafeAreaView style={{flex: 1}}>
				{/* <TouchableOpacity
          onPress={() => onClose()}
          hitSlop={styles.hitSlop}
          style={styles.closeContainer}>
          <Image style={styles.imgClose} source={icons.close} />
        </TouchableOpacity> */}

				<Video
					source={{uri: url}}
					controls={true}
					paused={false}
					fullscreen={Platform.OS === 'ios' ? true : false}
					fullscreenOrientation={'landscape'}
					resizeMode="contain"
					style={{
						flex: 1
					}}
					onFullscreenPlayerWillDismiss={() => console.log('call')}
					poster={poster}
					posterResizeMode={'cover'}
				/>
			</SafeAreaView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	hitSlop: {
		left: 18,
		top: 18,
		right: 18,
		bottom: 18
	},
	closeContainer: {
		alignItems: 'flex-end',
		top: verticalScale(90),
		right: horizontalScale(12),
		padding: 16,
		borderRadius: 8,
		position: 'absolute',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.3)',
		zIndex: 1
	},
	imgClose: {
		height: 20,
		width: 20,
		position: 'absolute',
		alignSelf: 'center'
	}
});

export default VideoPlayerComponent;
