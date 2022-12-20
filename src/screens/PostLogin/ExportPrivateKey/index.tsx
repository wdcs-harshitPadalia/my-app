/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import HeaderComponent from '../../../components/HeaderComponent';
import {HeaderView} from '../../../components/HeaderView';
import Strings from '../../../constants/strings';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';

const ExportPrivateKeyScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	return (
		<SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<HeaderComponent
						onLeftMenuPress={() => {
							navigation.goBack();
						}}
						name={Strings.your_wallet}
						onLeftIconPath={icons.back}
					/>
				</View>
				<HeaderView fontSize={24} title={Strings.Export_Private_Key} />
				<View style={styles.rootViewStyle}>
					<Text style={styles.title}>{Strings.Text}</Text>
					<View style={styles.copyTextContainer}>
						<Text style={styles.copyText}>
							gfdj43gf122hmkru37305jffhhti578ebfu36ni4bkssb5u5t969604jgbgu
						</Text>
					</View>
					<ButtonGradient
						onPress={() => {
							// handleSubmit();
						}}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.copy_to_clipboard}
						style={{marginTop: 30}}
						paddingVertical={20}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ExportPrivateKeyScreen;
