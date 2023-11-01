import { axiosApi } from './AxiosInstance';

interface MovieTMDB {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | { id: number; name: string; poster_path: string; backdrop_path: string };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: { id: number; logo_path: string | null; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


async function getMovieByIdFromTMDB(movieId: number): Promise<MovieTMDB> {
  const response = await axiosApi.get(`/movie/${movieId}`);
  return response.data;
}

export { MovieTMDB };
export { getMovieByIdFromTMDB }