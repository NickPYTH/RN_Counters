import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { THEME } from "../../theme";

export const AppTextinput = (props) => {
  const [value, setValue] = React.useState("");
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={{ ...styles.input, ...props.styles }}
        placeholder={props.placeholder}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          props.onChange(text);
        }}
      />
    </View>
  );
};

styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    width: "100%",
  },
  input: {
    fontSize: 18,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
  },
});
