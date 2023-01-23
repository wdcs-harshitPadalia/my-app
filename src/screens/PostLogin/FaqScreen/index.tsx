import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import icons from '../../../assets/icon';
import FaqQuestionComponent from '../../../components/FaqQuestionComponent';
import HeaderComponent from '../../../components/HeaderComponent';
import Strings from '../../../constants/strings';
import {getAllFaqQuestion} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import styles from '../FaqScreen/style';

let pageFaqQuestion = 0;

const FaqScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [faqData, setFaqData] = useState([]);
	const [isNofaqData, setIsNofaqData] = useState(false);

	const getAllFaqQuestionData = () => {
		if (pageFaqQuestion === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}

		const uploadData = {
			skip: pageFaqQuestion,
			limit: '100'
		};
		getAllFaqQuestion(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				if (pageFaqQuestion !== 0) {
					setFaqData(faqData.concat(res?.data?.FAQ));
					setIsNofaqData(faqData.length === 0 ? true : false);
				} else {
					setFaqData(res?.data?.FAQ);
					setIsNofaqData(res?.data?.FAQ.length === 0 ? true : false);
				}
			})
			.catch(() => {
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	useEffect(() => {
		getAllFaqQuestionData();
	}, []);

	return (
		<SafeAreaView style={styles.container} edges={['bottom', 'top']}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.faq}
					onLeftIconPath={icons.back}
				/>
				<FaqQuestionComponent data={faqData} />
			</View>
		</SafeAreaView>
	);
};

export default FaqScreen;
