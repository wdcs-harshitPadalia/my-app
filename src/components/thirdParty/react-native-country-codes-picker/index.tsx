/* eslint-disable prettier/prettier */
import React from 'react';
import {
	FlatList,
	TextInput,
	View,
	Text,
	Animated,
	Dimensions,
	Easing,
	Platform,
	Keyboard,
	ViewStyle,
	Modal,
	TouchableOpacity,
} from 'react-native';
import {CountryItem, ItemTemplateProps, Style} from './types/Types';
import {countryCodes} from './constants/countryCodes';
import {useKeyboardStatus} from './helpers/useKeyboardStatus';
import {CountryButton} from './components/CountryButton';
import ExpoFastImage from 'expo-fast-image';
import icons from '../../../assets/icon';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale,
} from '../../../theme';
import colors from '../../../theme/colors';

const height = Dimensions.get('window').height;

/**
 * Country picker component
 * @param {?boolean} show Hide or show component by using this props
 * @param {?boolean} disableBackdrop Hide or show component by using this props
 * @param {?boolean} enableModalAvoiding Is modal should avoid keyboard ? On android to work required to use with androidWindowSoftInputMode with value pan, by default android will avoid keyboard by itself
 * @param {?string} androidWindowSoftInputMode Hide or show component by using this props
 * @param {?string} inputPlaceholder Text to showing in input
 * @param {?string} searchMessage Text to show user when no country to show
 * @param {?string} lang Current selected lang by user
 * @param {?string} initialState Here you should define initial dial code
 * @param {?array} excludedCountries Array of countries which should be excluded from picker
 * @param {Function} pickerButtonOnPress Function to receive selected country
 * @param {Function} onBackdropPress Function to receive selected country
 * @param {?Object} style Styles
 * @param {?React.ReactNode} itemTemplate Country list template
 * @param rest
 */

interface Props {
  excludedCountries?: [key: string];

  style?: Style;

  show: boolean;
  enableModalAvoiding?: boolean;
  disableBackdrop?: boolean;

  onBackdropPress?: (...args: any) => any;
  pickerButtonOnPress: (item: CountryItem) => any;
  itemTemplate?: (props: ItemTemplateProps) => JSX.Element;

  lang: string;
  inputPlaceholder?: string;
  searchMessage?: string;
  androidWindowSoftInputMode?: string;
  initialState?: string;
}

