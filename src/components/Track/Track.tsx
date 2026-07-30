'use client';

import classnames from 'classnames';
import styles from './Track.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlaying,
} from '@/store/features/trackSlice';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { formatTime } from '@/utils/helper';
import { useLikeTrack } from '@/hooks/useLikeTracks';

interface TrackComponentProps {
  track: TrackType;
  playlist: TrackType[];
}

export default function Track({ track, playlist }: TrackComponentProps) {
  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const { toggleLike, isLike } = useLikeTrack(track);

  const isCurrentTrack =
    track._id !== undefined &&
    currentTrack?._id !== undefined &&
    currentTrack._id === track._id;

  const handleTrackClick = () => {
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike();
  };

  const trackName = track.name || 'Без названия';
  const trackAuthor = track.author || 'Неизвестный исполнитель';
  const trackAlbum = track.album || 'Вне альбома';
  const duration = track.duration_in_seconds || 0;

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
          <button
            type="button"
            className={styles.trackLikeBtn}
            onClick={handleLikeClick}
          >
            <svg
              className={classnames(
                styles.trackTimeSvg,
                isLike && styles.trackTimeSvgActive,
              )}
            >
              <use
                xlinkHref={
                  isLike
                    ? '/img/icon/sprite.svg#icon-like'
                    : '/img/icon/sprite.svg#icon-dislike'
                }
              ></use>
            </svg>
          </button>
          <span className={styles.trackTimeText}>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
