import React, {useEffect, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Modal,
	Text,
	TouchableOpacity,
	Dimensions,
	FlatList,
	Platform
} from 'react-native';

//import icons from '../assets/icon';
import Strings from '../../constants/strings';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../theme';
import colors from '../../theme/colors';
import {defaultTheme} from '../../theme/defaultTheme';
import fonts from '../../theme/fonts';
import {gradientColorAngle, moderateFontScale} from '../../theme/metrics';
import ButtonGradient from '../ButtonGradient';
import GradientText from '../GradientText';
import InputComponent from '../InputComponent';
import TagView from '../TagView';

interface Props extends TextInputProps {
	isVisible: boolean;
	popupTitle?: string;
	buttonOkTitle?: string;
	onPressOk?: (item, description) => void;
	onPressCancel?: () => void;
	setSubject: (subject: string) => void;
	setDescription: (subject: string) => void;
	isAlpha: boolean;
}

const ReportFeedView: React.FC<Props> = props => {
	const {
		popupTitle,
		buttonOkTitle,
		onPressOk,
		onPressCancel,
		isVisible,
		style,
		setSubject,
		setDescription,
		isAlpha
	} = props;

	const [selectedTag, setselectedTag] = useState(-1);
	const [text, setText] = useState('');

	const arrTags = ['Spam', 'Nudity', 'Custom'];

	const flatListData = [
		'bet conditions or Terms not clear',
		'hateful language or symbols',
		'False information',
		'Spam',
		'Other'
	];

	const renderItem = ({item, index}) => {
		return (
			<TouchableOpacity
				key={index}
				style={{marginVertical: verticalScale(8)}}
				activeOpacity={0.6}
				onPress={() => {
					setselectedTag(index);
				}}>
				{index === selectedTag ? (
					Platform.OS === 'web' ? (
						<Text
							style={[
								styles.itemTextStyle,
								{color: defaultTheme.primaryGradientColor[0], opacity: 1}
							]}>
							{item}
						</Text>
					) : (
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={[styles.itemTextStyle, {opacity: 1}]}>
							{item}
						</GradientText>
					)
				) : (
					<Text style={styles.itemTextStyle}>{item}</Text>
				)}
			</TouchableOpacity>
		);
	};

	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<View style={styles.bgView}>
				<View style={styles.centeredView}>
					<View style={styles.viewDetails}>
						<View style={styles.titleDescContainer}>
							<Text style={[styles.titleStyle, {...style}]}>
								{Strings.why_do_you_want_report}
							</Text>
							<Text style={[styles.titleDescStyle, {...style}]}>
								{Strings.why_do_you_want_report_bet_desc}
							</Text>
						</View>
						{/* <InputComponent
              style={styles.marginInput}
              title={Strings.subject}
              returnKeyType={'done'}
              onChangeText={(text: string) => {
                setSubject(text);
              }}
              maxLength={50}
            /> */}
						<FlatList
							data={flatListData}
							renderItem={renderItem}
							contentContainerStyle={styles.flatListContentContainerStyle}
							bounces={false}
						/>
						{selectedTag === 4 && (
							<InputComponent
								style={styles.marginInput}
								title={Strings.description}
								returnKeyType={'done'}
								onChangeText={(text: string) => {
									setText(text);
								}}
								multiline
								maxLength={150}
								textTitleStyle={{paddingTop: verticalScale(8)}}
							/>
						)}

						<View style={{flexDirection: 'row'}}>
							<ButtonGradient
								onPress={() => {
									setselectedTag(-1);
									onPressCancel && onPressCancel();
								}}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.cancel}
								style={styles.loginButton}
							/>
							<ButtonGradient
								onPress={() => {
									setselectedTag(-1);
									onPressOk && onPressOk(flatListData[selectedTag], text);
								}}
								colorArray={defaultTheme.primaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.submit}
								style={styles.loginButton}
							/>
						</View>
					</View>
				</View>
			</View>

			{/* </TouchableOpacity> */}
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: verticalScale(30)
	},
	bgView: {
		flex: 1
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: 'rgba(0,0,0,0.6)'
	},
	viewDetails: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10),
		//alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: verticalScale(20),
		width: Dimensions.get('screen').width
	},
	titleDescContainer: {
		marginHorizontal: horizontalScale(20)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		// textAlign: 'center',
		paddingVertical: verticalScale(8)
	},
	titleDescStyle: {
		color: colors.textTitle,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium
	},
	loginButtonWithAlpha: {
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16),
		opacity: 0.5
	},
	loginButton: {
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16),
		flex: 1
	},
	marginInput: {
		marginHorizontal: verticalScale(16)
	},
	flatListContentContainerStyle: {
		marginTop: verticalScale(10),
		marginHorizontal: horizontalScale(16)
	},
	itemTextStyle: {
		fontFamily: Fonts.type.Inter_Regular,
		fontSize: moderateFontScale(11),
		color: colors.white,
		fontWeight: '800',
		textTransform: 'uppercase'
	}
});

export default ReportFeedView;
