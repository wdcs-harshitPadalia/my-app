/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  Platform,
} from "react-native";
import { Badge } from "react-native-elements/dist/badge/Badge";
import { Image } from "react-native-elements/dist/image/Image";
import ExpoFastImage from "expo-fast-image";
import { Defs, LinearGradient, RadialGradient, Stop } from "react-native-svg";
import icons from "../assets/icon";
import Strings from "../constants/strings";
import { getPieChartDataRounded } from "../constants/utils/Function";
import { Fonts, horizontalScale, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";
import { defaultTheme } from "../theme/defaultTheme";
import GradientText from "./GradientText";
import { PieChart } from "react-native-svg-charts";
import { width } from "../theme/metrics";

interface Props extends TextInputProps {
  betsStats: [];
}

const PieChartComponent: React.FC<Props> = (props) => {
  const { betsStats } = props;

  const getChartData = useMemo(() => {
    let arrayData = [];
    betsStats?.map((item, index) => {
      arrayData.push(item?.count);
    });
    return arrayData;
  }, [betsStats]);

  const pieChartData = getPieChartDataRounded(getChartData);

  const Gradient = () =>
    pieChartData.map((index, value) => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      const randomColor1 =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      let key = "gradient" + value;

      return (
        <Defs key={key}>
          <LinearGradient
            id={key}
            x1={0}
            y1={"27.88%"}
            x2={"61.46%"}
            y2={"100%"}
          >
            <Stop
              offset={"0%"}
              stopColor={
                defaultTheme.paiChartGradient[value]
                  ? defaultTheme.paiChartGradient[value][0]
                  : defaultTheme.paiChartGradient[0][0]
              }
              stopOpacity={1}
            />
            <Stop
              offset={"100%"}
              stopColor={
                defaultTheme.paiChartGradient[value]
                  ? defaultTheme.paiChartGradient[value][1]
                  : defaultTheme.paiChartGradient[0][1]
              }
              stopOpacity={1}
            />
          </LinearGradient>
        </Defs>
      );
    });

  const lapsList = () => {
    return betsStats.map((data, index) => {
      return (
        <View style={styles.viewCategory}>
          {Platform.OS === "web" ? (
            <Text
              style={[
                styles.gradientText,
                { color: defaultTheme.paiChartGradient[index][0] },
              ]}
            >
              {"●"}
            </Text>
          ) : (
            <GradientText
              colors={
                defaultTheme.paiChartGradient[index] ??
                defaultTheme.paiChartGradient[0]
              }
              style={styles.gradientText}
            >
              {"●"}
            </GradientText>
          )}
          <Text style={styles.categoryNameStyle}>{data?.name}</Text>
          <Text style={styles.countText}>{`${parseFloat(data?.count).toFixed(
            2
          )}%`}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewChart}>
        <PieChart
          style={styles.viewChart}
          data={pieChartData}
          innerRadius={40}
          outerRadius={80}
          sort={(a, b) => b.value - a.value}
        >
          <Gradient />
        </PieChart>
      </View>

      <View
        style={{
          marginRight: 8,
          flex: 1,
        }}
      >
        {lapsList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  viewChart: {
    height: width * 0.5,
    width: width * 0.5,
  },
  categoryNameStyle: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: Fonts.type.Inter_ExtraBold,
    padding: verticalScale(4),
  },
  viewCategory: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  gradientText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.Inter_ExtraBold,
  },
  countText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.Inter_ExtraBold,
    color: colors.placeholderColor,
  },
});

export default PieChartComponent;
