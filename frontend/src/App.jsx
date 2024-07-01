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

// // App.js
// import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { BrowserRouter } from 'react-router-dom';
// import configureStore from './store/index.js';
// import { restoreCSRF, csrfFetch } from "./store/csrf";
// import * as sessionActions from "./store/session";
// import { persistStore } from "redux-persist";
// import Views from "./components/index.js";
// // import Views from "./components/Views";

// const store = configureStore();
// const persistor = persistStore(store);

// if (process.env.NODE_ENV !== "production") {
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions;
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <BrowserRouter>
//           <Views />
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   );
// }

// export default App;
