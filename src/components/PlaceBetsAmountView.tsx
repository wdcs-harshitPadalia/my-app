/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity,
	Platform
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import {decimalValue} from '../constants/api';
import Strings from '../constants/strings';
import {getRoundDecimalValue} from '../constants/utils/Function';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradientWithRightIcon from './ButtonGradientWithRightIcon';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import GradientText from './GradientText';

interface Props extends TextInputProps {
	popupTitle?: string;
	betAmount: (amount: string) => void;
	addedAmount?: string;
	isShowError?: boolean;
	errMessage?: string;
	oddsData: any[];
	previousData: any;
	selectedBetOdds: (odds: any) => void;
	oddsIndex: any;
	selectedOddsIndex: (odds: any) => void;
	isEditOdds?: boolean;
	betOdds?: string;
	onPressNeedHelp?: (type: any) => void;
}

const PlaceBetsAmountView: React.FC<Props> = props => {
	const {
		popupTitle,
		betAmount,
		addedAmount,
		isShowError,
		errMessage,
		previousData,
		oddsData,
		oddsIndex,
		selectedOddsIndex,
		selectedBetOdds,
		isEditOdds,
		betOdds,
		onPressNeedHelp
	} = props;

	const [tempOddsIndex, setTempOddsIndex] = useState(oddsIndex);
	const [payOutAmount, setPayOutAmount] = useState(
		parseFloat(addedAmount?.replace(',', '.') * betOdds)
	);

	useUpdateEffect(() => {
		if (tempOddsIndex !== -1) {
			console.log('tempOddsIndex', tempOddsIndex);
			selectedOddsIndex(tempOddsIndex);
			selectedBetOdds(oddsData[tempOddsIndex]);
			setPayOutAmount(
				parseFloat(
					addedAmount?.replace(',', '.') * oddsData[tempOddsIndex]?.decimal
				)
			);
		}
	}, [tempOddsIndex]);

	useUpdateEffect(() => {
		let tempAmount = parseFloat(addedAmount?.replace(',', '.') * betOdds);
		if (tempAmount) {
			setPayOutAmount(tempAmount);
		} else {
			setPayOutAmount(0);
		}
	}, [addedAmount]);

	return (
		<View style={styles.viewDetails}>
			<View style={styles.infoView}>
				<Text style={styles.titleStyle}>{popupTitle}</Text>
				<TouchableOpacity
					onPress={() => {
						onPressNeedHelp && onPressNeedHelp('betInfo');
					}}
					hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.about}
						style={styles.helpImg}
					/>
				</TouchableOpacity>
			</View>

			<ButtonGradientWithRightIcon
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				style={styles.marginInput}
				short_name={'US$'}
				onChangeText={(text: string) => {
					// betAmount({number: text.replace(/^\d+(?:[.,]\d+)*$/gm)});
					betAmount(text);
				}}
				textValue={addedAmount}
				keyboardType="decimal-pad"
				maxLength={6}
				errMessage={errMessage}
				isShowError={isShowError}
				btnDisabled={true}
			/>

			{/* {isEditOdds && ( */}
			<View style={styles.infoView}>
				<Text style={styles.titleStyle}>{Strings.total_payout}</Text>
				<TouchableOpacity
					onPress={() => {
						onPressNeedHelp && onPressNeedHelp('odds');
					}}
					hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.about}
						style={styles.helpImg}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.payOutStyle}>
				<ButtonGradientWithRightIcon
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					style={styles.buttonInputStyle}
					short_name={'US$'}
					onChangeText={(text: string) => {
						setPayOutAmount(text);
					}}
					onEndEditing={async () => {
						let copy = [...oddsData];
						let temp = copy.sort((a, b) => {
							return (
								Math.abs(
									parseFloat(
										payOutAmount?.replace(',', '.') /
											addedAmount?.replace(',', '.') ?? 0
									) - parseFloat(a?.decimal)
								) -
								Math.abs(
									parseFloat(
										payOutAmount?.replace(',', '.') /
											addedAmount?.replace(',', '.') ?? 0
									) - parseFloat(b?.decimal)
								)
							);
						});
						console.log('sdddad', temp[0]);
						await setTempOddsIndex(-1);

						let index1 = 0;
						console.log(
							'oddsData.findIndex(temp)....',
							oddsData.filter((item, index) => {
								if (item?._id === temp[0]._id) {
									index1 = index;
									console.log(index, 'dfkhdjkdfkdfhfd');
								}
							})
						);

						console.log('index1>>>>', index1);
						setTempOddsIndex(index1);
					}}
					textValue={payOutAmount + ''}
					keyboardType="decimal-pad"
					maxLength={10}
					editable={Platform.OS === 'web' ? false : isEditOdds === false ? false : !isShowError}
					btnDisabled={true}
				/>
				{isEditOdds && (
					<View style={styles.circleGradient}>
						<TouchableOpacity
							onPress={() => {
								if (tempOddsIndex !== 0) {
									setTempOddsIndex(tempOddsIndex - 1);
								}
							}}>
							<Text style={styles.plusStyle}>-</Text>
						</TouchableOpacity>
						{/* <TextInput
                keyboardType={'decimal-pad'}
                returnKeyType={'done'}
                style={styles.oddsStyle}
                maxLength={10}
                onChangeText={(text: string) => {
                  setTempSelectedOdds(text);
                }}
                onEndEditing={async () => {
                  let copy = [...oddsData];
                  let temp = copy.sort((a, b) => {
                    return (
                      Math.abs(
                        parseFloat(tempSelectedOdds ?? 0) -
                          parseFloat(a?.decimal),
                      ) -
                      Math.abs(
                        parseFloat(tempSelectedOdds ?? 0) -
                          parseFloat(b?.decimal),
                      )
                    );
                  });
                  console.log('sdddad', temp[0]);
                  await setTempOddsIndex(-1);

                  let index1 = 0;
                  console.log(
                    'oddsData.findIndex(temp)....',
                    oddsData.filter((item, index) => {
                      if (item?._id === temp[0]._id) {
                        index1 = index;
                        console.log(index, 'dfkhdjkdfkdfhfd');
                      }
                    }),
                  );

                  console.log('index1>>>>', index1);
                  setTempOddsIndex(index1);
                }}>
                {tempSelectedOdds}
              </TextInput> */}

						<TouchableOpacity
							onPress={() => {
								if (oddsData.length !== tempOddsIndex + 1) {
									setTempOddsIndex(tempOddsIndex + 1);
								}
							}}>
							<Text style={styles.plusStyle}>+</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
			{payOutAmount > 0 && (
				<View style={styles.flexRawContainer}>
					<Text style={[styles.amountStyle, {color: colors.placeholderColor}]}>
						{Strings.you_will_win + ': '}
					</Text>
					{Platform.OS === 'web' ? (
						<Text
							style={[
								styles.amountStyle,
								{color: defaultTheme.textGradientColor[1]}
							]}>
							{'$' +
								getRoundDecimalValue(
									addedAmount?.replace(',', '.') * betOdds -
										addedAmount?.replace(',', '.')
								)}
						</Text>
					) : (
						<GradientText
							colors={defaultTheme.textGradientColor}
							style={styles.amountStyle}>
							{'$' +
								getRoundDecimalValue(
									addedAmount?.replace(',', '.') * betOdds -
										addedAmount?.replace(',', '.')
								)}
						</GradientText>
					)}
				</View>
			)}

			<Text style={styles.desStyle}>
				{'Your bet will pay '}
				<Text style={styles.desOddsStyle}>{betOdds + 'x'}</Text>
				{' the amount you are betting.'}
				{previousData?.impliedOdds && (
					<Text style={styles.desStyle}>
						{'\nYour estimated probability of winning is '}
						<Text style={[styles.desOddsStyle, {color: colors.textPink}]}>
							{+(previousData?.decimal == betOdds
								? previousData?.impliedOdds
								: previousData?.oppositeImpliedOdds) + '%'}
						</Text>
					</Text>
				)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	viewDetails: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		justifyContent: 'center',
		marginVertical: verticalScale(16),
		paddingBottom: verticalScale(8)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingTop: verticalScale(20),
		paddingBottom: verticalScale(16),
		flex: 1
	},
	marginInput: {
		marginHorizontal: horizontalScale(16)
	},
	plusStyle: {
		fontSize: moderateScale(32),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular,
		marginHorizontal: verticalScale(12)
	},
	oddsStyle: {
		fontSize: moderateScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		margin: verticalScale(12)
	},
	buttonInputStyle: {
		flex: 1
	},
	circleGradient: {
		borderRadius: verticalScale(8),
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		backgroundColor: defaultTheme.backGroundColor,
		marginLeft: horizontalScale(12)
	},
	desStyle: {
		margin: verticalScale(16),
		fontSize: moderateScale(16),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Medium
	},
	desOddsStyle: {
		fontSize: moderateScale(16),
		color: colors.darkRed,
		fontFamily: Fonts.type.Inter_Medium
	},
	amountStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginTop: horizontalScale(16)
	},
	payOutStyle: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(16),
		justifyContent: 'space-between'
	},
	helpImg: {
		height: 20,
		width: 20
	},
	infoView: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(16),
		alignItems: 'center'
	},
	flexRawContainer: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(16)
	}
});

export default PlaceBetsAmountView;
