import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	View,
	FlatList
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import Strings from '../constants/strings';
import ConnectUserView from './ConnectUserView';
import {defaultTheme} from '../theme/defaultTheme';

interface Props extends TextInputProps {
	userArray?: any;
	title?: string;
}

const InstaFriendView: React.FC<Props> = props => {
	const {userArray, title} = props;

	const renderFollowersUserItem = () => (
		<ConnectUserView
			isInviteVisible={true}
			colorArray={defaultTheme.ternaryGradientColor}
			username={'Username'}
			leftIconPath={'https://source.unsplash.com/1024x768/?avatar'}
			buttonText={Strings.sendDM}
			subTitle={'Bet maker · 2 bets'}
		/>
	);
	return (
		<View style={[styles.container, {...props.style}]}>
			<Text style={styles.titleStyle}>{title}</Text>
			<View style={styles.detailsContainer}>
				<FlatList
					bounces={false}
					data={userArray}
					renderItem={renderFollowersUserItem}
				/>
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
		overflow: 'hidden'
	},
	detailsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: verticalScale(10),
		backgroundColor: colors.black,
		overflow: 'hidden',
		paddingHorizontal: verticalScale(16),
		paddingBottom: verticalScale(8)
	},
	titleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center'
	}
});

export default InstaFriendView;
