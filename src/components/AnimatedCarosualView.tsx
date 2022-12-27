import React, {FC, useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {ImageIndicator} from '../constants/utils/Function';
import colors from '../theme/colors';

const {width} = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width - 32; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 8;
interface ImageCarouselItem {
	id: number;
}

interface ImageCarouselProps {
	data: any[];
}

const AnimatedCarosualView: FC<ImageCarouselProps> = ({
	data,
	sliderHeight,
	children
}) => {
	const [dataWithPlaceholders, setDataWithPlaceholders] = useState<
		ImageCarouselItem[]
	>([]);
	const flatListRef = useRef<FlatList<any>>(null);

	// useEffect(() => {
	//   console.log("compoentn reloaded....")
	// }, []);

	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={data}
				renderItem={({item, index}) => {
					// if (!item.uri || !item.title) {
					//   return <View style={{width: EMPTY_ITEM_LENGTH}} />;
					// }
					return (
						<View style={{width: ITEM_LENGTH}}>
							<View key={index.toString()} style={[styles.itemContent]}>
								{/* <ImageIndicator
                  source={{uri: item.uri}}
                  style={styles.itemImage}
                /> */}
								{item}
								<View style={styles.footer}>
									{data?.map((item, innerIndex) => (
										<View
											key={innerIndex.toString()}
											// eslint-disable-next-line react-native/no-inline-styles
											style={{
												height: 10,
												width: 10,
												borderRadius: 5,
												backgroundColor: colors.white,
												opacity: innerIndex === index ? 1 : 0.5,
												marginRight: 6
											}}
										/>
									))}
								</View>
							</View>
						</View>
					);
				}}
				//getItemLayout={getItemLayout}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => `${index}`}
				bounces={false}
				decelerationRate={0}
				renderToHardwareTextureAndroid
				contentContainerStyle={[styles.flatListContent, {height: sliderHeight}]}
				snapToInterval={ITEM_LENGTH}
				snapToAlignment="center"
				scrollEventThrottle={16}
			/>
		</View>
	);
};

export default AnimatedCarosualView;

const styles = StyleSheet.create({
	container: {},
	arrowBtn: {},
	arrowBtnText: {
		fontSize: 42,
		fontWeight: '600'
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		//marginTop: 10,
		position: 'absolute',
		bottom: 10
	},
	flatListContent: {
		//height: 150, //CURRENT_ITEM_TRANSLATE_Y * 2 + ITEM_LENGTH,
		alignItems: 'center'
		//marginBottom: CURRENT_ITEM_TRANSLATE_Y,
	},
	item: {},
	itemContent: {
		//marginHorizontal: SPACING * 3,
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: BORDER_RADIUS,
		overflow: 'hidden',
		borderColor: 'white',
		borderWidth: 1
	},
	itemText: {
		fontSize: 24,
		position: 'absolute',
		bottom: SPACING * 2,
		right: SPACING * 2,
		color: 'white',
		fontWeight: '600'
	},
	itemImage: {
		width: width - 32,
		height: '100%',
		resizeMode: 'cover',
		overflow: 'hidden'
	}
});
