import { Platform, StyleSheet } from "react-native";
import {
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../theme";
import colors from "../../../theme/colors";
import { defaultTheme } from "../../../theme/defaultTheme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageStyle: { width: "100%", height: "100%", position: "absolute", top: 0 },
  viewLogo: {
    paddingTop: verticalScale(80),
    marginHorizontal: horizontalScale(24),
    flexDirection: "row",
  },
  viewContain: {
    marginHorizontal: horizontalScale(16),
    flexDirection: "column",
    backgroundColor: defaultTheme.secondaryBackGroundColor,
    borderRadius: 20,
  },
  marginInput: {
    marginHorizontal: verticalScale(16),
  },
  loginButtonStyle: {
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(24),
    marginBottom: verticalScale(24),
  },

  titleStyle: {
    fontSize: moderateScale(18),
    color: colors.white,
    fontFamily: Fonts.type.Krona_Regular,
    marginTop: verticalScale(40),
    textAlign: "center",
  },
  viewCheckboxStyle: {
    flexDirection: "row",
    marginTop: verticalScale(16),
    marginBottom: verticalScale(4),
    marginHorizontal: horizontalScale(16),
    // backgroundColor: colors.white,
  },
  acceptStyle: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: Fonts.type.Inter_Medium,
  },
  errorStyle: {
    fontSize: moderateScale(12),
    color: colors.red,
    fontFamily: Fonts.type.Inter_Medium,
    // marginTop: verticalScale(-),
    marginHorizontal: horizontalScale(16),
    // marginBottom: verticalScale(16),
  },
  underlineStyle: {
    textDecorationLine: "underline",
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: Fonts.type.Inter_SemiBold,
  },
  imgIconStyle: {
    width: verticalScale(20),
    height: verticalScale(20),
    marginRight: horizontalScale(10),
  },
  acceptTextViewStyle: {
    marginRight: verticalScale(Platform.OS === "web" ? 0 : 60),
    flexShrink: Platform.OS === "web" ? 1 : 0,
  },
});
export default styles;
