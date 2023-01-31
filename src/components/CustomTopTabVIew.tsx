import React, {useRef, useState} from 'react';
import {View, FlatList, StyleSheet, Platform} from 'react-native';
import {Text} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';

import colors from '../theme/colors';
import {Fonts, moderateScale} from '../theme';
import {defaultTheme} from '../theme/defaultTheme';
import {verticalScale, width, gradientColorAngle} from '../theme/metrics';

import DynamicButtonGradient1 from './DynamicButtonGradient1';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
interface CustomTopTabViewProps {
	dataSource: any[];
	onTabChange: Function;
	selectedIndex?: number;
	horizontalSpacing?: number;
	viewWidth?: number;
}

export default function CustomTopTabView(props: CustomTopTabViewProps) {
	const flatListRef = useRef();
	const [selectedItemIndex, setSelectedItemIndex] = useState(
		props.selectedIndex ?? 0
	);

	useUpdateEffect(() => {
		setSelectedItemIndex(props.selectedIndex);
	}, [props.selectedIndex]);

	return (
		<View>
			<FlatList
				ref={flatListRef}
				keyboardShouldPersistTaps={'handled'}
				horizontal
				data={props.dataSource}
				scrollEnabled={false}
				style={[
					{
						borderRadius: 8,
						borderWidth: 1,
						padding: 3,
						marginHorizontal: props.horizontalSpacing,
						marginVertical: verticalScale(8),
						backgroundColor: colors.black
					}
				]}
				contentContainerStyle={
					[
						//styles.flatListContainer,
						//{marginHorizontal: props.horizontalSpacing},
					]
				}
				showsHorizontalScrollIndicator={false}
				renderItem={({item, index}) => (
					<View
						style={[
							styles.flatListItem,
							{
								width: props?.viewWidth
									? props?.viewWidth
									: props.dataSource.length === 2
									? width / 2 - 40 / 2
									: width / props.dataSource.length -
									  7 * (props.dataSource.length - 1)
							}
						]}>
						<DynamicButtonGradient1
							onPress={() => {
								if (selectedItemIndex !== index) {
									props.onTabChange(index);
									setSelectedItemIndex(index);
								}
							}}
							gradientViewStyle={styles.gradientViewStyle}
							colorArray={
								index === selectedItemIndex
									? defaultTheme.primaryGradientColor
									: ['black', 'black']
							}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={item.title}
							textType="capitalize"
							fontFamily={Fonts.type.Inter_ExtraBold}
							//fontOpacity={index === selectedItemIndex ? 1.0 : 0.7}
						>
							{item.badgeCount ? (
								<LinearGradient
									useAngle={true}
									angle={gradientColorAngle}
									colors={
										index === selectedItemIndex
											? ['rgba(38, 38, 38, 0.4)', 'rgba(38, 38, 38, 0.4)']
											: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.2)']
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
				keyExtractor={(item, index) => item.title.toString() + index}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	flatListContainer: {
		backgroundColor: 'black',
		borderRadius: 8,
		padding: 3,
		marginVertical: verticalScale(16),
		marginHorizontal: verticalScale(16)
	},
	flatListItem: {
		borderWidth: 1,
		borderRadius: 8,
		...Platform.select({
			ios: {
				alignItems: 'center',
				justifyContent: 'center'
			},
			android: {
				alignItems: 'center',
				justifyContent: 'center'
			}
		})
	},
	imageStyle: {
		height: 100,
		width: 100
	},
	countGradient: {
		width: 24,
		height: 24,
		//position: 'absolute',
		//opacity: 0.4,
		borderRadius: 12,
		justifyContent: 'center',
		padding: 2,
		marginLeft: 8,
		alignItems: 'center'
		//overflow: 'hidden',
		//marginHorizontal: 5,
		// right: 10,
		// top: 5,
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		//textAlign: 'center',
		textAlignVertical: 'center',
		alignSelf: 'center',
		//backgroundColor: 'red',
		includeFontPadding: false,
		letterSpacing: -2
	},
	gradientViewStyle: {paddingVertical: 5, flex: 1, height: 30}
});
