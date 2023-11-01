import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    params: {  'api_key ': 'd4643d26c1edff237846ad8a644c0cd5',
                'language' : 'pt-BR',
                //'page' : '1',
            }
})

