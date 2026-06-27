'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import styles from '../../page.module.css';

import { getSelectionTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { data as mockTracks } from '@/data'; // Подстраховка для подборок

// Импортируем компоненты структуры страницы
import Nav from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';

const SELECTION_NAMES: Record<string, string> = {
  '1': 'Плейлист дня',
  '2': '100 танцевальных хитов',
  '3': 'Инди-заряд',
};

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const categoryId = params?.id;

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const selectionTitle = categoryId ? SELECTION_NAMES[categoryId] : 'Подборка';

  useEffect(() => {
    if (!categoryId) return;

    getSelectionTracks(categoryId)
      .then((res) => {
        setTracks(res);
        setError('');
        setIsLoading(false); // Выключаем часы при успехе в категории
      })
      .catch((err) => {
        console.error('ОШИБКА API КАТЕГОРИИ:', err);

        if (err instanceof AxiosError) {
          if (err.response) {
            setError(
              err.response.data.detail ||
                err.response.data.message ||
                'Ошибка загрузки подборки',
            );
          } else if (err.request) {
            setError('Проблемы с соединением. Проверьте интернет.');
          } else {
            setError('Неизвестная ошибка сети');
          }
        } else {
          setError('Не удалось загрузить треки из этой подборки');
        }

        // Подставляем резервный список, чтобы страница подборки не зависала на часах
        setTracks(mockTracks);
        setError('');
        setIsLoading(false); // ПРИНУДИТЕЛЬНО выключаем часы при ошибке в категории
      });
  }, [categoryId]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />
          <Centerblock
            title={selectionTitle}
            tracks={tracks}
            error={error}
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