export default function CountryPicker({
	show,
	pickerButtonOnPress,
	inputPlaceholder,
	searchMessage,
	lang = 'en',
	style,
	enableModalAvoiding,
	androidWindowSoftInputMode,
	onBackdropPress,
	disableBackdrop,
	excludedCountries,
	initialState,
	itemTemplate: ItemTemplate = CountryButton,
	...rest
}: Props) {
	const codes = countryCodes?.filter(country => {
		return !excludedCountries?.find(
			short => country?.code === short?.toUpperCase(),
		);
	});
	const keyboardStatus = useKeyboardStatus();
	const animationDriver = React.useRef(new Animated.Value(0)).current;
	const animatedMargin = React.useRef(new Animated.Value(0)).current;
	const [searchValue, setSearchValue] = React.useState<string>(
		initialState || '',
	);
	const [showModal, setShowModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (show) {
			setShowModal(true);
		} else {
			closeModal();
		}
	}, [show]);

	React.useEffect(() => {
		if (
			enableModalAvoiding &&
      (keyboardStatus.keyboardPlatform === 'ios' ||
        (keyboardStatus.keyboardPlatform === 'android' &&
          androidWindowSoftInputMode === 'pan'))
		) {
			if (keyboardStatus.isOpen)
				Animated.timing(animatedMargin, {
					toValue: keyboardStatus.keyboardHeight,
					duration: 190,
					easing: Easing.ease,
					useNativeDriver: false,
				}).start();

			if (!keyboardStatus.isOpen)
				Animated.timing(animatedMargin, {
					toValue: 0,
					duration: 190,
					easing: Easing.ease,
					useNativeDriver: false,
				}).start();
		}
	}, [keyboardStatus.isOpen]);

	const resultCountries = React.useMemo(() => {
		if (!searchValue)
			return codes.filter(country => {
				if (country?.dial_code.includes(searchValue)) {
					return country;
				}
			});

		const lowerCaseSearchValue = searchValue.toLowerCase();

		return codes.filter(country => {
			if (
				country?.name[lang || 'en']
					.toLowerCase()
					.includes(lowerCaseSearchValue) ||
        country?.code.toLowerCase().includes(lowerCaseSearchValue) ||
        country?.dial_code.toLowerCase().includes(lowerCaseSearchValue)
			) {
				return country;
			}
		});
	}, [searchValue]);

	const modalPosition = animationDriver.interpolate({
		inputRange: [0, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
		outputRange: [height, 105, 75, 50, 30, 15, 5, 0],
		extrapolate: 'clamp',
	});

	const modalBackdropFade = animationDriver.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0, 0.5, 1],
		extrapolate: 'clamp',
	});

	const openModal = () => {
		Animated.timing(animationDriver, {
			toValue: 1,
			duration: 400,
			useNativeDriver: false,
		}).start();
	};

	const closeModal = () => {
		Animated.timing(animationDriver, {
			toValue: 0,
			duration: 400,
			useNativeDriver: false,
		}).start(() => setShowModal(false));
	};

	const renderItem = ({item, index}: {item: CountryItem; index: number}) => {
		let itemName = item?.name[lang];
		let checkName = itemName.length ? itemName : item?.name.en;

		return (
			<ItemTemplate
				key={index}
				item={item}
				style={style}
				name={checkName}
				onPress={() => {
					Keyboard.dismiss();
					typeof pickerButtonOnPress === 'function' &&
            pickerButtonOnPress(item);
				}}
			/>
		);
	};

	const onStartShouldSetResponder = () => {
		onBackdropPress?.();
		return false;
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={showModal}
			onShow={openModal}>
			<View
				style={{
					flex: 1,
					justifyContent: 'flex-end',
				}}>
				{!disableBackdrop && (
					<Animated.View
						onStartShouldSetResponder={onStartShouldSetResponder}
						style={[
							{
								flex: 1,
								opacity: modalBackdropFade,
								backgroundColor: 'rgba(0,0,0,0.45)',
								position: 'absolute',
								width: '100%',
								height: '100%',
								justifyContent: 'flex-end',
							},
							style?.backdrop,
						]}
					/>
				)}
				<Animated.View
					style={[
						styles.modal,
						style?.modal,
						{
							transform: [
								{
									translateY: modalPosition,
								},
							],
						},
					]}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<TextInput
							style={[styles.searchBar, style?.textInput]}
							value={searchValue}
							onChangeText={setSearchValue}
							placeholderTextColor={colors.gray}
							placeholder={inputPlaceholder || 'Search your country'}
							{...rest}
						/>
						<TouchableOpacity onPress={onBackdropPress}>
							<ExpoFastImage
								style={{
									height: 26,
									width: 26,
									marginLeft: 8,
								}}
								source={icons.closeBlack}
								// resizeMode={'cover'}
							/>
						</TouchableOpacity>
					</View>
					<View style={[styles.line, style?.line]} />
					{resultCountries.length === 0 ? (
            <View
            	style={[styles.countryMessage, style?.countryMessageContainer]}>
            	<Text
            		style={[
            			{
            				color: '#8c8c8c',
            				fontSize: 16,
            			},
            			style?.searchMessageText,
            		]}>
            		{searchMessage || 'Sorry we cant find your country'}
            	</Text>
            </View>
          ) : (
            <FlatList
            	contentContainerStyle={{
            		...Platform.select({
            			ios: {
            				paddingBottom: keyboardStatus.isOpen
                      ? keyboardStatus.keyboardHeight
                      : 20,
            			},
            		}),
            	}}
            	showsVerticalScrollIndicator={false}
            	data={resultCountries || codes}
            	keyExtractor={(item, index) => '' + item + index}
            	initialNumToRender={20}
            	maxToRenderPerBatch={20}
            	style={[
            		{
            			height: 250,
            		},
            		style?.itemsList,
            	]}
            	keyboardShouldPersistTaps={'handled'}
            	renderItem={renderItem}
            	{...rest}
            />
          )}
					<Animated.View
						style={[
							styles.modalInner,
							style?.modalInner,
							{
								height: animatedMargin,
							},
						]}
					/>
				</Animated.View>
			</View>
		</Modal>
	);
}

type StyleKeys =
  | 'container'
  | 'modal'
  | 'modalInner'
  | 'searchBar'
  | 'countryMessage'
  | 'line';

const styles: {[key in StyleKeys]: ViewStyle} = {
	container: {
		flex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'flex-end',
	},
	modal: {
		backgroundColor: 'white',
		width: '100%',
		maxWidth: Platform.OS === 'web' ? 600 : undefined,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 6,
		},
		bottom: 0,
		zIndex: 10,
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 10,
	},
	modalInner: {
		backgroundColor: 'white',
		width: '100%',
	},
	searchBar: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		height: 40,
		padding: 5,
		color: colors.black,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_Medium,
	},
	countryMessage: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 250,
	},
	line: {
		width: '100%',
		height: 1.5,
		borderRadius: 2,
		backgroundColor: '#eceff1',
		alignSelf: 'center',
		marginVertical: 5,
	},
};
