import { Camera } from "expo-camera";
import { openDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppButton } from "../components/UI/AppButton";
import { AppTextRegular } from "../components/UI/AppTextRegular";
import { addCounterRecord } from "../store/actions";
import { THEME } from "../theme";

const screen = ({ navigation, addCounterRecord }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [light, setLight] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const [record, setRecord] = useState("");
  function addHandler() {
    if (record.trim().length === 5) {
      const flatName = navigation.getParam("flatName", "");
      const waterType = navigation.getParam("waterType", "");
      addCounterRecord({
        flatName,
        counterType: "water",
        waterType,
        value: record,
      });
      let day = new Date().getDay().toString();
      let month = (Number(new Date().getMonth().toString()) + 1).toString();
      let year = new Date().getFullYear().toString();
      if (Number(day) < 10) {
        day = "0" + day;
      }
      if (Number(month) < 10) {
        month = "0" + month;
      }
      const db = openDatabase("db");
      db.transaction((tx) => {
        tx.executeSql(
          "insert into countersRecords (flatName, counterType, value, recordDate) values (?, ?, ?, ?)",
          [flatName, waterType, record, day + "-" + month + "-" + year],
          () => {},
          () => {
            console.log("flat inserted error");
          }
        );
      });
      navigation.pop();
    } else {
      Toast.show("Показание должно содержать 5 цифр", {
        duration: Toast.durations.LONG,
      });
    }
  }
  return (
    <View style={{ height: 200 }}>
      <View style={styles.container}></View>
      <View style={styles.wrapper}>
        <AppTextRegular
          value="Введите показание счётчика"
          styles={{ fontSize: 20, color: THEME.MAIN_COLOR }}
        />
        <TextInput
          placeholder="Клик сюда!"
          style={styles.input}
          keyboardType="numeric"
          value={record}
          onChangeText={(val) => {
            setRecord(val);
          }}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <AppButton
          type="main"
          title="Фонарик"
          iconName="bolt"
          styles={{
            width: 200,
            height: 50,
            marginBottom: 15,
          }}
          buttonStyles={{
            fontSize: 18,
            color: THEME.LIGHT_COLOR,
            marginLeft: 5,
            marginRight: 5,
          }}
          onPress={() => {
            setLight((prev) => !prev);
          }}
        />
        <AppButton
          type="main"
          title="Добавить"
          iconName="add"
          styles={{
            width: 200,
            height: 50,
          }}
          buttonStyles={{
            fontSize: 18,
            color: THEME.LIGHT_COLOR,
            marginLeft: 5,
            marginRight: 5,
          }}
          onPress={() => {
            addHandler();
          }}
        />
        {light ? (
          <Camera style={{ opacity: 0 }} type={type} flashMode="torch">
            <AppTextRegular value=" " />
          </Camera>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { flats } = state;
  return { flats };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCounterRecord,
    },
    dispatch
  );

export const AddRecordScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(screen);

const styles = StyleSheet.create({
  input: {
    margin: 15,
    fontSize: 18,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "60%",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  buttonsWrapper: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
