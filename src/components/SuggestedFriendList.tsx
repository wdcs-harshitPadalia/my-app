import React, {useEffect, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from 'react-redux';
import Strings from '../constants/strings';
import {updateApiLoader} from '../redux/reducerSlices/preLogin';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle, height} from '../theme/metrics';
import FriendFlatList from './FriendFlatList';

interface Props extends TextInputProps {
	onSkipPress?: () => void;
	userId?: string;
}

const SuggestedFriendList: React.FC<Props> = props => {
	const {userId, onSkipPress} = props;
	const [isShowList, setIsShowList] = useState(false);
	const dispatch = useDispatch();

	const onShowList = () => {
		console.log('jsahdkasdhasdkasdskjh32131232');
		setIsShowList(true);
	};

	useEffect(() => {
		dispatch(updateApiLoader({apiLoader: true}));
	}, []);

	return (
		<View style={styles.bgView}>
			<View style={isShowList ? styles.centeredView : {display: 'none'}}>
				<View style={styles.viewDetails}>
					<View style={styles.skipView}>
						<LinearGradient
							style={styles.circleGradient}
							useAngle={true}
							angle={gradientColorAngle}
							colors={defaultTheme.ternaryGradientColor}>
							<TouchableOpacity style={styles.skipBtn} onPress={onSkipPress}>
								<Text style={styles.skipText}>{Strings.skip}</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>
					<Text style={styles.titleStyle}>
						{Strings.connect_with_other_users_and_start_betting}
					</Text>
					<FriendFlatList
						onShowList={onShowList}
						userId={userId}
						isFromInviteUser={true}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bgView: {
		top: 0,
		bottom: 0,
		width: '100%',
		position: 'absolute'
	},
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	viewDetails: {
		width: '100%',
		backgroundColor: defaultTheme.backGroundColor,
		paddingBottom: 30
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(20),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		marginVertical: verticalScale(20),
		marginHorizontal: verticalScale(16)
	},

	skipBtn: {
		color: colors.grayLightText,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		alignItems: 'center',
		justifyContent: 'center',
		height: verticalScale(36),
		borderRadius: verticalScale(18)
	},
	skipText: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginHorizontal: verticalScale(16)
	},

	skipView: {
		alignItems: 'flex-end',
		marginTop: verticalScale(16),
		marginRight: verticalScale(16)
	},
	circleGradient: {
		borderRadius: verticalScale(18),
		alignItems: 'center',
		flexDirection: 'row'
	}
});

export default SuggestedFriendList;
