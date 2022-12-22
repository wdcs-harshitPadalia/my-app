import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TextInputProps,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ExpoFastImage from "expo-fast-image";
import icons from "../assets/icon";
import { Fonts, horizontalScale, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";
import { defaultTheme } from "../theme/defaultTheme";
import { gradientColorAngle } from "../theme/metrics";
import ButtonGradient from "./ButtonGradient";
import DropDownGradientView from "./DropDownGradientView";

interface Props extends TextInputProps {
  userArray?: any;
  title?: string;
  selectedMainMarketObj: (objData: any) => void;
  selectedSubMainMarketObj: (objData: any) => void;

  pervSelectedMarketID?: string;
  pervSelectedSubMarketID?: string;
}

const MainMarketOptionSelectionView: React.FC<Props> = (props) => {
  const {
    userArray,
    title,
    selectedMainMarketObj,
    selectedSubMainMarketObj,
    pervSelectedMarketID,
    pervSelectedSubMarketID,
  } = props;

  const [marketIndexID, setMainMarketIndexID] = useState(pervSelectedMarketID);
  const [subMarketIndexID, setSubMainMarketIndexID] = useState(
    pervSelectedSubMarketID
  );

  const [isShowSubMarker, setIsShowSubMarker] = useState(false);

  const flatListRef = useRef();

  const renderMainMarketItem = ({ item, index }) => (
    <View>
      <DropDownGradientView
        onPress={() => {
          console.log("item >>> 111", item);
          // if (marketIndexID === item._id) return;

          setMainMarketIndexID(item._id);
          selectedMainMarketObj(item);

          if (marketIndexID !== item._id) {
            setIsShowSubMarker(true);
            setSubMainMarketIndexID("");
            // selectedSubMainMarketObj(null);
          } else {
            setMainMarketIndexID(null);
            selectedMainMarketObj(null);
          }
          flatListRef?.current?.scrollToIndex({ animated: true, index: index });
        }}
        colorArray={
          marketIndexID === item._id
            ? defaultTheme.primaryGradientColor
            : defaultTheme.ternaryGradientColor
        }
        angle={gradientColorAngle}
        buttonTextcolor={colors.white}
        buttonText={item.market_name}
        style={styles.loginButtonSocial}
        rightIconPath={
          item?.sub_market?.length > 0
            ? marketIndexID === item._id && isShowSubMarker
              ? icons.downGray
              : icons.leftGray
            : null
        }
      />
      {marketIndexID === item._id &&
        item?.sub_market?.length > 0 &&
        isShowSubMarker && (
          <FlatList
            style={{ marginLeft: horizontalScale(16) }}
            bounces={false}
            data={item?.sub_market}
            renderItem={renderSubMarketItem}
            keyExtractor={(item, index) => item.oddName + index}
          />
        )}
    </View>
  );

  const renderSubMarketItem = ({ item, index }) => (
    <DropDownGradientView
      onPress={() => {
        if (subMarketIndexID !== item.oddName) {
          setSubMainMarketIndexID(item.oddName);
          selectedSubMainMarketObj(item);
        } else {
          setSubMainMarketIndexID("");
          selectedSubMainMarketObj(null);
        }
      }}
      colorArray={
        subMarketIndexID === item.oddName
          ? defaultTheme.primaryGradientColor
          : defaultTheme.ternaryGradientColor
      }
      angle={gradientColorAngle}
      buttonTextcolor={colors.white}
      buttonText={item.oddName}
      style={styles.loginButtonSocial}
    />
  );
  return (
    <View style={styles.viewDetails}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        scrollEnabled={false}
        ref={flatListRef}
        bounces={false}
        data={userArray}
        renderItem={renderMainMarketItem}
        keyExtractor={(item, index) => item._id + index}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewDetails: {
    backgroundColor: defaultTheme.secondaryBackGroundColor,
    borderRadius: verticalScale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(16),
    marginVertical: verticalScale(16),
  },
  titleStyle: {
    color: colors.white,
    fontSize: moderateScale(18),
    fontFamily: Fonts.type.Krona_Regular,
    textAlign: "center",
    paddingVertical: verticalScale(8),
  },
  loginButtonSocial: {
    marginHorizontal: verticalScale(16),
    marginTop: verticalScale(16),
    textAlign: "left",
  },

  subContainer: {
    borderWidth: 1,
    borderRadius: verticalScale(12),
    borderColor: colors.gray,
    backgroundColor: colors.grayBg,
    flexDirection: "column",
    marginVertical: verticalScale(8),
  },

  subViewDetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
    justifyContent: "space-between",
  },

  leftImg: {
    height: 12,
    width: 12,
    tintColor: colors.black,
    marginHorizontal: verticalScale(16),
    marginVertical: verticalScale(12),
  },
  subTitleStyle: {
    color: colors.black,
    fontSize: moderateScale(17),
    fontFamily: Fonts.type.Inter_Regular,
    paddingLeft: horizontalScale(16),
    width: "85%",
  },
  lblDesStyle: {
    color: colors.grayText,
    fontSize: moderateScale(15),
    fontFamily: Fonts.type.Inter_Regular,
    paddingVertical: verticalScale(8),
    paddingHorizontal: verticalScale(22),
    // paddingLeft: verticalScale(22),
    // paddingRight: verticalScale(22),
    // marginHorizontal: verticalScale(16),
    // marginVertical: verticalScale(16),
    // padding: horizontalScale(8),
  },
});

export default MainMarketOptionSelectionView;
