import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ImageSourcePropType, View, Platform} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {defaultTheme} from '../theme/defaultTheme';
import ButtonLeftIconGradient from './ButtonLeftIconGradient';
import {gradientColorAngle, horizontalScale} from '../theme/metrics';
import Strings from '../constants/strings';
import icons from '../assets/icon';
import ButtonTopIconGradient from './ButtonTopIconGradient';

interface Props {
	angle?: number;
	isOpen?: boolean;
	onPress: (data) => void;
	dataSource?: any[];
	dataType?: string;
}

const BottomSharePopup: React.FC<Props> = props => {
	const {onPress, dataType, dataSource} = props;

	const refRBSheet = useRef();
	const [text, setText] = useState(props.dataSource[0]);

	useEffect(() => {
		props.isOpen && refRBSheet.current.open();
		!props.isOpen && refRBSheet.current.close();
	}, [props.isOpen]);

	return (
		<View style={[{...props.style}, styles.container]}>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={Platform.OS !== 'web'}
				closeOnPressMask={Platform.OS === 'web'}
				onClose={() => {
					onPress(undefined);
				}}
				customStyles={{
					wrapper: {
						//backgroundColor: 'transparent'
					},
					draggableIcon: {
						backgroundColor: colors.placeholderColor
					},
					container: {
						backgroundColor: defaultTheme.backGroundColor,
						flex: dataType !== 'customBet' ? 0.4 : 0.25
					}
				}}>
				{/* {lapsList()} */}
				<View style={styles.rootContainer}>
					{/* {dataType !== 'customBet' ? ( */}
					<>
						<View style={styles.flexRaw}>
							<ButtonTopIconGradient
								onPress={() => onPress && onPress(dataSource && dataSource[1])}
								style={{marginRight: horizontalScale(6)}}
								activeOpacity={0.8}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonText={Strings.share}
								topIconPath={icons.ic_share_upload}
								textType={'none'}
							/>
							<ButtonTopIconGradient
								onPress={() => onPress && onPress(dataSource && dataSource[0])}
								style={{marginLeft: horizontalScale(6)}}
								activeOpacity={0.8}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextGradientncolor={defaultTheme.primaryGradientColor}
								buttonText={Strings.str_report}
								topIconPath={icons.ic_report}
								textType={'none'}
							/>
						</View>
						{dataSource && dataSource[2] && (
							<ButtonLeftIconGradient
								style={{marginTop: verticalScale(12)}}
								onPress={() => onPress && onPress(dataSource && dataSource[2])}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={
									dataType !== 'customBet'
										? Strings.str_share_to_my_story
										: Strings.share
								}
								leftIconPath={
									dataType !== 'customBet'
										? icons.plusRound
										: icons.ic_share_upload
								}
								textType={'none'}
								btnGradientStyle={{paddingVertical: verticalScale(8)}}
							/>
						)}
					</>
					{/* ) : (
						<ButtonLeftIconGradient
							style={{marginTop: verticalScale(12)}}
							onPress={() => onPress && onPress(dataSource && dataSource[0])}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={
								dataType !== 'customBet'
									? Strings.str_share_to_my_story
									: Strings.share
							}
							leftIconPath={
								dataType !== 'customBet'
									? icons.plusRound
									: icons.ic_share_upload
							}
							textType={'none'}
							btnGradientStyle={{paddingVertical: verticalScale(8)}}
						/>
					)} */}
				</View>
			</RBSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	leftImg: {
		height: 15,
		width: 15,
		marginRight: verticalScale(10)
	},
	rightImg: {
		height: 10,
		width: 10,
		marginHorizontal: verticalScale(10)
	},
	userNameStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	monthNameStyle: {
		fontSize: moderateScale(14),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		padding: 12
	},
	calenderImg: {
		height: 15,
		width: 15,
		marginLeft: verticalScale(30)
	},
	rootContainer: {
		marginVertical: verticalScale(16),
		marginHorizontal: horizontalScale(20)
	},
	flexRaw: {
		flexDirection: 'row'
	}
});

export default BottomSharePopup;
