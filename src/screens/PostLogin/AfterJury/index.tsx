import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, FlatList, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ExpoFastImage from 'expo-fast-image';

import styles from './styles';
import icons from '../../../assets/icon';
import CustomTopTabView from '../../../components/CustomTopTabVIew';
import HeaderComponent from '../../../components/HeaderComponent';
import JuryOptionsBottomSheetComponent from '../../../components/JuryOptionsBottomSheetComponent';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import JuryCaseItemComponent from '../../../components/JuryCaseItemComponent';
import {verticalScale} from '../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {getJuryCases} from '../../../redux/apiHandler/apiActions';
import {RootState} from '../../../redux/store';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import JuryDetailsViewComponent from '../../../components/JuryDetailsViewComponent';
import {useBetCreateContract} from '../../../components/CustomHooks/SmartContract';

const AfterJuryScreen: React.FC<any> = props => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [openBottomSheet, setOpenBottomSheet] = useState(false);
	const [juryCasesData, setJuryCasesData] = useState([]);
	const [juryCasesTotalCount, setJuryCasesTotalCount] = useState(0);
	const [currentPageNumber, setCurrentPageNumber] = useState(0);

	const [availableStake, setAvilableStake] = useState('');
	const [isShowNodata, setIsShowNodata] = useState(false);

	const {
		getSymbol,
		tokenSymbol,
		getJuryStrike,
		strike,
		strikePercentage,
		getJuryTokensShare,
		userInitialStake,
		juryDbethToken,
		lastWithdrawalAmount,
		juryVersion,
		getJuryVersion
	} = useBetCreateContract(false);

	const tabListData = [
		{
			id: 1,
			title: Strings.active_cases
		},
		{
			id: 2,
			title: Strings.past
		}
	];

	useEffect(() => {
		getSymbol();
		userInitialStake();
		getJuryVersion();
	}, []);

	useUpdateEffect(() => {
		if (juryDbethToken) {
			if (juryDbethToken === 'Error') {
				console.log('User denied metamask access');
			} else {
				getJuryStrike();
			}
		}
	}, [juryDbethToken]);

	useUpdateEffect(() => {
		if (strike && juryVersion) {
			console.log('strike level', strike, juryDbethToken);
			if (strike == 0) {
				setAvilableStake(juryDbethToken);
			} else if (strike == 4) {
				setAvilableStake(0);
			} else {
				getJuryTokensShare(strike, juryVersion);
			}
		}
	}, [strike, juryVersion]);

	useUpdateEffect(() => {
		if (strikePercentage) {
			if (strikePercentage === 'Error') {
				console.log('User denied metamask access');
			} else {
				console.log('juryDbethToken ::', juryDbethToken);
				console.log('strikePercentage ::', strikePercentage);
				setAvilableStake(
					parseFloat(juryDbethToken) -
						(parseFloat(juryDbethToken) * parseFloat(strikePercentage)) / 100
				);
			}
		}
	}, [strikePercentage]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('activeTabIndex >> ', activeTabIndex);
			getJuryCasesData(activeTabIndex, currentPageNumber);
		});
		return () => {
			unsubscribe;
		};
	}, []);

	useUpdateEffect(() => {
		getJuryCasesData(activeTabIndex, currentPageNumber);
	}, [activeTabIndex, currentPageNumber]);

	const getJuryCasesData = (index, pageNumber) => {
		dispatch(updateApiLoader({apiLoader: true}));

		const uploadData = {
			isActive: index === 0 ? true : false,
			skip: pageNumber,
			limit: 10
		};

		getJuryCases(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				if (res?.data?.jurycases?.length > 0) {
					if (currentPageNumber == 0) {
						setJuryCasesData(res?.data?.jurycases);
					} else {
						setJuryCasesData([...juryCasesData, ...res?.data?.jurycases]);
					}
					setJuryCasesTotalCount(res?.data?.count);
				}
				setIsShowNodata(res?.data?.jurycases.length === 0 ? true : false);
				// console.log('getJuryCases Response : ', JSON.stringify(res));
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getJuryCases Data Err : ', err);
				Alert.alert('', Strings.somethingWentWrong);
			});
	};

	const handleTabChange = item => {
		setCurrentPageNumber(0);
		setJuryCasesData([]);
		setActiveTabIndex(item);
	};

	const handleBottomSheet = () => {
		setOpenBottomSheet(false);
	};

	const onPressActiveInactive = () => {
		// do here for active / inactive
	};

	const onPressRecoverFunds = () => {
		setOpenBottomSheet(false);
		navigation.navigate(ScreenNames.RecoverFundsScreen);
	};

	const onPressJuryCase = item => {
		navigation.navigate(ScreenNames.ViewDisputeScreen, {
			betId: item?.betDetails?._id,
			juryId: userInfo?.user?._id,
			vote: item?.yourVote ?? '',
			isFromJury: true,
			isVoted: item?.isVoted
		});
	};

	const renderItem = ({item}) => {
		return (
			<JuryCaseItemComponent
				key={item._id}
				data={item}
				onPressJuryCase={() => activeTabIndex === 0 && onPressJuryCase(item)}
				isActive={activeTabIndex === 0 ? true : false}
			/>
		);
	};

	const NoJuryPartComponent = () => {
		return (
			<View style={styles.notPartJuryContainer}>
				<ExpoFastImage
					resizeMode={'contain'}
					source={icons.hammer}
					style={styles.hammerImg}
				/>
				<Text style={styles.notPartJuryTitleText}>
					{Strings.not_part_jury_title}
				</Text>
				<Text style={styles.notPartJuryDescText}>
					{Strings.not_part_jury_desc}
				</Text>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.jury_area}
					onSettingIconPath={icons.setting}
					onSettingMenuPress={() => {
						setOpenBottomSheet(true);
					}}
				/>
				<View style={styles.innerContainer}>
					{/* <Text style={styles.headerText}>{Strings.jury_area}</Text> */}
					<Text style={styles.subTitleText}>{Strings.manage_your_case}</Text>

					<JuryDetailsViewComponent
						juryName={userInfo?.user?.userName}
						juryProfileImage={userInfo?.user?.picture}
						juryStrikeLevel={strike}
						juryAvailableStrike={availableStake + ' ' + tokenSymbol}
						juryClaimedRewards={lastWithdrawalAmount + ' ' + tokenSymbol}
					/>

					<CustomTopTabView
						dataSource={tabListData}
						onTabChange={handleTabChange}
						selectedIndex={activeTabIndex}
					/>

					<FlatList
						data={juryCasesData}
						renderItem={renderItem}
						contentContainerStyle={{flexGrow: 1}}
						style={{marginVertical: verticalScale(8)}}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={() => {
							return <>{isShowNodata && <NoJuryPartComponent />}</>;
						}}
						onMomentumScrollEnd={() => {
							if (juryCasesTotalCount !== juryCasesData.length) {
								setCurrentPageNumber(currentPageNumber + 1);
							}
						}}
					/>
				</View>
			</View>
			<JuryOptionsBottomSheetComponent
				openBottomSheet={openBottomSheet}
				onPress={data => {
					// if (data) {
					//   props.onMenuPressed(data, feedItemData);
					// }
					// seIsMenuOpen(false);
				}}
				onCloseSheet={handleBottomSheet}
				onPressRecoverFunds={onPressRecoverFunds}
			/>
		</SafeAreaView>
	);
};

export default AfterJuryScreen;
