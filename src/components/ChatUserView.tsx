import React, {useCallback, useEffect, useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	View
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import colors from '../theme/colors';
import {getFollowers} from '../redux/apiHandler/apiActions';
import {
	createQuery,
	getChannel,
	queryMessages,
	runQuery
} from '@amityco/ts-sdk';
import {
	dateTimeConvert,
	dateTimeStreamingConvert,
	getLevelRank
} from '../constants/utils/Function';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import useUpdateEffect from './CustomHooks/useUpdateEffect';

interface Props extends TextInputProps {
	onPress?: () => void;
	shouldShowCloseButton?: boolean;
	data?: any;
	channelId: string;
	friendLevel: number;
}

const ChatUserView: React.FC<Props> = props => {
	const {onPress, shouldShowCloseButton, channelId, friendLevel} = props;
	const [message, setMessages] = useState({});
	const notificationMessage = useSelector((state: RootState) => {
		return state.notification.message;
	});

	useEffect(() => {
		const query = createQuery(getChannel, channelId);
		// runQuery(query, result => console.log('Channle?????', channelId, result));
		onQueryMessages({reset: true});
	}, []);

	useUpdateEffect(() => {
		// const query = createQuery(getChannel, channelId);
		console.log('notificationMessage', notificationMessage);
		setMessages(notificationMessage?.data);
		// runQuery(query, result => console.log('Channle?????', channelId, result));
		//onQueryMessages({reset: true});
	}, [notificationMessage]);

	const onQueryMessages = useCallback(
		({reset = false, page = {limit: 1}}) => {
			const query = createQuery(queryMessages, {
				page,
				channelId,
				isDeleted: false
			});

			runQuery(query, ({data, ...options}) => {
				//console.log('Messages??>>>>', data);
				if (data && data.length > 0) {
					setMessages(data[0]);
					// if (data[0]?.type === 'image') {
					//   setMessages('📷  Photo');
					// }
				}
			});
		},
		[channelId]
	);

	return (
		<TouchableOpacity
			style={[{...props.style}, styles.container]}
			onPress={onPress}
			activeOpacity={0.8}>
			<View>
				<ExpoFastImage
					style={styles.imgIconStyle}
					resizeMode="cover"
					source={{uri: props.data?.picture}}
					//source={icons.userDummy}
				/>

				<View style={styles.viewBadgeStyle}>
					<ExpoFastImage
						style={styles.badgeIconStyle}
						resizeMode="cover"
						// source={{uri: profileImgPath}}
						source={getLevelRank(friendLevel)?.image}
					/>
				</View>
			</View>
			<View style={styles.viewLabelContainer}>
				<Text style={styles.usernameStyle} numberOfLines={1}>
					{'@' + props.data?.userName}
				</Text>
				{message?.data?.text && (
					<Text style={styles.messageStyle} numberOfLines={1}>
						{message?.type == 'image' ? '📷  Photo' : message.data?.text}
					</Text>
				)}
			</View>
			<View style={styles.viewUserTimeContainer}>
				<Text style={styles.timeStyle}>
					{message?.createdAt &&
						moment(new Date(message?.createdAt).getTime()).fromNow()}
				</Text>
			</View>
			{shouldShowCloseButton && (
				<TouchableOpacity>
					<ExpoFastImage style={{height: 15, width: 15}} source={icons.close} />
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: verticalScale(12),
		justifyContent: 'center',
		alignItems: 'center'
	},

	imgIconStyle: {
		width: 46,
		height: 46,
		borderRadius: 23
	},
	viewBadgeStyle: {
		width: 26,
		height: 26,
		borderRadius: 13,
		right: -10,
		top: -4,
		position: 'absolute',
		//backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center'
	},
	badgeIconStyle: {
		width: 25,
		height: 25
	},
	circleGradient: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	viewLabelContainer: {
		flex: 1,
		marginLeft: horizontalScale(20),
		marginRight: horizontalScale(0)
	},
	viewUserTimeContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
		marginTop: verticalScale(5)
		// backgroundColor: 'red',
		// justifyContent: 'space-between',
	},
	usernameStyle: {
		fontSize: moderateScale(10),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginRight: verticalScale(10)
	},

	messageStyle: {
		marginTop: verticalScale(6),
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular
	},
	timeStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Regular
	}
});

export default ChatUserView;
