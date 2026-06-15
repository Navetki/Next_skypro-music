'use client';

import { useRef } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import styles from './Bar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setIsPlay } from '@/store/features/trackSlice';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlay) {
      audio.pause();
      dispatch(setIsPlay(false));
    } else {
      audio.play().catch(() => {});
      dispatch(setIsPlay(true));
    }
  };

  const handleCanPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlay) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <div
      className={styles.bar}
      style={{ display: currentTrack ? 'block' : 'none' }}
    >
      <audio
        ref={audioRef}
        src={currentTrack?.track_file || undefined}
        style={{ display: 'none' }}
        onCanPlay={handleCanPlay}
        onEnded={() => dispatch(setIsPlay(false))}
      />

      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}></div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              <div
                className={classnames(styles.playerBtnPlay, styles.btn)}
                onClick={togglePlay}
              >
                {isPlay ? (
                  <svg className={styles.playerBtnPlaySvg} viewBox="0 0 15 19">
                    <path d="M2 0H5V19H2V0Z" />
                    <path d="M10 0H13V19H10V0Z" />
                  </svg>
                ) : (
                  <svg className={styles.playerBtnPlaySvg} viewBox="0 0 15 19">
                    <path d="M15 9.5L0 19L1.17301e-06 0L15 9.5Z" />
                  </svg>
                )}
              </div>

              <div className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.playerBtnRepeat, styles.btnIcon)}
              >
                <svg className={styles.playerBtnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.playerBtnShuffle, styles.btnIcon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <Link className={styles.trackPlayAuthorLink} href="#">
                    {currentTrack?.name || ''}
                  </Link>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <Link className={styles.trackPlayAlbumLink} href="#">
                    {currentTrack?.author || ''}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volumeProgress, styles.btn)}>
                <input
                  className={classnames(styles.volumeProgressLine, styles.btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
