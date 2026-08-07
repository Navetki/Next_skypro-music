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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '447px 321px 245px 60px',
            alignItems: 'center',
            marginBottom: '24px',
            color: '#4e4e4e',
            textTransform: 'uppercase',
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '2px',
          }}
        >
          <div>Трек</div>
          <div>Исполнитель</div>
          <div>Альбом</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <svg className={styles.watchSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <div>
          {errorRes ? (
            <div
              style={{ color: '#ff4d4d', padding: '10px 0', fontSize: '16px' }}
            >
              {errorRes}
            </div>
          ) : isLoading ? (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {skeletonRows.map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '447px 321px 245px 60px',
                    alignItems: 'center',
                    height: '51px',
                    padding: '5px 0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '17px',
                    }}
                  >
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
            <div
              style={{
                color: '#ffffff',
                fontSize: '18px',
                textAlign: 'center',
                marginTop: '40px',
              }}
            >
              Нет подходящих треков
            </div>
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
