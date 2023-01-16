import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import {moderateFontScale} from '../theme/metrics';
import StoryProfileComponent from './StoryProfileComponent';

interface FriendListProps {
	friendsData?: any;
	onFriendViewSelection?: (item: any) => void;
	onEndReach?: () => void;
}

const ShareFriendList: React.FC<FriendListProps> = props => {
	const {friendsData, onFriendViewSelection, onEndReach} = props;
	const renderItem = ({item}) => (
		<View key={item._id}>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					onFriendViewSelection(item);
				}}>
				<StoryProfileComponent
					level={item.level}
					profileImgPath={item.picture}
				/>
				<View style={styles.titleView}>
					<Text style={styles.storyTitleText}>
						{('@' + item.userName).length > 10
							? ('@' + item.userName).substring(0, 10).concat('...')
							: '@' + item.userName}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);

	const keyExtractor = ({item}) => {
		return item?.id;
	};
	return (
		<>
			<FlatList
				data={friendsData}
				horizontal
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				onEndReached={onEndReach}
				showsHorizontalScrollIndicator={false}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: horizontalScale(15),
		marginHorizontal: horizontalScale(10)
	},
	storyTitleText: {
		color: colors.white,
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		fontSize: moderateFontScale(8),
		textAlign: 'center'
	},
	titleView: {
		marginTop: verticalScale(8)
	}
});

export default ShareFriendList;
