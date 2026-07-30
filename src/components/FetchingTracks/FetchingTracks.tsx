'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { getAllTracks, getFavoriteTracks } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFavoriteTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { withReauth } from '@/utils/withReAuth';
import { RootState } from '@/store/store';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state: RootState) => state.tracks);

  useEffect(() => {
    if (allTracks.length === 0) {
      dispatch(setFetchIsLoading(true));
      getAllTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(
                setFetchError(
                  error.response.data?.detail ||
                    error.response.data?.message ||
                    'Ошибка загрузки',
                ),
              );
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
          }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }

    if (typeof window !== 'undefined') {
      const currentAccess = localStorage.getItem('token');
      const currentRefresh = localStorage.getItem('refreshToken');

      if (currentAccess && currentRefresh) {
        withReauth(
          (newToken) => getFavoriteTracks(newToken || currentAccess),
          currentRefresh,
          dispatch,
        )
          .then((res) => {
            dispatch(setFavoriteTracks(res));
          })
          .catch((error) => {
            console.error('Ошибка загрузки избранных треков:', error);
          });
      }
    }
  }, [dispatch, allTracks.length]);

  return <></>;
}
