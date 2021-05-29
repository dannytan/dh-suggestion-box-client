import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { LOCAL_STORAGE } from '../constants';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
let isRefreshing = false;
const isTokenGoingToExpire = () => {
  if (!accessToken) return false;
  const now = new Date();
  const nowInSeconds = now.getTime() / 1000;
  const tokenExpireInSeconds = jwt.decode(accessToken).exp;
  const minutesTillExpire = (tokenExpireInSeconds - nowInSeconds) / 60;
  return minutesTillExpire >= 0 && minutesTillExpire < 30;
};

// const refreshToken = () => {
//   return new Promise((resolve, reject) => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         Authorization: Vue.$jwt.hasToken()
//           ? `Bearer ${Vue.$jwt.getToken()}`
//           : '',
//       },
//     };
//
//     if (!isRefreshing) {
//       isRefreshing = true;
//       http
//         .get(Constants.AUTHENTICATION_RENEW_URL(), config)
//         .then(res => {
//           isRefreshing = false;
//           const token = res.data.data.token;
//           localStorage.setItem('user-token', token);
//           resolve(token);
//         })
//         .catch(err => {
//           isRefreshing = false;
//           reject(err);
//         });
//     } else {
//       resolve();
//     }
//   });
// };

http.interceptors.request.use(
  request => {
    const originalRequest = request;

    if (accessToken !== null) {
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    }

    // if (!isTokenGoingToExpire()) {
    //   if (accessToken !== null) {
    //     request.headers.Authorization = `Bearer ${accessToken}`;
    //   }
    //   return request;
    // }

    return originalRequest;

    // return refreshToken().then(res => {
    //   const token2 = res || token;
    //   originalRequest.headers.Authorization = `Bearer ${token2}`;
    //
    //   return originalRequest;
    // });
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default {
  get(url, options) {
    return http.get(url, options);
  },
  post(url, body) {
    return http.post(url, body);
  },
  put(url, body) {
    return http.put(url, body);
  },
  delete(url) {
    return http.delete(url);
  },
};
