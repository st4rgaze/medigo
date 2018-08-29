import axios from 'axios';

export default() => axios.create({
  baseURL: 'http://v-latest.medigo.id',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
