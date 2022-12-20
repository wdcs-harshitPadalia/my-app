import {Dimensions, Platform, StatusBar} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const screenBottomNavHeight =
	Dimensions.get('screen').height - Dimensions.get('window').height;

export const gradientColorAngle = 168;
export const borderGradientColorAngle = 145;
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
	size + (horizontalScale(size) - size) * factor;

const scale = size => (width / guidelineBaseWidth) * size;
const moderateFontScale = (size, factor = 0.5) =>
	size + (scale(size) - size) * factor;

// Used via Metrics.baseMargin
const Metrics = {
	zero: 0,
	baseMargin: 10,
	doubleBaseMargin: 20,
	smallMargin: 5,
	textFieldRadius: 6,
	borderLineWidth: 1,
	screenWidth: width < height ? width : height,
	screenHeight: width < height ? height : width,
	navBarHeight: Platform.OS === 'ios' ? 64 : 54,
	buttonRadius: 4,
	statusBarHeight: StatusBar.currentHeight,
	isAndroid: Platform.OS !== 'ios',
	hasNotch: StatusBar.currentHeight > 24,
	isIphoneX:
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTVOS &&
		(height === 812 || width === 812 || height === 896 || width === 896)
};
export {
	horizontalScale,
	verticalScale,
	moderateScale,
	Metrics,
	moderateFontScale
};
