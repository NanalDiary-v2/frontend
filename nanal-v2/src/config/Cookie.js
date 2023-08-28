import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, option) => {
  // console.log(cookies.remove(name, { ...option })) 
  return cookies.remove(name, { ...option });
};
