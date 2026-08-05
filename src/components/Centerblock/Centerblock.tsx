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
            <div style={{ color: '#ffffff', fontSize: '16px' }}>
              Загрузка...
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
