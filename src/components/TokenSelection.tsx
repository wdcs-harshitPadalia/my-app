/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
	Modal,
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {defaultTheme} from '../theme/defaultTheme';
import {height, horizontalScale} from '../theme/metrics';
import InputComponent from './InputComponent';
import TokenItemComponent from './TokenItemComponent';

interface Props {
	data: any;
	onClose: (objData?: any) => void;
	selectedObj: (objData: any) => void;
	pervSelectedID?: string;
	pervSelectedObj?: any;
}

const TokenSelection: React.FC<Props> = props => {
	const [modalVisible, setModalVisible] = useState(true);
	const [isSelectedIndexId, setIsSelectedIndexId] = useState(
		props.pervSelectedID
	);

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<TouchableOpacity
							onPress={() => {
								props.onClose();
								setModalVisible(!modalVisible);
							}}>
							<ExpoFastImage
								style={{height: 20, width: 20, alignSelf: 'flex-end'}}
								source={icons.close}
							/>
						</TouchableOpacity>
						<Text style={styles.textStyle}>{Strings.Select_a_token}</Text>
						<InputComponent
							fontSize={moderateScale(12)}
							style={styles.marginInput}
							// valasdasue={''}
							//   title={'Username'}
							placeholder={Strings.searchToken.toUpperCase()}
							onLeftIconPath={icons.search}
						/>
						<View style={{alignItems: 'flex-end'}}>
							{/* <Text style={styles.balanceText}>{''}</Text> */}
						</View>
						<View style={{maxHeight: height * 0.5}}>
							<FlatList
								//ref={flatListRef}
								//horizontal
								// extraData={selectedIndex}
								data={props.data}
								contentContainerStyle={styles.flatListContentStyle}
								showsHorizontalScrollIndicator={false}
								renderItem={({item}) => (
									<TokenItemComponent
										itemData={item}
										isSelectedIndexId={isSelectedIndexId}
										handleSetIsSelectedIndexId={itemId =>
											setIsSelectedIndexId(itemId)
										}
										handleSetSelectedItem={itemObj => {
											props.onClose(itemObj);
										}}
									/>
								)}
								keyExtractor={(item, index) => item.toString() + index}
								//bounces={false}
								showsVerticalScrollIndicator={false}
							/>
						</View>
						{/* <View
              style={{
                flexDirection: 'row',
                //width: '100%',
                backgroundColor: 'red',
                //alignItems: 'center',
                //justifyContent: 'center',
                flex: 1,
                marginTop: verticalScale(36),
                marginBottom: verticalScale(30),
              }}>
              <DynamicButtonGradient
                colorArray={defaultTheme.ternaryGradientColor}
                angle={gradientColorAngle}
                buttonTextcolor={colors.white}
                buttonText={'cancel'}
                style={styles.bottomButtonStyle}
                textStyle={styles.bottomButtonTextStyle}
                onPress={() => {
                  props.onClose();
                  setModalVisible(!modalVisible);
                }}
              />
              <DynamicButtonGradient
                colorArray={defaultTheme.secondaryGradientColor}
                angle={gradientColorAngle}
                buttonTextcolor={colors.white}
                buttonText={'select'}
                style={styles.bottomButtonStyle}
                textStyle={styles.bottomButtonTextStyle}
                onPress={() => {
                  console.log('selectedItem', selectedItem);
                  props.onClose(selectedItem);
                  setModalVisible(!modalVisible);
                }}
              />
            </View> */}
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//marginTop: 22,
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
		//margin: 20
	},
	marginInput: {
		marginVertical: verticalScale(16)
	},
	flatListContentStyle: {marginTop: 16, paddingBottom: 8},
	modalView: {
		margin: 20,
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: 8,
		padding: 20,
		//alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 3,
		width: '90%'
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 3
	},
	buttonOpen: {
		backgroundColor: '#F194FF'
	},
	buttonClose: {
		backgroundColor: '#2196F3'
	},
	textStyle: {
		color: 'white',
		textAlign: 'center',
		fontFamily: Fonts.type.Krona_Regular,
		fontSize: moderateScale(18)
		//marginBottom: 30,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center'
	},
	balanceText: {
		color: 'white',
		//textAlign: 'center',
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateScale(10),
		opacity: 0.7
		// marginBottom: 30,
	},
	flatListItemTitle: {
		color: 'white',
		//textAlign: 'center',
		fontFamily: Fonts.type.Inter_SemiBold,
		fontSize: moderateScale(12),
		opacity: 0.7
	},
	flatListItemSubTitle: {
		color: 'white',
		//textAlign: 'center',
		fontFamily: Fonts.type.Inter_Medium,
		fontSize: moderateScale(12)
		//opacity: 0.7,
	},
	flatListItemCurrency: {
		color: 'white',
		//textAlign: 'center',
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateScale(10)
		//opacity: 0.7,
	},
	bottomButtonTextStyle: {
		padding: 0,
		paddingVertical: verticalScale(12),
		//flex: 1,
		height: moderateScale(42)
	},
	bottomButtonStyle: {
		paddingHorizontal: horizontalScale(4),
		//marginTop: 16,
		flex: 1
	},
	circleGradient: {
		// flex: 1,
		// height: '100%',
		width: '100%',
		borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row'
	}
});

export default TokenSelection;
