import axios from 'axios';
import { baseURL } from './baseURL';

export const registerReq = (data) => {
  return axios.post(baseURL + 'auth/register', data);
};

export const loginReq = (data) => {
  return axios.post(baseURL + 'auth/login', data);
}
