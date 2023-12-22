import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { ContextProvider, store } from './Settings';
import { CartProvider } from 'react-use-cart';
import { QueryClient, QueryClientProvider } from 'react-query';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(
  <Provider store={store}>
    <CartProvider>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
      </ContextProvider>
    </CartProvider>
  </Provider>
);
