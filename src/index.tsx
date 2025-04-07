import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReduxProvider } from './redux/provider';
import './styles/globals.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>
); 