import React, { createRef, useRef, useState } from "react";
import { View, StyleSheet, TextInputProps, Text } from "react-native";
import Strings from "../constants/strings";
import { Fonts, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";
import { width } from "../theme/metrics";
import InputComponent from "./InputComponent";

interface Props extends TextInputProps {
  setAns1: (ans: string) => void;
  setAns2: (ans: string) => void;
  ansValue1?: string;
  ansValue2?: string;
  isSameOption?: boolean;
}

const SetAnsOptionView: React.FC<Props> = (props) => {
  const { setAns1, setAns2, ansValue1, ansValue2, isSameOption } = props;
  const textInputRef = createRef();

  return (
    <View style={styles.viewDetails}>
      <Text style={styles.titleStyle}>{Strings.set_the_options}</Text>
      <View style={styles.viewOption}>
        <Text style={styles.optionStyle}>{"1."}</Text>
        <InputComponent
          multiline
          blurOnSubmit
          style={styles.marginInput}
          onChangeText={(text: string) => {
            setAns1(text);
          }}
          textValue={ansValue1}
          returnType={"next"}
          onBlur={() => textInputRef.current.focus()}
        />
      </View>
      <View style={styles.viewOption}>
        <Text style={styles.optionStyle}>{"2."}</Text>
        <InputComponent
          multiline
          blurOnSubmit
          ref={textInputRef}
          style={styles.marginInput}
          onChangeText={(text: string) => {
            setAns2(text);
          }}
          textValue={ansValue2}
        />
      </View>
      {isSameOption && (
        <Text style={styles.errorStyle}>
          {Strings.options_should_be_not_same}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewDetails: {
    flexDirection: "column",
    borderRadius: verticalScale(10),
    backgroundColor: colors.black,
    paddingHorizontal: verticalScale(16),
  },
  viewOption: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: verticalScale(10),
  },
  titleStyle: {
    fontSize: moderateScale(18),
    color: colors.white,
    fontFamily: Fonts.type.Krona_Regular,
    marginVertical: verticalScale(24),
    textAlign: "center",
  },
  errorStyle: {
    fontSize: moderateScale(12),
    color: colors.red,
    fontFamily: Fonts.type.Inter_Medium,
    marginBottom: verticalScale(16),
    textAlign: "center",
  },
  optionStyle: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: Fonts.type.Krona_Regular,
    marginRight: verticalScale(8),
    top: -8,
  },

  marginInput: {
    marginBottom: verticalScale(20),
  },
});

export default SetAnsOptionView;
