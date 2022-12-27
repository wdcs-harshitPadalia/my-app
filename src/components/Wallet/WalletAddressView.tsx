/* eslint-disable react-native/no-inline-styles */
import { Alert, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import ExpoFastImage from "expo-fast-image";

import { horizontalScale, verticalScale } from "../../theme";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import icons from "../../assets/icon";
import Strings from "../../constants/strings";
import { defaultTheme } from "../../theme/defaultTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
// import Clipboard from "@react-native-clipboard/clipboard";
import * as Clipboard from "expo-clipboard";
interface WalletAddressProps {
  style: ViewStyle;
  address: string;
  isHideTitle?: boolean;
  handleShowQrCodeModal?: () => void;
}

export default function WalletAddressView(props: WalletAddressProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.black,
          marginTop: verticalScale(20),
          marginHorizontal: horizontalScale(20),
          padding: 20,
        },
        { ...props.style },
      ]}
    >
      {!props.isHideTitle && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: verticalScale(30),
          }}
        >
          <Text
            style={{
              color: colors.white,
              // padding: 10,
              textAlign: "center",
              fontSize: 18,
              fontFamily: fonts.type.Krona_Regular,
              marginLeft: horizontalScale(12),
            }}
          >
            {Strings.Your_wallet_address}
          </Text>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={props.handleShowQrCodeModal}
            style={{ padding: 2 }}
          >
            <ExpoFastImage
              style={styles.qrCodeLogoStyle}
              source={icons.ic_qr_code_scanner}
            />
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          backgroundColor: defaultTheme.backGroundColor,
          borderRadius: 8,
          flexDirection: "row",
          //   justifyContent: "center",
          alignItems: "center",
          padding: 12,
          marginTop: horizontalScale(10),
        }}
      >
        <Text
          style={{
            color: colors.white,
            //padding: 10,
            textAlign: "center",
            flex: 1,
            fontSize: 14,
            fontFamily: fonts.type.Inter_Bold,
            marginLeft: horizontalScale(12),
          }}
          numberOfLines={2}
        >
          {props.address}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={async () => {
            await Clipboard.setStringAsync(props.address);
            alert(Strings.copy_wallet_add_desc);
          }}
        >
          <ExpoFastImage style={styles.imageStyle} source={icons.clipboard} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 15,
    width: 13,
    marginLeft: horizontalScale(12),
  },
  qrCodeLogoStyle: {
    height: 20,
    width: 20,
  },
});
