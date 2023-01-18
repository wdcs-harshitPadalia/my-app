import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import NoDataComponent from '../../../components/NoDataComponent';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';

const WithdrawSuccessScreen = () => {
	const navigation = useNavigation();
	const {params} = useRoute();

	const noDataItem = {
		image_url: icons.money_withdraw,
		title_text: Strings.congratulations,
		description_text: 'Your',
		highlightText: params?.amount,
		description_text2: Strings.successful_withdrawal
	};

	function handleBtnPressed() {
		navigation.navigate(ScreenNames.WalletScreen, {});
	}

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<View style={styles.noDataContainer}>
						<NoDataComponent noData={noDataItem} isFromWithdrawal={true} />
					</View>

					<ButtonGradient
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.finish}
						style={styles.buttonInputStyle}
						onPress={() => {
							handleBtnPressed();
						}}
					/>
				</View>
			</SafeAreaView>
		</>
	);
};

export default WithdrawSuccessScreen;
