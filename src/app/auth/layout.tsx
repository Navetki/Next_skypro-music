'use client';

import styles from './layout.module.css';
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        {/* ИСПРАВЛЕНО: Убрали дублирующиеся блоки и форму. 
           Теперь layout дает только темный фон, а карточки ровно рендерятся внутри */}
        {children}
      </div>
    </div>
  );
}
