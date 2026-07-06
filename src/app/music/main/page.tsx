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

interface ServerResponse {
  success?: boolean;
  items?: TrackType[];
  result?: TrackType[];
  data?: TrackType[] | { items?: TrackType[]; result?: TrackType[] };
}

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getAllTracks()
      .then((res) => {
        const rawData = res as unknown as ServerResponse;

        let serverTracks: TrackType[] = [];
        if (Array.isArray(res)) {
          serverTracks = res;
        } else if (rawData?.items && Array.isArray(rawData.items)) {
          serverTracks = rawData.items;
        } else if (rawData?.result && Array.isArray(rawData.result)) {
          serverTracks = rawData.result;
        } else if (rawData?.data) {
          if (Array.isArray(rawData.data)) {
            serverTracks = rawData.data;
          } else if (rawData.data.items && Array.isArray(rawData.data.items)) {
            serverTracks = rawData.data.items;
          } else if (
            rawData.data.result &&
            Array.isArray(rawData.data.result)
          ) {
            serverTracks = rawData.data.result;
          }
        }

        if (serverTracks.length === 0) {
          setTracks(mockTracks);
        } else {
          setTracks(serverTracks);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err instanceof AxiosError && err.response) {
          setError(
            err.response.data?.detail ||
              err.response.data?.message ||
              'Ошибка сервера при загрузке треков',
          );
        } else if (err instanceof AxiosError && err.request) {
          setError('Сервер не отвечает. Включаем резервные треки.');
        } else {
          setError('Не удалось загрузить треки');
        }
        setTracks(mockTracks);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />
          <Centerblock
            tracks={tracks}
            error={error || null}
            isLoading={isLoading}
          />
          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
