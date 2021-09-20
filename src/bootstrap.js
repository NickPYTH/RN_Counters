import * as Font from "expo-font";
import { openDatabase } from "expo-sqlite";

function addDataToDb() {
  const db = openDatabase("db");
  db.transaction((tx) => {
    /*tx.executeSql(
      "drop table flats",
      null,
      () => {},
      () => {}
    );
    tx.executeSql(
      "drop table counters",
      null,
      () => {},
      () => {}
    );
    tx.executeSql(
      "drop table countersRecords",
      null,
      () => {},
      () => {}
    );*/
    tx.executeSql(
      "create table if not exists flats (id integer primary key not null, title text, description text);",
      null,
      (t, info) => {},
      (t, error) => {
        console.log("error create");
      }
    );
    tx.executeSql(
      "create table if not exists counters (id integer primary key not null, flatName text, counterType text, rate float);",
      null,
      (t, info) => {},
      (t, error) => {
        console.log("error create");
      }
    );
    tx.executeSql(
      "create table if not exists countersRecords (id integer primary key not null, flatName text, counterType text, value integer, recordDate text);",
      null,
      (t, info) => {},
      (t, error) => {
        console.log("error create");
      }
    );
  });
}

export async function bootstrap() {
  await Font.loadAsync({
    "open-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "open-regular": require("../assets/fonts/OpenSans-Regular.ttf"),
  });

  await addDataToDb();
}
