import { openDatabase } from "expo-sqlite";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppTextRegular } from "../components/UI/AppTextRegular";
import { addCounter } from "../store/actions";
import { THEME } from "../theme";

export const FlatScreenComponent = ({ navigation, flats, addCounter }) => {
  [electricCounter, setElectricCounter] = useState(false);
  [gasCounter, setGasCounter] = useState(false);
  [waterCounter, setWaterCounter] = useState(false);
  [thermalCounter, setThermalCounter] = useState(false);
  const flatInfo = navigation.state.params.flatInfo;
  const db = openDatabase("db");
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from counters where flatName=?",
        [flatInfo.title],
        (_, { rows }) => {
          rows._array.map((counter) => {
            if (counter.counterType === "water") {
              setWaterCounter(true);
            }
            if (counter.counterType === "electro") setElectricCounter(true);
            if (counter.counterType === "gas") setGasCounter(true);
            if (counter.counterType === "thermal") setThermalCounter(true);
          });
        }
      );
    },
    () => {},
    (t, error) => {}
  );
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <AppTextRegular
          value={flatInfo.title}
          styles={{ fontSize: 20, color: THEME.MAIN_COLOR, marginBottom: 10 }}
        />
        <AppTextRegular
          value={flatInfo.description}
          styles={{ fontSize: 18, color: THEME.MAIN_COLOR, opacity: 0.6 }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyTitle}>
          <AppTextRegular
            value="Счётчики"
            styles={{ fontSize: 24, color: THEME.LIGHT_COLOR }}
          />
          <View style={styles.countersWrapper}>
            {waterCounter ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.counterItem}
                onPress={() => {
                  navigation.navigate("WaterCounter", {
                    navigation: navigation,
                    flatName: flatInfo.title,
                  });
                }}
              >
                <AppTextRegular
                  value="Водоснабжение"
                  styles={{
                    fontSize: 18,
                    color: THEME.LIGHT_COLOR,
                    marginTop: 2,
                  }}
                />
                <Image
                  source={require("../../assets/drop.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {electricCounter ? (
              <TouchableOpacity activeOpacity={0.5} style={styles.counterItem}>
                <AppTextRegular
                  value="Электричество"
                  styles={{
                    fontSize: 18,
                    color: THEME.LIGHT_COLOR,
                    marginTop: 2,
                  }}
                />
                <Image
                  source={require("../../assets/danger.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {thermalCounter ? (
              <TouchableOpacity activeOpacity={0.5} style={styles.counterItem}>
                <AppTextRegular
                  value="Ототпление"
                  styles={{
                    fontSize: 18,
                    color: THEME.LIGHT_COLOR,
                    marginTop: 2,
                  }}
                />
                <Image
                  source={require("../../assets/thermometer.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {gasCounter ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.counterItem}
                onPress={() =>
                  navigation.navigate("Counter", { counterType: "gas" })
                }
              >
                <AppTextRegular
                  value="Газ"
                  styles={{
                    fontSize: 18,
                    color: THEME.LIGHT_COLOR,
                    marginTop: 2,
                  }}
                />
                <Image
                  source={require("../../assets/gas.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>

        <View style={styles.chartWrapper}>
          <LineChart
            data={{
              labels: [
                "Янв",
                "Фев",
                "Мар",
                "Апр",
                "Май",
                "Иль",
                "Инь",
                "Авг",
                "Сен",
                "Окт",
                "Ноя",
                "Дек",
              ],
              datasets: [
                {
                  data: [
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel="%"
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: THEME.LIGHT_COLOR,
              backgroundGradientFrom: THEME.LIGHT_PURPLE,
              backgroundGradientTo: THEME.LIGHT_PURPLE,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 0,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: THEME.LIGHT_COLOR,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              //borderRadius: 16
            }}
          />
        </View>
      </View>
    </View>
  );
};

FlatScreenComponent.navigationOptions = {
  title: "Статистика",
};

const mapStateToProps = (state) => {
  const { flats } = state;
  return { flats };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCounter,
    },
    dispatch
  );

export const FlatScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlatScreenComponent);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f9f8ff",
  },
  header: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: THEME.LIGHT_PURPLE,
    marginTop: 15,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 20,
  },
  chartWrapper: {
    position: "absolute",
    bottom: "0%",
  },
  bodyTitle: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  countersWrapper: {
    flex: 1,
    width: "100%",
  },
  counterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 15,
    borderWidth: 2,
    borderBottomColor: THEME.LIGHT_COLOR,
    borderColor: THEME.LIGHT_PURPLE,
    borderRadius: 2,
  },
});
