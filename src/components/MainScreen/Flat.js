import { MaterialIcons } from "@expo/vector-icons";
import { openDatabase } from "expo-sqlite";
import React from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { THEME } from "../../theme";
import { AppTextRegular } from "../UI/AppTextRegular";

export const Flat = ({ title, description, id, removeFlat, navigation }) => {
  const removeFlatHandler = (id, title) => {
    const db = openDatabase("db");
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM flats WHERE title = ?",
        [title],
        () => {},
        () => {}
      );
    });
    removeFlat(id);
  };

  return (
    <View style={styles.card}>
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate("Flat", {
            flatInfo: { id, title, description },
          })
        }
        background={TouchableNativeFeedback.Ripple(
          THEME.LIGHT_PURPLE,
          false,
          300
        )}
      >
        <View style={styles.wrapper}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <AppTextRegular
              value={title}
              styles={{
                color: THEME.MAIN_COLOR,
                fontSize: 18,
                marginBottom: 5,
              }}
            />
            <AppTextRegular
              value={description}
              styles={{ color: THEME.MAIN_COLOR, fontSize: 16, opacity: 0.6 }}
            />
          </View>
          <TouchableOpacity onPress={() => removeFlatHandler(id, title)}>
            <MaterialIcons name="close" size={24} color={THEME.DANGER_COLOR} />
          </TouchableOpacity>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "red",
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    height: 95,
    marginBottom: 10,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
    backgroundColor: THEME.LIGHT_COLOR,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 5,
  },
});
