import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { THEME } from "../../theme";
import { AddFlatModal } from "../modals/AddFlatModal";
import { AppButton } from "../UI/AppButton";
import { AppTextRegular } from "../UI/AppTextRegular";

const AddFlatCard = ({ fadeOut, fadeIn }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <AppTextRegular
          value="Добавьте новую квартиру"
          styles={{ fontSize: 18, color: THEME.LIGHT_COLOR, marginBottom: 5 }}
        />
        <AppTextRegular
          value="А затем добавьте счётчики в эту квартиру"
          styles={{ fontSize: 16, color: THEME.LIGHT_COLOR, opacity: 0.7 }}
        />
      </View>
      <AppButton
        onPress={() => {
          setModalVisible(true);
          fadeOut();
        }}
        title=""
        iconName="add"
        type="main"
        styles={{
          backgroundColor: THEME.BLUE_COLOR,
          width: 45,
          height: 45,
          paddingLeft: 2,
        }}
      />
      {modalVisible ? (
        <AddFlatModal setVisible={setModalVisible} fadeIn={fadeIn} />
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    width: 345,
    height: 100,
    backgroundColor: THEME.DARK_BLUE,
    borderRadius: 20,
  },
  textWrapper: {
    flex: 1,
    flexDirection: "column",
    width: 70 + "%",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  smallText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  const { friends } = state;
  return { friends };
};

export const FlatCard = connect(mapStateToProps)(AddFlatCard);
