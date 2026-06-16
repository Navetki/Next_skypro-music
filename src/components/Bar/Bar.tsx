'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import styles from './Bar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleLoop,
  toggleShuffle,
} from '@/store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const isLoop = useAppSelector((state) => state.tracks.isLoop);
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, currentTrack]);

  const resetTrackProgress = () => {
    setIsLoadedTrack(false);
    setCurrentTime(0);
    setDuration(0);
  };

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

  const OnTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.play().catch(() => {});
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  };

  const OnChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
      setCurrentTime(inputTime);
    }
  };

  const onNextTrack = () => {
    resetTrackProgress();
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    resetTrackProgress();
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const onToggleLoop = () => {
    dispatch(toggleLoop());
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className={styles.bar}
      style={{ display: currentTrack ? 'block' : 'none' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 20px',
          color: '#B1B1B1',
          fontSize: '14px',
          marginBottom: '5px',
        }}
      >
        <span>{formatTime(currentTime)}</span> /{' '}
        <span>{formatTime(duration)}</span>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.track_file || undefined}
        style={{ display: 'none' }}
        onCanPlay={handleCanPlay}
        onEnded={isLoop ? undefined : onNextTrack}
        loop={isLoop}
        onTimeUpdate={OnTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      />

      <ProgressBar
        max={duration}
        step={0.1}
        readOnly={!isLoadedTrack}
        value={currentTime}
        onChange={OnChangeProgress}
      />

      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}></div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div
                onClick={onPrevTrack}
                className={classnames(styles.playerBtnPrev, styles.btn)}
              >
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
                    <path d="M2 0H5V19H2V0Z" fill="white" />
                    <path d="M10 0H13V19H10V0Z" fill="white" />
                  </svg>
                ) : (
                  <svg className={styles.playerBtnPlaySvg} viewBox="0 0 15 19">
                    <path d="M15 9.5L0 19L1.17301e-06 0L15 9.5Z" fill="white" />
                  </svg>
                )}
              </div>

              <div onClick={onNextTrack} className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                onClick={onToggleLoop}
                className={classnames(styles.playerBtnRepeat, styles.btnIcon, {
                  [styles.btnActive]: isLoop,
                })}
              >
                <svg className={styles.playerBtnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                onClick={onToggleShuffle}
                className={classnames(styles.playerBtnShuffle, styles.btnIcon, {
                  [styles.btnActive]: isShuffle,
                })}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>{' '}
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
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
