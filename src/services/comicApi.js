import axios from 'axios';

const timestamp = '1617803911';
const apikey = 'aa99639576e1a4a3469c32aede4d16bd';
const hash = 'e419cc9b5da7dce8bd014ec325efdf4b';
const url = 'http://gateway.marvel.com/v1/public/comics';

const comicApi = (comicId) => axios.create({
  baseURL: `${url}/${comicId}?ts=${timestamp}&apikey=${apikey}&hash=${hash}&limit=1`
});

export default comicApi;