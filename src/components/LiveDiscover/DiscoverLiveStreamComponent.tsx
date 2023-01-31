import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../../theme/colors';

const DiscoverLiveStreamComponent = () => {
	return (
		<View style={styles.container}>
			<Text>DiscoverLiveStreamComponent</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.red
	}
});

export default DiscoverLiveStreamComponent;
