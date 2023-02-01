import React, {useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity,
	FlatList,
	ImageBackground,
	Image
} from 'react-native';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {handleOpenUrlInBrowser} from '../constants/utils/Function';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle, width} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import FullScreenImageComponent from './FullScreenImageComponent';
import VideoPlayerComponent from './VideoPlayerComponent';

interface Props extends TextInputProps {
	onPress?: () => void;
	resolverEvidenceData?: any;
	isShowResolverEvidence?: boolean;
}

const OpenDisputeView: React.FC<Props> = props => {
	const {onPress, resolverEvidenceData, isShowResolverEvidence} = props;

	const imageRef = useRef(null);
	const [isShowImageModal, setIsShowImageModal] = useState<boolean>(false);
	const [isShowVideoModal, setIsShowVideoModal] = useState<boolean>(false);

	const [imageUrl, setImageUrl] = useState<string>('');
	const [videoUrl, setVideoUrl] = useState<string>('');
	const [videoThumb, setVideoThumb] = useState<string>('');

	const handleLinkPress = (urlTxt: string) => {
		handleOpenUrlInBrowser(urlTxt);
	};

	const renderItem = ({item}: any) => {
		return (
			<View
				key={item.id}
				style={{
					paddingBottom: verticalScale(4),
					width: width - horizontalScale(32)
				}}>
				{item.type === 'url' && (
					<ButtonGradient
						leftIconPath={icons.link}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonText={item.data_url}
						buttonTextcolor={colors.white}
						numberOfLines={2}
						leftIconStyle={styles.disputeLinkIcon}
						style={styles.disputeLinkPreviewContainer}
						onPress={() => handleLinkPress(item.data_url)}
					/>
				)}
				{item.type === 'image' && (
					<View style={styles.imageEvidenceContainer}>
						<ImageBackground
							ref={imageRef.current}
							source={{uri: item.data_url}}
							style={{
								height: verticalScale(150),
								marginVertical: verticalScale(2)
							}}
							resizeMode={'contain'}>
							<TouchableOpacity
								onPress={() => {
									setIsShowImageModal(true);
									setImageUrl(item.data_url);
								}}>
								<Image
									source={icons.imageExpander}
									style={styles.imageExpanderStyle}
								/>
							</TouchableOpacity>
						</ImageBackground>
					</View>
				)}
				{item.type === 'video' && (
					<ImageBackground
						style={styles.videoEvidenceThumb}
						source={{uri: item.data_video_thumb}}>
						<TouchableOpacity
							onPress={() => {
								setIsShowVideoModal(true);
								setVideoUrl(item.data_url);
								setVideoThumb(item.data_video_thumb);
							}}
							activeOpacity={0.8}>
							<Image source={icons.playIcon} style={styles.playIconStyle} />
						</TouchableOpacity>
					</ImageBackground>
				)}
				<FullScreenImageComponent
					isVisible={isShowImageModal}
					url={imageUrl}
					onClose={() => setIsShowImageModal(false)}
				/>
				<VideoPlayerComponent
					isVisible={isShowVideoModal}
					url={videoUrl}
					poster={videoThumb}
					onClose={() => setIsShowVideoModal(false)}
				/>
			</View>
		);
	};

	return (
		<View style={styles.viewDetails}>
			{isShowResolverEvidence && (
				<>
					<Text style={styles.headTitleStyle}>{Strings.resolver_evidence}</Text>
					<FlatList
						data={resolverEvidenceData}
						keyExtractor={item => item.id}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						scrollEnabled={false}
					/>
				</>
			)}

			<Text
				style={[
					styles.titleStyle,
					{marginTop: verticalScale(isShowResolverEvidence ? 20 : 0)}
				]}>
				{Strings.problem_with_this_result}
			</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.openDisputeStyle}>{Strings.open_dispute}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	viewDetails: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: verticalScale(20),
		marginVertical: verticalScale(8)
	},
	titleStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		paddingHorizontal: verticalScale(16)
	},
	openDisputeStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textAlign: 'center',
		paddingHorizontal: verticalScale(16),
		marginTop: verticalScale(2),
		textDecorationLine: 'underline'
	},
	headTitleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		marginHorizontal: horizontalScale(20),
		marginBottom: verticalScale(10)
	},
	disputeLinkPreviewContainer: {
		marginTop: verticalScale(10),
		marginHorizontal: horizontalScale(20)
	},
	disputeLinkIcon: {
		width: 36,
		height: 36,
		marginRight: horizontalScale(4)
	},
	imageEvidenceContainer: {
		marginHorizontal: horizontalScale(20),
		marginTop: horizontalScale(20),
		borderRadius: 8,
		borderColor: colors.white,
		borderWidth: 0.4,
		justifyContent: 'center',
		flex: 1
	},
	imageExpanderStyle: {
		height: 32,
		width: 32,
		position: 'absolute',
		top: verticalScale(12),
		right: horizontalScale(12),
		backgroundColor: 'rgba(0,0,0,0.2)'
	},
	videoEvidenceThumb: {
		height: 150,
		borderRadius: 8,
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(20),
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: colors.white,
		borderWidth: 0.4,
		overflow: 'hidden'
	},
	playIconStyle: {
		height: 48,
		width: 48,
		tintColor: 'rgba(255,255,255,0.9)',
		alignSelf: 'center',
		justifyContent: 'center'
	}
});

export default OpenDisputeView;
