import axios from 'axios';
import { API_BASE_URL } from '../constants';

type authUserProps = {
  email: string;
  password: string;
};

export type authUserReturn = {
  message?: string;
  success?: boolean;
  username?: string;
  email?: string;
  result?: {
    email: string;
    username: string;
    _id: number;
  };
  access?: string;
  refresh?: string;
  token?: string;
};

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
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
