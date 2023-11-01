import axios, { AxiosInstance } from 'axios';
import 'dotenv/config';

const apiKey = process.env.TMDB_API_KEY; 
const axiosApi: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
  timeout: 5000, // Tempo limite em milissegundos
  params: {
    language: 'pt-BR',
    api_key: apiKey,
  },
});

export { axiosApi };