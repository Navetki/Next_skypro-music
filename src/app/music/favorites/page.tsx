'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from '@/app/music/main/page.module.css';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { RootState } from '@/store/store';
import { setPagePlayList, resetFilters } from '@/store/features/trackSlice';

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  ssr: false,
});

export default function FavoritesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    favoriteTracks,
    fetchIsLoading,
    fetchError,
    filteredTracks,
    filters,
  } = useAppSelector((state: RootState) => state.tracks);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/music/main');
      }
    }
  }, [router]);

  useEffect(() => {
    if (favoriteTracks && favoriteTracks.length > 0) {
      dispatch(setPagePlayList(favoriteTracks));
    }
  }, [favoriteTracks, dispatch]);

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

    return hasActiveFilters ? filteredTracks : favoriteTracks;
  }, [filteredTracks, favoriteTracks, filters]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <FetchingTracks />
          <Nav />
          <Centerblock
            pagePlaylist={favoriteTracks || []}
            tracks={playlist || []}
            isLoading={fetchIsLoading}
            error={fetchError}
            title="Мои треки"
          />
          <Sidebar />
        </main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
