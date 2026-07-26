import axios from 'axios';
import { API_BASE_URL } from '../constants';

const MAIN_URL = API_BASE_URL;

export interface createUserProp {
  email?: string;
  password?: string;
  username?: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
}

export const createUser = (data: createUserProp) => {
  return axios({
    method: 'post',
    url: MAIN_URL + '/user/signup/',
    data,
  });
};

export const loginUser = (data: createUserProp) => {
  return axios({
    method: 'post',
    url: MAIN_URL + '/user/login/',
    data,
  });
};

type accessTokenType = {
  access: string;
};

export type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

export const getTokens = (data: createUserProp): Promise<tokensType> => {
  return axios.post(MAIN_URL + '/user/token/', data).then((res) => res.data);
};

export const refreshToken = (
  args: refreshTokenType,
): Promise<accessTokenType> => {
  return axios
    .post(MAIN_URL + '/user/token/refresh/', { refresh: args.refresh })
    .then((res) => res.data);
};
