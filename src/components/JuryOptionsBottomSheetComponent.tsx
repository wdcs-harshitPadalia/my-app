import React, {useEffect, useRef} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Platform
} from 'react-native';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {moderateFontScale} from '../theme/metrics';
import GradientText from './GradientText';

import RBSheet from 'react-native-raw-bottom-sheet';
import icons from '../assets/icon';

interface Props {
	onPress: (data) => void;
	openBottomSheet: boolean;
	onCloseSheet: () => void;
	onPressRecoverFunds: () => void;
}

const BottomComponent = ({onPressRecoverFunds}) => {
	return (
		<View style={styles.container}>
			<View style={styles.rootInnerContainer}>
				<Text style={styles.titleText}>{Strings.jury_options}</Text>

				<View style={styles.optionContainer}>
					{/* <TouchableOpacity
            style={styles.optionTouchableContainer}
            activeOpacity={0.6}>
            <Text style={styles.optionText}>{Strings.active_inactive}</Text>
            <Image
              source={icons.arrowForward}
              style={{height: 18, width: 18, alignSelf: 'center'}}
            />
          </TouchableOpacity> */}

					<TouchableOpacity
						style={styles.optionTouchableContainer}
						activeOpacity={0.6}
						onPress={onPressRecoverFunds}>
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={styles.optionText}>
							{Strings.resign_recover_fund}
						</GradientText>

						<Image
							source={icons.arrowForward}
							style={{height: 18, width: 18}}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const JuryOptionsBottomSheetComponent: React.FC<Props> = props => {
	const refRBSheet = useRef();

	const {onPress, openBottomSheet, onCloseSheet, onPressRecoverFunds} = props;

	useEffect(() => {
		openBottomSheet && refRBSheet.current.open();
		!openBottomSheet && refRBSheet.current.close();
	}, [openBottomSheet]);

	return (
		<View style={styles.container}>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					draggableIcon: {
						backgroundColor: '#FEFEFE',
						opacity: 0.2,
						width: 80
					},
					container: {
						backgroundColor: defaultTheme.backGroundColor
					}
				}}
				onClose={onCloseSheet}>
				<BottomComponent onPressRecoverFunds={onPressRecoverFunds} />
			</RBSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.backGroundColor
	},
	titleText: {
		fontSize: moderateFontScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center'
	},
	rootInnerContainer: {
		marginVertical: verticalScale(20),
		marginHorizontal: horizontalScale(20)
	},
	optionContainer: {
		marginHorizontal: horizontalScale(16),
		marginTop: verticalScale(30)
	},
	optionText: {
		fontSize: moderateFontScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '800',
		textTransform: 'uppercase'
	},
	optionTouchableContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: verticalScale(20)
	}
});

export default JuryOptionsBottomSheetComponent;
