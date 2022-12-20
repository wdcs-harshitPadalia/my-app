/* eslint-disable react/display-name */
import {View, FlatList, StyleSheet} from 'react-native';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {Text} from 'react-native-elements';
import {
	verticalScale,
	horizontalScale,
	width,
	screenWidth,
	gradientColorAngle
} from '../theme/metrics';
import {defaultTheme} from '../theme/defaultTheme';
import colors from '../theme/colors';
import DynamicButtonGradient from './DynamicButtonGradient';
import {LinearGradient} from 'expo-linear-gradient';
import {Fonts, moderateScale} from '../theme';
import {max} from 'moment';
import DynamicButtonGradient1 from './DynamicButtonGradient1';
import useUpdateEffect from './CustomHooks/useUpdateEffect';

interface ScrollableCustomTabViewProps {
	dataSource: any[];
	onTabChange: Function;
	selectedIndex?: number;
	gradientColors?: string[];
	isFromCategory?: boolean;
	isFromDiscover?: boolean;
}

const ScrollableCustomTabView = forwardRef(
	(props: ScrollableCustomTabViewProps, ref?: any) => {
		const [selectedItemIndex, setSelectedItemIndex] = useState(
			props.selectedIndex ?? 0
		);
		const [contentSize, setContentSize] = useState(true);

		const [preventOnLayout, setPreventOnLayout] = useState(false);

		const [layoutChanged, setLayoutChanged] = useState(false);
		let totalWidth = 0;

		const maxWidth = useRef(0);

		useEffect(() => {
			console.log('contentSize', contentSize);
		}, [contentSize]);

		useUpdateEffect(() => {
			setSelectedItemIndex(props?.selectedIndex);
		}, [props?.selectedIndex]);

		return (
			<View>
				<FlatList
					ref={ref}
					horizontal={true}
					data={props.dataSource}
					//scrollEnabled={false}
					// eslint-disable-next-line react-native/no-inline-styles
					style={[
						{
							borderRadius: 8,
							borderWidth: 1,
							padding: 3,
							marginHorizontal: horizontalScale(16),
							marginTop: verticalScale(8),
							backgroundColor: 'black'
						}
					]}
					//contentContainerStyle={{alignSelf: 'center'}}
					showsHorizontalScrollIndicator={false}
					contentInset={{right: 20, top: 0, left: 0, bottom: 0}}
					// onContentSizeChange={(contentWidth, contentHeight) => {
					//   console.log(
					//     'contentWidth>???',
					//     contentWidth > width,
					//     contentWidth,
					//     width,
					//   );
					//   if (contentSize) {
					//     // setContentSize(contentWidth > width);
					//   }
					// }}
					//bounces={false}
					renderItem={({item, index}) => (
						<View
							onLayout={event => {
								if(preventOnLayout && !props?.isFromDiscover) {
									return;
								}
								// totalWidth = totalWidth + event.nativeEvent.layout.width;
								if (event.nativeEvent.layout.width > maxWidth.current) {
									setPreventOnLayout(true);
									maxWidth.current = event.nativeEvent.layout.width;
								}
								if (index === props.dataSource.length - 1) {
									if (maxWidth.current * props.dataSource.length < width - 40) {
										maxWidth.current =
											width / props.dataSource.length -
											40 / props.dataSource.length;
										setContentSize(false);
									} else {
										setContentSize(false);
									}
								}
								setTimeout(() => {
									setLayoutChanged(true);
								}, 100);
								//maxWidth
								// console.log(
								//   'event.nativeEvent.layout.width',
								//   event.nativeEvent.layout.width,
								// );
							}}
							style={[
								styles.flatListItem,
								{opacity: layoutChanged ? 1 : 0},
								!contentSize && maxWidth.current
									? {
											width: maxWidth.current
											//flex: 1,
									  }
									: {
											//maxWidth: maxWidth.current,
											//width: '100%',
											//flex: 1
									  }
								// props.dataSource.length === 2 || props.dataSource.length === 3
								//   ? {
								//       width:
								//         props.dataSource.length === 2
								//           ? width / props.dataSource.length -
								//             6 * (props.dataSource.length + 1)
								//           : width / props.dataSource.length -
								//             6 * (props.dataSource.length - 1),
								//     }
								//   : {},
							]}>
							<DynamicButtonGradient1
								onPress={() => {
									if (index === selectedItemIndex) return;
									ref?.current?.scrollToIndex({index: index});
									props.onTabChange(item, index);
									setSelectedItemIndex(index);
								}}
								gradientViewStyle={styles.gradientViewStyle}
								colorArray={
									index === selectedItemIndex
										? props.gradientColors ?? defaultTheme.primaryGradientColor
										: ['black', 'black']
								}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={item.title ?? item.name}
								textType="none"
								//fontOpacity={index === selectedItemIndex ? 1.0 : 0.7}
							>
								{item.badgeCount ? (
									<LinearGradient
										useAngle={true}
										angle={gradientColorAngle}
										colors={
											index === selectedItemIndex
												? ['rgba(38, 38, 38, 0.4)', 'rgba(38, 38, 38, 0.4)']
												: [
														'rgba(255, 255, 255, 0.2)',
														'rgba(255, 255, 255, 0.2)'
												  ]
										}
										style={[
											styles.countGradient,
											{opacity: index === selectedItemIndex ? 1 : 0.7}
										]}>
										<Text style={styles.titleStyle}>{item.badgeCount} </Text>
									</LinearGradient>
								) : null}
							</DynamicButtonGradient1>
						</View>
					)}
					keyExtractor={(item, index) => item.toString() + index}
				/>
			</View>
		);
	}
);

export default ScrollableCustomTabView;

const styles = StyleSheet.create({
	flatListContainer: {
		//backgroundColor: 'black',
		//padding: 3,
		//marginHorizontal: horizontalScale(16),
		// marginTop: verticalScale(8),
		//overflow: 'hidden',
		//flexShrink: 1,
		// borderWidth: 1,
		// borderRadius: 8,
	},
	flatListItem: {
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageStyle: {
		height: 100,
		width: 100
	},
	countGradient: {
		//width: 24,
		//height: 24,
		//position: 'absolute',
		//opacity: 0.4,
		borderRadius: 12,
		justifyContent: 'center',
		padding: 2
		//marginHorizontal: 5,
		// right: 10,
		// top: 5,
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		marginHorizontal: 2
	},
	gradientViewStyle: {paddingVertical: 5, flex: 1}
});
