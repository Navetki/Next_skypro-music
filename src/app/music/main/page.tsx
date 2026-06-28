'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getAllTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { AxiosError } from 'axios';
import { data as mockTracks } from '@/data';
import dynamic from 'next/dynamic'; // Импортируем динамические компоненты Next.js

// Импортируем компоненты структуры страницы
import Nav from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import Bar from '@/components/Bar/Bar';

// Динамический импорт Сайдбара с отключением серверного рендеринга (SSR: false)
const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  ssr: false,
});

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllTracks()
      .then((res) => {
        setTracks(res);
        setError('');
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('ПОЛНАЯ ОШИБКА API ТРЕКОВ:', err);

        if (err instanceof AxiosError) {
          if (err.response) {
            setError(
              err.response.data?.detail ||
                err.response.data?.message ||
                'Ошибка сервера при загрузке треков',
            );
          } else if (err.request) {
            setError('Сервер не отвечает. Возможно, он перезагружается.');
          } else {
            setError('Неизвестная ошибка сети');
          }
        } else {
          setError('Не удалось загрузить треки');
        }

        setTracks(mockTracks);
        setError('');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />

          <Centerblock tracks={tracks} error={error} isLoading={isLoading} />

          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
