import { ApolloProvider } from '@apollo/client';
import React from 'react'
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
import client from './apollo';
import App from './App'
import './index.css'
import { store } from './local-states/store';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          {/* <PersistGate loading={"loading"} persistor={persistor}>  */}
          <CookiesProvider>
            <App />
          </CookiesProvider>
          {/* </PersistGate> */}
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
