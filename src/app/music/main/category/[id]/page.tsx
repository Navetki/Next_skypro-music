'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../page.module.css';
import dynamic from 'next/dynamic';

import { getSelectionTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { useAppSelector } from '@/store/store';
import { data as mockTracks } from '@/data';

import Nav from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import Bar from '@/components/Bar/Bar';

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  ssr: false,
});

const SELECTION_NAMES: Record<string, string> = {
  '2': 'Плейлист дня',
  '3': '100 танцевальных хитов',
  '4': 'Инди-заряд',
};

interface CustomTrackType extends TrackType {
  id?: string | number;
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const categoryId = params?.id;

  const reduxPlaylist = useAppSelector(
    (state) =>
      ((state.tracks as Record<string, unknown>).playlist as TrackType[]) || [],
  );

  const [selectionTracks, setSelectionTracks] = useState<TrackType[] | null>(
    null,
  );
  const [error, setError] = useState('');

  const selectionTitle = categoryId ? SELECTION_NAMES[categoryId] : 'Подборка';
  const isLoading = selectionTracks === null;

  useEffect(() => {
    if (!categoryId) return;

    getSelectionTracks(categoryId)
      .then((res: unknown) => {
        const rawArray = Array.isArray(res) ? res : [];

        if (rawArray.length === 0) {
          setSelectionTracks(mockTracks as TrackType[]);
        } else {
          const firstItem = rawArray[0];
          if (typeof firstItem === 'number' || typeof firstItem === 'string') {
            const ids = rawArray as (string | number)[];
            const matched = ids
              .map((targetId) => {
                return reduxPlaylist.find((t: TrackType) => {
                  const extTrack = t as CustomTrackType;
                  return extTrack._id === targetId || extTrack.id === targetId;
                });
              })
              .filter(
                (t: TrackType | undefined): t is TrackType => t !== undefined,
              );

            setSelectionTracks(
              matched.length > 0 ? matched : (mockTracks as TrackType[]),
            );
          } else {
            setSelectionTracks(rawArray as TrackType[]);
          }
        }
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('Не удалось загрузить треки из этой подборки');
        setSelectionTracks(mockTracks as TrackType[]);
      });
  }, [categoryId]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />
          <Centerblock
            title={selectionTitle}
            tracks={selectionTracks || []}
            error={error || null}
            isLoading={isLoading}
          />
          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.stylesFooter || styles.footer}></footer>
      </div>
    </div>
  );
}
