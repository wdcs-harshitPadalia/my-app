import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketsView from '../../../components/TicketsView';
import {defaultTheme} from '../../../theme/defaultTheme';
import {
	createTicket,
	getAllSupportTickets
} from '../../../redux/apiHandler/apiActions';
import {useDispatch} from 'react-redux';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import LoadMoreLoaderView from '../../../components/LoadMoreLoaderView';
import CreateNewTickets from '../../../components/CreateNewTickets';
import ScreenNames from '../../../navigation/screenNames';

let page = 0;

const SupportTicketsList: React.FC<any> = props => {
	const {params} = useRoute();

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [userTicketsList, setUserTicketsList] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isNoData, setIsNoData] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [subject, setSubject] = useState('');
	const [description, setDescription] = useState('');
	const [isCreateTicket, setIsCreateTicket] = useState(false);

	const [isShowCreate, setIsShowCreate] = useState(params?.isShowCreate);

	useEffect(() => {
		page = 0;
		dispatch(updateApiLoader({apiLoader: true}));
		getTicketsData();
	}, []);

	const getTicketsData = () => {
		const uploadData = {
			skip: page,
			limit: '10'
		};
		getAllSupportTickets(uploadData)
			.then(res => {
				setIsLoading(false);
				dispatch(updateApiLoader({apiLoader: false}));
				//console.log('getUserBet Response : ', res);
				if (page !== 0) {
					setUserTicketsList(userTicketsList.concat(res?.data?.supportTickets));
					setIsNoData(userTicketsList?.length === 0 ? true : false);
				} else {
					setUserTicketsList(res?.data?.supportTickets);
					setIsNoData(res?.data?.supportTickets?.length === 0 ? true : false);
				}
				setTotalPage(res?.data.recordsTotal);
				if (isShowCreate) {
					setIsShowCreate(false);
					setTimeout(() => {
						setSubject('');
						setDescription('');
						setIsCreateTicket(false);
						setModalVisible(true);
					}, 333);
				}
			})
			.catch(err => {
				setIsLoading(false);
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
				setIsNoData(true);
			});
	};

	const createTicketData = () => {
		const uploadData = {
			subject: subject,
			description: description
		};
		createTicket(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				//console.log('getUserBet Response : ', res);
				page = 0;
				getTicketsData();
				if (res?.statusCode === 200) {
					Alert.alert('Alert', Strings.ticket_created_successfully);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
				Alert.alert('Alert', Strings.somethingWentWrong);
			});
	};

	const renderTicketsItem = ({item, index}) => (
		<TicketsView
			onPress={() => {
				console.log('item', item);
				navigation.navigate(ScreenNames.SupportDetailsScreen, {
					ticket_id: item._id,
					ticket_status: item.status
				});
			}}
			colorArray={defaultTheme.ternaryGradientColor}
			data={item}
		/>
	);
	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={() => {
					navigation.goBack();
				}}
				onLeftIconPath={icons.back}
				name={Strings.support}
				onSettingIconPath={icons.plusGradient}
				onSettingMenuPress={() => {
					setSubject('');
					setDescription('');
					setIsCreateTicket(false);
					setModalVisible(true);
				}}
			/>
			<View style={styles.viewContain}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={userTicketsList}
					renderItem={renderTicketsItem}
					onEndReachedThreshold={0.5}
					onMomentumScrollEnd={() => {
						console.log(
							'onMomentumScrollEnd',
							totalPage,
							userTicketsList.length
						);
						if (totalPage !== userTicketsList.length) {
							setIsLoading(true);
							page = page + 1;
							getTicketsData();
						}
					}}
					ListFooterComponent={() => (
						<>{isLoading && page !== 0 && <LoadMoreLoaderView />}</>
					)}
					ListEmptyComponent={() =>
						isNoData && (
							<Text style={styles.noDataStyle}>{Strings.no_Data_Found}</Text>
						)
					}
				/>
			</View>
			<CreateNewTickets
				popupTitle={Strings.create_new_ticket}
				buttonOkTitle={Strings.create}
				isVisible={modalVisible}
				onPressOk={() => {
					console.log('onPressOk');
					setModalVisible(!modalVisible);
					createTicketData();
				}}
				onPressCancel={() => {
					setModalVisible(!modalVisible);
				}}
				setSubject={subject => {
					setSubject(subject);
					if (subject.trim() !== '' && description.trim() !== '') {
						setIsCreateTicket(true);
					} else {
						setIsCreateTicket(false);
					}
				}}
				setDescription={description => {
					setDescription(description);
					if (subject.trim() !== '' && description.trim() !== '') {
						setIsCreateTicket(true);
					} else {
						setIsCreateTicket(false);
					}
				}}
				isAlpha={isCreateTicket}
			/>
		</SafeAreaView>
	);
};

export default SupportTicketsList;
