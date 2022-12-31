import axios from 'axios';
import { baseURL } from './baseURL';

export const getTags = () => {
  return axios.get(baseURL + 'tag');
};
