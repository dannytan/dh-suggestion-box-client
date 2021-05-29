import axios from 'axios';
import api from '../../utils/api';

const basePath = '/suggestions';

export const loadProducts = () => {
  return axios
    .get(`https://5eb454842b81f700163084b3.mockapi.io/products`)
    .then(res => res.data)
    .catch(err => err.response.data);
};

export const loadSuggestions = () => {
  return api
    .get(`${basePath}`)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};