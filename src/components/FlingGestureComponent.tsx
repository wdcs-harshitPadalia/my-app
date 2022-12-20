import React, {Children} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {defaultTheme} from '../theme/defaultTheme';
import {
	FlingGestureHandler,
	Directions,
	State,
	FlingGestureHandlerStateChangeEvent
} from 'react-native-gesture-handler';

interface Props {
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
	propStyle?: ViewStyle;
}

const FlingGestureComponent: React.FC<Props> = ({
	onSwipeLeft,
	onSwipeRight,
	children,
	propStyle
}) => {
	return (
		<FlingGestureHandler
			direction={Directions.LEFT}
			onHandlerStateChange={ev => {
				if (ev.nativeEvent.oldState === State.ACTIVE) {
					onSwipeLeft();
				}
			}}
			style={styles.container}>
			<FlingGestureHandler
				direction={Directions.RIGHT}
				onHandlerStateChange={ev => {
					if (ev.nativeEvent.oldState === State.ACTIVE) {
						onSwipeRight();
					}
				}}
				style={styles.container}>
				<View>{children}</View>
			</FlingGestureHandler>
		</FlingGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	}
});

export default FlingGestureComponent;
