import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ExpoFastImage from 'expo-fast-image';

import icons from '../assets/icon';
import Strings from '../constants/strings';
import {verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import fonts from '../theme/fonts';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import ShareFriendList from './ShareFriendList';

interface ShareProps {
	onClose?: () => void;
	onBtnPress?: () => void;
	friendList?: [];
	onSendLink?: () => void;
	onFriendViewSelection?: (item: any) => void;
	onEndReach?: () => void;
}

const ShareVideoComponent: React.FC<ShareProps> = props => {
	const {
		onClose,
		onBtnPress,
		friendList,
		onSendLink,
		onFriendViewSelection,
		onEndReach
	} = props;
	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				{friendList?.length > 0 && (
					<Text style={styles.title}>{Strings.share_via_dm}</Text>
				)}
				<TouchableOpacity
					onPress={onClose}
					style={styles.imgView(friendList?.length > 0 ? 0 : 1)}>
					<ExpoFastImage source={icons.close} style={styles.img} />
				</TouchableOpacity>
			</View>
			{friendList?.length > 0 && (
				<>
					<View style={styles.listView}>
						<ShareFriendList
							friendsData={friendList}
							onEndReach={onEndReach}
							onFriendViewSelection={(item: any) => {
								onFriendViewSelection(item);
							}}
						/>
					</View>

					<View style={styles.lineView} />
				</>
			)}

			<TouchableOpacity onPress={onSendLink}>
				<Text style={styles.sendText}>{Strings.send_link_via}</Text>
			</TouchableOpacity>

			<View style={styles.lineView} />

			<ButtonGradient
				onPress={onBtnPress}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				buttonText={Strings.download_video}
				style={styles.ButtonView}
				leftIconPath={icons.download}
				leftIconStyle={styles.download_img}
				flex={0}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		padding: verticalScale(20),
		borderTopLeftRadius: verticalScale(10),
		borderTopRightRadius: verticalScale(10),
		justifyContent: 'flex-end'
	},
	titleView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: verticalScale(10)
	},
	listView: {
		paddingBottom: verticalScale(25)
	},
	title: {
		fontSize: verticalScale(18),
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontWeight: '400'
	},
	imgView: (flex: number) => ({
		paddingRight: verticalScale(20),
		flex: flex,
		alignItems: 'flex-end'
	}),
	img: {
		height: verticalScale(20),
		width: verticalScale(20)
	},
	lineView: {
		borderColor: colors.darkGray1,
		borderWidth: verticalScale(1)
	},
	sendText: {
		fontSize: verticalScale(12),
		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.white,
		paddingVertical: verticalScale(20)
	},
	ButtonView: {
		marginVertical: verticalScale(20)
	},
	download_img: {
		height: verticalScale(24),
		width: verticalScale(24),
		paddingRight: verticalScale(30)
	}
});

export default ShareVideoComponent;
