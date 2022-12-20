/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function LoadMoreLoaderView() {
	return (
		<View
			style={{
				height: 50,
				alignItems: 'center',
				justifyContent: 'center'
			}}>
			<View
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.4)',
					borderRadius: 8
				}}>
				{/* <ActivityIndicator
        size={50}
        color={defaultTheme.primaryColor}
      /> */}
				<LottieView
					style={{
						height: 50,
						width: 50,
						padding: 0,
						alignSelf: 'center'
					}}
					source={require('../assets/animations/lf30.json')}
					autoPlay
					loop
				/>
			</View>
		</View>
	);
}
