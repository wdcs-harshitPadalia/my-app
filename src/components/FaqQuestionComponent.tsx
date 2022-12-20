import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../theme/colors';
import QuestionComponent, {FaqData} from './QuestionComponent';

export interface FaqProps {
  data: FaqData[];
}

const FaqQuestionComponent: React.FC<FaqProps> = props => {
  const {data} = props;

	const renderItem = (item: FaqData) => {
		return (
			<QuestionComponent
				id={item?.item?.id}
				question={item?.item?.question}
				answer={item?.item?.answer}
				position={item?.item?.position}
				isactive={item?.item?.isactive}
				isdeleted={item?.item?.isdeleted}
			/>
		);
	};

	const keyExtractor = (item: FaqData) => {
		return item.id;
	};
	return (
		<KeyboardAwareScrollView bounces={false}>
			<View style={styles.creditCardViewStyle}>
				<FlatList
					data={data}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={false}
					keyExtractor={keyExtractor}
					scrollEnabled={false}
					nestedScrollEnabled={true}
				/>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default FaqQuestionComponent;

const styles = StyleSheet.create({
	buttonContainerStyle: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16
	},
	creditCardViewStyle: {
		backgroundColor: colors.black,
		marginTop: 12,
		marginHorizontal: 16,
		borderRadius: 8,
		paddingHorizontal: 16,
		flex: 1
	}
});
