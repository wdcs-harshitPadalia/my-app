import React, {useState, LegacyRef, useEffect, useRef} from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	ViewStyle,
	Animated
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import {ImageIndicator} from '../constants/utils/Function';
import {horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

interface Props extends TextInputProps {
	rightIconPath: ImageSourcePropType;
	rightIconClick: (text: string) => void;
	style?: ViewStyle;
	onChangeText?: (text: string) => void;
	valueData?: string;
	onLeftIconPress: Function;
	profileImage?: string;
	onGallaryPress?: () => void;
	shouldShowGallery?: boolean;
	chatType?: 'amity' | 'api';
}

const CommentInput = React.forwardRef(
	(props: Props, ref: LegacyRef<TextInput>) => {
		// const CommentInput: React.FC<Props> = props => {
		const {
			rightIconPath,
			rightIconClick,
			placeholder,
			onChangeText,
			valueData,
			onLeftIconPress,
			profileImage,
			onGallaryPress,
			shouldShowGallery,
			chatType
		} = props;

		const [inputText, setInputText] = useState('');

		const fadeAnim = useRef(new Animated.Value(0)).current;

		const fadeIn = cb => {
			Animated.timing(fadeAnim, {
				//value: 1,
				toValue: 1,
				useNativeDriver: true,
				duration: 1000
			}).start(cb);
		};

		useEffect(() => {
			if (valueData || valueData === '') {
				setInputText(valueData);
			}
		}, [valueData]);

		//fadeAnim.setValue(0);
		useEffect(() => {
			if (inputText.trim().length === 0) {
				fadeAnim.setValue(0);
			}
		}, [fadeAnim, inputText]);

		return (
			<View>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					{profileImage && (
						<ImageIndicator
							style={styles.profileImageStyle}
							resizeMode="cover"
							// source={{uri: profileImgPath}}
							source={{uri: profileImage}}
						/>
					)}

					<View style={[styles.container, {...props.style}]}>
						{/* <TouchableOpacity onPress={onLeftIconPress}>
              {chatType !== 'api' && inputText.trim().length === 0 && (
                <ExpoFastImage
                  resizeMode={'contain'}
                  source={icons.ic_emoji}
                  style={styles.leftImg}
                />
              )}
            </TouchableOpacity> */}

						<TextInput
							{...props}
							value={inputText}
							multiline
							ref={ref}
							onChangeText={text => {
								fadeIn(() => {});
								setInputText(text);
								// onChangeText(text)
							}}
							style={styles.inputStyle}
							placeholder={placeholder}
							placeholderTextColor={colors.white}
						/>
						{shouldShowGallery && inputText.trim().length === 0 && (
							<TouchableOpacity onPress={onGallaryPress}>
								<ExpoFastImage
									resizeMode={'cover'}
									source={icons.ic_image}
									style={{height: verticalScale(20), width: verticalScale(20)}}
								/>
							</TouchableOpacity>
						)}
					</View>
					{inputText.trim().length > 0 && (
						<Animated.View style={{opacity: fadeAnim}}>
							<TouchableOpacity
								activeOpacity={inputText.trim().length > 0 ? 0.5 : 1}
								onPress={() => {
									if (inputText.trim().length > 0) {
										rightIconClick(inputText.trim());
										setTimeout(() => {
											setInputText('');
										}, 0);
									}
								}}>
								<ExpoFastImage
									resizeMode={'contain'}
									source={rightIconPath}
									style={styles.rightImg}
								/>
							</TouchableOpacity>
						</Animated.View>
					)}
				</View>
			</View>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		shadowColor: colors.gray,
		// shadowOffset: {
		//   width: 0,
		//   height: 2,
		// },
		// shadowOpacity: 0.4,
		// shadowRadius: 10,
		borderWidth: 1,
		//elevation: 4,
		borderRadius: verticalScale(12),
		borderColor: colors.gray,
		backgroundColor: colors.white,
		paddingLeft: horizontalScale(16),
		paddingRight: horizontalScale(8),
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		paddingVertical: verticalScale(10)
	},
	leftImg: {
		height: 16,
		width: 16,
		marginRight: verticalScale(10),
		tintColor: colors.black
	},
	rightImg: {
		height: verticalScale(25),
		width: verticalScale(25),
		//marginTop: verticalScale(10),
		marginLeft: verticalScale(10)
	},
	inputStyle: {
		outlineStyle: 'none',
		flex: 1,
		marginRight: 5,
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: fonts.type.Inter_Regular,
		//backgroundColor: 'red',
		textAlignVertical: 'center',
		marginTop: -6
	},
	errStyle: {
		color: colors.red,
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Regular
	},
	profileImageStyle: {
		height: 32,
		width: 32,
		alignSelf: 'center',
		marginRight: horizontalScale(8),
		marginLeft: -8,
		borderRadius: 16,
		overflow: 'hidden'
	}
});

export default CommentInput;
