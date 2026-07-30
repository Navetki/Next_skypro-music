import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { TrackType } from '@/SharedTypes/ShareTypes';

const MAIN_URL = API_BASE_URL;

export const getAllTracks = (): Promise<TrackType[]> => {
  return axios.get(`${MAIN_URL}/catalog/track/all/`).then((response) => {
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
  return axios.get(`${MAIN_URL}/catalog/selection/${id}/`).then((response) => {
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

export const addLike = (
  access: string,
  id: string | number,
): Promise<unknown> => {
  return axios
    .post(
      `${MAIN_URL}/catalog/track/${id}/favorite/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    )
    .then((res) => res.data);
};

export const removeLike = (
  access: string,
  id: string | number,
): Promise<unknown> => {
  return axios
    .delete(`${MAIN_URL}/catalog/track/${id}/favorite/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => res.data);
};

export const getFavoriteTracks = (access: string): Promise<TrackType[]> => {
  return axios
    .get(`${MAIN_URL}/catalog/track/favorite/all/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((response) => {
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return (
        response.data?.items ||
        response.data?.result ||
        (Array.isArray(response.data) ? response.data : [])
      );
    });
};
