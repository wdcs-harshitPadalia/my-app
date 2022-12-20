import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {gradientColorAngle} from '../theme/metrics';

interface PropsTypes {
	progress: number;
	totalParts: number;
	startColor: string;
	endColor: string;
}

const CustomeProgressBar = (props: PropsTypes) => {
	const {progress, totalParts, startColor, endColor} = props;

	const [progressPartaionArray] = useState(
		Array.from({length: totalParts - 1}, () =>
			Math.floor(Math.random() * (totalParts - 1))
		)
	);

	return (
		<View style={styles.container}>
			<LinearGradient
				style={{
					width: progress * 100 + '%',
					height: 30,
					flexDirection: 'row',
					justifyContent: 'space-evenly'
				}}
				useAngle={true}
				angle={gradientColorAngle}
				colors={[startColor, endColor]}
			/>
			<View
				style={{
					position: 'absolute',
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-evenly'
				}}>
				{progressPartaionArray.map((item, index) => (
					<View
						key={index}
						style={{
							width: 1,
							height: 30,
							borderColor: '#fff',
							borderWidth: index < totalParts * progress - 1 ? 1 : 0
						}}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 30,
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 8,
		marginHorizontal: 12,
		overflow: 'hidden'
	},
	box: {
		width: '100%',
		height: 30,
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 8
	}
});

export default CustomeProgressBar;
