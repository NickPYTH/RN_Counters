import React, { useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { WaterCounterSettingsModal } from "../components/modals/WaterCounterSettingsModal";
import { AppButton } from "../components/UI/AppButton";
import { AppTextRegular } from "../components/UI/AppTextRegular";
import { addCounterRecord } from "../store/actions";
import { THEME } from "../theme";

export const WaterCounter = ({ navigation, flats, addCounterRecord }) => {
  const flatName = navigation.getParam("flatName", "");
  const hotWaterRecords = flats.countersRecords.filter(record=>record.counterType === 'hot' && record.flatName === flatName);
  const coldWaterRecords = flats.countersRecords.filter(record=>record.counterType === 'cold' && record.flatName === flatName);
  const [visibleModal, setVisibleModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const zipIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  const zipOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
    }).start();
  };
  const [waterType, setWaterType] = useState("hot");
  const counters = flats.countersRecords;
  let hotRecords = [];
  let coldRecords = [];
  let hotRecordsCounter = 0;
  let coldRecordsCounter = 0;
  counters.map((record) => {
    if (record.counterType === "cold") {
      coldRecords.push(record);
    } else if (record.counterType === "hot") {
      hotRecords.push(record);
    }
  });

  const modalFadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(modalFadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 1000,
    }).start();
  };

  return (
    <ScrollView>
      <Animated.View
        style={{
          ...styles.wrapperWaterZone,
          ...(waterType === "hot"
            ? { borderColor: THEME.DANGER_COLOR }
            : { borderColor: THEME.BLUE_COLOR }),
          transform: [{ scaleX: fadeAnim }],
        }}
      >
        <View style={{ height: 70 }}>
          <View style={styles.headerWaterZone}>
            <AppTextRegular
              value={waterType === "hot" ? "Горячая вода" : "Холодная вода"}
              styles={{
                fontSize: 20,
                ...(waterType === "hot"
                  ? { color: THEME.DANGER_COLOR }
                  : { color: THEME.BLUE_COLOR }),
              }}
            />
            <AppButton
              type="main"
              title=""
              iconName="add"
              styles={{
                width: 55,
                height: 50,
                ...(waterType === "hot"
                  ? { backgroundColor: THEME.DANGER_COLOR }
                  : { backgroundColor: THEME.BLUE_COLOR }),
                margin: 5,
              }}
              onPress={() => {
                navigation.navigate("AddRecord", {
                  navigation: navigation,
                  flatName,
                  waterType,
                });
              }}
            />
          </View>
        </View>
        {(hotWaterRecords.length === 0 && waterType === 'hot') || (coldWaterRecords.length === 0 && waterType === 'cold') ? (
            <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  justifyContent: "center",
                }}
            >
              {waterType === "hot" ? (
                  <Image source={require("../../assets/plumberingHot.png")} />
              ) : (
                  <Image source={require("../../assets/plumberingCold.png")} />
              )}
            </View>
        ): (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  paddingLeft: 5,
                  borderWidth: 1,
                  ...(waterType === "hot"
                      ? { borderTopColor: THEME.DANGER_COLOR }
                      : { borderTopColor: THEME.BLUE_COLOR }),
                  borderBottomColor: THEME.LIGHT_COLOR,
                  borderLeftColor: THEME.LIGHT_COLOR,
                  borderRightColor: THEME.LIGHT_COLOR,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderRadius: 15,
                }}
            >
              <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                  }}
              >
                <AppTextRegular value="Показания" />
                <AppTextRegular value="Расход" />
                <AppTextRegular value="Стоимость" />
                <AppTextRegular value="Дата поверки" />
              </View>
              {waterType === "hot"
                  ? hotRecords.map((record) => {
                    hotRecordsCounter += 1;
                    if (
                        record.counterType === waterType &&
                        record.flatName === flatName
                    ) {
                      return (
                          <View style={{ height: 30 }}>
                            <View
                                style={{
                                  paddingHorizontal: 10,
                                  flex: 1,
                                  justifyContent: "space-between",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                            >
                              <View style={{ width: 66 }}>
                                <AppTextRegular
                                    value={record.value}
                                    styles={{
                                      color:
                                          waterType === "hot"
                                              ? THEME.DANGER_COLOR
                                              : THEME.BLUE_COLOR,
                                      fontSize: 18,
                                    }}
                                />
                              </View>
                              <View style={{ width: 40 }}>
                                <AppTextRegular
                                    value={
                                      hotRecordsCounter === 1
                                          ? "0_o"
                                          : record.value -
                                          hotRecords[hotRecordsCounter - 2].value
                                    }
                                />
                              </View>
                              <View style={{ width: 50 }}>
                                <AppTextRegular value={1000} />
                              </View>

                              <AppTextRegular value={record.recordDate} />
                            </View>
                          </View>
                      );
                    }
                  })
                  : coldRecords.map((record) => {
                    coldRecordsCounter += 1;
                    if (
                        record.counterType === waterType &&
                        record.flatName === flatName
                    ) {
                      return (
                          <View style={{ height: 30 }}>
                            <View
                                style={{
                                  paddingHorizontal: 10,
                                  flex: 1,
                                  justifyContent: "space-between",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                            >
                              <View style={{ width: 66 }}>
                                <AppTextRegular
                                    value={record.value}
                                    styles={{
                                      color:
                                          waterType === "hot"
                                              ? THEME.DANGER_COLOR
                                              : THEME.BLUE_COLOR,
                                      fontSize: 18,
                                    }}
                                />
                              </View>
                              <View style={{ width: 40 }}>
                                <AppTextRegular
                                    value={
                                      coldRecordsCounter === 1 ? (
                                          <AppTextRegular value="0_o" />
                                      ) : (
                                          record.value -
                                          coldRecords[coldRecordsCounter - 2].value
                                      )
                                    }
                                />
                              </View>
                              <View style={{ width: 50 }}>
                                <AppTextRegular value={1000} />
                              </View>
                              <AppTextRegular value={record.recordDate} />
                            </View>
                          </View>
                      );
                    }
                  })}
            </ScrollView>

        )}
      </Animated.View>
      <View style={styles.settingsWrapper}>
        <AppButton
          type="main"
          title="Параметры счётчика"
          iconName="settings"
          styles={{
            width: 220,
            height: 50,
            ...(waterType === "hot"
              ? { backgroundColor: THEME.DANGER_COLOR }
              : { backgroundColor: THEME.BLUE_COLOR }),
            margin: 5,
          }}
          buttonStyles={{
            fontSize: 18,
            color: THEME.LIGHT_COLOR,
            marginLeft: 5,
            marginRight: 5,
          }}
          onPress={() => {
            setVisibleModal(true);
          }}
        />
        <AppButton
          type="main"
          title={waterType === "hot" ? "Холодная вода" : "Горячая вода"}
          iconName="swap-horiz"
          styles={{
            width: 220,
            height: 50,
            ...(waterType === "hot"
              ? { backgroundColor: THEME.BLUE_COLOR }
              : { backgroundColor: THEME.DANGER_COLOR }),
            margin: 5,
          }}
          buttonStyles={{
            fontSize: 18,
            color: THEME.LIGHT_COLOR,
            marginLeft: 5,
            marginRight: 5,
          }}
          onPress={() => {
            zipIn();
            setTimeout(() => {
              zipOut();
              setWaterType((prev) =>
                prev === "hot" ? setWaterType("cold") : setWaterType("hot")
              );
            }, 300);
          }}
        />
      </View>
      {visibleModal ? (
        <WaterCounterSettingsModal
          setVisible={setVisibleModal}
          fadeIn={fadeIn}
        />
      ) : (
        <View/>
      )}
    </ScrollView>
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

export const WaterScreenCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaterCounter);

const styles = StyleSheet.create({
  wrapperWaterZone: {
    height: 500,
    margin: 15,
    borderColor: THEME.DANGER_COLOR,
    borderWidth: 1,
    borderRadius: 15,
  },
  headerWaterZone: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  settingsWrapper: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 0,
  },
});
