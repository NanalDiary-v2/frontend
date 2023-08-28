import axios from 'axios';

const axios_api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

export default axios_api;
