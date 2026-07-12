'use client';

import classnames from 'classnames';
import styles from './Track.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlay,
} from '@/store/features/trackSlice';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { formatTime } from '@/utils/helper';

type ApiTrackType = TrackType & {
  id?: number | string;
  title?: string;
  artist?: string;
  duration?: number;
  fileUrl?: string;
};

interface TrackProps {
  track: TrackType;
  playlist: TrackType[];
}

export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector(
    (state) => state.tracks.currentTrack,
  ) as ApiTrackType | null;
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const apiTrack = track as ApiTrackType;
  console.log('ДАННЫЕ ОДНОГО ТРЕКА В КОМПОНЕНТЕ:', apiTrack);

  const trackUrl = apiTrack.track_file || apiTrack.fileUrl || '';
  const currentTrackUrl =
    currentTrack?.track_file || currentTrack?.fileUrl || '';
  const isCurrentTrack =
    trackUrl !== '' && currentTrackUrl !== '' && currentTrackUrl === trackUrl;

  const handleTrackClick = () => {
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
  };

  const trackName = apiTrack.name || apiTrack.title || 'Без названия';
  const trackAuthor =
    apiTrack.author || apiTrack.artist || 'Неизвестный исполнитель';
  const trackAlbum = apiTrack.album || 'Вне альбома';
  const duration = apiTrack.duration_in_seconds || apiTrack.duration || 0;

  return (
    <div className={styles.playlistItem} onClick={handleTrackClick}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isCurrentTrack ? (
              <div
                className={classnames(
                  styles.playingDot,
                  isPlay && styles.playingDotActive,
                )}
              />
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>

          <div
            className={classnames(
              styles.trackTitleText,
              isCurrentTrack && styles.activeTrackText,
            )}
          >
            <span className={styles.trackTitleLink}>{trackName}</span>
          </div>
        </div>

        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{trackAuthor}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{trackAlbum}</span>
        </div>
        <div className={styles.trackTime}>
          <span className={styles.trackTimeText}>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
