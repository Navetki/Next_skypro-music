import axios from 'axios';
import { API_BASE_URL } from '../constants';

type authUserProps = {
  email: string;
  password: string;
};

// Исправлено строго по твоей документации с GitHub:
export type authUserReturn = {
  message?: string;
  success?: boolean;
  username?: string; // <-- ДОБАВИЛИ сюда на верхний уровень
  email?: string; // <-- ДОБАВИЛИ сюда на верхний уровень
  result?: {
    email: string;
    username: string;
    _id: number;
  };
  access?: string;
  refresh?: string;
  token?: string;
};

// 1. Функция авторизации (Вход)
export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  // Принудительно проверяем слэши при склейке URL
  const url = API_BASE_URL.endsWith('/')
    ? `${API_BASE_URL}user/login/`
    : `${API_BASE_URL}/user/login/`;
  return axios
    .post<authUserReturn>(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => response.data);
};

// 2. Функция регистрации (Регистрация)
export const signUpUser = (
  data: authUserProps & { username: string },
): Promise<authUserReturn> => {
  const url = API_BASE_URL.endsWith('/')
    ? `${API_BASE_URL}user/signup/`
    : `${API_BASE_URL}/user/signup/`;
  return axios
    .post<authUserReturn>(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => response.data);
};
