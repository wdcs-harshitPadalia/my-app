import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Text} from 'react-native-elements';
import ExpoFastImage from 'expo-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import HeaderComponent from '../../../components/HeaderComponent';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';

export default function WalletWithdrawalScreen() {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const navigation = useNavigation();

	return (
		<SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.Withdrawal}
					onLeftIconPath={icons.back}
				/>
				{/* <HeaderView fontSize={24} title={Strings.Withdrawal} /> */}

				<KeyboardAwareScrollView bounces={false}>
					<View style={styles.creditCardViewStyle}>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => {
								setIsCollapsed(!isCollapsed);
							}}>
							<LinearGradient
								style={[styles.buttonContainerStyle]}
								colors={['black', 'black']}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}>
								<Text style={styles.buttonTitleText}>
									{Strings.Polygon_Transfer}
								</Text>
								<ExpoFastImage source={icons.downGray} style={styles.img} />
							</LinearGradient>
						</TouchableOpacity>
						<Collapsible
							duration={400}
							easing="easeInOutCubic"
							align="center"
							collapsed={isCollapsed}>
							<View style={{marginBottom: 16}}>
								<ButtonGradient
									colorArray={defaultTheme.secondaryGradientColor}
									angle={gradientColorAngle}
									onPress={() => {
										navigation.navigate(ScreenNames.TransakWebView, {
											type: Strings.withdrawal
										});
									}}
									buttonTextcolor={colors.white}
									buttonText={Strings.withdrawal}
									style={{marginTop: 16}}
									paddingVertical={20}
								/>
							</View>
						</Collapsible>
					</View>
				</KeyboardAwareScrollView>
				{/* <Collapsible collapsed={isCollapsed}>
          <LinearGradient
            style={styles.buttonContainerStyle}
            colors={['black', 'black']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.buttonTitleText}>
              {Strings.Polygon_Transfer}
            </Text>
            <ExpoFastImage source={icons.downGray} style={styles.img} />
          </LinearGradient>
          <LinearGradient
            style={styles.buttonContainerStyle}
            colors={['black', 'black']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.buttonTitleText}>
              {Strings.ETH_Network_Transfer}
            </Text>
            <ExpoFastImage source={icons.downGray} style={styles.img} />
          </LinearGradient>
        </Collapsible> */}
			</View>
		</SafeAreaView>
	);
}
