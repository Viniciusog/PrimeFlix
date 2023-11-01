/* {
	"genres": [
		{
			"id": 28,
			"name": "Ação"
		},
		{
			"id": 12,
			"name": "Aventura"
		},
		{
			"id": 16,
			"name": "Animação"
		},
		{
			"id": 35,
			"name": "Comédia"
		},
		{
			"id": 80,
			"name": "Crime"
		},
		{
			"id": 99,
			"name": "Documentário"
		},
		{
			"id": 18,
			"name": "Drama"
		},
		{
			"id": 10751,
			"name": "Família"
		},
		{
			"id": 14,
			"name": "Fantasia"
		},
		{
			"id": 36,
			"name": "História"
		},
		{
			"id": 27,
			"name": "Terror"
		},
		{
			"id": 10402,
			"name": "Música"
		},
		{
			"id": 9648,
			"name": "Mistério"
		},
		{
			"id": 10749,
			"name": "Romance"
		},
		{
			"id": 878,
			"name": "Ficção científica"
		},
		{
			"id": 10770,
			"name": "Cinema TV"
		},
		{
			"id": 53,
			"name": "Thriller"
		},
		{
			"id": 10752,
			"name": "Guerra"
		},
		{
			"id": 37,
			"name": "Faroeste"
		}
	]
}*/

import { axiosApi } from './AxiosInstance';
import { MovieTMDB } from './GetMovieById';

interface MovieResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface GetMoviesByGenreApiResponse {
	page: number;
	results: MovieResult[];
	total_pages: number;
	total_results: number;
}

async function getMoviesByGenre(genreId: number, page: number): Promise<GetMoviesByGenreApiResponse>{
    const response = await axiosApi.get('/discover/movie', {
      params: {
        include_adult: false,
        include_video: false,
        language: 'pt-BR',
        page: page,
        sort_by: 'popularity.desc',
        with_genres: genreId
      }
    });
    return response.data;
}
  
export { getMoviesByGenre }