import React from "react";
import { Text } from "react-native";
// import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from "expo-linear-gradient";

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
}

const GradientText = ({ colors, ...rest }: GradientTextProps) => {
  return <Text {...rest} style={[rest.style]} />;
};

export default GradientText;
