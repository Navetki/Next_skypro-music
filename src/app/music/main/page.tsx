'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from '@/app/music/main/page.module.css';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav/Nav';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { RootState } from '@/store/store';
import { useMemo, useEffect } from 'react';
import { resetFilters } from '@/store/features/trackSlice';

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  ssr: false,
});

export default function MainPage() {
  const dispatch = useAppDispatch();
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state: RootState) => state.tracks);

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const playlist = useMemo(() => {
    const hasActiveFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.search.trim() !== '' ||
      filters.years !== 'По умолчанию';

    return hasActiveFilters ? filteredTracks : allTracks;
  }, [filteredTracks, allTracks, filters]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <FetchingTracks />
          <Nav />
          <Centerblock
            pagePlaylist={allTracks}
            tracks={playlist}
            isLoading={fetchIsLoading}
            error={fetchError}
            title="Треки"
          />
          <Sidebar />
        </main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
