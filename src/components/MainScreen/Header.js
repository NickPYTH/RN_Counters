import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { THEME } from "../../theme";
import { AppTextRegular } from "../UI/AppTextRegular";

export const Header = () => {
  return (
    <View style={styles.header}>
      <AppTextRegular
        styles={{ color: THEME.MAIN_COLOR, fontSize: 18 }}
        value="Мои квартиры"
      />
      <Image
        source={require("../../../assets/rollingStone.png")}
        style={{ width: 30, height: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
});
