import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  Text,
  Platform,
} from "react-native";
import ExpoFastImage from "expo-fast-image";
import { Fonts, horizontalScale, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";

interface Props extends TextInputProps {
  style?: ViewStyle;
  textTitleStyle?: ViewStyle;
  isShowError?: boolean;
  errMessage?: string;
  title?: string;
  onLeftIconPath?: any;
  textValue?: string;
  isUserName?: boolean;
  returnType?: string;
}

const InputComponent = forwardRef<TextInput, Props>((props, ref) => {
  const {
    title,
    placeholder,
    isShowError,
    errMessage,
    onLeftIconPath,
    textValue,
    isUserName,
    returnType,
    fontSize,
  } = props;

  return (
    <View
			style={{
				...Platform.select({
					web: {
						width: '100%'
					}
				})
			}}>
      {title ? (
        <Text style={[styles.titleStyle, { ...props.textTitleStyle }]}>
          {title}
        </Text>
      ) : null}

      <View style={[styles.container, { ...props.style }]}>
        {onLeftIconPath !== undefined ? (
          <ExpoFastImage
            //resizeMode={ExpoFastImage.resizeMode.contain}
            source={onLeftIconPath}
            style={styles.leftImg}
          />
        ) : null}
        {isUserName && (
          <Text
            style={props.defaultValue === "" ? styles.prefix1 : styles.prefix}
          >
            @
          </Text>
        )}
        <TextInput
          {...props}
          ref={ref}
          style={[styles.inputStyle, { fontSize: fontSize }]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderColor}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          value={textValue}
          returnKeyType={returnType ?? "done"}
        />
      </View>
      {isShowError ? <Text style={styles.errStyle}>{errMessage}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  prefix: {
    color: colors.white,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.Inter_ExtraBold,
    //flex: 1,
    // backgroundColor: 'red',
  },
  prefix1: {
    color: colors.placeholderColor,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.Inter_ExtraBold,
    //flex: 1,
    // backgroundColor: 'red',
  },
  inputStyle: {
    // flex: 1,
    outlineStyle: 'none',
    width: "100%",
    color: colors.white,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.Inter_ExtraBold,
    //paddingLeft: 10,
    paddingTop: Platform.OS === "ios" || Platform.OS === "web" ? 10 : 0,
    paddingBottom: Platform.OS === "ios" || Platform.OS === "web" ? 5 : -10,
  },
  errStyle: {
    color: colors.red,
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.Inter_Regular,
    paddingHorizontal: horizontalScale(16),
    paddingTop: 5,
  },
  titleStyle: {
    color: colors.textTitle,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.Inter_ExtraBold,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(20),
  },
  leftImg: {
    height: 17,
    width: 17,
    marginRight: verticalScale(8),
    tintColor: colors.white,
    marginBottom: Platform.OS === "ios" ? -4 : 0,
    alignSelf: "center",
  },
});

export default InputComponent;
