'use client';

import { useState } from 'react';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { data as mockTracks } from '@/data';

import Nav from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';

import styles from './page.module.css';

export default function Home() {
  const [tracks] = useState<TrackType[]>(mockTracks);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />

          <Centerblock tracks={tracks} isLoading={false} error="" />

          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
