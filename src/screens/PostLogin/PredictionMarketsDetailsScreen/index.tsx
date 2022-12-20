import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import icons from '../../../assets/icon';
import AnswerOptionView from '../../../components/Events/AnswerOptionView';
import LiquidityNumberView from '../../../components/Events/LiquidityNumberView';
import PredictionMarketsCellView from '../../../components/Events/PredictionMarketsCellView';
import HeaderComponent from '../../../components/HeaderComponent';
import Strings from '../../../constants/strings';
import {horizontalScale, screenWidth} from '../../../theme/metrics';
import styles from './style';

const PredictionMarketsDetailsScreen: React.FC<any> = props => {
	const {questionText} = useRoute().params;
	const navigation = useNavigation();
	const answerDate = [
		{answer: 'YES', price: '0.462 ETH', shares: '0'},
		{answer: 'NO', price: '0.538 ETH', shares: '0'},
		{answer: 'OKAY', price: '0.658 ETH', shares: '7'}
	];
	const chartConfig = {
		decimalPlaces: 0,
		strokeWidth: 2,
		fillShadowGradientFromOpacity: 0,
		fillShadowGradientToOpacity: 0,
		color: () => 'rgba(255, 255, 255, 0.5)',
		labelColor: () => 'rgba(255, 255, 255, 0.5)',
		propsForBackgroundLines: {
			strokeWidth: 0.5,
			strokeDasharray: '5'
			//stroke: '#ffffff50'
		},
		propsForLabels: {
			fontSize: 10,
			fontFamily: 'Inter',
			fontWeight: 'bold'
		},
		propsForDots: {
			r: '5'
			//strokeWidth: '2',
			//stroke: '#888888'
		}
	};

	const data = {
		labels: [
			'12:00 PM',
			'4:00 PM',
			'8:00 PM',
			'12:00 AM',
			'4:00 AM',
			'8:00 AM'
		],
		datasets: [
			{
				data: [50, 40, 60, 70, 80, 50],
				color: () => 'rgba(223, 0, 124, 1.0)'
			},
			{
				data: [20, 30, 50, 60, 40, 30],
				color: () => 'rgba(0, 235, 103, 1.0)'
			}
		]
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.Prediction_markets}
					onLeftIconPath={icons.back}
				/>

				<View style={styles.containerSubView}>
					<PredictionMarketsCellView
						itemData={[]}
						questionText={questionText}
						onQuestionTextPress={() => {}}
					/>
					<View style={styles.liquidityNumberView}>
						<LiquidityNumberView TitleText="LIQUIDITY" valueText="3 ETH" />
						<LiquidityNumberView TitleText="VOLUME" valueText="0.53 ETH" />
						<LiquidityNumberView
							TitleText="EXPIRATION"
							valueText="10. 24. 2021"
						/>
					</View>

					<FlatList
						data={answerDate}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => (
							<View style={styles.itemSeparatorView} />
						)}
						renderItem={({item}) => {
							return <AnswerOptionView data={item} />;
						}}
					/>
					<View style={styles.liquidityNumberView}>
						<LineChart
							data={data}
							width={screenWidth - horizontalScale(32)}
							height={240}
							transparent={true}
							chartConfig={chartConfig}
							fromZero={true}
							fromNumber={100}
							xLabelsOffset={8}
							yLabelsOffset={5}
							segments={2}
							yAxisSuffix={'%'}
							//yAxisInterval={1}
							//hidePointsAtIndex={[]}
							//verticalLabelRotation={-15}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default PredictionMarketsDetailsScreen;
