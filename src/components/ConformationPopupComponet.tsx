import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInputProps,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import icons from "../assets/icon";
import Strings from "../constants/strings";
import { Fonts, moderateScale, verticalScale } from "../theme";
import colors from "../theme/colors";
import { defaultTheme } from "../theme/defaultTheme";
import { gradientColorAngle } from "../theme/metrics";
import ButtonGradient from "./ButtonGradient";

interface Props extends TextInputProps {
  isVisible: boolean;
  popupTitle?: string;
  buttonOkTitle?: string;
  onPressOk?: () => void;
  onPressCancel?: () => void;
  isShowSecondButton: boolean;
	onPressSecondButton?: () => void;
}

const ConformationPopupComponet: React.FC<Props> = (props) => {
  const {
    popupTitle,
    buttonOkTitle,
    onPressOk,
    onPressCancel,
    isVisible,
    style,
    isShowSecondButton,
		onPressSecondButton
  } = props;


	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View style={styles.bgView}>
				<TouchableOpacity activeOpacity={1} onPress={onPressCancel}>
					<View style={styles.centeredView}>
						<View style={styles.viewDetails}>
							<Text style={[styles.titleStyle, {...style}]}>{popupTitle}</Text>
							<ButtonGradient
								onPress={onPressOk}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={buttonOkTitle}
								style={styles.loginButtonSocial}
							/>
							{/* <ButtonGradient
            onPress={() => {
              // handleSubmit();
            }}
            colorArray={defaultTheme.ternaryGradientColor}
            angle={gradientColorAngle}
            buttonTextcolor={colors.white}
            buttonText={Strings.loginwithapple}
            style={styles.loginButtonSocial}
          /> */}
							{isShowSecondButton && (
								<ButtonGradient
									onPress={onPressSecondButton}
									colorArray={defaultTheme.ternaryGradientColor}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									buttonText={Strings.short_video}
									style={styles.loginButtonSocial}
								/>
							)}
						</View>
					</View>
				</TouchableOpacity>
			</View>
			{/* </TouchableOpacity> */}
		</Modal>
	);
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: verticalScale(30),
  },
  bgView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  viewDetails: {
    backgroundColor: defaultTheme.backGroundColor,
    borderRadius: verticalScale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(20),
    width: Dimensions.get("screen").width * 0.88,
  },
  titleStyle: {
    color: colors.white,
    fontSize: moderateScale(18),
    fontFamily: Fonts.type.Krona_Regular,
    textAlign: "center",
    paddingVertical: verticalScale(8),
  },

  loginButtonSocial: {
    width: "80%",
    marginTop: verticalScale(16),
  },
});

export default ConformationPopupComponet;
