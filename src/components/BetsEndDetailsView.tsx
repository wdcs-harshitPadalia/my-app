import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity,
	Platform
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import Strings from '../constants/strings';

interface Props extends TextInputProps {
	gameEndDate?: string;
	gameEndTime?: string;
	onPressNeedHelp?: () => void;
	winningPercentage?: string;
	isSelectedLeagueType?: number;
	joinEndTime?: string;
}

const BetsEndDetailsView: React.FC<Props> = props => {
	const {
		gameEndDate,
		gameEndTime,
		onPressNeedHelp,
		winningPercentage,
		isSelectedLeagueType,
		joinEndTime
	} = props;

	return (
		<View style={styles.container}>
			<View style={styles.viewDetails}>
				<Text style={styles.betsTypeStyle}>
					{`${Strings.resolution_date}: ${gameEndDate}${gameEndTime}`.toUpperCase()}
				</Text>
				<Text style={styles.betsTypeStyle}>
					{`${Strings.JOINING_DEADLINE}: ${joinEndTime}`.toUpperCase()}
				</Text>
				<Text style={styles.betsTypeStyle}>
					{isSelectedLeagueType === 0
						? Strings.resolution_method_api.toUpperCase()
						: Strings.resolution_method_manual.toUpperCase()}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Text style={styles.betsTypeStyle}>
						{`${Strings.fee_over_the_winnings}: ${winningPercentage}%`.toUpperCase()}
					</Text>
					<TouchableOpacity onPress={onPressNeedHelp}>
						<ExpoFastImage
							resizeMode={'contain'}
							source={icons.help}
							style={styles.helpImg}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
			  flex: 1,
			},
			android: {
			  flex: 1,
			},
		  }),
	},
	viewDetails: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		justifyContent: 'center',
		marginVertical: verticalScale(8),
		padding: horizontalScale(16)
	},
	betsTypeStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingVertical: verticalScale(8),
		marginRight: verticalScale(4)
	},

	helpImg: {
		height: 16,
		width: 16,
		marginRight: verticalScale(8)
	}
});

export default BetsEndDetailsView;
