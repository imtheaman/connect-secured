import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloProvider} from '@apollo/client'
import { SessionProvider } from 'next-auth/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
    <App />
  </SessionProvider>
    </ApolloProvider>
  </React.StrictMode>
);