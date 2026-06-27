import axios from 'axios';
import { API_BASE_URL, TIMEOUT_DURATION } from '../constants';
import { TrackType } from '@/SharedTypes/ShareTypes';

// 1. Получение ВСЕХ треков для главной страницы
export const getAllTracks = (): Promise<TrackType[]> => {
  return axios
    .get(API_BASE_URL + 'catalog/track/all/', {
      timeout: TIMEOUT_DURATION,
    })
    .then((response) => {
      console.log('ЧТО ПРИСЛАЛ СЕРВЕР:', response.data); // Лог для проверки структуры в консоли

      // ИСПРАВЛЕНО: Если сервер вернул объект с ключом items (или result), забираем его.
      // Если пришёл чистый массив — берём его напрямую.
      if (response.data && response.data.items) {
        return response.data.items;
      }
      if (response.data && response.data.result) {
        return response.data.result;
      }
      return Array.isArray(response.data) ? response.data : [];
    });
};

// 2. Получение треков КОНКРЕТНОЙ подборки по её ID
export const getSelectionTracks = (
  id: string | number,
): Promise<TrackType[]> => {
  return axios
    .get(API_BASE_URL + `catalog/selection/${id}/`, {
      timeout: TIMEOUT_DURATION,
    })
    .then((response) => {
      return response.data?.items || response.data?.result || [];
    });
};
