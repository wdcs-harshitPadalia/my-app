import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import fonts from '../theme/fonts';
import {horizontalScale, moderateFontScale} from '../theme/metrics';
import SettingKeyComponent, {NotificationData} from './SettingKeyComponent';

export interface ListProps {
	sectionTitle?: string;
	data?: NotificationData[];
}
export interface SettingKeyList {
	data?: ListProps[];
	setSettingKeyValue?: (key: string, toggleValue: boolean) => void;
}
const SettingKeyListView: React.FC<SettingKeyList> = props => {
	const {data, setSettingKeyValue} = props;
	const renderItem = (item: NotificationData, section) => {
		return (
			<SettingKeyComponent
				title={item?.item?.title}
				toggleValue={item?.item?.toggleValue}
				keyValue={item?.item?.keyValue}
				setNotificationValue={(keyValue: string, value: boolean) => {
					setSettingKeyValue(keyValue, value);
				}}
				isTopRadius={item?.index === 0 ? true : false}
				isBottomRadius={
					item?.index === item?.section?.data?.length - 1 ? true : false
				}
			/>
		);
	};
	const keyExtractor = (item: NotificationData, index) => {
		return index;
	};

	return (
		<View style={styles.container}>
			<View style={styles.viewContain}>
				<SectionList
					sections={data}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={false}
					initialNumToRender={25}
					renderSectionHeader={({section: {sectionTitle}}) => (
						<View style={styles.SectionTitleView}>
							<Text style={styles.sectionTitleText}>
								{sectionTitle?.toUpperCase()}
							</Text>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

export default SettingKeyListView;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: horizontalScale(16)
	},
	SectionTitleView: {
		backgroundColor: defaultTheme.backGroundColor,
		paddingVertical: verticalScale(20)
	},
	sectionTitleText: {
		color: colors.white,
		fontFamily: fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(12),
		paddingHorizontal: moderateFontScale(8)
	},
	viewContain: {
		paddingBottom: verticalScale(16),
		marginVertical: verticalScale(10),
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10)
	}
});
