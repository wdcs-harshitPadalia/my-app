import React, {useEffect, useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import Strings from '../constants/strings';
import ConnectUserView from './ConnectUserView';
import {LinearGradient} from 'expo-linear-gradient';
import {defaultTheme} from '../theme/defaultTheme';
import InputComponent from './InputComponent';
import icons from '../assets/icon';
import {getFollowers} from '../redux/apiHandler/apiActions';
import {gradientColorAngle} from '../theme/metrics';

let pageUser = 0;

interface Props extends TextInputProps {
	title?: string;
	selectedObj: (objData: any) => void;
	pervSelectedID?: string;
}

const InviteFriendView: React.FC<Props> = props => {
	const {title, selectedObj, pervSelectedID} = props;

	const [isUserIndexID, setIsUserIndexID] = useState(pervSelectedID);
	const [searchUserText, setSearchUserText] = useState('');
	const [followUserData, setFollowUserData] = useState([]);
	const [totalFollowUser, setTotalFollowUser] = useState(-1);
	const [isShowNodata, setIsShowNodata] = useState(false);

	const getFollowersData = () => {
		const uploadData = {
			skip: pageUser,
			limit: '10',
			search: searchUserText,
			type: 'following'
		};
		getFollowers(uploadData)
			.then(res => {
				// console.log('getFollowersData Response : ', res);
				if (pageUser !== 0) {
					setFollowUserData(followUserData.concat(res?.data.follower));
					setIsShowNodata(followUserData?.length === 0 ? true : false);
				} else {
					setFollowUserData(res?.data.follower);
					setIsShowNodata(res?.data.follower?.length === 0 ? true : false);
				}
				setTotalFollowUser(res?.data.countfollower);
			})
			.catch(err => {
				console.log('getFollowersData Data Err : ', err);
			});
	};

	useEffect(() => {
		if (searchUserText.trim.length > 2) {
			pageUser = 0;
			getFollowersData();
		} else if (searchUserText.trim.length === 0) {
			pageUser = 0;
			getFollowersData();
		}
	}, [searchUserText]);

	const renderFollowersUserItem = ({item, index}) => (
		<TouchableOpacity
			onPress={() => {
				console.log(item);
				setIsUserIndexID(item._id);
				selectedObj(item);
			}}
			activeOpacity={0.5}>
			<LinearGradient
				pointerEvents={'none'}
				//pointerEvents={true}
				style={styles.userView}
				useAngle={true}
				angle={gradientColorAngle}
				opacity={isUserIndexID ? (isUserIndexID === item._id ? 1 : 0.5) : 1}
				colors={
					isUserIndexID === item._id
						? defaultTheme.primaryGradientColor
						: defaultTheme.ternaryGradientColor
				}>
				<ConnectUserView
					style={styles.userProfileView}
					username={item?.user?.userName}
					leftIconPath={item?.user?.picture}
					subTitle={`Bet maker · ${item?.activeBets} bets`}
				/>
			</LinearGradient>
		</TouchableOpacity>
	);
	return (
		<View style={{flex: 1}}>
			<View style={[styles.container, {...props.style}]}>
				<Text style={styles.titleStyle}>{title}</Text>
				<InputComponent
					fontSize={moderateScale(12)}
					style={styles.marginInput}
					placeholder={Strings.search.toUpperCase()}
					onLeftIconPath={icons.search}
					onChangeText={(text: string) => {
						setSearchUserText(text);
					}}
				/>

				<View style={styles.detailsContainer}>
					<FlatList
						bounces={false}
						data={followUserData}
						renderItem={renderFollowersUserItem}
						onEndReachedThreshold={0.1}
						onEndReached={() => {
							if (totalFollowUser !== followUserData.length) {
								pageUser = pageUser + 1;
								getFollowersData();
							}
						}}
						keyExtractor={(item, index) => item._id + index}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={() =>
							isShowNodata && (
								<Text style={styles.noDataStyle}>{Strings.no_Data_Found}</Text>
							)
						}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: verticalScale(10),
		backgroundColor: colors.black,
		overflow: 'hidden',
		paddingHorizontal: verticalScale(16),
		flex: 1
	},
	detailsContainer: {
		flexDirection: 'row',
		borderRadius: verticalScale(10),
		backgroundColor: colors.black,
		paddingBottom: verticalScale(8),
		flex: 1
	},
	titleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginTop: verticalScale(24),
		textAlign: 'center'
	},
	marginInput: {
		marginVertical: verticalScale(16),
		marginHorizontal: verticalScale(16)
	},
	userView: {
		marginVertical: verticalScale(8),
		borderRadius: verticalScale(10)
	},
	userProfileView: {
		paddingHorizontal: verticalScale(10)
	},

	noDataContainer: {
		flex: 1,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: verticalScale(16)
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center',
		marginTop: verticalScale(80)
	}
});

export default InviteFriendView;
