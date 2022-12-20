import {View, FlatList, StyleSheet} from 'react-native';
import React, {forwardRef, useRef} from 'react';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import {ImageIndicator} from '../constants/utils/Function';
import colors from '../theme/colors';
import CategoryImageComponent from '../components/CategoryImageComponent';
import {width} from '../theme/metrics';

interface Props {
	data: any[];
	selectedCategory: object;
	onCategoryChange: (category: object) => void;
}

const FlatListSlider = forwardRef((props: Props, ref?: any) => {
	const {data, selectedCategory, onCategoryChange} = props;

	return (
		<View>
			<FlatList
				ref={ref}
				horizontal
				data={data}
				contentContainerStyle={styles.flatListContainer}
				showsHorizontalScrollIndicator={false}
				renderItem={({item, index}) => (
					<View style={styles.flatListItem}>
						{/* <ExpoFastImage style={styles.imageStyle} source={item.imageUrl} /> */}
						<CategoryImageComponent
							style={{width: width * 0.25, height: width * 0.25}}
							//title={item.name.toUpperCase()}
							imgPath={item.imageUrl}
							onPress={() => {
								if (selectedCategory?._id !== item?._id) onCategoryChange(item);
							}}
							isShadow={selectedCategory?._id === item._id}
							//selectedCount={0}
						/>
					</View>
				)}
				keyExtractor={(item, index) => item.toString() + index}
			/>
		</View>
	);
});

export default FlatListSlider;

const styles = StyleSheet.create({
	flatListContainer: {
		//paddingHorizontal: 10,
		//paddingBO: 20,
	},
	imageBgStyle: {
		height: 100,
		width: 100
		//borderRadius: 8,
	},
	flatListItem: {
		//borderWidth: 1,
		flex: 1,
		//marginRight: 5,
		borderRadius: 8,
		overflow: 'hidden'
	}
});
