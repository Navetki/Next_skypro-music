'use client';

import styles from './layout.module.css';
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>{children}</div>
    </div>
  );
}
