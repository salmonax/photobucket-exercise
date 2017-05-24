import axios from 'axios';
import * as auth from './authService';

export const getImages = (start, end) => {
  const token = auth.getUserData().token;
  if (!token) {
    throw new Error('getImages() requires unauthenticated user.');
  }
  return axios.get('/images', {
    headers: { 'authorization': auth.getUserData().token },
  });

};

export const postImage = () => {
  if (!token) {
    throw new Error('postImage() requires an authenticated user.');
  }
  return axios.post('/images', {
    headers: { 'authorization': auth.getUserData().token },
  });
};