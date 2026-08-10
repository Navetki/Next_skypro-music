'use client';

import { TrackType } from '@/SharedTypes/ShareTypes';
import Filter from '@/components/Filter/Filter';
import Track from '@/components/Track/Track';
import Search from '@/components/Search/Search';
import styles from './Centerblock.module.css';

interface CenterblockProps {
  title?: string;
  tracks: TrackType[];
  isLoading: boolean;
  error: string | null;
  pagePlaylist: TrackType[];
}

export default function Centerblock({
  error: errorRes,
  title = 'Треки',
  tracks,
  isLoading,
  pagePlaylist,
}: CenterblockProps) {
  const skeletonRows = Array.from({ length: 8 });

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <Filter tracks={isLoading ? [] : pagePlaylist} />
      <h2 className={styles.centerblockH2}>{title}</h2>
      <div>
        <div className={styles.playlistHeader}>
          <div>Трек</div>
          <div>Исполнитель</div>
          <div>Альбом</div>
          <div className={styles.watchIconWrapper}>
            <svg className={styles.watchSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <div>
          {errorRes ? (
            <div className={styles.errorMessage}>{errorRes}</div>
          ) : isLoading ? (
            <div className={styles.skeletonList}>
              {skeletonRows.map((_, index) => (
                <div key={index} className={styles.skeletonRow}>
                  <div className={styles.skeletonGroup}>
                    <div
                      className={`${styles.skeletonImage} ${styles.skeletonBlock}`}
                    />
                    <div
                      className={`${styles.skeletonTitle} ${styles.skeletonBlock}`}
                    />
                  </div>
                  <div
                    className={`${styles.skeletonAuthor} ${styles.skeletonBlock}`}
                  />
                  <div
                    className={`${styles.skeletonAlbum} ${styles.skeletonBlock}`}
                  />
                  <div
                    className={`${styles.skeletonTime} ${styles.skeletonBlock}`}
                  />
                </div>
              ))}
            </div>
          ) : tracks.length === 0 ? (
            <div className={styles.emptyMessage}>Нет подходящих треков</div>
          ) : (
            tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
