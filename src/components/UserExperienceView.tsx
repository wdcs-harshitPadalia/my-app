/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from "react-native";

import ExpoFastImage from "expo-fast-image";
import CircularProgress from "react-native-circular-progress-indicator";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Fonts, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";
import { defaultTheme } from "../theme/defaultTheme";

import Strings from "../constants/strings";
import { getLevelRank } from "../constants/utils/Function";

import BetsProgress from "./BetsProgress";

interface Props extends TextInputProps {
  userLevel: number;
  currentFees: number;

  userLevelMinBetValue?: number;
  userLevelMaxBetValue?: number;
  totalBetsCount?: number;

  progressTitle?: string;
  nextGoalTitle?: string;
  currentFeesTitle?: string;
}

const UserExperienceView: React.FC<Props> = (props) => {
  const {
    userLevel,
    currentFees,
    userLevelMinBetValue,
    userLevelMaxBetValue,
    totalBetsCount,
    progressTitle,
    nextGoalTitle,
    currentFeesTitle,
  } = props;

  // function to calculate the progress of the user according to their level.
  function userProgress(level: number, minValue: number, maxValue: number) {
    let totalValue = maxValue - minValue;
    if (userLevel === 4) {
      return 50;
    } else if (userLevel === 0) {
      return (level * 50) / totalValue;
    } else {
      let totalLevel = level - minValue + 1;
      return (totalLevel * 50) / totalValue;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{Strings.my_experience}</Text>

      <View style={styles.progressView}>
        <View style={styles.circularView}>
          {Platform.OS === "web" ? (
            <AnimatedCircularProgress
              size={180}
              width={15}
              fill={userProgress(
                totalBetsCount * 2,
                userLevelMinBetValue,
                userLevelMaxBetValue
              )}
              tintColor={colors.darkRed}
              backgroundColor={defaultTheme.backGroundColor}
              arcSweepAngle={180}
              rotation={270}
              lineCap="round"
            />
          ) : (
            <CircularProgress
              value={userProgress(
                totalBetsCount,
                userLevelMinBetValue,
                userLevelMaxBetValue
              )}
              radius={110}
              activeStrokeWidth={
                totalBetsCount === userLevelMinBetValue ? 0 : 24
              }
              inActiveStrokeWidth={24}
              progressValueStyle={{ fontWeight: "100", color: "#ffffff00" }}
              inActiveStrokeColor={defaultTheme.backGroundColor}
              activeStrokeColor={colors.darkRed}
              activeStrokeSecondaryColor={colors.purple}
            />
          )}
        </View>
      </View>

      <ExpoFastImage
        style={styles.viewBadgeStyle}
        resizeMode="cover"
        source={getLevelRank(userLevel)?.image}
      />
      <View>
        <Text style={styles.userLevelText}>{getLevelRank(userLevel).type}</Text>
      </View>
      <View style={styles.progressIndicatorValueView}>
        <Text
          style={[
            styles.progressIndicatorValueText,
            { marginRight: Platform.OS === "web" ? 0 : 60 },
          ]}
        >
          {userLevelMinBetValue}
        </Text>
        <Text
          style={[
            styles.progressIndicatorValueText,
            { marginLeft: Platform.OS === "web" ? 0 : 60 },
          ]}
        >
          {userLevelMaxBetValue}
        </Text>
      </View>

      <View style={styles.betView}>
        <BetsProgress
          betsLost={userLevelMaxBetValue + 1}
          betsPending={currentFees}
          betsWon={totalBetsCount}
          progressTitle={progressTitle}
          nextGoalTitle={nextGoalTitle}
          currentFeesTitle={currentFeesTitle}
          betLossPercent={0}
          betWonPercent={0}
          isGradiantColorVisible={true}
        />
      </View>
    </View>
  );
};

export default UserExperienceView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    borderRadius: verticalScale(8),
  },
  titleText: {
    fontFamily: Fonts.type.Krona_Regular,
    fontSize: moderateScale(18),
    color: colors.white,
    margin: verticalScale(20),
    textAlign: "center",
  },
  progressView: {
    alignItems: "center",
    marginTop: verticalScale(10),
    height: 110,
    overflow: "hidden",
  },
  circularView: {
    height: Platform.OS !== "web" && 220,
    transform: [{ rotate: Platform.OS !== "web" && "-90deg" }],
  },
  viewBadgeStyle: {
    marginTop: verticalScale(Platform.OS === "web" ? -40 : -35),
    alignSelf: "center",
    width: 60,
    height: 60,
  },
  progressIndicatorValueView: {
    flexDirection: "row",
    justifyContent: Platform.OS === "web" ? "space-around" : "space-evenly",
    marginTop: -14,
  },
  progressIndicatorValueText: {
    fontFamily: Fonts.type.Inter_Bold,
    fontSize: moderateScale(12),
    color: colors.white,
  },
  userLevelText: {
    fontFamily: Fonts.type.Inter_Bold,
    fontSize: moderateScale(12),
    color: colors.white,
    opacity: 0.7,
    textAlign: "center",
    marginTop: 11,
  },
  betView: {
    marginTop: 16,
    marginBottom: 20,
  },
});
