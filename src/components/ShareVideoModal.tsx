import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import ShareVideoComponent from './ShareVideoComponent';

interface ShareModalProps {
	isVisible: boolean;
	onBtnClose?: () => void;
	friendList?: [];
	onBtnDownload?: () => void;
	onSendLink?: () => void;
	onFriendViewSelection?: (item: any) => void;
	onEndReach?: () => void;
}

const ShareVideoModal: React.FC<ShareModalProps> = props => {
	const {
		isVisible,
		onBtnClose,
		friendList,
		onBtnDownload,
		onSendLink,
		onEndReach,
		onFriendViewSelection
	} = props;
	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View style={styles.container}>
				<ShareVideoComponent
					onBtnPress={onBtnDownload}
					onClose={onBtnClose}
					friendList={friendList}
					onSendLink={onSendLink}
					onEndReach={onEndReach}
					onFriendViewSelection={(item: string) => {
						onFriendViewSelection(item);
					}}
				/>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end'
	}
});

export default ShareVideoModal;
