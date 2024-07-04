import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Views from "./components/index.jsx";
import configureStore from "./store/index.jsx";

const store = configureStore();
const persistor = persistStore(store);

// if (`${import.meta.env.NODE_ENV}` !== "production") {
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions;
// }
//replaced layout with views
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Views />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
