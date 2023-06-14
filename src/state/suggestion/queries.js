import api from '../../utils/api';

export const loadSuggestions = () => {
  return [
    {
      "id": 1,
      "title": "Fake Suggestion 1",
      "description": "This is hardcoded",
      "createdAt": "2023-06-12T09:09:23.448Z",
      "updatedAt": "2023-06-12T09:09:23.448Z",
      "isDeleted": false
    },
    {
      "id": 2,
      "title": "Fake Suggestion 2",
      "description": "This is also hardcoded",
      "createdAt": "2023-06-12T09:09:23.460Z",
      "updatedAt": "2023-06-12T09:09:23.460Z",
      "isDeleted": false
    }
  ]
};

export const createSuggestion = payload => {
  return api
    .post('/suggestions', payload)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};
