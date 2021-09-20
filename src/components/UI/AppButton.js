import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";

export const AppButton = (props) => {
  let backColor = THEME.MAIN_COLOR;
  if (props.type === "main") {
    backColor = THEME.MAIN_COLOR;
  } else if (props.type === "warning") {
    backColor = THEME.WARNING_COLOR;
  } else if (props.type === "danger") {
    backColor = THEME.DANGER_COLOR;
  }
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.9}>
      <View
        style={{
          ...styles.wrapperCenter,
          backgroundColor: backColor,
          ...props.styles,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.iconName ? (
            <MaterialIcons
              name={props.iconName}
              size={25}
              color={THEME.LIGHT_COLOR}
            />
          ) : (
            <View />
          )}
          {props.title.trim().length > 0 ? (
            <Text style={{ ...props.buttonStyles }}>{props.title}</Text>
          ) : (
            <View />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapperCenter: {
    borderRadius: 9,
    height: 45,
    width: 80,
  },
  textColor: {
    color: THEME.LIGHT_COLOR,
    fontSize: 16,
  },
});
