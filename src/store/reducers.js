import {openDatabase} from "expo-sqlite";
import {combineReducers} from "redux";

function loadFlats() {
    const db = openDatabase("db");
    let flats = [];
    db.transaction(
        (tx) => {
            tx.executeSql("select * from flats", [], (_, {rows}) => {
                rows._array.map((flat) => {
                    flats.push(flat);
                });
            });
        },
        () => {
            console.log("not error");
        },
        () => {
        }
    );

    return flats;
}

function loadCounters() {
    const db = openDatabase("db");
    let counters = [];

    db.transaction(
        (tx) => {
            tx.executeSql("select * from counters", [], (_, {rows}) => {
                rows._array.map((counter) => {
                    counters.push(counter);
                });
            });
        },
        () => {
            console.log("not error");
        },
        () => {
        }
    );

    return counters;
}

function loadCountersRecords() {
    const db = openDatabase("db");
    let countersRecords = [];

    db.transaction(
        (tx) => {
            tx.executeSql("select * from countersRecords", [], (_, {rows}) => {
                rows._array.map((record) => {
                    countersRecords.push(record);
                });
            });
        },
        () => {
            console.log("not error");
        },
        () => {
        }
    );

    return countersRecords;
}

const INITIAL_STATE = {
    userInfo: "noInfo",
    flats: loadFlats(),
    counters: loadCounters(),
    countersRecords: loadCountersRecords(),
};

const Flats = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REMOVE_FLAT":
            const currentFlats = state;
            const newState = currentFlats.flats.filter(
                (flat) => flat.id !== action.payload
            );
            return {
                ...state,
                flats: newState,
            };
        case "ADD_FLAT":
            let curFlats = state.flats;
            curFlats.push({
                id: Date.now(),
                title: action.payload.flatName,
                description: action.payload.flatDesc,
            });
            return {
                ...state,
                flats: curFlats,
            };
        case "ADD_COUNTER":
            let counters = state.counters;
            counters.push({
                flatName: action.payload.flatName,
                counterType: action.payload.counterType,
                rate: 0,
            });
            return {
                ...state,
                counters: counters,
            };
        case "ADD_COUNTER_RECORD":
            let records = state.countersRecords;
            let day = new Date().getDay().toString();
            let month = (Number(new Date().getMonth().toString()) + 1).toString();
            let year = new Date().getFullYear().toString();
            if (Number(day) < 10) {
                day = "0" + day;
            }
            if (Number(month) < 10) {
                month = "0" + month;
            }
            if (action.payload.counterType === "water") {
                records.push({
                    flatName: action.payload.flatName,
                    counterType: action.payload.waterType,
                    value: action.payload.value,
                    recordDate: day + "-" + month + "-" + year,
                });
            }

            return {
                ...state,
                countersRecords: records,
            };
        case "REMOVE_RECORD":
            let tmp = state.countersRecords
            let new_tmp = []
            tmp.map(record => {

                if (record.counterType == action.payload.counterType && record.flatName == action.payload.flatName && record.recordDate == action.payload.recordDate && record.value == action.payload.value){

                }else{
                    new_tmp.push(record)
                }
            })
            return {
                ...state,
                countersRecords: new_tmp
            };
        case "UPDATE_RECORD":
            tmp = state.countersRecords
            console.log(action.payload)
            new_tmp = []
            tmp.map(record => {
                if (record.counterType == action.payload.record.counterType && record.flatName == action.payload.record.flatName && record.recordDate == action.payload.record.recordDate){
                    record.value = action.payload.value;
                }
                new_tmp.push(record);
            })
            return {
                ...state,
                countersRecords: new_tmp
            };
        default:
            return state;
    }
};

export default combineReducers({
    flats: Flats,
});
