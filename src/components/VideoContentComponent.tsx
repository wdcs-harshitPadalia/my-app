import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import icons from '../assets/icon';

import {ImageIndicator} from '../constants/utils/Function';

import {verticalScale} from '../theme';
import colors from '../theme/colors';
import ExpoFastImage from 'expo-fast-image';
import VideoPlayerComponent from './VideoPlayerComponent';

export interface ContentProps {
	_id?: string;
	video_url?: string;
	video_thumbnail?: string;
	user_id?: string;
	is_public?: boolean;
	videoEndTime?: number;
	isDeleted?: boolean;
	setModalDeleteVisible?: (visible: boolean, id: string) => void;
	modalDeleteVisible?: boolean;
	isDeleteBtnVisible?: boolean;
}

const VideoContentComponent: React.FC<ContentProps> = props => {
	const {
		_id,
		video_url,
		video_thumbnail,
		setModalDeleteVisible,
		modalDeleteVisible,
		isDeleteBtnVisible
	} = props;

	const [isShowVideoModal, setIsShowVideoModal] = useState(false);
	return (
		<>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					setIsShowVideoModal(!isShowVideoModal);
				}}>
				<ImageIndicator
					style={styles.imgView}
					source={{uri: video_thumbnail}}
					indicatorProps={styles.indicatorStyle}>
					{!isDeleteBtnVisible && (
						<TouchableOpacity
							style={styles.deleteImgView}
							onPress={() => {
								setModalDeleteVisible(!modalDeleteVisible, _id);
							}}
							hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
							<ExpoFastImage style={styles.deleteImg} source={icons.delete_white} />
						</TouchableOpacity>
					)}
				</ImageIndicator>
			</TouchableOpacity>

			<VideoPlayerComponent
				isVisible={isShowVideoModal}
				url={video_url}
				onClose={() => setIsShowVideoModal(false)}
				poster={video_thumbnail}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1 / 2,
		margin: verticalScale(5)
	},
	imgView: {
		justifyContent: 'center',
		height: verticalScale(178),
		borderRadius: verticalScale(10),
		overflow: 'hidden'
	},
	deleteImgView: {
		alignSelf: 'flex-end',
		position: 'absolute',
		top: verticalScale(9),
		right: verticalScale(5),
		backgroundColor: colors.graytransparent,
		borderRadius: verticalScale(13)
	},
	deleteImg: {
		height: verticalScale(25),
		width: verticalScale(25)
	},
	indicatorStyle: {
		size: verticalScale(40),
		borderWidth: verticalScale(0),
		color: colors.gray,
		unfilledColor: colors.grayLightText
	}
});

export default VideoContentComponent;
