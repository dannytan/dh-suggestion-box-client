import * as jwt from 'jsonwebtoken';
import { LOCAL_STORAGE } from '../constants';

const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

export const isTokenValid = () => {
  return token && !!jwt.decode(token);
};

export const isTokenExpired = () => {
  if (isTokenValid()) {
    const expiry = jwt.decode(token).exp;
    const now = new Date();
    return now.getTime() > expiry * 1000;
  }
  return true;
};
