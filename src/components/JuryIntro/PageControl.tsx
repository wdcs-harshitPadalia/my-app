import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {horizontalScale, verticalScale} from '../../theme';
import {defaultTheme} from '../../theme/defaultTheme';

interface Props {
	activePage: number;
	totalPageCount?: number;
}

const PageControl: React.FC<Props> = props => {
	const {activePage, totalPageCount} = props;

	const pageArray = Array.from({length: totalPageCount}, () =>
		Math.floor(Math.random() * totalPageCount)
	);

	return (
		<View style={styles.container}>
			{pageArray.map((item, index) => {
				return (
					<LinearGradient
						key={index}
						style={{
							height: 8,
							width: 8,
							marginEnd: horizontalScale(11),
							borderRadius: 4
						}}
						useAngle={true}
						angle={160.5}
						colors={
							activePage === index
								? defaultTheme.secondaryGradientColor
								: defaultTheme.ternaryGradientColor
						}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
export default PageControl;
