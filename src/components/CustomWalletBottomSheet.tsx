import {
	Image,
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import React from 'react';
import {
	RenderQrcodeModalProps,
	WalletService
} from '@walletconnect/react-native-dapp';
// import BottomSheet from 'reanimated-bottom-sheet';
import colors from '../theme/colors';
import {Button} from 'react-native-elements';
import {
	height,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../theme/metrics';
import fonts from '../theme/fonts';
import {defaultTheme} from '../theme/defaultTheme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Fonts} from '../theme';
import Strings from '../constants/strings';

function CustomWalletBottomSheet({
	walletServices,
	visible,
	connectToWalletService,
	uri,
	onDismiss
}: RenderQrcodeModalProps): JSX.Element {
	walletServices = walletServices.filter(
		item => item.name === 'MetaMask' || item.name === 'Trust Wallet'
	);

	const renderHeader = React.useCallback(() => {
		return (
			<View
				style={{
					// backgroundColor: defaultTheme.backGroundColor,
					padding: 16,
					backgroundColor: 'rgba(1, 1, 1,0.1)'
					//height: 800,
				}}>
				<Text
					style={{
						color: 'white',
						//marginLeft: 8,
						fontSize: 20,
						fontFamily: fonts.type.Inter_Medium,
						textAlign: 'center'
					}}>
					{'Open with'}
				</Text>
			</View>
		);
	}, [walletServices, uri]);

	const renderContent = React.useCallback(() => {
		return (
			<View
				style={{
					backgroundColor: defaultTheme.backGroundColor,
					padding: moderateScale(16),
					flex: 1,
					// flexDirection: 'row',
					marginHorizontal: 24,
					borderRadius: verticalScale(10),
					// borderColor: Colors.offWhite,
					borderWidth: 0.5
				}}>
				<Text
					style={{
						color: Colors.white,
						marginBottom: 16,
						fontSize: 16,
						fontFamily: Fonts.type.Krona_Regular,
						textAlign: 'center',
						justifyContent: 'space-around'
					}}>
					{Strings.choosse_prefered_wallet}
				</Text>
				{walletServices.map((walletService: WalletService, i: number) => (
					<TouchableOpacity
						style={{
							alignItems: 'center',
							flexDirection: 'row-reverse',
							justifyContent: 'space-between',
							flex: 1,
							marginBottom: 8
							// alignSelf: 'center',
							// backgroundColor: 'rgba(1, 1, 1,0.6)',
							// height: 70,
							// backgroundColor: 'green',
							// justifyContent: 'center',
							// backgroundColor: '#fff',
						}}
						key={`i${i}`}
						onPress={() => {
							connectToWalletService(walletService, uri);
							//onDismiss();
						}}>
						<Image
							style={{height: 50, width: 50, borderRadius: 25}}
							source={{uri: walletService.image_url?.md}}
						/>
						<Text
							style={{
								color: 'white',
								fontSize: 14,
								fontFamily: fonts.type.Inter_Bold
							}}>
							{walletService.name}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	}, [walletServices, uri]);

	return (
		<>
			{visible && (
				<TouchableOpacity
					onPress={onDismiss}
					style={{
						backgroundColor: 'rgba(0,0,0,0.6)',
						...StyleSheet.absoluteFill
					}}>
					<SafeAreaView
						style={{
							//height: height,
							// backgroundColor: 'rgba(255, 255, 255, 0)',
							position: 'absolute',
							top: height / 2 - 150,
							bottom: height / 2 - 150,
							left: 0,
							right: 0
							// backgroundColor: 'rgba(1, 1, 1,0.8)',
							// height: height
						}}>
						{/* <BottomSheet
							//ref={sheetRef}
							snapPoints={[200]}
							borderRadius={10}
							renderContent={renderContent}
							onCloseEnd={onDismiss}
							//renderHeader={renderHeader}
							enableContentInteractionWhileAnimating={false}
							enabledInnerScrolling={false}
						/> */}
					</SafeAreaView>
				</TouchableOpacity>
			)}
		</>
	);

	/*
  return (
    visible && (
      // <BottomSheet renderContent={renderContent} snapPoints={['20%']} />
      // <BottomSheet
      //   enabledBottomClamp
      //   enabledBottomInitialAnimation
      //   enabledGestureInteraction
      //   renderContent={renderContent}
      //   snapPoints={[150]}
      //   contentPosition={}
      // />
      <TouchableOpacity
        onPress={onDismiss}
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          ...StyleSheet.absoluteFill,
        }}>
        <SafeAreaView
          style={{
            //height: height,
            // backgroundColor: 'rgba(255, 255, 255, 0)',
            position: 'absolute',
            top: height / 2 - 150,
            bottom: height / 2 - 150,
            left: 0,
            right: 0,
            // backgroundColor: 'rgba(1, 1, 1,0.8)',
            // height: height
          }}>
          <BottomSheet
            //ref={sheetRef}
            snapPoints={[200]}
            borderRadius={10}
            renderContent={renderContent}
            onCloseEnd={onDismiss}
            //renderHeader={renderHeader}
            enableContentInteractionWhileAnimating={false}
            enabledInnerScrolling={false}
          />
        </SafeAreaView>
      </TouchableOpacity>
    )
  );
  */
}

export default CustomWalletBottomSheet;
