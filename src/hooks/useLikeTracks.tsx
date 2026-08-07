import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useState } from 'react';
import { withReauth } from '@/utils/withReAuth';
import { RootState } from '@/store/store';
import { toast } from 'react-toastify';

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
      toast.warning('Для этого действия необходимо авторизоваться');
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
          if (isLike) {
            toast.success('Трек удален из избранного');
          } else {
            toast.success('Трек добавлен в избранное');
          }
        })
        .catch((error) => {
          const apiError =
            error?.response?.data?.detail ||
            'Произошла сетевая ошибка при сохранении лайка';
          toast.error(`Ошибка сервера: ${apiError}`);
          setErrorMsg(apiError);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error('Ошибка: Отсутствует refreshToken в системе.');
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
