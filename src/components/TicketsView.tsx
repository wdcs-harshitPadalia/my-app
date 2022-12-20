import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	View
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import moment from 'moment';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	onPress?: () => void;
	colorArray?: [];
	data?: Object;
}

const TicketsView: React.FC<Props> = props => {
	const {onPress, colorArray, data} = props;

	return (
		<LinearGradient
			style={styles.circleGradient}
			useAngle={true}
			angle={gradientColorAngle}
			colors={colorArray}>
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.container}
				onPress={onPress}>
				<View style={styles.viewLabelContainer}>
					<View style={styles.viewColumn}>
						<Text style={styles.usernameStyle}>{data?.subject}</Text>
						<LinearGradient
							style={styles.viewStatus}
							useAngle={true}
							angle={gradientColorAngle}
							colors={defaultTheme.primaryGradientColor}>
							<Text style={styles.lblStatus}>{data?.status.toUpperCase()}</Text>
						</LinearGradient>
					</View>
					<View style={styles.viewColumn}>
						<Text style={styles.userTypeStyle}>{data?.description}</Text>
						<Text style={styles.dateStyle} numberOfLines={1}>
							{moment(parseFloat(new Date(data?.createdAt).getTime())).fromNow(
								true
							) + ' ago'}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	circleGradient: {
		borderRadius: verticalScale(8),
		alignItems: 'center',
		marginTop: verticalScale(8),
		marginBottom: verticalScale(8)
	},

	viewLabelContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: verticalScale(16)
	},
	viewColumn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1
	},
	viewStatus: {
		flexDirection: 'column',
		justifyContent: 'center',
		padding: verticalScale(8),
		backgroundColor: colors.red,
		borderRadius: verticalScale(8)
	},
	lblStatus: {
		fontSize: moderateScale(14),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold
	},
	usernameStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		textAlign: 'left',
		flex: 0.8
	},

	userTypeStyle: {
		fontSize: moderateScale(14),
		color: colors.whiteFour10,
		fontFamily: Fonts.type.Inter_Regular,
		marginTop: verticalScale(2),
		flex: 0.7
	},
	dateStyle: {
		fontSize: moderateScale(12),
		color: colors.whiteFour10,
		fontFamily: Fonts.type.Inter_SemiBold,
		marginTop: verticalScale(4),
		flex: 0.3,
		textAlign: 'right'
	}
});

export default TicketsView;
