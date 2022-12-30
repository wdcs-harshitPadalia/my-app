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
    backgroundColor: defaultTheme.backGroundColor,
  },
  titleStyle: {
    fontSize: moderateScale(24),
    color: colors.white,
    fontFamily: Fonts.type.Krona_Regular,
    marginVertical: verticalScale(10),
    textAlign: "center",
  },
  imgIconStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
    overflow: "hidden",
  },
  subTitleStyle: {
    fontSize: moderateScale(18),
    color: colors.white,
    fontFamily: Fonts.type.Krona_Regular,
    marginVertical: verticalScale(16),
    textAlign: "center",
  },
  viewContain: {
    paddingBottom: verticalScale(16),
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(16),
    flexDirection: "column",
    backgroundColor: defaultTheme.secondaryBackGroundColor,
    borderRadius: verticalScale(10),
  },
  marginInput: {
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(16),
  },
  monthNameStyle: {
    fontSize: moderateScale(12),
    color: colors.placeholderColor,
    fontFamily: Fonts.type.Inter_SemiBold,
    marginHorizontal: verticalScale(16),
    marginTop: verticalScale(20),

    marginBottom: verticalScale(8),
  },
  nameStyle: {
    color: colors.white,
    fontFamily: Fonts.type.Inter_Bold,
    fontSize: moderateScale(12),
    flex: 1,
  },
  viewSyncContact: {
    paddingVertical: verticalScale(16),
    marginVertical: verticalScale(12),
    marginHorizontal: horizontalScale(16),
    flexDirection: "column",
    backgroundColor: defaultTheme.secondaryBackGroundColor,
    borderRadius: verticalScale(10),
  },
  closeImageStyle: {
    width: 20,
    height: 20,
  },
  loginButtonSocial: {
    marginHorizontal: verticalScale(2),
  },
  connectTypeStyle: {
    color: colors.textTitle,
    fontFamily: Fonts.type.Inter_Regular,
    fontSize: moderateScale(12),
    textAlign: "center",
    marginVertical: verticalScale(12),
    marginHorizontal: horizontalScale(Platform.OS === "web" ? 0 : 18),
  },
});
export default styles;
