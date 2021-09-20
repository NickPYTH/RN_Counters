import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlatCard } from "../components/MainScreen/AddFlatCard";
import { Flat } from "../components/MainScreen/Flat";
import { Header } from "../components/MainScreen/Header";
import { AppTextRegular } from "../components/UI/AppTextRegular";
import { removeFlat } from "../store/actions";
import { THEME } from "../theme";

const Home = (props) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 1000,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 0,
      duration: 1000,
    }).start();
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.flatListWrapper}>
        {props.flats.flats.map((flat) => (
          <Flat
            key={flat.id}
            title={flat.title}
            description={flat.description}
            id={flat.id}
            removeFlat={props.removeFlat}
            navigation={props.navigation}
          />
        ))}

        {props.flats.flats.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 50,
            }}
          >
            <AppTextRegular
              value="Cписок ваших квартир пуст"
              styles={{ color: THEME.MAIN_COLOR, fontSize: 20, marginRight: 5 }}
            />
            <MaterialIcons
              name="dashboard"
              size={32}
              color={THEME.MAIN_COLOR}
            />
          </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
      <Animated.View
        style={{
          height: 100,
          marginRight: 15,
          marginLeft: 15,
          marginBottom: 15,
          opacity: fadeAnim,
          position: "absolute",
          top: "80%",
        }}
      >
        <FlatCard fadeOut={fadeOut} fadeIn={fadeIn} />
      </Animated.View>
    </View>
  );
};

Home.navigationOptions = {
  headerTitle: () => <Header />,
};

const mapStateToProps = (state) => {
  const { flats } = state;
  return { flats };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeFlat,
    },
    dispatch
  );

export const MainScreen = connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f9f8ff",
    height: 100 + "%",
  },
  flatListWrapper: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
  },
});
