import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
} from "react-native";
import ExpoFastImage from "expo-fast-image";
import icons from "../assets/icon";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import { horizontalScale, moderateScale, verticalScale } from "../theme";
import Strings from "../constants/strings";

const SearchBar = ({ onPress, placeholderText }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.searchBar}>
        <ExpoFastImage
          style={{ height: 25, width: 25 }}
          source={icons.search}
          resizeMode={"contain"}
        />
        <TextInput
          style={styles.input}
          editable={false}
          defaultValue={placeholderText}
          onPressIn={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: verticalScale(10),
  },
  searchBar: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical:
      Platform.OS === "ios" || Platform.OS === "web" ? verticalScale(8) : 0,
    flexDirection: "row",
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    fontSize: moderateScale(12),
    flex: 1,
    marginHorizontal: horizontalScale(8),
    color: "white",
    fontFamily: fonts.type.Inter_Regular,
  },
});
