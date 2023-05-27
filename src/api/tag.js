import axios from './axiosInit';

export const getTags = () => {
  return axios.get('tag');
};
