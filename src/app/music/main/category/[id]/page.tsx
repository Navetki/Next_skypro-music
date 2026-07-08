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
  '1': 'Плейлист дня',
  '2': '100 танцевальных хитов',
  '3': 'Инди-заряд',
};

interface CustomTrackType extends TrackType {
  id?: string | number;
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const categoryId = params?.id;

  const allTracks =
    useAppSelector(
      (state) =>
        ((state.tracks as Record<string, unknown>).playlist as TrackType[]) ||
        [],
    ) || [];

  const [selectionIds, setSelectionIds] = useState<
    (string | number | TrackType)[] | null
  >(null);
  const [error, setError] = useState('');

  const selectionTitle = categoryId ? SELECTION_NAMES[categoryId] : 'Подборка';
  const isLoading = selectionIds === null;

  useEffect(() => {
    if (!categoryId) return;

    getSelectionTracks(categoryId)
      .then((res) => {
        if (!res || res.length === 0) {
          setSelectionIds(mockTracks as (string | number | TrackType)[]);
        } else {
          setSelectionIds(res);
        }
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('Не удалось загрузить треки из этой подборки');
        setSelectionIds(mockTracks as (string | number | TrackType)[]);
      });
  }, [categoryId]);

  const filteredTracks = (selectionIds || [])
    .map((item) => {
      if (item && typeof item === 'object' && ('_id' in item || 'id' in item)) {
        return item as TrackType;
      }

      const targetId = item as string | number;
      return allTracks.find((t: TrackType) => {
        const extTrack = t as CustomTrackType;
        return extTrack._id === targetId || extTrack.id === targetId;
      });
    })
    .filter((t: TrackType | undefined): t is TrackType => t !== undefined);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />
          <Centerblock
            title={selectionTitle}
            tracks={filteredTracks}
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
