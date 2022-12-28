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
	const {title, description, whoCanSeeGet, setWhoCanSee, arrOptions} =
		useRoute().params;
	const [isSelectedType, seIsSelectedType] = useState(setWhoCanSee);

	const arrRadioData = [
		{
			name: Strings.anyone
		},
		{
			name: Strings.friends
		},
		{
			name: Strings.nobody
		}
	];

	const renderRadioItem = ({item, index}) => (
		<RadioButton
			title={item.name.toUpperCase()}
			onPress={() => {
				seIsSelectedType(item.name);
				whoCanSeeGet(title ? title : Strings.video_content, item.name);
			}}
			isSelected={
				isSelectedType?.toLowerCase() === item.name?.toLowerCase() ? true : false
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
				name={Strings.privacy}
			/>
			<KeyboardAwareScrollView enableOnAndroid={false} bounces={false}>
				{title && <Text style={styles.titleStyle}>{title}</Text>}

				<View style={styles.viewContain}>
					<Text style={styles.subTitleStyle}>{description}</Text>
					<FlatList
						bounces={false}
						data={arrOptions ? arrOptions : arrRadioData}
						renderItem={renderRadioItem}
					/>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

export default WhoCanViewScreen;
