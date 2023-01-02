import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {verticalScale} from '../theme';
import VideoContentComponent, {ContentProps} from './VideoContentComponent';

interface ContentList {
	videoListData: ContentProps[];
	onEndReach?: () => void;
	setModalDeleteVisible?: (visible: boolean, id: string) => void;
	modalDeleteVisible?: boolean;
	isDeleteBtnVisible?: boolean;
}
const VideoContentList: React.FC<ContentList> = props => {
	const {
		videoListData,
		onEndReach,
		setModalDeleteVisible,
		modalDeleteVisible,
		isDeleteBtnVisible
	} = props;
	const renderItem = ({item}) => (
		<>
			{/* <>{console.log('ehuybdhy', item)}</> */}
			<VideoContentComponent
				_id={item?._id}
				video_thumbnail={item?.video_thumbnail}
				video_url={item?.video_url}
				user_id={item?.user_id}
				is_public={item?.is_public}
				isDeleted={item?.isDeleted}
				videoEndTime={item?.videoEndTime}
				setModalDeleteVisible={(value, id) => {
					setModalDeleteVisible(value, id);
				}}
				modalDeleteVisible={modalDeleteVisible}
				isDeleteBtnVisible={isDeleteBtnVisible}
			/>
		</>
	);

	const keyExtractor = (item: ContentProps, index) => {
		return index;
	};
	return (
		<View style={styles.container}>
			<FlatList
				data={videoListData}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				numColumns={2}
				onEndReached={() => {
					onEndReach();
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: verticalScale(10),
		flex: 1
	}
});

export default VideoContentList;
