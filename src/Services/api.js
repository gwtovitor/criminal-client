import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://18.116.28.105:3333/'
  //  baseURL: 'http://192.168.0.103:3333/'
  baseURL: 'http://54.211.123.102:3333'
});

export default api;
