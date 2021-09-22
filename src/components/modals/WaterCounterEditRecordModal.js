import {MaterialIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import {Modal, StyleSheet, TouchableHighlight, View, TextInput} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addCounter, addFlat} from "../../store/actions";
import {THEME} from "../../theme";
import {AppButton} from "../UI/AppButton";
import {AppTextRegular} from "../UI/AppTextRegular";
import {openDatabase} from "expo-sqlite";
import Toast from "react-native-root-toast";
import { updateRecord } from '../../store/actions';

const App = ({setVisible, fadeIn, record, updateRecord}) => {
    const [value, setValue] = useState('');
    const saveChanges = () => {
        if (value.trim().length !== 5){
            Toast.show('Показание должно содержать 5 цифр')
        }
        else{
            const db = openDatabase("db");
            db.transaction((tx) => {
                tx.executeSql(
                    "update countersRecords set value = ? where flatName = ? and counterType = ? and value = ? and recordDate = ?",
                    [value, record.flatName, record.counterType, record.value, record.recordDate],
                    () =>{updateRecord(record, value)},
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
                        <View style={{width: "100%", height: 50}}>
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
                                    value="Редактирование записи"
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
                        <View style={{height: 125, width: "100%"}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center"}}>
                                <AppTextRegular
                                    styles={{
                                        color: THEME.DARK_COLOR,
                                        fontSize: 18,
                                        fontWeight: "400",
                                    }}
                                    value="Показание счётчика"
                                />
                                <TextInput value={value}
                                           onChangeText={(text) => {
                                               setValue(text);
                                           }}
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
                                    styles={{width: 100}}
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
    const {flats} = state;
    return {flats};
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateRecord
        },
        dispatch
    );

export const WaterCounterEditRecordModal = connect(
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
