import axios from './axiosInit';

export const registerReq = (data) => {
  return axios.post('auth/register', data);
};

export const loginReq = (data) => {
  return axios.post('auth/login', data, {
    withCredentials: true,
  });
};

export const logoutReq = () => {
  return axios.post('auth/logout', undefined, {
    withCredentials: true,
  });
};
