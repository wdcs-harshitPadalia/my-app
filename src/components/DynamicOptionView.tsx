import React, { useState } from "react";
import {
  StyleSheet,
  TextInputProps,
  ImageSourcePropType,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Fonts, horizontalScale, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";
import Strings from "../constants/strings";
import ConnectUserView from "./ConnectUserView";
import { LinearGradient } from "expo-linear-gradient";
import { defaultTheme } from "../theme/defaultTheme";
import InputComponent from "./InputComponent";
import icons from "../assets/icon";
import ButtonGradient from "./ButtonGradient";
import { gradientColorAngle } from "../theme/metrics";

interface Props extends TextInputProps {
  userArray?: any;
  title?: string;
  selectedObj: (objData: any) => void;
  pervSelectedID?: string;
}

const DynamicOptionView: React.FC<Props> = (props) => {
  const { userArray, title, selectedObj, pervSelectedID } = props;

  const [isUserIndexID, setIsUserIndexID] = useState(pervSelectedID);

  const renderFollowersUserItem = ({ item, index }) => (
    <ButtonGradient
      onPress={() => {
        setIsUserIndexID(item._id);
        selectedObj(item);
      }}
      colorArray={
        isUserIndexID === item._id
          ? defaultTheme.primaryGradientColor
          : defaultTheme.ternaryGradientColor
      }
      angle={gradientColorAngle}
      buttonTextcolor={colors.white}
      buttonText={item.name}
      style={styles.loginButtonSocial}
      // textType={textType}
    />
  );
  return (
    <View style={styles.viewDetails}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        bounces={false}
        data={userArray}
        renderItem={renderFollowersUserItem}
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
  },
});

export default DynamicOptionView;
