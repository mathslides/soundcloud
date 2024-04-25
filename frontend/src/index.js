// // frontend/src/index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// // import "./styles.css";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { ModalProvider } from "./context/Modal";

// import configureStore from "./store";
// import { restoreCSRF, csrfFetch } from "./store/csrf";
// import * as sessionActions from "./store/session";

// const store = configureStore();

// if (process.env.NODE_ENV !== "production") {
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions;
// }

// function Root() {
//   return (
//     <Provider store={store}>
//       {/* <ModalProvider> */}
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//       {/* </ModalProvider> */}
//     </Provider>
//   );
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById("root")
// );


// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import configureStore from './store/index.js';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import persistStore from 'redux-persist/es/persistStore';


const store = configureStore();
const persistor = persistStore(store);

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
