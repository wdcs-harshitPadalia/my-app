import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Platform, ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import ExpoFastImage from 'expo-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../assets/icon';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import HeaderComponent from '../../../components/HeaderComponent';
import SearchBar from '../../../components/SearchBar';
import SportsComponent from '../../../components/SportsComponent';
import TagView from '../../../components/TagView';
import Strings from '../../../constants/strings';
import {
	getCategory,
	getSubcategory
} from '../../../redux/apiHandler/apiActions';
import {horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import {width} from '../../../theme/metrics';
import styles from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ScreenNames from '../../../navigation/screenNames';
import LeftIconWithTextComponent from '../../../components/LeftIconWithTextComponent';
import DatePickerWeb from '../../../components/DatePickerWeb';
import { isValidDate } from '../../../constants/utils/Function'; 

export default function ApplyFilterScreen() {
	const params = useRoute().params;
	const {title} = params;
	const navigation = useNavigation();

	//States
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState({});
	const [selectedSubCategory, setSelectedSubCategory] = useState({});
	const [isBetsId, setIsBetsId] = useState('');
	const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [categoryData, setCategoryData] = useState([]);
	const [subCategoryData, setSubCategoryData] = useState([]);
	const [selectedOrderByIndex, setSelectedOrderByIndex] = useState(-1);
	const orderByList = [Strings.New_bets, Strings.Z_A, Strings.A_Z];
	const [date, setDate] = useState(Strings.pick_end_date_time);
	const [bets, setBets] = useState([]);
	const [filters, setFilters] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [hotTag, setHotTag] = useState('');
	const [friendsTag, setFriendsTag] = useState('');
	const [lastMinutesTag, setLastMinutesTag] = useState('');

	// constants
	const durationList = [
		{title: Strings.pick_end_date_time, icon: icons.calendar_today}
		// {title: Strings.pick_end_time, icon: icons.time},
	];

	const dateTimePickerRef = useRef();

	useUpdateEffect(() => {
		setDatePickerVisibility(false);
	}, [date]);
	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = date => {
		setDatePickerVisibility(false);

		console.log(
			'A date has been picked: ',
			date,
			moment(date).format('DD MMMM YYYY HH:mm')
		);
		setDate(moment(date).format('DD MMMM YYYY HH:mm'));
		hideDatePicker();
	};
	const handleDateValidation = selectedDate => {
		if (!isValidDate(selectedDate)) {
			return;
		}
		if (
			new Date(selectedDate).getTime() >
			new Date(new Date().getTime() + 4 * 60000)
		) {
			setDate(moment(selectedDate).format('DD MMMM YYYY HH:mm'));
		} else {
			setDate('');
			alert(
				`Please select time greater than ${moment(
					new Date(new Date().getTime() + 4 * 60000)
				).format('DD MMMM YYYY hh:mm A')}`
			);
			setDate(Strings.pick_end_date_time);
		}
	};

	const updateSearch = search => {
		setSearch(search);
	};

	useUpdateEffect(() => {
		setIsSubmitButtonEnabled(true);
		getSubCategoryData(selectedCategory._id);
	}, [selectedCategory]);

	useUpdateEffect(() => {
		setBets([
			{_id: 1, name: 'P2P Bets'},
			{_id: 2, name: 'Prediction Market'}
		]);
	}, [selectedSubCategory]);

	useEffect(() => {
		getCategoryData();
	}, []);

	useUpdateEffect(() => {
		setFilters([
			{
				tags: hotTag,
				title: hotTag.toString(),
				filterType: 'hot',
				value: hotTag.toLowerCase()
			},
			{
				tags: friendsTag,
				title: friendsTag,
				filterType: 'friends',
				value: friendsTag.toLowerCase()
			},
			{
				tags: lastMinutesTag,
				title: lastMinutesTag,
				filterType: 'last minute',
				value: lastMinutesTag.toLowerCase()
			},
			{
				orderBy:
					selectedOrderByIndex === -1 ? '' : orderByList[selectedOrderByIndex],
				title:
					selectedOrderByIndex === -1 ? '' : orderByList[selectedOrderByIndex],
				filterType: 'orderBy',
				value:
					selectedOrderByIndex === -1
						? ''
						: selectedOrderByIndex === 0
						? Strings.New_bets
						: selectedOrderByIndex === 1
						? 'desc'
						: 'asc'
			},
			{
				category: selectedCategory,
				category_id: selectedCategory._id,
				title: selectedCategory?.name ?? '',
				filterType: 'category',
				value: selectedCategory?._id ?? ''
			},
			{
				subcategory: selectedSubCategory,
				subcategory_id: selectedSubCategory._id,
				title: selectedSubCategory?.name ?? '',
				filterType: 'subCategory',
				value: selectedSubCategory?._id ?? ''
			},
			{
				date: date === Strings.pick_end_date_time ? '' : date,
				title: date === Strings.pick_end_date_time ? '' : date,
				filterType: 'duration',
				value:
					date === Strings.pick_end_date_time ? '' : moment(date).format('x')
			}
		]);
	}, [
		hotTag,
		friendsTag,
		lastMinutesTag,
		selectedOrderByIndex,
		selectedCategory,
		selectedSubCategory,
		date
	]);

	useEffect(() => {
		console.log('Filters?>>>>>>', JSON.stringify(filters));

		//setSelectedOrderByIndex(filters[1].orderBy);
	}, [filters]);

	const getCategoryData = () => {
		getCategory()
			.then(res => {
				console.log(
					'getCategoryData Response : ',
					JSON.stringify(res?.data.category)
				);
				setCategoryData(res?.data.category);
			})
			.catch(err => {
				console.log('getCategoryData Data Err : ', err);
			});
	};

	const getSubCategoryData = (categoryID: string) => {
		setSelectedSubCategory('');
		getSubcategory(categoryID)
			.then(res => {
				console.log('getSubCategoryData Response : ', res);
				setSubCategoryData(res?.data.subcategory);
			})
			.catch(err => {
				console.log('getSubCategoryData Data Err : ', err);
			});
	};

	const renderCategoryItem = ({item, index}) => (
		<SportsComponent
			style={{width: width / 3 - 40 / 3}}
			title={item.name.toUpperCase()}
			imgPath={item.imageUrl}
			onPress={() => {
				if (item._id === selectedCategory._id) {
					setSelectedCategory({});
					setSelectedSubCategory({});
					setSubCategoryData([]);
					return;
				}
				setSelectedCategory(item);
			}}
			isShadow={selectedCategory._id === item._id ? true : false}
			//selectedCount={0}
		/>
	);

	const renderSubCategoryItem = ({item, index}) => (
		<TagView
			isSelected={selectedSubCategory._id === item._id}
			enabled
			fontFamily={fonts.type.Inter_ExtraBold}
			fontSize={12}
			viewStyle={{
				flex: 1,
				marginBottom: verticalScale(8),
				paddingVertical: verticalScale(13),
				justifyContent: 'center'
			}}
			backGroundColor={colors.purple}
			text={item.name}
			gradientColors={defaultTheme.ternaryGradientColor}
			onPress={() => {
				if (item._id === selectedSubCategory._id) {
					setSelectedSubCategory({});
					return;
				}
				setSelectedSubCategory(item);
			}}
		/>
	);
	const updateFilter = (item, filterType) => {
		console.log('index?>>>>>>>>>>>', item, filterType);
		switch (filterType) {
			case Strings.HOT.toLowerCase():
				setHotTag('');
				break;
			case Strings.FRIENDS.toLowerCase():
				setFriendsTag('');
				break;
			case Strings.LAST_MINUTE.toLowerCase():
				setLastMinutesTag('');
				break;
			case 'orderBy':
				setSelectedOrderByIndex(-1);
				break;
			case 'category':
				setSelectedCategory({});
				setSelectedSubCategory({});
				setSubCategoryData([]);
				break;
			case 'subCategory':
				setSelectedSubCategory({});
				break;
			case 'duration':
				setDate(Strings.pick_end_date_time);
				break;
			default:
				break;
		}
	};
	// const renderBetsTypeItem = ({item, index}) => (
	//   <TagView
	//     isSelected={isBetsId === item._id}
	//     enabled
	//     fontFamily={fonts.type.Inter_ExtraBold}
	//     fontSize={12}
	//     viewStyle={{
	//       flex: 1,
	//       marginBottom: verticalScale(8),
	//       justifyContent: 'center',
	//       paddingVertical: verticalScale(13),
	//     }}
	//     backGroundColor={colors.purple}
	//     text={item.name}
	//     gradientColors={defaultTheme.ternaryGradientColor}
	//     onPress={() => {
	//       setIsBetsId(item._id);
	//     }}
	//   />
	// );

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.filters}
					onLeftIconPath={icons.back}
				/>
				<ScrollView bounces={false}>
					<View style={styles.wrapper}>
						{/* <SearchBar
							// searchPhrase={searchPhrase}
							// setSearchPhrase={setSearchPhrase}
							clicked={false}
							setClicked={() => {}}
						/> */}
						<Text style={styles.buttonTitleText}>{Strings.Tags}</Text>
						<View style={styles.tagViewContainer}>
							{/* <LeftIconWithTextComponent
								text={Strings.HOT}
								iconPath={icons.ic_hot}
								isApplyFilter={false}
								borderStyle={{borderRadius: 26}}
								activeOpacity={0.6}
								gradientColors={
									hotTag !== ''
										? defaultTheme.primaryGradientColor
										: defaultTheme.ternaryGradientColor
								}
								enabled
								onPress={() => {
									// if (selectedTags?.includes(Strings.HOT)) {
									//   const newFilters = selectedTags.filter(
									//     item => item !== Strings.HOT,
									//   );
									//   setSelectedTags(newFilters);
									//   return;
									// }
									// const newFilters = [...selectedTags, Strings.HOT];
									// setIsSubmitButtonEnabled(true);
									// setSelectedTags(newFilters);
									setIsSubmitButtonEnabled(true);
									setHotTag(hotTag === '' ? Strings.HOT : '');
								}}
							/>
							<LeftIconWithTextComponent
								text={Strings.FRIENDS}
								iconPath={icons.ic_friends}
								isApplyFilter={false}
								borderStyle={{borderRadius: 26}}
								activeOpacity={0.6}
								enabled
								gradientColors={
									friendsTag !== ''
										? defaultTheme.primaryGradientColor
										: defaultTheme.ternaryGradientColor
								}
								onPress={() => {
									// if (selectedTags.includes(Strings.FRIENDS)) {
									//   const newFilters = selectedTags.filter(
									//     item => item !== Strings.FRIENDS,
									//   );
									//   setSelectedTags(newFilters);
									//   return;
									// }
									// const newFilters = [...selectedTags, Strings.FRIENDS];
									// setIsSubmitButtonEnabled(true);
									// setSelectedTags(newFilters);
									setIsSubmitButtonEnabled(true);
									setFriendsTag(friendsTag === '' ? Strings.FRIENDS : '');
								}}
							/>
							<LeftIconWithTextComponent
								text={Strings.LAST_MINUTE}
								iconPath={icons.ic_timer}
								isApplyFilter={false}
								borderStyle={{borderRadius: 26}}
								activeOpacity={0.6}
								gradientColors={
									lastMinutesTag !== ''
										? defaultTheme.primaryGradientColor
										: defaultTheme.ternaryGradientColor
								}
								enabled
								onPress={() => {
									// if (selectedTags.includes(Strings.LAST_MINUTE)) {
									//   const newFilters = selectedTags.filter(
									//     tag => tag !== Strings.LAST_MINUTE,
									//   );
									//   setSelectedTags(newFilters);
									//   return;
									// }
									// const newFilters = [...selectedTags, Strings.LAST_MINUTE];
									// setSelectedTags(newFilters);
									setIsSubmitButtonEnabled(true);
									setLastMinutesTag(
										lastMinutesTag === '' ? Strings.LAST_MINUTE : ''
									);
								}}
							/> */}
							<TagView
								fontFamily={fonts.type.Inter_ExtraBold}
								fontSize={12}
								viewStyle={styles.tagsStyle}
								backGroundColor={colors.purple}
								gradientColors={
									hotTag !== ''
										? defaultTheme.primaryGradientColor
										: [colors.purple, colors.purple]
								}
								text={Strings.HOT}
								enabled
								onPress={() => {
									setIsSubmitButtonEnabled(true);
									setHotTag(hotTag === '' ? Strings.HOT : '');
								}}
							/>
							<TagView
								fontFamily={fonts.type.Inter_ExtraBold}
								fontSize={12}
								viewStyle={styles.tagsStyle}
								fontColor={colors.black}
								backGroundColor={colors.yellow}
								gradientColors={
									friendsTag !== ''
										? defaultTheme.primaryGradientColor
										: [colors.yellow, colors.yellow]
								}
								enabled
								text={Strings.FRIENDS}
								onPress={() => {
									setIsSubmitButtonEnabled(true);
									setFriendsTag(friendsTag === '' ? Strings.FRIENDS : '');
								}}
							/>
							<TagView
								fontFamily={fonts.type.Inter_ExtraBold}
								fontSize={12}
								viewStyle={styles.tagsStyle}
								backGroundColor={colors.redTag}
								text={Strings.LAST_MINUTE}
								withLeftDotView={false}
								gradientColors={
									lastMinutesTag !== ''
										? defaultTheme.primaryGradientColor
										: [colors.redTag, colors.redTag]
								}
								enabled
								tagLeftImagePath={icons.timer}
								onPress={() => {
									setIsSubmitButtonEnabled(true);
									setLastMinutesTag(
										lastMinutesTag === '' ? Strings.LAST_MINUTE : ''
									);
								}}
							/>
						</View>
						<Text style={styles.buttonTitleText}>{Strings.Order_by}</Text>
						<View style={styles.tagViewContainer}>
							<FlatList
								data={orderByList}
								horizontal
								style={{width: '100%'}}
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									flex: 1
								}}
								renderItem={({item, index}) => (
									<TagView
										isSelected={selectedOrderByIndex === index}
										enabled
										fontFamily={fonts.type.Inter_ExtraBold}
										fontSize={12}
										viewStyle={styles.tagsStyle}
										backGroundColor={colors.purple}
										text={item}
										gradientColors={defaultTheme.ternaryGradientColor}
										onPress={() => {
											if (selectedOrderByIndex === index) {
												setSelectedOrderByIndex(-1);
												return;
											}
											setIsSubmitButtonEnabled(true);
											setSelectedOrderByIndex(index);
										}}
									/>
								)}
							/>
							{/* <TagView
              fontFamily={fonts.type.Inter_ExtraBold}
              fontSize={12}
              viewStyle={styles.tagsStyle}
              backGroundColor={colors.purple}
              text={Strings.New_bets}
              gradientColors={defaultTheme.ternaryGradientColor}
            />
            <TagView
              fontFamily={fonts.type.Inter_ExtraBold}
              fontSize={12}
              viewStyle={styles.tagsStyle}
              backGroundColor={colors.yellow}
              text={Strings.Z_A}
              gradientColors={defaultTheme.ternaryGradientColor}
            />
            <TagView
              fontFamily={fonts.type.Inter_ExtraBold}
              fontSize={12}
              viewStyle={styles.tagsStyle}
              backGroundColor={colors.redTag}
              text={Strings.A_Z}
              withLeftDotView={false}
              gradientColors={defaultTheme.ternaryGradientColor}
            /> */}
						</View>
						{categoryData && categoryData.length > 0 && (
							<>
								<Text style={styles.buttonTitleText}>{Strings.categories}</Text>
								<FlatList
									horizontal
									data={categoryData}
									showsHorizontalScrollIndicator={false}
									renderItem={renderCategoryItem}
									bounces={false}
									keyExtractor={item => item._id}
									style={{
										borderRadius: 8,
										...Platform.select({
											web: {
												overflow: 'scroll'
											},
											ios: {
												overflow: 'hidden'
											},
											android: {
												overflow: 'hidden'
											}
										}),
										marginTop: verticalScale(10),
										width:
											categoryData.length >= 3
												? (width / 3) * 3 - 32
												: (width / 3 + 4) * categoryData.length,
										backgroundColor: colors.black
									}}
									contentContainerStyle={{
										marginTop: verticalScale(0),
										paddingHorizontal: horizontalScale(2),
										paddingVertical: verticalScale(2)
									}}
								/>
							</>
						)}

						{subCategoryData && subCategoryData.length > 0 && (
							<>
								<Text style={styles.buttonTitleText}>
									{Strings.Sub_Category}
								</Text>
								<FlatList
									//horizontal
									data={subCategoryData}
									scrollEnabled={false}
									showsHorizontalScrollIndicator={false}
									renderItem={renderSubCategoryItem}
									bounces={false}
									keyExtractor={item => item._id}
									contentContainerStyle={[
										{
											marginTop: verticalScale(2)
										},
										styles.tagViewContainer,
										{
											paddingHorizontal: horizontalScale(8),
											paddingTop: verticalScale(8),
											paddingBottom: verticalScale(0),
											flexDirection: 'column'
										}
									]}
								/>
							</>
						)}

						{/* {bets && bets.length > 0 && (
              <>
                <Text style={styles.buttonTitleText}>Bet type</Text>
                <FlatList
                  //horizontal
                  scrollEnabled={false}
                  data={bets}
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderBetsTypeItem}
                  bounces={false}
                  keyExtractor={item => item._id}
                  contentContainerStyle={[
                    {
                      marginTop: verticalScale(2),
                    },
                    styles.tagViewContainer,
                    {
                      paddingHorizontal: horizontalScale(8),
                      paddingTop: verticalScale(8),
                      paddingBottom: verticalScale(0),
                      flexDirection: 'column',
                    },
                  ]}
                />
              </>
            )} */}

						<Text style={styles.buttonTitleText}>{Strings.Duration}</Text>
						<View
							style={[
								styles.tagViewContainer,
								{justifyContent: 'center', flexDirection: 'column'}
							]}>
							{durationList && durationList.length > 0 && (
								<>
									<TagView
										isSelected={date !== Strings.pick_end_date_time}
										enabled
										fontFamily={fonts.type.Inter_ExtraBold}
										fontSize={12}
										viewStyle={[styles.tagsStyle, {width: '100%'}]}
										backGroundColor={colors.purple}
										text={date}
										gradientColors={defaultTheme.ternaryGradientColor}
										onPress={() => {
											if (date === Strings.pick_end_date_time) {
												dateTimePickerRef.current.handlePickDateTime();
											} else {
												setDate(Strings.pick_end_date_time);
											}
											// if (date === durationList[0].title) {
											//   //setIsDurationDateId('');
											//   return;
											// }
											//setIsDurationDateId(date);
										}}>
										<ExpoFastImage
											style={styles.durationChipImage}
											source={icons.calendar_today}
										/>
									</TagView>
									{/* <TagView
                    isSelected={isDurationTimeId === durationList[1].title}
                    enabled
                    fontFamily={fonts.type.Inter_ExtraBold}
                    fontSize={12}
                    viewStyle={[styles.tagsStyle, {width: width / 2 - 62 / 2}]}
                    backGroundColor={colors.purple}
                    text={durationList[1].title}
                    gradientColors={defaultTheme.ternaryGradientColor}
                    onPress={() => {
                      if (isDurationTimeId === durationList[1].title) {
                        setIsDurationTimeId('');
                        return;
                      }
                      setIsDurationTimeId(durationList[1].title);
                    }}>
                    <ExpoFastImage
                      style={styles.durationChipImage}
                      source={durationList[1].icon}
                    />
                  </TagView> */}
								</>
							)}
						</View>
						{date && (
							<DatePickerWeb
							selected={
								date === Strings.pick_end_date_time
									? moment(new Date())
											.add(4, 'minutes')
											.format('YYYY-MM-DDTHH:mm')
											.toString()
									: date
							}
							handleChange={val => {
								console.log('DatePickerWeb', val);
								handleDateValidation(val);
							}}
							ref={dateTimePickerRef}
							minimumDate={moment(new Date()).add(4, 'minutes').format('YYYY-MM-DDTHH:mm').toString()}
						/>
						)}
						<TagView
							isSelected={
								filters.filter(item => item.title !== '')?.length > 0
									? true
									: false
							}
							enabled={
								filters.filter(item => item.title !== '')?.length > 0
									? true
									: false
							}
							activeOpacity={0.5}
							fontFamily={fonts.type.Inter_ExtraBold}
							fontSize={14}
							viewStyle={styles.doneButton}
							backGroundColor={colors.purple}
							text={Strings.apply}
							gradientColors={defaultTheme.ternaryGradientColor}
							onPress={() => {
								//TODO: redirect to feed filter screen
								let filtersData = filters.filter(item => item.title !== '');
								navigation.navigate(ScreenNames.FeedFilterScreen, {
									filters: filtersData,
									updateFilter
								});
							}}
						/>
					</View>
					{/* <DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="datetime"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
						minimumDate={moment(new Date()).add(5, 'minute').toDate()}
						display={Platform.OS === 'ios' ? 'spinner' : ''}
						isDarkModeEnabled={false}
						themeVariant="light"
						date={moment(new Date()).add(5, 'minute').toDate()}
						//minuteInterval={15}
						//disabledDays={{after: new Date()}}
					/> */}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
