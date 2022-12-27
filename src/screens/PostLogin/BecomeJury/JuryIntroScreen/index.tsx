import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import icons from '../../../../assets/icon';

import ButtonGradient from '../../../../components/ButtonGradient';
import HeaderComponent from '../../../../components/HeaderComponent';
import JuryIntroComponent from '../../../../components/JuryIntro/JuryIntroComponent';
import PageControl from '../../../../components/JuryIntro/PageControl';
import Strings from '../../../../constants/strings';
import ScreenNames from '../../../../navigation/screenNames';
import {verticalScale} from '../../../../theme';

import {styles} from './styles';
import {defaultTheme} from '../../../../theme/defaultTheme';
import colors from '../../../../theme/colors';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {gradientColorAngle} from '../../../../theme/metrics';

const JuryIntroArrayData = [
	{
		id: 1,
		image_url: icons.profile,
		title_text: Strings.become_judge,
		description_text: Strings.become_judge_desc
	},
	{
		id: 2,
		image_url: icons.medal,
		title_text: Strings.exclusive_privileges,
		description_text: Strings.exclusive_privileges_desc
	},
	{
		id: 3,
		image_url: icons.lock,
		title_text: Strings.penalties,
		description_text: Strings.penalties_desc
	}
];

const JuryIntroScreen: React.FC<any> = () => {
	const navigation = useNavigation();

	const [currentPageNo, setCurrentPageNo] = useState(0);
	const [scrollEnabled, setScrollEnabled] = useState(true);

	const flatListRef = useRef(null);

	const [juryEscrowDeposit, setJuryEscrowDeposit] = useState('');

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const {
		userInitialStake,
		lastWithdrawalAmount,
		juryDbethToken,
		getDisputeConfigDbethToken,
		tokenSymbol,
		getSymbol
	} = useBetCreateContract(false);

	useEffect(() => {
		userInitialStake();
		getSymbol();
	}, []);

	useUpdateEffect(() => {
		if (juryDbethToken) {
			setJuryEscrowDeposit(juryDbethToken);
		}
	}, [juryDbethToken]);

	useUpdateEffect(() => {
		if (lastWithdrawalAmount) {
			if (lastWithdrawalAmount === 'Error' || lastWithdrawalAmount === '') {
				console.log('User denied metamask access');
			} else {
				if (lastWithdrawalAmount === '0') {
					getDisputeConfigDbethToken(userInfo.user.walletAddress);
				} else {
					setJuryEscrowDeposit(lastWithdrawalAmount);
				}
			}
		}
	}, [lastWithdrawalAmount]);

	const renderItem = ({item}) => {
		return (
			<JuryIntroComponent
				juryIntroData={item}
				escrowAmount={juryEscrowDeposit + ' ' + tokenSymbol}
			/>
		);
	};

	const onScrollEnd = e => {
		let contentOffset = e.nativeEvent.contentOffset;
		let viewSize = e.nativeEvent.layoutMeasurement;

		// Divide the horizontal offset by the width of the view to see which page is visible
		let pageNum = Math.floor(contentOffset.x / viewSize.width);

		setCurrentPageNo(pageNum);
	};

	const handleButtonClick = () => {
		const currentPage = currentPageNo + 1;

		// if (JuryIntroArrayData.length - 1 === currentPage) {
		// 	setScrollEnabled(!scrollEnabled);
		// }

		if (JuryIntroArrayData.length !== currentPage) {
			flatListRef.current.scrollToIndex({index: currentPage});
		} else {
			navigation.navigate(ScreenNames.JuryPayChargeScreen);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					// name={Strings.back}
				/>
				<View style={{marginTop: verticalScale(60)}}>
					<FlatList
						ref={flatListRef}
						data={JuryIntroArrayData}
						keyExtractor={item => item.id}
						renderItem={renderItem}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						// onMomentumScrollEnd={onScrollEnd}
						onScroll={onScrollEnd}
						scrollEnabled={scrollEnabled}
					/>
				</View>
			</View>

			<View style={{marginTop: verticalScale(16)}}>
				<View style={{marginBottom: verticalScale(16)}}>
					<PageControl
						activePage={currentPageNo}
						totalPageCount={JuryIntroArrayData.length}
					/>
				</View>
				<ButtonGradient
					style={styles.button}
					buttonText={currentPageNo === 2 ? Strings.continue : Strings.next}
					buttonTextcolor={colors.white}
					colorArray={defaultTheme.secondaryGradientColor}
					angle={gradientColorAngle}
					onPress={handleButtonClick}
				/>
			</View>
		</SafeAreaView>
	);
};

export default JuryIntroScreen;
