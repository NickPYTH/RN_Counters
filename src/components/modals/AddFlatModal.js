import { MaterialIcons } from "@expo/vector-icons";
import { openDatabase } from "expo-sqlite";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ToggleSwitch from "toggle-switch-react-native";
import { addCounter, addFlat } from "../../store/actions";
import { THEME } from "../../theme";
import { AppTextinput } from "../UI/AppTextInput";
import { AppTextRegular } from "../UI/AppTextRegular";

const App = ({ setVisible, fadeIn, addFlat, addCounter }) => {
  [electricCounter, setElectricCounter] = useState(false);
  [gasCounter, setGasCounter] = useState(false);
  [waterCounter, setWaterCounter] = useState(false);
  [thermalCounter, setThermalCounter] = useState(false);
  [flatName, setFlatName] = useState("");
  [flatDesc, setFlatDesc] = useState("");
  [flatNameColor, setFlatNameColor] = useState(THEME.MAIN_COLOR);
  [flatDescriptionColor, setFlatDescriptionColor] = useState(THEME.MAIN_COLOR);

  const checkFields = (flatName, flatDesc) => {
    let isError = false;
    if (!flatName.trim()) {
      setFlatNameColor(THEME.DANGER_COLOR);
      isError = true;
      Toast.show("Поле с названием места необходимо заполнить", {
        duration: Toast.durations.LONG,
      });
    } else {
      setFlatNameColor(THEME.MAIN_COLOR);
    }
    if (!flatDesc.trim()) {
      setFlatDescriptionColor(THEME.DANGER_COLOR);
      isError = true;
      Toast.show("Поле с описанием места необходимо заполнить", {
        duration: Toast.durations.LONG,
      });
    } else {
      setFlatDescriptionColor(THEME.MAIN_COLOR);
    }

    if (!(waterCounter || gasCounter || electricCounter)) {
      isError = true;
      Toast.show("Необходимо выбрать хотябы один счётчик", {
        duration: Toast.durations.LONG,
      });
    }

    if (!isError) {
      const db = openDatabase("db");
      db.transaction((tx) => {
        tx.executeSql(
          "insert into flats (title, description) values (?, ?)",
          [flatName, flatDesc],
          () => {},
          () => {
            console.log("flat inserted error");
          }
        );
        if (waterCounter) {
          tx.executeSql(
            "insert into counters (flatName, counterType, rate) values (?, ?, ?)",
            [flatName, "water", 10],
            () => {},
            () => {
              console.log("counter inserted error");
            }
          );
          addCounter({ flatName, counterType: "water" });
        }
        if (electricCounter) {
          tx.executeSql(
            "insert into counters (flatName, counterType, rate) values (?, ?, ?)",
            [flatName, "electro", 10],
            () => {},
            () => {
              console.log("counter inserted error");
            }
          );
          addCounter({ flatName, counterType: "electro" });
        }
        if (gasCounter) {
          tx.executeSql(
            "insert into counters (flatName, counterType, rate) values (?, ?, ?)",
            [flatName, "gas", 10],
            () => {},
            () => {
              console.log("counter inserted error");
            }
          );
          addCounter({ flatName, counterType: "gas" });
        }
        if (thermalCounter) {
          tx.executeSql(
            "insert into counters (flatName, counterType, rate) values (?, ?, ?)",
            [flatName, "thermal", 10],
            () => {},
            () => {
              console.log("counter inserted error");
            }
          );
          addCounter({ flatName, counterType: "thermal" });
        }
      });

      addFlat({ flatName, flatDesc });
      setVisible(false);
      fadeIn();
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
          if (fadeIn !== undefined) fadeIn();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: "100%", height: 50 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AppTextRegular
                  styles={{
                    color: THEME.DARK_COLOR,
                    fontSize: 20,
                    fontWeight: "400",
                    borderColor: flatNameColor,
                  }}
                  value="Добавление квартиры"
                />
                <TouchableHighlight
                  underlayColor={"transparent"}
                  onPress={() => {
                    setVisible((prev) => !prev);
                    if (fadeIn !== undefined) fadeIn();
                  }}
                >
                  <MaterialIcons
                    name="close"
                    size={30}
                    color={THEME.DANGER_COLOR}
                  />
                </TouchableHighlight>
              </View>
            </View>

            <AppTextinput
              placeholder="Название или адрес квартиры"
              onChange={setFlatName}
              styles={{ borderBottomColor: flatNameColor }}
            />

            <AppTextinput
              placeholder="Описание"
              onChange={setFlatDesc}
              styles={{ borderBottomColor: flatDescriptionColor }}
            />

            <View style={{ height: 40, width: "100%", margin: 5 }}>
              <View style={styles.countersToggles}>
                <Image
                  source={require("../../../assets/danger.png")}
                  style={{ width: 30, height: 30 }}
                />
                <AppTextRegular
                  styles={{
                    color: THEME.DARK_COLOR,
                    fontSize: 20,
                    borderColor: flatNameColor,
                  }}
                  value="Электричество"
                />
                <ToggleSwitch
                  isOn={electricCounter}
                  onColor="green"
                  offColor={THEME.LIGHT_PURPLE}
                  onColor={THEME.MAIN_COLOR}
                  size="large"
                  onToggle={() => setElectricCounter((prev) => !prev)}
                />
              </View>
            </View>
            <View style={{ height: 40, width: "100%", margin: 5 }}>
              <View style={styles.countersToggles}>
                <Image
                  source={require("../../../assets/drop.png")}
                  style={{ width: 30, height: 30 }}
                />
                <AppTextRegular
                  styles={{
                    color: THEME.DARK_COLOR,
                    fontSize: 20,
                    borderColor: flatNameColor,
                  }}
                  value="Вода"
                />
                <ToggleSwitch
                  isOn={waterCounter}
                  onColor="green"
                  offColor={THEME.LIGHT_PURPLE}
                  onColor={THEME.MAIN_COLOR}
                  size="large"
                  onToggle={() => setWaterCounter((prev) => !prev)}
                />
              </View>
            </View>

            <View style={{ height: 40, width: "100%", margin: 5 }}>
              <View style={styles.countersToggles}>
                <Image
                  source={require("../../../assets/gas.png")}
                  style={{ width: 30, height: 30 }}
                />
                <AppTextRegular
                  styles={{
                    color: THEME.DARK_COLOR,
                    fontSize: 20,
                    borderColor: flatNameColor,
                  }}
                  value="Газ"
                />
                <ToggleSwitch
                  isOn={gasCounter}
                  onColor="green"
                  offColor={THEME.LIGHT_PURPLE}
                  onColor={THEME.MAIN_COLOR}
                  size="large"
                  onToggle={() => setGasCounter((prev) => !prev)}
                />
              </View>
            </View>

            <View style={{ height: 40, width: "100%", margin: 5 }}>
              <View style={styles.countersToggles}>
                <Image
                  source={require("../../../assets/thermometer.png")}
                  style={{ width: 30, height: 30 }}
                />
                <AppTextRegular
                  styles={{
                    color: THEME.DARK_COLOR,
                    fontSize: 20,
                    borderColor: flatNameColor,
                  }}
                  value="Отопление"
                />
                <ToggleSwitch
                  isOn={thermalCounter}
                  onColor="green"
                  offColor={THEME.LIGHT_PURPLE}
                  onColor={THEME.MAIN_COLOR}
                  size="large"
                  onToggle={() => setThermalCounter((prev) => !prev)}
                />
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                ...styles.openButton,
                backgroundColor: THEME.MAIN_COLOR,
              }}
              onPress={() => {
                checkFields(flatName, flatDesc);
              }}
            >
              <Text style={styles.textStyle}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      addFlat,
      addCounter,
    },
    dispatch
  );

export const AddFlatModal = connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 35,
    paddingBottom: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginTop: 10,
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  exitButton: {
    height: 50,
    justifyContent: "flex-start",
    backgroundColor: "red",
  },
  countersToggles: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subCountersToggles: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputCounterRate: {
    width: "30%",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    fontSize: 18,
  },
});
