import api from '../../utils/api';

export const loadSuggestions = () => {
  return api
    .get('/suggestions')
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};

export const createSuggestion = payload => {
  return api
    .post('/suggestions', payload)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};
