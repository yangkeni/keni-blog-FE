import axios from './axiosInit';

export const getPosts = (param) => {
  return axios.get(`post${param}`);
};

export const getPost = (param) => {
  return axios.get(`post/${param}`);
};

export const updatePost = (param, data) => {
  return axios.put(`post/${param}`, data, {
    withCredentials: true,
  });
};

export const deletePost = (param) => {
  return axios.delete(`post/${param}`, {
    withCredentials: true,
  })
}

export const addPost = (data) => {
  return axios.post('post', data, {
    withCredentials: true,
  });
};
