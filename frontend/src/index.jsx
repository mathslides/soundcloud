import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";
import configureStore from "./store/index.jsx";
import { restoreCSRF, csrfFetch } from "./store/csrf.jsx";
import * as sessionActions from "./store/session.jsx";
import persistStore from "redux-persist/es/persistStore";
import "./index.css";

const store = configureStore();
const persistor = persistStore(store);

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.render(<App />, document.getElementById("root"));
