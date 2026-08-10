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
import { toast } from 'react-toastify';

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
            let message = 'Неизвестная ошибка';
            if (error.response) {
              message =
                error.response.data?.detail ||
                error.response.data?.message ||
                'Ошибка загрузки';
            } else if (error.request) {
              message = 'Произошла ошибка сети. Попробуйте позже';
            }
            dispatch(setFetchError(message));
            toast.error(message);
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
            toast.warning('Не удалось обновить список избранных треков');
          });
      }
    }
  }, [dispatch, allTracks.length]);

  return <></>;
}
