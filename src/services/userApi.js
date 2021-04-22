import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://marvel-api-user.herokuapp.com/'
});

export default userApi;