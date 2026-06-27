import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/modal';

import App from './App';
import { store, persistor } from './store';
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById('root');
const root = createRoot(container); // for React 18+

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
