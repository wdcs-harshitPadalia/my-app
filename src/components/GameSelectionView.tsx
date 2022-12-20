import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import colors from '../theme/colors';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	onPress?: () => void;
	colorArray?: string[];
	localTeamName?: string;
	visitorTeamName?: string;
	date?: string;
	time?: string;
}

const GameSelectionView: React.FC<Props> = props => {
	const {onPress, colorArray, localTeamName, visitorTeamName, date, time} =
		props;

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={1}>
			<LinearGradient
				style={styles.container}
				useAngle={true}
				angle={gradientColorAngle}
				colors={colorArray}>
				<View style={styles.viewDateTime}>
					{date ? <Text style={styles.dateStyle}>{date}</Text> : null}
					{time ? <Text style={styles.dateStyle}>{time}</Text> : null}
				</View>

				<View style={styles.viewName}>
					<Text style={styles.nameStyle}>{localTeamName}</Text>
					{visitorTeamName ? (
						<Text style={styles.nameStyle}>{visitorTeamName}</Text>
					) : null}
				</View>
			</LinearGradient>
		</TouchableOpacity>

	// </View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: verticalScale(16),
		padding: horizontalScale(12)
	},

	viewDateTime: {
		flexDirection: 'column'
	},

	viewName: {
		flexDirection: 'column',
		flex: 1
	},

	nameStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular
	},
	dateStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginRight: horizontalScale(12)
	}
});

export default GameSelectionView;
