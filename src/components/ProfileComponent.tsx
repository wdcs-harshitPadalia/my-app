import React from "react";
import { View, StyleSheet, TextInputProps } from "react-native";
import DropShadow from "react-native-drop-shadow";
// import { BoxShadow } from 'expo-react-native-shadow'
import ExpoFastImage from "expo-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../assets/icon";
import { getLevelRank } from "../constants/utils/Function";
import { verticalScale } from "../theme";
import colors from "../theme/colors";
import { defaultTheme } from "../theme/defaultTheme";
import { borderGradientColorAngle, gradientColorAngle } from "../theme/metrics";

// import configStyle from '../config/Variable';
// import {TextRobotoRegular} from './TextComponent';

interface Props extends TextInputProps {
  profileImgPath?: string;
  levelRank?: number;
}

const ProfileComponent: React.FC<Props> = (props) => {
  const { profileImgPath, levelRank } = props;

  return (
    <View style={styles.container}>
      <DropShadow style={styles.profileContainer}>
        <LinearGradient
          style={styles.circleGradient}
          useAngle={true}
          angle={borderGradientColorAngle}
          colors={defaultTheme.boarderGradientColor}
        >
          <View style={styles.viewImageStyle}>
            <ExpoFastImage
              style={styles.imgIconStyle}
              resizeMode="cover"
              source={{ uri: profileImgPath }}
            />
          </View>
        </LinearGradient>
        <ExpoFastImage
          style={styles.viewBadgeStyle}
          resizeMode="cover"
          source={getLevelRank(levelRank)?.image}
        />
      </DropShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // shadowRadius: 18,
    alignItems: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(16),
  },
  viewImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "rgba(0,0, 0, 0.3)",
    borderWidth: 5,
    margin: 5,
  },
  imgIconStyle: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  viewBadgeStyle: {
    width: 50,
    height: 50,
    right: -10,
    position: "absolute",
  },
  circleGradient: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  profileContainer: {
    shadowColor: colors.greenLight,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.8,
    elevation: 3,
    shadowRadius: 10,
	borderRadius: 55,
  },
});

export default ProfileComponent;
