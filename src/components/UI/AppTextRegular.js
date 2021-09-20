import React from "react";
import { Text, StyleSheet } from "react-native";

export const AppTextRegular = (props) => {
  return <Text style={{ ...props.styles }}>{props.value}</Text>;
};
