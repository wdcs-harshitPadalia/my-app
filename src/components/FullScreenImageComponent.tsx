import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Animated
} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

import Modal from 'react-native-modal';

import icons from '../assets/icon';
import {ImageIndicator} from '../constants/utils/Function';

import {horizontalScale, verticalScale} from '../theme';
import {width} from '../theme/metrics';

interface Props {
	isVisible?: boolean;
	url: string;
	onClose: Function;
}

const FullScreenImageComponent: React.FC<Props> = props => {
	const {isVisible, url, onClose} = props;
	const scale = new Animated.Value(1);

	const AnimatedImage = Animated.createAnimatedComponent(ImageIndicator);

	const onPinchEvent = Animated.event(
		[
			{
				nativeEvent: {scale: scale}
			}
		],
		{
			useNativeDriver: true
		}
	);

	const onPinchStateChange = (event: any) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			Animated.spring(scale, {
				toValue: 1,
				useNativeDriver: true
			}).start();
		}
	};

	return (
		<Modal
			backdropOpacity={0.9}
			style={{margin: 0}}
			//coverScreen={true}
			//style={{backgroundColor: 'red', flex: 1}}
			isVisible={isVisible}
			onSwipeComplete={({swipingDirection}) => {
				onClose();
				console.log('swipingDirection :: ', swipingDirection);
			}}
			swipeDirection={'down'}>
			<View style={{flex: 1}}>
				<TouchableOpacity
					onPress={() => onClose()}
					hitSlop={styles.hitSlop}
					style={styles.closeContainer}>
					<Image style={styles.imgClose} source={icons.close} />
				</TouchableOpacity>

				<PinchGestureHandler
					onGestureEvent={onPinchEvent}
					onHandlerStateChange={onPinchStateChange}>
					<AnimatedImage
						source={{uri: url}}
						style={{
							width: '100%',
							flex: 1,
							transform: [{scale: scale}]
						}}
						resizeMode="contain"
					/>
				</PinchGestureHandler>
			</View>
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
		top: verticalScale(80),
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

export default FullScreenImageComponent;
