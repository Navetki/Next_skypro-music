import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useState } from 'react';
import { withReauth } from '@/utils/withReAuth';
import { RootState } from '@/store/store';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType): returnTypeHook => {
  const dispatch = useAppDispatch();

  const favoriteTracks = useAppSelector(
    (state: RootState) => state.tracks.favoriteTracks || [],
  );

  const isLike = favoriteTracks.some(
    (t: TrackType) => String(t._id) === String(track?._id),
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (typeof window === 'undefined') return;

    const currentAccess =
      localStorage.getItem('token') || localStorage.getItem('access');
    const currentRefresh =
      localStorage.getItem('refreshToken') || localStorage.getItem('refresh');

    if (!currentAccess) {
      alert(
        'Ошибка: Токен авторизации не найден в localStorage! Выйдите из аккаунта и зайдите снова.',
      );
      setErrorMsg('Нет авторизации');
      return;
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);

    if (track && currentRefresh) {
      withReauth(
        (token) => actionApi(token, track._id),
        currentRefresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          const apiError =
            error?.response?.data?.detail ||
            'Произошла сетевая ошибка при сохранении лайка';
          alert(`Ошибка сервера: ${apiError}`);
          setErrorMsg(apiError);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert('Ошибка: Отсутствует refreshToken в системе.');
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
