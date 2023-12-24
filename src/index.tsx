import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { ContextProvider, store } from './Settings';

import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from 'react-use-cart';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(
  <CartProvider>
    <Provider store={store}>
      <ContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
      </ContextProvider>
    </Provider>
  </CartProvider>
  );
