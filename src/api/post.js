import axios from 'axios';
import { baseURL } from './baseURL';

export const getPosts = (param) => {
  return axios.get(`${baseURL}post${param}`);
};

export const getPost = (param) => {
  return axios.get(`${baseURL}post/${param}`);
};
