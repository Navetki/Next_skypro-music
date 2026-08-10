'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const store = makeStore();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Provider store={store}>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            theme="dark"
            pauseOnHover
          />
        </Provider>
      </body>
    </html>
  );
}
