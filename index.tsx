import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

<<<<<<< HEAD
import { LanguageProvider } from './contexts/LanguageContext';

=======
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <LanguageProvider>
        <App />
      </LanguageProvider>
=======
      <App />
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    </Provider>
  </React.StrictMode>
);