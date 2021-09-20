import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { bootstrap } from "./src/bootstrap";
import { AppNavigation } from "./src/navigation/AppNavigation";
import Reducer from "./src/store/reducers";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const store = createStore(Reducer);
  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </RootSiblingParent>
  );
}
