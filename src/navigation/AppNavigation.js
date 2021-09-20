import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AddRecordScreen } from "../screens/AddWaterRecordScreen";
import { FlatScreen } from "../screens/FlatScreen";
import { MainScreen } from "../screens/MainScreen";
import { WaterScreenCounter } from "../screens/WaterScreenCounter";
import { THEME } from "../theme";
const HomeNavigator = createStackNavigator(
  {
    AddRecord: AddRecordScreen,
    WaterCounter: WaterScreenCounter,
    Flat: FlatScreen,
    Main: MainScreen,
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {
      headerStyle: {
        paddingTop: 25,
        height: 70,
        backgroundColor: "#fff",
      },
      headerTintColor: THEME.MAIN_COLOR,
    },
  }
);

const BottomNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Квартиры",
        tabBarIcon: (info) => (
          <MaterialIcons name="home" size={25} color={info.tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      backgroundColor: THEME.LIGHT_PURPLE,
      activeTintColor: THEME.MAIN_COLOR,
      style: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
      },
    },
  }
);

export const AppNavigation = createAppContainer(BottomNavigator);
