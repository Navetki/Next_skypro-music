import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { TrackType } from '@/SharedTypes/ShareTypes';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllTracks = (): Promise<TrackType[]> => {
  return api.get('catalog/track/all').then((response) => {
    console.log('ЧТО ПРИСЛАЛ СЕРВЕР:', response.data);

    if (response.data) {
      if (Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (response.data.data && Array.isArray(response.data.data.items)) {
        return response.data.data.items;
      }
      if (response.data.items) {
        return response.data.items;
      }
      if (response.data.result) {
        return response.data.result;
      }
    }
    return Array.isArray(response.data) ? response.data : [];
  });
};
export const getSelectionTracks = (
  id: string | number,
): Promise<(string | number)[]> => {
  return api.get(`catalog/selection/${id}/`).then((response) => {
    console.log('ПОДБОРКА ОТ СЕРВЕРА:', response.data);
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data.items)
    ) {
      return response.data.data.items;
    }
    return response.data?.items || response.data?.result || [];
  });
};
