import React from "react";
import {
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ImageSourcePropType,
  Text,
  View,
  TextInput,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Fonts, horizontalScale, moderateScale, verticalScale } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import ExpoFastImage from "expo-fast-image";
import icons from "../assets/icon";
import colors from "../theme/colors";
import { gradientColorAngle } from "../theme/metrics";

interface Props extends TextInputProps {
  leftIconPath?: ImageSourcePropType;
  rightIconPath?: ImageSourcePropType;
  onPress?: () => void;
  colorArray?: string[];
  angle?: number;
  btnDisabled?: boolean;
  short_name?: string;
  editable?: boolean;
  textValue?: string;
  onChangeText?: (text: string) => void;
  onSubmitText?: (text: any) => void;
  onEndEditing?: () => void;

  keyboardType?: string;
  maxLength?: number;
  isShowError?: boolean;
  errMessage?: string;
  rightIcon?: ImageSourcePropType;
  styleOfRightIcon?: ViewStyle;
  onPressInfoIcon?: () => void;
  short_nameTextStyle?: TextStyle;
}

const ButtonGradientWithRightIcon: React.FC<Props> = (props) => {
  const {
    leftIconPath,
    onPress,
    colorArray,
    angle,
    rightIconPath,
    btnDisabled,
    short_name,
    short_nameTextStyle,
    editable,
    textValue,
    onChangeText,
    onSubmitText,
    keyboardType,
    maxLength,
    isShowError,
    errMessage,
    rightIcon,
    styleOfRightIcon,
    onPressInfoIcon,
    onEndEditing,
  } = props;

  return (
    <View style={[{ ...props.style, flexDirection: "column" }]}>
      {btnDisabled ? (
        <LinearGradient
          style={styles.circleGradient}
          useAngle={true}
          angle={angle ? angle : gradientColorAngle}
          colors={colorArray}
        >
          {leftIconPath !== undefined ? (
            <ExpoFastImage
              resizeMode={"contain"}
              source={leftIconPath}
              style={styles.leftImg}
            />
          ) : null}

          {/* <Text
style={[
 styles.inputStyle,
 {
   color: buttonTextcolor,
   textTransform: textType === undefined ? 'uppercase' : textType,
   fontSize: textSize === undefined ? moderateScale(22) : textSize,
 },
]}>
{buttonText}
</Text> */}
          <TextInput
            editable={editable}
            style={[styles.inputStyle, { ...props.textStyle }]}
            placeholder={"0"}
            placeholderTextColor={colors.placeholderColor}
            value={textValue}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitText}
            keyboardType={keyboardType}
            returnKeyType={"done"}
            maxLength={maxLength}
            onEndEditing={onEndEditing}
          />
          <View style={styles.imageContainer}>
            <ExpoFastImage
              resizeMode={"contain"}
              source={{ uri: rightIconPath }}
              style={styles.rightImg}
            />
            <Text style={[styles.currencyTextStyle, short_nameTextStyle]}>
              {short_name}
            </Text>
            {!btnDisabled ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (onPressInfoIcon) onPressInfoIcon();
                }}
              >
                <ExpoFastImage
                  resizeMode={"contain"}
                  source={rightIcon ? rightIcon : icons.downGray}
                  style={
                    styleOfRightIcon ? styleOfRightIcon : styles.dropDownImage
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (onPress) onPress();
          }}
          disabled={btnDisabled}
          activeOpacity={0.8}
          style={[styles.container]}
        >
          <LinearGradient
            style={styles.circleGradient}
            useAngle={true}
            angle={angle ? angle : gradientColorAngle}
            colors={colorArray}
          >
            {leftIconPath !== undefined ? (
              <ExpoFastImage
                resizeMode={"contain"}
                source={leftIconPath}
                style={styles.leftImg}
              />
            ) : null}

            {/* <Text
      style={[
        styles.inputStyle,
        {
          color: buttonTextcolor,
          textTransform: textType === undefined ? 'uppercase' : textType,
          fontSize: textSize === undefined ? moderateScale(22) : textSize,
        },
      ]}>
      {buttonText}
    </Text> */}
            <TextInput
              editable={editable}
              style={[styles.inputStyle, { ...props.textStyle }]}
              placeholder={"0"}
              placeholderTextColor={colors.placeholderColor}
              value={textValue}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitText}
              keyboardType={keyboardType}
              returnKeyType={"done"}
              maxLength={maxLength}
              onEndEditing={onEndEditing}
            />
            <View style={styles.imageContainer}>
              <ExpoFastImage
                resizeMode={"contain"}
                source={{ uri: rightIconPath }}
                style={styles.rightImg}
              />
              <Text style={[styles.currencyTextStyle, short_nameTextStyle]}>
                {short_name}
              </Text>
              {!btnDisabled ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (onPressInfoIcon) onPressInfoIcon();
                  }}
                >
                  <ExpoFastImage
                    resizeMode={"contain"}
                    source={rightIcon ? rightIcon : icons.downGray}
                    style={
                      styleOfRightIcon ? styleOfRightIcon : styles.dropDownImage
                    }
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {isShowError ? <Text style={styles.errStyle}>{errMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    fontSize: moderateScale(22),
    fontFamily: Fonts.type.Inter_Bold,
    textTransform: "uppercase",
    color: colors.white,
    textAlign: "left",
    paddingHorizontal: horizontalScale(10),
    flex: 1,
    marginVertical: verticalScale(10),
    height: "100%",
    paddingVertical: 0,
  },
  circleGradient: {
    height: "100%",
    width: "100%",
    borderRadius: verticalScale(8),
    alignItems: "center",
    flexDirection: "row",
  },
  currencyTextStyle: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.Inter_Medium,
    textTransform: "uppercase",
    textAlign: "left",
    color: colors.white,
  },
  leftImg: {
    height: 25,
    width: 25,
    marginRight: verticalScale(20),
  },
  rightImg: {
    height: 25,
    width: 25,
    marginRight: verticalScale(10),
  },
  dropDownImage: {
    height: 4.39,
    width: 7.45,
    marginLeft: verticalScale(10),
  },
  imageContainer: {
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  errStyle: {
    color: colors.red,
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.Inter_Regular,
    paddingTop: 5,
  },
});

export default ButtonGradientWithRightIcon;
