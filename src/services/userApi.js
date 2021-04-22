import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://marvel-characters-comics.herokuapp.com/'
});

export default userApi;