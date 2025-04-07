import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  useEffect(() => {
    console.log('Initializing Redux store...');
    
    // No more default posts or mock users
    // Posts will be created by registered users only
    
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;