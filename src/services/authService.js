import axios from 'axios';

const tokenKey = 'auth.photobucket-exercise';
const saveUser = (res) => {
  const { data } = res;
  setUserData(data);
  return data;
};

export const getUserData = () => { 
  const dataString = window.localStorage.getItem(tokenKey);
  return dataString ? JSON.parse(dataString) : null;
};
export const setUserData = (userData) => { 
  window.localStorage.setItem(tokenKey, JSON.stringify(userData));
};
export const logout = () => window.localStorage.removeItem(tokenKey);

export const login = (formData) => {
  // refactor local validation into here
  return axios.post('/auth/login', formData).then(saveUser);
}

export const signup = (formData) => {
  // refactor local validation into here
  return axios.post('/auth/register', formData).then(saveUser);
}

