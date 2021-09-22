import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableHighlight, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCounter, addFlat } from "../../store/actions";
import { THEME } from "../../theme";
import { AppButton } from "../UI/AppButton";
import { AppTextinput } from "../UI/AppTextInput";
import { AppTextRegular } from "../UI/AppTextRegular";

const App = ({ setVisible, fadeIn, addFlat, addCounter }) => {
  const [counterRate, setCounterRate] = useState("100");
  const saveChanges = () => {
    console.log("saved");
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
                    //borderColor: THEME.BLUE_COLOR,
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
                  alignItems: "flex-start",
                }}
              >
                <View style={{ margin: 15 }}>
                  <AppTextRegular
                    styles={{
                      color: THEME.DARK_COLOR,
                      fontSize: 18,
                      fontWeight: "400",
                    }}
                    value="Стоимость за куб/м"
                  />
                </View>

                <AppTextinput
                  styles={{ width: 100, margin: 0 }}
                  onChange={() => {}}
                  placeholder={counterRate}
                />
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
      addFlat,
      addCounter,
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
