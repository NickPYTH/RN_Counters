import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {Modal, StyleSheet, TextInput, TouchableHighlight, View} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateCounter } from "../../store/actions";
import { THEME } from "../../theme";
import { AppButton } from "../UI/AppButton";
import { AppTextinput } from "../UI/AppTextInput";
import { AppTextRegular } from "../UI/AppTextRegular";
import Toast from "react-native-root-toast";
import {openDatabase} from "expo-sqlite";

const App = ({ setVisible, fadeIn, updateCounter, counter, flats}) => {

  const [value, setValue] = useState(counter.rate.toString());
    const saveChanges = () => {
        if (value.trim().length === 0){
            Toast.show('Показание должно минимум 1 цифру')
        }
        else{
            const db = openDatabase("db");
            db.transaction((tx) => {
                if (counter.counterType === 'hot')
                    tx.executeSql(
                        "update counters set rate = ? where flatName = ? and counterType = ?",
                        [value, counter.flatName, 'water'],
                        () =>{updateCounter(counter, value)},
                        () => {}
                    );
                else
                    tx.executeSql(
                        "update counters set secondRate = ? where flatName = ? and counterType = ?",
                        [value, counter.flatName, 'water'],
                        () =>{updateCounter(counter, value)},
                        () => {
                        }
                    );
            });

            setVisible(false);
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
                  }}
                  value="Параметры счётчика"
                />
                <TouchableHighlight
                  underlayColor={"transparent"}
                  onPress={() => {
                    setVisible(false);
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
            <View style={{ height: 125, width: "100%" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                  <AppTextRegular
                    styles={{
                      color: THEME.DARK_COLOR,
                      fontSize: 18,
                      fontWeight: "400",
                    }}
                    value="Стоимость за куб/м"
                  />

                  <TextInput value={value}
                             onChangeText={(text) => {
                                 setValue(text);
                             }}
                             placeholder={value.toString()}
                             keyboardType='number-pad'
                             style={{borderColor: THEME.MAIN_COLOR, borderBottomWidth: 1, width: 100, fontSize: 18}}/>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <AppButton
                  title="Сохранить"
                  onPress={() => saveChanges()}
                  buttonStyles={{
                    color: THEME.LIGHT_COLOR,
                    fontSize: 16,
                  }}
                  styles={{ width: 100 }}
                />
              </View>
            </View>
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
        updateCounter
    },
    dispatch
  );

export const WaterCounterSettingsModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 113,
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
});
