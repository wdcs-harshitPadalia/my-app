import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../../components/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import RadioButton from '../../../components/RadioButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const WhoCanViewScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const {title, description, whoCanSeeGet, setWhoCanSee} = useRoute().params;
	const [isSelectedType, seIsSelectedType] = useState(setWhoCanSee);

	const arrRadioData = [
		{
			name: 'Anyone'
		},
		{
			name: 'Friends'
		},
		{
			name: 'Nobody'
		}
	];

	const renderRadioItem = ({item, index}) => (
		<RadioButton
			title={item.name.toUpperCase()}
			onPress={() => {
				seIsSelectedType(item.name);
				whoCanSeeGet(title, item.name);
			}}
			isSelected={
				isSelectedType.toLowerCase() === item.name.toLowerCase() ? true : false
			}
		/>
	);
	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={() => {
					navigation.goBack();
				}}
				onLeftIconPath={icons.back}
				name={Strings.back}
			/>
			<KeyboardAwareScrollView enableOnAndroid={false} bounces={false}>
				<Text style={styles.titleStyle}>{title}</Text>
				<View style={styles.viewContain}>
					<Text style={styles.subTitleStyle}>{description}</Text>
					<FlatList
						bounces={false}
						data={arrRadioData}
						renderItem={renderRadioItem}
					/>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

export default WhoCanViewScreen;
