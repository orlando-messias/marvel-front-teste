import axios from 'axios';

const userApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default userApi;