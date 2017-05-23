import axios from 'axios';

const tokenKey = 'auth.photobucket-exercise';
const setUser = (formData,res) => {
  const userData = { 
    username: formData.username, 
    token: res.data.token 
  };
  setUserData(userData);
  return userData;
};

export const getUserData = () => { 
  const dataString = window.localStorage.getItem(tokenKey);
  return JSON.parse(dataString);
};
export const setUserData = (userData) => { 
  window.localStorage.setItem(tokenKey, JSON.stringify(userData));
};
export const logout = () => window.localStorage.removeItem(tokenKey);

export const login = (formData) => {
  return axios.post('/auth/login', formData).then(setUser.bind(null,formData));
}

export const signup = (formData) => {
  // refactor local validation into here
  return axios.post('/auth/register', formData).then(setUser.bind(null,formData));
}

