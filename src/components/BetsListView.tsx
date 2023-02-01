import React from "react";
import {
  StyleSheet,
  TextInputProps,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Fonts, horizontalScale, moderateScale, verticalScale } from "../theme";
import Strings from "../constants/strings";
import colors from "../theme/colors";
import TagView from "./TagView";
import { dateTimeConvert } from "../constants/utils/Function";
import { LinearGradient } from "expo-linear-gradient";
import ExpoFastImage from "expo-fast-image";
import OtherUserProfileReplicateBetComponent from "./OtherUserProfileReplicateBetComponent";
import { defaultTheme } from "../theme/defaultTheme";

interface Props extends TextInputProps {
  item: any;
  startTime_timestamp?: string;
  endTime_timestamp?: string;
  marketName?: string;
  bet_amount?: string;
  tokenTypes?: string;
  gameImage?: string;
  onPress?: () => void;
  buttonText?: string;
  teamName?: string;
  isShowDetail?: boolean;
  matchName?: string;
  isMyProfile?: boolean;
  handleMenuPress?: () => void;
  handleBetMakerUserPicked?: () => void;
  handleBetTackerPicked?: () => void;
  handleAlreadyBetTackerUserPicked?: () => void;
  handleReplicateBet?: () => void;
}

const BetsListView: React.FC<Props> = (props) => {
  const {
    endTime_timestamp,
    startTime_timestamp,
    teamName,
    onPress,
    gameImage,
    item,
    matchName,
    isMyProfile,
    handleMenuPress,
    handleBetMakerUserPicked,
    handleBetTackerPicked,
    handleAlreadyBetTackerUserPicked,
    handleReplicateBet,
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <ImageBackground source={{ uri: gameImage }} style={{}}>
          <LinearGradient colors={["black", "black"]} style={styles.gradient} />
          <View>
            <View style={styles.teamLogoContainer}>
              <ExpoFastImage
                style={styles.teamLogo}
                source={{
                  uri: item?.match?.localLogo?.teamLogo,
                }}
              />
              <ExpoFastImage
                style={styles.teamLogo}
                source={{
                  uri: item?.match?.visitorLogo?.teamLogo,
                }}
              />
            </View>
            <View style={styles.flexRawSpaceBetween}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.timeWithTeamNameTextTitle}>
                  {`${Strings.STARTS} :` +
                    dateTimeConvert(
                      parseFloat(startTime_timestamp)
                    ).toUpperCase()}
                </Text>
                {endTime_timestamp && (
                  <Text style={styles.timeWithTeamNameTextTitle}>
                    {`${Strings.ENDS} :` +
                      dateTimeConvert(
                        parseFloat(endTime_timestamp)
                      ).toUpperCase()}
                  </Text>
                )}
              </View>
              {item?.betTag && (
                <TagView
                  gradientColors={
                    item?.betTag?.toLowerCase() === "Lost".toLowerCase()
                      ? defaultTheme.primaryGradientColor
                      : item?.betTag?.toLowerCase() ===
                        "Claimable".toLowerCase()
                      ? defaultTheme.yellowGradientColor
                      : item?.betTag?.toLowerCase() === "Ended".toLowerCase()
                      ? defaultTheme.ternaryGradientColor
                      : item?.betTag?.toLowerCase() === "Won".toLowerCase()
                      ? defaultTheme.textGradientColor
                      : defaultTheme.secondaryGradientColor
                  }
                  backGroundColor={colors.redTag}
                  text={" " + item?.betTag + " "}
                  withLeftDotView={false}
                  borderRadius={20}
                  paddingVertical={4}
                  fontColor={
                    item?.betTag.toLowerCase() === "Claimable".toLowerCase() ||
                    item?.betTag.toLowerCase() === "Won".toLowerCase()
                      ? colors.back
                      : colors.white
                  }
                  // tagLeftImagePath={props.tagLeftImagePath}
                />
              )}
            </View>
            {matchName ||
            !teamName?.toUpperCase().includes("undefined".toUpperCase()) ? (
              <Text style={styles.endTimeWithTeamNameTextTitle}>
                {matchName
                  ? matchName?.toUpperCase()
                  : teamName?.toUpperCase().includes("undefined".toUpperCase())
                  ? ""
                  : teamName?.toUpperCase()}
              </Text>
            ) : (
              <Text style={styles.endTimeWithTeamNameTextTitle}>
                {item?.betQuestion}
              </Text>
            )}

            <Text numberOfLines={2} style={[styles.subTitleText]}>
              {`${item?.subcategories?.name ?? item?.categories?.name} ${
                item?.match?.leagueName ? "-" : ""
              } ${item?.match?.leagueName ?? ""}`.toUpperCase()}
            </Text>

            <View style={styles.bottomItemContainer}>
              <View style={styles.tagContainer}>
                {item?.match?.tagDetails?.includes(
                  Strings.HOT.toLowerCase()
                ) && (
                  <TagView
                    viewStyle={{ marginRight: horizontalScale(8) }}
                    backGroundColor={colors.purple}
                    text={Strings.HOT}
                  />
                )}
                {item?.match?.tagDetails?.includes(
                  Strings.FRIENDS.toLowerCase()
                ) && (
                  <TagView
                    viewStyle={{ marginRight: horizontalScale(8) }}
                    fontColor={colors.black}
                    backGroundColor={colors.yellow}
                    text={Strings.FRIENDS}
                  />
                )}
                {item?.match?.tagDetails?.includes("last minute") && (
                  <TagView
                    backGroundColor={colors.redTag}
                    text={Strings.LAST_MINUTE}
                    withLeftDotView={false}
                    // tagLeftImagePath={props.tagLeftImagePath}
                  />
                )}
              </View>
              {/* <TagView backGroundColor={colors.purple} text={Strings.HOT} />
					<Text style={styles.titleTextStyle} numberOfLines={2}>
						{marketName}
					</Text>
					<View style={styles.buttonContainerStyle}>
						<ButtonGradient
							colorArray={[colors.greyTwo, colors.greyTwo]}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={
								parseFloat(bet_amount).toFixed(decimalValue) + '' + tokenTypes
							}
							style={styles.ethButtonStyle}
							// paddingVertical={16}
						/>
						{isShowDetail && (
							<ButtonGradient
								onPress={onPress}
								colorArray={defaultTheme.primaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={buttonText}
								style={styles.seeDetailsButtonStyle}
								paddingVertical={10}
							/>
						)}
					</View> */}
            </View>

            {!isMyProfile && (
              <View>
                <OtherUserProfileReplicateBetComponent
                  itemData={item}
                  handleMenuPress={handleMenuPress}
                  handleBetMakerUserPicked={handleBetMakerUserPicked}
                  handleBetTackerPicked={handleBetTackerPicked}
                  handleAlreadyBetTackerUserPicked={
                    handleAlreadyBetTackerUserPicked
                  }
                  handleReplicateBet={handleReplicateBet}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    // flex: 1,
    borderRadius: verticalScale(15),
    overflow: "hidden",
    marginBottom: verticalScale(16),
    // minHeight: verticalScale(250),
  },
  timeWithTeamNameTextTitle: {
    fontFamily: Fonts.type.Inter_Regular,
    fontSize: moderateScale(10),
    color: colors.textTitle,
    marginHorizontal: verticalScale(16),
    marginTop: verticalScale(4),
    fontWeight: "800",
  },
  endTimeWithTeamNameTextTitle: {
    fontFamily: Fonts.type.Krona_Regular,
    fontSize: moderateScale(20),
    color: colors.white,
    marginHorizontal: verticalScale(16),
    marginTop: verticalScale(8),
    textTransform: "capitalize",
  },
  subTitleText: {
    fontFamily: Fonts.type.Inter_ExtraBold,
    color: colors.textTitle,
    fontSize: moderateScale(10),
    textAlign: "left",
    marginTop: verticalScale(8),
    marginHorizontal: verticalScale(16),
  },
  bottomItemContainer: {
    flex: 1,
    // marginHorizontal: horizontalScale(12),
    // marginVertical: verticalScale(10),
    // justifyContent: 'flex-end',
  },
  titleTextStyle: {
    fontFamily: Fonts.type.Krona_Regular,
    color: colors.white,
    fontSize: moderateScale(18),
    textAlign: "left",
    marginVertical: verticalScale(10),
    fontWeight: "400",
  },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ethButtonStyle: {
    flex: 0.3,
  },
  seeDetailsButtonStyle: {
    flex: 0.3,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.4,
  },
  teamLogoContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    //backgroundColor: 'red',
    alignItems: "center",
    flexDirection: "row",
  },
  teamLogo: {
    height: 100,
    width: 100,
  },

  flexRawSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(16),
    paddingRight: horizontalScale(16),
  },
  tagContainer: {
    flexDirection: "row",
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(10),
  },
});

export default BetsListView;
