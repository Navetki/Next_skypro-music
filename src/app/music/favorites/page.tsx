'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import styles from '@/app/music/main/page.module.css';
import dynamic from 'next/dynamic';

import Nav from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { RootState } from '@/store/store';

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  ssr: false,
});

export default function FavoritesPage() {
  const router = useRouter();

  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state: RootState) => state.tracks,
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/music/main');
      }
    }
  }, [router]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <FetchingTracks />
          <Nav />
          <Centerblock
            tracks={favoriteTracks || []}
            isLoading={fetchIsLoading}
            error={fetchError}
            title="Мои треки"
          />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
