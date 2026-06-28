'use client';

import { TrackType } from '@/SharedTypes/ShareTypes';
import Playlist from '../Playlist/Playlist';
import Filter from '../Filter/Filter';
import styles from './Centerblock.module.css';

interface CenterblockProps {
  title?: string;
  tracks: TrackType[];
  error: string;
  isLoading: boolean;
}

export default function Centerblock({
  title = 'Треки',
  tracks,
  error,
  isLoading,
}: CenterblockProps) {
  return (
    <div className={styles.mainCenterblock}>
      <div className={styles.centerblockSearch}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>

      <h2 className={styles.centerblockH2}>{title}</h2>

      <div className={styles.centerblockFilterContainer}>
        <Filter tracks={tracks} />
      </div>

      <div className={styles.centerblockContent}>
        <div className={styles.contentTitle}>
          <div className={styles.playlistCol01}>Трек</div>
          <div className={styles.playlistCol02}>ИСПОЛНИТЕЛЬ</div>
          <div className={styles.playlistCol03}>АЛЬБОМ</div>
          <div className={styles.playlistCol04}>
            <svg className={styles.watchSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        {error && <div className={styles.errorText}>{error}</div>}

        {isLoading && tracks.length === 0 && !error && (
          <div className={styles.loadingText}>Загрузка треков...</div>
        )}

        {tracks.length > 0 && <Playlist initialTracks={tracks} />}
      </div>
    </div>
  );
}
