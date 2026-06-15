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

interface TrackProps {
  track: TrackType;
  playlist: TrackType[];
}

export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const isCurrentTrack = currentTrack?.track_file === track.track_file;

  const handleTrackClick = () => {
    dispatch(setCurrentPlaylist(playlist));

    dispatch(setCurrentTrack(track));

    dispatch(setIsPlay(true));
  };

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
            <span className={styles.trackTitleLink}>{track.name}</span>
          </div>
        </div>

        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{track.author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{track.album}</span>
        </div>
        <div className={styles.trackTime}>
          <span className={styles.trackTimeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
