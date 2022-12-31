import axios from 'axios';
import { baseURL } from './baseURL';

export const getPosts = (param) => {
  return axios.get(`${baseURL}post${param}`);
};

export const getPost = (param) => {
  return axios.get(`${baseURL}post/${param}`);
};

export const updatePost = (param, data) => {
  return axios.put(`${baseURL}post/${param}`, data, {
    withCredentials: true,
  });
};

export const deletePost = (param) => {
  return axios.delete(`${baseURL}post/${param}`, {
    withCredentials: true,
  })
}

export const addPost = (data) => {
  return axios.post(baseURL + 'post', data, {
    withCredentials: true,
  });
};
