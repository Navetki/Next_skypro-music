'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import './globals.css';

const store = makeStore();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
