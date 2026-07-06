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
}

export default function Centerblock({
  error,
  title = 'Треки',
  tracks,
  isLoading,
}: CenterblockProps) {
  return (
    <div
      className={styles.mainCenterblock || ''}
      style={{ width: 'auto', flexGrow: 1, padding: '20px 40px 20px 0' }}
    >
      <Search title={title} />
      <Filter tracks={tracks} />
      <h2
        className={styles.centerblockH2 || ''}
        style={{
          color: '#ffffff',
          fontSize: '64px',
          marginBottom: '45px',
          fontWeight: 400,
        }}
      >
        {title}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '24px',
            paddingLeft: '5px',
          }}
        >
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '2px',
              color: '#ffffff',
              textTransform: 'uppercase',
              width: '447px',
            }}
          >
            Трек
          </div>
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '2px',
              color: '#ffffff',
              textTransform: 'uppercase',
              width: '321px',
            }}
          >
            Исполнитель
          </div>
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '2px',
              color: '#ffffff',
              textTransform: 'uppercase',
              width: '245px',
            }}
          >
            Альбом
          </div>
          <div
            style={{
              width: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg
              style={{
                width: '12px',
                height: '12px',
                fill: 'transparent',
                stroke: '#ffffff',
              }}
            >
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {error && (
            <div
              style={{
                color: '#ff4d4d',
                padding: '10px 0',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}

          {isLoading ? (
            <div
              style={{ color: '#ffffff', padding: '20px', fontSize: '18px' }}
            >
              Загрузка треков...
            </div>
          ) : tracks.length === 0 ? (
            <div
              style={{ color: '#ffffff', padding: '20px', fontSize: '18px' }}
            >
              Треки отсутствуют
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
