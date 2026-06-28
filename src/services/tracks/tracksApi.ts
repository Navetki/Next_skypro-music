import axios from 'axios';
import { API_BASE_URL, TIMEOUT_DURATION } from '../constants';
import { TrackType } from '@/SharedTypes/ShareTypes';

export const getAllTracks = (): Promise<TrackType[]> => {
  return axios
    .get(API_BASE_URL + 'catalog/track/all/', {
      timeout: TIMEOUT_DURATION,
    })
    .then((response) => {
      console.log('ЧТО ПРИСЛАЛ СЕРВЕР:', response.data);

      if (response.data && response.data.items) {
        return response.data.items;
      }
      if (response.data && response.data.result) {
        return response.data.result;
      }
      return Array.isArray(response.data) ? response.data : [];
    });
};

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
