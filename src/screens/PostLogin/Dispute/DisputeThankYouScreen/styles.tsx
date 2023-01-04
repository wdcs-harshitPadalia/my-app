import {StyleSheet, Platform} from 'react-native';
import {verticalScale} from '../../../../theme';
import colors from '../../../../theme/colors';
import {defaultTheme} from '../../../../theme/defaultTheme';
import fonts from '../../../../theme/fonts';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	textTitle: {
		color: colors.white,
		fontSize: 24,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	textSubTitle: {
		color: colors.white,
		fontSize: 12,
		fontWeight: '800',
		fontFamily: fonts.type.Inter_Regular,
		textAlign: 'center',
		textTransform: 'uppercase',
		marginTop: verticalScale(25)
	},
	continueFeedButton: {
		position: 'absolute',
		bottom: 10,
		...Platform.select({
			web: {
				width: '100%'
			}
		})
	}
});

export default styles;
