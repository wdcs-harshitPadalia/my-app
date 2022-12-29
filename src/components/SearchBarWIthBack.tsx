import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import ExpoFastImage from "expo-fast-image";
import icons from "../assets/icon";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import { horizontalScale, moderateScale, verticalScale } from "../theme";

const SearchBarWIthBack = ({
  placeholderText,
  searchPhrase,
  setSearchPhrase,
  onBackPress,
  searchClicked,
  isEditable,
  selectedIndex,
  onClearPress,
}) => {
  const animVal = new Animated.Value(-40);
  const searchRef = useRef();

  const [showClearIcon, setShowClearIcon] = useState(false);

  useEffect(() => {
    console.log("useEffect :: searchClicked ::", searchClicked);
    console.log("useEffect :: selectedIndex ::", selectedIndex);
    searchRef.current.focus();

    if (searchClicked) {
      Animated.timing(animVal, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        isInteraction: false,
      }).start((finished) => {
        if (finished) {
          searchRef.current.focus();
          animVal.setValue(0);
        }
      });
    }
    return () => {
      animVal.setValue(0);
    };
  }, [searchClicked]);

  useEffect(() => {
    if (searchPhrase.length > 0) {
      setShowClearIcon(true);
    } else {
      setShowClearIcon(false);
    }
  }, [searchPhrase]);

  return (
    <View style={styles.container}>
      {searchClicked ? (
        <TouchableOpacity
          onPress={() => {
            animVal.setValue(0);
            Animated.timing(animVal, {
              toValue: -40,
              duration: 500,
              useNativeDriver: false,
              isInteraction: false,
            }).start((finished) => {
              if (finished) {
                onBackPress();
              }
            });
          }}
        >
          <ExpoFastImage
            style={styles.btnBack}
            source={icons.back}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      ) : null}
      <Animated.View style={[styles.searchBar, { marginLeft: animVal }]}>
        {/* <View style={styles.searchBar}> */}
        <ExpoFastImage
          style={{ height: 25, width: 25 }}
          source={icons.search}
          resizeMode={"contain"}
        />
        <TextInput
          ref={searchRef}
          editable={isEditable}
          style={styles.input}
          placeholder={placeholderText}
          placeholderTextColor={"rgba(255, 255, 255, 1.0)"}
          value={searchPhrase ?? ""}
          onChangeText={setSearchPhrase}
          // clearButtonMode="always"
        />
        {showClearIcon ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              searchRef.current.clear();
              setShowClearIcon(false);
              onClearPress();
            }}
          >
            <ExpoFastImage
              style={{ height: 14, width: 14, marginRight: horizontalScale(4) }}
              source={icons.close}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        ) : null}
        {/* </View> */}
      </Animated.View>
    </View>
  );
};
export default SearchBarWIthBack;

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
  btnBack: {
    height: 25,
    width: 25,
    // borderRadius: 13,
    marginHorizontal: verticalScale(8),
    // marginVertical: verticalScale(8),
  },
});
