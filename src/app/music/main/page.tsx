'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getAllTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { AxiosError } from 'axios';
import { data as mockTracks } from '@/data';
import dynamic from 'next/dynamic';

import Nav from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import Bar from '@/components/Bar/Bar';

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  ssr: false,
});

interface PageState {
  tracks: TrackType[];
  error: string;
  isLoading: boolean;
}

export default function Home() {
  const [pageState, setPageState] = useState<PageState>({
    tracks: [],
    error: '',
    isLoading: true,
  });

  useEffect(() => {
    getAllTracks()
      .then((res) => {
        if (Array.isArray(res)) {
          setPageState({
            tracks: res,
            error: '',
            isLoading: false,
          });
        } else {
          setPageState({
            tracks: mockTracks,
            error: '',
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        let errMsg = 'Не удалось загрузить треки';
        if (err instanceof AxiosError && err.response) {
          errMsg =
            err.response.data?.detail ||
            err.response.data?.message ||
            'Ошибка сервера при загрузке треков';
        }

        setPageState({
          tracks: mockTracks,
          error: errMsg,
          isLoading: false,
        });
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />
          <Centerblock
            tracks={pageState.tracks}
            error={pageState.error || null}
            isLoading={pageState.isLoading}
          />
          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
